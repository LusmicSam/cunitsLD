'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
    Grid, Play, RotateCcw, CheckCircle,
    Terminal, Layers, Info, X, Calculator,
    ArrowRight, LayoutGrid, Database, Plus, AlertTriangle
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const CodeBlock = ({ code, language = 'c', explanation }: { code: string, language?: string, explanation: string }) => {
    const [showExplanation, setShowExplanation] = useState(false);

    return (
        <div className="bg-[#0d1117] rounded-lg overflow-hidden border border-slate-700 my-4 shadow-2xl relative group transition-all duration-300">
            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-700">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono uppercase">{language}</span>
                    <button
                        onClick={() => setShowExplanation(!showExplanation)}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-all font-bold ${showExplanation
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                    >
                        {showExplanation ? <X size={14} /> : <Info size={14} />}
                        {showExplanation ? 'Close Explanation' : 'Explain Logic'}
                    </button>
                </div>
            </div>

            <div className="relative">
                <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-slate-300">
                    {code}
                </pre>

                <div className={`
          absolute inset-0 bg-[#0f172a]/95 backdrop-blur-sm p-5 overflow-y-auto transition-opacity duration-300
          ${showExplanation ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}>
                    <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
                        <Terminal size={16} /> Logic Breakdown
                    </h4>
                    <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-2">
                        {explanation.split('\n').map((line, i) => (
                            <p key={i} className={`
                ${line.trim().startsWith('•') ? 'pl-4 text-slate-200' : ''}
                ${line.trim().startsWith('1.') || line.trim().startsWith('2.') ? 'font-bold text-white mt-3' : ''}
              `}>
                                {line}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 1. Row-Major Order Visualizer
const RowMajorVisualizer = () => {
    const [hoverCell, setHoverCell] = useState<{ r: number, c: number } | null>(null);
    const rows = 3;
    const cols = 3;
    const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><LayoutGrid size={20} /></div>
                <h3 className="text-lg font-bold text-white">Row-Major Mapping</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
                {/* Grid View */}
                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase mb-2">Logical View (2D)</span>
                    <div className="grid grid-cols-3 gap-2 bg-slate-800 p-3 rounded-lg border border-slate-700 shadow-lg">
                        {matrix.map((row, r) => (
                            row.map((val, c) => (
                                <div
                                    key={`${r}-${c}`}
                                    onMouseEnter={() => setHoverCell({ r, c })}
                                    onMouseLeave={() => setHoverCell(null)}
                                    className={`w-12 h-12 flex items-center justify-center rounded font-bold text-lg transition-all cursor-pointer border-2 ${hoverCell?.r === r && hoverCell?.c === c
                                        ? 'bg-purple-600 border-purple-400 text-white scale-110 z-10'
                                        : 'bg-slate-700 border-slate-600 text-slate-300'
                                        }`}
                                >
                                    {val}
                                </div>
                            ))
                        ))}
                    </div>
                    <div className="mt-2 text-xs text-slate-500">Hover to trace memory</div>
                </div>

                <ArrowRight className="text-slate-600 hidden md:block" size={32} />

                {/* Linear View */}
                <div className="flex flex-col items-center w-full md:w-auto overflow-x-auto">
                    <span className="text-xs font-bold text-slate-500 uppercase mb-2">Physical Memory (1D)</span>
                    <div className="flex gap-1 p-2 bg-slate-950 rounded-lg border border-slate-800">
                        {matrix.flat().map((val, idx) => {
                            const r = Math.floor(idx / cols);
                            const c = idx % cols;
                            const isMatch = hoverCell?.r === r && hoverCell?.c === c;

                            return (
                                <div
                                    key={idx}
                                    className={`w-10 h-14 flex flex-col items-center justify-center rounded border-2 transition-all ${isMatch
                                        ? 'bg-purple-900/50 border-purple-500 text-white scale-110 z-10'
                                        : 'bg-slate-900 border-slate-800 text-slate-500'
                                        }`}
                                >
                                    <span className="font-bold">{val}</span>
                                    <span className="text-[9px] font-mono opacity-50">{idx}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-2 text-xs text-slate-500">Index = (Row × Cols) + Col</div>
                </div>
            </div>
        </div>
    );
};

// 2. Nested Loop Simulator
const NestedLoopSim = () => {
    const [i, setI] = useState(0);
    const [j, setJ] = useState(-1);
    const [running, setRunning] = useState(false);
    const rows = 2, cols = 3;

    const runSim = async () => {
        if (running) return;
        setRunning(true);
        setI(0); setJ(-1);

        for (let r = 0; r < rows; r++) {
            setI(r);
            for (let c = 0; c < cols; c++) {
                setJ(c);
                await new Promise(res => setTimeout(res, 800));
            }
        }
        setRunning(false);
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><RotateCcw size={20} /></div>
                    <h3 className="text-lg font-bold text-white">Nested Loop Traversal</h3>
                </div>
                <button
                    onClick={runSim}
                    disabled={running}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all"
                >
                    {running ? 'Running...' : 'Start Simulation'} <Play size={16} />
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Code Highlight */}
                <div className="bg-[#0d1117] p-4 rounded-lg font-mono text-sm border border-slate-700 relative">
                    <div className="text-slate-500">// Printing Matrix</div>
                    <div className={`transition-colors ${running && j === -1 ? 'bg-slate-800 text-white' : 'text-slate-400'}`}>
                        for(int i=0; i&lt;2; i++) {'{'} <span className="text-slate-500">// Outer (Rows)</span>
                    </div>
                    <div className={`pl-4 transition-colors ${running && j >= 0 ? 'bg-slate-800 text-white' : 'text-slate-400'}`}>
                        for(int j=0; j&lt;3; j++) {'{'} <span className="text-slate-500">// Inner (Cols)</span>
                    </div>
                    <div className={`pl-8 transition-colors ${running && j >= 0 ? 'text-green-400 font-bold' : 'text-slate-400'}`}>
                        printf("%d ", mat[i][j]);
                    </div>
                    <div className="pl-4 text-slate-400">{'}'}</div>
                    <div className="text-slate-400">{'}'}</div>

                    <div className="mt-4 pt-4 border-t border-slate-800 flex gap-4 text-xs">
                        <div>Current i: <span className="text-blue-400 font-bold text-lg">{i}</span></div>
                        <div>Current j: <span className="text-green-400 font-bold text-lg">{j === -1 ? '-' : j}</span></div>
                    </div>
                </div>

                {/* Visual Grid */}
                <div className="flex items-center justify-center bg-slate-950 rounded-lg border border-slate-800">
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            [1, 2, 3],
                            [4, 5, 6]
                        ].map((row, r) => (
                            row.map((val, c) => (
                                <div
                                    key={`${r}-${c}`}
                                    className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 font-bold text-xl transition-all duration-300 ${i === r && j === c
                                        ? 'bg-green-600 border-green-400 text-white scale-110 shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                                        : i === r
                                            ? 'bg-blue-900/30 border-blue-500/50 text-blue-200'
                                            : 'bg-slate-800 border-slate-700 text-slate-600'
                                        }`}
                                >
                                    {val}
                                    <span className="absolute bottom-1 right-1 text-[8px] font-mono opacity-50">[{r}][{c}]</span>
                                </div>
                            ))
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Memory Address Calculator
const AddressCalculator = () => {
    const [base, setBase] = useState(2000);
    const [rowIdx, setRowIdx] = useState(1);
    const [colIdx, setColIdx] = useState(2);
    const cols = 3; // Fixed for example
    const size = 4; // int size

    const linearIndex = (rowIdx * cols) + colIdx;
    const address = base + (linearIndex * size);

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><Calculator size={20} /></div>
                <h3 className="text-lg font-bold text-white">Address Calculator</h3>
            </div>

            <p className="text-slate-400 text-sm mb-6">
                Verify the <strong>Row-Major Formula</strong>: <code>Addr(A[i][j]) = Base + (i × N + j) × Size</code>
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Base Address</label>
                    <input type="number" value={base} onChange={e => setBase(Number(e.target.value))} className="w-full bg-slate-800 border-slate-600 rounded p-2 text-white font-mono mt-1" />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Row (i)</label>
                    <input type="number" value={rowIdx} onChange={e => setRowIdx(Number(e.target.value))} className="w-full bg-slate-800 border-slate-600 rounded p-2 text-white font-mono mt-1" />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Col (j)</label>
                    <input type="number" value={colIdx} onChange={e => setColIdx(Number(e.target.value))} className="w-full bg-slate-800 border-slate-600 rounded p-2 text-white font-mono mt-1" />
                </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg font-mono text-center border border-slate-800">
                <div className="text-slate-500 text-xs mb-2">Linear Index Calculation</div>
                <div className="mb-4">
                    <span className="text-blue-400">{rowIdx}</span> (row) × <span className="text-slate-400">3</span> (cols) + <span className="text-green-400">{colIdx}</span> (col) = <span className="text-white font-bold">{linearIndex}</span>
                </div>
                <div className="border-t border-slate-800 pt-4">
                    <div className="text-slate-500 text-xs mb-2">Final Address</div>
                    <span className="text-purple-400">{base}</span> + (<span className="text-white">{linearIndex}</span> × 4) = <span className="text-2xl font-bold text-white ml-2">{address}</span>
                </div>
            </div>
        </div>
    );
};

