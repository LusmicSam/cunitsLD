"use client";

import React, { useState, useEffect } from 'react';
import {
    GitBranch,
    Check,
    X,
    AlertTriangle,
    HelpCircle,
    Code,
    ToggleLeft,
    ArrowRight,
    ShieldCheck,
    Zap,
    Scale,
    Play,
    RefreshCw,
    MoreHorizontal,
    Binary,
    Calendar,
    Layers,
    Divide,
    Eye,
    ListOrdered,
    Moon,
    Sun
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
        <div className="p-4 text-muted-foreground overflow-x-auto whitespace-pre">
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

const RelationalArena = () => {
    const [valA, setValA] = useState(10);
    const [valB, setValB] = useState(20);

    const comparisons = [
        { op: '>', label: 'Greater Than', res: valA > valB },
        { op: '<', label: 'Less Than', res: valA < valB },
        { op: '>=', label: 'Greater/Equal', res: valA >= valB },
        { op: '<=', label: 'Less/Equal', res: valA <= valB },
        { op: '==', label: 'Equal To', res: valA === valB },
        { op: '!=', label: 'Not Equal', res: valA !== valB },
    ];

    return (

        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
                <div className="text-center">
                    <label className="block text-xs text-muted-foreground font-bold uppercase mb-2">Value A</label>
                    <input
                        type="number"
                        value={valA}
                        onChange={(e) => setValA(Number(e.target.value))}
                        className="bg-background border border-blue-500/50 rounded-lg p-3 text-2xl font-mono text-foreground text-center w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="text-muted-foreground font-bold text-xl">VS</div>

                <div className="text-center">
                    <label className="block text-xs text-muted-foreground font-bold uppercase mb-2">Value B</label>
                    <input
                        type="number"
                        value={valB}
                        onChange={(e) => setValB(Number(e.target.value))}
                        className="bg-background border border-purple-500/50 rounded-lg p-3 text-2xl font-mono text-foreground text-center w-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {comparisons.map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-lg border flex justify-between items-center transition-all ${item.res ? 'bg-green-100 dark:bg-green-900/10 border-green-500/50' : 'bg-card border-border opacity-60'}`}>
                        <div>
                            <code className="text-lg font-bold text-foreground">{item.op}</code>
                            <span className="block text-xs text-muted-foreground">{item.label}</span>
                        </div>
                        <div className={`flex items-center gap-2 font-mono font-bold ${item.res ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                            {item.res ? <Check size={18} /> : <X size={18} />}
                            {item.res ? '1' : '0'}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 bg-red-100 dark:bg-red-900/20 border border-red-500/30 p-4 rounded-lg flex items-start gap-3">
                <AlertTriangle className="text-red-500 dark:text-red-400 shrink-0 mt-1" size={18} />
                <div>
                    <h4 className="text-red-600 dark:text-red-400 font-bold text-sm mb-1">Critical Warning: Assignment vs Equality</h4>
                    <p className="text-xs text-muted-foreground">
                        Never confuse <code>=</code> (set value) with <code>==</code> (compare value).
                        <br /><code>if (x = 5)</code> sets x to 5 and evaluates to TRUE (because 5 is non-zero).
                        <br /><code>if (x == 5)</code> correctly checks if x is 5.
                    </p>
                </div>
            </div>
        </div>
    );
};

const FloatDangerZone = () => {
    const [val, setVal] = useState(0.1);
    const sum = 0.1 + 0.2;
    const isEqual = sum === 0.3;

    return (

        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-yellow-500 dark:text-yellow-400" /> The Float Trap
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
                Computers cannot store some decimal numbers perfectly in binary. This leads to tiny precision errors.
                <strong> Never compare floats with <code>==</code>.</strong>
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-card p-4 rounded-xl border border-border text-center">
                    <div className="text-xs text-muted-foreground font-bold uppercase mb-2">Expression</div>
                    <code className="text-xl text-blue-600 dark:text-blue-300">0.1 + 0.2</code>
                </div>

                <div className="bg-card p-4 rounded-xl border border-border text-center">
                    <div className="text-xs text-muted-foreground font-bold uppercase mb-2">Actual Memory Value</div>
                    <code className="text-xl text-yellow-600 dark:text-yellow-300">{sum.toFixed(17)}</code>
                </div>
            </div>

            <div className={`mt-6 p-4 rounded-lg border flex flex-col items-center justify-center transition-all ${isEqual ? 'bg-green-100 dark:bg-green-900/20 border-green-500' : 'bg-red-100 dark:bg-red-900/20 border-red-500'}`}>
                <code className="text-lg mb-2">if ((0.1 + 0.2) == 0.3)</code>
                <div className={`text-2xl font-black ${isEqual ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-500'}`}>
                    {isEqual ? 'TRUE' : 'FALSE'}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    {isEqual ? "Wait, how? (In JS this might vary, but in C this is usually FALSE)" : "Because 0.30000000000000004 != 0.3"}
                </p>
            </div>
        </div>
    );
};

const DeMorganLab = () => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);

    const res1 = !(a && b);
    const res2 = !a || !b;

    return (

        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <Scale size={20} className="text-purple-600 dark:text-purple-400" /> De Morgan's Laws
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
                Simplifying complex logic: <code>!(A && B)</code> is equivalent to <code>!A || !B</code>.
            </p>

            <div className="flex justify-center gap-4 mb-8">
                <button onClick={() => setA(!a)} className={`px-4 py-2 rounded font-bold border transition-all w-24 ${a ? 'bg-blue-600 text-white border-blue-400' : 'bg-muted text-muted-foreground border-border'}`}>A: {a ? '1' : '0'}</button>
                <button onClick={() => setB(!b)} className={`px-4 py-2 rounded font-bold border transition-all w-24 ${b ? 'bg-blue-600 text-white border-blue-400' : 'bg-muted text-muted-foreground border-border'}`}>B: {b ? '1' : '0'}</button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-border text-center">
                    <div className="text-xs text-muted-foreground font-bold uppercase mb-2">Method 1</div>
                    <code className="block text-lg mb-2 text-purple-600 dark:text-purple-300">!(A && B)</code>
                    <div className="text-sm text-muted-foreground mb-2">!({a ? '1' : '0'} && {b ? '1' : '0'}) → !{a && b ? '1' : '0'}</div>
                    <div className={`text-2xl font-black ${res1 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-500'}`}>{res1 ? 'TRUE' : 'FALSE'}</div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-border text-center">
                    <div className="text-xs text-muted-foreground font-bold uppercase mb-2">Method 2</div>
                    <code className="block text-lg mb-2 text-purple-600 dark:text-purple-300">!A || !B</code>
                    <div className="text-sm text-muted-foreground mb-2">{!a ? '1' : '0'} || {!b ? '1' : '0'}</div>
                    <div className={`text-2xl font-black ${res2 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-500'}`}>{res2 ? 'TRUE' : 'FALSE'}</div>
                </div>
            </div>

            <div className="text-center mt-4 text-xs text-green-600 dark:text-green-400 font-mono">
                {res1 === res2 ? "✓ EQUIVALENT" : "ERROR"}
            </div>
        </div>
    );
};

const LogicPrecedence = () => {
    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <ListOrdered size={20} className="text-blue-600 dark:text-blue-400" /> Order of Operations in Logic
            </h3>
            <div className="bg-card p-4 rounded-lg border border-border mb-6">
                <p className="text-sm text-muted-foreground mb-4">
                    Just like math has PEMDAS, logic has its own hierarchy:
                </p>
                <div className="flex items-center justify-between text-xs md:text-sm font-mono bg-muted p-2 rounded">
                    <span className="text-red-600 dark:text-red-400 font-bold">1. NOT (!)</span>
                    <span className="text-muted-foreground">&gt;</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">2. AND (&&)</span>
                    <span className="text-muted-foreground">&gt;</span>
                    <span className="text-green-600 dark:text-green-400 font-bold">3. OR (||)</span>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="text-sm font-bold text-muted-foreground">Example: <code className="text-foreground">!0 && 0 || 1</code></h4>
                <div className="space-y-1 text-sm font-mono">
                    <div className="flex items-center gap-2">
                        <span className="bg-muted px-2 rounded text-muted-foreground">Step 1 (NOT)</span>
                        <span className="text-red-600 dark:text-red-400 font-bold">!0</span> becomes <span className="text-foreground">1</span>
                        <span className="text-muted-foreground">→ 1 && 0 || 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="bg-muted px-2 rounded text-muted-foreground">Step 2 (AND)</span>
                        <span className="text-blue-600 dark:text-blue-400 font-bold">1 && 0</span> becomes <span className="text-foreground">0</span>
                        <span className="text-muted-foreground">→ 0 || 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="bg-muted px-2 rounded text-muted-foreground">Step 3 (OR)</span>
                        <span className="text-green-600 dark:text-green-400 font-bold">0 || 1</span> becomes <span className="text-green-600 dark:text-green-400 font-bold">1 (True)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TruthTableLab = () => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);

    return (
        <div className="grid lg:grid-cols-2 gap-8 my-8">
            {/* Interactive Inputs */}
            <div className="bg-card/50 p-6 rounded-xl border border-border flex flex-col justify-center">
                <h3 className="text-lg font-bold text-foreground mb-6 text-center">Input State</h3>
                <div className="flex justify-around">
                    <button
                        onClick={() => setA(!a)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all w-32 ${a ? 'border-green-500 bg-green-100 dark:bg-green-900/20' : 'border-red-500 dark:border-red-500/50 bg-card'}`}
                    >
                        <span className="text-muted-foreground font-bold uppercase text-sm">Input A</span>
                        <span className={`text-2xl font-black ${a ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-500'}`}>{a ? '1' : '0'}</span>
                        <span className="text-xs uppercase font-bold text-muted-foreground">{a ? 'True' : 'False'}</span>
                    </button>

                    <button
                        onClick={() => setB(!b)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all w-32 ${b ? 'border-green-500 bg-green-100 dark:bg-green-900/20' : 'border-red-500 dark:border-red-500/50 bg-card'}`}
                    >
                        <span className="text-muted-foreground font-bold uppercase text-sm">Input B</span>
                        <span className={`text-2xl font-black ${b ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-500'}`}>{b ? '1' : '0'}</span>
                        <span className="text-xs uppercase font-bold text-muted-foreground">{b ? 'True' : 'False'}</span>
                    </button>
                </div>
            </div>

            {/* Logic Gates Output */}
            <div className="space-y-4">
                {/* AND Gate */}
                <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-muted p-2 rounded text-blue-600 dark:text-blue-400 font-bold font-mono">&&</div>
                        <div>
                            <h4 className="text-foreground font-bold">Logical AND</h4>
                            <p className="text-xs text-muted-foreground">True only if BOTH are True</p>
                        </div>
                    </div>
                    <div className={`px-4 py-2 rounded font-bold font-mono ${a && b ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-muted text-muted-foreground'}`}>
                        {a && b ? '1 (True)' : '0 (False)'}
                    </div>
                </div>

                {/* OR Gate */}
                <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-muted p-2 rounded text-purple-600 dark:text-purple-400 font-bold font-mono">||</div>
                        <div>
                            <h4 className="text-foreground font-bold">Logical OR</h4>
                            <p className="text-xs text-muted-foreground">True if AT LEAST ONE is True</p>
                        </div>
                    </div>
                    <div className={`px-4 py-2 rounded font-bold font-mono ${a || b ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-muted text-muted-foreground'}`}>
                        {a || b ? '1 (True)' : '0 (False)'}
                    </div>
                </div>

                {/* NOT Gates */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card border border-border rounded-xl p-4 text-center">
                        <div className="text-xs text-muted-foreground font-bold uppercase mb-1">!A (NOT)</div>
                        <div className={`font-mono font-bold ${!a ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>{!a ? '1' : '0'}</div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4 text-center">
                        <div className="text-xs text-muted-foreground font-bold uppercase mb-1">!B (NOT)</div>
                        <div className={`font-mono font-bold ${!b ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>{!b ? '1' : '0'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RangeValidator = () => {
    const [val, setVal] = useState(50);
    const inRange = val >= 10 && val <= 90;

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Scale size={20} className="text-orange-500 dark:text-orange-400" /> Range Checker Lab
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
                Combining Relational and Logical operators. Goal: Check if number is inside [10, 90].
            </p>

            <div className="mb-8">
                <input
                    type="range" min="0" max="100" value={val}
                    onChange={(e) => setVal(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2 font-mono">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                </div>
            </div>

            <div className="flex justify-center mb-8">
                <div className={`text-4xl font-black transition-all ${inRange ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-red-600 dark:text-red-500'}`}>
                    {val}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className={`p-4 rounded border text-center transition-all ${val >= 10 ? 'bg-green-100 dark:bg-green-900/20 border-green-500 text-green-600 dark:text-green-400' : 'bg-card border-border text-muted-foreground'}`}>
                    <div className="text-xs uppercase font-bold mb-1">Step 1</div>
                    <code>x &gt;= 10</code>
                    <div className="text-lg font-bold mt-1">{val >= 10 ? 'TRUE' : 'FALSE'}</div>
                </div>

                <div className="text-center font-bold text-muted-foreground">&&</div>

                <div className={`p-4 rounded border text-center transition-all ${val <= 90 ? 'bg-green-100 dark:bg-green-900/20 border-green-500 text-green-600 dark:text-green-400' : 'bg-card border-border text-muted-foreground'}`}>
                    <div className="text-xs uppercase font-bold mb-1">Step 2</div>
                    <code>x &lt;= 90</code>
                    <div className="text-lg font-bold mt-1">{val <= 90 ? 'TRUE' : 'FALSE'}</div>
                </div>
            </div>

            <div className={`mt-6 text-center p-3 rounded-lg font-bold border transition-all ${inRange ? 'bg-green-500 text-white border-green-400 shadow-lg' : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-500'}`}>
                Result: {inRange ? 'Valid Range' : 'Out of Range'}
            </div>
        </div>
    );
};

const LogicalVsBitwise = () => {
    return (
        <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="bg-card border border-border p-6 rounded-xl">
                <h3 className="font-bold text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                    <GitBranch size={18} /> Logical AND (&&)
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Operates on boolean truth. Any non-zero value is "True".
                </p>
                <div className="bg-muted p-4 rounded font-mono text-sm space-y-2">
                    <div className="flex justify-between">
                        <span>5 && 4</span>
                        <span className="text-green-600 dark:text-green-400">1 (True)</span>
                    </div>
                    <div className="text-xs text-muted-foreground border-t border-border pt-2 mt-2">
                        Logic: (True) AND (True) = True
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-xl">
                <h3 className="font-bold text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-2">
                    <Binary size={18} /> Bitwise AND (&)
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Operates on individual bits.
                </p>
                <div className="bg-muted p-4 rounded font-mono text-sm space-y-1">
                    <div className="flex justify-between text-muted-foreground">
                        <span>5</span>
                        <span>0101</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                        <span>4</span>
                        <span>0100</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-1 font-bold">
                        <span>5 & 4</span>
                        <span className="text-purple-600 dark:text-purple-400">0100 (4)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LeapYearLogic = () => {
    const [year, setYear] = useState(2024);

    const div4 = year % 4 === 0;
    const div100 = year % 100 === 0;
    const div400 = year % 400 === 0;

    const isLeap = (div4 && !div100) || div400;

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Calendar size={20} className="text-blue-600 dark:text-blue-400" /> Real World Logic: Leap Year
            </h3>

            <div className="flex justify-center mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => setYear(y => y - 1)} className="p-2 bg-muted rounded hover:bg-muted/80 text-muted-foreground"><ArrowRight className="rotate-180" size={16} /></button>
                    <div className="text-4xl font-mono font-bold text-foreground">{year}</div>
                    <button onClick={() => setYear(y => y + 1)} className="p-2 bg-muted rounded hover:bg-muted/80 text-muted-foreground"><ArrowRight size={16} /></button>
                </div>
            </div>

            <CodeBlock title="Logic Check" code={`if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))`} />

            <div className="grid gap-2 mt-6">
                <div className={`p-3 rounded border flex justify-between items-center transition-all ${div4 ? 'bg-green-100 dark:bg-green-900/20 border-green-500/50' : 'bg-card border-border'}`}>
                    <span className="text-sm text-muted-foreground">1. Divisible by 4?</span>
                    <span className={`font-mono font-bold ${div4 ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>{div4 ? 'YES' : 'NO'}</span>
                </div>

                <div className={`p-3 rounded border flex justify-between items-center transition-all ${div100 ? 'bg-red-100 dark:bg-red-900/20 border-red-500/50' : 'bg-green-100 dark:bg-green-900/20 border-green-500/50'}`}>
                    <span className="text-sm text-muted-foreground">2. NOT Divisible by 100?</span>
                    <span className={`font-mono font-bold ${!div100 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{!div100 ? 'YES' : 'NO'}</span>
                </div>

                <div className="text-center text-xs font-bold text-muted-foreground uppercase">- OR -</div>

                <div className={`p-3 rounded border flex justify-between items-center transition-all ${div400 ? 'bg-green-100 dark:bg-green-900/20 border-green-500/50' : 'bg-card border-border'}`}>
                    <span className="text-sm text-muted-foreground">3. Divisible by 400?</span>
                    <span className={`font-mono font-bold ${div400 ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>{div400 ? 'YES' : 'NO'}</span>
                </div>
            </div>

            <div className={`mt-6 text-center p-4 rounded-xl font-bold text-lg border-2 transition-all ${isLeap ? 'bg-green-600 text-white border-green-400 shadow-lg' : 'bg-card text-muted-foreground border-border'}`}>
                {isLeap ? '🎉 LEAP YEAR' : 'COMMON YEAR'}
            </div>
        </div>
    );
};

const ShortCircuitDemo = () => {
    const [step, setStep] = useState(0);
    const [a, setA] = useState(0); // 0 = False
    const [b, setB] = useState(1); // 1 = True
    const [isEvaluating, setIsEvaluating] = useState(false);

    const runCheck = () => {
        setIsEvaluating(true);
        setStep(1); // Check A

        setTimeout(() => {
            if (a === 0) {
                setStep(3); // Result False immediately
                setIsEvaluating(false);
            } else {
                setStep(2); // Check B
                setTimeout(() => {
                    setStep(3); // Final Result
                    setIsEvaluating(false);
                }, 1500);
            }
        }, 1500);
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-foreground flex items-center gap-2"><Zap size={18} className="text-yellow-500 dark:text-yellow-400" /> Short-Circuit Visualizer</h3>
                <div className="flex gap-2">
                    <button onClick={() => setA(a ? 0 : 1)} className={`px-3 py-1 rounded text-xs font-bold ${a ? 'bg-green-600' : 'bg-red-600'} text-white`}>A = {a}</button>
                    <button onClick={() => setB(b ? 0 : 1)} className={`px-3 py-1 rounded text-xs font-bold ${b ? 'bg-green-600' : 'bg-red-600'} text-white`}>B = {b}</button>
                </div>
            </div>

            <div className="bg-muted p-4 rounded-lg font-mono text-center text-lg text-muted-foreground mb-6">
                if ( <span className={step >= 1 ? (a ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') : ''}>A</span> && <span className={step >= 2 ? (b ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') : 'opacity-50'}>B</span> )
            </div>

            <div className="relative h-24 bg-card rounded-lg border border-border flex items-center justify-around px-8">
                <div className={`flex flex-col items-center transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-20'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 ${a ? 'bg-green-500' : 'bg-red-500'} text-white`}>1</div>
                    <span className="text-[10px] text-muted-foreground">Check A</span>
                </div>

                <ArrowRight className={`text-muted-foreground transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-20'}`} />

                <div className={`flex flex-col items-center transition-opacity duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-20'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 ${b ? 'bg-green-500' : 'bg-red-500'} text-white`}>2</div>
                    <span className="text-[10px] text-muted-foreground">Check B</span>
                </div>

                <ArrowRight className={`text-muted-foreground transition-opacity ${step === 3 ? 'opacity-100' : 'opacity-20'}`} />

                <div className={`flex flex-col items-center transition-opacity duration-300 ${step === 3 ? 'opacity-100' : 'opacity-20'}`}>
                    <div className={`w-12 h-8 rounded flex items-center justify-center font-bold mb-2 ${(a && b) ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        {(a && b) ? 'OK' : 'NO'}
                    </div>
                    <span className="text-[10px] text-muted-foreground">Result</span>
                </div>

                {step === 3 && a === 0 && (
                    <div className="absolute top-2 left-[20%] right-[20%] h-8 border-t-2 border-dashed border-red-500 rounded-t-full flex justify-center">
                        <span className="bg-card px-2 text-xs text-red-500 dark:text-red-400 -mt-2">Short Circuit (Skip B)</span>
                    </div>
                )}
            </div>

            <div className="mt-6 text-center">
                <button
                    onClick={runCheck}
                    disabled={isEvaluating}
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-8 py-2 rounded-full font-bold shadow-lg shadow-blue-900/20 flex items-center gap-2 mx-auto"
                >
                    {isEvaluating ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} />}
                    Run Logic Check
                </button>
            </div>
        </div>
    );
};

const TernaryBuilder = () => {
    const [cond, setCond] = useState(true);

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-foreground mb-2">Ternary Operator Builder</h3>
                <p className="text-sm text-muted-foreground">The shorthand for if-else: <code>Condition ? TrueVal : FalseVal</code></p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 font-mono text-lg md:text-xl">
                <div className="bg-muted p-3 rounded text-muted-foreground text-sm md:text-base">int max = </div>

                <button
                    onClick={() => setCond(!cond)}
                    className={`px-4 py-2 rounded font-bold border-2 transition-all ${cond ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-600 dark:text-red-400'}`}
                >
                    {cond ? '10 > 5' : '2 > 8'}
                </button>

                <div className="text-yellow-500 font-bold text-2xl">?</div>

                <div className={`p-3 rounded border-2 transition-all ${cond ? 'border-green-500 opacity-100 shadow-[0_0_15px_rgba(34,197,94,0.3)] bg-green-50 dark:bg-green-900/10' : 'border-slate-700 opacity-30 grayscale'}`}>
                    10
                </div>

                <div className="text-muted-foreground font-bold text-2xl">:</div>

                <div className={`p-3 rounded border-2 transition-all ${!cond ? 'border-red-500 opacity-100 shadow-[0_0_15px_rgba(239,68,68,0.3)] bg-red-50 dark:bg-red-900/10' : 'border-slate-700 opacity-30 grayscale'}`}>
                    8
                </div>

                <div className="text-muted-foreground">;</div>
            </div>

            <div className="mt-8 text-center">
                <span className="text-muted-foreground text-xs uppercase font-bold tracking-widest block mb-2">Final Variable Value</span>
                <span className={`text-4xl font-bold ${cond ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {cond ? '10' : '8'}
                </span>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture4Page() {
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
                        <h1 className="font-bold text-foreground text-sm leading-tight">Decision Logic</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 1 • Lecture 4</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <nav className="flex gap-1 bg-muted/50 p-1 rounded-full border border-border">
                        {[
                            { id: 'relational', label: 'Comparisons', icon: Scale },
                            { id: 'logical', label: 'Logic', icon: GitBranch },
                            { id: 'advanced', label: 'Advanced', icon: Layers },
                            { id: 'ternary', label: 'Ternary', icon: HelpCircle }
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
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 border border-blue-500/30 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <ShieldCheck size={14} /> Logic Control
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-600 to-foreground dark:from-blue-400 dark:via-green-400 dark:to-white">Brain</span> of Code
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Computers are powerful because they can make decisions. In this lecture, we master the tools that let C programs compare data and choose paths.
                    </p>
                </div>

                {/* SECTION 1: RELATIONAL */}
                <section id="relational" className="scroll-mt-24">
                    <SectionHeader title="Relational Operators" icon={Scale} color="blue" />

                    <div className="prose prose-invert max-w-none mb-8">
                        <p className="text-muted-foreground text-lg">
                            Relational operators compare two values. They always return an integer:
                            <strong className="text-green-600 dark:text-green-400"> 1 (True)</strong> or <strong className="text-red-600 dark:text-red-400"> 0 (False)</strong>.
                        </p>
                    </div>

                    <RelationalArena />

                    <FloatDangerZone />
                </section>

                {/* SECTION 2: LOGICAL */}
                <section id="logical" className="scroll-mt-24">
                    <SectionHeader title="Logical Operators" icon={GitBranch} color="green" />

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-card/50 p-6 rounded-xl border border-border">
                            <h3 className="text-xl font-bold text-foreground mb-4">The Logic Gates</h3>
                            <ul className="space-y-4 text-sm text-muted-foreground">
                                <li className="flex items-center gap-4">
                                    <code className="text-green-600 dark:text-green-400 font-bold bg-muted px-2 py-1 rounded">&&</code>
                                    <div>
                                        <strong className="block text-foreground">AND</strong>
                                        Requires ALL conditions to be true.
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <code className="text-purple-600 dark:text-purple-400 font-bold bg-muted px-2 py-1 rounded">||</code>
                                    <div>
                                        <strong className="block text-foreground">OR</strong>
                                        Requires ANY condition to be true.
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <code className="text-red-600 dark:text-red-400 font-bold bg-muted px-2 py-1 rounded">!</code>
                                    <div>
                                        <strong className="block text-foreground">NOT</strong>
                                        Reverses the value (True becomes False).
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-card/50 p-6 rounded-xl border border-border flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-foreground mb-4">Real World Logic</h3>
                            <div className="space-y-4">
                                <div className="bg-card p-3 rounded border border-border">
                                    <span className="text-xs text-muted-foreground uppercase font-bold">Login System</span>
                                    <code className="block text-blue-600 dark:text-blue-300 mt-1">if (userValid && passCorrect)</code>
                                </div>
                                <div className="bg-card p-3 rounded border border-border">
                                    <span className="text-xs text-muted-foreground uppercase font-bold">Game Over</span>
                                    <code className="block text-purple-600 dark:text-purple-300 mt-1">if (health == 0 || time == 0)</code>
                                </div>
                            </div>
                        </div>
                    </div>

                    <TruthTableLab />

                    <TheoryCard title="Confusion Alert: Bitwise vs Logical" variant="purple">
                        <p>One of the most common bugs in C is swapping <code>&&</code> (Logical) with <code>&</code> (Bitwise).</p>
                        <LogicalVsBitwise />
                    </TheoryCard>

                    <RangeValidator />

                    <LeapYearLogic />

                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-foreground mb-4">Short-Circuit Evaluation</h3>
                        <p className="text-muted-foreground mb-6">
                            C is efficient. If the result of a logical expression is clear from the first operand,
                            it <strong>skips</strong> evaluating the second operand. This prevents errors (like dividing by zero).
                        </p>
                        <ShortCircuitDemo />
                    </div>
                </section>

                {/* SECTION 3: ADVANCED TOPICS */}
                <section id="advanced" className="scroll-mt-24">
                    <SectionHeader title="Advanced Logic Concepts" icon={Layers} color="orange" />

                    <p className="text-muted-foreground mb-8">
                        Mastering these concepts separates the beginners from the pros. Understanding how compilers evaluate logic allows you to write simpler, bug-free code.
                    </p>

                    <DeMorganLab />

                    <LogicPrecedence />
                </section>

                {/* SECTION 4: TERNARY */}
                <section id="ternary" className="scroll-mt-24">
                    <SectionHeader title="Conditional (Ternary) Operator" icon={HelpCircle} color="purple" />

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <p className="text-muted-foreground text-lg">
                                The <strong className="text-yellow-500 dark:text-yellow-400">? :</strong> operator is the only one in C that takes three operands.
                                It effectively condenses 4 lines of <code>if-else</code> code into a single line.
                            </p>
                            <CodeBlock title="Example" code={`// If-Else Way\nif (a > b)\n  max = a;\nelse\n  max = b;\n\n// Ternary Way\nmax = (a > b) ? a : b;`} />
                        </div>

                        <TernaryBuilder />
                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 1 • Lecture 4</p>
            </footer>
        </div>
    );
}
