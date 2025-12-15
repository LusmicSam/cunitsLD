"use client";

import React, { useState, useEffect } from 'react';
import {
    Copy,
    Layers,
    ArrowRight,
    Play,
    Settings,
    Code,
    CheckCircle,
    AlertTriangle,
    Box,
    Globe,
    Lock,
    RefreshCw,
    ArrowDown,
    ArrowUp,
    X,
    BookOpen,
    Link,
    MoveRight
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

const ParameterMapper = () => {
    const [active, setActive] = useState(false);

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Settings size={20} className="text-green-600 dark:text-green-400" /> Actual vs Formal Parameters
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
                {/* Caller */}
                <div className="flex-1 w-full">
                    <div className="bg-muted/50 p-4 rounded-xl border border-border relative z-10">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-2 block">Main Function (Caller)</span>
                        <div className="font-mono text-sm text-foreground">
                            int x = 10, y = 20;<br />
                            int sum = add(<span className={`font-bold transition-colors ${active ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-1 rounded' : 'text-foreground'}`}>x, y</span>);
                        </div>
                        <div className="mt-4 text-center">
                            <span className="text-xs text-muted-foreground uppercase bg-background px-2 py-1 rounded border border-border">Actual Parameters</span>
                        </div>
                    </div>
                </div>

                {/* Animation Zone */}
                <div className="flex flex-col items-center justify-center">
                    <button
                        onClick={() => setActive(!active)}
                        className={`p-3 rounded-full transition-all ${active ? 'bg-green-600 text-white rotate-90' : 'bg-muted text-muted-foreground'}`}
                    >
                        <ArrowRight size={20} />
                    </button>
                    <span className="text-[10px] text-muted-foreground mt-2 font-mono">{active ? "COPYING VALUES..." : "PASS DATA"}</span>
                </div>

                {/* Callee */}
                <div className="flex-1 w-full">
                    <div className="bg-muted/50 p-4 rounded-xl border border-border relative z-10">
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase mb-2 block">Add Function (Callee)</span>
                        <div className="font-mono text-sm text-foreground">
                            int add(<span className={`font-bold transition-colors ${active ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-1 rounded' : 'text-foreground'}`}>int a, int b</span>) {'{'}<br />
                            &nbsp;&nbsp;return a + b;<br />
                            {'}'}
                        </div>
                        <div className="mt-4 text-center">
                            <span className="text-xs text-muted-foreground uppercase bg-background px-2 py-1 rounded border border-border">Formal Parameters</span>
                        </div>
                    </div>
                </div>

                {/* Flying Values - Slowed down animation (2s) */}
                {active && (
                    <>
                        <div className="absolute top-1/2 left-[25%] -translate-y-1/2 bg-green-500 text-black font-bold text-xs px-2 py-1 rounded-full animate-fly-right shadow-lg z-20">10</div>
                        <div className="absolute top-1/2 left-[25%] -translate-y-1/2 mt-6 bg-green-500 text-black font-bold text-xs px-2 py-1 rounded-full animate-fly-right shadow-lg z-20" style={{ animationDelay: '0.2s' }}>20</div>
                    </>
                )}
            </div>

            <style>{`
        @keyframes fly-right {
          0% { left: 25%; opacity: 1; transform: scale(1); }
          100% { left: 75%; opacity: 0; transform: scale(0.5); }
        }
        .animate-fly-right {
          animation: fly-right 2s ease-in-out forwards;
        }
      `}</style>
        </div>
    );
};

