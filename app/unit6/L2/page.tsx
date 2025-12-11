'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Layers,
    LayoutTemplate,
    Settings,
    Database,
    ArrowRight,
    CheckCircle,
    AlertTriangle,
    Component,
    Maximize,
    Minimize,
    RefreshCw,
    ClipboardList,
    Copy,
    FileText,
    AlignLeft
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

const BlueprintStudio = () => {
    const [instances, setInstances] = useState<{ name: string, id: number }[]>([]);

    const addInstance = () => {
        setInstances([...instances, { name: `s${instances.length + 1}`, id: Date.now() }]);
    };

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <LayoutTemplate size={20} className="text-blue-400" /> The Blueprint Analogy
            </h3>

            <div className="flex flex-col md:flex-row gap-12 items-center">
                {/* The Blueprint */}
                <div className="w-full md:w-1/3 space-y-4">
                    <div className="bg-blue-900/10 border-2 border-blue-500 border-dashed p-6 rounded-xl relative">
                        <div className="absolute -top-3 left-4 bg-[#0f172a] px-2 text-blue-400 font-bold text-xs uppercase">Struct Definition</div>
                        <code className="text-sm font-mono text-blue-200 block">
                            struct Student {'{'}<br />
                            &nbsp;&nbsp;int id;<br />
                            &nbsp;&nbsp;char name[20];<br />
                            &nbsp;&nbsp;float marks;<br />
                            {'}'};
                        </code>
                        <div className="mt-4 text-[10px] text-slate-500 text-center">
                            Consumes <strong>0 bytes</strong> of memory! It's just a plan.
                        </div>
                    </div>

                    <button
                        onClick={addInstance}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                        <Component size={18} /> Build Instance (Alloc Memory)
                    </button>
                </div>

                {/* The Instances */}
                <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 p-4 min-h-[200px] w-full">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-4">RAM (Stack Memory)</div>
                    <div className="flex flex-wrap gap-4">
                        {instances.map((inst) => (
                            <div key={inst.id} className="bg-slate-800 border border-slate-600 p-3 rounded-lg w-32 shadow-lg animate-in zoom-in duration-300">
                                <div className="text-xs text-orange-400 font-bold mb-2">struct Student {inst.name}</div>
                                <div className="space-y-1">
                                    <div className="h-4 bg-slate-700 rounded w-full flex items-center px-1 text-[8px] text-slate-400">id</div>
                                    <div className="h-4 bg-slate-700 rounded w-3/4 flex items-center px-1 text-[8px] text-slate-400">name</div>
                                    <div className="h-4 bg-slate-700 rounded w-1/2 flex items-center px-1 text-[8px] text-slate-400">marks</div>
                                </div>
                                <div className="mt-2 text-[9px] text-slate-500 text-right">Size: 28B</div>
                            </div>
                        ))}
                        {instances.length === 0 && (
                            <div className="w-full text-center text-slate-600 italic py-10">
                                No memory allocated yet. Click the button to create variables.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const InitializationLab = () => {
    const [method, setMethod] = useState<'standard' | 'designated'>('standard');

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <ClipboardList size={20} className="text-green-400" /> Filling the Form (Initialization)
            </h3>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setMethod('standard')}
                    className={`flex-1 p-3 rounded-lg font-bold text-sm border transition-all ${method === 'standard' ? 'bg-green-600 border-green-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                >
                    Standard (Order Matters)
                </button>
                <button
                    onClick={() => setMethod('designated')}
                    className={`flex-1 p-3 rounded-lg font-bold text-sm border transition-all ${method === 'designated' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                >
                    Designated (C99 Style)
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    {method === 'standard' ? (
                        <CodeBlock title="Traditional Way" code={'struct Point p = {10, 20};\n// 10 goes to 1st member\n// 20 goes to 2nd member'} />
                    ) : (
                        <CodeBlock title="Modern Way (C99+)" code={'struct Point p = {\n  .y = 20,\n  .x = 10\n};\n// Order doesn\'t matter!'} />
                    )}
                </div>

                <div className="bg-black p-6 rounded-xl border border-slate-800 relative">
                    <div className="absolute top-2 right-2 text-xs text-slate-500 font-bold uppercase">Memory</div>
                    <div className="space-y-2 font-mono">
                        <div className="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-700">
                            <span className="text-blue-400">p.x</span>
                            <span className="text-white text-xl font-bold">10</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-700">
                            <span className="text-purple-400">p.y</span>
                            <span className="text-white text-xl font-bold">20</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DotOperatorLab = () => {
    const [p1, setP1] = useState({ x: 10, y: 20 });
    const [activeField, setActiveField] = useState<'x' | 'y' | null>(null);

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Settings size={20} className="text-green-400" /> Member Access (Dot Operator)
            </h3>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Code Control */}
                <div className="space-y-6">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div className="text-xs font-bold text-slate-500 uppercase mb-2">struct Point p1;</div>

                        <div className="space-y-4">
                            <div
                                className={`flex items-center gap-4 p-2 rounded transition-all ${activeField === 'x' ? 'bg-green-900/30 ring-1 ring-green-500' : 'hover:bg-slate-800'}`}
                                onMouseEnter={() => setActiveField('x')}
                                onMouseLeave={() => setActiveField(null)}
                            >
                                <code className="text-sm font-mono text-white">p1.x = </code>
                                <input
                                    type="number" value={p1.x} onChange={e => setP1({ ...p1, x: Number(e.target.value) })}
                                    className="bg-black border border-slate-700 rounded px-2 py-1 text-green-400 font-bold w-20 text-center"
                                />
                                <span className="text-slate-500 text-xs">// Access member x</span>
                            </div>

                            <div
                                className={`flex items-center gap-4 p-2 rounded transition-all ${activeField === 'y' ? 'bg-green-900/30 ring-1 ring-green-500' : 'hover:bg-slate-800'}`}
                                onMouseEnter={() => setActiveField('y')}
                                onMouseLeave={() => setActiveField(null)}
                            >
                                <code className="text-sm font-mono text-white">p1.y = </code>
                                <input
                                    type="number" value={p1.y} onChange={e => setP1({ ...p1, y: Number(e.target.value) })}
                                    className="bg-black border border-slate-700 rounded px-2 py-1 text-green-400 font-bold w-20 text-center"
                                />
                                <span className="text-slate-500 text-xs">// Access member y</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Object */}
                <div className="relative">
                    <div className="bg-slate-800 rounded-xl p-8 border-2 border-slate-600 shadow-2xl relative w-48 mx-auto">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-950 px-3 text-xs text-slate-400 font-bold uppercase border border-slate-700 rounded-full">
                            Variable p1
                        </div>

                        <div className="space-y-4">
                            <div className={`p-3 bg-black rounded border transition-colors ${activeField === 'x' ? 'border-green-500' : 'border-slate-700'}`}>
                                <div className="text-[10px] text-slate-500 uppercase font-bold">int x</div>
                                <div className="text-2xl text-white font-mono">{p1.x}</div>
                            </div>
                            <div className={`p-3 bg-black rounded border transition-colors ${activeField === 'y' ? 'border-green-500' : 'border-slate-700'}`}>
                                <div className="text-[10px] text-slate-500 uppercase font-bold">int y</div>
                                <div className="text-2xl text-white font-mono">{p1.y}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StructLayoutLab = () => {
    const [layout, setLayout] = useState<'naive' | 'optimized'>('naive');

    // Naive: char (1) + pad(7) + double(8) + int(4) + pad(4) = 24 bytes
    const naiveBlocks = [
        { type: 'char', size: 1, color: 'bg-blue-500' },
        { type: 'pad', size: 7, color: 'bg-slate-700 opacity-50' },
        { type: 'double', size: 8, color: 'bg-green-500' },
        { type: 'int', size: 4, color: 'bg-purple-500' },
        { type: 'pad', size: 4, color: 'bg-slate-700 opacity-50' },
    ];

    // Optimized: double(8) + int(4) + char(1) + pad(3) = 16 bytes
    const optimizedBlocks = [
        { type: 'double', size: 8, color: 'bg-green-500' },
        { type: 'int', size: 4, color: 'bg-purple-500' },
        { type: 'char', size: 1, color: 'bg-blue-500' },
        { type: 'pad', size: 3, color: 'bg-slate-700 opacity-50' },
    ];

    const blocks = layout === 'naive' ? naiveBlocks : optimizedBlocks;
    const totalSize = blocks.reduce((acc, b) => acc + b.size, 0);

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Database size={20} className="text-orange-400" /> Padding & Layout Optimizer
            </h3>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 space-y-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-500 uppercase font-bold mb-2">Members</div>
                        <div className="space-y-2 font-mono text-sm">
                            <div className="text-blue-400">char c;   // 1 Byte</div>
                            <div className="text-green-400">double d; // 8 Bytes</div>
                            <div className="text-purple-400">int i;    // 4 Bytes</div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setLayout('naive')}
                            className={`flex-1 py-2 rounded text-xs font-bold border transition-all ${layout === 'naive' ? 'bg-red-900/30 border-red-500 text-red-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                        >
                            Naive Order
                        </button>
                        <button
                            onClick={() => setLayout('optimized')}
                            className={`flex-1 py-2 rounded text-xs font-bold border transition-all ${layout === 'optimized' ? 'bg-green-900/30 border-green-500 text-green-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                        >
                            Optimized Order
                        </button>
                    </div>

                    <div className={`p-3 rounded-lg border text-center ${layout === 'optimized' ? 'border-green-500 text-green-400 bg-green-900/10' : 'border-red-500 text-red-400 bg-red-900/10'}`}>
                        <div className="text-[10px] uppercase font-bold mb-1">Total Size</div>
                        <div className="text-2xl font-black">{totalSize} Bytes</div>
                        <div className="text-[10px] opacity-70 mt-1">{layout === 'naive' ? "Wasted: 11 Bytes" : "Wasted: 3 Bytes"}</div>
                    </div>
                </div>

                <div className="flex-1 bg-black/40 p-6 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-4 text-center">Memory Map (1 Block = 1 Byte)</div>

                    <div className="flex flex-wrap gap-1 max-w-[400px] mx-auto">
                        {blocks.map((b, i) => (
                            <React.Fragment key={i}>
                                {Array.from({ length: b.size }).map((_, j) => (
                                    <div
                                        key={`${i}-${j}`}
                                        className={`w-8 h-8 rounded border border-black/20 flex items-center justify-center text-[8px] font-bold text-white shadow-sm hover:scale-110 transition-transform cursor-help ${b.color}`}
                                        title={`${b.type} (Byte ${j + 1})`}
                                    >
                                        {b.type === 'pad' ? 'X' : b.type[0].toUpperCase()}
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="mt-6 text-xs text-slate-400 leading-relaxed bg-slate-900 p-3 rounded border border-slate-700">
                        {layout === 'naive' ? (
                            <span>
                                <strong>Why so big?</strong> double d requires 8-byte alignment.
                                It can't start at offset 1 (after char), so the CPU inserts <strong>7 padding bytes</strong>.
                                Total size must also align to 8, adding 4 more bytes at the end.
                            </span>
                        ) : (
                            <span>
                                <strong>Why efficient?</strong> By placing the largest member (double) first, we satisfy alignment immediately.
                                int fits perfectly after double. char fits after int.
                                Only minimal padding (3 bytes) is needed at the end to align the total size.
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AssignmentDemo = () => {
    const [s1, setS1] = useState(10);
    const [s2, setS2] = useState(0);

    const copy = () => {
        setS2(s1);
    };

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Copy size={20} className="text-pink-400" /> Structure Assignment (Cloning)
            </h3>

            <div className="grid md:grid-cols-3 gap-4 items-center">
                {/* Source */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-2">struct Data s1</div>
                    <input
                        type="number" value={s1} onChange={e => setS1(Number(e.target.value))}
                        className="bg-black border border-slate-700 rounded p-2 text-center text-white text-xl font-bold w-24"
                    />
                </div>

                {/* Action */}
                <div className="flex flex-col items-center">
                    <button
                        onClick={copy}
                        className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-2 rounded-full font-bold shadow-lg active:scale-95 transition-transform"
                    >
                        s2 = s1;
                    </button>
                    <span className="text-[10px] text-slate-500 mt-2">Copies all members automatically</span>
                </div>

                {/* Dest */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-2">struct Data s2</div>
                    <div className={`text-xl font-bold p-2 ${s2 === s1 ? 'text-green-400 animate-pulse' : 'text-slate-600'}`}>
                        {s2}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TypedefTransform = () => {
    const [transformed, setTransformed] = useState(false);

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <RefreshCw size={20} className="text-purple-400" /> The Typedef Shortcut
            </h3>

            <div className="flex flex-col items-center gap-6">
                <button
                    onClick={() => setTransformed(!transformed)}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2"
                >
                    {transformed ? <Minimize size={16} /> : <Maximize size={16} />}
                    {transformed ? "Show Original" : "Apply typedef"}
                </button>

                <div className="grid md:grid-cols-2 gap-8 w-full">
                    <div className={`p-4 rounded-xl border transition-all duration-500 ${!transformed ? 'bg-slate-900 border-white opacity-100' : 'bg-slate-900 border-slate-800 opacity-50'}`}>
                        <div className="text-xs text-slate-500 uppercase font-bold mb-2">Without Typedef</div>
                        <code className="text-sm text-slate-300 block mb-2">struct Student s1;</code>
                        <code className="text-sm text-slate-300 block">void print(struct Student s);</code>
                        <div className="mt-4 text-xs text-red-400">Must type 'struct' everywhere.</div>
                    </div>

                    <div className={`p-4 rounded-xl border transition-all duration-500 ${transformed ? 'bg-green-900/20 border-green-500 opacity-100 scale-105' : 'bg-slate-900 border-slate-800 opacity-50'}`}>
                        <div className="text-xs text-slate-500 uppercase font-bold mb-2">With Typedef</div>
                        <div className="mb-3 text-xs font-mono text-purple-300 bg-black/30 p-2 rounded">typedef struct Student Student;</div>
                        <code className="text-sm text-green-300 block mb-2 font-bold">Student s1;</code>
                        <code className="text-sm text-green-300 block font-bold">void print(Student s);</code>
                        <div className="mt-4 text-xs text-green-400">Cleaner! Like a native type.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture2Page() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-32">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-white text-sm leading-tight">Structures</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 6 • Lecture 2</p>
                    </div>
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-900/20 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Layers size={14} /> User Defined Types
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-white">Blueprint</span> of Data
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Arrays can only hold one type of data. Structures allow you to bundle mixed data types (int, float, char) into a single, logical unit—like a <strong>Digital Form</strong>.
                    </p>
                </div>

                {/* SECTION 1: DEFINITION */}
                <section>
                    <SectionHeader title="Defining Structures" icon={LayoutTemplate} color="blue" />
                    <TheoryCard title="What is a Structure?" variant="blue">
                        <p className="mb-2">A <code>struct</code> is a collection of variables (members) under a single name.</p>
                        <ul className="list-disc pl-4 space-y-1 text-sm text-slate-300">
                            <li><strong>Analogy:</strong> Think of it as a <strong>Student ID Card</strong>. It holds a Name (string), Roll No (int), and GPA (float) all in one plastic card.</li>
                            <li><strong>Declaration:</strong> Does not allocate memory. It just defines the shape (the template).</li>
                            <li><strong>Instance:</strong> Allocates memory based on the definition (printing the card).</li>
                        </ul>
                    </TheoryCard>
                    <BlueprintStudio />
                </section>

                {/* SECTION 2: INITIALIZATION */}
                <section>
                    <SectionHeader title="Filling the Form" icon={ClipboardList} color="green" />
                    <p className="text-slate-400 mb-8">
                        Once you have a variable, you need to put data in it. C provides a few ways to do this.
                    </p>
                    <InitializationLab />
                </section>

                {/* SECTION 3: ACCESSING MEMBERS */}
                <section>
                    <SectionHeader title="Accessing Members" icon={Settings} color="green" />
                    <p className="text-slate-400 mb-8">
                        We use the <strong>Dot Operator (.)</strong> to access individual members of a structure variable. Think of it as "Opening the box to get item X".
                    </p>
                    <DotOperatorLab />
                </section>

                {/* SECTION 4: MEMORY & PADDING */}
                <section>
                    <SectionHeader title="Memory Layout & Padding" icon={Database} color="orange" />
                    <TheoryCard title="The Hidden Bytes" variant="orange">
                        <p className="text-sm text-slate-300">
                            Structure size is often <strong>larger</strong> than the sum of its members.
                            The CPU inserts invisible "Padding" to align data to memory boundaries (e.g., multiples of 4 or 8) for speed.
                            <br /><br />
                            <strong>Rule 1:</strong> Members must start at an address divisible by their size.
                            <br />
                            <strong>Rule 2:</strong> Total size must be divisible by the largest member's size.
                        </p>
                    </TheoryCard>
                    <StructLayoutLab />
                </section>

                {/* SECTION 5: ASSIGNMENT */}
                <section>
                    <SectionHeader title="Copying Structures" icon={Copy} color="pink" />
                    <TheoryCard title="The Magic Copy" variant="red">
                        <p className="text-sm text-slate-300">
                            Unlike Arrays, Structures <strong>CAN</strong> be copied using the assignment operator <code>=</code>.
                            This creates a shallow copy of all members.
                        </p>
                    </TheoryCard>
                    <AssignmentDemo />
                </section>

                {/* SECTION 6: TYPEDEF */}
                <section>
                    <SectionHeader title="The Typedef Keyword" icon={CheckCircle} color="purple" />
                    <p className="text-slate-400 mb-8">
                        <code>typedef</code> allows us to create an alias for a type, saving us from typing <code>struct</code> every time.
                    </p>
                    <TypedefTransform />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-slate-800 bg-[#020617] py-12 text-center text-slate-600 text-sm">
                <p>C Programming Course • Unit 6 • Lecture 2</p>
            </footer>
        </div>
    );
}
