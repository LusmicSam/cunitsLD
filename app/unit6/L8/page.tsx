"use client";

import React, { useState, useEffect } from 'react';
import {
    Database,
    Box,
    Layers,
    ArrowRight,
    Cpu,
    Code,
    CheckCircle,
    Globe,
    Briefcase,
    Users,
    CreditCard,
    Trash2,
    Plus
} from 'lucide-react';
import { ModeToggle } from '@/components/theme-toggle';

// --- SHARED COMPONENTS ---

const SectionHeader = ({ title, icon: Icon, color = "blue" }: { title: string, icon: any, color?: string }) => (
    <div className={`flex items-center gap-3 mb-8 border-b border-border pb-4`}>
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
            <span className="text-xs text-muted-foreground uppercase">{title || "Snippet"}</span>
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

const EvolutionEngine = () => {
    const [stage, setStage] = useState<'primitive' | 'struct' | 'class'>('primitive');

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Globe size={20} className="text-blue-500" /> Data Evolution Timeline
            </h3>

            <div className="flex gap-4 mb-8 justify-center">
                <button
                    onClick={() => setStage('primitive')}
                    className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${stage === 'primitive' ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'}`}
                >
                    1. Primitive (Arrays)
                </button>
                <ArrowRight size={16} className="text-muted-foreground" />
                <button
                    onClick={() => setStage('struct')}
                    className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${stage === 'struct' ? 'bg-purple-600 text-white' : 'bg-muted text-muted-foreground'}`}
                >
                    2. Structure (C)
                </button>
                <ArrowRight size={16} className="text-muted-foreground" />
                <button
                    onClick={() => setStage('class')}
                    className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${stage === 'class' ? 'bg-orange-600 text-white' : 'bg-muted text-muted-foreground'}`}
                >
                    3. Class (C++)
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <TheoryCard title={stage === 'primitive' ? "Loose Variables" : stage === 'struct' ? "Data Grouping" : "Encapsulation"} variant={stage === 'primitive' ? 'blue' : stage === 'struct' ? 'purple' : 'orange'}>
                        <p className="text-sm">
                            {stage === 'primitive' && "In early C, data was scattered. To store a student, you needed separate arrays for Names, IDs, and Marks. Hard to manage."}
                            {stage === 'struct' && "Structures grouped related data into a single package. But functions were still separate. Data was 'dumb'."}
                            {stage === 'class' && "Classes bundle Data + Functions together. They add security (Private), intelligence (Constructors), and inheritance."}
                        </p>
                    </TheoryCard>
                    <CodeBlock
                        title="Code Evolution"
                        code={
                            stage === 'primitive' ? `char names[100][50];\nint ids[100];\nfloat marks[100];` :
                                stage === 'struct' ? `struct Student {\n  char name[50];\n  int id;\n  float marks;\n};\n\nvoid print(struct Student s);` :
                                    `class Student {\nprivate:\n  int id;\npublic:\n  Student() { ... }\n  void print() { ... }\n};`
                        }
                    />
                </div>

                <div className="h-64 bg-muted rounded-xl border border-border relative flex items-center justify-center overflow-hidden">
                    {stage === 'primitive' && (
                        <div className="grid grid-cols-3 gap-2 animate-in zoom-in">
                            <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-500 p-2 rounded text-xs text-blue-600 dark:text-blue-300">Name[]</div>
                            <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-500 p-2 rounded text-xs text-blue-600 dark:text-blue-300">ID[]</div>
                            <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-500 p-2 rounded text-xs text-blue-600 dark:text-blue-300">Marks[]</div>
                        </div>
                    )}
                    {stage === 'struct' && (
                        <div className="bg-purple-100 dark:bg-purple-900/20 border-2 border-purple-500 p-4 rounded-xl flex flex-col gap-2 animate-in zoom-in">
                            <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase text-center mb-1">Struct</div>
                            <div className="bg-background/50 p-2 rounded text-xs text-muted-foreground">Name</div>
                            <div className="bg-background/50 p-2 rounded text-xs text-muted-foreground">ID</div>
                            <div className="bg-background/50 p-2 rounded text-xs text-muted-foreground">Marks</div>
                        </div>
                    )}
                    {stage === 'class' && (
                        <div className="bg-orange-100 dark:bg-orange-900/20 border-2 border-orange-500 p-4 rounded-xl flex flex-col gap-2 w-48 animate-in zoom-in shadow-2xl shadow-orange-500/10">
                            <div className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase text-center mb-1">Object</div>
                            <div className="border border-dashed border-red-500/50 p-2 rounded bg-red-100 dark:bg-red-900/10">
                                <div className="text-[10px] text-red-600 dark:text-red-400 uppercase font-bold mb-1">Private Data</div>
                                <div className="h-2 bg-slate-400 dark:bg-slate-700 rounded w-full mb-1"></div>
                                <div className="h-2 bg-slate-400 dark:bg-slate-700 rounded w-3/4"></div>
                            </div>
                            <div className="bg-green-100 dark:bg-green-900/20 border border-green-500/50 p-2 rounded text-center text-xs text-green-600 dark:text-green-400 font-bold">
                                Public Methods()
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AllocationShowdown = () => {
    const [lang, setLang] = useState<'C' | 'CPP'>('C');
    const [memory, setMemory] = useState<number[]>([]);

    const allocate = () => {
        setMemory(prev => [...prev, Math.floor(Math.random() * 100)]);
    };

    const clear = () => setMemory([]);

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Cpu size={20} className="text-green-500" /> Memory: malloc vs new
            </h3>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => { setLang('C'); clear(); }}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all border-2 ${lang === 'C' ? 'bg-slate-700 border-white text-white' : 'bg-muted border-border text-muted-foreground'}`}
                >
                    C Language (malloc/free)
                </button>
                <button
                    onClick={() => { setLang('CPP'); clear(); }}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all border-2 ${lang === 'CPP' ? 'bg-green-700 border-green-500 text-white' : 'bg-muted border-border text-muted-foreground'}`}
                >
                    C++ Language (new/delete)
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <CodeBlock
                        title={lang === 'C' ? "C Allocation" : "C++ Allocation"}
                        code={lang === 'C'
                            ? `int *p = (int*)malloc(sizeof(int));\n// Just raw memory.\nfree(p);`
                            : `int *p = new int(10);\n// 1. Allocates Memory\n// 2. Calls Constructor!\ndelete p;`}
                    />
                    <button
                        onClick={allocate}
                        className={`w-full mt-4 py-2 rounded-lg font-bold text-white transition-all active:scale-95 ${lang === 'C' ? 'bg-slate-600 hover:bg-slate-500' : 'bg-green-600 hover:bg-green-500'}`}
                    >
                        {lang === 'C' ? "Call malloc()" : "Call new (Construct)"}
                    </button>
                </div>

                <div className="bg-black p-4 rounded-xl border border-slate-800 min-h-[200px]">
                    <div className="text-xs text-slate-500 font-bold uppercase mb-4">Heap Visualizer</div>
                    <div className="flex flex-wrap gap-2">
                        {memory.map((m, i) => (
                            <div key={i} className={`w-12 h-12 flex items-center justify-center rounded font-bold border-2 animate-in zoom-in
                 ${lang === 'C' ? 'bg-slate-800 border-slate-600 text-slate-400' : 'bg-green-900/40 border-green-500 text-green-400'}
               `}>
                                {lang === 'C' ? '?' : m}
                            </div>
                        ))}
                    </div>
                    {memory.length > 0 && lang === 'C' && (
                        <div className="mt-4 text-xs text-slate-500 text-center italic">Malloc doesn't initialize values (Garbage).</div>
                    )}
                    {memory.length > 0 && lang === 'CPP' && (
                        <div className="mt-4 text-xs text-green-500 text-center font-bold">New calls Constructor (Values Initialized).</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const BankOS = () => {
    const [balance, setBalance] = useState(1000);
    const [logs, setLogs] = useState<string[]>([]);
    const [users, setUsers] = useState(1); // Static member simulation

    const action = (type: string, amt: number) => {
        if (type === 'deposit') {
            setBalance(b => b + amt);
            setLogs(l => [`[Account] Deposited $${amt}. New Bal: $${balance + amt}`, ...l]);
        } else {
            if (balance >= amt) {
                setBalance(b => b - amt);
                setLogs(l => [`[Account] Withdrew $${amt}. New Bal: $${balance - amt}`, ...l]);
            } else {
                setLogs(l => [`[Error] Insufficient funds for $${amt}`, ...l]);
            }
        }
    };

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-yellow-500" /> Capstone: BankOS (C++ Class)
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-xl border border-border font-mono text-sm">
                        <div className="text-purple-500">class <span className="text-yellow-500">BankAccount</span> {'{'}</div>
                        <div className="pl-4 text-red-500">private:</div>
                        <div className="pl-8 text-muted-foreground">double balance;</div>
                        <div className="pl-8 text-muted-foreground">static int totalUsers;</div>
                        <div className="pl-4 text-green-500">public:</div>
                        <div className="pl-8 text-muted-foreground">void deposit(double amt);</div>
                        <div className="pl-8 text-muted-foreground">void withdraw(double amt);</div>
                        <div className="text-purple-500">{'}'};</div>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => action('deposit', 100)} className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2">
                            <Plus size={14} /> Deposit $100
                        </button>
                        <button onClick={() => action('withdraw', 50)} className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2">
                            <ArrowRight size={14} /> Withdraw $50
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-black p-6 rounded-xl border border-slate-800 flex justify-between items-center shadow-2xl">
                        <div>
                            <div className="text-xs text-slate-500 uppercase font-bold">Current Balance</div>
                            <div className="text-4xl font-black text-white">${balance}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-slate-500 uppercase font-bold">Active Users</div>
                            <div className="text-xl font-mono text-yellow-400">{users}</div>
                            <div className="text-[9px] text-slate-600">Static Member</div>
                        </div>
                    </div>

                    <div className="h-32 bg-muted rounded-lg border border-border p-2 overflow-y-auto font-mono text-xs text-muted-foreground">
                        {logs.map((l, i) => <div key={i} className="mb-1 border-b border-border pb-1">{l}</div>)}
                        {logs.length === 0 && <div className="italic opacity-50">System Ready...</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ConceptMap = () => {
    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Layers size={20} className="text-pink-500" /> Final Concept Map
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { title: "Pointers", desc: "Memory Addresses", color: "border-blue-500 text-blue-500" },
                    { title: "Structs", desc: "Data Grouping", color: "border-purple-500 text-purple-500" },
                    { title: "Unions", desc: "Shared Memory", color: "border-orange-500 text-orange-500" },
                    { title: "Classes", desc: "Data + Logic", color: "border-green-500 text-green-500" },
                    { title: "Malloc", desc: "Raw Allocation", color: "border-slate-500 text-muted-foreground" },
                    { title: "New", desc: "Object Creation", color: "border-yellow-500 text-yellow-500" },
                    { title: "Static", desc: "Global Lifespan", color: "border-red-500 text-red-500" },
                    { title: "Streams", desc: "I/O Flow", color: "border-pink-500 text-pink-500" },
                ].map((item, i) => (
                    <div key={i} className={`p-4 rounded-xl border-2 bg-muted ${item.color}`}>
                        <div className="font-bold text-lg">{item.title}</div>
                        <div className="text-xs opacity-70 mt-1">{item.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture8Page() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32 transition-colors duration-300">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunitsLD/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-indigo-500/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Course Grand Finale</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 6 • Lecture 8</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Users size={14} /> Full Stack Developer
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-foreground dark:to-white">Complete</span> Picture
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        You have journeyed from binary bits and pointers to complex object-oriented systems.
                        This final lecture unites every concept into a cohesive whole.
                    </p>
                </div>

                {/* SECTION 1: EVOLUTION */}
                <section>
                    <SectionHeader title="The Evolution of Data" icon={Globe} color="blue" />
                    <EvolutionEngine />
                </section>

                {/* SECTION 2: MEMORY MANAGEMENT */}
                <section>
                    <SectionHeader title="Modern Memory Management" icon={Database} color="green" />
                    <p className="text-muted-foreground mb-8">
                        The biggest leap from C to C++ is how we handle memory. `malloc` gave us space; `new` gives us living objects.
                    </p>
                    <AllocationShowdown />
                </section>

                {/* SECTION 3: CAPSTONE PROJECT */}
                <section>
                    <SectionHeader title="Final Project: BankOS" icon={Briefcase} color="yellow" />
                    <TheoryCard title="Architecture" variant="yellow">
                        <p className="text-sm text-muted-foreground">
                            This system uses <strong>Encapsulation</strong> (private balance), <strong>Static Members</strong> (user tracking),
                            and <strong>Member Functions</strong> to modify state safely.
                        </p>
                    </TheoryCard>
                    <BankOS />
                </section>

                {/* SECTION 4: SUMMARY */}
                <section>
                    <SectionHeader title="Syllabus Mastery Map" icon={CheckCircle} color="purple" />
                    <ConceptMap />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Completed</p>
            </footer>
        </div>
    );
}
