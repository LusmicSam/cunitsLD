"use client";

import React, { useState, useEffect } from 'react';
import {
    Database,
    Cpu,
    Globe,
    Clock,
    RotateCcw,
    Play,
    Layers,
    Box,
    Archive,
    Zap,
    Share2,
    FileCode,
    Lock,
    Trash2,
    CheckCircle,
    HelpCircle,
    AlertOctagon,
    ArrowRight,
    Table
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

const MemoryMap = () => {
    const [hovered, setHovered] = useState<string | null>(null);

    const zones = [
        { id: 'stack', name: 'Stack', desc: 'Temporary Storage. Stores "auto" variables. Grows & shrinks automatically.', color: 'bg-blue-600', icon: Layers },
        { id: 'heap', name: 'Heap', desc: 'Dynamic Storage. Used for malloc/calloc (Unit 5). You manage this.', color: 'bg-orange-600', icon: Box },
        { id: 'data', name: 'Data Segment', desc: 'Permanent Storage. Stores "static" and "global" variables. Lives forever.', color: 'bg-green-600', icon: Database },
        { id: 'code', name: 'Code Segment', desc: 'Read-Only. Stores your compiled instructions (binary code).', color: 'bg-slate-600', icon: FileCode },
    ];

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Layers size={20} className="text-purple-400" /> The Memory Map
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2 relative h-96 border-2 border-slate-700 rounded-xl p-4 bg-slate-950">
                    <div className="absolute -left-12 top-4 text-xs text-slate-500 font-mono">High Addr</div>
                    <div className="absolute -left-12 bottom-4 text-xs text-slate-500 font-mono">Low Addr</div>

                    {zones.map(z => (
                        <div
                            key={z.id}
                            className={`flex-1 rounded-lg flex items-center px-4 font-bold text-white transition-all cursor-pointer relative overflow-hidden group ${z.color} ${hovered === z.id ? 'ring-2 ring-white scale-105 z-10 shadow-xl' : 'opacity-80'}`}
                            onMouseEnter={() => setHovered(z.id)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <z.icon className="mr-3 opacity-50 group-hover:opacity-100 transition-opacity" size={20} />
                            <span>{z.name}</span>
                            {hovered === z.id && <ArrowRight className="ml-auto animate-pulse" size={16} />}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col justify-center h-96">
                    {hovered ? (
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-600 animate-in fade-in slide-in-from-left-4 shadow-2xl">
                            <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                {React.createElement(zones.find(z => z.id === hovered)?.icon || Box, { size: 24 })}
                                {zones.find(z => z.id === hovered)?.name}
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed border-t border-slate-700 pt-3">
                                {zones.find(z => z.id === hovered)?.desc}
                            </p>
                        </div>
                    ) : (
                        <div className="text-center text-slate-600 border-2 border-dashed border-slate-800 rounded-xl p-8">
                            <Database size={48} className="mx-auto mb-4 opacity-30" />
                            <p className="text-sm">Hover over a memory zone on the left to see what lives there.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StaticVsAuto = () => {
    const [autoVal, setAutoVal] = useState(0);
    const [staticVal, setStaticVal] = useState(0);
    const [calls, setCalls] = useState(0);
    const [step, setStep] = useState(0); // 0: Idle, 1: Create, 2: Increment, 3: Destroy
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setStep(prev => {
                    if (prev >= 3) {
                        setIsPlaying(false);
                        setCalls(c => c + 1);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 2000); // 2 seconds per step (Slower)
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    useEffect(() => {
        if (step === 1) {
            setAutoVal(0); // Auto recreated (reset)
            // Static persists (no reset)
        }
        if (step === 2) {
            setAutoVal(v => v + 1);
            setStaticVal(v => v + 1);
        }
    }, [step]);

    const reset = () => {
        setAutoVal(0);
        setStaticVal(0);
        setCalls(0);
        setStep(0);
        setIsPlaying(false);
    };

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Clock size={20} className="text-orange-400" /> Lifetime Battle: Auto vs Static
            </h3>

            <div className="flex justify-between items-center mb-8 bg-slate-900 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsPlaying(true)}
                        disabled={isPlaying}
                        className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Play size={16} fill="currentColor" /> Call Function
                    </button>
                    <div className="text-xs text-slate-400 font-bold uppercase border border-slate-700 px-3 py-1 rounded">
                        Calls: <span className="text-white">{calls}</span>
                    </div>
                </div>
                <button onClick={reset} className="text-slate-500 hover:text-white flex gap-1 items-center text-xs">
                    <RotateCcw size={14} /> Reset
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Auto Box */}
                <div className={`p-4 rounded-xl border-2 transition-all duration-500 relative overflow-hidden ${step === 3 ? 'border-red-500/50 bg-red-900/10' : 'border-slate-800 bg-slate-900'}`}>
                    <div className="flex justify-between mb-4 border-b border-slate-700 pb-2">
                        <span className="text-blue-400 font-bold font-mono">auto int i = 0;</span>
                        <span className="text-[10px] bg-blue-900/30 text-blue-300 px-2 py-1 rounded flex items-center gap-1"><Layers size={10} /> Stack</span>
                    </div>

                    <div className="h-32 flex flex-col items-center justify-center relative">
                        {step === 0 && <span className="text-slate-600 italic">Waiting...</span>}
                        {step === 1 && <span className="text-blue-400 animate-in zoom-in">Created (Reset to 0)</span>}
                        {step === 2 && <span className="text-4xl font-black text-white animate-bounce">{autoVal}</span>}
                        {step === 3 && (
                            <div className="flex flex-col items-center text-red-400 animate-pulse">
                                <Trash2 size={32} />
                                <span className="font-bold mt-2">DESTROYED</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Static Box */}
                <div className="p-4 rounded-xl border-2 border-slate-800 bg-slate-900 relative">
                    <div className="flex justify-between mb-4 border-b border-slate-700 pb-2">
                        <span className="text-green-400 font-bold font-mono">static int s = 0;</span>
                        <span className="text-[10px] bg-green-900/30 text-green-300 px-2 py-1 rounded flex items-center gap-1"><Database size={10} /> Data Seg</span>
                    </div>

                    <div className="h-32 flex flex-col items-center justify-center">
                        {step === 0 && <span className="text-slate-600 italic">Persisting...</span>}
                        {step === 1 && <span className="text-green-400">Retains Value {staticVal}</span>}
                        {step === 2 && <span className="text-4xl font-black text-white animate-bounce">{staticVal}</span>}
                        {step === 3 && <span className="text-green-400">Persists (Does not die)</span>}
                    </div>
                </div>
            </div>

            <div className="mt-4 text-center text-xs text-slate-500">
                Step {step}/3: {step === 0 ? "Idle" : step === 1 ? "Function Entry" : step === 2 ? "Execution (++)" : "Function Exit"}
            </div>
        </div>
    );
};

const RegisterRace = () => {
    const [winner, setWinner] = useState<string | null>(null);
    const [racing, setRacing] = useState(false);

    const startRace = () => {
        setRacing(true);
        setWinner(null);
        setTimeout(() => {
            setWinner('register');
            setRacing(false);
        }, 2500); // 2.5 seconds race
    };

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Zap size={20} className="text-yellow-400" /> The Register Speed Test
            </h3>

            <p className="text-sm text-slate-400 mb-6">
                <code>register</code> hints to the compiler to keep the variable in the CPU itself, avoiding slow RAM access.
            </p>

            <div className="relative bg-slate-900 rounded-xl p-6 border border-slate-800 mb-6">
                {/* Track 1: RAM */}
                <div className="mb-8 relative">
                    <div className="flex justify-between text-xs text-slate-500 mb-1 font-bold">
                        <span>RAM (Auto Variable)</span>
                        <span>Speed: Standard</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full relative overflow-hidden">
                        <div
                            className={`absolute top-0 bottom-0 left-0 w-8 bg-blue-600 rounded-full transition-all ease-linear ${racing ? 'left-[80%] duration-[2500ms]' : 'left-0 duration-500'}`}
                        ></div>
                    </div>
                </div>

                {/* Track 2: CPU */}
                <div className="relative">
                    <div className="flex justify-between text-xs text-slate-500 mb-1 font-bold">
                        <span>CPU Register</span>
                        <span className="text-yellow-500">Speed: Ultra Fast</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full relative overflow-hidden">
                        <div
                            className={`absolute top-0 bottom-0 left-0 w-8 bg-yellow-500 rounded-full transition-all ease-linear ${racing ? 'left-[100%] duration-[1500ms]' : 'left-0 duration-500'}`}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                {!racing && !winner && (
                    <button onClick={startRace} className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-500 shadow-lg shadow-green-900/20 active:scale-95 transition-transform">
                        Start Access Test
                    </button>
                )}
                {winner && (
                    <div className="animate-in zoom-in p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg inline-block">
                        <h4 className="text-yellow-400 font-bold text-lg flex items-center gap-2 justify-center">
                            <Zap size={24} fill="currentColor" /> Register Wins!
                        </h4>
                        <p className="text-xs text-yellow-200 mt-1">Direct CPU access is always faster than fetching from RAM.</p>
                        <button onClick={() => setWinner(null)} className="mt-2 text-xs underline opacity-70 hover:opacity-100">Try Again</button>
                    </div>
                )}
            </div>

            <div className="mt-6 p-4 bg-red-900/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                <Lock size={18} className="text-red-400 shrink-0 mt-0.5" />
                <div>
                    <strong className="text-red-300 text-sm block mb-1">Crucial Limitation</strong>
                    <p className="text-xs text-slate-400">
                        Because register variables are stored inside the CPU, they do not have a RAM memory address.
                        Therefore, you cannot use the address-of operator <code>&</code> (e.g., <code>&x</code>) on them.
                    </p>
                </div>
            </div>
        </div>
    );
};

const ExternHub = () => {
    const [val, setVal] = useState(100);

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Globe size={20} className="text-blue-400" /> Extern: Global Sharing
            </h3>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center relative">
                {/* File 1 */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 w-full md:w-1/3 text-center z-10 relative">
                    <div className="absolute -top-3 -left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">DEFINITION</div>
                    <div className="flex items-center justify-center gap-2 text-slate-400 mb-4 border-b border-slate-700 pb-2">
                        <FileCode size={16} /> file1.c
                    </div>
                    <div className="text-sm font-mono text-green-400 mb-2 p-2 bg-black rounded">int count = {val};</div>
                    <p className="text-[10px] text-slate-500">Allocates Memory (4 bytes)</p>
                </div>

                {/* Connection */}
                <div className="h-16 w-2 md:h-2 md:w-32 bg-slate-700 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f172a] px-3 py-1 text-slate-400 text-xs font-bold border border-slate-700 rounded-full flex items-center gap-1 shadow-xl">
                        <Share2 size={12} /> Linker
                    </div>
                </div>

                {/* File 2 */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 w-full md:w-1/3 text-center z-10 relative">
                    <div className="absolute -top-3 -right-3 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded">DECLARATION</div>
                    <div className="flex items-center justify-center gap-2 text-slate-400 mb-4 border-b border-slate-700 pb-2">
                        <FileCode size={16} /> file2.c
                    </div>
                    <div className="text-sm font-mono text-purple-400 mb-4 p-2 bg-black rounded">extern int count;</div>
                    <button
                        onClick={() => setVal(v => v + 10)}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-xs font-bold transition-all active:scale-95"
                    >
                        count += 10;
                    </button>
                    <p className="text-[10px] text-slate-500 mt-2">Modify via reference</p>
                </div>
            </div>

            <div className="mt-8 text-center bg-blue-900/10 p-4 rounded-xl border border-blue-500/20">
                <p className="text-sm text-blue-200">
                    <strong>Observation:</strong> Modifying <code>count</code> in <strong>file2.c</strong> actually updates the memory in <strong>file1.c</strong>.
                    <code>extern</code> does not create a new variable; it points to the one already defined elsewhere.
                </p>
            </div>
        </div>
    );
};

const DefaultValueLab = () => {
    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <HelpCircle size={20} className="text-pink-400" /> Default Value Inspector
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
                {/* Auto */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-center group hover:border-red-500 transition-colors">
                    <div className="text-xs text-slate-500 font-bold uppercase mb-2">auto int x;</div>
                    <div className="h-16 flex items-center justify-center text-2xl font-mono text-red-400 font-bold">
                        <span className="animate-pulse">?1@9#</span>
                    </div>
                    <div className="text-[10px] text-red-300 mt-2 bg-red-900/20 py-1 rounded">GARBAGE VALUE</div>
                </div>

                {/* Static */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-center group hover:border-green-500 transition-colors">
                    <div className="text-xs text-slate-500 font-bold uppercase mb-2">static int y;</div>
                    <div className="h-16 flex items-center justify-center text-3xl font-mono text-green-400 font-bold">
                        0
                    </div>
                    <div className="text-[10px] text-green-300 mt-2 bg-green-900/20 py-1 rounded">ZERO (Guaranteed)</div>
                </div>

                {/* Global */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-center group hover:border-green-500 transition-colors">
                    <div className="text-xs text-slate-500 font-bold uppercase mb-2">int z; (Global)</div>
                    <div className="h-16 flex items-center justify-center text-3xl font-mono text-green-400 font-bold">
                        0
                    </div>
                    <div className="text-[10px] text-green-300 mt-2 bg-green-900/20 py-1 rounded">ZERO (Guaranteed)</div>
                </div>
            </div>
        </div>
    );
};

const SummaryTable = () => {
    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Table size={20} className="text-purple-400" /> Summary
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-900 text-xs uppercase font-bold text-slate-400">
                        <tr>
                            <th className="px-4 py-3">Class</th>
                            <th className="px-4 py-3">Storage</th>
                            <th className="px-4 py-3">Initial Value</th>
                            <th className="px-4 py-3">Scope</th>
                            <th className="px-4 py-3">Lifetime</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        <tr className="hover:bg-slate-800/50">
                            <td className="px-4 py-3 font-mono text-blue-400">auto</td>
                            <td className="px-4 py-3">Stack</td>
                            <td className="px-4 py-3 text-red-400">Garbage</td>
                            <td className="px-4 py-3">Local (Block)</td>
                            <td className="px-4 py-3">End of Block</td>
                        </tr>
                        <tr className="hover:bg-slate-800/50">
                            <td className="px-4 py-3 font-mono text-yellow-400">register</td>
                            <td className="px-4 py-3">CPU Register</td>
                            <td className="px-4 py-3 text-red-400">Garbage</td>
                            <td className="px-4 py-3">Local (Block)</td>
                            <td className="px-4 py-3">End of Block</td>
                        </tr>
                        <tr className="hover:bg-slate-800/50">
                            <td className="px-4 py-3 font-mono text-green-400">static</td>
                            <td className="px-4 py-3">Data Segment</td>
                            <td className="px-4 py-3 text-green-400">Zero</td>
                            <td className="px-4 py-3">Local (Block)</td>
                            <td className="px-4 py-3">End of Program</td>
                        </tr>
                        <tr className="hover:bg-slate-800/50">
                            <td className="px-4 py-3 font-mono text-purple-400">extern</td>
                            <td className="px-4 py-3">Data Segment</td>
                            <td className="px-4 py-3 text-green-400">Zero</td>
                            <td className="px-4 py-3">Global (All files)</td>
                            <td className="px-4 py-3">End of Program</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture3Page() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-32">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-white text-sm leading-tight">Storage Classes</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 3 • Lecture 3</p>
                    </div>
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-purple-900/20 border border-purple-500/30 text-purple-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Archive size={14} /> Memory Management
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-white">Life & Death</span> of Data
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Every variable has a home and a lifespan. Storage classes define <strong>Where</strong> it is stored, <strong>How long</strong> it lives, and <strong>Who</strong> can see it.
                    </p>
                </div>

                {/* SECTION 1: MEMORY LAYOUT */}
                <section>
                    <SectionHeader title="Where does data live?" icon={Database} color="blue" />
                    <p className="text-slate-400 mb-8">
                        Before diving into keywords, we must understand the physical layout of a C program's memory.
                    </p>
                    <MemoryMap />
                </section>

                {/* SECTION 2: AUTO VS STATIC */}
                <section>
                    <SectionHeader title="Local Lifelines: Auto vs Static" icon={Clock} color="orange" />

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <TheoryCard title="Auto (Sticky Note)" variant="blue">
                            <p className="mb-2 text-sm text-slate-300">Think of <code>auto</code> as a sticky note you write for a specific task and throw away immediately after.</p>
                            <ul className="list-disc pl-4 space-y-1 text-xs text-slate-400">
                                <li><strong>Storage:</strong> Stack (Temporary)</li>
                                <li><strong>Lifetime:</strong> Function Start &rarr; Function End</li>
                                <li><strong>Default:</strong> Garbage Value</li>
                            </ul>
                        </TheoryCard>
                        <TheoryCard title="Static (Logbook)" variant="green">
                            <p className="mb-2 text-sm text-slate-300">Think of <code>static</code> as a permanent logbook. You write in it, close it, and when you open it again, your previous notes are still there.</p>
                            <ul className="list-disc pl-4 space-y-1 text-xs text-slate-400">
                                <li><strong>Storage:</strong> Data Segment (Permanent)</li>
                                <li><strong>Lifetime:</strong> Program Start &rarr; Program End</li>
                                <li><strong>Default:</strong> Zero</li>
                            </ul>
                        </TheoryCard>
                    </div>

                    <StaticVsAuto />
                </section>

                {/* SECTION 3: DEFAULT VALUES */}
                <section>
                    <SectionHeader title="The Garbage Trap" icon={AlertOctagon} color="pink" />
                    <p className="text-slate-400 mb-8">
                        What happens if you don't give a variable a value? It depends on its storage class.
                    </p>
                    <DefaultValueLab />
                </section>

                {/* SECTION 4: REGISTER */}
                <section>
                    <SectionHeader title="Need for Speed: Register" icon={Cpu} color="yellow" />
                    <p className="text-slate-400 mb-8">
                        The <code>register</code> keyword asks the compiler to store the variable directly in the CPU, bypassing RAM. Use this for loop counters that run millions of times.
                    </p>
                    <RegisterRace />
                </section>

                {/* SECTION 5: EXTERN */}
                <section>
                    <SectionHeader title="Global Reach: Extern" icon={Globe} color="purple" />
                    <TheoryCard title="Connecting Files" variant="purple">
                        <p className="mb-2">
                            <code>extern</code> is like a "See Reference" note. It tells the compiler: "This variable is defined in another file, just link to it."
                        </p>
                        <ul className="list-disc pl-4 text-sm text-slate-300">
                            <li>Used for global variables shared between multiple <code>.c</code> files.</li>
                            <li>Does <strong>not</strong> allocate new memory; it just points to existing memory.</li>
                        </ul>
                    </TheoryCard>
                    <ExternHub />
                </section>

                {/* SUMMARY */}
                <section>
                    <SummaryTable />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-slate-800 bg-[#020617] py-12 text-center text-slate-600 text-sm">
                <p>C Programming Course • Unit 3 • Lecture 3</p>
            </footer>
        </div>
    );
}