const ValueCopier = () => {
    const [original, setOriginal] = useState(50);
    const [copy, setCopy] = useState(50);
    const [hasCopied, setHasCopied] = useState(false);

    const modifyCopy = () => {
        setCopy(c => c + 10);
    };

    const reset = () => {
        setOriginal(50);
        setCopy(50);
        setHasCopied(false);
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Copy size={20} className="text-blue-600 dark:text-blue-400" /> Simulation: Call by Value
            </h3>

            <div className="grid md:grid-cols-2 gap-12 items-center relative">
                {/* Original Variable */}
                <div className="bg-blue-100 dark:bg-blue-900/10 border border-blue-500/30 p-6 rounded-xl text-center relative">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase mb-2">Original (Main Scope)</div>
                    <div className="text-5xl font-black text-foreground mb-2">{original}</div>
                    <div className="text-xs text-muted-foreground font-mono">Address: 0x100</div>

                    {!hasCopied && (
                        <button
                            onClick={() => setHasCopied(true)}
                            className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 mx-auto"
                        >
                            Call Function <ArrowRight size={14} />
                        </button>
                    )}
                </div>

                {/* The Copy */}
                <div className={`bg-purple-100 dark:bg-purple-900/10 border border-purple-500/30 p-6 rounded-xl text-center relative transition-all duration-1000 ${hasCopied ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-10 blur-sm'}`}>
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-bold uppercase mb-2">Copy (Function Scope)</div>
                    <div className="text-5xl font-black text-foreground mb-2">{hasCopied ? copy : "?"}</div>
                    <div className="text-xs text-muted-foreground font-mono">Address: 0x200 (Different!)</div>

                    {hasCopied && (
                        <div className="mt-4 flex flex-col gap-2">
                            <button
                                onClick={modifyCopy}
                                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold"
                            >
                                Modify Copy (+10)
                            </button>
                            <div className="text-[10px] text-muted-foreground bg-muted p-2 rounded">
                                <strong>Observation:</strong> Changing the copy (0x200) does NOT affect the original (0x100).
                            </div>
                        </div>
                    )}
                </div>

                {/* Arrow */}
                {hasCopied && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground bg-card p-2 rounded-full border border-border z-10">
                        <Copy size={20} />
                    </div>
                )}
            </div>

            <div className="mt-6 flex justify-center">
                <button onClick={reset} className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs">
                    <RefreshCw size={12} /> Reset Simulation
                </button>
            </div>
        </div>
    );
};

const ReferenceVisualizer = () => {
    const [original, setOriginal] = useState(50);
    const [hasCalled, setHasCalled] = useState(false);

    const modifyReference = () => {
        setOriginal(prev => prev + 10);
    };

    const reset = () => {
        setOriginal(50);
        setHasCalled(false);
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Link size={20} className="text-green-600 dark:text-green-400" /> Simulation: Call by Reference
            </h3>

            <div className="grid md:grid-cols-2 gap-12 items-center relative">
                {/* Original Variable */}
                <div className={`bg-blue-100 dark:bg-blue-900/10 border border-blue-500/30 p-6 rounded-xl text-center relative transition-all duration-500 ${hasCalled ? 'ring-2 ring-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : ''}`}>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase mb-2">Original (Main Scope)</div>
                    <div className="text-5xl font-black text-foreground mb-2">{original}</div>
                    <div className="text-xs text-muted-foreground font-mono">Address: 0x100</div>

                    {!hasCalled && (
                        <button
                            onClick={() => setHasCalled(true)}
                            className="mt-4 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 mx-auto"
                        >
                            Pass Address (&) <ArrowRight size={14} />
                        </button>
                    )}
                </div>

                {/* The Pointer */}
                <div className={`bg-purple-100 dark:bg-purple-900/10 border border-purple-500/30 p-6 rounded-xl text-center relative transition-all duration-1000 ${hasCalled ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-10 blur-sm'}`}>
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-bold uppercase mb-2">Pointer (Function Scope)</div>
                    <div className="text-2xl font-mono font-bold text-yellow-500 dark:text-yellow-400 mb-2">{hasCalled ? "0x100" : "?"}</div>
                    <div className="text-xs text-muted-foreground font-mono mb-4">Value = Address of Original</div>

                    {hasCalled && (
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={modifyReference}
                                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center justify-center gap-2"
                            >
                                Modify *ptr (+10) <Link size={14} />
                            </button>
                            <div className="text-[10px] text-muted-foreground bg-muted p-2 rounded">
                                <strong>Observation:</strong> Following the address allows us to modify the ORIGINAL variable directly.
                            </div>
                        </div>
                    )}
                </div>

                {/* Connection Line */}
                {hasCalled && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-green-500 animate-pulse"></div>
                )}
            </div>

            <div className="mt-6 flex justify-center">
                <button onClick={reset} className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs">
                    <RefreshCw size={12} /> Reset Simulation
                </button>
            </div>
        </div>
    );
};

