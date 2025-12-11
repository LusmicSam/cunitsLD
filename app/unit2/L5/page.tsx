"use client";

import React, { useState, useEffect } from 'react';
import {
    ShieldCheck,
    Terminal,
    RotateCcw,
    AlertTriangle,
    CheckCircle,
    Cpu,
    Activity,
    Layers,
    Box,
    Type,
    ArrowRight,
    Filter,
    RefreshCw,
    Play,
    Settings,
    Lock,
    Scissors,
    FileCode,
    Hash,
    LayoutTemplate,
    XCircle
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const SectionHeader = ({ title, icon: Icon, color = "blue" }: { title: string, icon: any, color?: string }) => (
    <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
        <span className={`bg-${color}-600/20 text-${color}-400 p-2 rounded-lg`}>
            <Icon size={24} />
        </span>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
);

const CodeBlock = ({ code, title }: { code: string, title?: string }) => (
    <div className="bg-[#0d1117] rounded-lg overflow-hidden border border-slate-700 my-4 shadow-xl font-mono text-sm w-full">
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-700">
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-xs text-slate-500 uppercase">{title || "C Snippet"}</span>
        </div>
        <div className="p-4 text-slate-300 overflow-x-auto whitespace-pre leading-relaxed">
            {code}
        </div>
    </div>
);

const TheoryCard = ({ title, children, variant = 'blue' }: { title: string, children: React.ReactNode, variant?: string }) => {
    const colors: Record<string, string> = {
        blue: 'border-blue-500 bg-blue-900/10',
        purple: 'border-purple-500 bg-purple-900/10',
        orange: 'border-orange-500 bg-orange-900/10',
        red: 'border-red-500 bg-red-900/10',
        green: 'border-green-500 bg-green-900/10',
        yellow: 'border-yellow-500 bg-yellow-900/10'
    };

    return (
        <div className={`border-l-4 ${colors[variant]} rounded-r-lg p-6 my-6 transition-all hover:bg-opacity-20 backdrop-blur-sm`}>
            <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                {title}
            </h4>
            <div className="text-slate-300 text-sm leading-relaxed space-y-2">
                {children}
            </div>
        </div>
    );
};

// --- INTERACTIVE COMPONENTS ---

const ValidationGate = () => {
    const [inputBuffer, setInputBuffer] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [status, setStatus] = useState("Waiting for input...");
    const [variable, setVariable] = useState<number | null>(null);
    const [infiniteLoop, setInfiniteLoop] = useState(false);
    const [method, setMethod] = useState<'scanf' | 'fgets'>('scanf');

    const processInput = () => {
        if (!inputValue) return;

        if (method === 'scanf') {
            const chars = inputValue.split('');
            const firstChar = chars[0];

            // Simulate stdin buffer
            setInputBuffer(prev => [...prev, ...chars, '\\n']);
            setInputValue("");

            // Simulate scanf("%d") behavior
            const parsed = parseInt(firstChar);

            if (!isNaN(parsed)) {
                setVariable(parsed);
                setStatus("Success! Integer read.");
                setInputBuffer([]); // Consumed
                setInfiniteLoop(false);
            } else {
                setVariable(null);
                setStatus("FAILURE! Input mismatch.");
                setInfiniteLoop(true); // Buffer not cleared, causing loop
            }
        } else {
            // Fgets behavior
            setVariable(parseInt(inputValue) || 0);
            setStatus("Safe Read! Buffer cleared automatically.");
            setInputBuffer([]);
            setInputValue("");
            setInfiniteLoop(false);
        }
    };

    const flushBuffer = () => {
        setInputBuffer([]);
        setStatus("Buffer Flushed. Loop broken.");
        setInfiniteLoop(false);
    };

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck size={20} className={method === 'scanf' ? "text-red-400" : "text-green-400"} />
                    {method === 'scanf' ? 'The Validation Gate (scanf)' : 'The Robust Way (fgets)'}
                </h3>
                <button
                    onClick={() => setMethod(m => m === 'scanf' ? 'fgets' : 'scanf')}
                    className="text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-600 hover:bg-slate-700 transition-colors"
                >
                    Switch to {method === 'scanf' ? 'fgets (Safe)' : 'scanf (Risky)'}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Code Pattern</label>
                        {method === 'scanf' ? (
                            <CodeBlock code={`while (1) {\n  if (scanf("%d", &n) == 1) break;\n  // Infinite loop if char entered!\n}`} title="Risky Loop" />
                        ) : (
                            <CodeBlock code={`char buf[100];\nfgets(buf, 100, stdin);\nsscanf(buf, "%d", &n);\n// Always consumes input line`} title="Robust Pattern" />
                        )}
                    </div>

                    <div className="flex gap-2">
                        <input
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            placeholder="Type 'a' to crash..."
                            className="bg-slate-950 border border-slate-600 rounded p-2 text-white flex-1 font-mono"
                        />
                        <button
                            onClick={processInput}
                            className="bg-blue-600 text-white px-4 rounded font-bold hover:bg-blue-500"
                        >
                            Enter
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-black p-4 rounded-xl border border-slate-800 relative overflow-hidden min-h-[160px]">
                        {/* Status */}
                        <div className={`text-sm font-bold mb-4 ${infiniteLoop ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                            STATUS: {infiniteLoop ? "INFINITE LOOP DETECTED!" : status}
                        </div>

                        {/* Buffer Visual */}
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-slate-500 uppercase">Stdin Buffer:</span>
                            <div className="flex gap-1 flex-wrap">
                                {inputBuffer.map((c, i) => (
                                    <div key={i} className="w-6 h-6 bg-slate-800 border border-slate-600 flex items-center justify-center text-xs text-white rounded">
                                        {c === '\\n' ? '↵' : c}
                                    </div>
                                ))}
                                {inputBuffer.length === 0 && <span className="text-xs text-slate-600 italic">Empty</span>}
                            </div>
                        </div>

                        {infiniteLoop && (
                            <div className="mt-4 p-2 bg-red-900/20 border border-red-500/50 rounded text-xs text-red-300">
                                <AlertTriangle size={12} className="inline mr-1" />
                                <strong>Why?</strong> <code>scanf</code> failed to read 'a' as int, so 'a' stays in buffer. Next loop, it sees 'a' again. Repeat forever.
                            </div>
                        )}
                    </div>

                    {infiniteLoop && (
                        <button
                            onClick={flushBuffer}
                            className="w-full bg-green-700 hover:bg-green-600 text-white p-2 rounded font-bold flex items-center justify-center gap-2 animate-bounce"
                        >
                            <RefreshCw size={16} /> Inject Fix: while(getchar() != '\n');
                        </button>
                    )}
                </div>
            </div>

            <TheoryCard title="Deep Dive: The 'Gold Standard' of Input" variant="green">
                <p>
                    Experienced C programmers rarely use <code>scanf</code> directly for user input. Instead, they separate reading from parsing:
                </p>
                <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
                    <li><strong>Read Line:</strong> Use <code>fgets()</code> to read the entire line of text into a buffer (string). This effectively "clears" the input stream every time.</li>
                    <li><strong>Parse:</strong> Use <code>sscanf()</code> or <code>atoi()</code> to extract numbers from that string buffer.</li>
                </ol>
            </TheoryCard>
        </div>
    );
};

const CharStreamEngine = () => {
    const [text, setText] = useState("Hello C World");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<'upper' | 'nospace' | 'count'>('upper');
    const [processing, setProcessing] = useState(false);

    const processStream = () => {
        setProcessing(true);
        setOutput("");
        let res = "";
        let count = 0;
        let i = 0;

        const interval = setInterval(() => {
            if (i >= text.length) {
                clearInterval(interval);
                setProcessing(false);
                if (mode === 'count') setOutput(`Words: ${count + 1}`);
                return;
            }

            const char = text[i];

            if (mode === 'upper') {
                res += char.toUpperCase();
            } else if (mode === 'nospace') {
                if (char !== ' ') res += char;
            } else if (mode === 'count') {
                if (char === ' ') count++;
                res += char;
            }

            setOutput(res);
            i++;
        }, 100);
    };

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Terminal size={20} className="text-green-400" /> Unformatted Stream (getchar/putchar)
            </h3>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <button onClick={() => setMode('upper')} className={`p-2 rounded border text-sm font-bold ${mode === 'upper' ? 'bg-slate-700 border-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>To Upper</button>
                <button onClick={() => setMode('nospace')} className={`p-2 rounded border text-sm font-bold ${mode === 'nospace' ? 'bg-slate-700 border-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>Strip Spaces</button>
                <button onClick={() => setMode('count')} className={`p-2 rounded border text-sm font-bold ${mode === 'count' ? 'bg-slate-700 border-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>Word Count</button>
            </div>

            <div className="flex gap-2 mb-6">
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="bg-slate-950 border border-slate-600 rounded p-2 text-white flex-1 font-mono"
                />
                <button
                    onClick={processStream}
                    disabled={processing}
                    className="bg-green-600 text-white px-4 rounded font-bold hover:bg-green-500 disabled:opacity-50"
                >
                    <Play size={16} fill="currentColor" />
                </button>
            </div>

            <div className="bg-black p-4 rounded-xl border border-slate-800 font-mono min-h-[100px] relative">
                <div className="absolute top-2 right-2 text-[10px] text-slate-600 uppercase font-bold">Output Stream</div>
                <div className="text-green-400 text-lg">
                    {output}<span className="animate-pulse">_</span>
                </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900 rounded border border-slate-700 text-xs text-slate-400 font-mono">
                {mode === 'upper' && "while((c=getchar()) != EOF) putchar(toupper(c));"}
                {mode === 'nospace' && "while((c=getchar()) != EOF) if(c!=' ') putchar(c);"}
                {mode === 'count' && "while((c=getchar()) != EOF) if(c==' ') count++;"}
            </div>

            <TheoryCard title="What is EOF?" variant="blue">
                <p>
                    <strong>EOF (End Of File)</strong> is a special constant (usually -1) defined in <code>stdio.h</code>.
                    When <code>getchar()</code> reaches the end of input (or user presses Ctrl+D/Ctrl+Z), it returns EOF to signal the loop to stop.
                </p>
            </TheoryCard>
        </div>
    );
};

const StateMachine = () => {
    const [state, setState] = useState<'IDLE' | 'RUNNING' | 'PAUSED' | 'ERROR'>('IDLE');
    const [log, setLog] = useState<string[]>(["System Initialized."]);

    const transition = (action: string) => {
        let nextState = state;
        let msg = "";

        switch (state) {
            case 'IDLE':
                if (action === 'START') { nextState = 'RUNNING'; msg = "Starting process..."; }
                else msg = "Invalid action for IDLE.";
                break;
            case 'RUNNING':
                if (action === 'PAUSE') { nextState = 'PAUSED'; msg = "Process paused."; }
                else if (action === 'STOP') { nextState = 'IDLE'; msg = "Process stopped."; }
                else if (action === 'FAIL') { nextState = 'ERROR'; msg = "Critical Failure!"; }
                break;
            case 'PAUSED':
                if (action === 'RESUME') { nextState = 'RUNNING'; msg = "Resuming..."; }
                else if (action === 'STOP') { nextState = 'IDLE'; msg = "Resetting."; }
                break;
            case 'ERROR':
                if (action === 'RESET') { nextState = 'IDLE'; msg = "System Reset."; }
                break;
        }

        if (nextState !== state) {
            setState(nextState);
            setLog(prev => [`[${nextState}] ${msg}`, ...prev.slice(0, 4)]);
        }
    };

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Activity size={20} className="text-purple-400" /> Structured Design: State Machine
            </h3>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Visualizer */}
                <div className="relative h-64 border-2 border-slate-700 rounded-xl bg-slate-900/50 flex items-center justify-center p-4">
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center text-xl font-black border-4 transition-all duration-500 shadow-2xl
            ${state === 'IDLE' ? 'border-slate-500 text-slate-500 bg-slate-900' : ''}
            ${state === 'RUNNING' ? 'border-green-500 text-green-400 bg-green-900/20 shadow-green-500/50 animate-pulse' : ''}
            ${state === 'PAUSED' ? 'border-yellow-500 text-yellow-400 bg-yellow-900/20' : ''}
            ${state === 'ERROR' ? 'border-red-500 text-red-500 bg-red-900/20 animate-bounce' : ''}
          `}>
                        {state}
                    </div>

                    <div className="absolute top-2 left-2 text-xs text-slate-500 font-bold uppercase">Current State</div>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => transition('START')} className="bg-green-700 text-white p-2 rounded text-xs font-bold hover:bg-green-600">START</button>
                        <button onClick={() => transition('PAUSE')} className="bg-yellow-700 text-white p-2 rounded text-xs font-bold hover:bg-yellow-600">PAUSE</button>
                        <button onClick={() => transition('RESUME')} className="bg-blue-700 text-white p-2 rounded text-xs font-bold hover:bg-blue-600">RESUME</button>
                        <button onClick={() => transition('STOP')} className="bg-slate-700 text-white p-2 rounded text-xs font-bold hover:bg-slate-600">STOP</button>
                        <button onClick={() => transition('FAIL')} className="bg-red-900/50 border border-red-500 text-red-400 p-2 rounded text-xs font-bold hover:bg-red-900">TRIGGER ERROR</button>
                        <button onClick={() => transition('RESET')} className="bg-purple-700 text-white p-2 rounded text-xs font-bold hover:bg-purple-600">RESET SYSTEM</button>
                    </div>

                    <div className="bg-black p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 h-32 overflow-hidden">
                        {log.map((l, i) => <div key={i} className={i === 0 ? "text-white" : "opacity-50"}>&gt; {l}</div>)}
                    </div>
                </div>
            </div>

            <TheoryCard title="Pattern: switch inside while" variant="purple">
                <p>This is the architecture of almost all interactive software:</p>
                <code className="block mt-2 bg-slate-900 p-2 rounded text-xs text-purple-300">
                    while(1) {'{'}<br />
                    &nbsp;&nbsp;switch(state) {'{'}<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;case IDLE: ... break;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;case RUNNING: ... break;<br />
                    &nbsp;&nbsp;{'}'}<br />
                    {'}'}
                </code>
            </TheoryCard>
        </div>
    );
};

const ModularDesignLab = () => {
    const [view, setView] = useState<'spaghetti' | 'modular'>('spaghetti');

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <LayoutTemplate size={20} className="text-orange-400" /> Structured: Top-Down Design
                </h3>
                <div className="flex gap-2">
                    <button onClick={() => setView('spaghetti')} className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${view === 'spaghetti' ? 'bg-red-900/50 border-red-500 text-red-200' : 'bg-slate-800 border-slate-600 text-slate-400'}`}>Spaghetti Code</button>
                    <button onClick={() => setView('modular')} className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${view === 'modular' ? 'bg-green-900/50 border-green-500 text-green-200' : 'bg-slate-800 border-slate-600 text-slate-400'}`}>Modular Functions</button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Visual */}
                <div className={`h-64 rounded-xl border-2 flex items-center justify-center p-4 transition-all duration-500 relative overflow-hidden
          ${view === 'spaghetti' ? 'border-red-800 bg-red-900/10' : 'border-green-800 bg-green-900/10'}
        `}>
                    {view === 'spaghetti' ? (
                        <div className="text-center animate-in fade-in">
                            <div className="text-6xl mb-2">🍝</div>
                            <h4 className="text-red-400 font-bold">The Monolith</h4>
                            <p className="text-xs text-red-300 mt-2">1000 lines inside main().<br />Hard to read. Hard to debug.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 w-full animate-in fade-in zoom-in">
                            <div className="bg-slate-800 p-2 rounded text-center border border-green-500/30 text-green-300 font-bold text-xs">Main()</div>
                            <div className="bg-slate-800 p-2 rounded text-center border border-green-500/30 text-green-300 font-bold text-xs">Input()</div>
                            <div className="bg-slate-800 p-2 rounded text-center border border-green-500/30 text-green-300 font-bold text-xs">Process()</div>
                            <div className="bg-slate-800 p-2 rounded text-center border border-green-500/30 text-green-300 font-bold text-xs">Display()</div>
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                <div className="w-0.5 h-full bg-green-500/20"></div>
                                <div className="h-0.5 w-full bg-green-500/20 absolute"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Code Explanation */}
                <div>
                    {view === 'spaghetti' ? (
                        <CodeBlock title="main.c (Bad)" code={`int main() {\n  // 50 lines of input logic\n  // ...\n  // 200 lines of calculation\n  // ...\n  // 50 lines of printing\n}`} />
                    ) : (
                        <CodeBlock title="main.c (Good)" code={`int main() {\n  data = getInput();\n  res = calculate(data);\n  showResult(res);\n}`} />
                    )}
                    <TheoryCard title="Divide & Conquer" variant={view === 'spaghetti' ? 'red' : 'green'}>
                        <p>
                            Structured design means breaking a large problem into smaller, manageable <strong>modules</strong> (functions).
                            Each module should do <strong>one thing well</strong>.
                        </p>
                    </TheoryCard>
                </div>
            </div>
        </div>
    );
};

