'use client';

import React, { useState } from 'react';
import {
    ArrowRight, Share2, Layers, AlertTriangle,
    Terminal, CheckCircle, Quote, Box, Database,
    ArrowDown, RefreshCw, X, Info, Network
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

// 1. Pass by Reference Visualizer
const PassByRefSim = () => {
    const [mainArr, setMainArr] = useState([10, 20, 30]);
    const [highlight, setHighlight] = useState<number | null>(null);
    const [step, setStep] = useState(0);

    const runSim = async () => {
        if (step > 0) return; // Prevent restart while running
        setStep(1); // 1. Pass array

        await new Promise(r => setTimeout(r, 1000));
        setStep(2); // 2. Modifying

        await new Promise(r => setTimeout(r, 600));
        setHighlight(0);
        const newArr = [...mainArr];
        newArr[0] = 99; // Modify index 0
        setMainArr(newArr);

        await new Promise(r => setTimeout(r, 1000));
        setHighlight(1);
        newArr[1] = 88;
        setMainArr([...newArr]);

        await new Promise(r => setTimeout(r, 1000));
        setHighlight(null);
        setStep(3); // 3. Return
    };

    const reset = () => {
        setMainArr([10, 20, 30]);
        setStep(0);
        setHighlight(null);
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Network size={20} /></div>
                    <h3 className="text-lg font-bold text-white">Reference Visualization</h3>
                </div>
                <button onClick={reset} className="text-slate-400 hover:text-white"><RefreshCw size={18} /></button>
            </div>

            <div className="grid md:grid-cols-2 gap-12 relative">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden md:block z-0">
                    <div className={`w-32 h-2 ${step >= 1 ? 'bg-gradient-to-r from-blue-500 to-green-500 animate-pulse' : 'bg-slate-800'}`}></div>
                </div>

                {/* Main Scope */}
                <div className="bg-[#0d1117] p-5 rounded-lg border border-slate-700 z-10 relative">
                    <div className="absolute -top-3 left-4 bg-slate-800 px-2 py-0.5 rounded text-xs text-slate-300 font-bold border border-slate-600">void main()</div>
                    <p className="text-sm text-slate-400 mb-4 font-mono">int arr[3] = {'{...}'}</p>

                    <div className="flex gap-2 justify-center bg-slate-900 p-4 rounded border border-slate-800">
                        {mainArr.map((v, i) => (
                            <div key={i} className={`w-12 h-12 flex items-center justify-center border rounded font-bold transition-all ${highlight === i
                                ? 'bg-green-600 border-green-400 text-white scale-110'
                                : 'bg-slate-800 border-slate-700 text-slate-300'
                                }`}>
                                {v}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Function Scope */}
                <div className={`bg-[#0d1117] p-5 rounded-lg border border-slate-700 z-10 relative transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-30 blur-[2px]'}`}>
                    <div className="absolute -top-3 left-4 bg-purple-900/50 px-2 py-0.5 rounded text-xs text-purple-300 font-bold border border-purple-700">void modify(int b[])</div>

                    <div className="mt-4 flex flex-col items-center">
                        <p className="text-sm text-slate-400 mb-2">{step === 1 ? 'Receiving Address...' : step === 2 ? 'Modifying Original Data...' : step === 3 ? 'Function Returned' : 'Waiting...'}</p>

                        {step === 2 && (
                            <div className="animate-bounce">
                                <ArrowDown className="text-green-500" size={24} />
                            </div>
                        )}
                        <p className="text-xs text-slate-500 mt-2 text-center w-full bg-slate-900/50 p-2 rounded">
                            'b' is just a pointer to 'arr'.
                            <br />b[0] IS arr[0].
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={runSim}
                    disabled={step > 0 && step < 3}
                    className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto"
                >
                    {step === 0 ? <><Share2 size={18} /> Call Function</> : step < 3 ? 'Executing...' : 'Done'}
                </button>
            </div>
        </div>
    );
};

// 2. Size Decay Visualizer
const DecayVisualizer = () => {
    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400"><Database size={20} /></div>
                <h3 className="text-lg font-bold text-white">The "Sizeof" Trap</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Main */}
                <div className="border hover:border-blue-500/50 transition-colors border-slate-700 bg-slate-950 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">Inside main()</h4>
                    <code className="block text-sm text-blue-300 mb-2">int arr[10];</code>
                    <div className="bg-slate-900 p-3 rounded flex justify-between items-center text-sm font-mono text-slate-300">
                        <span>sizeof(arr)</span>
                        <span className="text-green-400 font-bold">40 bytes</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">10 ints × 4 bytes = 40 bytes. Compiler knows the full size.</p>
                </div>

                {/* Function */}
                <div className="border hover:border-red-500/50 transition-colors border-slate-700 bg-slate-950 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">Inside func(int a[])</h4>
                    <code className="block text-sm text-blue-300 mb-2">sizeof(a)</code>
                    <div className="bg-slate-900 p-3 rounded flex justify-between items-center text-sm font-mono text-slate-300">
                        <span>sizeof(a)</span>
                        <span className="text-red-400 font-bold">8 bytes</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Only size of the POINTER (on 64-bit system). Size info is LOST.</p>
                </div>
            </div>

            <div className="mt-6 flex gap-3 text-sm text-slate-400 bg-slate-800/50 p-3 rounded border border-slate-700">
                <AlertTriangle className="text-yellow-500 shrink-0" />
                <p><strong>Rule of thumb:</strong> Always pass the size of the array as a second argument: <code>void func(int arr[], int size)</code>.</p>
            </div>
        </div>
    );
};


// --- MAIN PAGE ---

const Lecture4Page = () => {
    const passCode = `void modifyArray(int arr[], int size) {
    for(int i=0; i<size; i++) {
        arr[i] = arr[i] * 2; // Modifies ORIGINAL array
    }
}

int main() {
    int data[3] = {1, 2, 3};
    modifyArray(data, 3);
    // data is now {2, 4, 6}
}`;

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-purple-500/30">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 z-40 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <img src="/cunits/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white text-sm md:text-base leading-tight">Passing Arrays to Functions</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 4 • Lecture 4</p>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                    Sharing <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Memory</span>
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                    Unlike regular variables, arrays are not copied when passed to functions. They are shared by reference, allowing functions to directly manipulate your data.
                </p>
            </section>

            {/* SECTION 1: PASS BY REFERENCE */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-purple-600/20 text-purple-400 p-2 rounded-lg"><Share2 size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Pass by Reference</h2>
                </div>

                <p className="text-slate-300 mb-6">
                    When you pass an integer <code>func(int a)</code>, C creates a <strong>COPY</strong>. Changing <code>a</code> inside the function does not affect the original.
                    <br /><br />
                    When you pass an array <code>func(int arr[])</code>, C passes the <strong>ADDRESS</strong> (pointer). Changing <code>arr</code> inside the function <strong>DOES</strong> change the original.
                </p>

                <PassByRefSim />

                <CodeBlock
                    code={passCode}
                    explanation={`• 'data' in main is the actual memory block.\n• 'arr' in modifyArray is just a pointer to 'data'.\n• Any change to arr[i] writes directly to main's memory.`}
                />
            </section>

            {/* SECTION 2: THE DECAY TRAP */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-orange-600/20 text-orange-400 p-2 rounded-lg"><Layers size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Array Decay</h2>
                </div>
                <p className="text-slate-300 mb-6">
                    Often called "Array Decay", this behavior means an array loses its size information when passed to a function. It "decays" into a simple pointer.
                </p>

                <DecayVisualizer />
            </section>

            {/* SECTION 3: BEST PRACTICES */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-green-600/20 text-green-400 p-2 rounded-lg"><CheckCircle size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Best Practices</h2>
                </div>

                <div className="space-y-4">
                    <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg flex gap-4">
                        <div className="bg-blue-500/20 text-blue-400 p-3 rounded-full h-12 w-12 flex items-center justify-center font-bold">1</div>
                        <div>
                            <h4 className="font-bold text-white text-lg">Always Pass Size</h4>
                            <p className="text-slate-400 text-sm mt-1">Since the function doesn't know how big the array is, explicitly pass <code>int size</code> as a second parameter.</p>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg flex gap-4">
                        <div className="bg-purple-500/20 text-purple-400 p-3 rounded-full h-12 w-12 flex items-center justify-center font-bold">2</div>
                        <div>
                            <h4 className="font-bold text-white text-lg">Use 'const' for Read-Only</h4>
                            <p className="text-slate-400 text-sm mt-1">If your function shouldn't modify the array, use <code>void func(const int arr[])</code>. This protects the data.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Lecture4Page;
