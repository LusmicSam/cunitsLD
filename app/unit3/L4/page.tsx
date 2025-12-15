"use client";

import React, { useState, useEffect } from 'react';
import {
    RotateCcw,
    Play,
    Layers,
    Box,
    Zap,
    Repeat,
    ArrowDown,
    ArrowUp,
    GitBranch,
    XCircle,
    AlertTriangle,
    Infinity
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

const FactorialStack = () => {
    const [n, setN] = useState(4);
    const [step, setStep] = useState(0);
    const [stack, setStack] = useState<number[]>([]);
    const [result, setResult] = useState<number | null>(null);
    const [isUnwinding, setIsUnwinding] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // States:
    // 0: Idle
    // 1..n: Pushing (Winding)
    // n+1..2n: Popping (Unwinding)

    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setStep(current => {
                    // Logic to advance step
                    if (!isUnwinding) {
                        // Winding Phase
                        if (current < n) {
                            setStack(s => [...s, n - current]);
                            return current + 1;
                        } else {
                            setIsUnwinding(true);
                            return current; // Hold for a beat
                        }
                    } else {
                        // Unwinding Phase
                        if (stack.length > 0) {
                            setStack(s => {
                                const newS = [...s];
                                newS.pop();
                                return newS;
                            });
                            return current + 1;
                        } else {
                            setIsPlaying(false);
                            setResult(fact(n));
                            return current;
                        }
                    }
                });
            }, 1200);
        }
        return () => clearInterval(interval);
    }, [isPlaying, isUnwinding, n, stack]);

    const fact = (num: number): number => num <= 1 ? 1 : num * fact(num - 1);

    const reset = () => {
        setIsPlaying(false);
        setStep(0);
        setStack([]);
        setResult(null);
        setIsUnwinding(false);
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Layers size={20} className="text-purple-600 dark:text-purple-400" /> The Call Stack Visualizer
            </h3>

            <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-muted-foreground">Calculate factorial of:</span>
                    <div className="flex gap-2">
                        {[3, 4, 5].map(num => (
                            <button
                                key={num}
                                onClick={() => { reset(); setN(num); }}
                                className={`px-3 py-1 rounded text-xs font-bold border transition-all ${n === num ? 'bg-purple-600 text-white border-purple-500' : 'bg-muted text-muted-foreground border-border'}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs transition-all ${isPlaying ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
                >
                    {isPlaying ? 'Pause' : 'Start Recursion'}
                </button>
                <button onClick={reset} className="text-muted-foreground text-xs hover:text-foreground"><RotateCcw size={14} /></button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Code View */}
                <div className="font-mono text-sm bg-muted/50 p-4 rounded-xl border border-border h-fit">
                    <div className="text-muted-foreground mb-2">// Recursive Function</div>
                    <div className={`p-1 ${!isUnwinding && stack.length === 0 ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-white rounded' : 'text-muted-foreground'}`}>
                        int fact(int n) {'{'}
                    </div>
                    <div className={`pl-4 p-1 ${!isUnwinding && stack.length > 0 && stack[stack.length - 1] === 1 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold rounded' : 'text-muted-foreground'}`}>
                        if (n &lt;= 1) return 1; <span className="text-muted-foreground">// Base Case</span>
                    </div>
                    <div className={`pl-4 p-1 ${!isUnwinding && stack.length > 0 && stack[stack.length - 1] > 1 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold rounded' : 'text-muted-foreground'}`}>
                        return n * fact(n - 1); <span className="text-muted-foreground">// Recursive Step</span>
                    </div>
                    <div className="text-muted-foreground">{'}'}</div>
                </div>

                {/* Stack View */}
                <div className="border-2 border-b-0 border-border rounded-t-xl bg-muted/30 min-h-[300px] flex flex-col justify-end p-4 relative overflow-hidden">
                    <div className="absolute top-2 right-2 text-xs text-muted-foreground font-bold uppercase flex items-center gap-1">
                        <Layers size={12} /> Memory Stack
                    </div>

                    <div className="space-y-2">
                        {stack.map((val, idx) => (
                            <div
                                key={idx}
                                className={`p-3 rounded-lg flex justify-between items-center animate-in slide-in-from-top-12 duration-500 ${val === 1 ? 'bg-green-600 text-white border-green-400' : 'bg-blue-600 text-white border-blue-400'}`}
                            >
                                <span className="font-mono font-bold">fact({val})</span>
                                <span className="text-xs bg-black/20 px-2 py-1 rounded">
                                    {val === 1 ? "Returns 1" : `Waiting for fact(${val - 1})`}
                                </span>
                            </div>
                        ))}
                        {stack.length === 0 && result === null && (
                            <div className="text-center text-muted-foreground text-sm py-12">Stack is Empty</div>
                        )}
                        {result !== null && (
                            <div className="bg-purple-600 text-white p-4 rounded-lg text-center animate-in zoom-in font-bold text-xl mb-4">
                                Result: {result}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfiniteLoopDemo = () => {
    const [crashed, setCrashed] = useState(false);
    const [count, setCount] = useState(0);

    const runCrash = () => {
        setCrashed(false);
        setCount(0);
        const interval = setInterval(() => {
            setCount(c => {
                if (c > 500) {
                    clearInterval(interval);
                    setCrashed(true);
                    return c;
                }
                return c + 10;
            });
        }, 20);
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-red-500/30 my-8 relative overflow-hidden">
            {crashed && (
                <div className="absolute inset-0 bg-red-900/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in fade-in text-center p-6">
                    <AlertTriangle size={64} className="text-white mb-4 animate-bounce" />
                    <h2 className="text-3xl font-black text-white mb-2">STACK OVERFLOW</h2>
                    <p className="text-red-200 mb-6 max-w-md">
                        You forgot the Base Case! The function called itself forever until memory ran out.
                    </p>
                    <button
                        onClick={() => { setCrashed(false); setCount(0); }}
                        className="bg-white text-red-900 px-6 py-2 rounded-full font-bold hover:bg-slate-200"
                    >
                        Fix & Restart
                    </button>
                </div>
            )}

            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <XCircle size={20} className="text-red-600 dark:text-red-400" /> The Danger Zone: Missing Base Case
            </h3>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <CodeBlock
                    title="Bad Code"
                    code={`void infinite() {
  printf("Help!\\n");
  infinite(); // No stopping condition!
}`}
                />

                <div className="bg-card p-6 rounded-xl border border-border text-center">
                    <div className="text-4xl font-black text-foreground mb-2 font-mono">{count}</div>
                    <div className="text-sm text-muted-foreground mb-4">Stack Frames Created</div>

                    <div className="w-full bg-muted rounded-full h-4 overflow-hidden mb-6">
                        <div
                            className={`h-full ${count > 400 ? 'bg-red-500' : 'bg-green-500'} transition-all`}
                            style={{ width: `${(count / 500) * 100}%` }}
                        ></div>
                    </div>

                    <button
                        onClick={runCrash}
                        disabled={count > 0}
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Play size={16} /> Run Without Base Case
                    </button>
                </div>
            </div>
        </div>
    );
};

const TreeRecursion = () => {
    const [depth, setDepth] = useState(0);

    // Fibonacci visualization helper
    // We will just render a static tree for visual clarity

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <GitBranch size={20} className="text-green-600 dark:text-green-400" /> Tree Recursion (Fibonacci)
            </h3>

            <p className="text-muted-foreground text-sm mb-6">
                When a function calls itself <strong>multiple times</strong>, it creates a tree-like execution structure. This is beautiful but can be computationally expensive (O(2^n)).
            </p>

            <div className="flex flex-col items-center gap-4 py-8 overflow-x-auto">
                {/* Level 0 */}
                <div className="flex justify-center">
                    <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 border-card z-10">5</div>
                </div>

                {/* Level 1 */}
                <div className="flex justify-center gap-16 relative">
                    <div className="absolute top-0 left-[25%] right-[25%] h-px bg-muted-foreground -translate-y-6"></div> {/* Connector */}
                    <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                </div>

                {/* Level 2 */}
                <div className="flex justify-center gap-4">
                    <div className="flex justify-center gap-2">
                        <div className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-xs">2</div>
                        <div className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-xs">1</div>
                    </div>
                    <div className="w-8"></div>
                    <div className="flex justify-center gap-2">
                        <div className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-xs">1</div>
                        <div className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-xs">0</div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-4">
                <p className="text-xs text-muted-foreground">
                    Visual representation of <code>fib(3)</code> calls. Note how values are recalculated.
                </p>
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
                        <h1 className="font-bold text-foreground text-sm leading-tight">Recursion</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 3 • Lecture 4</p>
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
                        <Infinity size={14} /> The Infinite Mirror
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        To Understand <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-foreground dark:from-purple-400 dark:via-blue-400 dark:to-white">Recursion</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        You must first understand recursion. (See what I did there?)
                    </p>
                </div>

                {/* SECTION 1: VISUALIZATION */}
                <section>
                    <SectionHeader title="How it Works: The Stack" icon={Layers} color="blue" />

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <TheoryCard title="The Base Case" variant="green">
                            <p className="text-sm text-muted-foreground">
                                The condition that <strong>stops</strong> the recursion. Without it, you get an infinite loop (Stack Overflow).
                            </p>
                            <div className="mt-2 bg-muted p-2 rounded border border-green-500/20 text-xs font-mono text-green-600 dark:text-green-400">
                                if (n == 0) return;
                            </div>
                        </TheoryCard>
                        <TheoryCard title="The Recursive Step" variant="blue">
                            <p className="text-sm text-muted-foreground">
                                The function calls itself with a <strong>smaller</strong> problem, moving closer to the base case.
                            </p>
                            <div className="mt-2 bg-muted p-2 rounded border border-blue-500/20 text-xs font-mono text-blue-600 dark:text-blue-400">
                                return n * fact(n - 1);
                            </div>
                        </TheoryCard>
                    </div>

                    <FactorialStack />
                </section>

                {/* SECTION 2: DANGERS */}
                <section>
                    <SectionHeader title="The Stack Overflow Error" icon={AlertTriangle} color="red" />
                    <p className="text-muted-foreground mb-8">
                        Memory is limited. Every function call consumes some stack space. Too many calls = Crash.
                    </p>
                    <InfiniteLoopDemo />
                </section>

                {/* SECTION 3: TYPES */}
                <section>
                    <SectionHeader title="Types of Recursion" icon={GitBranch} color="green" />
                    <TreeRecursion />
                </section>

                {/* SECTION 4: CODE EXAMPLES */}
                <section>
                    <SectionHeader title="Classic Examples" icon={Repeat} color="orange" />
                    <div className="grid md:grid-cols-2 gap-8">
                        <CodeBlock title="Factorial (Linear)" code={`int fact(int n) {\n  if (n == 0) return 1;\n  return n * fact(n-1);\n}`} />
                        <CodeBlock title="Fibonacci (Tree)" code={`int fib(int n) {\n  if (n <= 1) return n;\n  return fib(n-1) + fib(n-2);\n}`} />
                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 3 • Lecture 4</p>
            </footer>
        </div>
    );
}
