"use client";

import React, { useState, useEffect } from 'react';
import {
    Scale,
    ArrowRight,
    Zap,
    AlertTriangle,
    HelpCircle,
    Code,
    CheckCircle,
    XCircle,
    Divide,
    Cpu,
    Layers,
    MousePointer2,
    Binary,
    ArrowRightLeft
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
            <span className="text-xs text-muted-foreground uppercase">{title || "C Snippet"}</span>
        </div>
        <div className="p-4 text-foreground overflow-x-auto whitespace-pre leading-relaxed">
            {code}
        </div>
    </div>
);

const TheoryCard = ({ title, children, variant = 'blue' }: { title: string, children: React.ReactNode, variant?: string }) => {
    const colors: Record<string, string> = {
        blue: 'border-blue-500 bg-blue-100 dark:bg-blue-900/10',
        purple: 'border-purple-500 bg-purple-100 dark:bg-purple-900/10',
        orange: 'border-orange-500 bg-orange-100 dark:bg-orange-900/10',
        red: 'border-red-500 bg-red-100 dark:bg-red-900/10',
        yellow: 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/10',
        green: 'border-green-500 bg-green-100 dark:bg-green-900/10'
    };

    return (
        <div className={`border-l-4 ${colors[variant]} rounded-r-lg p-6 my-6 transition-all hover:bg-opacity-80 backdrop-blur-sm`}>
            <h4 className={`text-lg font-bold flex items-center gap-2 mb-3 ${variant === 'blue' ? 'text-blue-700 dark:text-blue-300' :
                variant === 'purple' ? 'text-purple-700 dark:text-purple-300' :
                    variant === 'orange' ? 'text-orange-700 dark:text-orange-300' :
                        variant === 'red' ? 'text-red-700 dark:text-red-300' :
                            variant === 'yellow' ? 'text-yellow-700 dark:text-yellow-300' :
                                'text-green-700 dark:text-green-300'
                }`}>
                {title}
            </h4>
            <div className="text-foreground/80 text-sm leading-relaxed space-y-2">
                {children}
            </div>
        </div>
    );
};

// --- INTERACTIVE COMPONENTS ---

const TernaryVisualizer = () => {
    const [age, setAge] = useState(16);

    const status = age >= 18 ? "Adult" : "Minor";
    const color = age >= 18 ? "text-green-400" : "text-orange-400";
    const bg = age >= 18 ? "bg-green-600" : "bg-orange-600";

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <ArrowRightLeft size={20} className="text-purple-600 dark:text-purple-400" /> The One-Liner (Ternary Operator)
            </h3>

            <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4">
                    <label className="text-sm font-bold text-muted-foreground">Age Input:</label>
                    <input
                        type="range" min="10" max="25" value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-48 accent-purple-500"
                    />
                    <span className="font-mono text-foreground bg-muted px-3 py-1 rounded">{age}</span>
                </div>

                <div className="font-mono text-sm md:text-base bg-muted/80 p-4 rounded-lg flex flex-wrap gap-2 items-center justify-center border border-border">
                    <span className="text-muted-foreground">status = </span>
                    <span className="text-foreground">(age &gt;= 18)</span>
                    <span className="text-yellow-600 dark:text-yellow-500 font-bold">?</span>
                    <span className="text-green-600 dark:text-green-400">"Adult"</span>
                    <span className="text-yellow-600 dark:text-yellow-500 font-bold">:</span>
                    <span className="text-orange-600 dark:text-orange-400">"Minor"</span>
                    <span className="text-muted-foreground">;</span>
                </div>

                <div className="flex flex-col items-center animate-in zoom-in duration-300">
                    <div className={`text-5xl font-black ${color} mb-2`}>{status}</div>
                    <div className={`h-1.5 w-32 rounded-full ${bg} transition-all`}></div>
                </div>
            </div>
        </div>
    );
};

