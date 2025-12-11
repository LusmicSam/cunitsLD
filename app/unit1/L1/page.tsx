"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    Terminal,
    BookOpen,
    Code,
    Cpu,
    CheckCircle,
    AlertCircle,
    Play,
    Layers,
    History,
    FileCode,
    ArrowRight,
    Monitor,
    Box,
    Hash,
    X,
    Info,
    ChevronRight,
    Cpu as CpuIcon,
    Globe,
    Database,
    Server,
    Smartphone,
    AlertTriangle,
    Zap,
    Crown,
    Share2,
    RefreshCw,
    FileText,
    Minimize2,
    Bug,
    LayoutGrid
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const CodeBlock = ({ code, language = 'c', explanation, highlights = [] }: { code: string, language?: string, explanation?: string, highlights?: any[] }) => {
    const [showExplanation, setShowExplanation] = useState(false);

    // Simple syntax highlighting (naive)
    const renderHighlightedCode = () => {
        return code.split('\n').map((line, i) => {
            let lineContent = line;
            const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*');
            const isDirective = line.trim().startsWith('#');

            return (
                <div key={i} className={`font-mono text-sm leading-6 ${isComment ? 'text-slate-500 italic' : 'text-slate-300'}`}>
                    <span className="text-slate-600 mr-4 select-none w-6 inline-block text-right">{i + 1}</span>
                    {isDirective ? <span className="text-purple-400">{line}</span> :
                        isComment ? <span>{line}</span> :
                            line}
                </div>
            );
        });
    };

    return (
        <div className="bg-[#0d1117] rounded-lg overflow-hidden border border-slate-700 my-4 shadow-2xl relative group transition-all duration-300 hover:border-slate-500 w-full">
            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-700">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono uppercase">{language}</span>
                    {explanation && (
                        <button
                            onClick={() => setShowExplanation(!showExplanation)}
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-all font-bold ${showExplanation
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            {showExplanation ? <X size={14} /> : <Info size={14} />}
                            {showExplanation ? 'Close Notes' : 'Explain Logic'}
                        </button>
                    )}
                </div>
            </div>

            <div className="relative">
                <div className="p-4 overflow-x-auto">
                    {renderHighlightedCode()}
                </div>

                <div className={`
          absolute inset-0 bg-[#0f172a]/95 backdrop-blur-sm p-5 overflow-y-auto transition-opacity duration-300
          ${showExplanation ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}>
                    <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                        <Terminal size={16} /> Logic Breakdown
                    </h4>
                    <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-2 whitespace-pre-line">
                        {explanation}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TheoryCard = ({ title, icon, children, variant = 'blue' }: { title: string, icon: React.ReactNode, children: React.ReactNode, variant?: 'blue' | 'purple' | 'orange' | 'red' | 'green' }) => {
    const colors = {
        blue: 'border-blue-500 bg-blue-900/10',
        purple: 'border-purple-500 bg-purple-900/10',
        orange: 'border-orange-500 bg-orange-900/10',
        red: 'border-red-500 bg-red-900/10',
        green: 'border-green-500 bg-green-900/10'
    };

    return (
        <div className={`border-l-4 ${colors[variant]} rounded-r-lg p-6 my-6 transition-all hover:bg-opacity-20 backdrop-blur-sm`}>
            <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                {icon} {title}
            </h4>
            <div className="text-slate-300 text-sm leading-relaxed space-y-2">
                {children}
            </div>
        </div>
    );
};

// --- INTERACTIVE COMPONENTS ---

const InteractiveTokenExplorer = () => {
    const [activeType, setActiveType] = useState<string | null>(null);

    const tokenData = [
        { type: 'keyword', color: 'text-purple-400 border-purple-500/50 bg-purple-500/10', text: 'int', desc: 'Keyword: Reserved word indicating integer type.' },
        { type: 'identifier', color: 'text-blue-400 border-blue-500/50 bg-blue-500/10', text: 'main', desc: 'Identifier: Name given to the function.' },
        { type: 'punctuator', color: 'text-slate-400 border-slate-500/50 bg-slate-500/10', text: '(', desc: 'Punctuator: Starts parameter list.' },
        { type: 'punctuator', color: 'text-slate-400 border-slate-500/50 bg-slate-500/10', text: ')', desc: 'Punctuator: Ends parameter list.' },
        { type: 'punctuator', color: 'text-slate-400 border-slate-500/50 bg-slate-500/10', text: '{', desc: 'Punctuator: Starts function body block.' },
        { type: 'keyword', color: 'text-purple-400 border-purple-500/50 bg-purple-500/10', text: 'int', desc: 'Keyword: Reserved word.' },
        { type: 'identifier', color: 'text-blue-400 border-blue-500/50 bg-blue-500/10', text: 'age', desc: 'Identifier: Variable name.' },
        { type: 'operator', color: 'text-orange-400 border-orange-500/50 bg-orange-500/10', text: '=', desc: 'Operator: Assigns value.' },
        { type: 'constant', color: 'text-green-400 border-green-500/50 bg-green-500/10', text: '20', desc: 'Constant: Fixed integer value.' },
        { type: 'punctuator', color: 'text-slate-400 border-slate-500/50 bg-slate-500/10', text: ';', desc: 'Punctuator: Terminates statement.' },
        { type: 'keyword', color: 'text-purple-400 border-purple-500/50 bg-purple-500/10', text: 'return', desc: 'Keyword: Return control.' },
        { type: 'constant', color: 'text-green-400 border-green-500/50 bg-green-500/10', text: '0', desc: 'Constant: Return value.' },
        { type: 'punctuator', color: 'text-slate-400 border-slate-500/50 bg-slate-500/10', text: ';', desc: 'Punctuator: Terminates statement.' },
        { type: 'punctuator', color: 'text-slate-400 border-slate-500/50 bg-slate-500/10', text: '}', desc: 'Punctuator: Ends function body block.' },
    ];

    return (
        <div className="grid lg:grid-cols-2 gap-8 my-8">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Code size={20} className="text-blue-400" /> Code Tokenizer
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                    Click the categories below to identify different tokens in the code snippet.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {['keyword', 'identifier', 'constant', 'operator', 'punctuator'].map(type => (
                        <button
                            key={type}
                            onClick={() => setActiveType(activeType === type ? null : type)}
                            className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-all border ${activeType === type
                                ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="bg-[#0d1117] p-6 rounded-lg font-mono text-lg border border-slate-800 shadow-inner overflow-x-auto">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-3 leading-loose min-w-max">
                        {tokenData.map((token, idx) => (
                            <span
                                key={idx}
                                className={`px-1.5 py-0.5 rounded border transition-all duration-300 cursor-help ${activeType === token.type
                                    ? `${token.color} shadow-sm scale-110 font-bold z-10`
                                    : activeType
                                        ? 'text-slate-700 border-transparent opacity-30 blur-[1px]'
                                        : 'text-slate-300 border-transparent'
                                    }`}
                                title={token.desc}
                            >
                                {token.text}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className={`p-4 rounded-lg border bg-slate-900/80 backdrop-blur transition-all ${activeType ? 'border-blue-500/30' : 'border-slate-800'}`}>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Detailed Analysis</h4>
                    {activeType ? (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-xl font-bold text-white capitalize mb-2">{activeType}s</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {activeType === 'keyword' && "Reserved words that have special meaning to the compiler. They define the structure and logic (e.g., int, return). You cannot use them as names."}
                                {activeType === 'identifier' && "User-defined names for variables, functions, and arrays. Must start with a letter/underscore and contain no spaces."}
                                {activeType === 'constant' && "Fixed values that do not change during execution. Can be numbers (10, 3.14) or characters ('A')."}
                                {activeType === 'operator' && "Symbols that tell the computer to perform specific mathematical or logical manipulations (+, -, =, ==)."}
                                {activeType === 'punctuator' && "Symbols used to separate or group distinct parts of the code (; , { } ( ))."}
                            </p>
                        </div>
                    ) : (
                        <div className="text-slate-500 italic text-sm flex flex-col items-center justify-center py-8">
                            <Hash size={40} className="mb-2 opacity-20" />
                            Select a token category to see details.
                        </div>
                    )}
                </div>

                {/* Rules Card for Identifiers (Contextually shown or always visible) */}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <h4 className="text-sm font-bold text-yellow-500 mb-3 flex items-center gap-2">
                        <AlertTriangle size={16} /> Identifier Rules
                    </h4>
                    <ul className="text-xs text-slate-400 space-y-2">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                            <span>Must start with letter (a-z, A-Z) or underscore (_).</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                            <span>Can contain digits (0-9) after first char.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <X size={14} className="text-red-500 mt-0.5 shrink-0" />
                            <span><strong>No spaces</strong> allowed (e.g., "my var").</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <X size={14} className="text-red-500 mt-0.5 shrink-0" />
                            <span>Case sensitive ("Count" ≠ "count").</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const KeywordsReference = () => {
    const [activeCategory, setActiveCategory] = useState('Type');

    const keywords: Record<string, string[]> = {
        Type: ['int', 'float', 'char', 'double', 'void', 'long', 'short', 'signed', 'unsigned'],
        Control: ['if', 'else', 'switch', 'case', 'default', 'while', 'do', 'for', 'break', 'continue', 'goto', 'return'],
        Storage: ['auto', 'static', 'extern', 'register'],
        Other: ['const', 'volatile', 'sizeof', 'typedef', 'struct', 'union', 'enum']
    };

    return (
        <div className="bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-700 bg-slate-900/80 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <BookOpen size={18} className="text-purple-400" />
                    <span>ANSI C Keywords (32)</span>
                </h3>
                <div className="flex gap-2">
                    {Object.keys(keywords).map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${activeCategory === cat
                                ? 'bg-purple-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {keywords[activeCategory].map(kw => (
                        <div key={kw} className="bg-[#0f172a] p-3 rounded border border-slate-700 text-center font-mono text-slate-300 hover:border-purple-500 transition-colors cursor-default group">
                            <span className="group-hover:text-purple-400 transition-colors">{kw}</span>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-slate-500 mt-4 text-center">
                    * These words are reserved by the compiler and cannot be used as variable names.
                </p>
            </div>
        </div>
    );
};

const AnatomyViewer = () => {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);

    const parts: Record<string, { title: string; desc: string }> = {
        header: { title: "Preprocessor Directive", desc: "Lines starting with # are processed before compilation. <stdio.h> is the Standard Input/Output library needed for printf/scanf." },
        main: { title: "Main Function Entry", desc: "The execution of EVERY C program begins at the main() function. It returns an integer (int)." },
        block: { title: "Function Body", desc: "Enclosed in braces { }. Defines the scope of the function. All executable code goes here." },
        decl: { title: "Variable Declaration", desc: "Allocates memory for a variable named 'sum' of type integer. Variables must be declared before use." },
        logic: { title: "Executable Statement", desc: "Performs an operation (Addition) and assigns the result to 'sum'. Statements end with a semicolon (;)." },
        print: { title: "Output Function", desc: "printf() sends formatted output to the screen. %d is a placeholder for an integer." },
        ret: { title: "Return Statement", desc: "Terminates main(). Returning 0 typically signals to the OS that the program finished successfully." },
        comment: { title: "Comment", desc: "Text ignored by the compiler. Used for documentation. // for single line, /* */ for multi-line." }
    };

    const CodeLine = ({ id, children, indent = 0 }: { id: string, children: React.ReactNode, indent?: number }) => (
        <div
            className={`font-mono text-sm py-1 px-2 cursor-pointer transition-all duration-200 rounded whitespace-nowrap
        ${hoveredPart === id
                    ? 'bg-blue-600/20 border-l-2 border-blue-500 text-blue-100 pl-3'
                    : 'hover:bg-slate-800 border-l-2 border-transparent text-slate-400'
                }`}
            style={{ marginLeft: `${indent * 1}rem` }}
            onMouseEnter={() => setHoveredPart(id)}
            onMouseLeave={() => setHoveredPart(null)}
        >
            {children}
        </div>
    );

    return (
        <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-slate-700 shadow-2xl relative w-full overflow-x-auto">
                <div className="bg-[#161b22] px-4 py-2 border-b border-slate-700 flex justify-between items-center min-w-[300px]">
                    <span className="text-xs text-slate-500 font-bold uppercase">Anatomy.c</span>
                    <span className="text-[10px] text-slate-600">Hover lines to inspect</span>
                </div>
                <div className="p-4 min-w-[300px]">
                    <CodeLine id="comment"><span className="text-slate-500 italic">// Simple C Program</span></CodeLine>
                    <CodeLine id="header"><span className="text-purple-400">#include</span> <span className="text-green-400">&lt;stdio.h&gt;</span></CodeLine>
                    <div className="h-2"></div>
                    <CodeLine id="main"><span className="text-purple-400">int</span> <span className="text-blue-400">main</span>()</CodeLine>
                    <CodeLine id="block">{'{'}</CodeLine>
                    <CodeLine id="decl" indent={1}><span className="text-purple-400">int</span> a = <span className="text-orange-400">10</span>, b = <span className="text-orange-400">20</span>, sum;</CodeLine>
                    <div className="h-2"></div>
                    <CodeLine id="logic" indent={1}>sum = a + b;</CodeLine>
                    <CodeLine id="print" indent={1}>printf(<span className="text-green-400">"Sum = %d"</span>, sum);</CodeLine>
                    <div className="h-2"></div>
                    <CodeLine id="ret" indent={1}><span className="text-purple-400">return</span> <span className="text-orange-400">0</span>;</CodeLine>
                    <CodeLine id="block">{'}'}</CodeLine>
                </div>
            </div>

            <div className="flex flex-col justify-center">
                <div className={`p-6 rounded-xl border transition-all duration-300 min-h-[200px] flex flex-col justify-center
          ${hoveredPart
                        ? 'bg-blue-900/10 border-blue-500/50'
                        : 'bg-slate-900/30 border-slate-800'
                    }`}
                >
                    {hoveredPart ? (
                        <div className="animate-in slide-in-from-bottom-2 duration-300">
                            <h4 className="text-lg font-bold text-blue-400 mb-2 flex items-center gap-2">
                                <Info size={18} /> {parts[hoveredPart].title}
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {parts[hoveredPart].desc}
                            </p>
                        </div>
                    ) : (
                        <div className="text-center text-slate-600 flex flex-col items-center">
                            <Monitor className="w-12 h-12 mb-3 opacity-20" />
                            <p className="text-sm">Hover over any line of code on the left to analyze its purpose.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const WhitespaceDemo = () => {
    const [minified, setMinified] = useState(false);

    const formatted = `#include <stdio.h>

int main() {
    // This comment is ignored
    int x = 5; 
    printf("%d", x);
    return 0;
}`;

    const compressed = `#include <stdio.h>
int main(){int x=5;printf("%d",x);return 0;}`;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 my-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Minimize2 size={18} className="text-orange-400" />
                    The Invisible Code
                </h3>
                <button
                    onClick={() => setMinified(!minified)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded text-xs font-bold transition-colors"
                >
                    {minified ? 'Show Formatted' : 'Show Compiled View'}
                </button>
            </div>
            <p className="text-sm text-slate-400 mb-4">
                The compiler ignores "whitespace" (spaces, tabs, newlines) and comments.
                Both code blocks below mean exactly the same thing to the machine!
            </p>

            <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 rounded border transition-all duration-300 ${!minified ? 'bg-blue-900/20 border-blue-500/50' : 'bg-slate-950 border-slate-800 opacity-50'}`}>
                    <div className="text-xs text-slate-500 mb-2 uppercase font-bold">For Humans (Readable)</div>
                    <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap">{formatted}</pre>
                </div>
                <div className={`p-4 rounded border transition-all duration-300 ${minified ? 'bg-orange-900/20 border-orange-500/50' : 'bg-slate-950 border-slate-800 opacity-50'}`}>
                    <div className="text-xs text-slate-500 mb-2 uppercase font-bold">For Compiler (Stream)</div>
                    <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap break-all">{compressed}</pre>
                </div>
            </div>
        </div>
    );
};

const CompilationFlow = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const steps = [
        { id: 1, title: 'Source', ext: 'hello.c', icon: FileCode, color: 'text-blue-400', bg: 'bg-blue-500/20', desc: 'Your raw code' },
        { id: 2, title: 'Preprocessor', ext: 'Expanded', icon: Layers, color: 'text-purple-400', bg: 'bg-purple-500/20', desc: 'Handles #include' },
        { id: 3, title: 'Compiler', ext: 'hello.obj', icon: Cpu, color: 'text-orange-400', bg: 'bg-orange-500/20', desc: 'To Machine Code' },
        { id: 4, title: 'Linker', ext: 'hello.exe', icon: Box, color: 'text-green-400', bg: 'bg-green-500/20', desc: 'Combines Libs' },
        { id: 5, title: 'Loader/Run', ext: 'Memory', icon: Play, color: 'text-white', bg: 'bg-white/10', desc: 'Executes' }
    ];

    const runSimulation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveStep(1);
        setLogs(['> gcc hello.c']);

        setTimeout(() => {
            setActiveStep(2);
            setLogs(p => [...p, '> Preprocessor: Expanding macros & includes...']);
        }, 1500);

        setTimeout(() => {
            setActiveStep(3);
            setLogs(p => [...p, '> Compiler: Translating to Assembly...', '> Assembler: Creating object file (hello.obj)']);
        }, 3000);

        setTimeout(() => {
            setActiveStep(4);
            setLogs(p => [...p, '> Linker: Merging stdio library...', '> Linker: Generating executable (hello.exe)']);
        }, 4500);

        setTimeout(() => {
            setActiveStep(5);
            setLogs(p => [...p, '> Loader: Loading into RAM...', '> Execution Started...', '> Output: Hello, World!']);
            setIsAnimating(false);
        }, 6000);
    };

    return (
        <div className="my-10 space-y-8">
            {/* Simulation Controls */}
            <div className="flex justify-center">
                <button
                    onClick={runSimulation}
                    disabled={isAnimating}
                    className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all transform active:scale-95 shadow-lg
            ${isAnimating
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-500 shadow-green-900/50 hover:shadow-green-500/30'
                        }`}
                >
                    {isAnimating ? <RefreshCw className="animate-spin" size={20} /> : <Play size={20} fill="currentColor" />}
                    {isAnimating ? 'Compiling...' : 'Run Compilation'}
                </button>
            </div>

            {/* Visual Flow */}
            <div className="relative pt-8 pb-4 overflow-x-auto">
                <div className="absolute top-[4.5rem] left-10 right-10 h-1 bg-slate-800 hidden md:block -z-10">
                    <div
                        className="h-full bg-green-500 transition-all duration-500 ease-linear"
                        style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-6 min-w-[600px] px-4">
                    {steps.map((step, idx) => {
                        const isActive = activeStep === step.id;
                        const isCompleted = activeStep > step.id;

                        return (
                            <div key={idx} className="flex flex-col items-center group relative flex-1">
                                <div className={`w-4 h-4 rounded-full border-2 mb-4 transition-colors duration-300 z-10 hidden md:block
                  ${isActive ? 'bg-green-500 border-green-500 shadow-[0_0_10px_#22c55e]' :
                                        isCompleted ? 'bg-green-900 border-green-700' : 'bg-[#020617] border-slate-700'}
                `}></div>

                                <div className={`w-20 h-20 border rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 relative
                  ${isActive
                                        ? `border-white scale-110 ${step.bg} shadow-[0_0_20px_rgba(255,255,255,0.1)]`
                                        : isCompleted
                                            ? 'border-green-800 bg-green-900/10 opacity-50'
                                            : 'bg-[#0f172a] border-slate-700'
                                    }
                `}>
                                    <step.icon size={28} className={isActive ? 'text-white animate-pulse' : isCompleted ? 'text-green-700' : step.color} />
                                    {isActive && (
                                        <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-ping"></div>
                                    )}
                                </div>

                                <div className="mt-4 text-center">
                                    <h4 className={`font-bold text-sm mb-1 transition-colors ${isActive ? 'text-white' : 'text-slate-500'}`}>{step.title}</h4>
                                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono border border-slate-700">{step.ext}</span>
                                </div>

                                {idx < steps.length - 1 && (
                                    <ArrowRight className="md:hidden text-slate-700 my-4 rotate-90" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Console Simulation */}
            <div className="bg-[#0f172a] border border-slate-700 rounded-lg p-4 font-mono text-xs md:text-sm h-48 overflow-y-auto shadow-inner">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-2">
                    <Terminal size={12} className="text-slate-500" />
                    <span className="text-slate-500 font-bold">Build Output</span>
                </div>
                <div className="space-y-1">
                    {logs.length === 0 && <span className="text-slate-600 italic">Ready to compile... Click 'Run Compilation'</span>}
                    {logs.map((log, i) => (
                        <div key={i} className="animate-in slide-in-from-left-2 fade-in duration-200">
                            <span className="text-green-500 mr-2">$</span>
                            <span className="text-slate-300">{log}</span>
                        </div>
                    ))}
                    {activeStep === 5 && !isAnimating && (
                        <div className="mt-2 pt-2 border-t border-slate-800 text-green-400 font-bold animate-pulse">
                            Process finished with exit code 0.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---

export default function Lecture1Page() {
    const [activeSection, setActiveSection] = useState('intro');

    const scrollTo = (id: string) => {
        setActiveSection(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-orange-500/30 pb-20">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-white text-sm md:text-base leading-tight">Intro & Building Blocks</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 1 • Lecture 1</p>
                    </div>
                </div>
                <nav className="flex gap-1 bg-slate-900/50 p-1 rounded-full border border-slate-800 overflow-x-auto max-w-[200px] md:max-w-none">
                    {[
                        { id: 'intro', icon: History, label: 'History' },
                        { id: 'tokens', icon: Hash, label: 'Tokens' },
                        { id: 'anatomy', icon: Layers, label: 'Anatomy' },
                        { id: 'compile', icon: CpuIcon, label: 'Compile' }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className={`flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeSection === item.id
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                }`}
                        >
                            <item.icon size={14} />
                            <span className="hidden md:inline">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </header>

            {/* HERO SECTION */}
            <section id="intro" className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-blue-900/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-xs font-bold mb-6 animate-fade-in-up">
                    <Terminal size={14} /> CSE101: Computer Programming
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white mb-6 leading-tight">
                    The Mother of All Languages
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mb-12">
                    C is the foundation of modern computing. From operating systems to embedded devices,
                    understanding C gives you the power to speak directly to the hardware.
                </p>

                {/* Features of C (EXPANDED L1 CONTENT) */}
                <div className="grid md:grid-cols-4 gap-4 mb-16">
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 hover:bg-slate-900 transition-all group">
                        <div className="w-10 h-10 bg-green-900/20 rounded-lg flex items-center justify-center text-green-400 mb-3 group-hover:scale-110 transition-transform">
                            <CpuIcon size={20} />
                        </div>
                        <h3 className="font-bold text-white mb-1">Efficient</h3>
                        <p className="text-xs text-slate-400">Generates code that runs nearly as fast as Assembly.</p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 hover:bg-slate-900 transition-all group">
                        <div className="w-10 h-10 bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                            <Globe size={20} />
                        </div>
                        <h3 className="font-bold text-white mb-1">Portable</h3>
                        <p className="text-xs text-slate-400">Code written on one machine can run on another with little change.</p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 hover:bg-slate-900 transition-all group">
                        <div className="w-10 h-10 bg-purple-900/20 rounded-lg flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                            <LayoutGrid size={20} />
                        </div>
                        <h3 className="font-bold text-white mb-1">Structured</h3>
                        <p className="text-xs text-slate-400">Breaks problems into functions (modules) for easier management.</p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 hover:bg-slate-900 transition-all group">
                        <div className="w-10 h-10 bg-orange-900/20 rounded-lg flex items-center justify-center text-orange-400 mb-3 group-hover:scale-110 transition-transform">
                            <Zap size={20} />
                        </div>
                        <h3 className="font-bold text-white mb-1">Mid-Level</h3>
                        <p className="text-xs text-slate-400">Combines high-level syntax with low-level memory access.</p>
                    </div>
                </div>

                {/* History Cards */}
                <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-900 transition-colors relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Crown size={100} />
                            </div>
                            <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 text-purple-400">
                                <History size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">The Golden Era (1972)</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                In the hallowed halls of <strong className="text-purple-300">Bell Labs</strong>,
                                <strong className="text-purple-300"> Dennis Ritchie</strong> forged C to create the
                                <strong className="text-purple-300"> UNIX</strong> operating system.
                            </p>
                            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-950 p-2 rounded border border-slate-800">
                                <span>ALGOL</span> <ArrowRight size={10} />
                                <span>BCPL</span> <ArrowRight size={10} />
                                <span>B</span> <ArrowRight size={10} />
                                <span className="text-white font-bold">C</span>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-900 transition-colors">
                            <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Why learn it now?</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                C is the "Latin of Programming". It forces you to understand memory management, pointers, and compilation.
                                Once you know C, learning Java, C++, or JavaScript is incredibly easy.
                            </p>
                            <ul className="text-slate-400 text-xs space-y-1">
                                <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Foundational knowledge</li>
                                <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Critical for System Programming</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: TOKENS */}
            <section id="tokens" className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <span className="bg-purple-600/20 text-purple-400 p-2 rounded-lg"><Hash size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Character Set & Tokens</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <TheoryCard title="The Character Set" icon={<BookOpen size={18} />} variant="purple">
                            <p>The alphabet of C. These are the only valid characters the compiler recognizes:</p>
                            <ul className="list-disc pl-4 mt-2 space-y-1 marker:text-purple-500">
                                <li><strong>Letters:</strong> A-Z, a-z (Case sensitive)</li>
                                <li><strong>Digits:</strong> 0-9</li>
                                <li><strong>Special Symbols:</strong> @ # $ % ^ & * ( ) _ + etc.</li>
                                <li><strong>Whitespace:</strong> Spaces, Tabs, Newlines.</li>
                            </ul>
                        </TheoryCard>
                    </div>
                    <div>
                        <TheoryCard title="What is a Token?" icon={<Box size={18} />} variant="blue">
                            <p>
                                The smallest meaningful unit in a C program. Think of it like a "word" in a sentence.
                                The compiler scans your code and breaks it down into tokens.
                            </p>
                            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                                <div className="bg-slate-900 p-2 rounded border border-slate-700 text-center text-slate-300">
                                    Keyword <br /><span className="text-purple-400 font-mono">int</span>
                                </div>
                                <div className="bg-slate-900 p-2 rounded border border-slate-700 text-center text-slate-300">
                                    Identifier <br /><span className="text-blue-400 font-mono">score</span>
                                </div>
                                <div className="bg-slate-900 p-2 rounded border border-slate-700 text-center text-slate-300">
                                    Constant <br /><span className="text-green-400 font-mono">100</span>
                                </div>
                                <div className="bg-slate-900 p-2 rounded border border-slate-700 text-center text-slate-300">
                                    Punctuator <br /><span className="text-slate-400 font-mono">;</span>
                                </div>
                            </div>
                        </TheoryCard>
                    </div>
                </div>

                {/* EXPANDED CONTENT: Keywords Reference */}
                <KeywordsReference />

                <div className="h-8"></div>
                <InteractiveTokenExplorer />
            </section>

            {/* SECTION 3: ANATOMY */}
            <section id="anatomy" className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <span className="bg-blue-600/20 text-blue-400 p-2 rounded-lg"><Layers size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Anatomy of a Program</h2>
                </div>

                <TheoryCard title="Structure Breakdown" icon={<FileCode size={18} />} variant="orange">
                    <p>
                        Every C program follows specific rules. The <code>main()</code> function is mandatory—it's the entry point.
                        Directives like <code>#include</code> load necessary libraries before compilation starts.
                        Comments are used for documentation and are ignored by the compiler.
                    </p>
                </TheoryCard>

                <AnatomyViewer />

                {/* EXPANDED CONTENT: Whitespace & Comments Demo */}
                <WhitespaceDemo />

                <div className="mt-12 bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4">Common Pitfalls</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-[#0f172a] p-4 rounded-lg border border-red-900/30 hover:border-red-500/50 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                                <X size={16} className="text-red-500" />
                                <span className="font-bold text-red-200 text-sm">Missing Semicolon</span>
                            </div>
                            <code className="text-xs font-mono bg-black/30 p-1 rounded block mb-1">printf("Hello")</code>
                            <p className="text-xs text-slate-400">Error! Every statement must end with <code>;</code></p>
                        </div>
                        <div className="bg-[#0f172a] p-4 rounded-lg border border-red-900/30 hover:border-red-500/50 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                                <X size={16} className="text-red-500" />
                                <span className="font-bold text-red-200 text-sm">Case Sensitivity</span>
                            </div>
                            <code className="text-xs font-mono bg-black/30 p-1 rounded block mb-1">Void Main()</code>
                            <p className="text-xs text-slate-400">Error! C is case-sensitive. Use <code>void main()</code>.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: COMPILATION */}
            <section id="compile" className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <span className="bg-green-600/20 text-green-400 p-2 rounded-lg"><CpuIcon size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">The Compilation Process</h2>
                </div>

                <TheoryCard title="From Code to Execution" icon={<Play size={18} />} variant="green">
                    <p>
                        Computers don't understand C code directly. It must be translated into machine language (binary).
                        This pipeline ensures your human-readable logic becomes CPU-executable instructions.
                    </p>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-slate-900/80 p-3 rounded border border-green-900/30">
                            <strong className="text-green-400 block mb-1">Source File (.c)</strong>
                            Text file containing C code.
                        </div>
                        <div className="bg-slate-900/80 p-3 rounded border border-green-900/30">
                            <strong className="text-green-400 block mb-1">Object File (.obj / .o)</strong>
                            Machine code, but missing links to libraries.
                        </div>
                        <div className="bg-slate-900/80 p-3 rounded border border-green-900/30">
                            <strong className="text-green-400 block mb-1">Executable (.exe / a.out)</strong>
                            Final runnable program.
                        </div>
                    </div>
                </TheoryCard>

                <CompilationFlow />
            </section>

            {/* FOOTER */}
            <footer className="border-t border-slate-800 bg-[#020617] py-12 text-center">
                <p className="text-slate-500 text-sm">C Programming • Unit 1</p>
            </footer>
        </div>
    );
}
