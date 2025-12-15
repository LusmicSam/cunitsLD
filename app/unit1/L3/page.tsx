"use client";

import React, { useState, useEffect } from 'react';
import {
    Calculator,
    Divide,
    Percent,
    ArrowRight,
    Zap,
    ChevronsUp,
    RefreshCw,
    Scale,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Code,
    ListOrdered,
    MoveRight,
    GitCommit,
    Binary,
    ToggleLeft,
    ToggleRight,
    HelpCircle,
    Check,
    X,
    ArrowLeftRight,
    MoreHorizontal,
    ChevronDown
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
            <span className="text-xs text-muted-foreground uppercase ml-2">{title || "C Code"}</span>
        </div>
        <div className="p-4 text-muted-foreground overflow-x-auto whitespace-pre">
            {code}
        </div>
    </div>
);

const DeepDiveCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-4 rounded-r-lg my-6">
        <h4 className="text-blue-600 dark:text-blue-400 font-bold mb-2 flex items-center gap-2">
            <HelpCircle size={16} /> {title}
        </h4>
        <div className="text-muted-foreground text-sm leading-relaxed">
            {children}
        </div>
    </div>
);

// --- INTERACTIVE COMPONENTS ---

const ArithmeticLab = () => {
    const [num1, setNum1] = useState(10);
    const [num2, setNum2] = useState(3);

    return (
        <div className="grid md:grid-cols-2 gap-8 my-8">
            {/* Controls */}
            <div className="bg-card/50 p-6 rounded-xl border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Calculator size={20} className="text-blue-600 dark:text-blue-400" /> Math Sandbox
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-muted-foreground uppercase font-bold block mb-1">Operand A (int)</label>
                        <input
                            type="number" value={num1} onChange={(e) => setNum1(parseInt(e.target.value) || 0)}
                            className="w-full bg-background border border-border rounded p-2 text-foreground font-mono"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground uppercase font-bold block mb-1">Operand B (int)</label>
                        <input
                            type="number" value={num2} onChange={(e) => setNum2(parseInt(e.target.value) || 1)}
                            className="w-full bg-background border border-border rounded p-2 text-foreground font-mono"
                        />
                    </div>
                </div>

                <div className="mt-6 text-xs text-muted-foreground">
                    Try <code>5 / 2</code> vs <code>5.0 / 2</code> in your code to see the difference between Integer and Float division!
                </div>
            </div>

            {/* Results Display */}
            <div className="space-y-4">
                {/* Division Card */}
                {/* Division Card */}
                <div className="bg-card p-4 rounded-xl border border-border relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-muted-foreground flex items-center gap-2"><Divide size={16} /> Integer Division</span>
                        <code className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">a / b</code>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400">{Math.floor(num1 / (num2 || 1))}</span>
                        <span className="text-xs text-muted-foreground">(Fraction truncated!)</span>
                    </div>
                </div>

                {/* Modulus Card */}
                <div className="bg-card p-4 rounded-xl border border-border relative overflow-hidden group hover:border-green-500/30 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-muted-foreground flex items-center gap-2"><Percent size={16} /> Modulus (Remainder)</span>
                        <code className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">a % b</code>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-mono font-bold text-green-600 dark:text-green-400">{num1 % (num2 || 1)}</span>
                        <span className="text-xs text-muted-foreground">
                            ({num1} = {Math.floor(num1 / (num2 || 1))} × {num2} + <strong className="text-green-600 dark:text-green-400">{num1 % (num2 || 1)}</strong>)
                        </span>
                    </div>

                    {/* Visual Dots Remainder */}
                    <div className="mt-4 flex flex-wrap gap-1 opacity-50">
                        {[...Array(Math.min(num1, 50))].map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${(i + 1) > (num1 - (num1 % (num2 || 1))) ? 'bg-green-500' : 'bg-muted-foreground'
                                    }`}
                            />
                        ))}
                        {num1 > 50 && <span className="text-xs text-muted-foreground">...</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const LogicLab = () => {
    const [valA, setValA] = useState(1);
    const [valB, setValB] = useState(0);

    const getResult = (op: string) => {
        switch (op) {
            case '&&': return (valA && valB) ? 1 : 0;
            case '||': return (valA || valB) ? 1 : 0;
            case '!A': return (!valA) ? 1 : 0;
            default: return 0;
        }
    };

    const Toggle = ({ val, set, label }: { val: number, set: any, label: string }) => (
        <div
            onClick={() => set(val ? 0 : 1)}
            className={`cursor-pointer p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${val ? 'bg-green-100 dark:bg-green-900/20 border-green-500 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/20 border-red-500 text-red-600 dark:text-red-400'}`}
        >
            <span className="text-xs font-bold uppercase">{label}</span>
            <div className="text-3xl font-black">{val}</div>
            <div className="text-[10px] uppercase font-bold">{val ? 'True' : 'False'}</div>
        </div>
    );

    return (
        <div className="grid md:grid-cols-12 gap-6 my-8">
            {/* Inputs */}
            <div className="md:col-span-3 flex flex-col gap-4 justify-center">
                <h4 className="text-xs font-bold text-muted-foreground uppercase text-center mb-2">Inputs</h4>
                <Toggle val={valA} set={setValA} label="Condition A" />
                <Toggle val={valB} set={setValB} label="Condition B" />
            </div>

            {/* Logic Gates */}
            <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { op: '&&', name: 'Logical AND', desc: 'True only if BOTH are True' },
                    { op: '||', name: 'Logical OR', desc: 'True if AT LEAST ONE is True' },
                    { op: '!A', name: 'Logical NOT (A)', desc: 'Inverts the value of A' }
                ].map((gate) => {
                    const res = getResult(gate.op);
                    return (
                        <div key={gate.op} className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between hover:bg-muted/50 transition-colors">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-bold text-foreground">{gate.op}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${res ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                                        {res ? 'TRUE' : 'FALSE'}
                                    </span>
                                </div>
                                <div className="h-px bg-border w-full my-3"></div>
                                <p className="text-xs text-muted-foreground mb-4 h-8">{gate.desc}</p>
                            </div>

                            <div className="flex justify-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black shadow-lg transition-all duration-500 ${res ? 'bg-green-500 text-white shadow-green-500/50' : 'bg-muted text-muted-foreground'}`}>
                                    {res}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const RelationalDemo = () => {
    const [a, setA] = useState(5);
    const [b, setB] = useState(10);

    const relations = [
        { exp: '>', res: a > b },
        { exp: '<', res: a < b },
        { exp: '>=', res: a >= b },
        { exp: '<=', res: a <= b },
        { exp: '==', res: a === b },
        { exp: '!=', res: a !== b },
    ];

    return (
        <div className="bg-card/50 rounded-xl border border-border p-6 my-8">
            <div className="flex flex-wrap gap-4 items-center justify-center mb-8">
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-bold">A = </span>
                    <input type="number" value={a} onChange={e => setA(Number(e.target.value))} className="w-20 bg-background border border-border rounded p-2 text-center text-foreground font-mono" />
                </div>
                <div className="text-muted-foreground font-bold">vs</div>
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-bold">B = </span>
                    <input type="number" value={b} onChange={e => setB(Number(e.target.value))} className="w-20 bg-background border border-border rounded p-2 text-center text-foreground font-mono" />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {relations.map((rel, i) => (
                    <div key={i} className="flex items-center justify-between bg-card p-3 rounded border border-border">
                        <code className="text-foreground font-bold text-sm">a {rel.exp} b</code>
                        <div className={`flex items-center gap-1 text-xs font-bold ${rel.res ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {rel.res ? <CheckCircle size={14} /> : <XCircle size={14} />}
                            {rel.res ? '1 (True)' : '0 (False)'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BitwiseLab = () => {
    const [a, setA] = useState(5);
    const [b, setB] = useState(3);
    const [op, setOp] = useState('&');

    // Convert to 8-bit binary string
    const toBin = (n: number) => {
        let bin = (n >>> 0).toString(2);
        while (bin.length < 8) bin = "0" + bin;
        return bin;
    };

    const calculate = () => {
        switch (op) {
            case '&': return a & b;
            case '|': return a | b;
            case '^': return a ^ b;
            case '<<': return a << 1; // Demo shifts by 1 for simplicity in visual
            case '>>': return a >> 1;
            default: return 0;
        }
    };

    const result = calculate();
    const binA = toBin(a);
    const binB = toBin(b);
    const binRes = toBin(result);

    return (
        <div className="bg-card/50 rounded-xl border border-border p-6 my-8 relative overflow-hidden">
            {/* Background Matrix Effect */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Binary size={120} />
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Controls */}
                <div className="w-full md:w-1/3 space-y-4">
                    <h3 className="font-bold text-foreground flex items-center gap-2"><Binary size={18} className="text-purple-400" /> Bitwise Calculator</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs text-muted-foreground font-bold block mb-1">Value A</label>
                            <input type="number" value={a} onChange={e => setA(Number(e.target.value))} className="w-full bg-card border border-border rounded p-2 text-foreground font-mono" />
                        </div>
                        {/* Hide B for shifts to avoid confusion in simple demo */}
                        {!['<<', '>>'].includes(op) && (
                            <div>
                                <label className="text-xs text-muted-foreground font-bold block mb-1">Value B</label>
                                <input type="number" value={b} onChange={e => setB(Number(e.target.value))} className="w-full bg-card border border-border rounded p-2 text-foreground font-mono" />
                            </div>
                        )}
                        <div>
                            <label className="text-xs text-muted-foreground font-bold block mb-1">Operator</label>
                            <div className="grid grid-cols-5 gap-1">
                                {['&', '|', '^', '<<', '>>'].map(o => (
                                    <button
                                        key={o}
                                        onClick={() => setOp(o)}
                                        className={`p-2 rounded font-bold font-mono transition-colors ${op === o ? 'bg-purple-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                                    >
                                        {o}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="w-full md:w-2/3 bg-background/50 rounded-lg p-6 font-mono border border-border">
                    {/* Row A */}
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">A ({a})</span>
                        <div className="flex gap-1">
                            {binA.split('').map((bit, i) => (
                                <div key={i} className={`w-6 h-8 flex items-center justify-center rounded ${bit === '1' ? 'bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/50' : 'bg-muted text-muted-foreground border border-border'}`}>
                                    {bit}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row B (Conditional) */}
                    {!['<<', '>>'].includes(op) && (
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-muted-foreground">B ({b})</span>
                            <div className="flex gap-1">
                                {binB.split('').map((bit, i) => (
                                    <div key={i} className={`w-6 h-8 flex items-center justify-center rounded ${bit === '1' ? 'bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/50' : 'bg-muted text-muted-foreground border border-border'}`}>
                                        {bit}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Operator Line */}
                    <div className="border-b border-border my-4 flex justify-end pr-2 relative">
                        <span className="absolute left-0 -top-3 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded text-xs font-bold">
                            {op === '&' && "AND (Both 1)"}
                            {op === '|' && "OR (Any 1)"}
                            {op === '^' && "XOR (Different)"}
                            {op === '<<' && "Left Shift (x2)"}
                            {op === '>>' && "Right Shift (/2)"}
                        </span>
                    </div>

                    {/* Result */}
                    <div className="flex justify-between items-center">
                        <span className="text-green-600 dark:text-green-400 font-bold">Result ({result})</span>
                        <div className="flex gap-1">
                            {binRes.split('').map((bit, i) => (
                                <div key={i} className={`w-6 h-8 flex items-center justify-center rounded border transition-all duration-500 ${bit === '1' ? 'bg-green-600 text-white border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)] scale-110' : 'bg-muted text-muted-foreground border-border opacity-50'}`}>
                                    {bit}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UnaryVisualizer = () => {
    const [activeTab, setActiveTab] = useState<'pre' | 'post'>('pre');
    const [val, setVal] = useState(5);
    const [result, setResult] = useState<number | null>(null);
    const [step, setStep] = useState(0);

    const reset = () => {
        setVal(5);
        setResult(null);
        setStep(0);
    };

    useEffect(() => { reset(); }, [activeTab]);

    const nextStep = () => {
        if (step === 3) return;
        setStep(step + 1);

        if (activeTab === 'pre') {
            if (step === 0) setVal(6);
            if (step === 1) setResult(6);
        } else {
            if (step === 0) setResult(5);
            if (step === 1) setVal(6);
        }
    };

    return (

        <div className="bg-card/50 border border-border rounded-xl p-6 my-8">
            <div className="flex gap-4 border-b border-border pb-4 mb-6">
                <button
                    onClick={() => setActiveTab('pre')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'pre' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-muted-foreground hover:bg-muted'}`}
                >
                    Pre-Increment (++a)
                </button>
                <button
                    onClick={() => setActiveTab('post')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'post' ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20' : 'text-muted-foreground hover:bg-muted'}`}
                >
                    Post-Increment (a++)
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <CodeBlock code={`int a = 5;\nint b;\n\nb = ${activeTab === 'pre' ? '++a' : 'a++'};\n\n// Final: a=?, b=?`} />
                    <div className="flex gap-2 mt-4">
                        <button onClick={reset} className="bg-muted hover:bg-muted/80 text-muted-foreground px-4 py-2 rounded flex items-center gap-2 text-sm font-bold">
                            <RefreshCw size={16} /> Reset
                        </button>
                        <button
                            onClick={nextStep}
                            disabled={step >= 2}
                            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-2 rounded flex-1 flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-blue-900/20"
                        >
                            Next Step <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between bg-card p-4 rounded-lg border border-border">
                        <div className="text-sm font-bold text-muted-foreground">Variable 'a'</div>
                        <div className={`text-3xl font-mono font-bold transition-all ${val === 6 ? 'text-green-600 dark:text-green-400 scale-110' : 'text-foreground'}`}>
                            {val}
                        </div>
                    </div>
                    <div className="flex items-center justify-between bg-card p-4 rounded-lg border border-border">
                        <div className="text-sm font-bold text-muted-foreground">Variable 'b'</div>
                        <div className={`text-3xl font-mono font-bold transition-all ${result !== null ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-muted-foreground'}`}>
                            {result !== null ? result : "?"}
                        </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded border border-border text-sm text-muted-foreground min-h-[60px] flex items-center">
                        {step === 0 && "Start: 'a' is 5. 'b' is empty."}
                        {step === 1 && (activeTab === 'pre' ? "Step 1: 'a' is incremented to 6 immediately." : "Step 1: The CURRENT value of 'a' (5) is fetched for 'b'.")}
                        {step === 2 && (activeTab === 'pre' ? "Step 2: The new value (6) is assigned to 'b'." : "Step 2: NOW 'a' is incremented to 6. But 'b' already has 5.")}
                    </div>
                </div>
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
                <p className="text-sm text-muted-foreground">The shorthand for if-else.</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 font-mono text-lg md:text-xl">
                <div className="bg-muted p-3 rounded text-muted-foreground">result = </div>

                <button
                    onClick={() => setCond(!cond)}
                    className={`px-4 py-2 rounded font-bold border-2 transition-all ${cond ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-600 dark:text-red-400'}`}
                >
                    {cond ? 'True' : 'False'}
                </button>

                <div className="text-yellow-600 dark:text-yellow-500 font-bold text-2xl">?</div>

                <div className={`p-3 rounded border-2 transition-all ${cond ? 'border-green-500 opacity-100 shadow-[0_0_15px_rgba(34,197,94,0.3)] bg-green-50 dark:bg-green-900/10' : 'border-border opacity-30 grayscale'}`}>
                    "Success"
                </div>

                <div className="text-muted-foreground font-bold text-2xl">:</div>

                <div className={`p-3 rounded border-2 transition-all ${!cond ? 'border-red-500 opacity-100 shadow-[0_0_15px_rgba(239,68,68,0.3)] bg-red-50 dark:bg-red-900/10' : 'border-border opacity-30 grayscale'}`}>
                    "Fail"
                </div>

                <div className="text-muted-foreground">;</div>
            </div>

            <div className="mt-8 text-center">
                <span className="text-muted-foreground text-xs uppercase font-bold tracking-widest block mb-2">Final Value</span>
                <span className={`text-2xl font-bold ${cond ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {cond ? '"Success"' : '"Fail"'}
                </span>
            </div>
        </div>
    );
};

const PrecedenceLadder = () => {
    const levels = [
        { op: "()  []  ->  .", desc: "Postfix / Grouping", dir: "L → R" },
        { op: "++  --  !  ~  sizeof", desc: "Unary (Right to Left!)", dir: "R → L" },
        { op: "* /  %", desc: "Multiplicative", dir: "L → R" },
        { op: "+  -", desc: "Additive", dir: "L → R" },
        { op: "<<  >>", desc: "Bitwise Shift", dir: "L → R" },
        { op: "<  <=  >  >=", desc: "Relational", dir: "L → R" },
        { op: "==  !=", desc: "Equality", dir: "L → R" },
        { op: "&", desc: "Bitwise AND", dir: "L → R" },
        { op: "^", desc: "Bitwise XOR", dir: "L → R" },
        { op: "|", desc: "Bitwise OR", dir: "L → R" },
        { op: "&&", desc: "Logical AND", dir: "L → R" },
        { op: "||", desc: "Logical OR", dir: "L → R" },
        { op: "? :", desc: "Conditional", dir: "R → L" },
        { op: "=  +=  -=  *=", desc: "Assignment", dir: "R → L" },
    ];

    return (
        <div className="space-y-4 my-8">
            <div className="relative border-l-2 border-border ml-4 space-y-2">
                {levels.map((lvl, idx) => (
                    <div key={idx} className="relative pl-6 group">
                        <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 bg-background border-2 border-muted-foreground rounded-full group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors"></div>
                        <div className="bg-card/50 border border-border p-3 rounded-lg flex justify-between items-center group-hover:border-blue-500/30 transition-colors">
                            <div>
                                <span className="font-mono text-foreground font-bold block">{lvl.op}</span>
                                <span className="text-xs text-muted-foreground">{lvl.desc}</span>
                            </div>
                            <span className="text-[10px] bg-muted text-muted-foreground px-2 py-1 rounded border border-border">
                                {lvl.dir}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture3Page() {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32">

            {/* NAVIGATION HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Operators Masterclass</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 1 • Lecture 3</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <nav className="flex gap-1 bg-muted/50 p-1 rounded-full border border-border overflow-x-auto max-w-[200px] md:max-w-none">
                        {[
                            { id: 'arithmetic', label: 'Math', icon: Calculator },
                            { id: 'relational', label: 'Logic', icon: Check },
                            { id: 'bitwise', label: 'Bitwise', icon: Binary },
                            { id: 'unary', label: 'Unary', icon: Zap },
                            { id: 'precedence', label: 'Rank', icon: ListOrdered }
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-all whitespace-nowrap"
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

                {/* HERO SECTION */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 border border-blue-500/30 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Code size={14} /> The Engine Room
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-foreground dark:from-blue-400 dark:via-purple-400 dark:to-white">Operators</span> & Logic
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Variables hold the data, but <strong>Operators</strong> do the work. This lecture covers every tool you need to manipulate data in C, from basic math to bit-level hacking.
                    </p>
                </div>

                {/* SECTION 1: ARITHMETIC */}
                <section id="arithmetic" className="scroll-mt-24">
                    <SectionHeader title="Arithmetic Operators" icon={Calculator} color="blue" />

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-card/50 p-6 rounded-xl border border-border">
                            <h3 className="text-lg font-bold text-foreground mb-4">The Standard Set</h3>
                            <ul className="space-y-4 text-sm text-muted-foreground">
                                <li className="flex justify-between border-b border-border pb-2">
                                    <span><code>+</code> Addition</span>
                                    <span className="text-muted-foreground">10 + 5 = 15</span>
                                </li>
                                <li className="flex justify-between border-b border-border pb-2">
                                    <span><code>-</code> Subtraction</span>
                                    <span className="text-muted-foreground">10 - 5 = 5</span>
                                </li>
                                <li className="flex justify-between border-b border-border pb-2">
                                    <span><code>*</code> Multiplication</span>
                                    <span className="text-muted-foreground">10 * 5 = 50</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-card/50 p-6 rounded-xl border border-border">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><AlertTriangle size={18} className="text-yellow-500" /> The Tricky Ones</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Remember: Integer division <strong>truncates</strong> (drops decimals). Modulus gives the <strong>remainder</strong>.
                            </p>
                            <ul className="space-y-4 text-sm text-muted-foreground">
                                <li className="flex justify-between border-b border-border pb-2">
                                    <span><code>/</code> Division (Int)</span>
                                    <span className="text-red-500 font-bold">5 / 2 = 2</span>
                                </li>
                                <li className="flex justify-between border-b border-border pb-2">
                                    <span><code>%</code> Modulus</span>
                                    <span className="text-green-500 font-bold">5 % 2 = 1</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <DeepDiveCard title="Why use Modulus (%)?">
                        <p>
                            The modulus operator is surprisingly useful! We use it to:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Check if a number is Even or Odd (<code>n % 2 == 0</code>)</li>
                            <li>Cycle through array indices (Circular buffers)</li>
                            <li>Extract the last digit of a number (<code>123 % 10 = 3</code>)</li>
                        </ul>
                    </DeepDiveCard>

                    <ArithmeticLab />
                </section>

                {/* SECTION 2: RELATIONAL & LOGICAL */}
                <section id="relational" className="scroll-mt-24">
                    <SectionHeader title="Relational & Logical Operators" icon={ArrowLeftRight} color="green" />

                    <p className="text-muted-foreground mb-8">
                        These operators form the brain of your code, allowing it to make decisions (If-Else logic).
                        They always evaluate to <strong>1 (True)</strong> or <strong>0 (False)</strong>.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <RelationalDemo />

                        <div className="bg-card/50 p-6 rounded-xl border border-border">
                            <h3 className="text-lg font-bold text-foreground mb-4">Relational Quick Guide</h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex gap-4">
                                    <code className="text-green-600 dark:text-green-400 font-bold w-12 text-center">==</code>
                                    <span>Equal To (Note: Double equals!)</span>
                                </li>
                                <li className="flex gap-4">
                                    <code className="text-red-600 dark:text-red-400 font-bold w-12 text-center">!=</code>
                                    <span>Not Equal To</span>
                                </li>
                                <li className="flex gap-4">
                                    <code className="text-blue-600 dark:text-blue-400 font-bold w-12 text-center">&gt;</code>
                                    <span>Greater Than</span>
                                </li>
                            </ul>
                            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-500/50 rounded text-xs text-red-600 dark:text-red-200">
                                <strong>Common Bug:</strong> Confusing <code>=</code> (Assignment) with <code>==</code> (Comparison).
                                <br />
                                <code>if (x = 5)</code> sets x to 5 and is always True!
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-4 mt-12">The Logical Gates</h3>
                    <LogicLab />

                    <DeepDiveCard title="Short-Circuit Evaluation">
                        <p className="mb-2">C is lazy! It stops evaluating a logical expression as soon as the result is known.</p>
                        <ul className="space-y-2 text-xs font-mono">
                            <li className="bg-muted p-2 rounded border border-border">
                                (A && B) <span className="text-muted-foreground">// If A is False, B is never checked.</span>
                            </li>
                            <li className="bg-muted p-2 rounded border border-border">
                                (A || B) <span className="text-muted-foreground">// If A is True, B is never checked.</span>
                            </li>
                        </ul>
                    </DeepDiveCard>
                </section>

                {/* SECTION 3: BITWISE OPERATORS */}
                <section id="bitwise" className="scroll-mt-24">
                    <SectionHeader title="Bitwise Operators" icon={Binary} color="purple" />

                    <div className="prose prose-invert max-w-none mb-8">
                        <p className="text-muted-foreground text-lg">
                            C allows you to manipulate data at the <strong>bit level</strong> (0s and 1s).
                            This is extremely fast and essential for systems programming, encryption, and compression.
                        </p>
                    </div>

                    <BitwiseLab />

                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                        <div className="bg-card/50 p-6 rounded-xl border border-border">
                            <h4 className="font-bold text-foreground mb-2">Shift Operators</h4>
                            <ul className="text-sm space-y-3 text-muted-foreground">
                                <li>
                                    <strong className="text-purple-600 dark:text-purple-400">&lt;&lt; Left Shift</strong>
                                    <br />Moves bits left. Fills with 0. Effectively multiplies by 2.
                                </li>
                                <li>
                                    <strong className="text-purple-600 dark:text-purple-400">&gt;&gt; Right Shift</strong>
                                    <br />Moves bits right. Effectively divides by 2.
                                </li>
                            </ul>
                        </div>
                        <div className="bg-card/50 p-6 rounded-xl border border-border">
                            <h4 className="font-bold text-foreground mb-2">Bit Masks</h4>
                            <p className="text-xs text-muted-foreground mb-2">Technique to isolate specific bits.</p>
                            <CodeBlock title="Check if Odd" code={`if (n & 1) {\n  printf("Odd");\n}`} />
                        </div>
                    </div>
                </section>

                {/* SECTION 4: UNARY & ASSIGNMENT */}
                <section id="unary" className="scroll-mt-24">
                    <SectionHeader title="Unary, Assignment & Ternary" icon={Zap} color="orange" />

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="font-bold text-foreground text-lg">Increment & Decrement</h3>
                            <p className="text-sm text-muted-foreground">The difference between <code>++i</code> and <code>i++</code> only matters when used inside an expression.</p>
                            <UnaryVisualizer />
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-bold text-foreground text-lg">The Conditional (Ternary) Operator</h3>
                            <p className="text-sm text-muted-foreground">The only operator that takes 3 operands. It's a one-line if-else statement.</p>
                            <TernaryBuilder />
                            <CodeBlock title="Example" code={`int max = (a > b) ? a : b;`} />
                        </div>
                    </div>
                </section>

                {/* SECTION 5: PRECEDENCE & MISC */}
                <section id="precedence" className="scroll-mt-24">
                    <SectionHeader title="Precedence & Type Casting" icon={ListOrdered} color="slate" />

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-4">Operator Precedence</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                Just like PEMDAS in algebra, C has a strict hierarchy. Operators at the top happen first.
                            </p>
                            <PrecedenceLadder />
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-foreground mb-4">Misc Operators</h3>

                            <div className="bg-card p-4 rounded-xl border border-border">
                                <code className="text-purple-600 dark:text-purple-400 font-bold text-lg">sizeof()</code>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Returns the size of a variable or type in bytes.
                                </p>
                                <div className="bg-muted p-2 mt-2 rounded font-mono text-xs text-green-600 dark:text-green-400">
                                    sizeof(int) -&gt; 4
                                </div>
                            </div>

                            <div className="bg-card p-4 rounded-xl border border-border">
                                <code className="text-blue-600 dark:text-blue-400 font-bold text-lg">, (Comma)</code>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Used to link related expressions. Evaluates left to right, returns value of rightmost expression.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 1 • Lecture 3</p>
            </footer>
        </div>
    );
}
