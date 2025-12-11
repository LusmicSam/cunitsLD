"use client";

import React, { useState, useEffect } from 'react';
import {
    Database,
    Layers,
    Trash2,
    AlertTriangle,
    Cpu,
    Box,
    ArrowDown,
    RefreshCw,
    Ban,
    Archive,
    AlertOctagon,
    CheckCircle,
    XCircle,
    Hammer
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const SectionHeader = ({ title, icon: Icon, color = "blue" }: { title: string, icon: any, color?: string }) => (
    <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
        <span className={`bg-${color}-600/20 text-${color}-400 p-2 rounded-lg`}>
            <Icon size={24} />
        </span>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
);

const CodeBlock = ({ code, title }: { code: string, title?: string }) => (
    <div className="bg-[#0d1117] rounded-lg overflow-hidden border border-slate-700 my-4 shadow-xl font-mono text-sm w-full">
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-700">
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-xs text-slate-500 uppercase">{title || "C Snippet"}</span>
        </div>
        <div className="p-4 text-slate-300 overflow-x-auto whitespace-pre leading-relaxed">
            {code}
        </div>
    </div>
);

const TheoryCard = ({ title, children, variant = 'blue' }: { title: string, children: React.ReactNode, variant?: string }) => {
    const colors: Record<string, string> = {
        blue: 'border-blue-500 bg-blue-900/10',
        purple: 'border-purple-500 bg-purple-900/10',
        orange: 'border-orange-500 bg-orange-900/10',
        red: 'border-red-500 bg-red-900/10',
        green: 'border-green-500 bg-green-900/10',
        yellow: 'border-yellow-500 bg-yellow-900/10'
    };

    return (
        <div className={`border-l-4 ${colors[variant]} rounded-r-lg p-6 my-6 transition-all hover:bg-opacity-20 backdrop-blur-sm`}>
            <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                {title}
            </h4>
            <div className="text-slate-300 text-sm leading-relaxed space-y-2">
                {children}
            </div>
        </div>
    );
};

// --- INTERACTIVE COMPONENTS ---

const StackVsHeap = () => {
    const [stackItems, setStackItems] = useState<string[]>([]);
    const [heapItems, setHeapItems] = useState<string[]>([]);
    const [step, setStep] = useState(0);

    // Simulation Script
    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 6);
        }, 2500); // 2.5s per step for readability
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        switch (step) {
            case 0: // Start
                setStackItems(["main()"]);
                setHeapItems([]);
                break;
            case 1: // Call Func
                setStackItems(["main()", "func()"]);
                break;
            case 2: // Malloc in Func
                setStackItems(["main()", "func()", "ptr = 0x500"]);
                setHeapItems(["Data (0x500)"]);
                break;
            case 3: // Func Returns (Stack pops, Heap stays)
                setStackItems(["main()"]);
                // Heap item persists!
                break;
            case 4: // Free (Heap clears)
                setHeapItems([]);
                break;
            case 5: // End
                setStackItems([]);
                break;
        }
    }, [step]);

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Layers size={20} className="text-blue-400" /> Architecture: The Two Regions
            </h3>

            <div className="grid md:grid-cols-2 gap-8 h-80">

                {/* Stack Visual */}
                <div className="border-2 border-blue-900/50 bg-blue-900/10 rounded-xl p-4 flex flex-col justify-end relative overflow-hidden">
                    <div className="absolute top-2 left-2 text-xs font-bold text-blue-400 uppercase flex items-center gap-2">
                        <Cpu size={14} /> Stack (Auto)
                    </div>
                    <div className="space-y-2">
                        {stackItems.map((item, i) => (
                            <div key={i} className="bg-blue-600 text-white p-3 rounded text-center font-mono text-sm font-bold shadow-lg animate-in slide-in-from-bottom-4 fade-in">
                                {item}
                            </div>
                        ))}
                    </div>
                    {stackItems.length === 0 && <div className="mt-auto text-center text-blue-500/50 text-sm">Empty</div>}
                </div>

                {/* Heap Visual */}
                <div className="border-2 border-orange-900/50 bg-orange-900/10 rounded-xl p-4 relative overflow-hidden">
                    <div className="absolute top-2 left-2 text-xs font-bold text-orange-400 uppercase flex items-center gap-2">
                        <Database size={14} /> Heap (Manual)
                    </div>
                    <div className="h-full flex items-center justify-center">
                        {heapItems.map((item, i) => (
                            <div key={i} className="bg-orange-600 text-white w-32 h-32 rounded-xl flex flex-col items-center justify-center font-bold shadow-2xl animate-in zoom-in fade-in">
                                <Box size={32} className="mb-2 text-orange-200" />
                                <span className="text-xs">{item}</span>
                                <span className="text-[10px] bg-black/20 px-2 rounded mt-1">Persists!</span>
                            </div>
                        ))}
                        {heapItems.length === 0 && (
                            <div className="text-orange-500/50 text-sm italic">
                                Waiting for malloc...
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center">
                <span className="bg-slate-900 border border-slate-700 text-slate-300 px-4 py-2 rounded-full text-xs font-mono">
                    {step === 0 && "Step 1: Program Start"}
                    {step === 1 && "Step 2: Function Call (Stack Grows)"}
                    {step === 2 && "Step 3: malloc() creates Manual Memory"}
                    {step === 3 && "Step 4: Function Returns (Stack Clears, Heap Stays!)"}
                    {step === 4 && "Step 5: free() manually destroys Heap Block"}
                    {step === 5 && "Step 6: Program Exit"}
                </span>
            </div>
        </div>
    );
};

