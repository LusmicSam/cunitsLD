"use client";

import React, { useState, useEffect } from 'react';
import {
    Terminal,
    Monitor,
    Keyboard,
    AlertTriangle,
    CheckCircle,
    XCircle,
    ArrowRight,
    Layout,
    Type,
    ShieldAlert,
    Cpu,
    Play,
    RotateCcw,
    AlignLeft,
    AlignCenter,
    AlignRight,
    MousePointer,
    BookOpen,
    Layers
} from 'lucide-react';
import { ModeToggle } from '@/components/theme-toggle';

// --- SHARED COMPONENTS ---

const SectionHeader = ({ title, icon: Icon, color = "blue" }: { title: string, icon: any, color?: string }) => (
    <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
        <span className={`bg-${color}-100 dark:bg-${color}-600/20 text-${color}-600 dark:text-${color}-400 p-2 rounded-lg`}>
            <Icon size={24} />
        </span>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    </div>
);

const CodeBlock = ({ code, title }: { code: string, title?: string }) => (
    <div className="bg-card rounded-lg overflow-hidden border border-border my-4 shadow-xl font-mono text-sm w-full">
        <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-xs text-muted-foreground uppercase">{title || "C Code"}</span>
        </div>
        <div className="p-4 text-foreground overflow-x-auto whitespace-pre">
            {code}
        </div>
    </div>
);

const TheoryCard = ({ title, children, variant = 'blue' }: { title: string, children: React.ReactNode, variant?: string }) => {
    const colors: Record<string, string> = {
        blue: 'border-blue-500 bg-blue-50 dark:bg-blue-900/10',
        purple: 'border-purple-500 bg-purple-50 dark:bg-purple-900/10',
        orange: 'border-orange-500 bg-orange-50 dark:bg-orange-900/10',
        red: 'border-red-500 bg-red-50 dark:bg-red-900/10',
        green: 'border-green-500 bg-green-50 dark:bg-green-900/10'
    };

    return (
        <div className={`border-l-4 ${colors[variant]} rounded-r-lg p-6 my-6 transition-all hover:bg-opacity-20 backdrop-blur-sm`}>
            <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                {title}
            </h4>
            <div className="text-muted-foreground text-sm leading-relaxed space-y-2">
                {children}
            </div>
        </div>
    );
};

// --- INTERACTIVE COMPONENTS ---

