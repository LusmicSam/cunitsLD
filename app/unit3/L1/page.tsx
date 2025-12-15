"use client";

import React, { useState, useEffect } from 'react';
import {
    Box,
    Layers,
    ArrowRight,
    Play,
    Settings,
    Code,
    CheckCircle,
    AlertTriangle,
    CornerDownRight,
    Cpu,
    Braces,
    FileCode,
    GitCommit,
    RotateCcw,
    Package,
    Pause,
    MousePointer,
    XCircle
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

const AnatomyLab = () => {
    const [hovered, setHovered] = useState<string | null>(null);

    const parts: Record<string, { label: string; desc: string }> = {
        returnType: {
            label: "Return Type",
            desc: "Data type of the value sent back to the caller (e.g., int, float, void)."
        },
        name: {
            label: "Function Name",
            desc: "Unique identifier for the function. Follows variable naming rules."
        },
        params: {
            label: "Parameters",
            desc: "Input values the function needs to do its job. Also called arguments."
        },
        body: {
            label: "Body",
            desc: "The block of code that executes when the function is called."
        },
        returnStmt: {
            label: "Return Statement",
            desc: "Stops execution and sends the result back."
        }
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Cpu size={20} className="text-blue-600 dark:text-blue-400" /> Anatomy of a Function
            </h3>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="font-mono text-lg bg-muted/50 p-6 rounded-xl border border-border relative">
                    <div
                        className={`inline-block cursor-pointer transition-colors ${hovered === 'returnType' ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded px-1' : 'text-purple-600 dark:text-purple-400'}`}
                        onMouseEnter={() => setHovered('returnType')}
                        onMouseLeave={() => setHovered(null)}
                    >
                        int
                    </div>
                    &nbsp;
                    <div
                        className={`inline-block cursor-pointer transition-colors ${hovered === 'name' ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded px-1' : 'text-yellow-600 dark:text-yellow-400'}`}
                        onMouseEnter={() => setHovered('name')}
                        onMouseLeave={() => setHovered(null)}
                    >
                        addNumbers
                    </div>
                    <div
                        className={`inline-block cursor-pointer transition-colors ${hovered === 'params' ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded px-1' : 'text-muted-foreground'}`}
                        onMouseEnter={() => setHovered('params')}
                        onMouseLeave={() => setHovered(null)}
                    >
                        (int a, int b)
                    </div>
                    &nbsp;{'{'}
                    <div
                        className={`pl-4 py-2 transition-colors ${hovered === 'body' ? 'bg-blue-100 dark:bg-blue-900/10' : ''}`}
                        onMouseEnter={() => setHovered('body')}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <div className="text-muted-foreground">// Calculate sum</div>
                        <div className="text-foreground">int result = a + b;</div>
                        <div
                            className={`inline-block cursor-pointer transition-colors ${hovered === 'returnStmt' ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded px-1' : 'text-purple-600 dark:text-purple-400'}`}
                            onMouseEnter={() => setHovered('returnStmt')}
                            onMouseLeave={() => setHovered(null)}
                        >
                            return result;
                        </div>
                    </div>
                    {'}'}
                </div>

                <div className="h-48 flex flex-col justify-center">
                    {hovered && parts[hovered] ? (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 bg-card p-4 rounded-xl border border-blue-500/30 shadow-lg">
                            <h4 className="text-blue-600 dark:text-blue-400 font-bold mb-2 flex items-center gap-2">
                                <Settings size={16} /> {parts[hovered].label}
                            </h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {parts[hovered].desc}
                            </p>
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <MousePointer className="mx-auto mb-2 opacity-50" size={32} />
                            <p>Hover over code parts to analyze them.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const FunctionFlow = () => {
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Steps: 
    // 0: Start Main
    // 1: Call Function
    // 2: Jump to Function
    // 3: Execute Logic
    // 4: Return Value
    // 5: Back to Main (Assign)
    // 6: Print Result

    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setStep(s => {
                    if (s >= 6) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return s + 1;
                });
            }, 1500);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const activeLineClass = "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-200 border-l-2 border-yellow-500 pl-2 transition-all duration-300";

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <GitCommit size={20} className="text-purple-600 dark:text-purple-400" /> Execution Flow Simulator
                </h3>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all ${isPlaying ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
                >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    {isPlaying ? 'Pause' : 'Visualize Jump'}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative">
                {/* Main Function */}
                <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${step === 0 || step === 1 || step === 5 || step === 6 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' : 'border-border bg-muted/50 opacity-50'}`}>
                    <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase">Caller (Main)</div>
                    <div className="font-mono text-sm space-y-2 text-foreground">
                        <div className={step === 0 ? activeLineClass : "pl-2"}>int main() {'{'}</div>
                        <div className="pl-4 text-muted-foreground">int x = 5, y = 10;</div>
                        <div className={step === 1 || step === 5 ? activeLineClass : "pl-4"}>
                            int sum = <span className="font-bold text-purple-600 dark:text-purple-400">add(x, y);</span>
                        </div>
                        <div className={step === 6 ? activeLineClass : "pl-4"}>printf("%d", sum);</div>
                        <div className="pl-2">{'}'}</div>
                    </div>
                </div>

                {/* Arrow Animation */}
                {(step === 1 || step === 2) && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-bounce">
                        <ArrowRight size={32} className="text-purple-500" />
                    </div>
                )}
                {(step === 4 || step === 5) && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-bounce rotate-180">
                        <ArrowRight size={32} className="text-green-500" />
                    </div>
                )}

                {/* Called Function */}
                <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${step >= 2 && step <= 4 ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10' : 'border-border bg-muted/50 opacity-50'}`}>
                    <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-2 uppercase">Callee (Add)</div>
                    <div className="font-mono text-sm space-y-2 text-foreground">
                        <div className={step === 2 ? activeLineClass : "pl-2"}>int add(int a, int b) {'{'}</div>
                        <div className={step === 3 ? activeLineClass : "pl-4"}>int res = a + b;</div>
                        <div className={step === 4 ? activeLineClass : "pl-4"}>
                            <span className="font-bold text-green-600 dark:text-green-400">return res;</span>
                        </div>
                        <div className="pl-2">{'}'}</div>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground bg-muted p-2 rounded border border-border">
                Status: <span className="text-foreground font-bold">
                    {step === 0 && "Program starts in main()."}
                    {step === 1 && "Main calls add(). Execution pauses here."}
                    {step === 2 && "Control jumps to add(). Arguments passed."}
                    {step === 3 && "Function body executes. (5 + 10 = 15)"}
                    {step === 4 && "Function returns 15 to caller."}
                    {step === 5 && "Main resumes. 'sum' becomes 15."}
                    {step === 6 && <span className="text-green-600 dark:text-green-400">Output: 15</span>}
                </span>
            </div>
        </div>
    );
};

const ThreePillars = () => {
    const [active, setActive] = useState<'proto' | 'call' | 'def'>('proto');

    const content = {
        proto: {
            title: "1. Declaration (Prototype)",
            code: "float calculateArea(float r);",
            desc: "Tells the compiler: 'Hey, I will use a function named calculateArea later. It takes a float and returns a float.' This must happen BEFORE main()."
        },
        call: {
            title: "2. Function Call",
            code: "area = calculateArea(5.0);",
            desc: "Using the function inside main(). The arguments (5.0) are copied to the function parameters."
        },
        def: {
            title: "3. Definition",
            code: "float calculateArea(float r) {\n  return 3.14 * r * r;\n}",
            desc: "The actual logic. Can be placed AFTER main() only if a prototype exists."
        }
    };

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Layers size={20} className="text-green-600 dark:text-green-400" /> The Three Pillars
            </h3>

            <div className="flex gap-2 mb-6 overflow-x-auto">
                {(Object.keys(content) as Array<'proto' | 'call' | 'def'>).map(k => (
                    <button
                        key={k}
                        onClick={() => setActive(k)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${active === k ? 'bg-green-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                    >
                        {content[k].title}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2">
                <div className="bg-muted/30 p-4 rounded-xl border border-border flex items-center justify-center">
                    <code className="text-green-600 dark:text-green-400 font-mono text-sm whitespace-pre">{content[active].code}</code>
                </div>
                <div className="flex flex-col justify-center">
                    <h4 className="text-green-600 dark:text-green-400 font-bold mb-2">{content[active].title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{content[active].desc}</p>
                </div>
            </div>
        </div>
    );
};

const FunctionFactory = () => {
    const [retType, setRetType] = useState("void");
    const [name, setName] = useState("myFunc");
    const [param1, setParam1] = useState("int x");
    const [logic, setLogic] = useState("// do something");
    const [error, setError] = useState<string | null>(null);

    // Validation Logic
    useEffect(() => {
        // 1. Name Validation
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
            setError("Invalid Name: Must start with letter/underscore, no spaces.");
            return;
        }

        // 2. Void Return Validation
        if (retType === "void" && logic.includes("return x")) {
            setError("Error: Void functions cannot return a value.");
            return;
        }

        // 3. Non-Void Return Validation
        if (retType !== "void" && !logic.includes("return") && !logic.includes("//")) {
            setError(`Warning: Function returning '${retType}' needs a return statement.`);
            return;
        }

        setError(null);
    }, [name, retType, logic]);

    return (
        <div className="bg-card/50 p-6 rounded-xl border border-border my-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Package size={20} className="text-orange-500 dark:text-orange-400" /> Function Factory
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-muted-foreground font-bold uppercase block mb-1">Return Type</label>
                        <div className="flex gap-2">
                            {['void', 'int', 'float', 'char'].map(t => (
                                <button key={t} onClick={() => setRetType(t)} className={`px-3 py-1 rounded text-xs font-bold border transition-all ${retType === t ? 'bg-orange-600 text-white border-orange-500' : 'bg-muted text-muted-foreground border-border'}`}>{t}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground font-bold uppercase block mb-1">Name</label>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className={`bg-background border rounded p-2 text-foreground w-full font-mono text-sm focus:outline-none focus:ring-2 ${error && error.includes("Name") ? 'border-red-500 ring-red-500/20' : 'border-border focus:ring-orange-500'}`}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground font-bold uppercase block mb-1">Logic</label>
                        <select onChange={e => setLogic(e.target.value)} className="bg-background border border-border rounded p-2 text-foreground w-full font-mono text-sm">
                            <option value="// do something">Empty</option>
                            <option value={'printf("Hello");'}>Print Hello</option>
                            <option value="return x * 2;">Return Double</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className={`bg-muted/30 p-4 rounded-xl border relative transition-colors duration-300 ${error ? 'border-red-500/50' : 'border-border'}`}>
                        <span className="absolute top-2 right-2 text-[10px] text-muted-foreground uppercase font-bold">Preview.c</span>
                        <div className="font-mono text-sm text-foreground">
                            <span className="text-blue-600 dark:text-blue-400">{retType}</span> <span className="text-yellow-600 dark:text-yellow-400">{name}</span>(<span className="text-purple-600 dark:text-purple-400">{param1}</span>) {'{'}<br />
                            &nbsp;&nbsp;{logic}<br />
                            {'}'}
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-100 dark:bg-red-900/20 border border-red-500/50 p-3 rounded-lg flex items-start gap-2 animate-in slide-in-from-top-2">
                            <XCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                            <p className="text-xs text-red-600 dark:text-red-200 font-bold">{error}</p>
                        </div>
                    )}
                    {!error && (
                        <div className="bg-green-100 dark:bg-green-900/20 border border-green-500/50 p-3 rounded-lg flex items-center gap-2 animate-in fade-in">
                            <CheckCircle size={16} className="text-green-500 shrink-0" />
                            <p className="text-xs text-green-600 dark:text-green-200 font-bold">Valid Function Definition</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture1Page() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunitsLD/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Modular Programming</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 3 • Lecture 1</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 border border-blue-500/30 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Box size={14} /> Modular Design
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-foreground dark:from-blue-400 dark:via-purple-400 dark:to-white">Building Blocks</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Stop writing 500-line <code>main()</code> functions. Learn to break your code into reusable, clean, and efficient *Functions*.
                    </p>
                </div>

                {/* SECTION 1: ANATOMY */}
                <section>
                    <SectionHeader title="Anatomy of a Function" icon={Braces} color="blue" />

                    <TheoryCard title="What is a Function?" variant="blue">
                        <p className="mb-4">
                            A function is a self-contained block of code that performs a specific task. Think of it as a *mini-program* within your program.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 text-xs">
                            <div className="bg-muted/50 p-3 rounded border border-border">
                                <strong className="text-blue-600 dark:text-blue-400 block mb-1">Reusability</strong>
                                Write once, use many times.
                            </div>
                            <div className="bg-muted/50 p-3 rounded border border-border">
                                <strong className="text-purple-600 dark:text-purple-400 block mb-1">Modularity</strong>
                                Break complex problems into small pieces.
                            </div>
                            <div className="bg-muted/50 p-3 rounded border border-border">
                                <strong className="text-green-600 dark:text-green-400 block mb-1">Abstraction</strong>
                                Hide complex logic behind a simple name.
                            </div>
                        </div>
                    </TheoryCard>

                    <AnatomyLab />
                </section>

                {/* SECTION 2: THE THREE PILLARS */}
                <section>
                    <SectionHeader title="The Lifecycle: Declare, Define, Call" icon={GitCommit} color="green" />
                    <p className="text-muted-foreground mb-8">
                        To use a function in C, you typically need three parts. If you define the function before main(), the prototype is optional but recommended.
                    </p>
                    <ThreePillars />
                </section>

                {/* SECTION 3: EXECUTION FLOW */}
                <section>
                    <SectionHeader title="Visualizing Control Flow" icon={Play} color="purple" />
                    <p className="text-muted-foreground mb-8">
                        When a function is called, the program "pauses" the current function (like main), jumps to the called function, runs it, and then "resumes" exactly where it left off.
                    </p>
                    <FunctionFlow />
                </section>

                {/* SECTION 4: BUILDER */}
                <section>
                    <SectionHeader title="The Function Factory" icon={Package} color="orange" />
                    <p className="text-muted-foreground mb-8">
                        Experiment with different return types and parameters to see valid C syntax.
                    </p>
                    <FunctionFactory />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 3 • Lecture 1</p>
            </footer>
        </div>
    );
}