const CleanCodeStudio = () => {
    const [refactored, setRefactored] = useState(false);

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Scissors size={20} className="text-yellow-400" /> Clean Code: Magic Numbers
                </h3>
                <button
                    onClick={() => setRefactored(!refactored)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${refactored ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                    {refactored ? 'Show Original' : 'Refactor Now'} <RefreshCw size={14} />
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    {refactored ? (
                        <CodeBlock title="Optimized" code={`#define TAX_RATE 0.15\n#define MAX_USERS 100\n\ntotal = cost * TAX_RATE;\nif (users < MAX_USERS) ...`} />
                    ) : (
                        <CodeBlock title="Smelly Code" code={`// What do these numbers mean?\ntotal = cost * 0.15;\nif (users < 100) ...`} />
                    )}
                </div>

                <div className="flex flex-col justify-center">
                    <TheoryCard title="Why avoid Magic Numbers?" variant="yellow">
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li className="flex items-start gap-2">
                                <Hash size={16} className="text-yellow-500 mt-1" />
                                <span><strong>Readability:</strong> <code>0.15</code> is confusing. <code>TAX_RATE</code> is obvious.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Hash size={16} className="text-yellow-500 mt-1" />
                                <span><strong>Maintainability:</strong> If tax changes to 0.18, change it in ONE place (#define), not 50 places in the code.</span>
                            </li>
                        </ul>
                    </TheoryCard>
                </div>
            </div>
        </div>
    );
};

const ScopeVisualizer = () => {
    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Layers size={20} className="text-orange-400" /> Variable Scope & Lifetime
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <div className="bg-slate-900 p-3 rounded-t-xl border border-slate-600 border-b-0 relative">
                        <span className="text-xs text-slate-400 uppercase font-bold">Main Scope</span>
                        <code className="block text-blue-300 mt-1">int x = 10;</code>

                        <div className="mt-4 bg-slate-800 p-3 rounded border border-slate-500 relative ml-4">
                            <span className="text-xs text-slate-400 uppercase font-bold">Loop Scope (Block)</span>
                            <code className="block text-green-300 mt-1">int x = 20;</code>
                            <code className="block text-slate-300 text-xs mt-1">// Hides outer 'x'</code>
                        </div>

                        <code className="block text-blue-300 mt-4">printf("%d", x); // Prints 10</code>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-4">
                    <TheoryCard title="Scope Rules" variant="orange">
                        <p>
                            Variables declared inside a block <code>{`{}`}</code> only exist within that block.
                            <br />
                            <strong>Shadowing:</strong> If an inner variable has the same name as an outer one, the inner one takes precedence inside the block.
                        </p>
                    </TheoryCard>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture5Page() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-32">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-white text-sm leading-tight">Robust I/O & Design</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 2 • Lecture 5 (Capstone)</p>
                    </div>
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-900/20 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Cpu size={14} /> Mastery Level
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                        Bulletproof <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-white">Logic</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Writing code that works is easy. Writing code that <strong>doesn't break</strong> when users type garbage is the mark of a pro.
                    </p>
                </div>

                {/* SECTION 1: INPUT VALIDATION */}
                <section>
                    <SectionHeader title="Input Validation (Stopping the Crash)" icon={ShieldCheck} color="red" />

                    <TheoryCard title="The Scanf Return Value" variant="red">
                        <p>
                            <code>scanf</code> returns the number of items successfully read.
                            <br />
                            If you ask for an integer <code>%d</code> and the user types 'A', <code>scanf</code> returns <strong>0</strong> and leaves 'A' in the buffer.
                            <br />
                            <strong>Result:</strong> An infinite loop where it keeps trying to read 'A' forever.
                        </p>
                    </TheoryCard>

                    <ValidationGate />
                </section>

                {/* SECTION 2: UNFORMATTED IO */}
                <section>
                    <SectionHeader title="Unformatted Character Processing" icon={Terminal} color="green" />
                    <p className="text-slate-400 mb-8">
                        Sometimes <code>scanf</code> is too heavy. Using <code>getchar()</code> allows us to process data byte-by-byte for high speed and control.
                    </p>
                    <CharStreamEngine />
                </section>

                {/* SECTION 3: STRUCTURED DESIGN (MODULARITY) */}
                <section>
                    <SectionHeader title="Structured Design: Modularity" icon={LayoutTemplate} color="orange" />
                    <p className="text-slate-400 mb-8">
                        Before writing code, we design it. Structured programming is about breaking big problems into small, named boxes (Functions).
                    </p>
                    <ModularDesignLab />
                </section>

                {/* SECTION 4: CLEAN CODE */}
                <section>
                    <SectionHeader title="Clean Code Practices" icon={Scissors} color="yellow" />
                    <CleanCodeStudio />
                </section>

                {/* SECTION 5: STATE MACHINES */}
                <section>
                    <SectionHeader title="Advanced Architecture: State Machines" icon={Activity} color="purple" />
                    <p className="text-slate-400 mb-8">
                        How do video games or operating systems work? They use a <strong>State Machine</strong>.
                        The program is always in one specific state (Menu, Playing, Paused) and waits for events to change state.
                    </p>
                    <StateMachine />
                </section>

                {/* SECTION 6: SCOPE */}
                <section>
                    <SectionHeader title="Variable Scope & Lifespan" icon={Layers} color="orange" />
                    <p className="text-slate-400 mb-8">
                        Variables defined inside a block <code>{`{}`}</code> only exist within that block. This is critical for memory management in loops.
                    </p>
                    <ScopeVisualizer />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-slate-800 bg-[#020617] py-12 text-center text-slate-600 text-sm">
                <p>C Programming Course • Unit 2 • Lecture 5</p>
            </footer>
        </div>
    );
}
