'use client';

import React, { useState } from 'react';
import {
    BookOpen, Code, Cpu, ArrowRight, Play, RotateCcw,
    CheckCircle, Zap, Terminal, Settings, Sparkles,
    Layers, Box, Info, X, AlertTriangle
} from 'lucide-react';
import { ModeToggle } from '@/components/theme-toggle';

// --- VISUALIZATION COMPONENTS ---

// 1. CodeBlock with Detailed Manual Explanations
const CodeBlock = ({
    code,
    language = 'c',
    explanation,
    title,
    layout = 'horizontal'
}: {
    code: string,
    language?: string,
    explanation: string,
    title?: string,
    layout?: 'horizontal' | 'vertical'
}) => {
    const [showExplanation, setShowExplanation] = useState(true);

    return (
        <div className="bg-card rounded-xl overflow-hidden border border-border my-6 shadow-2xl relative group transition-all duration-300 ring-1 ring-white/5 mx-auto max-w-full">
            <div className="flex items-center justify-between px-4 py-3 bg-muted border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    {title && <span className="text-xs font-bold text-muted-foreground ml-2">{title}</span>}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-mono uppercase px-2 py-0.5 rounded bg-card border border-border">{language}</span>
                    <button
                        onClick={() => setShowExplanation(!showExplanation)}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all font-bold ${showExplanation
                            ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                    >
                        {showExplanation ? <X size={14} /> : <Info size={14} />}
                        {showExplanation ? 'Hide Details' : 'Explain Logic'}
                    </button>
                </div>
            </div>

            <div className={`flex flex-col ${layout === 'horizontal' ? 'md:flex-row' : ''}`}>
                {/* Code Area */}
                <div className={`relative ${showExplanation && layout === 'horizontal' ? 'md:w-3/5 border-b md:border-b-0 md:border-r border-border' : 'w-full'} ${showExplanation && layout === 'vertical' ? 'border-b border-border' : ''}`}>
                    <pre className="p-5 overflow-x-auto text-sm font-mono leading-loose text-muted-foreground whitespace-pre scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                        {code}
                    </pre>
                </div>

                {/* Explanation Panel */}
                {showExplanation && (
                    <div className={`${layout === 'horizontal' ? 'md:w-2/5 md:border-t-0 p-5' : 'w-full p-4'} bg-muted/30 backdrop-blur-sm overflow-y-auto border-t border-border`}>
                        <h4 className="text-blue-500 dark:text-blue-400 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Sparkles size={14} /> Code Breakdown
                        </h4>
                        <div className="space-y-3">
                            {explanation.split('\n').map((line, i) => {
                                const trimmed = line.trim();
                                const isTitle = trimmed.startsWith('1.') || trimmed.startsWith('2.') || trimmed.startsWith('3.') || trimmed.startsWith('4.');
                                const isBullet = trimmed.startsWith('•');

                                return (
                                    <div key={i} className={`text-sm ${isTitle ? 'mt-4 first:mt-0' : ''}`}>
                                        {isTitle ? (
                                            <p className="font-bold text-foreground mb-1">{line}</p>
                                        ) : isBullet ? (
                                            <p className="pl-4 text-muted-foreground text-xs flex gap-2">
                                                <span className="inline-block w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                                                {trimmed.substring(1)}
                                            </p>
                                        ) : (
                                            <p className="text-muted-foreground leading-relaxed">{line}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// 2. Scalar vs Array Comparison
const StorageComparison = () => {
    const [mode, setMode] = useState<'scalar' | 'array'>('scalar');

    return (
        <div className="bg-card/50 p-6 md:p-8 rounded-2xl border border-border my-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Layers size={22} className="text-orange-500 dark:text-orange-400" /> Memory Layout Visualizer
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">Switch views to see how data is stored physically in RAM</p>
                </div>
                <div className="bg-muted p-1.5 rounded-xl border border-border flex w-full md:w-auto">
                    <button
                        onClick={() => setMode('scalar')}
                        className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'scalar' ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Scalar Variables
                    </button>
                    <button
                        onClick={() => setMode('array')}
                        className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'array' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Array Structure
                    </button>
                </div>
            </div>

            <div className="h-64 relative bg-black/20 dark:bg-black/40 rounded-xl border border-border overflow-hidden flex items-center justify-center shadow-inner">
                {mode === 'scalar' ? (
                    <div className="relative w-full h-full p-6 animate-fadeIn transition-all">
                        <div className="absolute top-4 left-4 text-xs font-mono text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/30 px-2 py-1 rounded border border-orange-500/20">
                            RAM (Random Access Memory)
                        </div>
                        {/* Scattered Boxes */}
                        <div className="absolute top-1/2 left-[20%] -translate-y-1/2 -translate-x-1/2 w-20 h-24 bg-card border-2 border-orange-500/30 rounded-lg flex flex-col items-center justify-center shadow-[0_0_30px_-5px_rgba(249,115,22,0.2)] animate-float-slow">
                            <span className="text-xs text-muted-foreground font-mono mb-1">int a</span>
                            <span className="font-bold text-2xl text-foreground">10</span>
                            <span className="text-[10px] text-muted-foreground font-mono mt-2 bg-muted px-1 rounded">0x7F4</span>
                        </div>
                        <div className="absolute top-[30%] left-[80%] -translate-x-1/2 w-20 h-24 bg-card border-2 border-orange-500/30 rounded-lg flex flex-col items-center justify-center shadow-[0_0_30px_-5px_rgba(249,115,22,0.2)] animate-float-medium">
                            <span className="text-xs text-muted-foreground font-mono mb-1">int b</span>
                            <span className="font-bold text-2xl text-foreground">20</span>
                            <span className="text-[10px] text-muted-foreground font-mono mt-2 bg-muted px-1 rounded">0x2A1</span>
                        </div>
                        <div className="absolute top-[70%] right-[30%] -translate-x-1/2 w-20 h-24 bg-card border-2 border-orange-500/30 rounded-lg flex flex-col items-center justify-center shadow-[0_0_30px_-5px_rgba(249,115,22,0.2)] animate-float-fast">
                            <span className="text-xs text-muted-foreground font-mono mb-1">int c</span>
                            <span className="font-bold text-2xl text-foreground">30</span>
                            <span className="text-[10px] text-muted-foreground font-mono mt-2 bg-muted px-1 rounded">0x9B0</span>
                        </div>

                        {/* Connection Lines (Dashed to show disconnection) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                            <path d="M200 150 Q 400 50 600 100" fill="none" stroke="orange" strokeDasharray="5,5" strokeWidth="2" />
                        </svg>
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center animate-fadeIn transition-all p-4">
                        <div className="text-xs font-mono text-blue-500 dark:text-blue-400 mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            Contiguous Memory Block (Sequential Addresses)
                        </div>
                        <div className="flex flex-wrap justify-center md:flex-nowrap gap-0 shadow-2xl">
                            {[10, 20, 30, 40, 50].map((val, i) => (
                                <div key={i} className="w-16 md:w-24 h-28 bg-card border-r border-y first:border-l border-blue-500/30 flex flex-col items-center justify-center relative hover:bg-blue-900/10 transition-colors group">
                                    <span className="text-[10px] md:text-xs text-muted-foreground absolute top-2 font-mono group-hover:text-blue-500">arr[{i}]</span>
                                    <span className="font-bold text-xl md:text-3xl text-foreground group-hover:scale-110 transition-transform">{val}</span>
                                    <div className="absolute bottom-0 left-0 right-0 bg-muted/50 py-1 text-center border-t border-border">
                                        <span className="text-[9px] md:text-[10px] text-blue-500/80 font-mono">100{i * 4}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-4 p-4 rounded-lg bg-muted/50 mx-auto max-w-2xl border border-border">
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    {mode === 'scalar'
                        ? <span><strong>Scalar Disadvantage:</strong> Variables are scattered randomly. The CPU has to "jump" around memory to find each one, which is slower (poor cache locality). Address calculation is impossible.</span>
                        : <span><strong>Array Advantage:</strong> Elements are packed tightly together. The CPU can fetch them in chunks (cache friendly). We can find <em>any</em> element instantly using math!</span>}
                </p>
            </div>
        </div>
    );
};

// 3. Deep Dive Memory Lab
const MemoryLab = () => {
    const [baseAddr, setBaseAddr] = useState(2000);
    const [dataType, setDataType] = useState<'int' | 'char' | 'double'>('int');
    const [hoverIdx, setHoverIdx] = useState<number | null>(null);

    const typeSize = { int: 4, char: 1, double: 8 };
    const currentSize = typeSize[dataType];

    return (
        <div className="bg-card/50 p-6 md:p-8 rounded-2xl border border-border my-8 shadow-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
                <Cpu size={22} className="text-purple-500 dark:text-purple-400" /> Memory Address Calculator
            </h3>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                    <div className="bg-muted/50 p-5 rounded-xl border border-border">
                        <h4 className="text-sm font-bold text-muted-foreground uppercase mb-4">Configuration</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Starting Address (Base)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">0x</span>
                                    <input
                                        type="number"
                                        value={baseAddr}
                                        onChange={e => setBaseAddr(Number(e.target.value))}
                                        className="w-full bg-card border border-border rounded-lg pl-8 p-2.5 text-foreground font-mono focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Data Type</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['int', 'char', 'double'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setDataType(t as any)}
                                            className={`py-2 px-3 rounded-lg text-xs md:text-sm font-bold border transition-all ${dataType === t
                                                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/20'
                                                : 'bg-card border-border text-muted-foreground hover:bg-muted'
                                                }`}
                                        >
                                            {t} <span className="opacity-60 block text-[10px] md:inline md:text-xs md:ml-1">({typeSize[t as keyof typeof typeSize]}B)</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border flex flex-col items-center justify-center min-h-[160px]">
                    {hoverIdx !== null ? (
                        <div className="w-full max-w-md animate-fadeIn">
                            <div className="flex justify-between items-center text-muted-foreground text-xs mb-4 uppercase tracking-wider font-bold">
                                <span>Computation</span>
                                <span>Result</span>
                            </div>
                            <div className="flex items-center justify-between gap-4 font-mono text-lg md:text-xl">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-purple-500 dark:text-purple-400 font-bold">{baseAddr}</span>
                                    <span className="text-muted-foreground">+</span>
                                    <span className="text-muted-foreground">(</span>
                                    <span className="text-green-500 dark:text-green-400 font-bold">{hoverIdx}</span>
                                    <span className="text-muted-foreground">×</span>
                                    <span className="text-blue-500 dark:text-blue-400 font-bold">{currentSize}</span>
                                    <span className="text-muted-foreground">)</span>
                                </div>
                                <div className="w-8 h-[2px] bg-border" />
                                <span className="text-2xl md:text-3xl font-bold text-foreground drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                                    {baseAddr + (hoverIdx * currentSize)}
                                </span>
                            </div>
                            <div className="mt-4 text-xs text-center text-muted-foreground bg-muted/50 py-2 rounded border border-border">
                                Address of <code>arr[{hoverIdx}]</code>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-3">
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto border border-border">
                                <Cpu size={24} className="text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground text-sm">Hover over a memory block below to see the address calculation logic.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Visual Blocks */}
            <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                <div className="flex min-w-max px-2">
                    {[0, 1, 2, 3, 4, 5, 6].map(i => (
                        <div
                            key={i}
                            onMouseEnter={() => setHoverIdx(i)}
                            onMouseLeave={() => setHoverIdx(null)}
                            className={`w-24 md:w-32 h-32 border-r border-border flex flex-col items-center justify-between p-3 cursor-pointer transition-all duration-200 ${hoverIdx === i
                                ? 'bg-purple-100 dark:bg-purple-900/20 shadow-[inset_0_0_20px_rgba(168,85,247,0.1)] scale-105 z-10 border-slate-600 rounded-lg'
                                : 'bg-card hover:bg-muted'
                                } first:rounded-l-lg last:rounded-r-lg`}
                        >
                            <div className="w-full flex justify-between items-center text-[10px] text-muted-foreground font-mono">
                                <span>Index {i}</span>
                            </div>

                            <Box className={`text-muted-foreground transition-colors duration-300 ${hoverIdx === i ? 'text-purple-500 dark:text-purple-400' : ''}`} size={40} />

                            <div className="text-center w-full">
                                <span className={`text-xs font-mono font-bold transition-colors ${hoverIdx === i ? 'text-foreground' : 'text-blue-600/70 dark:text-blue-400/70'}`}>
                                    {baseAddr + (i * currentSize)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 4. Traversal Visualizer
const TraversalVisualizer = () => {
    const [currentIdx, setCurrentIdx] = useState(-1);
    const [sum, setSum] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const arr = [10, 20, 5, 8, 12];

    const runLoop = async () => {
        if (isRunning) return;
        setIsRunning(true);
        setCurrentIdx(-1);
        setSum(0);

        // Initial delay
        await new Promise(r => setTimeout(r, 600));

        for (let i = 0; i < arr.length; i++) {
            setCurrentIdx(i);
            await new Promise(r => setTimeout(r, 1200));
            setSum(prev => prev + arr[i]);
            await new Promise(r => setTimeout(r, 600));
        }

        setIsRunning(false);
    };

    return (
        <div className="bg-card/50 p-6 md:p-8 rounded-2xl border border-border my-8 shadow-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
                <RotateCcw size={22} className="text-green-500 dark:text-green-400" /> Loop Traversal Simulator
            </h3>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                {/* Code View */}
                <div className="bg-card p-5 rounded-xl font-mono text-sm border border-border relative shadow-inner">
                    <div className="absolute top-0 right-0 p-2 text-xs text-muted-foreground font-bold bg-muted rounded-bl">C CODE</div>

                    <div className={`absolute left-0 w-1 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] transition-all duration-300 rounded-r ${currentIdx === -1 ? 'top-[4rem] h-5 opacity-0' : 'opacity-100 h-6'
                        }`} style={{ top: `${86 + (currentIdx >= 0 ? 28 : 0)}px` }}></div>

                    <div className="space-y-1.5 leading-relaxed">
                        <div className="text-muted-foreground italic">// 1. Initialize Sum</div>
                        <div>
                            <span className="text-pink-500 dark:text-pink-400">int</span> sum = <span className="text-orange-500 dark:text-orange-400">0</span>;
                        </div>
                        <div className="h-2"></div>
                        <div className="text-muted-foreground italic">// 2. Iterate through array</div>
                        <div className="text-foreground">
                            <span className="text-purple-500 dark:text-purple-400">for</span>(<span className="text-pink-500 dark:text-pink-400">int</span> i=0; i&lt;<span className="text-orange-500 dark:text-orange-400">5</span>; i++) {'{'}
                        </div>
                        <div className={`pl-4 py-0.5 transition-colors rounded ${currentIdx >= 0 ? 'bg-green-100 dark:bg-green-900/20' : ''}`}>
                            sum += arr[i]; <span className="text-muted-foreground text-xs">// Add {currentIdx >= 0 ? arr[currentIdx] : '...'}</span>
                        </div>
                        <div className="text-foreground">{'}'}</div>
                    </div>
                </div>

                {/* Visual View */}
                <div className="flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-muted p-4 rounded-xl border border-border">
                            <div className="text-sm text-muted-foreground font-medium">
                                Current Index <span className="font-mono text-yellow-600 dark:text-yellow-400 ml-2 bg-yellow-400/10 px-2 py-0.5 rounded">i = {currentIdx === -1 ? '?' : currentIdx}</span>
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">
                                Total Sum <span className="font-mono text-green-600 dark:text-green-400 ml-2 text-xl font-bold bg-green-400/10 px-3 py-0.5 rounded transition-all">{sum}</span>
                            </div>
                        </div>

                        <div className="relative pt-6">
                            <div className="flex gap-2 h-20">
                                {arr.map((val, i) => (
                                    <div key={i} className={`flex-1 rounded-lg border-2 flex flex-col items-center justify-center font-bold text-lg transition-all duration-500 relative ${i === currentIdx
                                        ? 'bg-green-600 border-green-400 text-white -translate-y-2 shadow-[0_10px_20px_-5px_rgba(22,163,74,0.5)] z-10'
                                        : i < currentIdx
                                            ? 'bg-muted border-green-900/30 text-muted-foreground'
                                            : 'bg-card/80 border-border text-muted-foreground'
                                        }`}>
                                        {i === currentIdx && (
                                            <div className="absolute -top-8 text-xs font-bold text-green-500 dark:text-green-400 animate-bounce">
                                                Accessing
                                            </div>
                                        )}
                                        <span>{val}</span>
                                        <span className={`text-[9px] font-mono absolute bottom-1 ${i === currentIdx ? 'text-green-200' : 'text-slate-500'}`}>{i}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={runLoop}
                        disabled={isRunning}
                        className="mt-8 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-900/20 active:scale-[0.98]"
                    >
                        {isRunning ? <Sparkles className="animate-spin" size={18} /> : <Play size={18} fill="currentColor" />}
                        {isRunning ? 'Simulating Loop...' : 'Run Visualization'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---

const Lecture1Page = () => {
    // Explanations
    const explanationStatic = `1. **int**: Data type. Stores integers.
2. **scores[5]**: Array name and FIXED size (5).
3. **{...}**: Initializer list. Compiler assigns these values to indices 0–4 respectively.
4. **Safety**: If you provide *more* than 5 values here, you get a compile error.`;

    const explanationImplicit = `1. **Empty []**: Notice we didn't specify a number!
2. **Compiler Logic**: The compiler counts the items in {}.
3. **Result**: It sees 3 items (100, 200, 300), so it automatically sets the size to 3.
4. **Use Case**: Great when you have a known dataset and don't want to manually count.`;

    const explanationPartial = `1. **Size [5]**: We asked for 5 slots.
2. **Values {1, 2}**: We only gave 2 values.
3. **The 'Zeroing' Rule**: Any uninitialized slots in a partially initialized array are set to 0.
4. **Final Array**: [1, 2, 0, 0, 0].
5. **Tip**: 'int arr[5] = {0}' sets ALL to zero.`;

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-purple-500/30 pb-20">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12 transition-all">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <img src="/cunits/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-foreground text-sm md:text-base leading-tight">Introduction to Arrays</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Unit 4 • Lecture 1</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
                    Mastering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">Arrays</span> & <br />
                    Contiguous Memory
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-light">
                    Stop managing hundreds of variables. Learn how to store, access, and manipulate massive datasets using a single, efficient data structure.
                </p>
            </section>

            {/* SECTION 1: WHY ARRAYS? */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
                <div className="bg-gradient-to-br from-card via-card to-muted p-8 md:p-10 rounded-2xl border border-border shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                            <BookOpen size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Why Do We Need Arrays?</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                Imagine you are building a gradebook app for a class of 500 students.
                                Without arrays, you would need to declare 500 separate variables:
                            </p>
                            <div className="bg-card p-4 rounded-lg border border-red-500/30 opacity-70">
                                <code className="text-red-500 dark:text-red-300 block text-xs md:text-sm font-mono leading-7">
                                    int grade1 = 90;<br />
                                    int grade2 = 85;<br />
                                    int grade3 = 92;<br />
                                    ...<br />
                                    int grade500 = 88; <span className="text-muted-foreground ml-2">// Nightmare to manage!</span>
                                </code>
                            </div>
                            <p className="text-muted-foreground">
                                This is messy, error-prone, and impossible to loop through.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-foreground font-bold flex items-center gap-2">
                                <CheckCircle className="text-green-500" size={20} /> The Array Solution
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                An array allows you to create <strong>one single variable</strong> that holds all 500 grades under one name. You access them by number (index).
                            </p>
                            <div className="bg-card p-5 rounded-lg border border-green-500/30 shadow-[0_0_15px_rgba(22,163,74,0.1)]">
                                <code className="text-green-600 dark:text-green-300 block text-sm font-mono mb-2">int grades[500];</code>
                                <p className="text-muted-foreground text-xs mt-2">
                                    Now you can use a loop to process all 500 students in 3 lines of code.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-muted p-3 rounded-lg border border-border">
                                    <h4 className="font-bold text-foreground text-sm mb-1">Efficiency</h4>
                                    <p className="text-xs text-muted-foreground">Group related data together.</p>
                                </div>
                                <div className="bg-muted p-3 rounded-lg border border-border">
                                    <h4 className="font-bold text-foreground text-sm mb-1">Random Access</h4>
                                    <p className="text-xs text-muted-foreground">Get 100th item instantly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: STORAGE VISUALIZATION */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 p-2.5 rounded-lg border border-orange-500/20"><Layers size={22} /></span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Visualizing Memory</h2>
                </div>
                <p className="text-muted-foreground mb-8 max-w-3xl">
                    The defining feature of an array is <strong>Contiguity</strong>. Unlike standard variables which are scattered across RAM, arrays reserve a solid block of neighboring addresses.
                </p>

                <StorageComparison />
            </section>

            {/* SECTION 3: INITIALIZATION METHODS */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
                <div className="flex items-center gap-3 mb-8">
                    <span className="bg-purple-100 dark:bg-purple-600/10 text-purple-600 dark:text-purple-400 p-2.5 rounded-lg border border-purple-600/20"><Terminal size={22} /></span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Initialization Methods</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Card 1: Static */}
                    <div className="col-span-1 border border-border rounded-xl bg-card p-5 hover:border-foreground/20 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-8 bg-blue-500 rounded-sm"></div>
                            <h3 className="font-bold text-lg text-foreground">1. Static</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 h-10">Specifying both size and values explicitly.</p>
                        <CodeBlock
                            title="Static Init"
                            code={`int arr[5] = {10, 20, 30, 40, 50};`}
                            explanation={explanationStatic}
                            layout="vertical"
                        />
                    </div>

                    {/* Card 2: Implicit */}
                    <div className="col-span-1 border border-border rounded-xl bg-card p-5 hover:border-foreground/20 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-8 bg-pink-500 rounded-sm"></div>
                            <h3 className="font-bold text-lg text-foreground">2. Implicit Size</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 h-10">Letting the compiler count the values for you.</p>
                        <CodeBlock
                            title="Implicit Init"
                            code={`int arr[] = {100, 200, 300};`}
                            explanation={explanationImplicit}
                            layout="vertical"
                        />
                    </div>

                    {/* Card 3: Partial */}
                    <div className="col-span-1 border border-border rounded-xl bg-card p-5 hover:border-foreground/20 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-8 bg-green-500 rounded-sm"></div>
                            <h3 className="font-bold text-lg text-foreground">3. Partial</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 h-10">Filling only the first few items.</p>
                        <CodeBlock
                            title="Partial Init"
                            code={`int arr[5] = {1, 2};`}
                            explanation={explanationPartial}
                            layout="vertical"
                        />
                    </div>
                </div>

                <div className="mt-6 flex items-start gap-4 bg-yellow-100 dark:bg-yellow-900/10 border border-yellow-500/30 p-4 rounded-lg">
                    <AlertTriangle className="text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" size={18} />
                    <div className="space-y-1">
                        <h4 className="font-bold text-yellow-700 dark:text-yellow-500 text-sm">Common Mistake</h4>
                        <p className="text-xs text-yellow-800/80 dark:text-yellow-200/60">
                            In C, arrays do NOT check bounds. If you try to access <code>arr[10]</code> in an array of size 5,
                            the program will not crash immediately—it will access random memory (garbage value) or corrupt data. Be careful!
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 4: MEMORY LAB */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-green-100 dark:bg-green-600/10 text-green-600 dark:text-green-400 p-2.5 rounded-lg border border-green-600/20"><Cpu size={22} /></span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Address Calculation Lab</h2>
                </div>
                <p className="text-muted-foreground mb-6 max-w-3xl">
                    Because arrays are contiguous, we can predict the exact address of any element without searching. Experiment with the base address and types below.
                </p>

                <MemoryLab />
            </section>

            {/* SECTION 5: TRAVERSAL */}
            <section className="px-6 md:px-12 max-w-6xl mx-auto mb-32">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-pink-100 dark:bg-pink-600/10 text-pink-600 dark:text-pink-400 p-2.5 rounded-lg border border-pink-600/20"><RotateCcw size={22} /></span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Loop Traversal</h2>
                </div>

                <TraversalVisualizer />
            </section>

            {/* FOOTER */}
            <footer className="border-t border-border bg-background py-12 px-6 text-center">
                <p className="text-muted-foreground text-sm">Unit 4 • Lecture 1 • Introduction to Arrays</p>
            </footer>

        </div>
    );
};

export default Lecture1Page;
