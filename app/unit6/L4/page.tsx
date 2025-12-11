'use client';

import React, { useState, useEffect } from 'react';
import {
    Combine,
    Layers,
    AlertTriangle,
    Database,
    Binary,
    ArrowRight,
    Cpu,
    Monitor,
    CheckCircle,
    XCircle,
    Box,
    LayoutGrid,
    Network,
    FileCode,
    BookOpen
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const SectionHeader = ({ title, icon: Icon, color = "blue" }: { title: string, icon: any, color?: string }) => (
    <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
        <span className={`bg-${color}-600/20 text-${color}-400 p-2 rounded-lg`}>
            <Icon size={24} />
        </span>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
);

const CodeBlock = ({ code, title }: { code: string, title?: string }) => (
    <div className="bg-[#0d1117] rounded-lg overflow-hidden border border-slate-700 my-4 shadow-xl font-mono text-sm w-full">
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-700">
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-xs text-slate-500 uppercase">{title || "C Snippet"}</span>
        </div>
        <div className="p-4 text-slate-300 overflow-x-auto whitespace-pre leading-relaxed">
            {code}
        </div>
    </div>
);

const TheoryCard = ({ title, children, variant = 'blue' }: { title: string, children: React.ReactNode, variant?: string }) => {
    const colors: Record<string, string> = {
        blue: 'border-blue-500 bg-blue-900/10',
        purple: 'border-purple-500 bg-purple-900/10',
        orange: 'border-orange-500 bg-orange-900/10',
        red: 'border-red-500 bg-red-900/10',
        green: 'border-green-500 bg-green-900/10',
        yellow: 'border-yellow-500 bg-yellow-900/10'
    };

    return (
        <div className={`border-l-4 ${colors[variant]} rounded-r-lg p-6 my-6 transition-all hover:bg-opacity-20 backdrop-blur-sm`}>
            <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                {title}
            </h4>
            <div className="text-slate-300 text-sm leading-relaxed space-y-2">
                {children}
            </div>
        </div>
    );
};

// --- INTERACTIVE COMPONENTS ---

const StructVsUnion = () => {
    const [mode, setMode] = useState<'struct' | 'union'>('struct');
    const [intVal, setIntVal] = useState(65);
    const [charVal, setCharVal] = useState('A');
    const [floatVal, setFloatVal] = useState(1.5);

    const handleIntChange = (v: number) => {
        setIntVal(v);
        if (mode === 'union') {
            // In union, all members share memory. Approximating the effect.
            setCharVal(String.fromCharCode(v % 256));
            setFloatVal(v); // Not accurate bitwise rep, but shows "clobbering"
        }
    };

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Combine size={20} className="text-blue-400" /> Struct vs Union: The Memory War
            </h3>

            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setMode('struct')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all border-2 ${mode === 'struct' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                >
                    Struct (Separate Memory)
                </button>
                <button
                    onClick={() => setMode('union')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all border-2 ${mode === 'union' ? 'bg-orange-600 border-orange-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                >
                    Union (Shared Memory)
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Controls */}
                <div className="space-y-6">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">int i (4 Bytes)</label>
                        <input
                            type="number" value={intVal} onChange={e => handleIntChange(Number(e.target.value))}
                            className="bg-black border border-slate-700 rounded p-2 text-white w-full font-mono"
                        />
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 relative overflow-hidden">
                        <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">char c (1 Byte)</label>
                        <div className="text-2xl font-mono font-bold text-white">{charVal}</div>
                        {mode === 'union' && <div className="absolute top-2 right-2 text-[10px] text-orange-400 font-bold animate-pulse">OVERWRITTEN!</div>}
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 relative overflow-hidden">
                        <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">float f (4 Bytes)</label>
                        <div className="text-2xl font-mono font-bold text-white">{floatVal}</div>
                        {mode === 'union' && <div className="absolute top-2 right-2 text-[10px] text-orange-400 font-bold animate-pulse">CORRUPTED!</div>}
                    </div>
                </div>

                {/* Visualization */}
                <div className="flex flex-col justify-center gap-4">
                    <div className="text-center text-sm font-bold text-slate-400 mb-2">Memory Layout</div>

                    {mode === 'struct' ? (
                        <div className="flex flex-col gap-2 animate-in slide-in-from-left-4">
                            <div className="h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">int i (4B)</div>
                            <div className="h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg w-1/4">char c (1B)</div>
                            <div className="h-16 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">float f (4B)</div>
                            <div className="mt-2 text-center text-xs text-slate-400">Total Size: 9+ Bytes (Padding added)</div>
                        </div>
                    ) : (
                        <div className="relative h-48 border-4 border-orange-500 rounded-xl bg-orange-900/10 flex items-center justify-center overflow-hidden animate-in zoom-in">
                            <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center">
                                <span className="text-blue-300 font-bold opacity-50 text-4xl">int i</span>
                            </div>
                            <div className="absolute top-0 left-0 w-1/4 h-full bg-purple-600/30 flex items-start p-2">
                                <span className="text-purple-300 font-bold text-xs">char c</span>
                            </div>
                            <div className="absolute inset-0 border-2 border-green-500/30 flex items-end justify-center pb-2">
                                <span className="text-green-300 font-bold opacity-50 text-xl">float f</span>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-orange-400 font-bold">
                                Total Size: 4 Bytes (Largest Member)
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <TheoryCard title="Deep Dive: Size Calculation" variant={mode === 'struct' ? 'blue' : 'orange'}>
                {mode === 'struct' ? (
                    <p className="text-xs">
                        <strong>Struct Size:</strong> Sum of all members + Padding for alignment.
                        <br /><code>sizeof(struct)</code> = 4 + 1 + 3(pad) + 4 = 12 Bytes (typically).
                    </p>
                ) : (
                    <p className="text-xs">
                        <strong>Union Size:</strong> Size of the <strong>LARGEST</strong> member.
                        <br />Since <code>int</code> and <code>float</code> are both 4 bytes, the union is 4 bytes. All members start at offset 0.
                        Writing to one overwrites the bits of the others.
                    </p>
                )}
            </TheoryCard>
        </div>
    );
};

const TaggedUnionLab = () => {
    const [type, setType] = useState<'INT' | 'FLOAT' | 'STR'>('INT');

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Box size={20} className="text-green-400" /> Safe Usage: Tagged Union
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <TheoryCard title="Polymorphism in C" variant="green">
                        <p className="text-sm">
                            Since C lacks "Classes" with dynamic types, we use <strong>Tagged Unions</strong> to simulate Polymorphism (a variable that can hold different types).
                            <br /><br />
                            <strong>Structure:</strong> A <code>struct</code> containing an <code>enum</code> (Tag) and a <code>union</code> (Value).
                        </p>
                    </TheoryCard>
                    <CodeBlock
                        title="Safe Pattern"
                        code={'struct Variant {\n  enum { INT, FLOAT, STR } type;\n  union {\n    int i;\n    float f;\n    char str[10];\n  } val;\n};'}
                    />
                </div>

                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-center">
                    <div className="flex gap-2 mb-6 justify-center">
                        {['INT', 'FLOAT', 'STR'].map(t => (
                            <button
                                key={t}
                                onClick={() => setType(t as any)}
                                className={`px-3 py-1 rounded text-xs font-bold transition-all ${type === t ? 'bg-green-600 text-white' : 'bg-slate-800 border border-slate-600 text-slate-400'}`}
                            >
                                Set {t}
                            </button>
                        ))}
                    </div>

                    <div className="bg-black p-4 rounded-lg border border-slate-700 font-mono text-sm relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-2">
                            <span className="text-blue-400 font-bold">tag:</span>
                            <span className="text-white">{type}</span>
                        </div>
                        <div className="border-t border-slate-800 my-2"></div>
                        <div className="relative h-12 flex items-center">
                            {type === 'INT' && <span className="text-green-400 font-bold text-xl animate-in fade-in">val.i = 42</span>}
                            {type === 'FLOAT' && <span className="text-orange-400 font-bold text-xl animate-in fade-in">val.f = 3.14</span>}
                            {type === 'STR' && <span className="text-purple-400 font-bold text-xl animate-in fade-in">val.str = "Hi"</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EndiannessInspector = () => {
    const val = 0x11223344;

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Binary size={20} className="text-yellow-400" /> Type Punning & Endianness
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <TheoryCard title="Type Punning" variant="yellow">
                        <p className="text-sm">
                            <strong>Type Punning</strong> is accessing the same memory location using different types.
                            Unions make this easy (though dangerous).
                            <br /><br />
                            Here, we write an <code>int</code> but read it back as an <code>array of chars</code> to see the individual bytes.
                        </p>
                    </TheoryCard>
                    <CodeBlock code={'union {\n  int i;\n  char c[4];\n} u;\nu.i = 0x11223344;'} />
                </div>

                <div className="flex flex-col justify-center gap-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase text-center mb-2">Memory View (Little Endian)</h4>
                    <div className="flex gap-2 justify-center">
                        {['44', '33', '22', '11'].map((byte, i) => (
                            <div key={i} className="flex flex-col items-center group">
                                <div className="w-12 h-12 bg-yellow-900/20 border border-yellow-500/50 rounded flex items-center justify-center text-yellow-400 font-mono font-bold shadow-lg transition-transform group-hover:scale-110">
                                    {byte}
                                </div>
                                <span className="text-[10px] text-slate-500 mt-1">c[{i}]</span>
                                <span className="text-[9px] text-slate-600">Addr +{i}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-center text-xs text-slate-400 bg-slate-950 p-2 rounded border border-slate-800 mt-4">
                        Note: Least Significant Byte (44) is stored at the Lowest Address.
                    </div>
                </div>
            </div>
        </div>
    );
};

const NetworkPacket = () => {
    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Network size={20} className="text-blue-400" /> Real World: Network Packets
            </h3>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <TheoryCard title="Packet Parsing" variant="blue">
                        <p className="text-sm">
                            Network protocols (like TCP/IP) send data as a stream of bytes.
                            Unions allow us to define a "Packet Template" to overlay onto this raw stream, instantly parsing headers without math.
                        </p>
                    </TheoryCard>
                </div>
                <div className="flex-1 bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <CodeBlock title="IP Header Parser" code={'union IP_Packet {\n  struct {\n    char version;\n    char src_ip[4];\n    char dest_ip[4];\n    char data[20];\n  } header;\n  char raw_buffer[29];\n};'} />
                    <div className="mt-2 text-xs text-slate-500 text-center">
                        Accessing <code>packet.raw_buffer</code> gives the byte stream.
                        <br />Accessing <code>packet.header.version</code> gives the parsed value instantly.
                    </div>
                </div>
            </div>
        </div>
    );
};

const RegisterMap = () => {
    const [reg, setReg] = useState(0);

    const toggleBit = (bit: number) => {
        setReg(prev => prev ^ (1 << bit));
    };

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Cpu size={20} className="text-red-400" /> Hardware Registers (Bit-Field Union)
            </h3>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <TheoryCard title="Bit-Addressable Memory" variant="red">
                        <p className="text-sm">
                            In embedded systems (Arduino, STM32), we often need to access a full 8-bit register AND individual control bits simultaneously.
                            A Union of a <code>byte</code> and a <code>struct</code> with bit-fields makes this easy.
                        </p>
                    </TheoryCard>

                    <div className="flex items-center justify-between bg-black p-3 rounded border border-slate-800">
                        <span className="text-slate-400 font-bold">Raw Value (Hex)</span>
                        <span className="text-red-400 font-mono font-bold text-xl">0x{reg.toString(16).toUpperCase().padStart(2, '0')}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {[7, 6, 5, 4, 3, 2, 1, 0].map(i => (
                            <button
                                key={i}
                                onClick={() => toggleBit(i)}
                                className={`w-10 h-12 rounded border flex flex-col items-center justify-center transition-all ${(reg & (1 << i))
                                    ? 'bg-red-600 border-red-400 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                                    : 'bg-slate-900 border-slate-700 text-slate-600'
                                    }`}
                            >
                                <span className="text-lg font-bold font-mono">{(reg & (1 << i)) ? 1 : 0}</span>
                                <span className="text-[8px] mt-1">Bit {i}</span>
                            </button>
                        ))}
                    </div>
                    <div className="text-center text-xs text-slate-500">
                        Union allows accessing <code>reg.byte</code> OR <code>reg.bits.bit3</code> instantly.
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture4Page() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-32">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-white text-sm leading-tight">Unions & Memory</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 6 • Lecture 4</p>
                    </div>
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-orange-900/20 border border-orange-500/30 text-orange-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <Combine size={14} /> Shared Memory
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-white">Union</span> of Data
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Structures place variables side-by-side. Unions stack them on top of each other.
                        Powerful for saving memory, but dangerous if misunderstood.
                    </p>
                </div>

                {/* SECTION 1: STRUCT VS UNION */}
                <section>
                    <SectionHeader title="Struct vs Union" icon={Layers} color="blue" />
                    <TheoryCard title="The Core Difference" variant="blue">
                        <ul className="list-disc pl-4 space-y-1 text-sm text-slate-300">
                            <li><strong>Struct:</strong> Allocates memory for ALL members. Size = Sum of members (+ padding).</li>
                            <li><strong>Union:</strong> Allocates memory for LARGEST member only. All members share the same start address.</li>
                        </ul>
                    </TheoryCard>
                    <StructVsUnion />
                </section>

                {/* SECTION 2: SAFE USAGE */}
                <section>
                    <SectionHeader title="Safe Usage Patterns" icon={CheckCircle} color="green" />
                    <p className="text-slate-400 mb-8">
                        Since unions hold only one value at a time, how do you track which one is active? Use a "Tag".
                    </p>
                    <TaggedUnionLab />
                </section>

                {/* SECTION 3: SYSTEM LEVEL */}
                <section>
                    <SectionHeader title="System Hacking: Endianness" icon={Binary} color="yellow" />
                    <p className="text-slate-400 mb-8">
                        Unions allow us to bypass type safety and look at the raw bytes of an integer.
                    </p>
                    <EndiannessInspector />
                </section>

                {/* SECTION 4: REAL WORLD APPS */}
                <section>
                    <SectionHeader title="Networking: Packet Parsing" icon={Network} color="blue" />
                    <NetworkPacket />
                </section>

                {/* SECTION 5: HARDWARE */}
                <section>
                    <SectionHeader title="Hardware Registers" icon={Cpu} color="red" />
                    <p className="text-slate-400 mb-8">
                        Combining Unions with Bit-Fields gives you ultimate control over hardware registers without bitwise math headaches.
                    </p>
                    <RegisterMap />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-slate-800 bg-[#020617] py-12 text-center text-slate-600 text-sm">
                <p>C Programming Course • Unit 6 • Lecture 4</p>
            </footer>
        </div>
    );
}
