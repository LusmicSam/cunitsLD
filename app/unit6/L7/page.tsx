"use client";

import React, { useState, useEffect } from 'react';
import {
    Box,
    RefreshCw,
    Trash2,
    Layers,
    GitBranch,
    Settings,
    Play,
    Package,
    Plus,
    Minus,
    Archive,
    Code
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

const LifecycleMonitor = () => {
    const [objects, setObjects] = useState<{ id: number, type: string, status: 'born' | 'alive' | 'dying' }[]>([]);
    const [log, setLog] = useState<string[]>([]);

    const createObject = (type: string) => {
        const id = Date.now();
        setObjects(prev => [...prev, { id, type, status: 'born' }]);
        setLog(prev => [`[CTOR] ${type} created (ID: ${id % 1000})`, ...prev]);

        // Animate to alive
        setTimeout(() => {
            setObjects(prev => prev.map(o => o.id === id ? { ...o, status: 'alive' } : o));
        }, 500);
    };

    const destroyObject = (id: number, type: string) => {
        setObjects(prev => prev.map(o => o.id === id ? { ...o, status: 'dying' } : o));
        setLog(prev => [`[DTOR] ${type} destroyed (ID: ${id % 1000})`, ...prev]);

        // Remove after animation
        setTimeout(() => {
            setObjects(prev => prev.filter(o => o.id !== id));
        }, 1000);
    };

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <RefreshCw size={20} className="text-green-500" /> Lifecycle Monitor (Constructors)
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => createObject('Player')}
                            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-transform active:scale-95 text-xs"
                        >
                            new Player()
                        </button>
                        <button
                            onClick={() => createObject('Enemy')}
                            className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition-transform active:scale-95 text-xs"
                        >
                            new Enemy()
                        </button>
                    </div>

                    <CodeBlock title="Class Definition" code={`class Entity {\npublic:\n  Entity() { cout << "Born"; }\n  ~Entity() { cout << "Died"; }\n};`} />

                    <div className="bg-black p-3 rounded-lg border border-slate-800 h-40 overflow-y-auto font-mono text-xs">
                        {log.map((l, i) => (
                            <div key={i} className={`mb-1 ${l.includes('CTOR') ? 'text-green-400' : 'text-red-400'}`}>
                                {l}
                            </div>
                        ))}
                        {log.length === 0 && <span className="text-slate-600">// Console Output...</span>}
                    </div>
                </div>

                <div className="bg-muted p-4 rounded-xl border border-border relative min-h-[300px]">
                    <div className="absolute top-2 right-2 text-[10px] font-bold text-muted-foreground uppercase">Scope Area</div>
                    <div className="flex flex-col gap-3 mt-4">
                        {objects.map(obj => (
                            <div
                                key={obj.id}
                                className={`p-3 rounded-lg border flex justify-between items-center transition-all duration-500
                  ${obj.status === 'born' ? 'bg-green-100 dark:bg-green-500/20 border-green-500 scale-90 opacity-0' : ''}
                  ${obj.status === 'alive' ? 'bg-card border-border scale-100 opacity-100' : ''}
                  ${obj.status === 'dying' ? 'bg-red-100 dark:bg-red-900/20 border-red-500 scale-90 opacity-0' : ''}
                `}
                            >
                                <div className="flex items-center gap-2">
                                    <Box size={16} className={obj.type === 'Player' ? 'text-blue-500' : 'text-red-500'} />
                                    <span className="text-sm font-bold text-foreground">{obj.type} <span className="text-[10px] text-muted-foreground">#{obj.id % 1000}</span></span>
                                </div>
                                <button
                                    onClick={() => destroyObject(obj.id, obj.type)}
                                    className="text-muted-foreground hover:text-red-500 transition-colors"
                                    title="Destroy (Go out of scope)"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        {objects.length === 0 && (
                            <div className="h-full flex items-center justify-center text-muted-foreground italic">
                                Scope Empty
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const OverloadOracle = () => {
    const [active, setActive] = useState<number | null>(null);

    const functions = [
        { id: 1, sig: "print()", desc: "No arguments" },
        { id: 2, sig: "print(int i)", desc: "Integer argument" },
        { id: 3, sig: "print(double f)", desc: "Floating point argument" },
        { id: 4, sig: "print(char* s)", desc: "String argument" },
    ];

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <GitBranch size={20} className="text-purple-500" /> The Overload Oracle
            </h3>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-2">Click a call to match it to a definition:</div>

                    <button
                        onClick={() => setActive(1)}
                        className={`w-full p-3 rounded-lg text-left font-mono text-sm border transition-all ${active === 1 ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-500 text-purple-600 dark:text-purple-300' : 'bg-muted border-border text-muted-foreground hover:border-slate-400'}`}
                    >
                        obj.print();
                    </button>
                    <button
                        onClick={() => setActive(2)}
                        className={`w-full p-3 rounded-lg text-left font-mono text-sm border transition-all ${active === 2 ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-300' : 'bg-muted border-border text-muted-foreground hover:border-slate-400'}`}
                    >
                        obj.print(42);
                    </button>
                    <button
                        onClick={() => setActive(3)}
                        className={`w-full p-3 rounded-lg text-left font-mono text-sm border transition-all ${active === 3 ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-500 text-orange-600 dark:text-orange-300' : 'bg-muted border-border text-muted-foreground hover:border-slate-400'}`}
                    >
                        obj.print(3.14);
                    </button>
                    <button
                        onClick={() => setActive(4)}
                        className={`w-full p-3 rounded-lg text-left font-mono text-sm border transition-all ${active === 4 ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-600 dark:text-green-300' : 'bg-muted border-border text-muted-foreground hover:border-slate-400'}`}
                    >
                        obj.print("Hello");
                    </button>
                </div>

                <div className="bg-black p-6 rounded-xl border border-slate-800 relative min-h-[250px] flex flex-col justify-center gap-4">
                    <div className="absolute top-2 left-2 text-[10px] font-bold text-slate-500 uppercase">Function Definitions</div>

                    {functions.map(f => (
                        <div
                            key={f.id}
                            className={`p-3 rounded border font-mono text-sm transition-all duration-300 
                ${active === f.id
                                    ? 'bg-slate-800 border-white scale-105 shadow-xl opacity-100'
                                    : 'bg-slate-900/50 border-slate-800 opacity-40 blur-[1px]'
                                }
              `}
                        >
                            <span className="text-yellow-400">void</span> {f.sig} {'{'} ... {'}'}
                            {active === f.id && (
                                <div className="text-[10px] text-slate-400 mt-1 font-sans">{f.desc}</div>
                            )}
                        </div>
                    ))}

                    {!active && <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm">Select a call...</div>}
                </div>
            </div>
        </div>
    );
};

const DefaultArgLab = () => {
    const [width, setWidth] = useState<number | undefined>(undefined);
    const [height, setHeight] = useState<number | undefined>(undefined);

    // Logic: Default width=10, height=20
    const finalW = width !== undefined ? width : 10;
    const finalH = height !== undefined ? height : 20;

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Settings size={20} className="text-yellow-500" /> Default Arguments
            </h3>

            <div className="mb-6 bg-muted p-3 rounded-lg border border-border text-center">
                <code className="text-sm font-mono text-muted-foreground">
                    void resize(<span className="text-blue-500">int w = 10</span>, <span className="text-purple-500">int h = 20</span>);
                </code>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div>
                        <label className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase mb-2">
                            <span>Width Argument</span>
                            <span className={width !== undefined ? "text-blue-500" : "text-muted-foreground"}>{width !== undefined ? "Provided" : "Missing"}</span>
                        </label>
                        <div className="flex gap-2">
                            <button onClick={() => setWidth(50)} className={`flex-1 py-2 rounded text-xs font-bold border ${width === 50 ? 'bg-blue-600 text-white border-blue-500' : 'bg-muted border-border text-muted-foreground'}`}>Pass 50</button>
                            <button onClick={() => setWidth(undefined)} className={`flex-1 py-2 rounded text-xs font-bold border ${width === undefined ? 'bg-slate-600 text-white border-slate-500' : 'bg-muted border-border text-muted-foreground'}`}>Don't Pass</button>
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase mb-2">
                            <span>Height Argument</span>
                            <span className={height !== undefined ? "text-purple-500" : "text-muted-foreground"}>{height !== undefined ? "Provided" : "Missing"}</span>
                        </label>
                        <div className="flex gap-2">
                            <button onClick={() => setHeight(80)} className={`flex-1 py-2 rounded text-xs font-bold border ${height === 80 ? 'bg-purple-600 text-white border-purple-500' : 'bg-muted border-border text-muted-foreground'}`}>Pass 80</button>
                            <button onClick={() => setHeight(undefined)} className={`flex-1 py-2 rounded text-xs font-bold border ${height === undefined ? 'bg-slate-600 text-white border-slate-500' : 'bg-muted border-border text-muted-foreground'}`}>Don't Pass</button>
                        </div>
                    </div>

                    <div className="p-3 bg-black rounded border border-slate-800 font-mono text-sm text-center">
                        Function Call: <br />
                        <span className="text-yellow-400">resize(
                            {width !== undefined ? width : ""}
                            {width !== undefined && height !== undefined ? ", " : ""}
                            {height !== undefined ? height : ""}
                            );</span>
                    </div>
                </div>

                <div className="flex items-center justify-center bg-muted rounded-xl border border-border relative">
                    <div
                        className="bg-yellow-500/20 border-2 border-yellow-500 rounded flex items-center justify-center text-yellow-500 font-bold transition-all duration-500 relative"
                        style={{ width: `${finalW * 2}px`, height: `${finalH * 2}px` }}
                    >
                        {finalW}x{finalH}

                        {/* Origin Indicators */}
                        {width === undefined && (
                            <div className="absolute -top-6 left-0 text-[10px] text-blue-400 bg-blue-900/20 px-1 rounded">Default W</div>
                        )}
                        {height === undefined && (
                            <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-[10px] text-purple-400 bg-purple-900/20 px-1 rounded">Default H</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const InventorySystem = () => {
    const [items, setItems] = useState<{ name: string, qty: number }[]>([]);
    const [logs, setLogs] = useState<string[]>([]);

    const addItem = (name: string, qty: number = 1) => {
        setItems(prev => {
            const existing = prev.find(i => i.name === name);
            if (existing) {
                setLogs(l => [`Updated ${name}: ${existing.qty} -> ${existing.qty + qty}`, ...l]);
                return prev.map(i => i.name === name ? { ...i, qty: i.qty + qty } : i);
            }
            setLogs(l => [`[CTOR] Created new Item: ${name} (${qty})`, ...l]);
            return [...prev, { name, qty }];
        });
    };

    const removeItem = (name: string) => {
        setItems(prev => {
            const exists = prev.find(i => i.name === name);
            if (exists) setLogs(l => [`[DTOR] Destroyed Item: ${name}`, ...l]);
            return prev.filter(i => i.name !== name);
        });
    };

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Archive size={20} className="text-blue-500" /> Capstone: Inventory Manager
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-xl border border-border">
                        <div className="text-xs font-bold text-muted-foreground uppercase mb-3">Control Panel</div>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => addItem("Potion")} className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-500/50 p-2 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-900/50">
                                Add Potion (Default 1)
                            </button>
                            <button onClick={() => addItem("Potion", 5)} className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-500/50 p-2 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-900/50">
                                Add Potion (x5)
                            </button>
                            <button onClick={() => addItem("Sword")} className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 border border-purple-500/50 p-2 rounded text-xs hover:bg-purple-200 dark:hover:bg-purple-900/50">
                                Add Sword (Default 1)
                            </button>
                            <button onClick={() => addItem("Shield")} className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 border border-orange-500/50 p-2 rounded text-xs hover:bg-orange-200 dark:hover:bg-orange-900/50">
                                Add Shield (Default 1)
                            </button>
                        </div>

                        <div className="mt-4 pt-4 border-t border-border">
                            <div className="text-xs font-bold text-muted-foreground uppercase mb-2">System Log</div>
                            <div className="h-32 overflow-y-auto font-mono text-[10px] text-muted-foreground space-y-1">
                                {logs.map((l, i) => (
                                    <div key={i}>{l}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-background p-4 rounded-xl border border-border min-h-[300px]">
                    <div className="text-xs font-bold text-muted-foreground uppercase mb-4">Inventory Storage</div>
                    <div className="space-y-2">
                        {items.map(item => (
                            <div key={item.name} className="flex items-center justify-between p-3 bg-muted rounded border border-border animate-in slide-in-from-right">
                                <div className="flex items-center gap-3">
                                    <Package size={16} className="text-muted-foreground" />
                                    <span className="text-foreground font-bold text-sm">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-black px-2 py-1 rounded text-xs text-green-400 font-mono">x{item.qty}</div>
                                    <button onClick={() => removeItem(item.name)} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        ))}
                        {items.length === 0 && <div className="text-center text-muted-foreground italic mt-10">Inventory Empty</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture7Page() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32 transition-colors duration-300">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunitsLD/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-purple-500/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Object Lifecycle & Overloading</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 6 • Lecture 7</p>
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
                        <Settings size={14} /> Advanced Features
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-foreground dark:to-white">Intelligence</span> of Objects
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Objects aren't just data structures; they have a lifecycle. They are born (Constructors), they adapt (Overloading), and they die (Destructors).
                    </p>
                </div>

                {/* SECTION 1: LIFECYCLE */}
                <section>
                    <SectionHeader title="Object Lifecycle" icon={RefreshCw} color="green" />
                    <TheoryCard title="Constructors & Destructors" variant="green">
                        <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                            <li><strong>Constructor:</strong> A special method with the same name as the class. Called automatically when an object is created. Used for initialization.</li>
                            <li><strong>Destructor:</strong> Same name with a `~` prefix. Called automatically when an object goes out of scope. Used for cleanup.</li>
                        </ul>
                    </TheoryCard>
                    <LifecycleMonitor />
                </section>

                {/* SECTION 2: OVERLOADING */}
                <section>
                    <SectionHeader title="Function Overloading" icon={GitBranch} color="purple" />
                    <p className="text-muted-foreground mb-8">
                        C++ allows multiple functions to share the same name as long as their **signatures** (parameter types/counts) are different. This is called Compile-Time Polymorphism.
                    </p>
                    <OverloadOracle />
                </section>

                {/* SECTION 3: DEFAULT ARGUMENTS */}
                <section>
                    <SectionHeader title="Default Arguments" icon={Settings} color="yellow" />
                    <TheoryCard title="Optional Parameters" variant="yellow">
                        <p className="text-sm">
                            You can provide default values for function parameters. If the caller omits them, the default is used.
                            <br /><br />
                            <strong>Rule:</strong> Default arguments must be trailing (at the end of the list).
                        </p>
                    </TheoryCard>
                    <DefaultArgLab />
                </section>

                {/* SECTION 4: CAPSTONE */}
                <section>
                    <SectionHeader title="Capstone: Inventory System" icon={Archive} color="blue" />
                    <p className="text-muted-foreground mb-8">
                        Putting it all together: A class-based system using constructors for item creation, destructors for removal, and overloading for flexible "Add" commands.
                    </p>
                    <InventorySystem />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 6 • Lecture 7</p>
            </footer>
        </div>
    );
}
