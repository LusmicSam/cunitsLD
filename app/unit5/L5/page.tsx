"use client";

import React, { useState, useEffect } from 'react';
import {
    Maximize,
    Minimize,
    Trash2,
    AlertTriangle,
    Box,
    ArrowRight,
    RefreshCw,
    Layers,
    List,
    CheckCircle,
    ShieldCheck,
    Copy,
    Info
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

const CallocVsMalloc = () => {
    const [method, setMethod] = useState<'malloc' | 'calloc'>('malloc');
    const [blocks, setBlocks] = useState<(string | number)[]>([]);

    const allocate = () => {
        // Generate random garbage for malloc, zeros for calloc
        const newBlocks = Array.from({ length: 5 }).map(() =>
            method === 'malloc' ? Math.floor(Math.random() * 999) - 500 : 0
        );
        setBlocks(newBlocks);
    };

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Layers size={20} className="text-blue-500" /> The Zero-Init Lab
            </h3>

            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => { setMethod('malloc'); setBlocks([]); }}
                    className={`px-4 py-2 rounded-full font-bold transition-all ${method === 'malloc' ? 'bg-orange-600 text-white' : 'bg-muted text-muted-foreground'}`}
                >
                    malloc(5 * sizeof(int))
                </button>
                <button
                    onClick={() => { setMethod('calloc'); setBlocks([]); }}
                    className={`px-4 py-2 rounded-full font-bold transition-all ${method === 'calloc' ? 'bg-green-600 text-white' : 'bg-muted text-muted-foreground'}`}
                >
                    calloc(5, sizeof(int))
                </button>
            </div>

            <div className="flex flex-col items-center gap-6">
                <button
                    onClick={allocate}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2"
                >
                    <Box size={16} /> Allocate Memory
                </button>

                <div className="flex gap-2 p-4 bg-muted rounded-xl border border-border min-h-[100px] items-center">
                    {blocks.length === 0 ? (
                        <span className="text-muted-foreground italic">Memory Empty</span>
                    ) : (
                        blocks.map((val, i) => (
                            <div key={i} className="flex flex-col items-center animate-in zoom-in">
                                <div className={`w-12 h-12 flex items-center justify-center font-mono font-bold text-lg rounded border-2 
                  ${val === 0 ? 'border-green-500 text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20' : 'border-red-500 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'}`}>
                                    {method === 'malloc' ? '?' : val}
                                </div>
                                <span className="text-[10px] text-muted-foreground mt-1">[{i}]</span>
                            </div>
                        ))
                    )}
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    {method === 'malloc'
                        ? "Malloc creates space but DOES NOT clear it. It contains random 'garbage' from previous use."
                        : "Calloc creates space AND initializes every byte to zero. Safer but slightly slower."}
                </div>
            </div>
        </div>
    );
};

