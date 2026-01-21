"use client";

import React, { useState, useEffect } from 'react';
import {
    Box,
    Layers,
    Code,
    ArrowRight,
    Shield,
    Users,
    Zap,
    Database,
    Globe,
    Layout,
    Terminal,
    Cpu,
    Lock,
    Unlock
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
            <span className="text-xs text-muted-foreground uppercase">{title || "C++ Snippet"}</span>
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

const ParadigmShifter = () => {
    const [mode, setMode] = useState<'pop' | 'oop'>('pop');

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Layout size={20} className="text-blue-500" /> Paradigm Shift: C vs C++
            </h3>

            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setMode('pop')}
                    className={`px-6 py-3 rounded-lg font-bold transition-all border-2 ${mode === 'pop' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-muted border-border text-muted-foreground'}`}
                >
                    Procedural (C)
                </button>
                <button
                    onClick={() => setMode('oop')}
                    className={`px-6 py-3 rounded-lg font-bold transition-all border-2 ${mode === 'oop' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-muted border-border text-muted-foreground'}`}
                >
                    Object-Oriented (C++)
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <TheoryCard title={mode === 'pop' ? "Focus: Functions" : "Focus: Objects"} variant={mode === 'pop' ? 'blue' : 'purple'}>
                        {mode === 'pop' ? (
                            <p>
                                In <strong>Procedural Programming</strong>, data and functions are separate.
                                Data moves freely and functions operate on it passively. Security is low.
                            </p>
                        ) : (
                            <p>
                                In <strong>OOP</strong>, data and functions are bundled into <strong>Objects</strong>.
                                Data is hidden (private) and can only be accessed via the object's own functions.
                            </p>
                        )}
                    </TheoryCard>
                    <CodeBlock
                        title={mode === 'pop' ? "struct_example.c" : "class_example.cpp"}
                        code={mode === 'pop'
                            ? `struct Student {\n  char name[20];\n  int marks;\n};\n\nvoid print(struct Student s) {\n  printf("%d", s.marks);\n}`
                            : `class Student {\nprivate:\n  int marks;\npublic:\n  void print() {\n    cout << marks;\n  }\n};`}
                    />
                </div>

                {/* Visualization */}
                <div className="h-64 bg-slate-900 rounded-xl border border-slate-800 relative flex items-center justify-center overflow-hidden">
                    {mode === 'pop' ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Scattered Data */}
                            <div className="absolute top-4 left-4 bg-green-900/30 border border-green-500 p-2 rounded text-green-300 text-xs">Data: Marks</div>
                            <div className="absolute bottom-4 right-4 bg-green-900/30 border border-green-500 p-2 rounded text-green-300 text-xs">Data: Name</div>

                            {/* Free Functions */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 p-4 rounded-full text-white font-bold text-sm shadow-lg z-10">
                                Function()
                            </div>

                            {/* Arrows */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
                                <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
                            </svg>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            {/* Objects */}
                            {[1, 2].map(i => (
                                <div key={i} className="bg-purple-900/20 border-2 border-purple-500 rounded-xl p-4 flex flex-col gap-2 w-32 animate-in zoom-in">
                                    <div className="text-center text-purple-300 font-bold text-xs uppercase border-b border-purple-500/30 pb-2">Object {i}</div>
                                    <div className="bg-black/50 p-2 rounded text-[10px] text-slate-400 flex items-center gap-1">
                                        <Lock size={10} className="text-red-400" /> Data
                                    </div>
                                    <div className="bg-purple-600 p-2 rounded text-[10px] text-white font-bold text-center">
                                        Function()
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StreamStudio = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const handleInput = (e: any) => {
        if (e.key === 'Enter') {
            setOutput(prev => prev + "\n" + input);
            setInput("");
        }
    };

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Terminal size={20} className="text-green-500" /> I/O Streams (cin & cout)
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <TheoryCard title="Stream Abstraction" variant="green">
                        <p className="text-sm">
                            C uses functions (<code>printf</code>). C++ uses <strong>Streams</strong> (<code>cout</code>).
                            Think of data flowing like water through pipes using the insertion (<code>{'<<'}</code>) and extraction (<code>{'>>'}</code>) operators.
                        </p>
                    </TheoryCard>
                    <div className="space-y-2">
                        <div className="bg-muted p-3 rounded border border-border flex items-center gap-2 font-mono text-sm">
                            <span className="text-blue-500">cout</span>
                            <span className="text-yellow-500">{'<<'}</span>
                            <span className="text-orange-500">"Hello"</span>
                            <span className="text-yellow-500">{'<<'}</span>
                            <span className="text-blue-500">endl</span>;
                        </div>
                        <div className="bg-muted p-3 rounded border border-border flex items-center gap-2 font-mono text-sm">
                            <span className="text-blue-500">cin</span>
                            <span className="text-yellow-500">{'>>'}</span>
                            <span className="text-foreground">variable</span>;
                        </div>
                    </div>
                </div>

                <div className="bg-black p-4 rounded-xl border border-slate-800 font-mono text-sm h-64 flex flex-col">
                    <div className="flex-1 overflow-y-auto text-slate-300 whitespace-pre-wrap">
                        <span className="text-green-400">user@cpp:~$</span> ./program
                        <br />
                        Enter data: {output}
                    </div>
                    <div className="mt-2 flex items-center gap-2 border-t border-slate-800 pt-2">
                        <span className="text-blue-500">{'>>'}</span>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleInput}
                            className="bg-transparent outline-none text-white w-full"
                            placeholder="Type & Enter..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ClassArchitect = () => {
    const [access, setAccess] = useState<'public' | 'private'>('private');
    const [objects, setObjects] = useState<{ id: number, val: number }[]>([]);

    const createObject = () => {
        setObjects([...objects, { id: Date.now() + Math.random(), val: Math.floor(Math.random() * 100) }]);
    };

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Box size={20} className="text-orange-500" /> Class Architect
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-xl border border-border font-mono text-sm">
                        <div className="text-purple-500">class <span className="text-yellow-500">Box</span> {'{'}</div>

                        <div className="my-2 group cursor-pointer" onClick={() => setAccess(access === 'public' ? 'private' : 'public')}>
                            <span className={`font-bold ${access === 'private' ? 'text-red-500' : 'text-green-500'}`}>
                                {access}:
                            </span>
                            <span className="text-muted-foreground text-xs ml-2">// Click to toggle</span>
                            <div className="pl-4 text-foreground">int data;</div>
                        </div>

                        <div className="text-green-500">public:</div>
                        <div className="pl-4 text-foreground">void setData(int d) {'{ ... }'}</div>
                        <div className="text-purple-500">{'}'};</div>
                    </div>

                    <button
                        onClick={createObject}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                    >
                        <Box size={18} /> Instantiate Object
                    </button>
                </div>

                <div className="bg-muted p-4 rounded-xl border border-border min-h-[200px]">
                    <div className="text-xs font-bold text-muted-foreground uppercase mb-4">Memory Heap</div>
                    <div className="flex flex-wrap gap-4">
                        {objects.map(obj => (
                            <div key={obj.id} className="bg-card p-3 rounded-lg border border-border w-32 relative animate-in zoom-in">
                                <div className="text-xs text-orange-500 font-bold mb-2">Box Object</div>
                                <div className="bg-muted p-2 rounded flex items-center justify-between border border-border">
                                    <span className="text-muted-foreground text-xs">data</span>
                                    <span className="text-foreground font-mono">{obj.val}</span>
                                </div>
                                {access === 'private' && (
                                    <div className="absolute inset-0 bg-red-900/80 rounded-lg flex items-center justify-center backdrop-blur-sm border border-red-500">
                                        <div className="text-center text-white">
                                            <Lock size={20} className="mx-auto mb-1" />
                                            <span className="text-[10px] font-bold uppercase">Private</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {objects.length === 0 && <div className="text-muted-foreground text-sm italic w-full text-center mt-10">No objects created yet.</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StaticVisualizer = () => {
    const [count, setCount] = useState(0);
    const [instances, setInstances] = useState([1, 2, 3]);

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Users size={20} className="text-yellow-500" /> Static Members (Shared Data)
            </h3>

            <div className="flex flex-col items-center gap-8">
                {/* Static Memory Area */}
                <div className="bg-yellow-100 dark:bg-yellow-900/20 border-2 border-yellow-500 p-4 rounded-xl text-center w-64 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                    <div className="text-xs text-yellow-600 dark:text-yellow-500 font-bold uppercase mb-2">Static Memory (Class Level)</div>
                    <div className="text-4xl font-black text-yellow-600 dark:text-white mb-2">{count}</div>
                    <div className="text-xs text-muted-foreground font-mono">static int sharedCount;</div>
                    <div className="flex gap-2 justify-center mt-4">
                        <button onClick={() => setCount(c => c + 1)} className="bg-yellow-500 text-white px-3 py-1 rounded font-bold hover:bg-yellow-600">+</button>
                        <button onClick={() => setCount(0)} className="bg-slate-700 text-white px-3 py-1 rounded font-bold hover:bg-slate-600">Reset</button>
                    </div>
                </div>

                {/* Instances */}
                <div className="flex flex-wrap gap-4 justify-center">
                    {instances.map(id => (
                        <div key={id} className="bg-muted border border-border p-4 rounded-lg w-40 relative">
                            <div className="text-xs text-blue-500 font-bold mb-2">Object {id}</div>

                            <div className="space-y-2">
                                <div className="bg-card p-2 rounded flex justify-between items-center border border-border">
                                    <span className="text-[10px] text-muted-foreground">myID</span>
                                    <span className="text-foreground font-mono text-sm">{id}</span>
                                </div>

                                {/* Pointer to Static */}
                                <div className="bg-yellow-100 dark:bg-yellow-900/10 border border-yellow-500/30 p-2 rounded flex justify-between items-center relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                        <ArrowRight className="-rotate-90" size={32} />
                                    </div>
                                    <span className="text-[10px] text-yellow-600 dark:text-yellow-200">sharedCount</span>
                                    <span className="text-yellow-600 dark:text-yellow-400 font-mono text-sm font-bold">{count}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
                <strong>Insight:</strong> Changing the static variable affects <strong>all</strong> objects instantly because they all look at the same memory address for that specific variable.
            </div>
        </div>
    );
};

const ComparisonTable = () => {
    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Shield size={20} className="text-red-500" /> The Great Comparison
            </h3>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-muted-foreground">
                    <thead className="bg-muted text-xs uppercase font-bold text-muted-foreground">
                        <tr>
                            <th className="px-4 py-3">Feature</th>
                            <th className="px-4 py-3 text-blue-500">Structure (C)</th>
                            <th className="px-4 py-3 text-purple-500">Class (C++)</th>
                            <th className="px-4 py-3 text-orange-500">Union</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        <tr className="hover:bg-muted/50">
                            <td className="px-4 py-3 font-bold">Default Access</td>
                            <td className="px-4 py-3 text-green-500">Public</td>
                            <td className="px-4 py-3 text-red-500">Private</td>
                            <td className="px-4 py-3 text-green-500">Public</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                            <td className="px-4 py-3 font-bold">Memory</td>
                            <td className="px-4 py-3">Sum of members</td>
                            <td className="px-4 py-3">Sum of members</td>
                            <td className="px-4 py-3 text-yellow-500">Largest member</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                            <td className="px-4 py-3 font-bold">Functions?</td>
                            <td className="px-4 py-3 text-red-500">No (Pointers only)</td>
                            <td className="px-4 py-3 text-green-500">Yes (Methods)</td>
                            <td className="px-4 py-3 text-red-500">No</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                            <td className="px-4 py-3 font-bold">Usage</td>
                            <td className="px-4 py-3">Data Grouping</td>
                            <td className="px-4 py-3">Data + Logic (OOP)</td>
                            <td className="px-4 py-3">Memory Saving</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Unit6CPPPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32 transition-colors duration-300">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunitsLD/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-purple-500/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Introduction to C++</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 6 • OOP Basics</p>
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
                        <Globe size={14} /> Object Oriented Programming
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        The Shift to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-foreground dark:to-white">Objects</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        C was about functions and procedures. C++ introduces <strong>Objects</strong>: living entities that hold both data and the logic to manipulate it.
                    </p>
                </div>

                {/* SECTION 1: PARADIGM SHIFT */}
                <section>
                    <SectionHeader title="Procedural vs OOP" icon={Layout} color="blue" />
                    <ParadigmShifter />
                </section>

                {/* SECTION 2: I/O STREAMS */}
                <section>
                    <SectionHeader title="Input/Output Streams" icon={Terminal} color="green" />
                    <p className="text-muted-foreground mb-8">
                        Goodbye `printf`, Hello `cout`. C++ abstracts I/O into "Streams" allowing for type-safe and extensible input/output.
                    </p>
                    <StreamStudio />
                </section>

                {/* SECTION 3: CLASSES & OBJECTS */}
                <section>
                    <SectionHeader title="Classes & Access Control" icon={Box} color="orange" />
                    <TheoryCard title="The Class Blueprint" variant="orange">
                        <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                            <li><strong>Class:</strong> A user-defined data type (like a super-struct).</li>
                            <li><strong>Object:</strong> An instance of a class.</li>
                            <li><strong>Access Specifiers:</strong>
                                <ul className="list-disc pl-4 mt-1 text-xs text-muted-foreground">
                                    <li><code className="text-green-500">public:</code> Accessible from anywhere.</li>
                                    <li><code className="text-red-500">private:</code> Accessible ONLY inside the class.</li>
                                </ul>
                            </li>
                        </ul>
                    </TheoryCard>
                    <ClassArchitect />
                </section>

                {/* SECTION 4: MEMBER FUNCTIONS */}
                <section>
                    <SectionHeader title="Member Functions" icon={Cpu} color="purple" />
                    <div className="grid md:grid-cols-2 gap-8">
                        <TheoryCard title="Inline Functions" variant="purple">
                            <p className="text-sm">
                                Functions defined <strong>inside</strong> the class body are automatically "Inline". The compiler replaces the call with the actual code (faster, larger).
                            </p>
                            <CodeBlock title="Inline" code={`class A {\n  void fun() { ... } \n};`} />
                        </TheoryCard>
                        <TheoryCard title="Non-Inline Functions" variant="blue">
                            <p className="text-sm">
                                Defined <strong>outside</strong> using the Scope Resolution Operator `::`. Standard function call mechanism.
                            </p>
                            <CodeBlock title="Outside" code={`void A::fun() {\n  ...\n}`} />
                        </TheoryCard>
                    </div>
                </section>

                {/* SECTION 5: STATIC MEMBERS */}
                <section>
                    <SectionHeader title="Static Members" icon={Users} color="yellow" />
                    <TheoryCard title="Shared Memory" variant="yellow">
                        <p className="text-sm">
                            A <code>static</code> variable inside a class does not belong to any single object. It belongs to the <strong>Class</strong> itself. All objects share this one variable.
                        </p>
                    </TheoryCard>
                    <StaticVisualizer />
                </section>

                {/* SECTION 6: COMPARISON */}
                <section>
                    <SectionHeader title="Struct vs Union vs Class" icon={Shield} color="red" />
                    <ComparisonTable />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 6 • C++ Basics</p>
            </footer>
        </div>
    );
}
