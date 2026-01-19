"use client";

import React, { useState, useEffect } from 'react';
import {
    Zap,
    ArrowRight,
    List,
    LayoutList,
    Cpu,
    Settings,
    Database,
    Check,
    X,
    FileCode,
    Braces,
    TrafficCone
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

const InlineVisualizer = () => {
    const [isInline, setIsInline] = useState(false);

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Zap size={20} className="text-yellow-500" /> The Inline Engine
            </h3>

            <div className="flex items-center gap-4 mb-8 bg-muted p-4 rounded-lg border border-border">
                <span className="text-sm font-bold text-muted-foreground">Function Type:</span>
                <button
                    onClick={() => setIsInline(!isInline)}
                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-2 ${isInline ? 'bg-yellow-500 text-white' : 'bg-slate-700 text-white dark:bg-slate-800'}`}
                >
                    {isInline ? <Check size={14} /> : <X size={14} />}
                    {isInline ? "Inline (Expansion)" : "Normal (Function Call)"}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Source Code */}
                <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold mb-2">C++ Source</div>
                    <div className="bg-muted p-4 rounded-lg border border-border font-mono text-sm">
                        <div className={`${isInline ? 'text-yellow-500 font-bold' : 'text-muted-foreground'}`}>
                            {isInline ? "inline " : ""}void printMsg() {'{'}
                        </div>
                        <div className="pl-4 text-green-500">cout &lt;&lt; "Hello";</div>
                        <div>{'}'}</div>
                        <br />
                        <div>int main() {'{'}</div>
                        <div className="pl-4 text-blue-500">printMsg();</div>
                        <div>{'}'}</div>
                    </div>
                </div>

                {/* Compiled Behavior */}
                <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold mb-2">Compiled Logic (Abstract)</div>
                    <div className="bg-black p-4 rounded-lg border border-slate-800 font-mono text-sm relative overflow-hidden h-40 flex flex-col justify-center">
                        {isInline ? (
                            <div className="animate-in zoom-in duration-300">
                                <div className="text-slate-500">int main() {'{'}</div>
                                <div className="pl-4 text-green-400 font-bold bg-green-900/20 p-1 rounded border border-green-500/30">
                                    cout &lt;&lt; "Hello"; <span className="text-xs text-slate-400 ml-2">// Copied body</span>
                                </div>
                                <div className="text-slate-500">{'}'}</div>
                            </div>
                        ) : (
                            <div className="animate-in slide-in-from-left duration-300">
                                <div className="text-slate-500">int main() {'{'}</div>
                                <div className="pl-4 text-blue-400 font-bold flex items-center gap-2">
                                    CALL 0x4002 <ArrowRight size={14} />
                                </div>
                                <div className="text-slate-500">{'}'}</div>
                                <div className="mt-2 border-t border-slate-800 pt-2 text-xs text-slate-600">
                                    0x4002: <span className="text-green-400">cout &lt;&lt; "Hello";</span> RET;
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const EnumTraffic = () => {
    const [light, setLight] = useState<'RED' | 'YELLOW' | 'GREEN'>('RED');

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <TrafficCone size={20} className="text-orange-500" /> Enumerations (enum)
            </h3>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <CodeBlock
                        title="Enum Definition"
                        code={`enum TrafficLight {\n  RED = 0,\n  YELLOW = 1,\n  GREEN = 2\n};\n\nTrafficLight current = ${light};`}
                    />

                    <div className="flex gap-2 mt-4">
                        {['RED', 'YELLOW', 'GREEN'].map(c => (
                            <button
                                key={c}
                                onClick={() => setLight(c as any)}
                                className={`flex-1 py-2 rounded font-bold text-xs transition-all border-b-4 active:border-b-0 active:translate-y-1
                   ${c === 'RED' ? 'bg-red-600 border-red-800 text-white' : ''}
                   ${c === 'YELLOW' ? 'bg-yellow-500 border-yellow-700 text-black' : ''}
                   ${c === 'GREEN' ? 'bg-green-600 border-green-800 text-white' : ''}
                   ${light === c ? 'brightness-110 shadow-lg' : 'opacity-50'}
                 `}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center bg-black p-6 rounded-xl border border-slate-800">
                    <div className="bg-slate-800 p-3 rounded-2xl border-4 border-slate-600 flex flex-col gap-3 shadow-2xl">
                        <div className={`w-12 h-12 rounded-full border-2 border-black transition-all duration-300 ${light === 'RED' ? 'bg-red-500 shadow-[0_0_20px_#ef4444]' : 'bg-red-900/20'}`}></div>
                        <div className={`w-12 h-12 rounded-full border-2 border-black transition-all duration-300 ${light === 'YELLOW' ? 'bg-yellow-400 shadow-[0_0_20px_#eab308]' : 'bg-yellow-900/20'}`}></div>
                        <div className={`w-12 h-12 rounded-full border-2 border-black transition-all duration-300 ${light === 'GREEN' ? 'bg-green-500 shadow-[0_0_20px_#22c55e]' : 'bg-green-900/20'}`}></div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="text-xs text-slate-500 uppercase font-bold">Integer Value</div>
                        <div className="text-2xl font-mono text-white">
                            {light === 'RED' ? 0 : light === 'YELLOW' ? 1 : 2}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ScopeResolution = () => {
    const [method, setMethod] = useState<'inside' | 'outside'>('outside');

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Settings size={20} className="text-purple-500" /> Scope Resolution (::)
            </h3>

            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setMethod('inside')}
                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-all border ${method === 'inside' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-muted border-border text-muted-foreground'}`}
                >
                    Inside Class (Inline)
                </button>
                <button
                    onClick={() => setMethod('outside')}
                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-all border ${method === 'outside' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-muted border-border text-muted-foreground'}`}
                >
                    Outside Class (::)
                </button>
            </div>

            <div className="relative bg-muted p-6 rounded-xl border border-border font-mono text-sm">
                <div className="text-purple-500">class <span className="text-yellow-500">Demo</span> {'{'}</div>
                <div className="pl-4 text-green-500">public:</div>

                {method === 'inside' ? (
                    <div className="pl-8 animate-in fade-in">
                        <span className="text-blue-500">void display()</span> {'{'}<br />
                        &nbsp;&nbsp;<span className="text-muted-foreground">cout &lt;&lt; "Hi";</span><br />
                        {'}'}
                    </div>
                ) : (
                    <div className="pl-8 animate-in fade-in">
                        <span className="text-blue-500">void display();</span> <span className="text-muted-foreground">// Declaration only</span>
                    </div>
                )}

                <div className="text-purple-500">{'}'};</div>

                {method === 'outside' && (
                    <div className="mt-4 pt-4 border-t border-border animate-in slide-in-from-bottom-2">
                        <span className="text-muted-foreground">// Definition outside class</span><br />
                        <span className="text-blue-500">void</span> <span className="text-yellow-500">Demo</span><span className="text-red-500">::</span><span className="text-blue-500">display()</span> {'{'}<br />
                        &nbsp;&nbsp;<span className="text-muted-foreground">cout &lt;&lt; "Hi";</span><br />
                        {'}'}
                    </div>
                )}
            </div>

            <div className="mt-4 text-center text-xs text-muted-foreground">
                {method === 'outside'
                    ? "The :: operator tells the compiler that 'display' belongs to the 'Demo' class."
                    : "Functions defined inside are implicitly treated as inline."}
            </div>
        </div>
    );
};

