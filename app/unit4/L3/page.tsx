'use client';

import React, { useState, useEffect } from 'react';
import {
    Trash2, Plus, Search, Edit3, ArrowRight,
    CheckCircle, AlertTriangle, Terminal, Play,
    RefreshCw, Layers, Zap, X, Info
} from 'lucide-react';
import { ModeToggle } from '@/components/theme-toggle';

// --- SHARED COMPONENTS ---
const CodeBlock = ({ code, language = 'c', explanation }: { code: string, language?: string, explanation: string }) => {
    const [showExplanation, setShowExplanation] = useState(false);

    return (
        <div className="bg-card rounded-lg overflow-hidden border border-border my-4 shadow-2xl relative group transition-all duration-300">
            <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-mono uppercase">{language}</span>
                    <button
                        onClick={() => setShowExplanation(!showExplanation)}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-all font-bold ${showExplanation
                            ? 'bg-blue-600 text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                    >
                        {showExplanation ? <X size={14} /> : <Info size={14} />}
                        {showExplanation ? 'Close Details' : 'Explain Logic'}
                    </button>
                </div>
            </div>

            <div className="relative">
                <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-muted-foreground">
                    {code}
                </pre>

                <div className={`
          absolute inset-0 bg-card/95 backdrop-blur-sm p-5 overflow-y-auto transition-opacity duration-300
          ${showExplanation ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}>
                    <h4 className="text-blue-500 dark:text-blue-400 font-bold mb-3 flex items-center gap-2">
                        <Terminal size={16} /> Logic Breakdown
                    </h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        {explanation.split('\n').map((line, i) => (
                            <p key={i} className={`${line.trim().startsWith('•') ? 'pl-4 text-foreground' : ''}`}>
                                {line}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 1. Insertion Visualizer
const InsertionLab = () => {
    const [arr, setArr] = useState<number[]>([10, 20, 30, 40, 0]); // 0 represents 'empty' slot
    const [val, setVal] = useState(99);
    const [pos, setPos] = useState(2); // Index to insert at (user visible: 3)
    const [message, setMessage] = useState("Ready to insert.");
    const [isAnimating, setIsAnimating] = useState(false);
    const capacity = 5;
    const currentSize = 4;

    const insert = async () => {
        if (pos < 0 || pos > currentSize) {
            setMessage("Error: Invalid Position!");
            return;
        }
        setIsAnimating(true);
        setMessage("Step 1: Shift elements to the right...");

        // Animation: Shift Logic
        const newArr = [...arr];
        for (let i = currentSize - 1; i >= pos; i--) {
            await new Promise(r => setTimeout(r, 600));
            newArr[i + 1] = newArr[i];
            setArr([...newArr]);
            // playSound('/shift'); 
        }

        await new Promise(r => setTimeout(r, 600));
        setMessage(`Step 2: Insert ${val} at index ${pos}...`);

        newArr[pos] = val;
        setArr([...newArr]);
        // playSound('/insert');

        await new Promise(r => setTimeout(r, 600));
        setMessage("Insertion Complete!");
        // playSuccess();
        setIsAnimating(false);
    };

    const reset = () => {
        setArr([10, 20, 30, 40, 0]);
        setMessage("Ready to reset.");
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg text-green-600 dark:text-green-400"><Plus size={20} /></div>
                    <h3 className="text-lg font-bold text-foreground">Insertion Operation</h3>
                </div>
                <button onClick={reset} className="text-muted-foreground hover:text-foreground"><RefreshCw size={18} /></button>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="space-y-4 w-full md:w-1/3">
                    <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase">Value to Insert</label>
                        <input type="number" value={val} onChange={e => setVal(Number(e.target.value))} className="w-full bg-muted border-border rounded p-2 text-foreground font-mono mt-1" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase">Index (0-4)</label>
                        <input type="number" value={pos} onChange={e => setPos(Number(e.target.value))} className="w-full bg-muted border-border rounded p-2 text-foreground font-mono mt-1" />
                    </div>
                    <button
                        onClick={insert}
                        disabled={isAnimating}
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isAnimating ? 'Processing...' : 'Insert Value'}
                    </button>
                    <p className="text-xs text-yellow-600 dark:text-yellow-500 font-mono h-4">{message}</p>
                </div>

                <div className="flex-1 flex gap-2 justify-center">
                    {arr.map((item, idx) => (
                        <div key={idx} className={`w-14 h-16 flex flex-col items-center justify-center border-2 rounded-lg transition-all duration-500 ${idx === pos && isAnimating && message.includes('Insert')
                            ? 'bg-green-600 border-green-400 scale-110 text-white'
                            : item === 0
                                ? 'border-border border-dashed text-muted-foreground'
                                : 'bg-card border-border text-muted-foreground'
                            }`}>
                            <span className="font-bold text-lg">{item === 0 ? '-' : item}</span>
                            <span className="text-[10px] absolute -bottom-6 text-muted-foreground font-mono">{idx}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 2. Deletion Visualizer
const DeletionLab = () => {
    const [arr, setArr] = useState<number[]>([10, 20, 30, 40, 50]);
    const [delIdx, setDelIdx] = useState(2);
    const [message, setMessage] = useState("Ready to delete.");
    const [isAnimating, setIsAnimating] = useState(false);
    const size = 5;

    const deleteVal = async () => {
        if (delIdx < 0 || delIdx >= size) {
            setMessage("Error: Invalid Index!");
            return;
        }
        setIsAnimating(true);
        setMessage(`Step 1: Remove value at index ${delIdx}...`);

        const newArr = [...arr];
        newArr[delIdx] = 0; // Visual placeholder for 'empty'
        setArr([...newArr]);
        // playSound('/pop');
        await new Promise(r => setTimeout(r, 600));

        setMessage("Step 2: Shift elements to the left...");
        for (let i = delIdx; i < size - 1; i++) {
            await new Promise(r => setTimeout(r, 600));
            newArr[i] = newArr[i + 1];
            newArr[i + 1] = 0; // Clear the source after move
            setArr([...newArr]);
            // playSound('/shift');
        }

        setMessage("Deletion Complete!");
        setIsAnimating(false);
    };

    const reset = () => {
        setArr([10, 20, 30, 40, 50]);
        setMessage("Ready.");
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-500/20 rounded-lg text-red-600 dark:text-red-400"><Trash2 size={20} /></div>
                    <h3 className="text-lg font-bold text-foreground">Deletion Operation</h3>
                </div>
                <button onClick={reset} className="text-muted-foreground hover:text-foreground"><RefreshCw size={18} /></button>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="space-y-4 w-full md:w-1/3">
                    <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase">Index to Delete (0-4)</label>
                        <input type="number" value={delIdx} onChange={e => setDelIdx(Number(e.target.value))} className="w-full bg-muted border-border rounded p-2 text-foreground font-mono mt-1" />
                    </div>
                    <button
                        onClick={deleteVal}
                        disabled={isAnimating}
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isAnimating ? 'Processing...' : 'Delete Element'}
                    </button>
                    <p className="text-xs text-yellow-600 dark:text-yellow-500 font-mono h-4">{message}</p>
                </div>

                <div className="flex-1 flex gap-2 justify-center">
                    {arr.map((item, idx) => (
                        <div key={idx} className={`w-14 h-16 flex flex-col items-center justify-center border-2 rounded-lg transition-all duration-500 ${idx === delIdx && isAnimating && message.includes('Remove')
                            ? 'bg-red-900/50 border-red-500 scale-90 opacity-50'
                            : item === 0
                                ? 'border-border border-dashed text-muted-foreground'
                                : 'bg-card border-border text-muted-foreground'
                            }`}>
                            <span className="font-bold text-lg">{item === 0 ? '-' : item}</span>
                            <span className="text-[10px] absolute -bottom-6 text-muted-foreground font-mono">{idx}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 3. Search Visualizer (Linear Search)
const SearchLab = () => {
    const [arr] = useState([12, 45, 7, 23, 89, 34]);
    const [target, setTarget] = useState(23);
    const [currentIdx, setCurrentIdx] = useState(-1);
    const [foundIdx, setFoundIdx] = useState<number | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const search = async () => {
        if (isSearching) return;
        setIsSearching(true);
        setFoundIdx(null);
        setCurrentIdx(-1);

        for (let i = 0; i < arr.length; i++) {
            setCurrentIdx(i);
            await new Promise(r => setTimeout(r, 600));
            // playSound('/tick');

            if (arr[i] === target) {
                setFoundIdx(i);
                // playSuccess();
                setIsSearching(false);
                return;
            }
        }
        // playError();
        setIsSearching(false);
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400"><Search size={20} /></div>
                <h3 className="text-lg font-bold text-foreground">Linear Search</h3>
            </div>

            <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4">
                    <span className="text-muted-foreground text-sm font-bold">Find:</span>
                    <input type="number" value={target} onChange={e => setTarget(Number(e.target.value))} className="w-20 bg-muted border-border rounded p-2 text-center text-foreground font-bold" />
                    <button
                        onClick={search}
                        disabled={isSearching}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold disabled:opacity-50"
                    >
                        {isSearching ? 'Searching...' : 'Start Search'}
                    </button>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    {arr.map((val, i) => (
                        <div key={i} className={`w-14 h-16 flex flex-col items-center justify-center border-2 rounded-lg transition-all duration-300 ${foundIdx === i
                            ? 'bg-green-600 border-green-400 text-white scale-110 shadow-lg shadow-green-900/50'
                            : currentIdx === i
                                ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-400 text-blue-600 dark:text-white scale-105'
                                : 'bg-card border-border text-muted-foreground'
                            }`}>
                            <span className="font-bold">{val}</span>
                            <span className="text-[10px] absolute -bottom-6 text-muted-foreground font-mono">{i}</span>
                        </div>
                    ))}
                </div>

                {foundIdx !== null && (
                    <div className="text-green-600 dark:text-green-400 font-bold animate-pulse">
                        Found {target} at index {foundIdx}!
                    </div>
                )}
                {currentIdx === arr.length - 1 && foundIdx === null && !isSearching && (
                    <div className="text-red-500 dark:text-red-400 font-bold">
                        Element not found.
                    </div>
                )}
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

const Lecture3Page = () => {
    const insertCode = `// Inserting value 'X' at position 'pos'
// 1. Shift elements from end to pos
for(int i = size-1; i >= pos; i--) {
    arr[i+1] = arr[i];
}
// 2. Insert val
arr[pos] = val;
// 3. Increase size
size++;`;

    const deleteCode = `// Deleting element at 'pos'
// 1. Shift elements from pos+1 to left
for(int i = pos; i < size-1; i++) {
    arr[i] = arr[i+1];
}
// 2. Decrease size
size--;`;

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30">
            {/* Confetti removed to avoid external dependency */}

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-40 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <img src="/cunits/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="font-bold text-foreground text-sm md:text-base leading-tight">Array Operations</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 4 • Lecture 3</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">
                    Molding <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Data</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    Arrays aren't just for storage. Learn how to dynamically insert, delete, and search for data—the building blocks of algorithms.
                </p>
            </section>

            {/* SECTION 1: INSERTION */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-green-100 dark:bg-green-600/20 text-green-600 dark:text-green-400 p-2 rounded-lg"><Plus size={24} /></span>
                    <h2 className="text-2xl font-bold text-foreground">1. Insertion</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Arrays have a fixed size, but we can simulate "insertion" by:
                            <br />1. Making room (Shifting elements right).
                            <br />2. Placing the new value.
                        </p>
                        <CodeBlock
                            code={insertCode}
                            explanation={`• Start from the LAST element.\n• Move it one step right.\n• Repeat until you reach the target position.\n• Overwrite target position with new value.`}
                        />
                    </div>
                    <div>
                        <InsertionLab />
                    </div>
                </div>
            </section>

            {/* SECTION 2: DELETION */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-red-100 dark:bg-red-600/20 text-red-600 dark:text-red-400 p-2 rounded-lg"><Trash2 size={24} /></span>
                    <h2 className="text-2xl font-bold text-foreground">2. Deletion</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="order-2 lg:order-1">
                        <DeletionLab />
                    </div>
                    <div className="order-1 lg:order-2">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            "Deleting" in an array means:
                            <br />1. Overwriting the target value.
                            <br />2. Shifting all subsequent elements LEFT to fill the gap.
                        </p>
                        <CodeBlock
                            code={deleteCode}
                            explanation={`• Start from the removal index.\n• Copy [i+1] into [i].\n• Repeat until the end.\n• Ideally, reduce the 'size' count.`}
                        />
                    </div>
                </div>
            </section>

            {/* SECTION 3: SEARCHING */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 p-2 rounded-lg"><Search size={24} /></span>
                    <h2 className="text-2xl font-bold text-foreground">3. Linear Search</h2>
                </div>
                <div className="bg-gradient-to-br from-card to-muted p-8 rounded-2xl border border-border text-center">
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        The simplest way to find an item: Check every single box from start to finish until you find it or run out of boxes.
                    </p>
                    <SearchLab />
                </div>
            </section>

        </div>
    );
};

export default Lecture3Page;
