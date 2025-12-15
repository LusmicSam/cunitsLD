"use client";

import React, { useState, useEffect } from 'react';
import {
    GitMerge,
    ArrowRight,
    RefreshCw,
    Layers,
    Code,
    Link,
    List,
    Type,
    Brackets,
    ChevronsRight
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
        <div className="p-4 text-muted-foreground overflow-x-auto whitespace-pre leading-relaxed">
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
        green: 'border-green-500 bg-green-50 dark:bg-green-900/10',
        yellow: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10',
        pink: 'border-pink-500 bg-pink-50 dark:bg-pink-900/10'
    };

    return (
        <div className={`border-l-4 ${colors[variant]} rounded-r-lg p-6 my-6 transition-all hover:bg-opacity-80 backdrop-blur-sm`}>
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

const ArrayMirror = () => {
    const [index, setIndex] = useState(0);
    const [mode, setMode] = useState<'array' | 'pointer'>('array');
    const arr = [10, 20, 30, 40, 50];
    const baseAddr = 1000;

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Brackets size={20} className="text-blue-500" /> The Array Mirror
            </h3>

            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setMode('array')}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${mode === 'array' ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                >
                    Array Syntax: arr[i]
                </button>
                <button
                    onClick={() => setMode('pointer')}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${mode === 'pointer' ? 'bg-purple-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                >
                    Pointer Syntax: *(arr + i)
                </button>
            </div>

            <div className="flex justify-center gap-2 mb-8 overflow-x-auto p-4">
                {arr.map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 group">
                        <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all duration-300
              ${i === index
                                ? mode === 'array' ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-700 dark:text-white scale-110 shadow-lg' : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-700 dark:text-white scale-110 shadow-lg'
                                : 'bg-muted border-border text-muted-foreground'
                            }
            `}>
                            {val}
                        </div>
                        <span className="text-[10px] text-muted-foreground font-mono">{baseAddr + i * 4}</span>
                        <span className={`text-xs font-mono font-bold ${i === index ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {mode === 'array' ? `[${i}]` : `+${i}`}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center gap-4">
                <div className="bg-black px-6 py-3 rounded-lg border border-slate-700 font-mono text-lg text-green-400">
                    {mode === 'array' ? `val = arr[${index}];` : `val = *(arr + ${index});`}
                </div>

                <input
                    type="range" min="0" max="4" value={index} onChange={e => setIndex(Number(e.target.value))}
                    className={`w-64 h-2 rounded-lg appearance-none cursor-pointer ${mode === 'array' ? 'accent-blue-500' : 'accent-purple-500'} bg-muted`}
                />
            </div>
        </div>
    );
};

const ReferenceLab = () => {
    const [val, setVal] = useState(100);
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Simulation Steps
    // 0: Main starts. x = 100.
    // 1: Call update(&x). Pass address.
    // 2: Function receives ptr.
    // 3: *ptr = 200.
    // 4: Return. x is now 200.

    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setStep(s => {
                    if (s >= 4) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return s + 1;
                });
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    useEffect(() => {
        if (step === 0) setVal(100);
        if (step === 3) setVal(200);
    }, [step]);

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <RefreshCw size={20} className="text-green-500" /> Call by Reference Simulator
            </h3>

            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 transition-colors ${isPlaying ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
                >
                    <RefreshCw size={14} className={isPlaying ? "animate-spin" : ""} />
                    {isPlaying ? "Stop" : "Run Simulation"}
                </button>
                <div className="text-xs text-muted-foreground font-mono bg-muted px-3 py-1 rounded border border-border">
                    Step {step}/4
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 relative">
                {/* Main Function */}
                <div className={`p-4 rounded-xl border-2 transition-all duration-500 ${step === 0 || step === 4 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' : 'border-border bg-muted/50 opacity-50'}`}>
                    <div className="text-xs font-bold text-blue-500 mb-2 uppercase">Main() Scope</div>
                    <div className="bg-muted p-4 rounded-lg border border-border text-center relative">
                        <div className="text-xs text-muted-foreground mb-1">int x (Addr: 0x500)</div>
                        <div className={`text-3xl font-bold transition-all ${val === 200 ? 'text-green-500 scale-110' : 'text-foreground'}`}>{val}</div>
                    </div>
                    {step === 1 && <div className="mt-4 text-center text-xs text-blue-500 animate-pulse">Passing Address 0x500...</div>}
                </div>

                {/* Update Function */}
                <div className={`p-4 rounded-xl border-2 transition-all duration-500 ${step >= 2 && step <= 3 ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10' : 'border-border bg-muted/50 opacity-50'}`}>
                    <div className="text-xs font-bold text-purple-500 mb-2 uppercase">void update(int *p)</div>
                    <div className="bg-muted p-4 rounded-lg border border-border text-center relative">
                        <div className="text-xs text-muted-foreground mb-1">int *p</div>
                        <div className="text-xl font-mono font-bold text-yellow-500 dark:text-yellow-400">{step >= 2 ? "0x500" : "?"}</div>
                    </div>
                    {step === 3 && (
                        <div className="mt-4 text-center">
                            <code className="bg-black px-2 py-1 rounded text-green-400 text-xs">*p = 200;</code>
                            <div className="text-[10px] text-muted-foreground mt-1">Modifying value at 0x500</div>
                        </div>
                    )}
                </div>

                {/* Arrow */}
                {(step === 1 || step === 2) && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <ArrowRight size={32} className="text-yellow-500 animate-pulse" />
                    </div>
                )}
            </div>
        </div>
    );
};

const DoublePointer = () => {
    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Layers size={20} className="text-orange-500" /> Pointer to Pointer (Double Pointer)
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">

                {/* Level 2: PTR TO PTR */}
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-500 p-4 rounded-xl w-24 h-24 flex flex-col items-center justify-center">
                        <div className="text-xs text-orange-600 dark:text-orange-300 font-bold mb-1">int **pp</div>
                        <div className="font-mono text-foreground text-lg">0x200</div>
                        <div className="text-[10px] text-muted-foreground mt-1 bg-muted px-1 rounded">Addr: 0x300</div>
                    </div>
                    <div className="text-xs text-muted-foreground">Holds address of ptr</div>
                </div>

                <ArrowRight size={24} className="text-muted-foreground hidden md:block" />
                <div className="md:hidden"><ArrowRight size={24} className="text-muted-foreground rotate-90" /></div>

                {/* Level 1: PTR */}
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500 p-4 rounded-xl w-24 h-24 flex flex-col items-center justify-center">
                        <div className="text-xs text-purple-600 dark:text-purple-300 font-bold mb-1">int *p</div>
                        <div className="font-mono text-foreground text-lg">0x100</div>
                        <div className="text-[10px] text-muted-foreground mt-1 bg-muted px-1 rounded">Addr: 0x200</div>
                    </div>
                    <div className="text-xs text-muted-foreground">Holds address of x</div>
                </div>

                <ArrowRight size={24} className="text-muted-foreground hidden md:block" />
                <div className="md:hidden"><ArrowRight size={24} className="text-muted-foreground rotate-90" /></div>

                {/* Level 0: VALUE */}
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 p-4 rounded-xl w-24 h-24 flex flex-col items-center justify-center">
                        <div className="text-xs text-blue-600 dark:text-blue-300 font-bold mb-1">int x</div>
                        <div className="font-mono text-foreground text-3xl font-bold">50</div>
                        <div className="text-[10px] text-muted-foreground mt-1 bg-muted px-1 rounded">Addr: 0x100</div>
                    </div>
                    <div className="text-xs text-muted-foreground">Actual Value</div>
                </div>
            </div>

            <div className="mt-8 text-center bg-muted/30 p-4 rounded-lg border border-border">
                <code className="text-sm font-mono text-green-500">
                    **pp == *p == x == 50
                </code>
            </div>
        </div>
    );
};

const StringStudio = () => {
    const [active, setActive] = useState('array');

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Type size={20} className="text-pink-500" /> Strings: Arrays vs Pointers
            </h3>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActive('array')}
                    className={`flex-1 p-3 rounded-lg border text-sm font-bold transition-all ${active === 'array' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-muted border-border text-muted-foreground'}`}
                >
                    Array Style (Editable)
                    <br /><span className="text-[10px] opacity-70 font-normal">char str[] = "Hello";</span>
                </button>
                <button
                    onClick={() => setActive('pointer')}
                    className={`flex-1 p-3 rounded-lg border text-sm font-bold transition-all ${active === 'pointer' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-muted border-border text-muted-foreground'}`}
                >
                    Pointer Style (Read-Only)
                    <br /><span className="text-[10px] opacity-70 font-normal">char *str = "Hello";</span>
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <TheoryCard title={active === 'array' ? "Stack Allocation" : "String Literal (Data Segment)"} variant={active === 'array' ? 'blue' : 'purple'}>
                        <p className="text-sm text-muted-foreground">
                            {active === 'array'
                                ? "The string is copied into a local array on the Stack. You can modify individual characters freely."
                                : "The pointer points to a string literal stored in Read-Only Memory. Trying to modify it causes a Segmentation Fault."
                            }
                        </p>
                    </TheoryCard>
                    <CodeBlock
                        title="Modification Attempt"
                        code={active === 'array' ? `str[0] = 'J'; // OK! Becomes "Jello"` : `str[0] = 'J'; // CRASH! Segfault`}
                    />
                </div>

                <div className="bg-muted p-6 rounded-xl border border-border flex flex-col items-center justify-center h-48">
                    <div className="flex gap-1">
                        {['H', 'e', 'l', 'l', 'o', '\\0'].map((c, i) => (
                            <div key={i} className={`w-10 h-12 border-2 flex items-center justify-center font-bold rounded ${active === 'array' ? 'border-blue-500 text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-900/20' : 'border-purple-500 text-purple-600 dark:text-purple-100 bg-purple-100 dark:bg-purple-900/20'}`}>
                                {c}
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        {active === 'array' ? "Stored in Stack (RW)" : "Stored in Code Segment (RO)"}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture3Page() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32 transition-colors duration-300">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunitsLD/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-500/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Pointers & Functions</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 5 • Lecture 3</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 text-green-600 dark:text-green-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Link size={14} /> Indirect Access
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        Pointers in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-foreground dark:from-green-400 dark:via-emerald-400 dark:to-white">Action</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Pointers aren't just for math. They are the key to modifying function arguments, traversing arrays, and building complex data structures.
                    </p>
                </div>

                {/* SECTION 1: ARRAYS & POINTERS */}
                <section>
                    <SectionHeader title="Arrays are Pointers" icon={List} color="blue" />
                    <TheoryCard title="The Equivalence" variant="blue">
                        <p className="mb-2">In C, the name of an array acts like a constant pointer to the first element.</p>
                        <div className="bg-black p-2 rounded text-center">
                            <code className="text-blue-300 font-bold">arr[i] == *(arr + i)</code>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">This is why array indexing starts at 0. It's an offset from the base address.</p>
                    </TheoryCard>
                    <ArrayMirror />
                </section>

                {/* SECTION 2: CALL BY REFERENCE */}
                <section>
                    <SectionHeader title="Call by Reference" icon={RefreshCw} color="green" />
                    <p className="text-muted-foreground mb-8">
                        Standard function calls pass copies of data. Pointers allow us to pass the <strong>address</strong> of the data, letting the function modify the original variable.
                    </p>
                    <ReferenceLab />
                </section>

                {/* SECTION 3: DOUBLE POINTERS */}
                <section>
                    <SectionHeader title="Pointer to Pointer" icon={Layers} color="orange" />
                    <TheoryCard title="Inception" variant="orange">
                        <p className="text-sm text-muted-foreground">
                            A pointer stores an address. Since a pointer itself has an address, we can have a pointer pointing to another pointer.
                            <br /><br />
                            <strong>Use Case:</strong> Changing where a pointer points to inside a function, or dynamic 2D arrays.
                        </p>
                    </TheoryCard>
                    <DoublePointer />
                </section>

                {/* SECTION 4: STRINGS */}
                <section>
                    <SectionHeader title="Strings & Pointers" icon={Type} color="pink" />
                    <p className="text-muted-foreground mb-8">
                        C Strings are just character arrays or pointers. However, <i>how</i> you define them determines if they are editable or read-only.
                    </p>
                    <StringStudio />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 5 • Lecture 3</p>
            </footer>
        </div>
    );
}