const ObjectArray = () => {
    const [students, setStudents] = useState([
        { id: 1, name: "Alex" },
        { id: 2, name: "Ben" },
        { id: 3, name: "Clara" }
    ]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Database size={20} className="text-blue-500" /> Array of Objects
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <CodeBlock title="C++ Syntax" code={`class Student {\n  int id;\n  string name;\n  // ...\n};\n\n// Array of 3 Objects\nStudent list[3];`} />
                    <p className="text-xs text-muted-foreground mt-2">
                        Just like arrays of ints or structs, you can create arrays of Class Objects.
                        They are stored contiguously in memory.
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground font-bold uppercase mb-1 px-1">
                        <span>Index</span>
                        <span>Object Data</span>
                    </div>
                    {students.map((s, i) => (
                        <div
                            key={s.id}
                            className={`flex items-center p-3 rounded-lg border-2 transition-all cursor-pointer
                 ${activeIndex === i ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 scale-105' : 'bg-muted border-border hover:border-slate-400 dark:hover:border-slate-600'}
               `}
                            onMouseEnter={() => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <div className="w-8 h-8 rounded bg-background flex items-center justify-center font-bold text-muted-foreground mr-4 border border-border font-mono">
                                [{i}]
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-blue-500 font-bold">Student Object</div>
                                <div className="text-xs text-muted-foreground font-mono">id: {s.id}, name: "{s.name}"</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const FeatureComparison = () => {
    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <LayoutList size={20} className="text-green-500" /> Ultimate Comparison
            </h3>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-muted-foreground">
                    <thead className="bg-muted text-xs uppercase font-bold text-muted-foreground">
                        <tr>
                            <th className="px-4 py-3">Property</th>
                            <th className="px-4 py-3 text-blue-500">Structure</th>
                            <th className="px-4 py-3 text-orange-500">Union</th>
                            <th className="px-4 py-3 text-yellow-500">Enumeration</th>
                            <th className="px-4 py-3 text-purple-500">Class</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        <tr className="hover:bg-muted/50">
                            <td className="px-4 py-3 font-bold">Concept</td>
                            <td className="px-4 py-3">Group of Variables</td>
                            <td className="px-4 py-3">Shared Memory</td>
                            <td className="px-4 py-3">Named Constants</td>
                            <td className="px-4 py-3">Data + Functions</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                            <td className="px-4 py-3 font-bold">Keyword</td>
                            <td className="px-4 py-3 font-mono">struct</td>
                            <td className="px-4 py-3 font-mono">union</td>
                            <td className="px-4 py-3 font-mono">enum</td>
                            <td className="px-4 py-3 font-mono">class</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                            <td className="px-4 py-3 font-bold">Memory</td>
                            <td className="px-4 py-3">Sum of members</td>
                            <td className="px-4 py-3">Largest member</td>
                            <td className="px-4 py-3">int size (4B)</td>
                            <td className="px-4 py-3">Sum of members</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                            <td className="px-4 py-3 font-bold">Default Access</td>
                            <td className="px-4 py-3 text-green-500">Public</td>
                            <td className="px-4 py-3 text-green-500">Public</td>
                            <td className="px-4 py-3 text-green-500">Public</td>
                            <td className="px-4 py-3 text-red-500">Private</td>
                        </tr>
                    </tbody>
                </table>
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
                        <h1 className="font-bold text-foreground text-sm leading-tight">Advanced Mechanics</h1>
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
                        <Cpu size={14} /> Language Features
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        Under the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-foreground dark:to-white">Hood</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Understanding how C++ handles member placement, memory, and constants distinguishes a coder from an engineer.
                    </p>
                </div>

                {/* SECTION 1: INLINE FUNCTIONS */}
                <section>
                    <SectionHeader title="Inline Functions" icon={Zap} color="yellow" />
                    <TheoryCard title="The Speed Trade-off" variant="yellow">
                        <p className="text-sm">
                            The <code>inline</code> keyword suggests the compiler to insert the function's body directly at the call site.
                            <br /><br />
                            <strong>Benefit:</strong> No function call overhead (stack push/pop).
                            <br />
                            <strong>Cost:</strong> Increases binary size (Code Bloat).
                        </p>
                    </TheoryCard>
                    <InlineVisualizer />
                </section>

                {/* SECTION 2: SCOPE RESOLUTION */}
                <section>
                    <SectionHeader title="Scope Resolution" icon={Settings} color="purple" />
                    <p className="text-muted-foreground mb-8">
                        Defining functions inside the class keeps it self-contained, but defining them outside keeps the header file clean. The <code>::</code> operator connects them.
                    </p>
                    <ScopeResolution />
                </section>

                {/* SECTION 3: ENUMS */}
                <section>
                    <SectionHeader title="Enumerations" icon={List} color="orange" />
                    <TheoryCard title="Named Constants" variant="orange">
                        <p className="text-sm">
                            Enums make code readable. Instead of passing <code>0</code>, <code>1</code>, or <code>2</code>,
                            you pass <code>RED</code>, <code>YELLOW</code>, or <code>GREEN</code>. Internally, they are still integers.
                        </p>
                    </TheoryCard>
                    <EnumTraffic />
                </section>

                {/* SECTION 4: OBJECT ARRAYS */}
                <section>
                    <SectionHeader title="Array of Objects" icon={Database} color="blue" />
                    <p className="text-muted-foreground mb-8">
                        You can create arrays of objects just like primitive types. Each element in the array is a full object with its own data members.
                    </p>
                    <ObjectArray />
                </section>

                {/* SECTION 5: COMPARISON */}
                <section>
                    <SectionHeader title="Data Types Face-off" icon={LayoutList} color="green" />
                    <FeatureComparison />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 6 • C++ Advanced</p>
            </footer>
        </div>
    );
}