const PrintfStudio = () => {
    const [val, setVal] = useState<string>("3.14159");
    const [width, setWidth] = useState(8);
    const [precision, setPrecision] = useState(2);
    const [alignLeft, setAlignLeft] = useState(false);
    const [type, setType] = useState<'f' | 'd' | 's'>('f');

    // Logic to simulate C printf formatting
    const getFormatted = () => {
        let output = "";
        if (type === 'f') {
            const num = parseFloat(val);
            output = isNaN(num) ? "0.00" : num.toFixed(precision);
        } else if (type === 'd') {
            const num = parseInt(val);
            output = isNaN(num) ? "0" : num.toString();
        } else {
            output = val.substring(0, precision > 0 ? precision : val.length); // String precision limits length
        }

        const padding = Math.max(0, width - output.length);
        const spaces = " ".repeat(padding);

        return alignLeft ? output + spaces : spaces + output;
    };

    const formattedResult = getFormatted();
    const formatString = `%${alignLeft ? '-' : ''}${width}${type === 'f' ? `.${precision}` : type === 's' && precision > 0 ? `.${precision}` : ''}${type}`;

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Layout size={20} className="text-blue-600 dark:text-blue-400" /> Printf Designer
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Value</label>
                        <input
                            value={val}
                            onChange={e => setVal(e.target.value)}
                            className="bg-background border border-border rounded p-2 text-foreground w-full font-mono"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Min Width</label>
                            <input type="range" min="0" max="15" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full accent-blue-500" />
                            <div className="text-right text-xs text-blue-600 dark:text-blue-400 font-mono">{width}</div>
                        </div>

                        {(type === 'f' || type === 's') && (
                            <div>
                                <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">{type === 'f' ? 'Precision (.p)' : 'Max Chars (.p)'}</label>
                                <input type="range" min="0" max="10" value={precision} onChange={e => setPrecision(Number(e.target.value))} className="w-full accent-green-500" />
                                <div className="text-right text-xs text-green-600 dark:text-green-400 font-mono">{precision}</div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => { setType('f'); setVal("3.14159") }} className={`px-3 py-1 rounded text-xs font-bold border ${type === 'f' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-muted border-border text-muted-foreground hover:bg-muted/80'}`}>Float (%f)</button>
                        <button onClick={() => { setType('d'); setVal("42"); setPrecision(0) }} className={`px-3 py-1 rounded text-xs font-bold border ${type === 'd' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-muted border-border text-muted-foreground hover:bg-muted/80'}`}>Int (%d)</button>
                        <button onClick={() => { setType('s'); setVal("Hello World") }} className={`px-3 py-1 rounded text-xs font-bold border ${type === 's' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-muted border-border text-muted-foreground hover:bg-muted/80'}`}>String (%s)</button>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={alignLeft} onChange={() => setAlignLeft(!alignLeft)} className="rounded bg-muted border-border" />
                        <span className="text-sm text-muted-foreground">Left Align (Flag: -)</span>
                    </label>
                </div>

                {/* Visualizer */}
                <div className="flex flex-col gap-4">
                    <div className="bg-card p-4 rounded-xl border border-border text-center">
                        <span className="text-xs text-muted-foreground font-bold uppercase mb-2 block">Format String</span>
                        <code className="text-2xl text-yellow-600 dark:text-yellow-400 font-mono">printf("{formatString}", val);</code>
                    </div>

                    <div className="bg-black/50 p-4 rounded-xl border border-border overflow-hidden">
                        <span className="text-xs text-slate-500 font-bold uppercase mb-2 block text-center">Console Output Grid</span>
                        <div className="flex justify-center border border-dashed border-slate-800 p-1">
                            {formattedResult.split('').map((char, i) => (
                                <div key={i} className={`w-8 h-10 flex items-center justify-center border-r border-border font-mono text-lg
                  ${char === ' ' ? 'bg-muted/50 text-muted-foreground' : 'bg-transparent text-white font-bold'}
                `}>
                                    {char === ' ' ? '·' : char}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1 px-1 font-mono">
                            <span>Length: {formattedResult.length}</span>
                            <span>(Dots = Spaces)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ScanfStream = () => {
    const [buffer, setBuffer] = useState("  42  A");
    const [cursor, setCursor] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [vars, setVars] = useState({ num: '?', char: '?' });
    const [showTheory, setShowTheory] = useState(false);

    const reset = () => {
        setCursor(0);
        setLogs([]);
        setVars({ num: '?', char: '?' });
    };

    const readInt = () => {
        let ptr = cursor;
        let skippedSpace = false;

        // Skip whitespace
        while (ptr < buffer.length && buffer[ptr] === ' ') {
            ptr++;
            skippedSpace = true;
        }

        // Read digits
        let start = ptr;
        while (ptr < buffer.length && !isNaN(parseInt(buffer[ptr])) && buffer[ptr] !== ' ') ptr++;

        const val = buffer.substring(start, ptr);
        if (val && !isNaN(parseInt(val))) {
            setVars(prev => ({ ...prev, num: val }));
            setLogs(prev => [
                ...prev,
                skippedSpace ? `(Skipped whitespace)` : null,
                `Found integer: ${val}`,
                `Buffer cursor moved to index ${ptr}`
            ].filter(Boolean) as string[]);
            setCursor(ptr);
        } else {
            setLogs(prev => [...prev, `Error: No integer found at cursor.`]);
        }
    };

    const readChar = (skipSpace: boolean) => {
        let ptr = cursor;
        let skippedSpace = false;

        if (skipSpace) {
            while (ptr < buffer.length && buffer[ptr] === ' ') {
                ptr++;
                skippedSpace = true;
            }
        }

        if (ptr < buffer.length) {
            const val = buffer[ptr];
            setVars(prev => ({ ...prev, char: val }));
            setLogs(prev => [
                ...prev,
                skippedSpace ? `(Skipped whitespace)` : null,
                `Found char: '${val}' (ASCII ${val.charCodeAt(0)})`,
                `Buffer cursor moved to index ${ptr + 1}`
            ].filter(Boolean) as string[]);
            setCursor(ptr + 1);
        } else {
            setLogs(prev => [...prev, `Error: End of Input`]);
        }
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <Keyboard size={20} className="text-green-600 dark:text-green-400" /> The Scanf Tape
                    </h3>
                    <button
                        onClick={() => setShowTheory(!showTheory)}
                        className={`text-xs px-3 py-1 rounded-full font-bold transition-colors ${showTheory ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                    >
                        {showTheory ? 'Hide Theory' : 'How it works?'}
                    </button>
                </div>
                <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <RotateCcw size={12} /> Reset
                </button>
            </div>

            {showTheory && (
                <div className="mb-8 bg-blue-100 dark:bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg animate-in slide-in-from-top-2">
                    <h4 className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-2 flex items-center gap-2"><BookOpen size={16} /> The Input Buffer</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                        When you type on the keyboard, characters don't go directly to variables. They go into a temporary holding area called the <strong>Standard Input Buffer (stdin)</strong>.
                    </p>
                    <ul className="text-muted-foreground text-xs list-disc pl-4 space-y-1">
                        <li><strong>Stream:</strong> Input is processed as a stream of characters (byte stream).</li>
                        <li><strong>Cursor:</strong> C keeps a pointer to the "next" character to be read.</li>
                        <li><strong>Waiting:</strong> <code>scanf</code> waits only if the buffer is empty. If there's leftover data (like a newline <code>\n</code>), it reads that immediately!</li>
                    </ul>
                </div>
            )}

            {/* The Tape - Improved Responsiveness */}
            <div className="relative h-24 bg-black/80 border-y-4 border-border mb-8 flex items-center overflow-hidden rounded-lg shadow-inner">
                <div
                    className="flex font-mono text-2xl transition-transform duration-500 ease-out absolute left-5"
                    style={{ transform: `translateX(-${cursor * 40}px)` }} // Left aligned logic
                >
                    {buffer.split('').map((char, i) => (
                        <div key={i} className={`w-10 h-16 flex items-center justify-center border-r border-slate-800 shrink-0 ${i < cursor ? 'text-slate-700 bg-slate-900/50' : 'text-white'}`}>
                            {char === ' ' ? <span className="text-slate-800 text-sm">_</span> : char}
                        </div>
                    ))}
                    {/* Virtual End of Buffer */}
                    <div className="w-10 h-16 flex items-center justify-center text-slate-700 border-r border-slate-800 shrink-0 italic text-sm">EOF</div>
                </div>

                {/* Read Head Overlay */}
                <div className="absolute left-4 top-0 bottom-0 w-12 border-x-2 border-yellow-500 bg-yellow-500/5 z-10 flex flex-col items-center justify-between pointer-events-none">
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-yellow-500 drop-shadow-lg"></div>
                    <span className="text-[9px] text-yellow-500 font-bold uppercase tracking-widest bg-yellow-900/50 px-1 rounded">HEAD</span>
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-yellow-500 drop-shadow-lg"></div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase">Operations</h4>
                    <button onClick={readInt} className="w-full bg-card hover:bg-muted p-3 rounded text-left border border-border flex justify-between group transition-all">
                        <code className="text-blue-600 dark:text-blue-300">scanf("%d", &num);</code>
                        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Skips whitespace</span>
                    </button>

                    <button onClick={() => readChar(false)} className="w-full bg-card hover:bg-muted p-3 rounded text-left border border-border flex justify-between group transition-all">
                        <code className="text-purple-600 dark:text-purple-300">scanf("%c", &ch);</code>
                        <span className="text-xs text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">⚠ Reads ANYTHING</span>
                    </button>

                    <button onClick={() => readChar(true)} className="w-full bg-card hover:bg-muted p-3 rounded text-left border border-border flex justify-between group transition-all">
                        <code className="text-green-600 dark:text-green-300">scanf(" %c", &ch);</code>
                        <span className="text-xs text-green-600 dark:text-green-500 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">✅ Space skips whitespace</span>
                    </button>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase">Memory & Logs</h4>
                    <div className="flex gap-4">
                        <div className="bg-muted/50 p-3 rounded border border-border flex-1">
                            <span className="text-xs text-muted-foreground block">num (int)</span>
                            <span className="text-xl font-mono text-foreground">{vars.num}</span>
                        </div>
                        <div className="bg-muted/50 p-3 rounded border border-border flex-1">
                            <span className="text-xs text-muted-foreground block">ch (char)</span>
                            <span className="text-xl font-mono text-foreground">'{vars.char}'</span>
                        </div>
                    </div>
                    <div className="h-32 bg-black/50 rounded p-3 font-mono text-xs text-muted-foreground overflow-y-auto border border-border shadow-inner">
                        {logs.length === 0 && <span className="opacity-50 italic">Waiting for execution...</span>}
                        {logs.map((l, i) => <div key={i} className="mb-1 border-l-2 border-slate-700 pl-2">&gt; {l}</div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BufferOverflow = () => {
    const [input, setInput] = useState("");
    const BUFFER_SIZE = 8;

    const isOverflow = input.length > BUFFER_SIZE;

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <ShieldAlert size={20} className="text-red-600 dark:text-red-500" /> Danger Zone: gets() vs fgets()
            </h3>

            <p className="text-sm text-muted-foreground mb-6">
                <code>gets()</code> does not check size. If you pour 10 liters of water into a 5-liter bucket, it spills.
                In C, it spills into other variables or system memory!
            </p>

            <div className="mb-8">
                <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">User Input (Type here)</label>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="w-full bg-background border border-border rounded p-3 text-foreground font-mono"
                    placeholder="Type more than 8 chars..."
                />
            </div>

            <div className="relative">
                <div className="flex gap-1 mb-2">
                    {/* Safe Buffer */}
                    <div className="flex-1 bg-green-100 dark:bg-green-900/20 border border-green-500/30 p-2 rounded text-center text-xs text-green-600 dark:text-green-400 font-bold">
                        SAFE BUFFER [Size {BUFFER_SIZE}]
                    </div>
                    {/* Danger Zone */}
                    <div className="w-1/3 bg-red-100 dark:bg-red-900/20 border border-red-500/30 p-2 rounded text-center text-xs text-red-600 dark:text-red-400 font-bold animate-pulse">
                        FORBIDDEN MEMORY
                    </div>
                </div>

                <div className="flex gap-1 bg-black/50 border border-border p-2 rounded overflow-hidden">
                    {[...Array(BUFFER_SIZE + 5)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-10 h-12 flex items-center justify-center border font-mono font-bold text-lg shrink-0
                ${i < BUFFER_SIZE
                                    ? 'border-slate-700 text-white'
                                    : 'border-red-900/50 text-red-500 bg-red-900/10'
                                }
                ${input[i] && i >= BUFFER_SIZE ? 'bg-red-600 text-white animate-bounce' : ''}
              `}
                        >
                            {input[i] || '.'}
                        </div>
                    ))}
                </div>

                {isOverflow && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white font-bold px-6 py-3 rounded-full shadow-2xl animate-ping-short flex items-center gap-2">
                        <AlertTriangle size={20} /> SEGMENTATION FAULT
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-red-100 dark:bg-red-900/10 border border-red-500/30 p-3 rounded">
                    <code className="text-red-600 dark:text-red-400 text-sm block mb-1">gets(buffer);</code>
                    <p className="text-xs text-muted-foreground">Writes past the end. <strong>CRASH.</strong></p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/10 border border-green-500/30 p-3 rounded">
                    <code className="text-green-600 dark:text-green-400 text-sm block mb-1">fgets(buffer, 8, stdin);</code>
                    <p className="text-xs text-muted-foreground">Stops reading at 7 chars (+1 null). <strong>SAFE.</strong></p>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture1Page() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunitsLD/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Input / Output Mastery</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 2 • Lecture 1</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 border border-blue-500/30 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Terminal size={14} /> Standard I/O
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        Speaking to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-foreground dark:from-blue-400 dark:via-cyan-400 dark:to-white">Console</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Programs are useless if they can't talk. In this lecture, we master <code>printf</code> for beautiful output
                        and <code>scanf</code> for user input, while avoiding the dangerous traps of memory buffers.
                    </p>
                </div>

                {/* SECTION 1: PRINTF */}
                <section>
                    <SectionHeader title="Formatted Output: printf()" icon={Monitor} color="blue" />
                    <p className="text-muted-foreground mb-8">
                        The <code>printf</code> function doesn't just dump text; it formats it. You can control width, precision, and alignment pixel-perfectly.
                    </p>
                    <PrintfStudio />
                </section>

                {/* SECTION 2: SCANF */}
                <section>
                    <SectionHeader title="Formatted Input: scanf()" icon={Keyboard} color="green" />

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-card/50 p-6 rounded-xl border border-border">
                            <h4 className="font-bold text-foreground mb-2">The Ampersand (&) Rule</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                <code>scanf</code> needs to know <strong>where</strong> to put the data. You must pass the memory address.
                            </p>
                            <CodeBlock code={`int age;\nscanf("%d", &age); // ✅ Correct\nscanf("%d", age);  // ❌ CRASH`} />
                        </div>

                        <div className="bg-card/50 p-6 rounded-xl border border-border">
                            <h4 className="font-bold text-foreground mb-2">The Whitespace Trap</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                <code>%d</code> skips spaces automatically. <code>%c</code> does NOT. It will read the "Enter" key from the previous input!
                            </p>
                            <div className="bg-muted p-2 rounded border border-border text-xs font-mono text-green-600 dark:text-green-400">
                                Fix: scanf(" %c", &ch); // Note the space
                            </div>
                        </div>
                    </div>

                    <ScanfStream />

                    <TheoryCard title="Deep Dive: The Phantom Newline" variant="purple">
                        <p>Why does <code>scanf("%c", &ch)</code> sometimes skip input?</p>
                        <ol className="list-decimal pl-5 mt-2 space-y-2 text-sm text-muted-foreground">
                            <li>When you type <code>42</code> and hit <strong>Enter</strong>, you are actually sending <code>'4', '2', '\n'</code> to the input buffer.</li>
                            <li><code>scanf("%d", &num)</code> reads the <code>42</code> but <strong>leaves the <code>\n</code></strong> (newline) in the buffer.</li>
                            <li>The next <code>scanf("%c", &ch)</code> sees that <code>\n</code> waiting and reads it immediately as a valid character.</li>
                            <li><strong>The Fix:</strong> Adding a space <code>" %c"</code> tells scanf to "eat any leading whitespace (including newlines) before reading the char".</li>
                        </ol>
                    </TheoryCard>
                </section>

                {/* SECTION 3: UNSAFE I/O */}
                <section>
                    <SectionHeader title="Unformatted & Dangerous I/O" icon={ShieldAlert} color="red" />

                    <div className="prose prose-invert max-w-none mb-8">
                        <p className="text-muted-foreground">
                            Functions like <code>getchar()</code> and <code>putchar()</code> are simple and fast.
                            However, <code>gets()</code> is the most dangerous function in C history because it causes <strong>Buffer Overflows</strong>.
                        </p>
                    </div>

                    <BufferOverflow />
                </section>

                {/* CHEAT SHEET */}
                <section className="bg-card border border-border rounded-xl p-8">
                    <h3 className="text-xl font-bold text-foreground mb-6">I/O Function Cheat Sheet</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase mb-3">Formatted (Smart)</h4>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex justify-between border-b border-border pb-2">
                                    <code>printf("Fmt", vars...)</code>
                                    <span>Prints to screen</span>
                                </li>
                                <li className="flex justify-between border-b border-border pb-2">
                                    <code>scanf("Fmt", &vars...)</code>
                                    <span>Reads from keyboard</span>
                                </li>
                                <li className="flex justify-between border-b border-border pb-2">
                                    <code>sprintf(str, "Fmt"...)</code>
                                    <span>Prints to a string</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase mb-3">Unformatted (Raw)</h4>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex justify-between border-b border-border pb-2">
                                    <code>getchar()</code>
                                    <span>Read 1 char</span>
                                </li>
                                <li className="flex justify-between border-b border-border pb-2">
                                    <code>putchar(c)</code>
                                    <span>Print 1 char</span>
                                </li>
                                <li className="flex justify-between border-b border-border pb-2">
                                    <code>fgets(str, n, stdin)</code>
                                    <span>Read line safely</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 2 • Lecture 1</p>
            </footer>
        </div>
    );
}
