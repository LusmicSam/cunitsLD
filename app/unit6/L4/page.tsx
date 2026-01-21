"use client";

import React, { useState, useEffect } from 'react';
import {
    Hash,
    Replace,
    ToggleLeft,
    Zap,
    ShieldCheck,
    FileCode,
    AlertTriangle,
    Settings,
    Code,
    Layers,
    ArrowRight,
    CheckCircle,
    Scissors,
    FileText
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
        yellow: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10',
        pink: 'border-pink-500 bg-pink-50 dark:bg-pink-900/10'
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

const SubstitutionEngine = () => {
    const [stage, setStage] = useState<'source' | 'preprocessed'>('source');

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Replace size={20} className="text-blue-500" /> Substitution Engine
            </h3>

            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setStage('source')}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${stage === 'source' ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'}`}
                >
                    Source Code (.c)
                </button>
                <div className="flex items-center text-muted-foreground"><ArrowRight size={20} /></div>
                <button
                    onClick={() => setStage('preprocessed')}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${stage === 'preprocessed' ? 'bg-green-600 text-white' : 'bg-muted text-muted-foreground'}`}
                >
                    Preprocessed Code
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-xl border border-border">
                        <div className="text-xs text-muted-foreground uppercase font-bold mb-2">Definitions</div>
                        <code className="block text-purple-600 dark:text-purple-400">#define PI 3.14</code>
                        <code className="block text-purple-600 dark:text-purple-400">#define MAX 100</code>
                        <code className="block text-purple-600 dark:text-purple-400">#define SQ(x) ((x)*(x))</code>
                    </div>
                </div>

                <div className="relative bg-black/5 dark:bg-black/40 p-4 rounded-xl border border-border min-h-[150px] flex items-center justify-center">
                    {stage === 'source' ? (
                        <div className="font-mono text-sm text-foreground animate-in fade-in">
                            float area = <span className="text-purple-600 dark:text-purple-400 font-bold">PI</span> * r * r;<br />
                            if (val &gt; <span className="text-purple-600 dark:text-purple-400 font-bold">MAX</span>) break;<br />
                            int y = <span className="text-purple-600 dark:text-purple-400 font-bold">SQ(5+1)</span>;
                        </div>
                    ) : (
                        <div className="font-mono text-sm text-green-600 dark:text-green-300 animate-in zoom-in">
                            float area = <span className="text-foreground font-bold bg-muted px-1 rounded">3.14</span> * r * r;<br />
                            if (val &gt; <span className="text-foreground font-bold bg-muted px-1 rounded">100</span>) break;<br />
                            int y = <span className="text-foreground font-bold bg-muted px-1 rounded">((5+1)*(5+1))</span>;
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ConditionalLab = () => {
    const [debug, setDebug] = useState(true);
    const [os, setOs] = useState<'WIN' | 'LINUX'>('WIN');

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <ToggleLeft size={20} className="text-orange-500" /> Conditional Compilation
            </h3>

            <div className="flex flex-wrap gap-6 mb-8 justify-center">
                <div className="flex items-center gap-2 bg-muted p-2 rounded-lg border border-border">
                    <span className="text-xs font-bold text-muted-foreground">#define DEBUG</span>
                    <button
                        onClick={() => setDebug(!debug)}
                        className={`w-10 h-5 rounded-full p-1 transition-colors ${debug ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                        <div className={`w-3 h-3 bg-white rounded-full shadow transform transition-transform ${debug ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </button>
                </div>

                <div className="flex items-center gap-2 bg-muted p-2 rounded-lg border border-border">
                    <span className="text-xs font-bold text-muted-foreground">Target OS</span>
                    <div className="flex bg-black/10 dark:bg-black rounded p-1">
                        <button onClick={() => setOs('WIN')} className={`px-3 py-1 rounded text-xs font-bold ${os === 'WIN' ? 'bg-blue-600 text-white' : 'text-muted-foreground'}`}>WINDOWS</button>
                        <button onClick={() => setOs('LINUX')} className={`px-3 py-1 rounded text-xs font-bold ${os === 'LINUX' ? 'bg-orange-600 text-white' : 'text-muted-foreground'}`}>LINUX</button>
                    </div>
                </div>
            </div>

            <div className="bg-black/5 dark:bg-black/40 p-6 rounded-xl border border-border font-mono text-sm">
                <div className="text-muted-foreground">void setup() {'{'}</div>

                {/* OS Logic */}
                <div className="pl-4 my-2 border-l-2 border-blue-500/30">
                    <div className="text-purple-600 dark:text-purple-400">#ifdef WINDOWS</div>
                    {os === 'WIN' ? (
                        <div className="text-green-600 dark:text-green-400 font-bold pl-4">init_windows_api();</div>
                    ) : (
                        <div className="text-muted-foreground/50 pl-4 decoration-line-through">init_windows_api();</div>
                    )}
                    <div className="text-purple-600 dark:text-purple-400">#else</div>
                    {os === 'LINUX' ? (
                        <div className="text-green-600 dark:text-green-400 font-bold pl-4">init_linux_kernel();</div>
                    ) : (
                        <div className="text-muted-foreground/50 pl-4 decoration-line-through">init_linux_kernel();</div>
                    )}
                    <div className="text-purple-600 dark:text-purple-400">#endif</div>
                </div>

                {/* Debug Logic */}
                <div className="pl-4 my-2 border-l-2 border-green-500/30">
                    <div className="text-purple-600 dark:text-purple-400">#ifdef DEBUG</div>
                    {debug ? (
                        <div className="text-orange-500 dark:text-orange-400 font-bold pl-4">printf("Log: System Starting...\n");</div>
                    ) : (
                        <div className="text-muted-foreground/50 pl-4 decoration-line-through">printf("Log: System Starting...\n");</div>
                    )}
                    <div className="text-purple-600 dark:text-purple-400">#endif</div>
                </div>

                <div className="text-muted-foreground">{'}'}</div>
            </div>
        </div>
    );
};

const MacroVsFunc = () => {
    const [mode, setMode] = useState<'macro' | 'func'>('macro');

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Zap size={20} className="text-yellow-500" /> Macro vs Function: The Showdown
            </h3>

            <div className="flex gap-4 mb-8 justify-center">
                <button onClick={() => setMode('macro')} className={`px-6 py-2 rounded-lg font-bold border transition-all ${mode === 'macro' ? 'bg-yellow-600 border-yellow-400 text-white' : 'bg-muted border-border text-muted-foreground'}`}>Macro (Speed)</button>
                <button onClick={() => setMode('func')} className={`px-6 py-2 rounded-lg font-bold border transition-all ${mode === 'func' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-muted border-border text-muted-foreground'}`}>Function (Safety)</button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <TheoryCard title={mode === 'macro' ? "Text Substitution" : "Stack Frame Call"} variant={mode === 'macro' ? 'yellow' : 'blue'}>
                        {mode === 'macro' ? (
                            <ul className="text-xs list-disc pl-4 space-y-1">
                                <li><strong>Pros:</strong> No call overhead. Faster execution. Generic types.</li>
                                <li><strong>Cons:</strong> Code bloat (replaces every instance). No type checking. Side effects (e.g., <code>SQ(i++)</code> fails).</li>
                            </ul>
                        ) : (
                            <ul className="text-xs list-disc pl-4 space-y-1">
                                <li><strong>Pros:</strong> Type safe. Easy to debug. No side effect surprises.</li>
                                <li><strong>Cons:</strong> Slower (push/pop stack). Fixed types.</li>
                            </ul>
                        )}
                    </TheoryCard>
                    <CodeBlock
                        title="Definition"
                        code={mode === 'macro' ? '#define MAX(a,b) ((a)>(b)?(a):(b))' : 'int max(int a, int b) {\n  return a > b ? a : b;\n}'}
                    />
                </div>

                <div className="bg-muted rounded-xl p-6 border border-border flex items-center justify-center h-48 relative overflow-hidden">
                    {mode === 'macro' ? (
                        <div className="text-center animate-in zoom-in">
                            <div className="text-yellow-600 dark:text-yellow-400 font-bold text-lg mb-2">INLINE EXPANSION</div>
                            <div className="text-muted-foreground text-xs">Code is pasted directly.</div>
                            <Zap size={48} className="mx-auto mt-4 text-yellow-500 animate-pulse" />
                        </div>
                    ) : (
                        <div className="text-center animate-in slide-in-from-right">
                            <div className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-2">STACK JUMP</div>
                            <div className="text-muted-foreground text-xs">Push Params &rarr; Jump &rarr; Return</div>
                            <Layers size={48} className="mx-auto mt-4 text-blue-500" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const IncludeGuard = () => {
    const [guarded, setGuarded] = useState(false);

    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <ShieldCheck size={20} className="text-green-500" /> The Include Guard
            </h3>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm font-bold text-muted-foreground">Protection:</span>
                        <button
                            onClick={() => setGuarded(!guarded)}
                            className={`px-3 py-1 rounded text-xs font-bold transition-colors ${guarded ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                        >
                            {guarded ? "GUARD ON (#ifndef)" : "GUARD OFF"}
                        </button>
                    </div>

                    <div className="bg-muted p-4 rounded-xl border border-border relative">
                        <div className="absolute -top-3 left-4 bg-muted px-2 text-[10px] font-bold text-muted-foreground">myheader.h</div>
                        <code className="block text-sm text-purple-600 dark:text-purple-400 opacity-50">#include "myheader.h"</code>
                        <code className="block text-sm text-purple-600 dark:text-purple-400 opacity-50 mb-2">#include "myheader.h"</code>

                        <div className={`p-2 rounded border ${guarded ? 'bg-green-100 dark:bg-green-900/10 border-green-500/50' : 'bg-red-100 dark:bg-red-900/10 border-red-500/50'}`}>
                            {guarded && <div className="text-green-600 dark:text-green-400 font-bold text-xs mb-1">#ifndef HEADER_H</div>}
                            {guarded && <div className="text-green-600 dark:text-green-400 font-bold text-xs mb-1">#define HEADER_H</div>}
                            <div className="text-foreground text-sm">struct Data {'{'} int x; {'}'};</div>
                            {guarded && <div className="text-green-600 dark:text-green-400 font-bold text-xs mt-1">#endif</div>}
                        </div>
                    </div>
                </div>

                <div className="bg-black/5 dark:bg-black/40 p-6 rounded-xl border border-border flex flex-col items-center justify-center text-center h-48">
                    {guarded ? (
                        <div className="animate-in fade-in">
                            <CheckCircle size={48} className="text-green-500 mx-auto mb-2" />
                            <h4 className="text-green-600 dark:text-green-400 font-bold">Compilation Successful</h4>
                            <p className="text-xs text-muted-foreground mt-2">Header included only once. Skipped the second time.</p>
                        </div>
                    ) : (
                        <div className="animate-in shake">
                            <AlertTriangle size={48} className="text-red-500 mx-auto mb-2" />
                            <h4 className="text-red-600 dark:text-red-400 font-bold">Redefinition Error!</h4>
                            <p className="text-xs text-muted-foreground mt-2">"struct Data" defined twice. Compiler halts.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AdvancedMacros = () => {
    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Scissors size={20} className="text-pink-500" /> Advanced Tricks: Stringification & Concatenation
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <TheoryCard title="Stringification (#)" variant="pink">
                        <p className="text-sm mb-2">The <code>#</code> operator converts a macro argument into a string literal.</p>
                        <CodeBlock title="Debug Helper" code={'#define PRINT_INT(x) printf(#x " = %d\\n", x)\n\nint a = 5;\nPRINT_INT(a); // Output: a = 5'} />
                    </TheoryCard>
                </div>
                <div>
                    <TheoryCard title="Token Pasting (##)" variant="pink">
                        <p className="text-sm mb-2">The <code>##</code> operator concatenates two tokens into one.</p>
                        <CodeBlock title="Variable Generator" code={'#define VAR(name, n) name##n\n\nint VAR(x, 1) = 100; // int x1 = 100;\nint VAR(x, 2) = 200; // int x2 = 200;'} />
                    </TheoryCard>
                </div>
            </div>
        </div>
    );
};

const StandardMacros = () => {
    return (
        <div className="bg-card p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <FileText size={20} className="text-blue-500" /> Standard Predefined Macros
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { name: "_DATE_", desc: "Current date as string" },
                    { name: "_TIME_", desc: "Current time as string" },
                    { name: "_FILE_", desc: "Current filename" },
                    { name: "_LINE_", desc: "Current line number" }
                ].map((m, i) => (
                    <div key={i} className="bg-muted p-4 rounded-xl border border-border text-center hover:border-blue-500 transition-colors">
                        <code className="text-blue-600 dark:text-blue-300 font-bold block mb-2">{m.name}</code>
                        <p className="text-muted-foreground text-xs">{m.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture4Page() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32 transition-colors duration-300">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunitsLD/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-500/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">The Preprocessor</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 6 • Lecture 4</p>
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
                        <Hash size={14} /> Meta-Programming
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        The Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-foreground dark:from-blue-400 dark:via-cyan-400 dark:to-white">Before</span> The Code
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        The Preprocessor runs before the compiler. It's a text-replacement engine that gives you power over how your code is built.
                    </p>
                </div>

                {/* SECTION 1: MACROS */}
                <section>
                    <SectionHeader title="Macro Substitution" icon={Replace} color="blue" />
                    <TheoryCard title="The #define Directive" variant="blue">
                        <p className="mb-2">A macro is a fragment of code which has been given a name. Whenever the name is used, it is replaced by the contents of the macro.</p>
                        <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                            <li><strong>Object-like:</strong> <code>#define PI 3.14</code> (Constant substitution).</li>
                            <li><strong>Function-like:</strong> <code>#define SQ(x) ((x)*(x))</code> (Logic substitution).</li>
                        </ul>
                    </TheoryCard>
                    <SubstitutionEngine />
                </section>

                {/* SECTION 2: CONDITIONAL COMPILATION */}
                <section>
                    <SectionHeader title="Conditional Compilation" icon={ToggleLeft} color="orange" />
                    <p className="text-muted-foreground mb-8">
                        You can selectively include or exclude blocks of code from being compiled using <code>#ifdef</code>, <code>#else</code>, and <code>#endif</code>.
                    </p>
                    <ConditionalLab />
                </section>

                {/* SECTION 3: MACROS VS FUNCTIONS */}
                <section>
                    <SectionHeader title="Macros vs Functions" icon={Settings} color="yellow" />
                    <MacroVsFunc />
                </section>

                {/* SECTION 4: HEADER GUARDS */}
                <section>
                    <SectionHeader title="Header Guards" icon={ShieldCheck} color="green" />
                    <p className="text-muted-foreground mb-8">
                        Prevent "Multiple Definition" errors when a header file is included more than once (e.g., nested includes).
                    </p>
                    <IncludeGuard />
                </section>

                {/* SECTION 5: ADVANCED & STANDARD */}
                <section>
                    <SectionHeader title="Advanced Preprocessor Features" icon={Scissors} color="pink" />
                    <AdvancedMacros />
                    <StandardMacros />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 6 • Lecture 4</p>
            </footer>
        </div>
    );
}
