"use client";

import React, { useState, useEffect } from 'react';
import {
    Binary,
    Cpu,
    Zap,
    ArrowRight,
    ArrowLeft,
    Check,
    X,
    Lock,
    Unlock,
    Eye,
    Code,
    Layers,
    Shuffle,
    Database,
    Terminal,
    Shield,
    FileKey,
    Hash,
    Minus,
    RefreshCw,
    Power,
    Moon,
    Sun
} from 'lucide-react';
import { ModeToggle } from "@/components/theme-toggle";

// --- SHARED COMPONENTS ---

const SectionHeader = ({ title, icon: Icon, color = "purple" }: { title: string, icon: any, color?: string }) => (
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
        <div className="p-4 text-muted-foreground overflow-x-auto whitespace-pre">
            {code}
        </div>
    </div>
);

const DeepDiveCard = ({ title, children, variant = 'purple' }: { title: string, children: React.ReactNode, variant?: string }) => {
    const colors: Record<string, string> = {
        blue: 'border-blue-500 bg-blue-50 dark:bg-blue-900/10',
        purple: 'border-purple-500 bg-purple-50 dark:bg-purple-900/10',
        orange: 'border-orange-500 bg-orange-50 dark:bg-orange-900/10',
        red: 'border-red-500 bg-red-50 dark:bg-red-900/10',
        green: 'border-green-500 bg-green-50 dark:bg-green-900/10'
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

const BitRender = ({ val, active = false, label, onClick }: { val: string, active?: boolean, label?: string, onClick?: () => void }) => (
    <div className="flex flex-col items-center gap-1 group">
        {label && <span className="text-[10px] text-muted-foreground font-mono mb-1">{label}</span>}
        <div
            onClick={onClick}
            className={`w-10 h-12 flex items-center justify-center rounded font-mono text-xl font-bold border-2 transition-all duration-300 cursor-pointer
      ${val === '1'
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.6)] scale-105'
                    : 'bg-card text-muted-foreground border-border hover:border-muted-foreground'
                }
      ${active ? 'ring-2 ring-yellow-400 z-10' : ''}
    `}>
            {val}
        </div>
        {label && <span className="text-[9px] text-muted-foreground font-mono mt-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">2^{label}</span>}
    </div>
);

const BinaryAnvil = () => {
    const [byte, setByte] = useState(0);

    const toggleBit = (index: number) => {
        setByte(byte ^ (1 << index));
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Hash size={20} className="text-blue-600 dark:text-blue-400" /> The Binary Anvil
                </h3>
                <button onClick={() => setByte(0)} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <RefreshCw size={12} /> Reset
                </button>
            </div>

            <div className="flex justify-center gap-2 mb-8 overflow-x-auto p-2">
                {[7, 6, 5, 4, 3, 2, 1, 0].map(i => (
                    <BitRender
                        key={i}
                        val={(byte & (1 << i)) ? '1' : '0'}
                        label={String(i)}
                        onClick={() => toggleBit(i)}
                    />
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-xl border border-border text-center">
                    <div className="text-xs text-muted-foreground font-bold uppercase mb-1">Decimal</div>
                    <div className="text-4xl font-black text-foreground">{byte}</div>
                </div>
                <div className="bg-card p-4 rounded-xl border border-border text-center">
                    <div className="text-xs text-muted-foreground font-bold uppercase mb-1">Hexadecimal</div>
                    <div className="text-4xl font-black text-yellow-500 dark:text-yellow-400">0x{byte.toString(16).toUpperCase().padStart(2, '0')}</div>
                </div>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-4">Click the bits above to toggle them!</p>
        </div>
    );
};

const TwosComplementLab = () => {
    const [val, setVal] = useState(5);

    // 8-bit simulation
    const positive = val;
    const inverted = (~val) & 0xFF; // Mask to 8 bits
    const twosComp = (inverted + 1) & 0xFF;

    const toBin = (n: number) => n.toString(2).padStart(8, '0');

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Minus size={20} className="text-red-600 dark:text-red-400" /> The Negative Realm (Two's Complement)
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
                Computers don't have minus signs. To store <strong>-{val}</strong>, they invert the bits of {val} and add 1.
            </p>

            <div className="flex justify-center mb-6">
                <input
                    type="number" min="0" max="127" value={val}
                    onChange={(e) => setVal(Math.max(0, Math.min(127, parseInt(e.target.value) || 0)))}
                    className="bg-card border border-border rounded p-2 text-foreground w-24 text-center font-bold"
                />
            </div>

            <div className="space-y-2 font-mono text-sm md:text-base">
                {/* Step 1 */}
                <div className="flex justify-between items-center bg-card p-3 rounded border border-border">
                    <span className="text-muted-foreground">Original ({val})</span>
                    <span className="text-blue-600 dark:text-blue-400">{toBin(positive)}</span>
                </div>

                <div className="flex justify-center text-muted-foreground">↓ Invert Bits (~)</div>

                {/* Step 2 */}
                <div className="flex justify-between items-center bg-card p-3 rounded border border-border">
                    <span className="text-muted-foreground">One's Complement</span>
                    <span className="text-purple-600 dark:text-purple-400">{toBin(inverted)}</span>
                </div>

                <div className="flex justify-center text-muted-foreground">↓ Add 1</div>

                {/* Step 3 */}
                <div className="flex justify-between items-center bg-card p-3 rounded border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                    <span className="text-foreground font-bold">Two's Comp (-{val})</span>
                    <span className="text-green-600 dark:text-green-400 font-bold">{toBin(twosComp)}</span>
                </div>
            </div>

            <div className="mt-4 text-xs text-center text-muted-foreground">
                In C code: <code>~{val} + 1</code> is how the CPU calculates <code>-{val}</code>.
            </div>
        </div>
    );
};

const BitManipulator = () => {
    const [val, setVal] = useState(0);
    const [bitIndex, setBitIndex] = useState(0);

    const perform = (action: string) => {
        switch (action) {
            case 'SET': setVal(val | (1 << bitIndex)); break;
            case 'CLEAR': setVal(val & ~(1 << bitIndex)); break;
            case 'TOGGLE': setVal(val ^ (1 << bitIndex)); break;
        }
    };

    const isSet = (val & (1 << bitIndex)) !== 0;

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Cpu size={20} className="text-orange-500 dark:text-orange-400" /> The Bit Manipulator
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <div className="flex justify-between mb-2">
                        <span className="text-xs text-muted-foreground font-bold">TARGET VALUE</span>
                        <span className="text-xs text-muted-foreground font-bold">INDEX: {bitIndex}</span>
                    </div>
                    <div className="flex justify-center gap-1 mb-6 bg-muted/50 p-2 rounded">
                        {[7, 6, 5, 4, 3, 2, 1, 0].map(i => (
                            <div
                                key={i}
                                onClick={() => setBitIndex(i)}
                                className={`w-8 h-10 flex items-center justify-center rounded font-mono text-sm border cursor-pointer transition-all
                  ${i === bitIndex ? 'border-yellow-400 bg-muted-foreground text-card' : 'border-border text-muted-foreground'}
                  ${(val & (1 << i)) ? 'text-green-600 dark:text-green-400 font-bold' : ''}
                `}
                            >
                                {(val & (1 << i)) ? 1 : 0}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => perform('SET')} className="bg-green-100 dark:bg-green-900/30 border border-green-600 text-green-600 dark:text-green-400 py-2 rounded text-xs font-bold hover:bg-green-200 dark:hover:bg-green-900/50">SET (|)</button>
                        <button onClick={() => perform('CLEAR')} className="bg-red-100 dark:bg-red-900/30 border border-red-600 text-red-600 dark:text-red-400 py-2 rounded text-xs font-bold hover:bg-red-200 dark:hover:bg-red-900/50">CLEAR (&~)</button>
                        <button onClick={() => perform('TOGGLE')} className="col-span-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-600 text-blue-600 dark:text-blue-400 py-2 rounded text-xs font-bold hover:bg-blue-200 dark:hover:bg-blue-900/50">TOGGLE (^)</button>
                    </div>
                </div>

                <div className="flex flex-col justify-center space-y-4">
                    <div className="bg-card p-4 rounded border border-border">
                        <span className="text-xs text-muted-foreground block mb-1">Code for Action:</span>
                        <code className="text-sm text-yellow-500 dark:text-yellow-300 block mb-2">
                            val = val | (1 &lt;&lt; {bitIndex});
                        </code>
                        <code className="text-sm text-yellow-500 dark:text-yellow-300 block mb-2">
                            val = val & ~(1 &lt;&lt; {bitIndex});
                        </code>
                        <code className="text-sm text-yellow-500 dark:text-yellow-300 block">
                            val = val ^ (1 &lt;&lt; {bitIndex});
                        </code>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className={`w-3 h-3 rounded-full ${isSet ? 'bg-green-500' : 'bg-muted-foreground/30'}`}></div>
                        Bit {bitIndex} is {isSet ? 'ON' : 'OFF'}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BitwiseBunker = () => {
    const [a, setA] = useState(5); // 00000101
    const [b, setB] = useState(3); // 00000011
    const [op, setOp] = useState('&');

    const toBin = (n: number) => n.toString(2).padStart(8, '0');

    const calculate = () => {
        switch (op) {
            case '&': return a & b;
            case '|': return a | b;
            case '^': return a ^ b;
            default: return 0;
        }
    };

    const res = calculate();
    const binA = toBin(a);
    const binB = toBin(b);
    const binRes = toBin(res);

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                <Binary size={150} />
            </div>

            <div className="flex flex-wrap gap-4 mb-8 z-10 relative">
                <div className="flex items-center gap-2 bg-card p-2 rounded border border-border">
                    <span className="text-xs font-bold text-muted-foreground">A:</span>
                    <input type="number" value={a} onChange={e => setA(Number(e.target.value))} className="w-16 bg-transparent text-foreground font-mono outline-none" />
                </div>
                <div className="flex items-center gap-2 bg-card p-2 rounded border border-border">
                    <span className="text-xs font-bold text-muted-foreground">B:</span>
                    <input type="number" value={b} onChange={e => setB(Number(e.target.value))} className="w-16 bg-transparent text-foreground font-mono outline-none" />
                </div>
                <div className="flex gap-1 ml-auto">
                    {['&', '|', '^'].map(o => (
                        <button
                            key={o}
                            onClick={() => setOp(o)}
                            className={`w-10 h-10 rounded font-bold font-mono text-lg transition-all ${op === o ? 'bg-purple-600 text-white shadow-lg' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                        >
                            {o}
                        </button>
                    ))}
                </div>
            </div>

            {/* BIT GRID */}
            <div className="space-y-4">
                {/* Row A */}
                <div className="flex justify-center md:justify-end items-center gap-2">
                    <span className="text-muted-foreground font-mono mr-4 hidden md:inline">A ({a})</span>
                    {binA.split('').map((bit, i) => <BitRender key={i} val={bit} label={String(7 - i)} />)}
                </div>

                {/* Operator */}
                <div className="flex justify-center md:justify-end pr-4 text-purple-600 dark:text-purple-400 font-bold text-xl my-2">
                    {op === '&' ? "AND (&)" : op === '|' ? "OR (|)" : "XOR (^)"}
                </div>

                {/* Row B */}
                <div className="flex justify-center md:justify-end items-center gap-2">
                    <span className="text-muted-foreground font-mono mr-4 hidden md:inline">B ({b})</span>
                    {binB.split('').map((bit, i) => <BitRender key={i} val={bit} />)}
                </div>

                <div className="h-px bg-border w-full my-4"></div>

                {/* Result */}
                <div className="flex justify-center md:justify-end items-center gap-2">
                    <span className="text-green-600 dark:text-green-400 font-mono mr-4 font-bold hidden md:inline">Result ({res})</span>
                    {binRes.split('').map((bit, i) => <BitRender key={i} val={bit} active={bit === '1'} />)}
                </div>
            </div>

            {/* Logic Explanation */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border text-sm text-center text-muted-foreground">
                {op === '&' && "Rule: Result is 1 only if BOTH bits are 1."}
                {op === '|' && "Rule: Result is 1 if EITHER bit is 1."}
                {op === '^' && "Rule: Result is 1 if bits are DIFFERENT."}
            </div>
        </div>
    );
};

const ShiftVisualizer = () => {
    const [val, setVal] = useState(5);
    const [shifts, setShifts] = useState(0);

    const shiftedVal = val << shifts;
    const binOriginal = val.toString(2).padStart(8, '0');

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <ArrowLeft size={20} className="text-green-600 dark:text-green-400" /> Left Shift Operator ( &lt;&lt; )
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
                Shifting bits to the left creates empty spaces on the right, filled with 0s.
                Each shift effectively <strong>multiplies by 2</strong>.
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
                <input
                    type="number" value={val} onChange={e => { setVal(Number(e.target.value)); setShifts(0); }}
                    className="bg-card border border-border rounded p-2 text-foreground w-20 text-center"
                />
                <span className="text-green-600 dark:text-green-400 font-bold font-mono">&lt;&lt;</span>
                <div className="flex items-center bg-card rounded border border-border">
                    <button onClick={() => setShifts(Math.max(0, shifts - 1))} className="px-3 py-1 hover:bg-muted text-foreground">-</button>
                    <span className="px-3 font-mono text-foreground">{shifts}</span>
                    <button onClick={() => setShifts(shifts + 1)} className="px-3 py-1 hover:bg-muted text-foreground">+</button>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4">
                {/* Visual Array */}
                <div className="flex gap-1 p-2 bg-muted/50 rounded-lg relative overflow-hidden">
                    {/* Animated Bits */}
                    {binOriginal.split('').map((bit, i) => (
                        <div
                            key={i}
                            className={`w-10 h-12 flex items-center justify-center rounded border font-mono font-bold text-lg transition-transform duration-500
                ${bit === '1' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-card border-border text-muted-foreground'}
              `}
                            style={{ transform: `translateX(-${shifts * 44}px)` }}
                        >
                            {bit}
                        </div>
                    ))}

                    {/* Incoming Zeros */}
                    {[...Array(shifts)].map((_, i) => (
                        <div
                            key={`z-${i}`}
                            className="absolute top-2 w-10 h-12 flex items-center justify-center rounded border bg-green-100 dark:bg-green-900/20 border-green-500/50 text-green-600 dark:text-green-400 font-mono font-bold animate-in fade-in slide-in-from-right"
                            style={{ right: 8 + (shifts - 1 - i) * 44 }}
                        >
                            0
                        </div>
                    ))}
                </div>

                <div className="mt-4 text-center">
                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Decimal Result</div>
                    <div className="text-3xl font-black text-green-600 dark:text-green-400">
                        {val} × 2<sup>{shifts}</sup> = {val * Math.pow(2, shifts)}
                    </div>
                </div>
            </div>
        </div>
    );
};

const XorSwap = () => {
    const [step, setStep] = useState(0);
    const [a, setA] = useState(5); // 101
    const [b, setB] = useState(3); // 011

    const steps = [
        { code: "// Initial State", a: 5, b: 3, desc: "A = 5 (101), B = 3 (011)" },
        { code: "a = a ^ b;", a: 5 ^ 3, b: 3, desc: "A becomes 6 (110). B stays 3." },
        { code: "b = a ^ b;", a: 6, b: 6 ^ 3, desc: "B becomes 5 (101). (Wait, that's old A!)" },
        { code: "a = a ^ b;", a: 6 ^ 5, b: 5, desc: "A becomes 3 (011). (That's old B!)" },
    ];

    useEffect(() => {
        setA(steps[step].a);
        setB(steps[step].b);
    }, [step]);

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Shuffle size={20} className="text-pink-600 dark:text-pink-400" /> The Magic XOR Swap
                </h3>
                <button
                    onClick={() => setStep((step + 1) % 4)}
                    className="bg-pink-600 text-white px-4 py-1 rounded-full text-xs font-bold hover:bg-pink-500 transition-colors"
                >
                    {step === 3 ? "Reset" : "Next Step"}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-2">
                    {steps.map((s, i) => (
                        <div
                            key={i}
                            className={`p-3 rounded border transition-all duration-300 font-mono text-sm
                ${step === i ? 'bg-pink-100 dark:bg-pink-900/20 border-pink-500 text-foreground scale-105' : 'bg-card border-border text-muted-foreground'}
              `}
                        >
                            {s.code}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-8">
                    <div className="text-center">
                        <div className="text-xs text-muted-foreground font-bold mb-2">Var A</div>
                        <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-black border-2 transition-all duration-500 ${step > 0 ? 'bg-pink-600 text-white border-pink-400' : 'bg-card text-muted-foreground border-border'}`}>
                            {a}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground mt-2">{a.toString(2).padStart(3, '0')}</div>
                    </div>

                    <div className="text-center">
                        <div className="text-xs text-muted-foreground font-bold mb-2">Var B</div>
                        <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-black border-2 transition-all duration-500 ${step > 1 ? 'bg-blue-600 text-white border-blue-400' : 'bg-card text-muted-foreground border-border'}`}>
                            {b}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground mt-2">{b.toString(2).padStart(3, '0')}</div>
                    </div>
                </div>
            </div>

            <p className="text-center text-sm text-pink-500 dark:text-pink-300 mt-6 italic">
                {steps[step].desc}
            </p>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture5Page() {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Bitwise Wizards</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 1 • Lecture 5</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <nav className="flex gap-1 bg-muted/50 p-1 rounded-full border border-border">
                        {[
                            { id: 'basics', label: 'Binary Basics', icon: Hash },
                            { id: 'binary', label: 'Gates', icon: Binary },
                            { id: 'negative', label: 'Negation', icon: Minus },
                            { id: 'manipulate', label: 'Manipulator', icon: Cpu }
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                            >
                                <item.icon size={14} />
                                <span className="hidden sm:inline">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                    <ModeToggle />
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-32">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/20 border border-purple-500/30 text-purple-600 dark:text-purple-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Cpu size={14} /> God Level Access
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        Entering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-foreground dark:from-purple-400 dark:via-pink-400 dark:to-white">Matrix</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Forget decimal numbers. Today you learn to speak the native tongue of the CPU:
                        <strong> Binary</strong>. This is where C becomes a superpower.
                    </p>
                </div>

                {/* SECTION 0: BINARY BASICS */}
                <section id="basics" className="scroll-mt-24">
                    <SectionHeader title="Binary Foundations" icon={Hash} color="blue" />

                    <p className="text-muted-foreground mb-8">
                        Before we manipulate bits, we must understand them. Every integer is just a sum of Powers of 2.
                        Toggle the bits below to see how decimal and hex values are built.
                    </p>

                    <BinaryAnvil />
                </section>

                {/* SECTION 1: BITWISE LOGIC */}
                <section id="binary" className="scroll-mt-24">
                    <SectionHeader title="Bitwise Logic Gates" icon={Binary} color="purple" />

                    <div className="prose prose-invert max-w-none mb-8">
                        <p className="text-muted-foreground text-lg">
                            Standard operators compare <i>values</i>. Bitwise operators compare <i>bits</i>.
                            This allows for parallel processing of 32 or 64 boolean flags at once.
                        </p>
                    </div>

                    <BitwiseBunker />

                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-card p-4 rounded-xl border border-border">
                            <h4 className="font-bold text-foreground mb-2 flex items-center gap-2"><Layers size={16} /> AND (&)</h4>
                            <p className="text-xs text-muted-foreground">Used for <strong>Masking</strong>. Turns bits OFF. x & 0 always equals 0.</p>
                        </div>
                        <div className="bg-card p-4 rounded-xl border border-border">
                            <h4 className="font-bold text-foreground mb-2 flex items-center gap-2"><Layers size={16} /> OR (|)</h4>
                            <p className="text-xs text-muted-foreground">Used for <strong>Setting</strong>. Turns bits ON. x | 1 always equals 1.</p>
                        </div>
                        <div className="bg-card p-4 rounded-xl border border-border">
                            <h4 className="font-bold text-foreground mb-2 flex items-center gap-2"><Layers size={16} /> XOR (^)</h4>
                            <p className="text-xs text-muted-foreground">Used for <strong>Toggling</strong>. Flips bits. 1 ^ 1 = 0, 0 ^ 1 = 1.</p>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: NEGATIVE NUMBERS */}
                <section id="negative" className="scroll-mt-24">
                    <SectionHeader title="The NOT Operator & Negatives" icon={Minus} color="red" />

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-card/50 p-6 rounded-xl border border-border">
                            <h3 className="font-bold text-foreground mb-2">The NOT Operator (~)</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Also called "One's Complement". It simply flips every single bit. 0 becomes 1, 1 becomes 0.
                            </p>
                            <CodeBlock code={`int a = 5; // 00000101\nint b = ~a; // 11111010 (-6)`} />
                        </div>

                        <div className="bg-card/50 p-6 rounded-xl border border-border">
                            <h3 className="font-bold text-foreground mb-2">Two's Complement</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                How do we store -5? We can't just put a "-" sign in memory.
                                The standard rule is: <strong>Invert all bits, then Add 1</strong>.
                            </p>
                        </div>
                    </div>

                    <TwosComplementLab />
                </section>

                {/* SECTION 3: SHIFTS & MANIPULATION */}
                <section id="manipulate" className="scroll-mt-24">
                    <SectionHeader title="Bit Manipulation Mastery" icon={Cpu} color="green" />

                    <ShiftVisualizer />

                    <DeepDiveCard title="The Holy Quartet of Bit Manipulation" variant="green">
                        <p>Every systems programmer must memorize these patterns. Assume <code>k</code> is the bit index.</p>
                        <ul className="mt-4 space-y-4 font-mono text-sm">
                            <li className="flex gap-4 items-center">
                                <span className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 px-2 py-1 rounded">SET</span>
                                <code>x | (1 &lt;&lt; k)</code>
                                <span className="text-muted-foreground text-xs font-sans">// Force bit to 1</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <span className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 px-2 py-1 rounded">CLEAR</span>
                                <code>x & ~(1 &lt;&lt; k)</code>
                                <span className="text-muted-foreground text-xs font-sans">// Force bit to 0</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">TOGGLE</span>
                                <code>x ^ (1 &lt;&lt; k)</code>
                                <span className="text-muted-foreground text-xs font-sans">// Flip bit state</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded">CHECK</span>
                                <code>x & (1 &lt;&lt; k)</code>
                                <span className="text-muted-foreground text-xs font-sans">// Is bit 1?</span>
                            </li>
                        </ul>
                    </DeepDiveCard>

                    <BitManipulator />
                </section>

                {/* SECTION 4: TRICKS */}
                <section id="tricks" className="scroll-mt-24">
                    <SectionHeader title="Hacker's Grimoire" icon={Zap} color="blue" />

                    <p className="text-muted-foreground mb-8">
                        Ancient C spells used to optimize code before compilers were smart. Still useful in embedded systems and interviews.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2"><Power size={16} className="text-yellow-500 dark:text-yellow-400" /> Power of 2 Check</h4>
                            <p className="text-xs text-muted-foreground mb-3">
                                Powers of 2 have only one bit set (e.g., 4 is 100, 8 is 1000). Subtracting 1 flips all lower bits (3 is 011).
                            </p>
                            <CodeBlock code={`bool isPowerOfTwo(int n) {\n  return (n > 0) && ((n & (n - 1)) == 0);\n}`} />
                        </div>

                        <div className="bg-card p-6 rounded-xl border border-border">
                            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2"><Shuffle size={16} className="text-pink-600 dark:text-pink-400" /> The XOR Swap</h4>
                            <p className="text-xs text-muted-foreground mb-3">Swapping without a temp variable. (Warning: Compiler optimization often beats this).</p>
                            <CodeBlock code={`a ^= b;\nb ^= a;\na ^= b;`} />
                        </div>
                    </div>

                    <XorSwap />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 1 • Lecture 5</p>
            </footer>
        </div>
    );
}
