"use client";

import React, { useState, useEffect } from 'react';
import {
    MoveRight,
    Map,
    AlertTriangle,
    Ghost,
    Box,
    ShieldAlert,
    CheckCircle,
    XCircle,
    ArrowRight,
    GitBranch,
    Scale
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
        yellow: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10'
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

const ArithmeticHighway = () => {
    const [type, setType] = useState<'int' | 'char' | 'double'>('int');
    const [step, setStep] = useState(0);

    const sizes = { int: 4, char: 1, double: 8 };
    const baseAddr = 1000;
    const currentAddr = baseAddr + (step * sizes[type]);

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Map size={20} className="text-blue-500" /> The Memory Highway (Pointer Math)
            </h3>

            <div className="flex gap-4 mb-8 justify-center">
                {['int', 'char', 'double'].map(t => (
                    <button
                        key={t}
                        onClick={() => { setType(t as any); setStep(0); }}
                        className={`px-4 py-2 rounded-full font-bold text-sm transition-all capitalize ${type === t ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                    >
                        {t} ({sizes[t as keyof typeof sizes]}B)
                    </button>
                ))}
            </div>

            <div className="relative h-40 bg-slate-900 border-2 border-slate-700 rounded-xl flex items-center overflow-hidden px-8">
                {/* Memory Grid */}
                <div className="absolute inset-0 flex">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="flex-1 border-r border-slate-800 flex items-end justify-center pb-2 text-[10px] text-slate-600 font-mono">
                            {1000 + i}
                        </div>
                    ))}
                </div>

                {/* The Pointer Vehicle */}
                <div
                    className="absolute h-24 bg-blue-600/20 border-2 border-blue-500 rounded-lg flex flex-col items-center justify-center transition-all duration-500 z-10 shadow-[0_0_20px_rgba(59,130,246,0.4)] backdrop-blur-sm"
                    style={{
                        width: `${(sizes[type] / 20) * 100}%`, // Width relative to 20 bytes viewport
                        left: `${((currentAddr - 1000) / 20) * 100}%`
                    }}
                >
                    <span className="text-xs font-bold text-blue-300 mb-1">ptr</span>
                    <span className="font-mono text-white font-bold">{currentAddr}</span>
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={() => setStep(Math.max(0, step - 1))}
                    className="bg-muted hover:bg-muted/80 text-muted-foreground px-6 py-2 rounded-lg font-bold flex items-center gap-2"
                >
                    ptr-- (Prev)
                </button>

                <div className="bg-black px-4 py-2 rounded border border-slate-700 font-mono text-green-400">
                    ptr = {baseAddr} + ({step} * {sizes[type]})
                </div>

                <button
                    onClick={() => setStep(Math.min(4, step + 1))}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2"
                >
                    ptr++ (Next) <ArrowRight size={16} />
                </button>
            </div>

            <div className="mt-4 text-center text-xs text-muted-foreground">
                Notice: <code>ptr++</code> doesn't add 1. It adds <code>sizeof(type)</code> to the address!
            </div>
        </div>
    );
};

const PointerZoo = () => {
    const [active, setActive] = useState('null');

    const species = {
        null: { title: "Null Pointer", icon: XCircle, color: "text-red-500 dark:text-red-400", desc: "Points to address 0 (nothing). Safe if checked.", risk: "Low (if handled)" },
        void: { title: "Void Pointer", icon: Box, color: "text-purple-500 dark:text-purple-400", desc: "Generic pointer. Has no type. Cannot be dereferenced directly.", risk: "None" },
        wild: { title: "Wild Pointer", icon: Ghost, color: "text-orange-500 dark:text-orange-400", desc: "Uninitialized pointer. Points to random garbage. VERY DANGEROUS.", risk: "High" },
        dangling: { title: "Dangling Pointer", icon: AlertTriangle, color: "text-yellow-500 dark:text-yellow-400", desc: "Points to memory that has been freed. Access causes crashes.", risk: "Critical" },
    };

    const current = species[active as keyof typeof species];

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Ghost size={20} className="text-purple-500" /> The Pointer Zoo (Taxonomy)
            </h3>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
                {Object.keys(species).map(k => {
                    const Item = species[k as keyof typeof species];
                    return (
                        <button
                            key={k}
                            onClick={() => setActive(k)}
                            className={`p-3 rounded-lg border text-left transition-all ${active === k ? 'bg-muted border-foreground' : 'bg-card border-border opacity-60 hover:opacity-100'}`}
                        >
                            <div className={`flex items-center gap-2 font-bold text-sm mb-1 ${Item.color}`}>
                                <Item.icon size={16} /> {Item.title}
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="bg-black/40 p-6 rounded-xl border border-border flex items-start gap-6 animate-in fade-in zoom-in">
                <div className={`p-4 rounded-full bg-slate-900 border-2 ${current.color.replace('text', 'border')}`}>
                    {React.createElement(current.icon, { size: 40, className: current.color })}
                </div>
                <div>
                    <h4 className={`text-xl font-bold mb-2 ${current.color}`}>{current.title}</h4>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">{current.desc}</p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900 p-2 rounded border border-slate-700">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Risk Level</span>
                            <span className="text-white font-bold text-sm">{current.risk}</span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded border border-slate-700">
                            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Example</span>
                            <code className="text-xs text-green-400">
                                {active === 'null' && "int *p = NULL;"}
                                {active === 'void' && "void *p = &x;"}
                                {active === 'wild' && "int *p; // No init"}
                                {active === 'dangling' && "free(p); // p is dangling"}
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ComparisonLab = () => {
    const [p1, setP1] = useState(100);
    const [p2, setP2] = useState(104);
    const [val1, setVal1] = useState(10);
    const [val2, setVal2] = useState(10);

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Scale size={20} className="text-green-500" /> Pointer Comparison
            </h3>

            <div className="grid md:grid-cols-2 gap-12 mb-8">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-blue-500 font-bold uppercase">Pointer 1 (p1)</span>
                    <div className="bg-muted p-4 rounded border border-blue-500/50 text-center w-full">
                        <div className="text-xs text-muted-foreground mb-1">Address</div>
                        <div className="font-mono font-bold text-foreground mb-2">{p1}</div>
                        <div className="text-xs text-muted-foreground mb-1">Value (*p1)</div>
                        <input
                            type="number" value={val1} onChange={e => setVal1(Number(e.target.value))}
                            className="bg-black/20 border border-border rounded text-center w-16 text-green-500"
                        />
                    </div>
                    <input
                        type="range" min="100" max="120" step="4" value={p1} onChange={e => setP1(Number(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-purple-500 font-bold uppercase">Pointer 2 (p2)</span>
                    <div className="bg-muted p-4 rounded border border-purple-500/50 text-center w-full">
                        <div className="text-xs text-muted-foreground mb-1">Address</div>
                        <div className="font-mono font-bold text-foreground mb-2">{p2}</div>
                        <div className="text-xs text-muted-foreground mb-1">Value (*p2)</div>
                        <input
                            type="number" value={val2} onChange={e => setVal2(Number(e.target.value))}
                            className="bg-black/20 border border-border rounded text-center w-16 text-green-500"
                        />
                    </div>
                    <input
                        type="range" min="100" max="120" step="4" value={p2} onChange={e => setP2(Number(e.target.value))}
                        className="w-full accent-purple-500"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 rounded border text-center transition-all ${p1 === p2 ? 'bg-green-100 dark:bg-green-900/20 border-green-500' : 'bg-muted border-border'}`}>
                    <div className="text-xs font-bold uppercase mb-1 text-muted-foreground">Address Check (p1 == p2)</div>
                    <div className={`text-xl font-bold ${p1 === p2 ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                        {p1 === p2 ? "TRUE (Same Location)" : "FALSE"}
                    </div>
                </div>

                <div className={`p-4 rounded border text-center transition-all ${val1 === val2 ? 'bg-green-100 dark:bg-green-900/20 border-green-500' : 'bg-muted border-border'}`}>
                    <div className="text-xs font-bold uppercase mb-1 text-muted-foreground">Value Check (*p1 == *p2)</div>
                    <div className={`text-xl font-bold ${val1 === val2 ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                        {val1 === val2 ? "TRUE (Same Data)" : "FALSE"}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ArrayDecay = () => {
    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <GitBranch size={20} className="text-yellow-500" /> The Array Decay Rule
            </h3>

            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                    <TheoryCard title="Rule:" variant="yellow">
                        <p className="mb-2">
                            The name of an array decays into a <strong>pointer to its first element</strong>.
                        </p>
                        <div className="bg-black p-2 rounded text-center">
                            <code className="text-yellow-500 font-bold">arr == &arr[0]</code>
                        </div>
                    </TheoryCard>
                    <CodeBlock code={`int arr[3] = {10, 20, 30};\nint *p = arr; // Implicit decay\n\n// p points to 10`} title="Decay in Action" />
                </div>

                <div className="flex-1 flex flex-col items-center">
                    <div className="relative">
                        {/* Array Box */}
                        <div className="flex border-2 border-slate-500 dark:border-slate-600 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-900">
                            {[10, 20, 30].map((v, i) => (
                                <div key={i} className="p-4 border-r border-slate-400 dark:border-slate-700 last:border-0 text-center w-16">
                                    <div className="text-xs text-slate-500 mb-1">[{i}]</div>
                                    <div className="font-bold text-slate-800 dark:text-white">{v}</div>
                                </div>
                            ))}
                        </div>

                        {/* Pointer Arrow */}
                        <div className="absolute -bottom-12 left-8 flex flex-col items-center animate-bounce">
                            <ArrowRight size={24} className="text-yellow-500 rotate-[-90deg]" />
                            <span className="text-xs font-bold text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20 px-2 rounded">arr / p</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture2Page() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32 transition-colors duration-300">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-500/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Pointer Arithmetic</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 5 • Lecture 2</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <MoveRight size={14} /> Navigating RAM
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-foreground dark:from-blue-400 dark:via-indigo-400 dark:to-white">Math</span> of Memory
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Adding 1 to a pointer doesn't just add 1. It jumps to the next "slot". This lecture unlocks the secrets of traversing memory arrays.
                    </p>
                </div>

                {/* SECTION 1: ARITHMETIC */}
                <section>
                    <SectionHeader title="Pointer Arithmetic" icon={Map} color="blue" />
                    <TheoryCard title="The Scaling Factor" variant="blue">
                        <p className="mb-2">When you perform math on a pointer (e.g., <code>p + 1</code>), the compiler automatically scales the step size based on the <strong>Data Type</strong>.</p>
                        <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                            <li><code>char *p</code> (1 byte): <code>p+1</code> adds <strong>1</strong> to address.</li>
                            <li><code>int *p</code> (4 bytes): <code>p+1</code> adds <strong>4</strong> to address.</li>
                            <li><code>double *p</code> (8 bytes): <code>p+1</code> adds <strong>8</strong> to address.</li>
                        </ul>
                    </TheoryCard>
                    <ArithmeticHighway />
                </section>

                {/* SECTION 2: TYPES OF POINTERS */}
                <section>
                    <SectionHeader title="Pointer Taxonomy" icon={Ghost} color="purple" />
                    <p className="text-muted-foreground mb-8">
                        Not all pointers are equal. Some are safe, some are generic, and some will crash your program instantly.
                    </p>
                    <PointerZoo />
                </section>

                {/* SECTION 3: COMPARISON */}
                <section>
                    <SectionHeader title="Comparing Pointers" icon={Scale} color="green" />
                    <p className="text-muted-foreground mb-8">
                        You can compare pointers just like integers. <code>p1 == p2</code> checks if they point to the <strong>same location</strong>.
                    </p>
                    <ComparisonLab />
                </section>

                {/* SECTION 4: ARRAY DECAY */}
                <section>
                    <SectionHeader title="Arrays & Pointers" icon={GitBranch} color="yellow" />
                    <ArrayDecay />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 5 • Lecture 2</p>
            </footer>
        </div>
    );
}