const ReallocSim = () => {
    const [size, setSize] = useState(2);
    const [address, setAddress] = useState(1000);
    const [scenario, setScenario] = useState<'expand' | 'move'>('expand');
    const [message, setMessage] = useState("Initial block allocated at 1000.");

    const expand = () => {
        // Logic to simulate realloc behavior
        if (size >= 5) {
            setMessage("Max size reached for demo.");
            return;
        }

        if (scenario === 'expand') {
            setSize(s => s + 1);
            setMessage("Success! Expanded in place. Address unchanged.");
        } else {
            // Simulate move
            setAddress(2000);
            setSize(s => s + 1);
            setMessage("Not enough space! Copied data to new location (2000). Old block freed.");
        }
    };

    const reset = () => {
        setSize(2);
        setAddress(1000);
        setMessage("Reset to initial state.");
    };

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <RefreshCw size={20} className="text-purple-500" /> The Resizer (realloc)
            </h3>

            <div className="flex gap-4 mb-6 justify-center">
                <label className="flex items-center gap-2 cursor-pointer bg-muted p-2 rounded border border-border">
                    <input
                        type="radio" name="scen" checked={scenario === 'expand'} onChange={() => setScenario('expand')}
                        className="accent-purple-500"
                    />
                    <span className="text-sm text-muted-foreground">Scenario A: Space Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-muted p-2 rounded border border-border">
                    <input
                        type="radio" name="scen" checked={scenario === 'move'} onChange={() => setScenario('move')}
                        className="accent-purple-500"
                    />
                    <span className="text-sm text-muted-foreground">Scenario B: Blocked (Must Move)</span>
                </label>
            </div>

            <div className="relative h-32 bg-muted rounded-xl border border-border overflow-hidden mb-6 flex items-center px-4">
                {/* Memory Strip */}
                <div className="flex gap-1 w-full">
                    {/* Initial/Current Block */}
                    <div
                        className={`h-16 bg-purple-600 rounded flex items-center justify-center text-white font-bold transition-all duration-500 ${address === 2000 ? 'opacity-30' : ''}`}
                        style={{ width: `${size * 40}px`, marginLeft: address === 2000 ? '0px' : '0px' }}
                    >
                        {address === 1000 ? "DATA" : "FREED"}
                    </div>

                    {/* Obstacle for Scenario B */}
                    {scenario === 'move' && (
                        <div className="h-16 w-16 bg-red-100 dark:bg-red-900/50 border border-red-500/50 rounded flex items-center justify-center text-red-600 dark:text-red-400 text-xs font-bold">
                            BLOCK
                        </div>
                    )}

                    {/* New Location for Scenario B */}
                    {address === 2000 && (
                        <div
                            className="h-16 bg-green-600 rounded flex items-center justify-center text-white font-bold transition-all duration-500 ml-auto animate-in zoom-in"
                            style={{ width: `${size * 40}px` }}
                        >
                            DATA
                        </div>
                    )}
                </div>

                {/* Address Labels */}
                <div className="absolute bottom-2 left-4 text-[10px] text-muted-foreground font-mono">Addr: 1000</div>
                <div className="absolute bottom-2 right-4 text-[10px] text-muted-foreground font-mono">Addr: 2000</div>
            </div>

            <div className="text-center">
                <div className="mb-4 text-sm font-mono text-purple-600 dark:text-purple-300 bg-muted p-2 rounded inline-block">
                    ptr = realloc(ptr, {size + 1} * sizeof(int));
                </div>
                <div className="flex justify-center gap-4">
                    <button onClick={expand} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                        <Maximize size={16} /> Expand Array
                    </button>
                    <button onClick={reset} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg">
                        <RefreshCw size={16} />
                    </button>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">{message}</p>
            </div>
        </div>
    );
};