const MallocLab = () => {
    const [memory, setMemory] = useState<{ id: number, size: number }[]>([]);
    const [sizeInput, setSizeInput] = useState(4);
    const [nextId, setNextId] = useState(1);

    const allocate = () => {
        if (memory.length >= 8) return; // Limit for visual
        setMemory([...memory, { id: nextId, size: sizeInput }]);
        setNextId(nextId + 1);
    };

    const deallocate = (id: number) => {
        setMemory(memory.filter(m => m.id !== id));
    };

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Hammer size={20} className="text-orange-400" /> The Allocation Engine (Malloc)
            </h3>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Controls */}
                <div className="w-full md:w-1/3 space-y-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Request Size (Bytes)</label>
                        <div className="flex gap-2">
                            {[4, 8, 16, 32].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setSizeInput(s)}
                                    className={`flex-1 py-2 rounded font-bold text-xs transition-all ${sizeInput === s ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                >
                                    {s}B
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={allocate}
                        disabled={memory.length >= 8}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
                    >
                        <Box size={16} /> Call malloc({sizeInput})
                    </button>

                    <div className="bg-black/30 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-400">
                        <p className="mb-1 text-green-400">// Returns void* pointer</p>
                        <p>1. OS finds {sizeInput} contiguous bytes.</p>
                        <p>2. Reserves them in Heap.</p>
                        <p>3. Returns address of 1st byte.</p>
                    </div>
                </div>

                {/* Heap Grid */}
                <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 p-4 relative min-h-[200px]">
                    <span className="absolute top-2 right-2 text-[10px] text-slate-600 font-bold uppercase">Heap Segment (RAM)</span>

                    <div className="flex flex-wrap gap-4 mt-6 content-start">
                        {memory.map(block => (
                            <div key={block.id} className="relative group animate-in zoom-in duration-300">
                                <div
                                    className="bg-orange-900/40 border-2 border-orange-500/50 rounded-lg flex items-center justify-center text-orange-300 font-mono font-bold shadow-lg transition-all"
                                    style={{ width: `${Math.max(60, block.size * 5)}px`, height: '60px' }}
                                >
                                    {block.size}B
                                </div>
                                {/* Pointer Tag */}
                                <div className="absolute -top-3 left-2 bg-blue-600 text-white text-[9px] px-2 rounded-full font-bold shadow-sm">
                                    ptr{block.id}
                                </div>
                                {/* Free Button */}
                                <button
                                    onClick={() => deallocate(block.id)}
                                    className="absolute -bottom-3 right-0 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110 hover:rotate-12"
                                    title="free(p)"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        ))}
                        {memory.length === 0 && (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 opacity-50 mt-10">
                                <Archive size={48} className="mb-2" />
                                <span className="text-sm">Heap Empty</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const LeakDetector = () => {
    const [usage, setUsage] = useState(0);
    const [autoFree, setAutoFree] = useState(false);
    const [crashed, setCrashed] = useState(false);

    const allocate = () => {
        if (crashed) return;
        setUsage(prev => {
            const next = prev + 10;
            if (next >= 100) {
                setCrashed(true);
                return 100;
            }
            return next;
        });

        if (autoFree) {
            setTimeout(() => {
                setUsage(prev => Math.max(0, prev - 10));
            }, 500);
        }
    };

    const reset = () => {
        setUsage(0);
        setCrashed(false);
    };

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <AlertTriangle size={20} className="text-red-400" /> Consequence 1: Memory Leaks
            </h3>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <TheoryCard title="The Problem" variant="red">
                        <p className="text-sm text-slate-300">
                            Unlike the Stack, Heap memory is <strong>NOT</strong> automatically reclaimed.
                            If you <code>malloc()</code> inside a loop but forget <code>free()</code>, your RAM usage climbs until the OS kills the program.
                        </p>
                    </TheoryCard>

                    <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <button
                            onClick={() => setAutoFree(!autoFree)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors ${autoFree ? 'bg-green-500' : 'bg-slate-600'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${autoFree ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white uppercase">Auto-Free Mode</span>
                            <span className={`text-[10px] ${autoFree ? 'text-green-400' : 'text-slate-400'}`}>
                                {autoFree ? "Safe: free() calls match malloc()" : "Danger: Missing free() calls"}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={allocate}
                            disabled={crashed}
                            className={`flex-1 py-3 rounded-xl font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-2 ${crashed ? 'bg-slate-700 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-500'}`}
                        >
                            <RefreshCw size={16} className={crashed ? "" : "animate-spin-slow"} /> Run Allocation Loop
                        </button>
                        <button
                            onClick={reset}
                            className="px-4 bg-slate-800 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="bg-black p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-end h-64 relative overflow-hidden">
                    {/* Water Fill */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${crashed ? 'bg-red-600' : autoFree ? 'bg-green-600' : 'bg-orange-500'}`}
                        style={{ height: `${usage}%` }}
                    >
                        <div className="absolute top-0 left-0 right-0 h-2 bg-white/20"></div>
                    </div>

                    {/* Labels */}
                    <div className="z-10 text-center mix-blend-difference">
                        <div className="text-4xl font-black text-white">{usage}%</div>
                        <div className="text-xs font-bold text-white/70 uppercase">RAM Usage</div>
                    </div>

                    {crashed && (
                        <div className="absolute inset-0 bg-red-900/95 z-20 flex flex-col items-center justify-center animate-in zoom-in backdrop-blur-sm">
                            <Ban size={48} className="text-white mb-2" />
                            <h4 className="text-xl font-bold text-white">OUT OF MEMORY</h4>
                            <p className="text-white/80 text-xs">Process Terminated.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const DanglingZone = () => {
    const [step, setStep] = useState(0);

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <AlertOctagon size={20} className="text-yellow-400" /> Consequence 2: Dangling Pointers
            </h3>

            <div className="flex gap-4 justify-center mb-8">
                <button onClick={() => setStep(1)} className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>1. malloc()</button>
                <button onClick={() => setStep(2)} className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${step >= 2 ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-500'}`}>2. free()</button>
                <button onClick={() => setStep(3)} className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${step >= 3 ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-500'}`}>3. Access *ptr</button>
                <button onClick={() => setStep(0)} className="px-3 text-slate-500 hover:text-white"><RefreshCw size={14} /></button>
            </div>

            <div className="relative h-40 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
                {step >= 1 && (
                    <div className={`transition-all duration-500 flex flex-col items-center gap-2 ${step === 2 ? 'opacity-30 blur-sm grayscale' : ''}`}>
                        <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-black font-bold shadow-xl z-10">
                            Data
                        </div>
                        <div className="text-xs text-slate-400 font-mono">Addr: 0x999</div>
                    </div>
                )}

                <div className={`absolute left-1/4 top-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-500 ${step === 0 ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold z-20 border-4 border-slate-900 shadow-xl">
                        ptr
                    </div>
                    {step >= 1 && (
                        <svg className="absolute top-1/2 left-full w-32 h-10 pointer-events-none z-0" style={{ transform: 'translateY(-50%)' }}>
                            <line x1="0" y1="50%" x2="100%" y2="50%" stroke={step === 2 ? '#ef4444' : '#4ade80'} strokeWidth="4" strokeDasharray={step === 2 ? "4" : "0"} />
                        </svg>
                    )}
                </div>

                {step === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center z-30">
                        <div className="bg-orange-900/90 text-orange-200 px-6 py-3 rounded-xl font-bold backdrop-blur-md animate-in zoom-in border border-orange-500/50 shadow-xl">
                            <Trash2 className="mx-auto mb-1" size={20} />
                            Memory Freed!
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="absolute inset-0 bg-red-600/95 z-40 flex flex-col items-center justify-center animate-in fade-in">
                        <XCircle size={48} className="text-white mb-2 drop-shadow-lg" />
                        <h4 className="text-2xl font-black text-white drop-shadow-md">UNDEFINED BEHAVIOR</h4>
                        <p className="text-white text-xs mt-2 font-mono bg-black/20 px-2 py-1 rounded">Segmentation Fault (Core Dumped)</p>
                    </div>
                )}
            </div>

            <div className="mt-6 text-center text-xs text-slate-400">
                {step === 2 && "The pointer still holds address 0x999, but the house is gone."}
                {step === 3 && "Accessing 0x999 now crashes the program because you don't own it."}
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture4Page() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-32">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-white text-sm leading-tight">The Heap</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 5 • Lecture 4</p>
                    </div>
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-orange-900/20 border border-orange-500/30 text-orange-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Database size={14} /> Dynamic Memory
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                        Breaking the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-white">Limits</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        The Stack is fast but small and rigid. The Heap is vast and flexible.
                        Learn to manually allocate memory during runtime to build scalable programs.
                    </p>
                </div>

                {/* SECTION 1: STACK VS HEAP */}
                <section>
                    <SectionHeader title="Stack vs Heap" icon={Layers} color="blue" />
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <TheoryCard title="The Stack (Automatic)" variant="blue">
                            <ul className="list-disc pl-4 space-y-1 text-sm text-slate-300">
                                <li><strong>Size:</strong> Small (e.g., 1MB - 8MB).</li>
                                <li><strong>Management:</strong> Auto. Variables die when function returns.</li>
                                <li><strong>Access:</strong> Very Fast (LIFO structure).</li>
                            </ul>
                        </TheoryCard>
                        <TheoryCard title="The Heap (Dynamic)" variant="orange">
                            <ul className="list-disc pl-4 space-y-1 text-sm text-slate-300">
                                <li><strong>Size:</strong> Large (Gigabytes).</li>
                                <li><strong>Management:</strong> Manual. You MUST <code>free()</code> what you <code>malloc()</code>.</li>
                                <li><strong>Access:</strong> Slower (Random Access via pointers).</li>
                            </ul>
                        </TheoryCard>
                    </div>
                    <StackVsHeap />
                </section>

                {/* SECTION 2: MALLOC */}
                <section>
                    <SectionHeader title="Manual Allocation (malloc)" icon={Box} color="green" />
                    <p className="text-slate-400 mb-8">
                        <code>malloc(size)</code> asks the Operating System for a block of raw bytes in the Heap. It returns a <code>void*</code> pointer to the first byte.
                    </p>
                    <MallocLab />
                </section>

                {/* SECTION 3: MEMORY LEAKS */}
                <section>
                    <SectionHeader title="The Memory Leak" icon={Ban} color="red" />
                    <p className="text-slate-400 mb-8">
                        With great power comes great responsibility. If you lose the pointer to a heap block without freeing it, that memory is lost forever (until restart).
                    </p>
                    <LeakDetector />
                </section>

                {/* SECTION 4: DANGLING POINTERS */}
                <section>
                    <SectionHeader title="Dangling Pointers" icon={AlertOctagon} color="yellow" />
                    <TheoryCard title="Use After Free" variant="yellow">
                        <p className="text-sm text-slate-300">
                            When you <code>free(ptr)</code>, the memory is returned to the OS.
                            However, the variable <code>ptr</code> <strong>still holds the address</strong>.
                            Trying to access it is a critical error.
                            <br /><br />
                            <strong>Fix:</strong> Always set <code>ptr = NULL;</code> immediately after freeing.
                        </p>
                    </TheoryCard>
                    <DanglingZone />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-slate-800 bg-[#020617] py-12 text-center text-slate-600 text-sm">
                <p>C Programming Course • Unit 5 • Lecture 4</p>
            </footer>
        </div>
    );
}