// 4. Matrix Addition Visualizer
const MatrixAdditionSim = () => {
    const [matA, setMatA] = useState([
        [1, 2],
        [3, 4]
    ]);
    const [matB, setMatB] = useState([
        [5, 6],
        [7, 8]
    ]);

    const updateA = (r: number, c: number, v: number) => {
        const newA = [...matA]; newA[r][c] = v; setMatA(newA);
    };
    const updateB = (r: number, c: number, v: number) => {
        const newB = [...matB]; newB[r][c] = v; setMatB(newB);
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400"><Plus size={20} /></div>
                <h3 className="text-lg font-bold text-white">Matrix Addition Lab</h3>
            </div>
            <p className="text-sm text-slate-400 mb-6">
                Matrix addition happens cell-by-cell. <code>Sum[i][j] = A[i][j] + B[i][j]</code>.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
                {/* Matrix A */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-xs text-blue-400 mb-2 font-bold">Matrix A</div>
                    <div className="grid grid-cols-2 gap-2">
                        {matA.map((row, r) => row.map((val, c) => (
                            <input
                                key={`a-${r}-${c}`}
                                type="number"
                                value={val}
                                onChange={e => updateA(r, c, Number(e.target.value))}
                                className="w-12 h-12 bg-slate-800 border border-slate-700 text-center text-white rounded focus:border-blue-500 outline-none"
                            />
                        )))}
                    </div>
                </div>

                <Plus className="text-slate-500" />

                {/* Matrix B */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-xs text-green-400 mb-2 font-bold">Matrix B</div>
                    <div className="grid grid-cols-2 gap-2">
                        {matB.map((row, r) => row.map((val, c) => (
                            <input
                                key={`b-${r}-${c}`}
                                type="number"
                                value={val}
                                onChange={e => updateB(r, c, Number(e.target.value))}
                                className="w-12 h-12 bg-slate-800 border border-slate-700 text-center text-white rounded focus:border-green-500 outline-none"
                            />
                        )))}
                    </div>
                </div>

                <ArrowRight className="text-slate-500" />

                {/* Result */}
                <div className="bg-slate-950 p-3 rounded-lg border-2 border-dashed border-slate-700 text-center">
                    <div className="text-xs text-purple-400 mb-2 font-bold">Result</div>
                    <div className="grid grid-cols-2 gap-2">
                        {matA.map((row, r) => row.map((_, c) => (
                            <div
                                key={`res-${r}-${c}`}
                                className="w-12 h-12 bg-purple-900/20 border border-purple-500/50 flex items-center justify-center text-white font-bold rounded"
                            >
                                {matA[r][c] + matB[r][c]}
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

const Lecture2Page = () => {
    const declExpl = `1. **int**: The type of data stored in every cell (integer).
2. **matrix**: The name of the 2D array.
3. **[2]**: The number of ROWS.
4. **[3]**: The number of COLUMNS.
5. **Initialization**: We use nested braces {}. 
   • The first inner brace {1, 2, 3} fills Row 0.
   • The second inner brace {4, 5, 6} fills Row 1.`;

    const loopExpl = `1. **Outer Loop (i)**: Controls the ROWS. It runs 2 times (0 to 1).
2. **Inner Loop (j)**: Controls the COLUMNS. For *every* row, this loop runs 3 times (0 to 2).
3. **mat[i][j]**: Accesses the specific cell. 
   • When i=0, j goes 0,1,2 -> accessing Row 0.
   • When i=1, j goes 0,1,2 -> accessing Row 1.`;

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-purple-500/30">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 z-40 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <Image
                        src="/cunits/logo.png"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="rounded-lg object-contain"
                    />
                    <div>
                        <h1 className="font-bold text-white text-sm md:text-base leading-tight">2D Arrays & Matrices</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 4 • Lecture 2</p>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-white mb-6">
                    The Grid Paradigm
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                    A 2D Array is essentially an <strong>"Array of Arrays"</strong>. While we visualize it as a table with rows and columns, the computer still sees it as one long, continuous strip of memory.
                </p>
            </section>

            {/* SECTION 1: VISUALIZATION */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-purple-600/20 text-purple-400 p-2 rounded-lg"><Grid size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Grid vs. Linear Memory</h2>
                </div>

                <p className="text-slate-300 mb-6">
                    In C, 2D arrays use <strong>Row-Major Order</strong>. This means the entire first row is stored, followed immediately by the second row.
                </p>

                <RowMajorVisualizer />

                <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg flex gap-4 mt-6">
                    <Info className="text-blue-400 shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-blue-400 text-sm">Why Row-Major Matters?</h4>
                        <p className="text-sm text-blue-200/70 mt-1">
                            Accessing memory sequentially is faster due to CPU caching. Traversing a matrix row-by-row is usually faster than column-by-column because it follows the linear memory layout.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 2: SYNTAX & LOGIC */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-green-600/20 text-green-400 p-2 rounded-lg"><Terminal size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Syntax & Processing</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Declaration</h4>
                        <CodeBlock
                            code={`int matrix[2][3] = {
  {1, 2, 3}, 
  {4, 5, 6}
};`}
                            explanation={declExpl}
                        />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Traversal Pattern</h4>
                        <CodeBlock
                            code={`for(int i=0; i<2; i++) {
  for(int j=0; j<3; j++) {
    printf("%d ", matrix[i][j]);
  }
}`}
                            explanation={loopExpl}
                        />
                    </div>
                </div>

                <div className="mt-8 bg-slate-900 p-5 rounded-lg border border-slate-700">
                    <h3 className="text-white font-bold mb-4 flex gap-2 items-center">
                        <AlertTriangle className="text-yellow-500" size={20} />
                        Initialization Patterns
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <div className="flex gap-2 items-center text-sm font-mono text-green-400">
                                <CheckCircle size={16} /> <span>int mat[2][2] = {'{{1,2},{3,4}}'};</span>
                            </div>
                            <div className="flex gap-2 items-center text-sm font-mono text-green-400">
                                <CheckCircle size={16} /> <span>int mat[2][2] = {'{1,2,3,4}'};</span>
                            </div>
                            <div className="flex gap-2 items-center text-sm font-mono text-green-400">
                                <CheckCircle size={16} /> <span>int mat[][2] = {'{1,2,3,4}'};</span>
                            </div>
                            <p className="text-xs text-slate-500 ml-6">
                                *Valid: Row size can be inferred, but column size is mandatory.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex gap-2 items-center text-sm font-mono text-red-400 opacity-80">
                                <X size={16} /> <span>int mat[2][] = {'{1,2,3,4}'};</span>
                            </div>
                            <div className="flex gap-2 items-center text-sm font-mono text-red-400 opacity-80">
                                <X size={16} /> <span>int mat[][] = {'{1,2,3,4}'};</span>
                            </div>
                            <p className="text-xs text-slate-500 ml-6">
                                *Invalid: Compiler must know the column count (stride) to calculate memory jumps.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: NESTED LOOP SIMULATOR */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-orange-600/20 text-orange-400 p-2 rounded-lg"><Play size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Nested Loop Simulator</h2>
                </div>
                <p className="text-slate-300 mb-6">
                    Watch how the inner loop completes a full cycle for every single step of the outer loop.
                </p>
                <NestedLoopSim />
            </section>

            {/* SECTION 4: ADDRESS CALCULATION */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-red-600/20 text-red-400 p-2 rounded-lg"><Database size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Address Calculation</h2>
                </div>
                <AddressCalculator />
            </section>

            {/* SECTION 5: MATRIX MATH LAB */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-pink-600/20 text-pink-400 p-2 rounded-lg"><Plus size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Interactive Matrix Addition</h2>
                </div>
                <MatrixAdditionSim />
            </section>

            {/* SECTION 6: APPLICATIONS */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-slate-700/50 text-slate-200 p-2 rounded-lg"><Layers size={24} /></span>
                    <h2 className="text-2xl font-bold text-white">Applications</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {[
                        { title: "Matrix Math", desc: "Addition, Multiplication, Determinants." },
                        { title: "Image Processing", desc: "Images are just 2D arrays of pixels (RGB values)." },
                        { title: "Game Boards", desc: "Chess, Tic-Tac-Toe, and Sudoku grids." },
                        { title: "Tabular Data", desc: "Storing spreadsheets or database records." },
                        { title: "Dynamic Programming", desc: "Solving complex pathfinding problems." },
                        { title: "Graphs", desc: "Adjacency matrices to represent network connections." },
                    ].map((app, i) => (
                        <div key={i} className="bg-slate-900 p-4 rounded-lg border border-slate-800 hover:border-purple-500 transition-colors group">
                            <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">{app.title}</h4>
                            <p className="text-sm text-slate-400 mt-2">{app.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Lecture2Page;
