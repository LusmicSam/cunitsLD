'use client';

import React, { useState, useEffect } from 'react';
import {
    Type,
    AlignLeft,
    Scissors,
    Copy,
    Search,
    Terminal,
    AlertTriangle,
    CheckCircle,
    ArrowRight,
    MoveRight,
    BookOpen,
    Keyboard,
    Scale,
    Ruler,
    Grid,
    Lock,
    XCircle,
    Database
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

const StringAnatomy = () => {
    const [str, setStr] = useState("Hello");
    const [mode, setMode] = useState<'array' | 'pointer'>('array');

    const chars = str.split('');
    const memory = [...chars, '\\0'];

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Type size={20} className="text-blue-400" /> Anatomy of a C String
            </h3>

            <div className="flex justify-between items-center mb-8">
                <div className="flex gap-2">
                    <button
                        onClick={() => setMode('array')}
                        className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${mode === 'array' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                        Array: char s[]
                    </button>
                    <button
                        onClick={() => setMode('pointer')}
                        className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${mode === 'pointer' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                        Pointer: char *s
                    </button>
                </div>
                <input
                    value={str}
                    onChange={e => setStr(e.target.value.slice(0, 8))}
                    className="bg-slate-900 border border-slate-600 rounded p-2 text-white font-mono w-32 text-center"
                    placeholder="Type..."
                />
            </div>

            <div className="relative p-6 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="absolute top-2 left-2 text-[10px] font-bold uppercase text-slate-500">
                    {mode === 'array' ? "Stack Memory (Editable)" : "Read-Only Data Segment"}
                </div>

                <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {memory.map((char, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 group">
                            <div className={`w-12 h-14 flex items-center justify-center text-xl font-bold font-mono border-2 rounded-lg shadow-lg transition-colors
                ${char === '\\0' ? 'bg-red-900/40 border-red-500 text-red-300' :
                                    mode === 'array' ? 'bg-blue-900/20 border-blue-500 text-white' : 'bg-purple-900/20 border-purple-500 text-white'}
              `}>
                                {char === ' ' ? 'SPC' : char}
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">[{i}]</span>
                        </div>
                    ))}
                </div>

                {mode === 'pointer' && (
                    <div className="absolute top-2 right-2">
                        <Lock size={16} className="text-purple-400" />
                    </div>
                )}
            </div>

            <div className="mt-4 text-center text-xs text-slate-400">
                {mode === 'array'
                    ? "Arrays are allocated on the Stack. You can change individual characters: s[0] = 'X';"
                    : "String literals are stored in Read-Only Memory. Trying s[0] = 'X' causes a crash!"}
            </div>
        </div>
    );
};

const AssignmentLab = () => {
    const [step, setStep] = useState<'init' | 'assign' | 'strcpy'>('init');

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Copy size={20} className="text-orange-400" /> Assignment vs Copying
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <button
                        onClick={() => setStep('init')}
                        className={`w-full p-3 rounded-lg border text-left text-xs font-mono transition-all ${step === 'init' ? 'bg-slate-800 border-white' : 'bg-slate-900 border-slate-800 opacity-60'}`}
                    >
                        char s[10] = "Hi";
                    </button>

                    <button
                        onClick={() => setStep('assign')}
                        className={`w-full p-3 rounded-lg border text-left text-xs font-mono transition-all ${step === 'assign' ? 'bg-red-900/20 border-red-500 text-red-300' : 'bg-slate-900 border-slate-800 opacity-60'}`}
                    >
                        s = "Bye"; // ERROR
                    </button>

                    <button
                        onClick={() => setStep('strcpy')}
                        className={`w-full p-3 rounded-lg border text-left text-xs font-mono transition-all ${step === 'strcpy' ? 'bg-green-900/20 border-green-500 text-green-300' : 'bg-slate-900 border-slate-800 opacity-60'}`}
                    >
                        strcpy(s, "Bye"); // CORRECT
                    </button>
                </div>

                <div className="flex items-center justify-center bg-black/40 rounded-xl border border-slate-800 relative overflow-hidden">
                    {step === 'init' && (
                        <div className="text-center animate-in zoom-in">
                            <div className="text-4xl font-mono text-white mb-2">"Hi\0"</div>
                            <div className="text-xs text-slate-500">Initialized on Stack</div>
                        </div>
                    )}

                    {step === 'assign' && (
                        <div className="text-center animate-in shake">
                            <XCircle size={48} className="text-red-500 mx-auto mb-2" />
                            <div className="text-lg font-bold text-red-400">Compilation Error</div>
                            <p className="text-xs text-red-300 mt-2 px-4">
                                Arrays are constant pointers. You cannot change the <i>address</i> 's' points to.
                            </p>
                        </div>
                    )}

                    {step === 'strcpy' && (
                        <div className="text-center animate-in zoom-in">
                            <div className="text-4xl font-mono text-green-400 mb-2">"Bye\0"</div>
                            <div className="text-xs text-green-600">Memory Overwritten Successfully</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SizeofTrap = () => {
    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Ruler size={20} className="text-yellow-400" /> The Sizeof Trap
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Array Case */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-blue-400 uppercase">Case 1: Array</span>
                        <Database size={16} className="text-blue-400" />
                    </div>
                    <CodeBlock title="Code" code={'char s[10] = "Hi";'} />

                    <div className="space-y-2 mt-4">
                        <div className="flex justify-between items-center bg-black/30 p-2 rounded">
                            <code className="text-xs text-slate-300">sizeof(s)</code>
                            <span className="font-bold text-green-400">10</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/30 p-2 rounded">
                            <code className="text-xs text-slate-300">strlen(s)</code>
                            <span className="font-bold text-blue-400">2</span>
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">
                        Sizeof gives the <strong>total capacity</strong> allocated.
                    </p>
                </div>

                {/* Pointer Case */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-purple-400 uppercase">Case 2: Pointer</span>
                        <ArrowRight size={16} className="text-purple-400" />
                    </div>
                    <CodeBlock title="Code" code={'char *p = "Hi";'} />

                    <div className="space-y-2 mt-4">
                        <div className="flex justify-between items-center bg-black/30 p-2 rounded">
                            <code className="text-xs text-slate-300">sizeof(p)</code>
                            <span className="font-bold text-yellow-400">8 (or 4)</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/30 p-2 rounded">
                            <code className="text-xs text-slate-300">strlen(p)</code>
                            <span className="font-bold text-blue-400">2</span>
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">
                        Sizeof gives the size of the <strong>pointer address itself</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
};

const LibraryBench = () => {
    const [func, setFunc] = useState<'strlen' | 'strcpy' | 'strcat'>('strlen');
    const [src, setSrc] = useState("World");
    const [dest, setDest] = useState("Hello");
    const [animating, setAnimating] = useState(false);

    // Simulation State
    const [buffer, setBuffer] = useState<string[]>([]);
    const MAX_SIZE = 10;

    useEffect(() => {
        // Reset buffer when function changes
        if (func === 'strcpy') setBuffer(Array(MAX_SIZE).fill('\0'));
        if (func === 'strcat') {
            const init = "Hi".split('');
            const padded = [...init, ...Array(MAX_SIZE - init.length).fill('\0')];
            setBuffer(padded);
            setDest("Hi");
        }
    }, [func]);

    const runSim = () => {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 2000);
    };

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen size={20} className="text-green-400" /> The String Library (&lt;string.h&gt;)
            </h3>

            <div className="flex gap-2 mb-8 justify-center">
                {['strlen', 'strcpy', 'strcat'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFunc(f as any)}
                        className={`px-4 py-2 rounded-full font-bold text-sm transition-all font-mono ${func === f ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Controls */}
                <div className="space-y-4">
                    {func === 'strlen' && (
                        <div className="space-y-2">
                            <label className="text-xs text-slate-500 font-bold uppercase">Input String</label>
                            <input value={src} onChange={e => setSrc(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white font-mono" />
                            <div className="p-4 bg-slate-800 rounded text-center">
                                <span className="text-slate-400 text-xs block mb-1">Result</span>
                                <span className="text-4xl font-mono font-bold text-green-400">{src.length}</span>
                            </div>
                        </div>
                    )}

                    {func === 'strcpy' && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-slate-500 font-bold uppercase">Source (src)</label>
                                <input value={src} onChange={e => setSrc(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white font-mono" />
                            </div>
                            <div className="p-3 bg-slate-800 rounded border border-slate-700 text-xs text-slate-400">
                                <code>strcpy(dest, src);</code> copies data char by char, including <code>\0</code>.
                            </div>
                        </div>
                    )}

                    {func === 'strcat' && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-slate-500 font-bold uppercase">Destination (dest)</label>
                                <div className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white font-mono">Hi</div>
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 font-bold uppercase">Source (src)</label>
                                <input value={src} onChange={e => setSrc(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white font-mono" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Visualizer */}
                <div className="bg-black/50 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[200px]">
                    {func === 'strlen' && (
                        <div className="flex gap-1 flex-wrap justify-center">
                            {src.split('').map((c, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="w-8 h-10 border border-green-500/50 text-green-300 flex items-center justify-center rounded bg-green-900/10 font-bold">1</div>
                                    <span className="text-[10px] text-slate-500 mt-1">{c}</span>
                                </div>
                            ))}
                            <div className="flex flex-col items-center opacity-50">
                                <div className="w-8 h-10 border border-slate-700 text-slate-600 flex items-center justify-center rounded">0</div>
                                <span className="text-[10px] text-slate-500 mt-1">\0</span>
                            </div>
                        </div>
                    )}

                    {(func === 'strcpy' || func === 'strcat') && (
                        <div className="w-full">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-2 text-center">Destination Buffer (Size 10)</div>
                            <div className="flex border-2 border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                                {Array.from({ length: 10 }).map((_, i) => {
                                    let char = '';
                                    let isNew = false;
                                    let isOverflow = false;

                                    if (func === 'strcpy') {
                                        if (i < src.length) { char = src[i]; isNew = true; }
                                        else if (i === src.length) { char = '\\0'; isNew = true; }
                                        else char = ''; // Empty
                                    } else {
                                        // strcat logic: dest is "Hi" (length 2)
                                        const destLen = 2;
                                        if (i < destLen) char = "Hi"[i];
                                        else if (i < destLen + src.length) { char = src[i - destLen]; isNew = true; }
                                        else if (i === destLen + src.length) { char = '\\0'; isNew = true; }
                                    }

                                    // Overflow check
                                    if ((func === 'strcpy' && src.length >= 10) || (func === 'strcat' && (2 + src.length) >= 10)) {
                                        isOverflow = true;
                                    }

                                    return (
                                        <div key={i} className={`flex-1 h-12 flex items-center justify-center border-r border-slate-800 font-mono text-sm
                       ${isNew ? 'text-green-400 font-bold bg-green-900/10' : 'text-slate-500'}
                       ${isOverflow && i === 9 ? 'bg-red-900/50 text-red-200 animate-pulse' : ''}
                     `}>
                                            {char}
                                        </div>
                                    );
                                })}
                            </div>
                            {(func === 'strcpy' && src.length >= 10) || (func === 'strcat' && (2 + src.length) >= 10) ? (
                                <div className="mt-2 text-center text-red-500 text-xs font-bold flex items-center justify-center gap-2">
                                    <AlertTriangle size={12} /> BUFFER OVERFLOW DETECTED
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ComparisonCourt = () => {
    const [s1, setS1] = useState("Apple");
    const [s2, setS2] = useState("Apricot");
    const [idx, setIdx] = useState(0);

    // Comparison Logic
    const compare = () => {
        let i = 0;
        while (i < s1.length && i < s2.length) {
            if (s1[i] !== s2[i]) return { idx: i, res: s1.charCodeAt(i) - s2.charCodeAt(i) };
            i++;
        }
        return { idx: i, res: s1.length - s2.length };
    };

    const { idx: stopIdx, res } = compare();

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Scale size={20} className="text-orange-400" /> Comparison Court (strcmp)
            </h3>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                    <label className="text-xs text-slate-500 font-bold uppercase mb-1">String 1</label>
                    <input value={s1} onChange={e => setS1(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white font-mono" />
                </div>
                <div>
                    <label className="text-xs text-slate-500 font-bold uppercase mb-1">String 2</label>
                    <input value={s2} onChange={e => setS2(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white font-mono" />
                </div>
            </div>

            <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: Math.max(s1.length, s2.length) }).map((_, i) => (
                    <div key={i} className={`flex flex-col items-center w-8 transition-opacity duration-500 ${i > stopIdx ? 'opacity-20' : 'opacity-100'}`}>
                        <div className={`w-8 h-8 border-b border-slate-700 flex items-center justify-center font-mono ${i === stopIdx ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>
                            {s1[i] || '\\0'}
                        </div>
                        <div className={`w-8 h-8 flex items-center justify-center font-mono ${i === stopIdx ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>
                            {s2[i] || '\\0'}
                        </div>
                        {i === stopIdx && (
                            <div className="mt-2 text-[10px] text-orange-400 font-bold">DIFF</div>
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-black/40 p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-xs text-slate-500 font-bold uppercase mb-2">Return Value</div>
                <div className={`text-4xl font-black ${res === 0 ? 'text-green-500' : res < 0 ? 'text-blue-400' : 'text-purple-400'}`}>
                    {res}
                </div>
                <div className="text-sm text-slate-300 mt-2">
                    {res === 0 && "Strings are Identical"}
                    {res < 0 && `String 1 is lexicographically SMALLER ('${s1[stopIdx] || '\\0'}' < '${s2[stopIdx] || '\\0'}')`}
                    {res > 0 && `String 1 is lexicographically LARGER ('${s1[stopIdx] || '\\0'}' > '${s2[stopIdx] || '\\0'}')`}
                </div>
            </div>
        </div>
    );
};

const IOStudio = () => {
    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Keyboard size={20} className="text-pink-400" /> Input/Output Studio
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
                    <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2"><AlertTriangle size={16} /> The Danger: scanf / gets</h4>
                    <CodeBlock code={'char name[5];\nscanf("%s", name); // Input: "Jonathan"\n// CRASH! Buffer overflow.'} />
                    <p className="text-xs text-slate-400 mt-2">
                        <code>scanf</code> stops at spaces. <code>gets</code> doesn't check size. Both are risky.
                    </p>
                </div>

                <div className="bg-green-900/10 border border-green-500/20 p-4 rounded-xl">
                    <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2"><CheckCircle size={16} /> The Solution: fgets</h4>
                    <CodeBlock code={'char name[5];\nfgets(name, 5, stdin); // Input: "Jonathan"\n// Reads "Jona\\0". Safe.'} />
                    <p className="text-xs text-slate-400 mt-2">
                        <code>fgets</code> reads entire lines (including spaces) but respects buffer size limit.
                    </p>
                </div>
            </div>
        </div>
    );
};

const MatrixVisualizer = () => {
    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Grid size={20} className="text-purple-400" /> 2D Strings (Matrix)
            </h3>

            <div className="flex flex-col gap-4 items-center">
                <div className="text-sm text-slate-300 font-mono bg-black/30 p-2 rounded">
                    char names[3][5] = {"{"}"Tom", "Sam", "Joy"{"}"};
                </div>

                <div className="border-2 border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                    {["Tom", "Sam", "Joy"].map((name, row) => (
                        <div key={row} className="flex border-b border-slate-700 last:border-0">
                            {/* 5 columns */}
                            {[0, 1, 2, 3, 4].map(col => {
                                const char = name[col] || (col === name.length ? '\\0' : '');
                                return (
                                    <div key={col} className="w-12 h-12 flex flex-col items-center justify-center border-r border-slate-700 last:border-0">
                                        <span className={`font-bold ${char === '\\0' ? 'text-purple-400' : 'text-white'}`}>
                                            {char}
                                        </span>
                                        <span className="text-[8px] text-slate-600">[{row}][{col}]</span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture1Page() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-32">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-white text-sm leading-tight">String Theory</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 6 • Lecture 1</p>
                    </div>
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-pink-900/20 border border-pink-500/30 text-pink-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Type size={14} /> Character Arrays
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                        Strings: The <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-white">Null</span> Identity
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        There is no "String" type in C. Just arrays of characters ending with a secret ghost character: <code>\0</code>.
                    </p>
                </div>

                {/* SECTION 1: ANATOMY */}
                <section>
                    <SectionHeader title="The Null Terminator" icon={Type} color="blue" />
                    <TheoryCard title="The '\0' Rule" variant="blue">
                        <p className="mb-2">A string in C is a contiguous sequence of characters terminated by the null character.</p>
                        <ul className="list-disc pl-4 space-y-1 text-sm text-slate-300">
                            <li><strong>Declaration:</strong> <code>char str[] = "Hi";</code> (Size is 3: 'H', 'i', '\0')</li>
                            <li><strong>Purpose:</strong> Tells functions like <code>printf</code> where the string ends.</li>
                            <li><strong>Consequence:</strong> If missing, the computer keeps reading memory until it finds a random 0 (Garbage printing).</li>
                        </ul>
                    </TheoryCard>
                    <StringAnatomy />
                </section>

                {/* SECTION 2: ASSIGNMENT VS COPY */}
                <section>
                    <SectionHeader title="Assignment Logic" icon={Copy} color="orange" />
                    <TheoryCard title="Why 'str = new' Fails" variant="red">
                        <p className="text-sm text-slate-300">
                            Array names are <strong>constant pointers</strong>. You cannot change the address they point to.
                            To change the content, you must copy data byte-by-byte (using <code>strcpy</code>).
                        </p>
                    </TheoryCard>
                    <AssignmentLab />
                </section>

                {/* SECTION 3: LIBRARY */}
                <section>
                    <SectionHeader title="String Manipulation" icon={Scissors} color="green" />
                    <p className="text-slate-400 mb-8">
                        The <code>string.h</code> library provides tools to measure, copy, and concatenate strings.
                        <strong>Warning:</strong> None of these check for buffer overflow automatically!
                    </p>
                    <LibraryBench />
                </section>

                {/* SECTION 4: THE SIZEOF TRAP */}
                <section>
                    <SectionHeader title="The Interview Trap" icon={Ruler} color="yellow" />
                    <p className="text-slate-400 mb-8">
                        Do not confuse the size of the container (Array) with the length of the string (Strlen) or the size of the pointer.
                    </p>
                    <SizeofTrap />
                </section>

                {/* SECTION 5: MATRIX */}
                <section>
                    <SectionHeader title="2D String Arrays" icon={Grid} color="purple" />
                    <MatrixVisualizer />
                </section>

                {/* SECTION 6: COMPARISON */}
                <section>
                    <SectionHeader title="String Comparison" icon={Terminal} color="orange" />
                    <TheoryCard title="Comparing Texts" variant="orange">
                        <p className="text-sm text-slate-300">
                            You cannot use <code>==</code> to compare strings (that compares addresses!).
                            Use <code>strcmp(s1, s2)</code>.
                            <br /><br />
                            It returns:
                            <br />• <strong>0</strong> if equal.
                            <br />• <strong>&lt; 0</strong> if s1 comes before s2 (ASCII).
                            <br />• <strong>&gt; 0</strong> if s1 comes after s2 (ASCII).
                        </p>
                    </TheoryCard>
                    <ComparisonCourt />
                </section>

                {/* SECTION 7: I/O */}
                <section>
                    <SectionHeader title="Safe Input/Output" icon={Keyboard} color="pink" />
                    <IOStudio />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-slate-800 bg-[#020617] py-12 text-center text-slate-600 text-sm">
                <p>C Programming Course • Unit 6 • Lecture 1</p>
            </footer>
        </div>
    );
}
