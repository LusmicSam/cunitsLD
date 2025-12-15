"use client";

import React, { useState, useEffect } from 'react';
import {
    Box,
    Type,
    Terminal,
    ArrowRight,
    Lock,
    Cpu,
    Keyboard,
    Monitor,
    AlertTriangle,
    CheckCircle,
    Hash,
    Info,
    X,
    Minimize2,
    Maximize2,
    BookOpen,
    Layout,
    Table,
    RefreshCw
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

const CodeBlock = ({ code, language = 'c' }: { code: string, language?: string }) => (
    <div className="bg-card rounded-lg overflow-hidden border border-border my-4 shadow-xl font-mono text-sm w-full">
        <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-xs text-muted-foreground uppercase">{language}</span>
        </div>
        <div className="p-4 text-muted-foreground overflow-x-auto whitespace-pre">
            {code}
        </div>
    </div>
);

// --- INTERACTIVE COMPONENTS ---

const VariableVisualizer = () => {
    const [step, setStep] = useState(0);
    const [memoryValue, setMemoryValue] = useState<string>("?");

    const steps = [
        { title: "Empty Memory", desc: "RAM consists of millions of empty slots. Before we declare a variable, the space exists but is unreserved.", code: "// No code yet" },
        { title: "Declaration", desc: "We reserve a specific box named 'age'. Note: It contains 'garbage' (random bits) initially, not zero!", code: "int age;", val: "GARBAGE" },
        { title: "Initialization", desc: "We assign the value 20 to 'age'. The binary representation of 20 is stored in those 4 bytes.", code: "age = 20;", val: "20" },
        { title: "Re-assignment", desc: "We overwrite 20 with 25. The old value (20) is lost forever. Variables can vary!", code: "age = 25;", val: "25" }
    ];

    useEffect(() => {
        if (steps[step].val) setMemoryValue(steps[step].val);
        else setMemoryValue("?");
    }, [step]);

    return (
        <div className="grid md:grid-cols-2 gap-8 items-center my-8">
            <div className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-xl border border-border">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-foreground text-lg">{steps[step].title}</h3>
                        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">{step + 1} / {steps.length}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 min-h-[40px] leading-relaxed">{steps[step].desc}</p>
                    <CodeBlock code={steps[step].code} />

                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => setStep(Math.max(0, step - 1))}
                            disabled={step === 0}
                            className="px-4 py-2 rounded bg-muted text-muted-foreground disabled:opacity-50 text-sm font-bold hover:bg-muted/80 transition-colors"
                        >
                            Back
                        </button>
                        <button
                            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                            disabled={step === steps.length - 1}
                            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50 text-sm font-bold flex-1 hover:bg-blue-500 transition-colors"
                        >
                            Next Step
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-card rounded-xl border border-border relative min-h-[300px] shadow-inner">
                {/* Address Label */}
                {step > 0 && <span className="absolute top-12 right-12 text-[10px] font-mono text-muted-foreground flex items-center gap-1"><Hash size={10} /> 0x7fff4</span>}

                {/* The Box */}
                <div className={`
          w-48 h-48 border-4 rounded-2xl flex items-center justify-center text-4xl font-bold transition-all duration-500 relative
          ${step === 0 ? 'border-dashed border-muted-foreground/30 opacity-30 scale-90' : 'border-blue-500 bg-blue-100 dark:bg-blue-900/20 shadow-[0_0_50px_rgba(37,99,235,0.15)] scale-100'}
        `}>
                    {step > 0 ? (
                        <span className={memoryValue === "GARBAGE" ? "text-muted-foreground text-lg font-mono animate-pulse font-bold" : "text-blue-900 dark:text-blue-100 animate-in zoom-in"}>
                            {memoryValue}
                        </span>
                    ) : (
                        <span className="text-muted-foreground text-sm font-medium">Unallocated RAM</span>
                    )}

                    {/* Label Tag */}
                    {step > 0 && (
                        <div className="absolute -bottom-5 bg-yellow-500 text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                            <Box size={12} /> age (int)
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const DataTypeExplorer = () => {
    const [activeType, setActiveType] = useState('int');

    const types: Record<string, { size: number; range: string; fmt: string; desc: string; color: string; bg: string }> = {
        int: { size: 4, range: "-2,147,483,648 to +2,147,483,647", fmt: "%d", desc: "Standard integer type. Used for counting, indices, and whole numbers.", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500" },
        float: { size: 4, range: "1.2E-38 to 3.4E+38", fmt: "%f", desc: "Single precision floating point. Good for 6-7 decimal digits of precision.", color: "text-green-600 dark:text-green-400", bg: "bg-green-500" },
        char: { size: 1, range: "-128 to 127 (ASCII)", fmt: "%c", desc: "Stores a single character code. 'A' is stored as 65.", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500" },
        double: { size: 8, range: "2.3E-308 to 1.7E+308", fmt: "%lf", desc: "Double precision. Essential for scientific calculations requiring 15 decimal digits.", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500" },
    };

    return (
        <div className="space-y-6 my-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(types).map(t => (
                    <button
                        key={t}
                        onClick={() => setActiveType(t)}
                        className={`p-4 rounded-xl border transition-all text-center group ${activeType === t
                            ? `bg-muted border-${types[t].bg.split('-')[1]}-500 ring-1 ring-${types[t].bg.split('-')[1]}-500 shadow-lg`
                            : 'bg-card/50 border-border hover:bg-muted'
                            }`}
                    >
                        <span className={`font-mono font-bold text-lg block mb-1 ${types[t].color} group-hover:scale-110 transition-transform`}>{t}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{types[t].size} Bytes</span>
                    </button>
                ))}
            </div>

            <div className="bg-card/80 p-8 rounded-xl border border-border backdrop-blur relative overflow-hidden transition-all duration-300">
                {/* Background bytes visualization */}
                <div className="absolute top-6 right-6 flex gap-1 opacity-10 pointer-events-none">
                    {[...Array(types[activeType].size)].map((_, i) => (
                        <div key={i} className={`w-8 h-12 border-2 ${types[activeType].color.replace('text', 'border')} rounded flex items-center justify-center text-[10px]`}>8b</div>
                    ))}
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <h3 className={`text-3xl font-bold ${types[activeType].color} capitalize`}>{activeType}</h3>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded border border-border">sizeof({activeType}) = {types[activeType].size}</span>
                </div>


                <p className="text-muted-foreground mb-8 max-w-2xl text-lg leading-relaxed">{types[activeType].desc}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                        <span className="text-xs text-muted-foreground block mb-2 uppercase font-bold tracking-wider flex items-center gap-2">
                            <Terminal size={12} /> Format Specifier
                        </span>
                        <code className="text-2xl font-mono text-foreground">{types[activeType].fmt}</code>
                        <p className="text-xs text-muted-foreground mt-2 italic">Used in printf/scanf</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                        <span className="text-xs text-muted-foreground block mb-2 uppercase font-bold tracking-wider flex items-center gap-2">
                            <Maximize2 size={12} /> Value Range
                        </span>
                        <code className="text-sm font-mono text-foreground break-all leading-relaxed">{types[activeType].range}</code>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ModifiersTable = () => (
    <div className="overflow-x-auto rounded-lg border border-border mt-8">
        <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-muted text-foreground uppercase font-bold text-xs">
                <tr>
                    <th className="px-6 py-3">Modifier</th>
                    <th className="px-6 py-3">Effect</th>
                    <th className="px-6 py-3">Example Type</th>
                    <th className="px-6 py-3">New Range</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card/50">
                <tr>
                    <td className="px-6 py-4 font-mono text-yellow-600 dark:text-yellow-400">unsigned</td>
                    <td className="px-6 py-4">Removes negative values, doubles positive range</td>
                    <td className="px-6 py-4 font-mono">unsigned int</td>
                    <td className="px-6 py-4">0 to 4,294,967,295</td>
                </tr>
                <tr>
                    <td className="px-6 py-4 font-mono text-blue-600 dark:text-blue-400">short</td>
                    <td className="px-6 py-4">Reduces memory size (usually to 2 bytes)</td>
                    <td className="px-6 py-4 font-mono">short int</td>
                    <td className="px-6 py-4">-32,768 to 32,767</td>
                </tr>
                <tr>
                    <td className="px-6 py-4 font-mono text-purple-600 dark:text-purple-400">long</td>
                    <td className="px-6 py-4">Increases memory size (4 or 8 bytes)</td>
                    <td className="px-6 py-4 font-mono">long double</td>
                    <td className="px-6 py-4">Extended Precision</td>
                </tr>
            </tbody>
        </table>
    </div>
);

const IOSimulator = () => {
    const [inputValue, setInputValue] = useState("");
    const [storedValue, setStoredValue] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = () => {
        if (!inputValue) return;
        setIsScanning(true);
        setTimeout(() => {
            setStoredValue(inputValue);
            setIsScanning(false);
        }, 1000);
    };

    return (
        <div className="bg-card rounded-xl border border-border p-8 relative overflow-hidden my-8">
            <div className="grid md:grid-cols-2 gap-12">

                {/* INPUT SIDE */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-muted-foreground border-b border-border pb-2">
                        <Keyboard size={18} />
                        <span className="text-sm font-bold uppercase tracking-wider">Standard Input (Stdin)</span>
                    </div>

                    <CodeBlock code={`int x;\nprintf("Enter number: ");\nscanf("%d", &x);`} />

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 blur"></div>
                        <div className="relative flex">
                            <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                                className="w-full bg-background border border-border rounded-l p-4 text-foreground font-mono focus:border-blue-500 outline-none transition-colors"
                                placeholder="Type integer..."
                            />
                            <button
                                onClick={handleScan}
                                disabled={isScanning || !inputValue}
                                className="bg-blue-600 text-white px-6 rounded-r font-bold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {isScanning ? <RefreshCw className="animate-spin" size={18} /> : <ArrowRight size={18} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* MEMORY SIDE */}
                <div className="space-y-6 flex flex-col items-center justify-center relative">
                    {/* Animated data packet */}
                    {isScanning && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-600 dark:text-blue-400 animate-slide-right z-20 font-bold bg-card px-2 border border-blue-500/50 rounded shadow-xl">
                            {inputValue}
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-muted-foreground border-b border-border pb-2 w-full">
                        <Cpu size={18} />
                        <span className="text-sm font-bold uppercase tracking-wider">RAM (Address 0x1004)</span>
                    </div>

                    <div className="w-full h-40 bg-card border-2 border-border rounded-xl flex flex-col items-center justify-center relative shadow-inner">
                        <span className="absolute top-3 left-3 text-[10px] text-muted-foreground font-mono">variable: x</span>
                        <span className={`text-5xl font-mono font-bold transition-all duration-300 ${storedValue ? 'text-green-600 dark:text-green-400 scale-110' : 'text-muted-foreground'}`}>
                            {storedValue || "?"}
                        </span>
                        {storedValue && <span className="text-xs text-green-600 mt-2 font-mono">Updated!</span>}
                    </div>

                    {storedValue && (
                        <div className="w-full bg-zinc-950 dark:bg-black rounded-lg p-4 font-mono text-sm text-green-400 border-l-4 border-green-500">
                            <span className="text-zinc-500 block text-xs mb-1">// Console Output</span>
                            Output: You entered {storedValue}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @keyframes slide-right {
          0% { transform: translateX(0) translateY(-50%); opacity: 1; }
          50% { opacity: 1; }
          100% { transform: translateX(120%) translateY(-50%); opacity: 0; }
        }
        .animate-slide-right {
          animation: slide-right 0.8s ease-in-out forwards;
        }
      `}</style>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture2Page() {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-32">

            {/* NAVIGATION HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunitsLD/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-foreground text-sm leading-tight">Data Storage & Rep.</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Unit 1 • Lecture 2</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <nav className="flex gap-1 bg-muted/50 p-1 rounded-full border border-border">
                        {[
                            { id: 'vars', label: 'Variables', icon: Box },
                            { id: 'types', label: 'Data Types', icon: Type },
                            { id: 'io', label: 'I/O', icon: Terminal }
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                            >
                                <item.icon size={14} />
                                <span className="hidden sm:inline">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                    <ModeToggle />
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-32">

                {/* HERO SECTION */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 border border-blue-500/30 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Cpu size={14} /> Core Concepts
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-foreground dark:from-blue-400 dark:via-purple-400 dark:to-white">Containers</span> of Code
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        In C, data isn't magic—it's bits in boxes. We call these boxes <strong>Variables</strong>,
                        and their shapes are defined by <strong>Data Types</strong>.
                    </p>
                </div>

                {/* SECTION 1: VARIABLES */}
                <section id="vars" className="scroll-mt-24">
                    <SectionHeader title="Variables: The Memory Boxes" icon={Box} color="blue" />

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-card/50 p-6 rounded-xl border border-border hover:bg-card transition-colors">
                            <h3 className="text-xl font-bold text-foreground mb-3">Concept</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                A variable is simply a named location in RAM. When you create one, you are asking the OS:
                                "Please reserve X bytes of memory for me, and let me call it 'score'."
                            </p>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-green-500" /> <strong>Identifier:</strong> The name (e.g., totalScore)</li>
                                <li className="flex items-center gap-3"><CheckCircle size={16} className="text-green-500" /> <strong>Address:</strong> The hex location (e.g., 0x7fff...)</li>
                            </ul>
                        </div>

                        <div className="bg-card/50 p-6 rounded-xl border border-border hover:bg-card transition-colors">
                            <h3 className="text-xl font-bold text-foreground mb-3">Syntax Breakdown</h3>
                            <div className="space-y-4">
                                <div className="p-3 bg-muted rounded border border-border flex items-center justify-between">
                                    <div>
                                        <code className="text-purple-400 font-bold">int</code> <code className="text-foreground">lives;</code>
                                    </div>
                                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Declaration</span>
                                </div>
                                <div className="p-3 bg-muted rounded border border-border flex items-center justify-between">
                                    <div>
                                        <code className="text-foreground">lives = </code> <code className="text-green-400 font-bold">3;</code>
                                    </div>
                                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Assignment</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <VariableVisualizer />

                    {/* CONSTANTS SUB-SECTION */}
                    <div className="mt-16 grid md:grid-cols-2 gap-8">
                        <div className="border border-border p-6 rounded-xl relative overflow-hidden group hover:border-red-500/50 transition-colors bg-card/20">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Lock size={80} /></div>
                            <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2"><Lock size={18} className="text-red-600 dark:text-red-400" /> Constants (Read-Only)</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Use <code className="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 px-1 rounded">const</code> to lock a variable. It consumes memory but offers safety.
                            </p>
                            <CodeBlock code={`const float PI = 3.14;\n// PI = 3.15; // ❌ Error`} />
                        </div>
                        <div className="border border-border p-6 rounded-xl relative overflow-hidden group hover:border-purple-500/50 transition-colors bg-card/20">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Hash size={80} /></div>
                            <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2"><Hash size={18} className="text-purple-600 dark:text-purple-400" /> Macros (Substitution)</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Use <code className="text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20 px-1 rounded">#define</code> for text replacement. No memory usage!
                            </p>
                            <CodeBlock code={`#define MAX 100\n// Compiler sees '100'`} />
                        </div>
                    </div>
                </section>

                {/* SECTION 2: DATA TYPES */}
                <section id="types" className="scroll-mt-24">
                    <SectionHeader title="Data Types: Shapes & Sizes" icon={Type} color="purple" />

                    <div className="prose prose-invert max-w-none mb-8">
                        <p className="text-muted-foreground text-lg">
                            C is <strong>statically typed</strong>. This means you must explicitly tell the compiler the "shape" of your data
                            before you use it. This allows C to be extremely efficient with memory.
                        </p>
                    </div>

                    <DataTypeExplorer />

                    <div className="mt-12">
                        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <Layout size={18} className="text-muted-foreground" /> Type Modifiers
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            You can tweak the basic types using modifiers to fit your exact needs.
                        </p>
                        <ModifiersTable />
                    </div>

                    <div className="mt-8 bg-yellow-900/10 border border-yellow-700/50 p-6 rounded-xl flex items-start gap-4">
                        <AlertTriangle className="text-yellow-500 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-yellow-500 mb-1">Warning: Integer Overflow</h4>
                            <p className="text-sm text-muted-foreground">
                                Data types have limits! Storing <strong>40,000</strong> in a <code>short int</code> (max 32,767) causes it to
                                "wrap around" to a negative number (-25,536). Always verify your ranges.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: INPUT / OUTPUT */}
                <section id="io" className="scroll-mt-24">
                    <SectionHeader title="I/O: Interacting with Users" icon={Terminal} color="green" />

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-card/50 p-6 rounded-xl border border-border">
                            <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                                <Monitor size={20} className="text-blue-600 dark:text-blue-400" /> Output
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Use <code>printf()</code> to send text to the screen. It uses <strong>Format Specifiers</strong> (%) to insert variable values into the string.
                            </p>
                            <CodeBlock code={`float pi = 3.14159;\nprintf("Pi is roughly %.2f", pi);\n// Output: Pi is roughly 3.14`} />
                        </div>
                        <div className="bg-card/50 p-6 rounded-xl border border-border">
                            <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                                <Keyboard size={20} className="text-green-600 dark:text-green-400" /> Input
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Use <code>scanf()</code> to read from the keyboard. You must provide the <strong>Address (&)</strong> of the variable so scanf knows where to store the data.
                            </p>
                            <CodeBlock code={`int age;\nscanf("%d", &age); // ✅ Correct\nscanf("%d", age);  // ❌ CRASH!`} />
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold text-foreground mb-4 text-xl">Interactive I/O Lab</h3>
                        <IOSimulator />
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6 overflow-hidden mt-12">
                        <h3 className="font-bold text-foreground mb-6 flex items-center gap-2"><Table size={18} className="text-purple-400" /> Cheat Sheet: Format Specifiers</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[
                                { fmt: "%d", type: "int", desc: "Decimal Integer" },
                                { fmt: "%f", type: "float", desc: "Floating Point" },
                                { fmt: "%c", type: "char", desc: "Single Character" },
                                { fmt: "%lf", type: "double", desc: "Long Float" },
                                { fmt: "%s", type: "char[]", desc: "String (Text)" },
                            ].map((item, i) => (
                                <div key={i} className="bg-muted p-4 rounded-lg border border-border text-center hover:border-border transition-colors group">
                                    <code className="text-2xl font-bold text-green-600 dark:text-green-400 block mb-2 group-hover:scale-110 transition-transform">{item.fmt}</code>
                                    <span className="text-xs text-purple-600 dark:text-purple-400 font-bold block mb-1 uppercase tracking-wider">{item.type}</span>
                                    <span className="text-[10px] text-muted-foreground">{item.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-border bg-background py-12 text-center text-muted-foreground text-sm">
                <p>C Programming Course • Unit 1 • Lecture 2</p>
            </footer>
        </div>
    );
}