const ShortCircuitLab = () => {
    const [A, setA] = useState(true);
    const [B, setB] = useState(true);

    return (
        <div className="grid md:grid-cols-2 gap-8 my-8">
            {/* AND Logic */}
            <div className="bg-card/50 p-6 rounded-xl border border-blue-500/30">
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                    <Zap size={18} /> Logical AND (&&)
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                    If First is FALSE, the Second is <strong>ignored</strong> (Short Circuit).
                </p>

                <div className="flex items-center gap-2 mb-6 justify-center">
                    <button onClick={() => setA(!A)} className={`px-3 py-1 rounded text-xs font-bold ${A ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'}`}>
                        A: {A ? 'TRUE' : 'FALSE'}
                    </button>
                    <span className="font-bold text-muted-foreground">&&</span>
                    <button onClick={() => setB(!B)} className={`px-3 py-1 rounded text-xs font-bold transition-all ${B ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'} ${!A ? 'opacity-30' : ''}`}>
                        B: {B ? 'TRUE' : 'FALSE'}
                    </button>
                </div>

                <div className="relative bg-muted h-24 rounded-lg flex items-center justify-center gap-8 border border-border overflow-hidden">
                    <div className={`absolute inset-0 bg-red-900/10 pointer-events-none transition-opacity ${!A ? 'opacity-100' : 'opacity-0'}`}></div>

                    <div className={`flex flex-col items-center ${A ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        <span className="text-xs font-bold mb-1">Step 1</span>
                        {A ? <CheckCircle /> : <XCircle />}
                    </div>

                    <ArrowRight className={`transition-all ${!A ? 'text-muted-foreground opacity-20' : 'text-muted-foreground'}`} />

                    <div className={`flex flex-col items-center transition-all ${!A ? 'opacity-20 blur-sm' : 'opacity-100'} ${B ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        <span className="text-xs font-bold mb-1">Step 2</span>
                        {B ? <CheckCircle /> : <XCircle />}
                    </div>

                    {!A && (
                        <div className="absolute top-2 right-2 text-[10px] bg-red-900 text-red-100 px-2 py-0.5 rounded border border-red-500 animate-pulse">
                            SHORT CIRCUITED!
                        </div>
                    )}
                </div>
            </div>

            {/* OR Logic */}
            <div className="bg-card/50 p-6 rounded-xl border border-orange-500/30">
                <h3 className="font-bold text-orange-600 dark:text-orange-400 mb-4 flex items-center gap-2">
                    <Zap size={18} className="rotate-180" /> Logical OR (||)
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                    If First is TRUE, the Second is <strong>ignored</strong> (Short Circuit).
                </p>

                <div className="flex items-center gap-2 mb-6 justify-center">
                    <button onClick={() => setA(!A)} className={`px-3 py-1 rounded text-xs font-bold ${A ? 'bg-orange-600 text-white' : 'bg-muted text-muted-foreground'}`}>
                        A: {A ? 'TRUE' : 'FALSE'}
                    </button>
                    <span className="font-bold text-muted-foreground">||</span>
                    <button onClick={() => setB(!B)} className={`px-3 py-1 rounded text-xs font-bold transition-all ${B ? 'bg-orange-600 text-white' : 'bg-muted text-muted-foreground'} ${A ? 'opacity-30' : ''}`}>
                        B: {B ? 'TRUE' : 'FALSE'}
                    </button>
                </div>

                <div className="relative bg-muted h-24 rounded-lg flex items-center justify-center gap-8 border border-border overflow-hidden">

                    <div className={`flex flex-col items-center ${A ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        <span className="text-xs font-bold mb-1">Step 1</span>
                        {A ? <CheckCircle /> : <XCircle />}
                    </div>

                    <ArrowRight className={`transition-all ${A ? 'text-muted-foreground opacity-20' : 'text-muted-foreground'}`} />

                    <div className={`flex flex-col items-center transition-all ${A ? 'opacity-20 blur-sm' : 'opacity-100'} ${B ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        <span className="text-xs font-bold mb-1">Step 2</span>
                        {B ? <CheckCircle /> : <XCircle />}
                    </div>

                    {A && (
                        <div className="absolute top-2 right-2 text-[10px] bg-orange-900 text-orange-100 px-2 py-0.5 rounded border border-orange-500 animate-pulse">
                            SHORT CIRCUITED!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TypeCastLab = () => {
    const [val, setVal] = useState(3.9);

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Layers size={20} className="text-red-500" /> Type Casting (Data Loss)
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12">

                {/* Source */}
                <div className="text-center">
                    <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Source (float)</label>
                    <input
                        type="number" step="0.1" value={val} onChange={e => setVal(Number(e.target.value))}
                        className="bg-muted border border-border rounded p-3 text-xl text-foreground w-32 text-center"
                    />
                    <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-mono">
                        Binary Representation (IEEE 754)<br />has decimals
                    </div>
                </div>

                <ArrowRight className="text-muted-foreground hidden md:block" size={32} />

                <div className="bg-muted p-4 rounded-lg font-mono flex flex-col items-center border border-border">
                    <div className="text-muted-foreground text-xs mb-1">Operation</div>
                    <div className="text-lg text-foreground"><span className="text-red-600 dark:text-red-400 font-bold">(int)</span> {val}</div>
                </div>

                <ArrowRight className="text-muted-foreground hidden md:block" size={32} />

                {/* Destination */}
                <div className="text-center">
                    <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Result (int)</label>
                    <div className="bg-red-100 dark:bg-red-900/20 border border-red-500/50 rounded p-3 text-xl text-red-700 dark:text-red-300 w-32 flex items-center justify-center h-[54px] font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                        {Math.floor(val)}
                    </div>
                    <div className="mt-2 text-xs text-red-600 dark:text-red-400 font-mono">
                        Significant Data Loss!<br />.{(val % 1).toFixed(2).substring(2)} discarded
                    </div>
                </div>

            </div>
        </div>
    );
};

const SizeofVisualizer = () => {
    const types = [
        { name: 'char', start: 1, color: 'bg-yellow-500' },
        { name: 'short', size: 2, color: 'bg-green-500' },
        { name: 'int', size: 4, color: 'bg-blue-500' },
        { name: 'long', size: 8, color: 'bg-purple-500', note: '(64-bit)' },
        { name: 'float', size: 4, color: 'bg-cyan-500' },
        { name: 'double', size: 8, color: 'bg-pink-500' },
    ];

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8 overflow-hidden">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Scale size={20} className="text-green-600 dark:text-green-400" /> Memory Scale (sizeof)
            </h3>

            <p className="text-sm text-muted-foreground mb-6">
                Every data type occupies a specific amount of RAM. 1 Byte = 8 bits.
            </p>

            <div className="space-y-4">
                {types.map((t) => (
                    <div key={t.name} className="flex items-center gap-4 group">
                        <div className="w-16 text-right font-mono text-xs font-bold text-muted-foreground">{t.name}</div>

                        <div className="flex-1 bg-muted rounded-lg p-1 flex items-center gap-[2px] h-10 relative overflow-hidden max-w-md">
                            {Array.from({ length: t.size || t.start || 1 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-full flex-1 rounded-sm ${t.color} opacity-70 group-hover:opacity-100 transition-opacity border-r last:border-0 border-black/20`}
                                ></div>
                            ))}
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-foreground drop-shadow-md">
                                {t.size || t.start} Bytes
                            </div>
                        </div>

                        <div className="text-[10px] text-muted-foreground font-mono w-24">
                            {(t.size || t.start || 0) * 8} bits
                            {t.note && <span className="block text-muted-foreground">{t.note}</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture4Page() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Advanced Logic & Types</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 2 • Lecture 4</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/20 border border-purple-500/30 text-purple-600 dark:text-purple-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Cpu size={14} /> Low-Level Mastery
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        Logic Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-foreground dark:from-purple-400 dark:via-pink-400 dark:to-white">Basics</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Master the ternary operator for cleaner code, understand how data is really stored, and avoid the treacherous pitfalls of type casting.
                    </p>
                </div>

                {/* SECTION 1: TERNARY OPERATOR */}
                <section>
                    <SectionHeader title="The Conditional Operator" icon={ArrowRightLeft} color="purple" />

                    <TheoryCard title="The 'One-Liner' Decision" variant="purple">
                        <p className="mb-4">
                            The only operator in C that takes <strong>three</strong> operands. It's a shorthand for <code>if-else</code>.
                        </p>
                        <div className="bg-muted p-3 rounded border border-border font-mono text-sm text-center">
                            Condition ? <span className="text-green-600 dark:text-green-400">Value If True</span> : <span className="text-red-600 dark:text-red-400">Value If False</span>
                        </div>
                    </TheoryCard>

                    <TernaryVisualizer />
                </section>

                {/* SECTION 2: SHORT CIRCUITING */}
                <section>
                    <SectionHeader title="Short Circuiting Logic" icon={Zap} color="yellow" />

                    <p className="text-muted-foreground mb-8">
                        C is lazy (efficient). In logical operations, if the result is known after the first operand,
                        it <strong>doesn't evaluate</strong> the second one. This is crucial for safety checks like <code>if (ptr != NULL && *ptr == 5)</code>.
                    </p>

                    <ShortCircuitLab />
                </section>

                {/* SECTION 3: TYPE CASTING */}
                <section>
                    <SectionHeader title="Type Casting & Conversion" icon={Layers} color="red" />

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <TheoryCard title="Implicit (Automatic)" variant="blue">
                            <p>
                                Compiler automatically converts smaller types to larger types to preserve data.
                                <br />
                                <code>int x = 5; float y = x; // y becomes 5.0</code>
                            </p>
                        </TheoryCard>
                        <TheoryCard title="Explicit (Forced)" variant="red">
                            <p>
                                You force the compiler to change the type, potentially losing data.
                                <br />
                                <code>float pi = 3.14; int x = (int)pi; // x becomes 3</code>
                            </p>
                        </TheoryCard>
                    </div>

                    <TypeCastLab />
                </section>

                {/* SECTION 4: SIZEOF & PRECEDENCE */}
                <section>
                    <SectionHeader title="The 'sizeof' Operator" icon={Scale} color="green" />
                    <p className="text-muted-foreground mb-6">
                        <code>sizeof</code> is not a function, it's a compile-time operator that returns the size of variable or type in bytes.
                    </p>
                    <SizeofVisualizer />
                </section>

                <section>
                    <SectionHeader title="Operator Precedence" icon={AlertTriangle} color="orange" />
                    <div className="bg-card border border-border p-6 rounded-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-foreground mb-4">Who goes first?</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Just like PEMDAS in math, C has a strict order of operations.
                            </p>
                            <div className="space-y-2 font-mono text-sm">
                                <div className="flex items-center gap-4 bg-muted p-2 rounded">
                                    <span className="text-muted-foreground font-bold w-6">1.</span>
                                    <span className="text-purple-600 dark:text-purple-400">() [] . {'->'}</span>
                                    <span className="text-muted-foreground text-xs ml-auto">Postfix / Scope</span>
                                </div>
                                <div className="flex items-center gap-4 bg-muted p-2 rounded">
                                    <span className="text-muted-foreground font-bold w-6">2.</span>
                                    <span className="text-blue-600 dark:text-blue-400">++ -- ! ~ (type) * & sizeof</span>
                                    <span className="text-muted-foreground text-xs ml-auto">Unary</span>
                                </div>
                                <div className="flex items-center gap-4 bg-muted p-2 rounded">
                                    <span className="text-muted-foreground font-bold w-6">3.</span>
                                    <span className="text-green-600 dark:text-green-400">* / %</span>
                                    <span className="text-muted-foreground text-xs ml-auto">Multiplicative</span>
                                </div>
                                <div className="flex items-center gap-4 bg-muted p-2 rounded">
                                    <span className="text-muted-foreground font-bold w-6">4.</span>
                                    <span className="text-orange-600 dark:text-orange-400">+ -</span>
                                    <span className="text-muted-foreground text-xs ml-auto">Additive</span>
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/20 border border-blue-500/30 rounded text-xs text-blue-700 dark:text-blue-200 flex items-center gap-2">
                                <HelpCircle size={14} /> Tip: When in doubt, use parentheses `()`. It's safer and more readable.
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 2 • Lecture 4</p>
            </footer>
        </div>
    );
}
