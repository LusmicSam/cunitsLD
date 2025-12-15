"use client";

import React, { useState, useEffect } from 'react';
import {
    Repeat,
    RotateCw,
    SkipForward,
    RefreshCw,
    Play,
    Pause,
    Grid,
    Code,
    RotateCcw,
    BookOpen,
    AlertTriangle,
    Clock,
    Layers,
    ArrowRight,
    CornerUpLeft,
    Calculator,
    Scale,
    TrendingUp,
    CheckCircle,
    XCircle
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
        green: 'border-green-500 bg-green-100 dark:bg-green-900/10',
        yellow: 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/10'
    };

    return (
        <div className={`border-l-4 ${colors[variant]} rounded-r-lg p-6 my-6 transition-all hover:bg-opacity-80 backdrop-blur-sm`}>
            <h4 className={`text-lg font-bold flex items-center gap-2 mb-3 ${variant === 'blue' ? 'text-blue-700 dark:text-blue-300' :
                variant === 'purple' ? 'text-purple-700 dark:text-purple-300' :
                    variant === 'orange' ? 'text-orange-700 dark:text-orange-300' :
                        variant === 'red' ? 'text-red-700 dark:text-red-300' :
                            variant === 'green' ? 'text-green-700 dark:text-green-300' :
                                'text-yellow-700 dark:text-yellow-300'
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

const LoopLab = () => {
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(5);
    const [step, setStep] = useState(1);
    const [current, setCurrent] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [history, setHistory] = useState<number[]>([]);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setCurrent(prev => {
                    const nextVal = (prev === null ? start : prev + step);
                    // Safety check for infinite loops in demo
                    if (history.length > 20) {
                        setIsRunning(false);
                        return null;
                    }
                    if ((step > 0 && nextVal > end) || (step < 0 && nextVal < end)) {
                        setIsRunning(false);
                        return null;
                    }
                    setHistory(h => [...h, nextVal]);
                    return nextVal;
                });
            }, 800);
            return () => clearInterval(interval);
        }
    }, [isRunning, start, end, step, history]);

    const reset = () => {
        setIsRunning(false);
        setCurrent(null);
        setHistory([]);
    };

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Repeat size={20} className="text-blue-600 dark:text-blue-400" /> The Loop Laboratory (For Loop)
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Start (i = ?)</label>
                    <input type="number" value={start} onChange={e => setStart(Number(e.target.value))} className="bg-muted border border-border rounded p-2 text-foreground w-full" disabled={isRunning} />
                </div>
                <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">End (i &lt;= ?)</label>
                    <input type="number" value={end} onChange={e => setEnd(Number(e.target.value))} className="bg-muted border border-border rounded p-2 text-foreground w-full" disabled={isRunning} />
                </div>
                <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Step (i += ?)</label>
                    <input type="number" value={step} onChange={e => setStep(Number(e.target.value))} className="bg-muted border border-border rounded p-2 text-foreground w-full" disabled={isRunning} />
                </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg font-mono text-center mb-6 border border-border">
                <span className="text-purple-600 dark:text-purple-400">for</span> (int i = <span className="text-blue-600 dark:text-blue-400">{start}</span>; i &lt;= <span className="text-red-600 dark:text-red-400">{end}</span>; i += <span className="text-green-600 dark:text-green-400">{step}</span>) {`{ ... }`}
            </div>

            <div className="relative h-24 bg-muted rounded-xl border border-border flex items-center px-6 overflow-hidden">
                <div className="absolute left-0 right-0 h-1 bg-border top-1/2 -translate-y-1/2"></div>

                <div className="flex gap-4 w-full overflow-x-auto relative z-10 py-4 items-center">
                    {history.map((val, idx) => (
                        <div key={idx} className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shrink-0 animate-in zoom-in">
                            {val}
                        </div>
                    ))}
                    {isRunning && (
                        <div className="w-10 h-10 rounded-full border-2 border-dashed border-muted-foreground animate-spin shrink-0"></div>
                    )}
                </div>
            </div>

            <div className="flex justify-center mt-6 gap-4">
                <button
                    onClick={() => {
                        if (!isRunning && current === null) {
                            setHistory([]);
                        }
                        setIsRunning(!isRunning);
                    }}
                    disabled={isRunning && current === null}
                    className={`px-6 py-2 rounded-full font-bold flex items-center gap-2 ${isRunning ? 'bg-yellow-600 text-white' : 'bg-green-600 text-white'}`}
                >
                    {isRunning ? <Pause size={16} /> : <Play size={16} />}
                    {isRunning ? 'Pause' : 'Run Loop'}
                </button>
                <button onClick={reset} className="px-6 py-2 rounded-full font-bold bg-muted text-muted-foreground hover:bg-muted/80 flex items-center gap-2">
                    <RotateCcw size={16} /> Reset
                </button>
            </div>
        </div>
    );
};

const DoWhileBunker = () => {
    const [condition, setCondition] = useState(false);
    const [whileLogs, setWhileLogs] = useState<string[]>([]);
    const [doWhileLogs, setDoWhileLogs] = useState<string[]>([]);

    const runWhileLoop = () => {
        setWhileLogs([]);
        if (condition) {
            setWhileLogs(["Condition TRUE → Body Executed"]);
        } else {
            setWhileLogs(["Condition FALSE → Body SKIPPED"]);
        }
    };

    const runDoWhileLoop = () => {
        setDoWhileLogs([]);
        if (condition) {
            setDoWhileLogs(["Body Executed → Condition TRUE (Repeat)"]);
        } else {
            setDoWhileLogs(["Body Executed → Condition FALSE (Stop)"]);
        }
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <RotateCw size={20} className="text-orange-600 dark:text-orange-400" /> While vs Do-While
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
                Test what happens when the condition is initially <strong>FALSE</strong>.
            </p>

            <div className="flex justify-center mb-8">
                <button
                    onClick={() => setCondition(!condition)}
                    className={`px-4 py-2 rounded-lg border-2 font-bold transition-all ${condition ? 'border-green-500 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'border-red-500 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}
                >
                    Condition: {condition ? 'TRUE' : 'FALSE'}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* While Loop */}
                <div className="bg-card p-4 rounded-xl border border-border">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400">while()</span>
                        <button onClick={runWhileLoop} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded border border-blue-500/30 hover:bg-blue-200 dark:hover:bg-blue-900/50">Run</button>
                    </div>
                    <CodeBlock code={`while(cond) {\n  printf("Run");\n}`} title="Entry Controlled" />
                    <div className="mt-4 h-20 bg-muted/50 rounded p-2 text-xs font-mono text-muted-foreground border border-border">
                        {whileLogs.length > 0 ? whileLogs.map((l, i) => <div key={i}>{l}</div>) : <span className="opacity-50">// Output...</span>}
                    </div>
                </div>

                {/* Do-While Loop */}
                <div className="bg-card p-4 rounded-xl border border-border">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-mono font-bold text-orange-600 dark:text-orange-400">do-while()</span>
                        <button onClick={runDoWhileLoop} className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded border border-orange-500/30 hover:bg-orange-200 dark:hover:bg-orange-900/50">Run</button>
                    </div>
                    <CodeBlock code={`do {\n  printf("Run");\n} while(cond);`} title="Exit Controlled" />
                    <div className="mt-4 h-20 bg-muted/50 rounded p-2 text-xs font-mono text-muted-foreground border border-border">
                        {doWhileLogs.length > 0 ? doWhileLogs.map((l, i) => <div key={i}>{l}</div>) : <span className="opacity-50">// Output...</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TrafficControl = () => {
    const [mode, setMode] = useState<'none' | 'break' | 'continue'>('none');
    const [output, setOutput] = useState<number[]>([]);

    useEffect(() => {
        const res = [];
        for (let i = 1; i <= 10; i++) {
            if (mode === 'break' && i === 5) break;
            if (mode === 'continue' && i % 2 === 0) continue;
            res.push(i);
        }
        setOutput(res);
    }, [mode]);

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <SkipForward size={20} className="text-red-500" /> Jump Statements (Break & Continue)
            </h3>

            <div className="flex flex-wrap gap-4 mb-8">
                <button
                    onClick={() => setMode('none')}
                    className={`px-4 py-2 rounded-lg border-2 font-bold transition-all ${mode === 'none' ? 'bg-slate-700 border-slate-500 text-white' : 'bg-muted border-border text-muted-foreground'}`}
                >
                    Normal Loop (1-10)
                </button>
                <button
                    onClick={() => setMode('break')}
                    className={`px-4 py-2 rounded-lg border-2 font-bold transition-all ${mode === 'break' ? 'bg-red-900/20 border-red-500 text-red-500' : 'bg-muted border-border text-muted-foreground'}`}
                >
                    Break at 5
                </button>
                <button
                    onClick={() => setMode('continue')}
                    className={`px-4 py-2 rounded-lg border-2 font-bold transition-all ${mode === 'continue' ? 'bg-yellow-900/20 border-yellow-500 text-yellow-500' : 'bg-muted border-border text-muted-foreground'}`}
                >
                    Continue (Skip Evens)
                </button>
            </div>

            <div className="relative h-32 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden flex items-center px-4">
                {/* Road Markings */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-700"></div>

                {/* Numbers */}
                <div className="flex gap-4 w-full overflow-x-auto items-end pb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
                        const isPrinted = output.includes(i);
                        const isBreakPoint = mode === 'break' && i === 5;
                        const isSkipped = mode === 'continue' && i % 2 === 0;

                        return (
                            <div key={i} className="relative flex flex-col items-center gap-2 group min-w-[40px]">
                                {isBreakPoint && <div className="absolute -top-8 text-red-500 font-bold animate-bounce text-xs">STOP</div>}
                                {isSkipped && <div className="absolute -top-8 text-yellow-500 font-bold animate-pulse text-xs">SKIP</div>}

                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg border-2 transition-all duration-500
                  ${isPrinted
                                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg translate-y-0 opacity-100'
                                        : isBreakPoint
                                            ? 'bg-red-900/20 border-red-500 text-red-500 opacity-50'
                                            : 'bg-slate-800 border-slate-700 text-slate-600 opacity-30 scale-75'
                                    }
                `}>
                                    {i}
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono">{i}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
                {mode === 'none' && "The loop runs fully from 1 to 10."}
                {mode === 'break' && "When i becomes 5, 'break' kills the loop immediately. 6-10 never happen."}
                {mode === 'continue' && "When i is even, 'continue' jumps to the next iteration. Print is skipped, but loop goes on."}
            </div>
        </div>
    );
};

const GotoVisualizer = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const loopIter = React.useRef(0);

    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setActiveStep(prev => {
                    // Logic for GOTO (Step 3)
                    if (prev === 3) {
                        // Simulate i < 5 condition
                        if (loopIter.current < 2) {
                            loopIter.current++;
                            return 0; // Jump back to "start:"
                        }
                    }

                    // Logic for RETURN (Step 4)
                    if (prev === 4) {
                        loopIter.current = 0; // Reset
                        return 0; // Restart
                    }

                    return prev + 1;
                });
            }, 800);
        } else {
            // Reset state when paused
            setActiveStep(0);
            loopIter.current = 0;
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const steps = [
        { line: 1, text: "start:", type: "label" },
        { line: 2, text: "  printf(\"%d \", i);", type: "code", out: "1 " },
        { line: 3, text: "  i++;", type: "code" },
        { line: 4, text: "  if (i < 5) goto start;", type: "jump", target: 1 },
        { line: 5, text: "return 0;", type: "end" }
    ];

    return (
        <div className="bg-card p-6 rounded-xl border border-red-500/30 my-8 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <CornerUpLeft size={20} className="text-red-600 dark:text-red-400" /> The Forbidden Forest (GOTO)
                </h3>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold transition-colors ${isPlaying ? 'bg-red-600 text-white' : 'bg-muted text-muted-foreground'}`}
                >
                    {isPlaying ? 'Stop Chaos' : 'Visualize Jump'}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm border border-border relative">
                    {steps.map((s, i) => (
                        <div
                            key={i}
                            className={`p-1 px-2 rounded transition-colors flex justify-between
                ${activeStep === i ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-white border-l-2 border-red-500' : 'text-muted-foreground'}
              `}
                        >
                            <span>{s.text}</span>
                            {activeStep === i && s.type === 'jump' && <span className="text-red-600 dark:text-red-400 font-bold">&lt;&lt; JUMP</span>}
                        </div>
                    ))}
                    {/* Visualizing the Spaghetti Jump */}
                    {activeStep === 3 && (
                        <svg className="absolute top-0 right-0 h-full w-12 pointer-events-none text-red-500 animate-pulse">
                            <path d="M 10 75 Q 40 50 10 15" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                                </marker>
                            </defs>
                        </svg>
                    )}
                </div>

                <div className="flex flex-col justify-center">
                    <TheoryCard title="Why is goto bad?" variant="red">
                        <p>
                            It creates <strong>"Spaghetti Code"</strong>: program flow that twists and turns unpredictably.
                            This makes code impossible to debug.
                        </p>
                        <p className="mt-2 text-xs font-bold text-red-600 dark:text-red-300">
                            Only acceptable use: Jumping out of deeply nested loops for error handling.
                        </p>
                    </TheoryCard>
                </div>
            </div>
        </div>
    );
};

const AlgorithmGym = () => {
    const [activeTab, setActiveTab] = useState('sum');
    const [num, setNum] = useState(123);

    // Logic for demos
    const sumOfDigits = (n: number) => {
        let sum = 0;
        let temp = Math.abs(n);
        while (temp > 0) {
            sum += temp % 10;
            temp = Math.floor(temp / 10);
        }
        return sum;
    };

    const reverseNum = (n: number) => {
        let rev = 0;
        let temp = Math.abs(n);
        while (temp > 0) {
            rev = rev * 10 + (temp % 10);
            temp = Math.floor(temp / 10);
        }
        return rev;
    };

    const isPrime = (n: number) => {
        if (n <= 1) return false;
        for (let i = 2; i * i <= n; i++) {
            if (n % i === 0) return false;
        }
        return true;
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Calculator size={20} className="text-green-600 dark:text-green-400" /> The Algorithm Gym (Structured Logic)
            </h3>

            <div className="flex gap-2 mb-6">
                {['sum', 'rev', 'prime'].map(t => (
                    <button
                        key={t}
                        onClick={() => setActiveTab(t)}
                        className={`px-4 py-2 rounded font-bold capitalize transition-all ${activeTab === t ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                    >
                        {t === 'sum' ? 'Sum Digits' : t === 'rev' ? 'Reverse' : 'Prime Check'}
                    </button>
                ))}
            </div>

            <div className="flex flex-col items-center mb-8">
                <label className="text-xs font-bold text-muted-foreground uppercase mb-2">Input Number</label>
                <input
                    type="number" value={num} onChange={e => setNum(parseInt(e.target.value) || 0)}
                    className="bg-muted border border-border rounded p-3 text-xl text-center text-foreground w-32 font-mono"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                {activeTab === 'sum' && (
                    <>
                        <CodeBlock code={`while (n != 0) {\n  digit = n % 10;\n  sum += digit;\n  n = n / 10;\n}`} title="Sum of Digits Logic" />
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground mb-2">Result</div>
                            <div className="text-4xl font-black text-green-600 dark:text-green-400 animate-in zoom-in">{sumOfDigits(num)}</div>
                        </div>
                    </>
                )}

                {activeTab === 'rev' && (
                    <>
                        <CodeBlock code={`while (n != 0) {\n  rem = n % 10;\n  rev = rev * 10 + rem;\n  n /= 10;\n}`} title="Reverse Logic" />
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground mb-2">Reversed</div>
                            <div className="text-4xl font-black text-purple-600 dark:text-purple-400 animate-in zoom-in">{reverseNum(num)}</div>
                        </div>
                    </>
                )}

                {activeTab === 'prime' && (
                    <>
                        <CodeBlock code={`for (i = 2; i*i <= n; i++) {\n  if (n % i == 0) {\n    flag = 0; break;\n  }\n}`} title="Prime Check Logic" />
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground mb-2">Is Prime?</div>
                            <div className={`text-4xl font-black animate-in zoom-in ${isPrime(num) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {isPrime(num) ? "YES" : "NO"}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const TypeSafety = () => {
    return (
        <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="bg-card border border-border p-6 rounded-xl">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2"><Scale size={18} className="text-yellow-600 dark:text-yellow-400" /> Unsigned Loops</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Using <code>unsigned</code> variables in loops can be dangerous if you iterate backwards.
                </p>
                <CodeBlock code={`unsigned int i;\n// Infinite Loop!\nfor(i=10; i >= 0; i--) {\n  // 0 - 1 becomes 4 billion!\n}`} title="The Underflow Trap" />
            </div>

            <div className="bg-card border border-border p-6 rounded-xl">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2"><Layers size={18} className="text-blue-600 dark:text-blue-400" /> Type Casting</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Sometimes you need to convert types explicitly to get correct math.
                </p>
                <CodeBlock code={`int total = 100, n = 3;\n// Explicit cast for float division\nfloat avg = (float)total / n;`} title="Explicit Casting" />
            </div>
        </div>
    );
};

const PatternWeaver = () => {
    const [rows, setRows] = useState(5);

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Grid size={20} className="text-purple-600 dark:text-purple-400" /> Pattern Weaver (Nested Loops)
            </h3>

            <div className="flex items-center gap-4 mb-8">
                <label className="text-sm text-muted-foreground font-bold">Rows (n):</label>
                <input
                    type="range" min="3" max="10" value={rows}
                    onChange={(e) => setRows(Number(e.target.value))}
                    className="accent-purple-500"
                />
                <span className="text-purple-600 dark:text-purple-400 font-mono font-bold">{rows}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <CodeBlock code={`for(i=1; i<=n; i++) {\n  for(j=1; j<=i; j++) {\n    printf("* ");\n  }\n  printf("\\n");\n}`} title="Right Triangle" />
                    <div className="mt-4 p-4 bg-black rounded-lg border border-slate-800 font-mono text-green-400 text-sm leading-tight min-h-[200px]">
                        {Array.from({ length: rows }).map((_, i) => (
                            <div key={i}>
                                {Array.from({ length: i + 1 }).map((_, j) => (
                                    <span key={j} className="inline-block w-4 text-center">*</span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <CodeBlock code={`for(i=1; i<=n; i++) {\n  for(j=1; j<=n; j++) {\n    printf("* ");\n  }\n  printf("\\n");\n}`} title="Square Grid" />
                    <div className="mt-4 p-4 bg-black rounded-lg border border-slate-800 font-mono text-blue-400 text-sm leading-tight min-h-[200px]">
                        {Array.from({ length: rows }).map((_, i) => (
                            <div key={i}>
                                {Array.from({ length: rows }).map((_, j) => (
                                    <span key={j} className="inline-block w-4 text-center">*</span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture3Page() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Loops & Iteration</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 2 • Lecture 3</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/20 border border-green-500/30 text-green-600 dark:text-green-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <RefreshCw size={14} /> Iteration
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        The Power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-foreground dark:from-green-400 dark:via-emerald-400 dark:to-white">Repetition</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Why write the same code 100 times? Loops allow us to execute a block of code repeatedly with zero redundancy.
                    </p>
                </div>

                {/* SECTION 1: THE FOR LOOP */}
                <section>
                    <SectionHeader title="The 'For' Loop" icon={Repeat} color="blue" />

                    <TheoryCard title="Anatomy of a For Loop" variant="blue">
                        <p className="mb-2">The <code>for</code> loop is the most compact and commonly used loop. It puts all the loop logic in one line.</p>
                        <div className="grid md:grid-cols-3 gap-4 mt-4 text-xs">
                            <div className="bg-muted p-3 rounded border border-border">
                                <strong className="text-blue-600 dark:text-blue-400 block mb-1">1. Initialization</strong>
                                Sets the starting value. Runs only once at the beginning.
                                <br /><code className="text-muted-foreground">int i = 0;</code>
                            </div>
                            <div className="bg-muted p-3 rounded border border-border">
                                <strong className="text-purple-600 dark:text-purple-400 block mb-1">2. Condition</strong>
                                Checked before every iteration. If true, the body runs.
                                <br /><code className="text-muted-foreground">i &lt; 10;</code>
                            </div>
                            <div className="bg-muted p-3 rounded border border-border">
                                <strong className="text-green-600 dark:text-green-400 block mb-1">3. Update</strong>
                                Runs after the body. Usually increments the counter.
                                <br /><code className="text-muted-foreground">i++</code>
                            </div>
                        </div>
                    </TheoryCard>

                    <LoopLab />
                </section>

                {/* SECTION 2: WHILE VS DO-WHILE */}
                <section>
                    <SectionHeader title="Entry vs Exit Control" icon={RotateCw} color="orange" />

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <TheoryCard title="While Loop (Entry Controlled)" variant="blue">
                            <p>
                                Checks the condition <strong>before</strong> entering the body.
                                If the condition is initially false, the loop body <strong>never</strong> runs.
                                <br />
                                <span className="text-xs text-muted-foreground mt-2 block">Use when: You don't know exactly how many times to loop (e.g., reading a file).</span>
                            </p>
                        </TheoryCard>
                        <TheoryCard title="Do-While Loop (Exit Controlled)" variant="orange">
                            <p>
                                Checks the condition <strong>after</strong> executing the body.
                                Guarantees that the body runs <strong>at least once</strong>.
                                <br />
                                <span className="text-xs text-muted-foreground mt-2 block">Use when: Menus where you must show options first before asking for input.</span>
                            </p>
                        </TheoryCard>
                    </div>

                    <DoWhileBunker />
                </section>

                {/* SECTION 3: JUMP STATEMENTS */}
                <section>
                    <SectionHeader title="Control Flow: Break & Continue" icon={SkipForward} color="red" />

                    <TheoryCard title="Traffic Control" variant="red">
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <strong className="text-red-600 dark:text-red-400 min-w-[80px]">break:</strong>
                                <span>Emergency Stop. Kills the loop immediately and jumps to the code after the loop block.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <strong className="text-yellow-600 dark:text-yellow-400 min-w-[80px]">continue:</strong>
                                <span>Skip Turn. Stops the current iteration immediately and jumps to the Update step (or Condition), starting the next round.</span>
                            </li>
                        </ul>
                    </TheoryCard>

                    <TrafficControl />
                </section>

                {/* SECTION 4: GOTO & STRUCTURED DESIGN */}
                <section>
                    <SectionHeader title="Jump Statements & Design" icon={CornerUpLeft} color="red" />
                    <p className="text-muted-foreground mb-8">
                        The goto statement allows jumping to any label. It is discouraged as it creates confusing "spaghetti code",
                        but it's part of the syllabus. return exits a function entirely.
                    </p>
                    <GotoVisualizer />
                </section>

                {/* SECTION 5: ALGORITHMS (SYLLABUS) */}
                <section>
                    <SectionHeader title="Structured Algorithms" icon={Calculator} color="green" />
                    <p className="text-muted-foreground mb-8">
                        Applying control structures to solve classic problems: Sum of Digits, Reverse Number, and Prime Check.
                    </p>
                    <AlgorithmGym />
                </section>

                {/* SECTION 6: NESTED LOOPS */}
                <section>
                    <SectionHeader title="Nested Loops & Patterns" icon={Grid} color="purple" />

                    <TheoryCard title="Loops Inside Loops" variant="purple">
                        <p>
                            When you put a loop inside another, you create multiple dimensions.
                            For every <strong>single</strong> step of the Outer Loop (i), the Inner Loop (j) runs <strong>completely</strong>.
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs bg-muted p-2 rounded border border-border w-fit">
                            <Layers size={14} className="text-purple-600 dark:text-purple-400" />
                            <span>Complexity Warning: 2 Nested Loops = O(N²) Time Complexity. Runs N*N times.</span>
                        </div>
                    </TheoryCard>

                    <PatternWeaver />
                </section>

                {/* SECTION 7: TYPE SAFETY & INFINITE LOOPS */}
                <section className="mt-12">
                    <SectionHeader title="Traps & Types" icon={AlertTriangle} color="yellow" />

                    <TypeSafety />

                    <div className="bg-card border border-border rounded-xl p-8">
                        <div className="flex items-center gap-3 mb-4 text-yellow-600 dark:text-yellow-500">
                            <AlertTriangle size={24} />
                            <h3 className="text-xl font-bold text-foreground">The Infinite Loop Trap</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-muted-foreground mb-4">
                                    If the condition never becomes false, your program hangs forever.
                                </p>
                                <div className="bg-black p-4 rounded border border-slate-800 font-mono text-sm text-red-500">
                                    // Mistake: Logic Error<br />
                                    int i = 1;<br />
                                    while (i &lt;= 10) {`{`}<br />
                                    &nbsp;&nbsp;printf("%d", i);<br />
                                    &nbsp;&nbsp;// Forgot i++;<br />
                                    {`}`}
                                </div>
                            </div>
                            <div>
                                <p className="text-muted-foreground mb-4">
                                    Sometimes intentional (for servers), but usually a bug.
                                </p>
                                <div className="bg-black p-4 rounded border border-slate-800 font-mono text-sm text-green-500">
                                    // Intentional<br />
                                    while (1) {`{`}<br />
                                    &nbsp;&nbsp;server.listen();<br />
                                    {`}`}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 2 • Lecture 3</p>
            </footer>
        </div>
    );
}
