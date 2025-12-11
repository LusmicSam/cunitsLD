"use client";

import React, { useState, useEffect } from 'react';
import {
    Book,
    Search,
    Calculator,
    Terminal,
    Clock,
    Type,
    Globe,
    Box,
    FileCode,
    CheckCircle,
    HelpCircle,
    Hash,
    Move,
    RefreshCw,
    Zap
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

const MathLab = () => {
    const [val, setVal] = useState<number>(16);

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Calculator size={20} className="text-green-400" /> Math.h Playground
            </h3>

            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 w-full">
                    <label className="text-xs text-slate-500 uppercase font-bold mb-2 block">Input Number</label>
                    <input
                        type="range"
                        min="-10"
                        max="100"
                        value={val}
                        onChange={e => setVal(Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                    <div className="text-center mt-2 font-mono text-xl font-bold text-white">{val}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 flex-1 w-full">
                    <div className="bg-slate-900 p-3 rounded border border-slate-800">
                        <div className="text-xs text-slate-500 mb-1">sqrt({val})</div>
                        <div className="font-mono text-green-400">
                            {val >= 0 ? Math.sqrt(val).toFixed(2) : "NaN"}
                        </div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded border border-slate-800">
                        <div className="text-xs text-slate-500 mb-1">pow({val}, 2)</div>
                        <div className="font-mono text-blue-400">{Math.pow(val, 2)}</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded border border-slate-800">
                        <div className="text-xs text-slate-500 mb-1">abs({val})</div>
                        <div className="font-mono text-yellow-400">{Math.abs(val)}</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded border border-slate-800">
                        <div className="text-xs text-slate-500 mb-1">ceil({val})</div>
                        <div className="font-mono text-purple-400">{Math.ceil(val)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StringStudio = () => {
    const [s1, setS1] = useState("Hello");
    const [s2, setS2] = useState("World");
    const [active, setActive] = useState<'len' | 'cat' | 'cmp'>('len');

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Type size={20} className="text-purple-400" /> String.h Analyzer
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">String 1</label>
                    <input
                        value={s1}
                        onChange={e => setS1(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono text-sm focus:border-purple-500 focus:outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">String 2</label>
                    <input
                        value={s2}
                        onChange={e => setS2(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono text-sm focus:border-purple-500 focus:outline-none transition-colors"
                    />
                </div>
            </div>

            <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4">
                {[
                    { id: 'len', label: 'strlen', desc: 'Length' },
                    { id: 'cat', label: 'strcat', desc: 'Concat' },
                    { id: 'cmp', label: 'strcmp', desc: 'Compare' },
                ].map(m => (
                    <button
                        key={m.id}
                        onClick={() => setActive(m.id as any)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${active === m.id ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                        {m.label}()
                    </button>
                ))}
            </div>

            <div className="bg-black/50 p-6 rounded-xl border border-slate-800 text-center min-h-[120px] flex items-center justify-center flex-col">
                {active === 'len' && (
                    <div className="space-y-2 animate-in fade-in">
                        <div className="text-slate-400">Length of <span className="text-white">"{s1}"</span> is:</div>
                        <div className="text-4xl font-black text-purple-400">{s1.length}</div>
                    </div>
                )}
                {active === 'cat' && (
                    <div className="space-y-2 animate-in fade-in">
                        <div className="text-slate-400">Concatenation:</div>
                        <div className="text-2xl font-mono text-green-400">"{s1}{s2}"</div>
                    </div>
                )}
                {active === 'cmp' && (
                    <div className="space-y-2 animate-in fade-in">
                        <div className="text-slate-400">Comparison Result:</div>
                        <div className={`text-4xl font-black ${s1 === s2 ? 'text-green-400' : 'text-red-400'}`}>
                            {s1 === s2 ? "0 (Equal)" : Math.sign(s1.localeCompare(s2))}
                        </div>
                        <div className="text-xs text-slate-500">{s1 === s2 ? "Strings are identical" : "Strings are different"}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

const CTypeLab = () => {
    const [char, setChar] = useState('A');

    const check = (c: string) => {
        const code = c.charCodeAt(0);
        return {
            alpha: /[a-zA-Z]/.test(c),
            digit: /[0-9]/.test(c),
            lower: /[a-z]/.test(c),
            upper: /[A-Z]/.test(c),
            space: /\s/.test(c)
        };
    };

    const results = check(char);

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Hash size={20} className="text-blue-400" /> CType.h Inspector
            </h3>

            <div className="flex flex-col items-center gap-6">
                <input
                    maxLength={1}
                    value={char}
                    onChange={e => setChar(e.target.value.slice(0, 1))}
                    className="w-24 h-24 text-center text-6xl font-black bg-slate-900 border-2 border-blue-500 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all uppercase"
                />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-lg">
                    <div className={`p-3 rounded border text-center transition-colors ${results.alpha ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>
                        <div className="font-bold text-sm">isalpha()</div>
                        <div className="text-xs mt-1">{results.alpha ? 'True' : 'False'}</div>
                    </div>
                    <div className={`p-3 rounded border text-center transition-colors ${results.digit ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>
                        <div className="font-bold text-sm">isdigit()</div>
                        <div className="text-xs mt-1">{results.digit ? 'True' : 'False'}</div>
                    </div>
                    <div className={`p-3 rounded border text-center transition-colors ${results.space ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>
                        <div className="font-bold text-sm">isspace()</div>
                        <div className="text-xs mt-1">{results.space ? 'True' : 'False'}</div>
                    </div>
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
                        <h1 className="font-bold text-white text-sm leading-tight">Standard Libraries</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 3 • Lecture 5</p>
                    </div>
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-900/20 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Book size={14} /> The Toolbelt
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                        Stand on the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-white">Shoulders of Giants</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Don't reinvent the wheel. C comes with powerful built-in libraries for math, string manipulation, and type checking.
                    </p>
                </div>

                {/* SECTION 1: MATH.H */}
                <section>
                    <SectionHeader title="Math Magic: <math.h>" icon={Calculator} color="green" />
                    <p className="text-slate-400 mb-8">
                        Provides functions for advanced mathematical calculations. (Note: On Linux, compile with <code>-lm</code>).
                    </p>
                    <CodeBlock
                        title="Common Functions"
                        code={`#include <math.h>\n\ndouble root = sqrt(25.0); // 5.0\ndouble p = pow(2.0, 3.0); // 8.0\ndouble a = abs(-10); // 10`}
                    />
                    <MathLab />
                </section>

                {/* SECTION 2: STRING.H */}
                <section>
                    <SectionHeader title="String Mastery: <string.h>" icon={Type} color="purple" />
                    <p className="text-slate-400 mb-8">
                        C strings are just character arrays, so we need special functions to copy, compare, and modify them.
                    </p>
                    <StringStudio />
                </section>

                {/* SECTION 3: CTYPE.H */}
                <section>
                    <SectionHeader title="Character Checks: <ctype.h>" icon={Hash} color="blue" />
                    <p className="text-slate-400 mb-8">
                        Functions to test and map characters (e.g., checking if a char is a digit or converting to uppercase).
                    </p>
                    <CTypeLab />
                </section>

                {/* SECTION 4: STDLIB.H */}
                <section>
                    <SectionHeader title="The General Utilities: <stdlib.h>" icon={Box} color="orange" />
                    <TheoryCard title="Key Functions" variant="orange">
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li className="flex gap-3">
                                <strong className="text-white min-w-[100px] font-mono">malloc()</strong>
                                <span>Memory Allocation. Reserves space on the Heap (Unit 5).</span>
                            </li>
                            <li className="flex gap-3">
                                <strong className="text-white min-w-[100px] font-mono">exit(0)</strong>
                                <span>Terminates the program immediately.</span>
                            </li>
                            <li className="flex gap-3">
                                <strong className="text-white min-w-[100px] font-mono">rand()</strong>
                                <span>Generates a pseudo-random integer.</span>
                            </li>
                            <li className="flex gap-3">
                                <strong className="text-white min-w-[100px] font-mono">atoi()</strong>
                                <span>Converts a string "123" to integer 123.</span>
                            </li>
                        </ul>
                    </TheoryCard>
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 text-center">
                        <div className="mb-4 text-xs font-bold text-slate-500 uppercase">Random Number Generator</div>
                        <div className="text-4xl font-black text-orange-400 mb-4 animate-pulse">{Math.floor(Math.random() * 100)}</div>
                        <div className="text-xs text-slate-600 font-mono">rand() % 100</div>
                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-slate-800 bg-[#020617] py-12 text-center text-slate-600 text-sm">
                <p>C Programming Course • Unit 3 • Lecture 5</p>
            </footer>
        </div>
    );
}