const SwapParadox = () => {
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [mode, setMode] = useState<'value' | 'reference'>('value');

    // Steps: 
    // 0: Start
    // 1: Call Swap
    // 2: Temp = A
    // 3: A = B
    // 4: B = Temp
    // 5: Return

    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setStep(s => {
                    if (s >= 5) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return s + 1;
                });
            }, 2500); // Slowed down to 2.5s per step
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const toggleMode = () => {
        setIsPlaying(false);
        setStep(0);
        setMode(m => m === 'value' ? 'reference' : 'value');
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <RefreshCw size={20} className={mode === 'value' ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"} />
                    {mode === 'value' ? 'The Swap Paradox (Value)' : 'The Swap Solution (Reference)'}
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={toggleMode}
                        className="px-3 py-1 rounded bg-muted text-muted-foreground text-xs font-bold border border-border hover:bg-muted/80"
                    >
                        Switch to {mode === 'value' ? 'Reference' : 'Value'}
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`px-4 py-1 rounded font-bold text-xs transition-colors ${isPlaying ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}
                    >
                        {isPlaying ? 'Stop' : 'Run Animation'}
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Main Memory */}
                <div className={`border border-border rounded-xl p-4 bg-muted/50 transition-all duration-500 ${step >= 3 && mode === 'reference' ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : ''}`}>
                    <h4 className="text-blue-600 dark:text-blue-400 font-bold mb-4 text-center">Main Memory (Caller)</h4>
                    <div className="flex justify-center gap-4">
                        <div className="p-4 bg-blue-100 dark:bg-blue-900/20 border border-blue-500 rounded text-center w-24">
                            <div className="text-xs text-blue-600 dark:text-blue-300 mb-1">A</div>
                            <div className="text-2xl font-bold text-foreground">
                                {mode === 'reference' && step >= 3 ? (step >= 4 ? 10 : 10) : 5}
                            </div>
                        </div>
                        <div className="p-4 bg-blue-100 dark:bg-blue-900/20 border border-blue-500 rounded text-center w-24">
                            <div className="text-xs text-blue-600 dark:text-blue-300 mb-1">B</div>
                            <div className="text-2xl font-bold text-foreground">
                                {mode === 'reference' && step >= 4 ? 5 : 10}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-xs text-muted-foreground h-6">
                        {mode === 'value'
                            ? "Values here NEVER change in Call by Value!"
                            : step >= 3 ? "Values modified via Pointers!" : "Waiting for pointer access..."}
                    </div>
                </div>

                {/* Function Memory */}
                <div className={`border border-border rounded-xl p-4 bg-muted/50 transition-opacity duration-300 ${step > 0 ? 'opacity-100' : 'opacity-30'}`}>
                    <h4 className="text-purple-600 dark:text-purple-400 font-bold mb-4 text-center">Swap Function (Callee)</h4>
                    <div className="flex justify-center gap-4 relative">
                        <div className="p-4 bg-purple-100 dark:bg-purple-900/20 border border-purple-500 rounded text-center w-24 overflow-hidden">
                            <div className="text-xs text-purple-600 dark:text-purple-300 mb-1">{mode === 'value' ? 'x (Copy)' : '*x (Ptr)'}</div>
                            <div className={`text-xl font-bold ${mode === 'value' ? 'text-foreground' : 'text-yellow-600 dark:text-yellow-400 font-mono'}`}>
                                {mode === 'value'
                                    ? (step >= 3 ? 10 : 5)
                                    : (step === 0 ? "?" : "0x100")}
                            </div>
                        </div>
                        <div className="p-4 bg-purple-100 dark:bg-purple-900/20 border border-purple-500 rounded text-center w-24 overflow-hidden">
                            <div className="text-xs text-purple-600 dark:text-purple-300 mb-1">{mode === 'value' ? 'y (Copy)' : '*y (Ptr)'}</div>
                            <div className={`text-xl font-bold ${mode === 'value' ? 'text-foreground' : 'text-yellow-600 dark:text-yellow-400 font-mono'}`}>
                                {mode === 'value'
                                    ? (step >= 4 ? 5 : 10)
                                    : (step === 0 ? "?" : "0x104")}
                            </div>
                        </div>
                        {/* Temp var */}
                        {step >= 2 && step < 5 && (
                            <div className="absolute -top-12 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-500 p-2 rounded text-center animate-in zoom-in">
                                <div className="text-[10px] text-yellow-600 dark:text-yellow-300">Temp</div>
                                <div className="text-lg font-bold text-foreground">5</div>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 text-center text-xs text-muted-foreground h-6">
                        {step === 0 && "Waiting..."}
                        {step === 1 && (mode === 'value' ? "Received copies of A and B." : "Received ADDRESSES of A and B.")}
                        {step === 2 && "Saved value into temp."}
                        {step === 3 && (mode === 'value' ? "Overwrote local copy x." : "Followed pointer x to overwrite A.")}
                        {step === 4 && (mode === 'value' ? "Overwrote local copy y." : "Followed pointer y to overwrite B.")}
                        {step === 5 && "Function returns. Stack destroyed."}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ScopeVisualizer = () => {
    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Layers size={20} className="text-orange-500 dark:text-orange-400" /> Scope & Visibility
            </h3>

            <div className="relative h-80 border-2 border-border rounded-xl bg-muted/30 overflow-hidden">

                {/* Global Scope Layer */}
                <div className="absolute inset-0 p-4">
                    <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-green-600 dark:text-green-500 uppercase flex items-center gap-2"><Globe size={14} /> Global Scope</span>
                        <div className="bg-green-100 dark:bg-green-900/20 border border-green-500/50 p-2 rounded text-green-700 dark:text-green-200 text-xs">
                            int globalVar = 100;
                        </div>
                    </div>
                    <p className="text-[10px] text-green-700 dark:text-green-500 mt-1 ml-6">Visible everywhere. Lives forever.</p>

                    {/* Main Function Scope */}
                    <div className="mt-8 ml-8 mr-8 h-48 border-l-2 border-b-2 border-blue-500/50 rounded-bl-xl p-4 relative bg-blue-50 dark:bg-blue-900/5">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase flex items-center gap-2"><Box size={14} /> Main Function</span>
                        <div className="mt-2 bg-blue-100 dark:bg-blue-900/20 border border-blue-500/50 p-2 rounded text-blue-700 dark:text-blue-200 text-xs w-fit">
                            int mainVar = 50;
                        </div>
                        <p className="text-[10px] text-blue-700 dark:text-blue-500 mt-1">Visible only in main().</p>

                        {/* Inner Block Scope */}
                        <div className="mt-4 ml-8 h-24 border-l-2 border-b-2 border-purple-500/50 rounded-bl-xl p-4 relative bg-purple-50 dark:bg-purple-900/5">
                            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase flex items-center gap-2"><Lock size={14} /> Loop / Block</span>
                            <div className="mt-2 bg-purple-100 dark:bg-purple-900/20 border border-purple-500/50 p-2 rounded text-purple-700 dark:text-purple-200 text-xs w-fit">
                                int localVar = 1;
                            </div>
                            <p className="text-[10px] text-purple-700 dark:text-purple-500 mt-1">Visible only inside this block.</p>
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
        <div className="min-h-screen bg-background text-foreground font-sans pb-32">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunitsLD/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Data Flow & Scope</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 3 • Lecture 2</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 border border-blue-500/30 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <ArrowRight size={14} /> Value vs Reference
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-foreground dark:from-blue-400 dark:via-purple-400 dark:to-white">Great Copy</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        In C, functions usually work on <strong>copies</strong> of data. To change the original data, we must use <strong>references</strong> (pointers).
                    </p>
                </div>

                {/* SECTION 1: ACTUAL VS FORMAL */}
                <section>
                    <SectionHeader title="Actual vs Formal Parameters" icon={Settings} color="green" />

                    <TheoryCard title="Terminology Check" variant="green">
                        <ul className="space-y-3 text-sm">
                            <li className="flex gap-3">
                                <strong className="text-foreground min-w-[120px]">Actual Parameters:</strong>
                                <span className="text-muted-foreground">The real values passed during the function call (e.g., <code>10, 20</code> or <code>x, y</code>).</span>
                            </li>
                            <li className="flex gap-3">
                                <strong className="text-foreground min-w-[120px]">Formal Parameters:</strong>
                                <span className="text-muted-foreground">The variables defined in the function header to receive the values (e.g., <code>int a, int b</code>).</span>
                            </li>
                        </ul>
                    </TheoryCard>

                    <ParameterMapper />
                </section>

                {/* SECTION 2: CALL BY VALUE VS REFERENCE */}
                <section>
                    <SectionHeader title="The Two Ways to Pass Data" icon={Copy} color="blue" />

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <TheoryCard title="Call by Value" variant="blue">
                            <p>The default in C.</p>
                            <ul className="list-disc pl-4 mt-2 space-y-1 text-sm text-muted-foreground">
                                <li>Creates a <strong>photocopy</strong> of the variable.</li>
                                <li>Changes inside function do <strong>NOT</strong> affect original.</li>
                                <li>Safer, but uses more memory for large structs.</li>
                            </ul>
                        </TheoryCard>
                        <TheoryCard title="Call by Reference (Simulated)" variant="green">
                            <p>Using pointers (Unit 5 preview).</p>
                            <ul className="list-disc pl-4 mt-2 space-y-1 text-sm text-muted-foreground">
                                <li>Passes the <strong>Address</strong> of the variable.</li>
                                <li>Changes inside function <strong>DIRECTLY</strong> affect original.</li>
                                <li>Essential for functions like <code>swap()</code> or <code>scanf()</code>.</li>
                            </ul>
                        </TheoryCard>
                    </div>

                    <ValueCopier />
                    <ReferenceVisualizer />
                </section>

                {/* SECTION 3: THE SWAP PROBLEM */}
                <section>
                    <SectionHeader title="The Swap Paradox" icon={RefreshCw} color="red" />

                    <p className="text-muted-foreground mb-8">
                        This demonstrates the classic beginner mistake of trying to swap variables using Call by Value, and the fix using Call by Reference.
                    </p>

                    <SwapParadox />
                </section>

                {/* SECTION 4: SCOPE */}
                <section>
                    <SectionHeader title="Scope: Where Variables Live" icon={Layers} color="orange" />

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <TheoryCard title="Scope Rules" variant="orange">
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={14} className="text-green-500 mt-1 shrink-0" />
                                    <span><strong>Global Scope:</strong> Variables declared outside any function. Accessible everywhere. Lives for the entire program runtime.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={14} className="text-green-500 mt-1 shrink-0" />
                                    <span><strong>Local Scope:</strong> Variables declared inside a function or block <code>{'{ }'}</code>. Accessible only within that block. Destroyed when block ends.</span>
                                </li>
                            </ul>
                        </TheoryCard>

                        <div className="bg-muted/50 p-4 rounded-xl border border-border">
                            <h4 className="text-blue-600 dark:text-blue-400 font-bold mb-2 flex items-center gap-2"><BookOpen size={16} /> Memory Visual</h4>
                            <p className="text-xs text-muted-foreground">
                                Variables are pushed onto the <strong>Stack</strong> when a function is called and popped off when it returns.
                            </p>
                        </div>
                    </div>

                    <ScopeVisualizer />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 3 • Lecture 2</p>
            </footer>
        </div>
    );
}