const DynamicArray = () => {
    const [data, setData] = useState<number[]>([10, 20]);
    const [capacity, setCapacity] = useState(2);
    const [highlight, setHighlight] = useState(false);

    const addElement = () => {
        if (data.length === capacity) {
            setHighlight(true);
            setTimeout(() => {
                setCapacity(c => c * 2);
                setHighlight(false);
            }, 1000);
        }
        setData([...data, Math.floor(Math.random() * 100)]);
    };

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <List size={20} className="text-green-500" /> Dynamic Array (Vector Logic)
            </h3>

            <div className="flex gap-8 mb-6">
                <div className="bg-muted p-3 rounded border border-border">
                    <span className="text-xs text-muted-foreground uppercase font-bold">Size (Count)</span>
                    <div className="text-2xl font-mono text-foreground">{data.length}</div>
                </div>
                <div className={`bg-muted p-3 rounded border transition-colors duration-500 ${highlight ? 'border-green-500 bg-green-100 dark:bg-green-900/20' : 'border-border'}`}>
                    <span className="text-xs text-muted-foreground uppercase font-bold">Capacity (Allocated)</span>
                    <div className={`text-2xl font-mono transition-transform ${highlight ? 'text-green-600 dark:text-green-400 scale-125' : 'text-foreground'}`}>{capacity}</div>
                </div>
            </div>

            <div className="flex gap-2 flex-wrap mb-6 p-4 bg-muted rounded-xl border border-border min-h-[80px] items-center">
                {Array.from({ length: capacity }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-12 h-12 rounded flex items-center justify-center font-bold text-sm border-2 transition-all duration-300
              ${i < data.length
                                ? 'bg-blue-600 border-blue-400 text-white'
                                : 'bg-card border-border text-muted-foreground border-dashed'
                            }
            `}
                    >
                        {i < data.length ? data[i] : ""}
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center">
                <button
                    onClick={addElement}
                    className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
                >
                    Push Element
                </button>
                {highlight && (
                    <div className="mt-4 text-green-600 dark:text-green-400 text-sm font-bold animate-bounce flex items-center gap-2">
                        <RefreshCw size={16} /> Resizing! Doubling Capacity...
                    </div>
                )}
            </div>
        </div>
    );
};

const SafetyChecklist = () => {
    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <ShieldCheck size={20} className="text-red-500" /> The Safety Checklist
            </h3>

            <div className="space-y-4">
                <div className="flex gap-4 items-start p-3 bg-red-50 dark:bg-red-900/10 border border-red-500/20 rounded-lg">
                    <AlertTriangle className="text-red-500 shrink-0 mt-1" size={20} />
                    <div>
                        <h4 className="text-red-600 dark:text-red-300 font-bold text-sm">The Realloc Trap</h4>
                        <p className="text-muted-foreground text-xs mt-1">
                            If <code>realloc</code> fails, it returns NULL but <strong>does not free the original block</strong>.
                            If you assign it directly back to the original pointer (<code>ptr = realloc(ptr...)</code>), you lose the address of the data and leak memory!
                        </p>
                        <CodeBlock title="Safe Pattern" code={`int *temp = realloc(ptr, new_size);\nif (temp == NULL) {\n    // Handle error, ptr is still safe\n} else {\n    ptr = temp;\n}`} />
                    </div>
                </div>

                <div className="flex gap-4 items-start p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-500/20 rounded-lg">
                    <CheckCircle className="text-blue-500 shrink-0 mt-1" size={20} />
                    <div>
                        <h4 className="text-blue-600 dark:text-blue-300 font-bold text-sm">Always Check NULL</h4>
                        <p className="text-muted-foreground text-xs mt-1">
                            <code>malloc</code> and <code>calloc</code> can fail if the system is out of RAM. Always check if the returned pointer is NULL before using it.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture5Page() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32 transition-colors duration-300">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-500/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Advanced Allocation</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 5 • Lecture 5</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <RefreshCw size={14} /> Dynamic Resizing
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        Memory That <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-foreground dark:from-purple-400 dark:via-pink-400 dark:to-white">Grows</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Arrays are fixed, but the real world is dynamic. Learn to resize memory on the fly using <code>realloc</code>, build dynamic arrays, and manage complex allocation safely.
                    </p>
                </div>

                {/* SECTION 1: CALLOC */}
                <section>
                    <SectionHeader title="Clean Allocation (calloc)" icon={Layers} color="green" />
                    <TheoryCard title="Contiguous Allocation" variant="green">
                        <p className="mb-2"><code>calloc</code> stands for "Contiguous Allocation".</p>
                        <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                            <li><strong>Args:</strong> Takes 2 arguments: number of items, size of each item.</li>
                            <li><strong>Zero-Init:</strong> Unlike <code>malloc</code>, it initializes all bytes to 0.</li>
                            <li><strong>Use Case:</strong> Arrays, Matrices, or anytime you need a clean slate.</li>
                        </ul>
                    </TheoryCard>
                    <CallocVsMalloc />
                </section>

                {/* SECTION 2: REALLOC */}
                <section>
                    <SectionHeader title="Resizing Memory (realloc)" icon={RefreshCw} color="purple" />
                    <p className="text-muted-foreground mb-8">
                        What if <code>malloc</code> wasn't enough? <code>realloc</code> attempts to resize the memory block.
                        If it can't extend it, it moves the whole block to a new address.
                    </p>
                    <ReallocSim />
                </section>

                {/* SECTION 3: DYNAMIC ARRAY */}
                <section>
                    <SectionHeader title="Building a Dynamic Array" icon={List} color="blue" />
                    <TheoryCard title="The Logic Behind Vectors" variant="blue">
                        <p className="text-sm text-muted-foreground">
                            This is how <code>std::vector</code> in C++ or <code>ArrayList</code> in Java works internally.
                            <br /><br />
                            1. Track <strong>Size</strong> (elements used) and <strong>Capacity</strong> (total allocated).
                            <br />
                            2. When <code>Size == Capacity</code>, call <code>realloc</code> to double the capacity.
                        </p>
                    </TheoryCard>
                    <DynamicArray />
                </section>

                {/* SECTION 4: SAFETY */}
                <section>
                    <SectionHeader title="Best Practices & Safety" icon={ShieldCheck} color="red" />
                    <SafetyChecklist />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 5 • Lecture 5</p>
            </footer>
        </div>
    );
}
