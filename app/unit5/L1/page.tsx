"use client";

import React, { useState, useEffect } from 'react';
import {
    MapPin,
    Anchor,
    ArrowRight,
    Hash,
    Key,
    Search,
    MousePointer,
    Navigation,
    Box,
    Layers,
    Eye,
    RefreshCw,
    Cpu,
    BookOpen,
    Code,
    ShieldAlert,
    AlertOctagon,
    FileQuestion,
    CheckCircle
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

const AddressAnalogy = () => {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-blue-400" /> The Mailbox Analogy
            </h3>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Visual */}
                <div className="relative h-64 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden group">
                    {/* House */}
                    <div
                        className={`absolute transition-all duration-500 flex flex-col items-center ${hovered === 'val' ? 'scale-110' : ''}`}
                        onMouseEnter={() => setHovered('val')}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <div className="w-32 h-32 bg-blue-600 rounded-lg shadow-2xl flex items-center justify-center text-4xl font-bold text-white relative z-10">
                            10
                        </div>
                        <div className="mt-2 text-xs font-bold text-blue-400 uppercase">Value (Content)</div>
                    </div>

                    {/* Mailbox Label */}
                    <div
                        className={`absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded font-mono font-bold text-sm shadow-lg transition-all duration-500 cursor-help ${hovered === 'addr' ? 'scale-110 rotate-3' : ''}`}
                        onMouseEnter={() => setHovered('addr')}
                        onMouseLeave={() => setHovered(null)}
                    >
                        Addr: 1004
                    </div>
                </div>

                {/* Explanation */}
                <div className="space-y-4">
                    <div
                        className={`p-4 rounded-lg border transition-all ${hovered === 'val' ? 'bg-blue-900/20 border-blue-500' : 'bg-slate-900 border-slate-800'}`}
                        onMouseEnter={() => setHovered('val')}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <h4 className="font-bold text-white mb-1">The Variable (House)</h4>
                        <p className="text-xs text-slate-400">Stores the actual data (e.g., integer 10). We usually refer to it by name (e.g., <code>int a</code>).</p>
                    </div>

                    <div
                        className={`p-4 rounded-lg border transition-all ${hovered === 'addr' ? 'bg-yellow-900/20 border-yellow-500' : 'bg-slate-900 border-slate-800'}`}
                        onMouseEnter={() => setHovered('addr')}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <h4 className="font-bold text-white mb-1">The Address (House Number)</h4>
                        <p className="text-xs text-slate-400">The location in RAM where the house is built (e.g., <code>1004</code>). This is what a pointer stores.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PointerLab = () => {
    const [val, setVal] = useState(50);
    const [ptrLinked, setPtrLinked] = useState(false);
    const [derefMode, setDerefMode] = useState(false);

    // Addresses
    const addrA = "0x7FF0";
    const addrP = "0x8AA4";

    const modifyViaPointer = () => {
        setVal(v => v + 10);
    };

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Anchor size={20} className="text-green-400" /> The Pointer Laboratory
            </h3>

            <div className="grid md:grid-cols-2 gap-12 mb-8 relative">
                {/* Variable A */}
                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase mb-2">int a</span>
                    <div className="w-32 h-32 bg-slate-800 rounded-xl border-2 border-slate-600 flex flex-col items-center justify-center relative">
                        <span className="text-4xl font-mono font-bold text-white">{val}</span>
                        <div className="absolute -bottom-6 text-xs font-mono text-slate-500 bg-black px-2 rounded">{addrA}</div>
                    </div>
                </div>

                {/* Pointer P */}
                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase mb-2">int *p</span>
                    <div className={`w-32 h-32 rounded-xl border-2 flex flex-col items-center justify-center relative transition-colors duration-500 ${ptrLinked ? 'bg-green-900/20 border-green-500' : 'bg-slate-800 border-slate-600'}`}>
                        <span className={`text-xl font-mono font-bold ${ptrLinked ? 'text-green-400' : 'text-slate-600'}`}>
                            {ptrLinked ? addrA : "?"}
                        </span>
                        <div className="absolute -bottom-6 text-xs font-mono text-slate-500 bg-black px-2 rounded">{addrP}</div>
                    </div>
                </div>

                {/* Connection Line */}
                {ptrLinked && (
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-20 pointer-events-none z-10">
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#4ade80" />
                            </marker>
                        </defs>
                        <line x1="70%" y1="50%" x2="30%" y2="50%" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="5,5" className="animate-pulse" />
                    </svg>
                )}
            </div>

            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-800">
                        <code className="text-xs text-blue-300">int a = 50;</code>
                        <span className="text-[10px] text-slate-500">Variable Created</span>
                    </div>
                    <button
                        onClick={() => setPtrLinked(!ptrLinked)}
                        className={`w-full p-2 rounded border font-mono text-xs text-left transition-all ${ptrLinked ? 'bg-green-900/30 border-green-500 text-green-300' : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-white'}`}
                    >
                        {ptrLinked ? "int *p = &a;  // Linked" : "int *p;       // Unlinked"}
                    </button>
                </div>

                <div className="space-y-2">
                    <button
                        onClick={modifyViaPointer}
                        disabled={!ptrLinked}
                        className="w-full bg-slate-800 disabled:opacity-30 p-3 rounded border border-slate-700 flex items-center justify-between group hover:border-green-500 transition-all"
                    >
                        <div className="text-left">
                            <code className="text-xs text-purple-400 block font-bold">*p = *p + 10;</code>
                            <span className="text-[10px] text-slate-500">Dereference & Modify</span>
                        </div>
                        <RefreshCw size={16} className="text-slate-400 group-hover:rotate-180 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const SyntaxDecoder = () => {
    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Code size={20} className="text-orange-400" /> Syntax Decoder: The Asterisk Confusion
            </h3>

            <p className="text-sm text-slate-400 mb-6">
                The <code>*</code> symbol has two totally different meanings depending on where it appears. This is the #1 source of confusion for beginners.
            </p>

            <div className="space-y-6">
                {/* Declaration */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">1. Declaration (Creating)</h4>
                    <div className="text-xl font-mono text-center mb-2">
                        <span className="text-blue-400">int</span> <span className="text-red-400">*</span><span className="text-white">ptr</span>;
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400">
                        <div className="border-t border-slate-700 pt-1">Base Type</div>
                        <div className="border-t border-slate-700 pt-1 text-red-300">"Is a Pointer To"</div>
                        <div className="border-t border-slate-700 pt-1">Variable Name</div>
                    </div>
                    <div className="mt-2 text-xs text-center text-slate-500 italic">"ptr is a variable that will hold the address of an integer."</div>
                </div>

                {/* Dereferencing */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">2. Dereferencing (Accessing)</h4>
                    <div className="text-xl font-mono text-center mb-2">
                        <span className="text-purple-400">*</span><span className="text-white">ptr</span> = 10;
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-[10px] text-slate-400">
                        <div className="border-t border-slate-700 pt-1 text-purple-300">"Value At Address"</div>
                        <div className="border-t border-slate-700 pt-1">The Pointer Variable</div>
                    </div>
                    <div className="mt-2 text-xs text-center text-slate-500 italic">"Go to the address stored in ptr and change that value to 10."</div>
                </div>
            </div>
        </div>
    );
};

const NullPointerLab = () => {
    const [state, setState] = useState<'safe' | 'null' | 'crashed'>('safe');

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <ShieldAlert size={20} className="text-red-500" /> The Safety Valve: Null Pointers
            </h3>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setState('safe')}
                            className={`flex-1 p-2 rounded border text-xs font-bold ${state === 'safe' ? 'bg-green-600 border-green-500 text-white' : 'bg-slate-800 border-slate-600 text-slate-400'}`}
                        >
                            Valid Pointer
                        </button>
                        <button
                            onClick={() => setState('null')}
                            className={`flex-1 p-2 rounded border text-xs font-bold ${state === 'null' || state === 'crashed' ? 'bg-red-600 border-red-500 text-white' : 'bg-slate-800 border-slate-600 text-slate-400'}`}
                        >
                            NULL Pointer
                        </button>
                    </div>

                    <CodeBlock
                        title="Safety Check Logic"
                        code={`int *ptr = ${state === 'safe' ? '&data' : 'NULL'};\n\n// Dereference attempt:\nprintf("%d", *ptr);`}
                    />

                    <button
                        onClick={() => {
                            if (state === 'null') setState('crashed');
                        }}
                        disabled={state === 'crashed'}
                        className={`w-full p-3 rounded font-bold text-white transition-all ${state === 'crashed' ? 'bg-red-900 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
                    >
                        {state === 'crashed' ? "SYSTEM CRASHED (Segfault)" : "Attempt Dereference (*ptr)"}
                    </button>
                </div>

                <div className="h-48 bg-black rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
                    {state === 'safe' && (
                        <div className="text-center animate-in zoom-in">
                            <div className="text-green-400 font-mono text-2xl font-bold mb-2">100</div>
                            <div className="text-xs text-slate-500">Value successfully accessed</div>
                            <CheckCircle className="text-green-500 mx-auto mt-2" size={24} />
                        </div>
                    )}

                    {state === 'null' && (
                        <div className="text-center animate-in fade-in">
                            <div className="text-slate-600 font-mono text-xl font-bold mb-2">NULL (0x0)</div>
                            <div className="text-xs text-slate-500">Points to nothing. Waiting...</div>
                        </div>
                    )}

                    {state === 'crashed' && (
                        <div className="absolute inset-0 bg-red-900/90 flex flex-col items-center justify-center z-10 animate-in zoom-in">
                            <AlertOctagon size={48} className="text-white mb-2 animate-bounce" />
                            <h4 className="text-2xl font-black text-white">SEGMENTATION FAULT</h4>
                            <p className="text-white/80 text-xs mt-2">Process terminated.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const IndirectionSim = () => {
    const [step, setStep] = useState(0);

    // Steps: 
    // 0: Initial
    // 1: Fetch Address from P
    // 2: Travel to Address
    // 3: Retrieve Value

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 4);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Navigation size={20} className="text-purple-400" /> The Indirection Engine (*)
            </h3>

            <div className="relative h-40 bg-black rounded-xl border border-slate-800 overflow-hidden flex items-center justify-around px-12">

                {/* Pointer P */}
                <div className={`z-10 bg-slate-900 border-2 ${step === 1 ? 'border-yellow-400 shadow-lg shadow-yellow-500/20' : 'border-slate-600'} w-24 h-24 rounded-lg flex flex-col items-center justify-center`}>
                    <div className="text-xs text-slate-500 font-bold mb-1">ptr</div>
                    <div className="font-mono text-green-400">0x500</div>
                </div>

                {/* The Journey */}
                <div className="flex-1 h-1 bg-slate-800 relative mx-4">
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full transition-all duration-1000 ease-in-out shadow-lg"
                        style={{
                            left: step === 0 ? '0%' : step === 1 ? '10%' : step === 2 ? '90%' : '90%',
                            opacity: step === 0 ? 0 : 1
                        }}
                    ></div>
                </div>

                {/* Variable X */}
                <div className={`z-10 bg-slate-900 border-2 ${step === 2 || step === 3 ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-slate-600'} w-24 h-24 rounded-lg flex flex-col items-center justify-center relative`}>
                    <div className="absolute -top-3 bg-slate-800 px-2 text-[10px] text-green-400 font-mono">Addr: 0x500</div>
                    <div className="text-xs text-slate-500 font-bold mb-1">x</div>
                    <div className="font-mono text-white text-2xl font-bold">10</div>
                </div>
            </div>

            <div className="mt-4 text-center">
                <span className="bg-slate-900 text-slate-300 px-4 py-2 rounded-full text-xs font-mono border border-slate-700">
                    {step === 0 && "Ready..."}
                    {step === 1 && "CPU reads address 0x500 from 'ptr'"}
                    {step === 2 && "CPU travels to memory location 0x500"}
                    {step === 3 && "CPU accesses the value (10)"}
                </span>
            </div>
        </div>
    );
};

const PointerTaxonomy = () => {
    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FileQuestion size={20} className="text-yellow-400" /> Pointer Taxonomy
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 mb-2 text-green-400 font-bold">
                        <CheckCircle size={16} /> Null Pointer
                    </div>
                    <p className="text-xs text-slate-400 mb-2">Points to <code>0</code> or <code>(void*)0</code>. Safe "empty" state.</p>
                    <code className="text-xs bg-black p-1 rounded text-slate-300">int *p = NULL;</code>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 mb-2 text-purple-400 font-bold">
                        <Box size={16} /> Void (Generic) Pointer
                    </div>
                    <p className="text-xs text-slate-400 mb-2">No type. Can hold any address but cannot be dereferenced directly.</p>
                    <code className="text-xs bg-black p-1 rounded text-slate-300">void *p = &x;</code>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 mb-2 text-red-400 font-bold">
                        <AlertOctagon size={16} /> Wild Pointer
                    </div>
                    <p className="text-xs text-slate-400 mb-2">Uninitialized pointer. Points to random garbage memory. Dangerous.</p>
                    <code className="text-xs bg-black p-1 rounded text-slate-300">int *p; // Where does it point?</code>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 mb-2 text-orange-400 font-bold">
                        <ShieldAlert size={16} /> Dangling Pointer
                    </div>
                    <p className="text-xs text-slate-400 mb-2">Points to memory that has been freed/deleted. Accessing it causes crashes.</p>
                    <code className="text-xs bg-black p-1 rounded text-slate-300">free(p); // p is dangling</code>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture1Page() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-32">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-white text-sm leading-tight">Pointers & Memory</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 5 • Lecture 1</p>
                    </div>
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-900/20 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <MousePointer size={14} /> Memory Access
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-white">Address</span> of Power
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Pointers are the most feared and powerful feature of C. They allow you to touch the raw memory of the machine.
                    </p>
                </div>

                {/* SECTION 1: WHAT IS A POINTER? */}
                <section>
                    <SectionHeader title="Concept: The Address" icon={MapPin} color="blue" />
                    <TheoryCard title="Variables have Addresses" variant="blue">
                        <p className="mb-2">Every variable lives somewhere in the computer's memory (RAM).</p>
                        <ul className="list-disc pl-4 space-y-1 text-sm text-slate-300">
                            <li>Think of RAM as a giant street with billions of houses.</li>
                            <li>Every house has a unique <strong>Address</strong> (e.g., 1004).</li>
                            <li>A <strong>Pointer</strong> is just a variable that stores the address of another variable.</li>
                        </ul>
                        <br />
                        <p className="mb-2 font-bold text-white">Why use Pointers?</p>
                        <ul className="list-disc pl-4 space-y-1 text-sm text-slate-300">
                            <li><strong>Direct Access:</strong> Modify variables in other functions (Call by Reference).</li>
                            <li><strong>Efficiency:</strong> Pass huge arrays/structures without copying data.</li>
                            <li><strong>Dynamic Memory:</strong> Essential for Heap allocation (Unit 5 L4).</li>
                        </ul>
                    </TheoryCard>
                    <AddressAnalogy />
                </section>

                {/* SECTION 2: SYNTAX */}
                <section>
                    <SectionHeader title="Syntax & Operators" icon={Hash} color="orange" />

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <TheoryCard title="The Address-Of Operator (&)" variant="green">
                            <p className="text-sm text-slate-300">
                                Used to <strong>get</strong> the address of a variable.
                                <br /><br />
                                <code>&x</code> means "The address of x".
                            </p>
                        </TheoryCard>
                        <TheoryCard title="The Dereference Operator (*)" variant="purple">
                            <p className="text-sm text-slate-300">
                                Used to <strong>access</strong> the value at an address.
                                <br /><br />
                                <code>*p</code> means "Go to the address inside p and get the value".
                            </p>
                        </TheoryCard>
                    </div>

                    <SyntaxDecoder />
                </section>

                {/* SECTION 3: LAB */}
                <section>
                    <SectionHeader title="Interactive Pointer Lab" icon={Anchor} color="green" />
                    <p className="text-slate-400 mb-8">
                        Experiment with declaring a pointer, linking it to a variable, and modifying the value remotely.
                    </p>
                    <PointerLab />
                </section>

                {/* SECTION 4: INDIRECTION */}
                <section>
                    <SectionHeader title="Visualizing Indirection" icon={Navigation} color="purple" />
                    <TheoryCard title="Why 'Indirection'?" variant="purple">
                        <p className="text-sm text-slate-300">
                            It's called indirection because we don't access x directly. We access it <strong>indirectly</strong> via its address stored in p.
                        </p>
                    </TheoryCard>
                    <IndirectionSim />
                </section>

                {/* SECTION 5: SAFETY & TYPES */}
                <section>
                    <SectionHeader title="Pointer Safety & Taxonomy" icon={ShieldAlert} color="red" />
                    <TheoryCard title="The Golden Rule" variant="red">
                        <p className="text-sm text-slate-300 mb-2">
                            <strong>Never dereference an uninitialized or NULL pointer.</strong>
                            It causes a Segmentation Fault (Crash).
                        </p>
                        <code className="block bg-black p-2 rounded text-xs text-red-300">
                            if (ptr != NULL) {'{'} *ptr = 10; {'}'} // Safe Check
                        </code>
                    </TheoryCard>

                    <NullPointerLab />
                    <PointerTaxonomy />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-slate-800 bg-[#020617] py-12 text-center text-slate-600 text-sm">
                <p>C Programming Course • Unit 5 • Lecture 1</p>
            </footer>
        </div>
    );
}
