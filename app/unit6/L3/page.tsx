"use client";

import React, { useState, useEffect } from 'react';
import {
    Database,
    Layers,
    ArrowRight,
    Code,
    Box,
    MapPin,
    Users,
    MousePointer,
    Link,
    List,
    ArrowLeftRight,
    Minimize2,
    Cpu,
    FileDigit,
    AlertTriangle
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

const ArrayOfStructs = () => {
    const [students, setStudents] = useState([
        { id: 101, name: "Alice", marks: 85 },
        { id: 102, name: "Bob", marks: 92 },
        { id: 103, name: "Charlie", marks: 78 }
    ]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Users size={20} className="text-blue-500" /> Array of Structures
            </h3>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                    <TheoryCard title="The Concept" variant="blue">
                        <p>
                            Just like <code>int arr[10]</code> creates 10 integers,
                            <code>struct Student list[3]</code> creates 3 distinct Student structures in contiguous memory.
                        </p>
                    </TheoryCard>

                    <CodeBlock title="Declaration" code={'struct Student list[3] = {\n  {101, "Alice", 85},\n  {102, "Bob", 92},\n  {103, "Charlie", 78}\n};'} />

                    <div className="mt-4 p-4 bg-muted rounded-xl border border-border">
                        <div className="text-xs text-muted-foreground uppercase font-bold mb-2">Access Pattern</div>
                        <code className="text-sm font-mono text-green-600 dark:text-green-400">
                            list[{activeIndex !== null ? activeIndex : 'i'}].name
                        </code>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="text-xs text-muted-foreground font-bold uppercase text-center mb-2">Memory View (Contiguous)</div>
                    {students.map((s, i) => (
                        <div
                            key={s.id}
                            className={`flex items-center p-3 rounded-lg border-2 transition-all cursor-pointer
                 ${activeIndex === i ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 scale-105' : 'bg-muted border-border hover:border-muted-foreground/50'}
               `}
                            onMouseEnter={() => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <div className="w-8 h-8 rounded bg-card flex items-center justify-center font-bold text-muted-foreground mr-4 border border-border">
                                {i}
                            </div>
                            <div className="flex-1 grid grid-cols-3 gap-2 text-sm font-mono">
                                <div className="text-orange-500">ID: {s.id}</div>
                                <div className="text-foreground">"{s.name}"</div>
                                <div className="text-green-600 dark:text-green-400">{s.marks}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const NestedStructs = () => {
    const [hover, setHover] = useState<'outer' | 'inner' | null>(null);

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Box size={20} className="text-purple-500" /> Nested Structures
            </h3>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="relative p-8 border-4 border-muted rounded-xl bg-card" onMouseEnter={() => setHover('outer')} onMouseLeave={() => setHover(null)}>
                    <div className={`absolute top-0 left-0 bg-muted px-3 py-1 rounded-br-xl text-xs font-bold uppercase transition-colors ${hover === 'outer' ? 'text-purple-500' : 'text-muted-foreground'}`}>
                        struct Employee
                    </div>

                    <div className="space-y-4 mt-4">
                        <div className="p-3 bg-muted/50 rounded border border-border flex justify-between">
                            <span className="text-muted-foreground text-sm">char name[]</span>
                            <span className="text-foreground font-mono">"John"</span>
                        </div>
                        <div className="p-3 bg-muted/50 rounded border border-border flex justify-between">
                            <span className="text-muted-foreground text-sm">float salary</span>
                            <span className="text-foreground font-mono">50000.0</span>
                        </div>

                        {/* Inner Struct */}
                        <div
                            className={`p-4 border-2 rounded-xl bg-muted/20 transition-colors ${hover === 'inner' ? 'border-orange-500' : 'border-border'}`}
                            onMouseEnter={(e) => { e.stopPropagation(); setHover('inner'); }}
                            onMouseLeave={() => setHover('outer')}
                        >
                            <div className={`text-xs font-bold uppercase mb-2 ${hover === 'inner' ? 'text-orange-500' : 'text-muted-foreground'}`}>
                                struct Address addr
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">char city[]</span>
                                    <span className="text-orange-500 dark:text-orange-200">"NY"</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">int pin</span>
                                    <span className="text-orange-500 dark:text-orange-200">10001</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-4">
                    <TheoryCard title="Box inside a Box" variant="purple">
                        <p>You can define a structure as a member of another structure.</p>
                    </TheoryCard>

                    <div className="bg-black/5 dark:bg-black/40 p-4 rounded-xl border border-border">
                        <div className="text-xs text-muted-foreground font-bold uppercase mb-2">Accessing Nested Members</div>
                        <div className="font-mono text-lg text-foreground">
                            emp.<span className={`transition-colors ${hover === 'inner' ? 'text-orange-500' : 'text-muted-foreground'}`}>addr</span>.city
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                            Use multiple dot operators to drill down.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ArrowOperator = () => {
    const [notation, setNotation] = useState<'dot' | 'arrow'>('arrow');

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <MousePointer size={20} className="text-green-500" /> Pointers to Structures
            </h3>

            <div className="flex gap-4 mb-8 justify-center">
                <button
                    onClick={() => setNotation('dot')}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${notation === 'dot' ? 'bg-slate-700 text-white' : 'bg-muted text-muted-foreground'}`}
                >
                    Dot Syntax (*p).x
                </button>
                <button
                    onClick={() => setNotation('arrow')}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${notation === 'arrow' ? 'bg-green-600 text-white' : 'bg-muted text-muted-foreground'}`}
                >
                    Arrow Syntax p-&gt;x
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                    {/* Pointer */}
                    <div className="absolute top-0 left-0 bg-blue-100 dark:bg-blue-900/30 border border-blue-500 p-2 rounded text-center w-24">
                        <div className="text-[10px] text-blue-600 dark:text-blue-300 font-bold">struct Point *p</div>
                        <div className="text-sm font-mono text-foreground">0x500</div>
                    </div>

                    {/* Arrow SVG */}
                    <svg className="absolute top-8 left-12 w-24 h-24 pointer-events-none">
                        <path d="M 12 0 Q 12 50 80 80" fill="none" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
                            </marker>
                        </defs>
                    </svg>

                    {/* Struct */}
                    <div className="mt-24 ml-24 bg-muted p-4 rounded-xl border-2 border-border w-40">
                        <div className="text-[10px] text-muted-foreground font-bold uppercase mb-2 text-center">Address: 0x500</div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm border-b border-border pb-1">
                                <span className="text-muted-foreground">x</span> <span className="text-foreground">10</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">y</span> <span className="text-foreground">20</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-black/5 dark:bg-black/40 p-6 rounded-xl border border-border text-center">
                        <div className="text-xs text-muted-foreground font-bold uppercase mb-4">Code Representation</div>
                        <div className="text-2xl font-mono text-green-600 dark:text-green-400 font-bold">
                            {notation === 'dot' ? "(*p).x" : "p->x"}
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                            {notation === 'dot'
                                ? "We must dereference (*) first, then use dot (.). Parentheses are mandatory due to precedence!"
                                : "The arrow operator (->) automatically dereferences the pointer and accesses the member. Much cleaner!"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FunctionStructs = () => {
    const [mode, setMode] = useState<'value' | 'ref'>('value');

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <ArrowLeftRight size={20} className="text-red-500" /> Functions & Efficiency
            </h3>

            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setMode('value')}
                    className={`px-6 py-2 rounded-lg font-bold text-sm transition-all border-2 ${mode === 'value' ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-600 dark:text-white' : 'bg-muted border-border text-muted-foreground'}`}
                >
                    Pass by Value (Copy)
                </button>
                <button
                    onClick={() => setMode('ref')}
                    className={`px-6 py-2 rounded-lg font-bold text-sm transition-all border-2 ${mode === 'ref' ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-600 dark:text-white' : 'bg-muted border-border text-muted-foreground'}`}
                >
                    Pass by Reference (Ptr)
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <CodeBlock
                        title={mode === 'value' ? "Inefficient Code" : "Optimized Code"}
                        code={mode === 'value'
                            ? 'void print(struct BigData d) {\n  // Receives a massive COPY\n  // Uses 1000 bytes stack\n}'
                            : 'void print(struct BigData *d) {\n  // Receives just an ADDRESS\n  // Uses 8 bytes stack\n}'}
                    />
                    <div className="mt-4 p-4 rounded-xl border border-border bg-muted text-sm text-muted-foreground">
                        {mode === 'value'
                            ? "Passing by value copies every single member. If the struct is large (e.g., images), this crashes the stack!"
                            : "Passing by pointer is instant. Only the address (8 bytes) is copied, regardless of the struct size."}
                    </div>
                </div>

                {/* Visualizer */}
                <div className="relative h-48 bg-black/5 dark:bg-black/40 rounded-xl border border-border flex items-center justify-center overflow-hidden">
                    <div className="absolute top-2 left-2 text-[10px] text-muted-foreground uppercase font-bold">Stack Frame Visualization</div>

                    {mode === 'value' ? (
                        <div className="w-48 h-32 bg-red-500 animate-pulse rounded flex items-center justify-center text-white font-bold shadow-2xl">
                            HUGE COPY (1KB)
                        </div>
                    ) : (
                        <div className="w-16 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold shadow-2xl animate-in zoom-in">
                            PTR (8B)
                        </div>
                    )}

                    {mode === 'value' && <div className="absolute bottom-2 text-xs text-red-500 font-bold flex items-center gap-1"><AlertTriangle size={12} /> High Memory Usage</div>}
                </div>
            </div>
        </div>
    );
};

const BitFieldsLab = () => {
    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Minimize2 size={20} className="text-yellow-500" /> Bit Fields (Memory Packing)
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <TheoryCard title="The Problem" variant="yellow">
                        <p className="text-sm">
                            Normally, an <code>int</code> takes 4 bytes (32 bits). But what if you only need to store a number from 0-31? That only needs 5 bits.
                            The rest is wasted.
                        </p>
                    </TheoryCard>
                    <CodeBlock title="Struct with Bit Fields" code={'struct Date {\n  unsigned int day : 5;   // 0-31\n  unsigned int month : 4; // 0-15\n  unsigned int year : 11; // 0-2047\n};'} />
                </div>

                <div className="flex flex-col justify-center">
                    <div className="bg-muted border border-border rounded-xl p-6">
                        <div className="text-xs text-muted-foreground font-bold uppercase mb-4 text-center">32-Bit Integer Layout</div>

                        <div className="flex h-16 rounded-lg overflow-hidden border-2 border-border bg-black">
                            {/* Day */}
                            <div className="w-[15%] bg-blue-600 flex items-center justify-center text-[10px] md:text-xs font-bold text-white border-r border-border relative group" title="5 Bits">
                                Day
                                <span className="absolute -bottom-6 text-[9px] bg-blue-900 px-1 rounded text-blue-200 opacity-0 group-hover:opacity-100">5 bits</span>
                            </div>
                            {/* Month */}
                            <div className="w-[12%] bg-green-600 flex items-center justify-center text-[10px] md:text-xs font-bold text-white border-r border-border relative group" title="4 Bits">
                                Mon
                                <span className="absolute -bottom-6 text-[9px] bg-green-900 px-1 rounded text-green-200 opacity-0 group-hover:opacity-100">4 bits</span>
                            </div>
                            {/* Year */}
                            <div className="w-[33%] bg-purple-600 flex items-center justify-center text-[10px] md:text-xs font-bold text-white border-r border-border relative group" title="11 Bits">
                                Year
                                <span className="absolute -bottom-6 text-[9px] bg-purple-900 px-1 rounded text-purple-200 opacity-0 group-hover:opacity-100">11 bits</span>
                            </div>
                            {/* Unused */}
                            <div className="flex-1 bg-muted flex items-center justify-center text-[10px] text-muted-foreground pattern-diagonal-lines">
                                Unused (12 bits)
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <span className="text-sm font-bold text-foreground">Total Used: 20 Bits</span>
                            <span className="text-xs text-muted-foreground block">Fits inside a single 4-byte integer!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SelfReferential = () => {
    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Link size={20} className="text-orange-500" /> Self-Referential Structures
            </h3>

            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                    <TheoryCard title="The Basis of Data Structures" variant="orange">
                        <p>
                            A structure cannot contain an instance of itself (infinite size!), but it CAN contain a <strong>pointer to itself</strong>.
                            This is how Linked Lists and Trees are built.
                        </p>
                    </TheoryCard>
                    <CodeBlock code={'struct Node {\n  int data;\n  struct Node *next;\n};'} />
                </div>

                <div className="flex-1 flex gap-4 items-center justify-center">
                    {/* Node A */}
                    <div className="bg-muted border border-orange-500/50 p-4 rounded-lg flex flex-col items-center w-24 relative">
                        <div className="text-xs text-orange-500 font-bold mb-2">Node A</div>
                        <div className="w-full bg-black p-1 text-center text-white mb-1 rounded text-sm">10</div>
                        <div className="w-full bg-blue-100 dark:bg-blue-900/30 p-1 text-center text-blue-600 dark:text-blue-300 rounded text-[10px]">*next</div>

                        {/* Arrow */}
                        <div className="absolute top-1/2 -right-6 w-6 h-0.5 bg-blue-500"></div>
                    </div>

                    {/* Node B */}
                    <div className="bg-muted border border-orange-500/50 p-4 rounded-lg flex flex-col items-center w-24">
                        <div className="text-xs text-orange-500 font-bold mb-2">Node B</div>
                        <div className="w-full bg-black p-1 text-center text-white mb-1 rounded text-sm">20</div>
                        <div className="w-full bg-card p-1 text-center text-muted-foreground rounded text-[10px]">NULL</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture3Page() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32 transition-colors duration-300">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-500/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Advanced Structures</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 6 • Lecture 3</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Database size={14} /> Complex Data Types
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        Structuring the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-foreground dark:from-blue-400 dark:via-indigo-400 dark:to-white">Universe</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Real-world data is complex. We need arrays of objects, objects inside objects, and pointers that link them all together.
                    </p>
                </div>

                {/* SECTION 1: ARRAYS OF STRUCTS */}
                <section>
                    <SectionHeader title="Array of Structures" icon={List} color="blue" />
                    <p className="text-muted-foreground mb-8">
                        Why make 50 separate variables for 50 students? Create an array of structures to manage them all in one contiguous block of memory.
                    </p>
                    <ArrayOfStructs />
                </section>

                {/* SECTION 2: NESTED STRUCTS */}
                <section>
                    <SectionHeader title="Nested Structures" icon={Box} color="purple" />
                    <p className="text-muted-foreground mb-8">
                        Structures can contain other structures. This allows us to build hierarchical data models (e.g., An Employee has an Address, an Address has a City).
                    </p>
                    <NestedStructs />
                </section>

                {/* SECTION 3: POINTERS TO STRUCTS */}
                <section>
                    <SectionHeader title="Pointers to Structures" icon={MousePointer} color="green" />
                    <TheoryCard title="The Arrow Operator (->)" variant="green">
                        <p className="mb-2">When using a pointer to a structure, accessing members requires two steps: Dereference <code>*</code> and Access <code>.</code>.</p>
                        <div className="bg-black p-2 rounded text-center mb-2">
                            <code className="text-red-400">(*ptr).member</code>
                        </div>
                        <p className="mb-2">This is clumsy. C provides the arrow operator as a cleaner shorthand:</p>
                        <div className="bg-black p-2 rounded text-center">
                            <code className="text-green-400">ptr-&gt;member</code>
                        </div>
                    </TheoryCard>
                    <ArrowOperator />
                </section>

                {/* SECTION 4: FUNCTIONS & STRUCTS */}
                <section>
                    <SectionHeader title="Passing Structures" icon={ArrowLeftRight} color="red" />
                    <p className="text-muted-foreground mb-8">
                        Efficiency matters. Copying large structures by value is slow. Using pointers (Pass by Reference) is instantaneous.
                    </p>
                    <FunctionStructs />
                </section>

                {/* SECTION 5: BIT FIELDS */}
                <section>
                    <SectionHeader title="Memory Optimization: Bit Fields" icon={Minimize2} color="yellow" />
                    <p className="text-muted-foreground mb-8">
                        For system programming, we often need to store data in specific numbers of bits (not bytes) to save space or match hardware registers.
                    </p>
                    <BitFieldsLab />
                </section>

                {/* SECTION 6: SELF REFERENTIAL */}
                <section>
                    <SectionHeader title="Self-Referential Structures" icon={Link} color="orange" />
                    <p className="text-muted-foreground mb-8">
                        The foundation of dynamic data structures (Linked Lists, Trees). A struct that holds a pointer to... another struct of the same type!
                    </p>
                    <SelfReferential />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 6 • Lecture 3</p>
            </footer>
        </div>
    );
}
