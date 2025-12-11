'use client';

import React, { useState } from 'react';
import {
    ArrowRight, BarChart2, Play, RefreshCw,
    CheckCircle, Terminal, X, Info, Zap,
    Clock, AlertTriangle
} from 'lucide-react';

// --- SHARED COMPONENTS ---
const CodeBlock = ({ code, language = 'c', explanation }: { code: string, language?: string, explanation: string }) => {
    const [showExplanation, setShowExplanation] = useState(false);

    return (
        <div className="bg-[#0d1117] rounded-lg overflow-hidden border border-slate-700 my-4 shadow-2xl relative group transition-all duration-300">
            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-700">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono uppercase">{language}</span>
                    <button
                        onClick={() => setShowExplanation(!showExplanation)}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-all font-bold ${showExplanation
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                    >
                        {showExplanation ? <X size={14} /> : <Info size={14} />}
                        {showExplanation ? 'Close Details' : 'Explain Logic'}
                    </button>
                </div>
            </div>

            <div className="relative">
                <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-slate-300">
                    {code}
                </pre>

                <div className={`
          absolute inset-0 bg-[#0f172a]/95 backdrop-blur-sm p-5 overflow-y-auto transition-opacity duration-300
          ${showExplanation ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}>
                    <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
                        <Terminal size={16} /> Logic Breakdown
                    </h4>
                    <div className="space-y-2 text-sm text-slate-300">
                        {explanation.split('\n').map((line, i) => (
                            <p key={i} className={`${line.trim().startsWith('•') ? 'pl-4 text-slate-400' : ''}`}>
                                {line}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 1. Bubble Sort Visualizer
const BubbleSortLab = () => {
    const [arr, setArr] = useState([45, 12, 89, 23, 7, 34]);
    const [compareIndices, setCompareIndices] = useState<number[]>([]);
    const [swapIndices, setSwapIndices] = useState<number[]>([]);
    const [sortedIndices, setSortedIndices] = useState<number[]>([]);
    const [isSorting, setIsSorting] = useState(false);
    const [message, setMessage] = useState("Ready to sort.");

    const reset = () => {
        setArr([45, 12, 89, 23, 7, 34]);
        setCompareIndices([]);
        setSwapIndices([]);
        setSortedIndices([]);
        setMessage("Ready to sort.");
        setIsSorting(false);
    };

    const runSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        const tempArr = [...arr];
        const n = tempArr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                setCompareIndices([j, j + 1]);
                setMessage(`Comparing ${tempArr[j]} and ${tempArr[j + 1]}...`);
                await new Promise(r => setTimeout(r, 600));

                if (tempArr[j] > tempArr[j + 1]) {
                    setMessage(`Swapping because ${tempArr[j]} > ${tempArr[j + 1]}!`);
                    setSwapIndices([j, j + 1]);

                    // Swap logic
                    const temp = tempArr[j];
                    tempArr[j] = tempArr[j + 1];
                    tempArr[j + 1] = temp;
                    setArr([...tempArr]);

                    await new Promise(r => setTimeout(r, 800));
                    setSwapIndices([]);
                }
            }
            const sortedIdx = n - i - 1;
            setSortedIndices(prev => [...prev, sortedIdx]); // Mark end as sorted
            setMessage(`${tempArr[sortedIdx]} is now in its correct position.`);
        }
        setSortedIndices([0, 1, 2, 3, 4, 5]);
        setCompareIndices([]);
        setMessage("Sort Complete!");
        setIsSorting(false);
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><BarChart2 size={20} /></div>
                    <h3 className="text-lg font-bold text-white">Bubble Sort Simulation</h3>
                </div>
                <div className="flex gap-2">
                    <button onClick={reset} disabled={isSorting} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50"><RefreshCw size={18} /></button>
                    <button
                        onClick={runSort}
                        disabled={isSorting}
                        className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-4 py-2 rounded font-bold flex items-center gap-2"
                    >
                        {isSorting ? 'Sorting...' : 'Start Sort'} <Play size={16} fill="currentColor" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="flex items-end gap-2 md:gap-4 h-64 w-full justify-center mb-6 bg-slate-950/50 p-6 rounded-lg border border-slate-800 relative">
                    {arr.map((val, i) => {
                        const isCompare = compareIndices.includes(i);
                        const isSwap = swapIndices.includes(i);
                        const isSorted = sortedIndices.includes(i);

                        let colorClass = "bg-slate-600";
                        if (isSorted) colorClass = "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]";
                        else if (isSwap) colorClass = "bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]";
                        else if (isCompare) colorClass = "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]";

                        return (
                            <div key={i} className="flex flex-col items-center gap-2 transition-all duration-300" style={{ order: i }}>
                                <div
                                    className={`w-10 md:w-16 rounded-t-lg transition-all duration-300 flex items-end justify-center pb-2 text-white font-bold ${colorClass}`}
                                    style={{ height: `${(val / 100) * 200 + 40}px` }}
                                >
                                    {val}
                                </div>
                                <span className="text-xs text-slate-500 font-mono">{i}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="h-8 text-center font-bold text-sm text-slate-300 bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-700 flex items-center gap-2">
                    {isSorting && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>}
                    {message}
                </div>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-2 text-xs text-center">
                <div className="flex flex-col gap-1 items-center">
                    <div className="w-4 h-4 bg-slate-600 rounded"></div>
                    <span className="text-slate-500">Unsorted</span>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-slate-500">Comparing</span>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-slate-500">Swapping</span>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-slate-500">Sorted</span>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

const Lecture5Page = () => {
    const bubbleCode = `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        // Last i elements are already sorted
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                // Swap temp
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`;

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-purple-500/30 pb-20">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 z-40 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <img src="/cunits/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white text-sm md:text-base leading-tight">Sorting: Bubble Sort</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 4 • Lecture 5</p>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                    Bringing <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Order</span> to Chaos
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                    Sorting is fundamental to computing. Bubble Sort is the simplest sorting algorithm—pushing the largest elements to the top like bubbles in water.
                </p>
            </section>

            {/* SECTION 1: VISUALIZATION */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-purple-600/20 text-purple-400 p-2 rounded-lg"><Zap size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">How it Works</h2>
                </div>

                <p className="text-slate-300 mb-6 max-w-3xl">
                    1. Iterate through the array.<br />
                    2. Compare adjacent elements (e.g., index 0 and 1).<br />
                    3. If they are in the wrong order, <strong>swap</strong> them.<br />
                    4. Repeat until the array is fully sorted.
                </p>

                <BubbleSortLab />
            </section>

            {/* SECTION 2: CODE IMPLEMENTATION */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-blue-600/20 text-blue-400 p-2 rounded-lg"><Terminal size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Implementation</h2>
                </div>

                <CodeBlock
                    code={bubbleCode}
                    explanation={`• Outer Loop (i): Controls passes. Runs n-1 times.\n• Inner Loop (j): Compares neighbors.\n• n-i-1: Optimization! We ignore the confirmed 'bubbled' elements at the end.`}
                />
            </section>

            {/* SECTION 3: COMPLEXITY */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-red-600/20 text-red-400 p-2 rounded-lg"><Clock size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Complexity Analysis</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl">
                        <h4 className="font-bold text-white mb-4 text-lg">Time Complexity</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Best Case (Already Sorted)</span>
                                <span className="text-green-400 font-mono font-bold">O(n)</span>
                            </div>
                            <div className="w-full h-px bg-slate-800"></div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Worst Case (Reverse Sorted)</span>
                                <span className="text-red-400 font-mono font-bold">O(n²)</span>
                            </div>
                            <div className="w-full h-px bg-slate-800"></div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Average Case</span>
                                <span className="text-orange-400 font-mono font-bold">O(n²)</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl">
                        <h4 className="font-bold text-white mb-4 text-lg">Space Complexity</h4>
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-bold text-blue-400 font-mono">O(1)</span>
                            <p className="text-sm text-slate-400">
                                <strong>In-Place:</strong> Bubble sort doesn't need extra memory arrays. It only needs a single tiny temporary variable for swapping.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Lecture5Page;
