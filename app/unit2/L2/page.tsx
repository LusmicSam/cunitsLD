"use client";

import React, { useState, useEffect } from 'react';
import {
    GitBranch,
    Split,
    List,
    AlertTriangle,
    CheckCircle,
    XCircle,
    ArrowRight,
    ArrowDown,
    CornerDownRight,
    Settings,
    Coffee,
    Zap,
    Code,
    CornerUpLeft,
    CreditCard,
    DollarSign,
    Lock,
    Menu,
    RefreshCcw,
    SkipForward,
    Grid,
    Unlock,
    TrendingUp
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

// --- INTERACTIVE COMPONENTS ---

const DecisionEngine = () => {
    const [marks, setMarks] = useState(75);

    // Determine active path
    const getGrade = (m: number) => {
        if (m >= 90) return 'A';
        if (m >= 80) return 'B';
        if (m >= 70) return 'C';
        if (m >= 60) return 'D';
        return 'F';
    };

    const activeGrade = getGrade(marks);

    const Node = ({ label, condition, isActive, isLeaf = false, grade }: { label: string, condition?: string, isActive: boolean, isLeaf?: boolean, grade?: string }) => (
        <div className={`flex flex-col items-center relative z-10 transition-all duration-500 ${isActive ? 'opacity-100 scale-105' : 'opacity-40 blur-[1px]'}`}>
            <div className={`p-3 rounded-lg border-2 font-bold min-w-[120px] text-center relative
        ${isLeaf
                    ? isActive ? 'bg-green-600 border-green-400 text-white shadow-[0_0_20px_rgba(34,197,94,0.6)]' : 'bg-slate-900 border-slate-700 text-slate-500'
                    : isActive ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)]' : 'bg-slate-900 border-slate-700 text-slate-500'
                }
      `}>
                {isLeaf ? `Grade: ${grade}` : condition}
            </div>
            {!isLeaf && (
                <div className="h-8 w-0.5 bg-slate-600 my-1"></div>
            )}
        </div>
    );

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Split size={20} className="text-blue-400" /> The Logic Ladder (else-if)
            </h3>

            <div className="flex flex-col items-center mb-8">
                <label className="text-xs font-bold text-slate-500 uppercase mb-2">Input Marks: {marks}</label>
                <input
                    type="range" min="0" max="100" value={marks}
                    onChange={(e) => setMarks(Number(e.target.value))}
                    className="w-full max-w-md h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between w-full max-w-md text-[10px] text-slate-600 mt-1 font-mono">
                    <span>0 (F)</span>
                    <span>60 (D)</span>
                    <span>70 (C)</span>
                    <span>80 (B)</span>
                    <span>90 (A)</span>
                    <span>100</span>
                </div>
            </div>

            <div className="relative flex flex-col items-center gap-2">
                {/* Connection Lines Background */}
                <div className="absolute top-4 bottom-4 left-1/2 w-0.5 bg-slate-800 -z-0"></div>

                {/* Logic Nodes */}
                <div className="flex gap-8 items-start w-full justify-center relative">
                    <Node label="Check A" condition="marks >= 90?" isActive={true} />
                    {activeGrade === 'A' && (
                        <div className="absolute left-[50%] ml-20 top-2 animate-in slide-in-from-left-4 fade-in flex items-center gap-2 whitespace-nowrap z-20">
                            <ArrowRight className="text-green-500" />
                            <span className="bg-green-900/80 text-green-300 px-3 py-1 rounded text-xs font-bold border border-green-500/50 shadow-lg">True! Stop here.</span>
                        </div>
                    )}
                </div>

                {activeGrade !== 'A' && (
                    <div className="flex gap-8 items-start w-full justify-center animate-in slide-in-from-top-2 fade-in relative">
                        <Node label="Check B" condition="marks >= 80?" isActive={true} />
                        {activeGrade === 'B' && (
                            <div className="absolute left-[50%] ml-20 top-2 flex items-center gap-2 whitespace-nowrap z-20">
                                <ArrowRight className="text-green-500" />
                                <span className="bg-green-900/80 text-green-300 px-3 py-1 rounded text-xs font-bold border border-green-500/50 shadow-lg">True! Stop here.</span>
                            </div>
                        )}
                    </div>
                )}

                {activeGrade !== 'A' && activeGrade !== 'B' && (
                    <div className="flex gap-8 items-start w-full justify-center animate-in slide-in-from-top-2 fade-in relative">
                        <Node label="Check C" condition="marks >= 70?" isActive={true} />
                        {activeGrade === 'C' && (
                            <div className="absolute left-[50%] ml-20 top-2 flex items-center gap-2 whitespace-nowrap z-20">
                                <ArrowRight className="text-green-500" />
                                <span className="bg-green-900/80 text-green-300 px-3 py-1 rounded text-xs font-bold border border-green-500/50 shadow-lg">True! Stop here.</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Result Box */}
                <div className="mt-8">
                    <Node label="Result" isActive={true} isLeaf={true} grade={activeGrade} />
                </div>
            </div>
        </div>
    );
};

const SwitchMachine = () => {
    const [choice, setChoice] = useState(1);
    const [useBreak, setUseBreak] = useState(true);
    const [output, setOutput] = useState<string[]>([]);

    useEffect(() => {
        const lines = [];
        let fellThrough = false;

        // Simulate switch logic manually to show visual output
        if (choice === 1) {
            lines.push("Option 1 Selected: Cola");
            if (!useBreak) fellThrough = true;
        }

        if (choice === 2 || (choice === 1 && fellThrough)) {
            lines.push("Option 2 Selected: Chips");
            if (choice === 2 && !useBreak) fellThrough = true;
        }

        if (choice === 3 || ((choice === 1 || choice === 2) && fellThrough)) {
            lines.push("Option 3 Selected: Candy");
        }

        if (choice > 3) {
            lines.push("Default: Invalid Selection");
        }

        setOutput(lines);
    }, [choice, useBreak]);

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 my-8">
            <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <List size={20} className="text-orange-400" /> The Switch Machine
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Simulating menu selection logic.</p>
                </div>

                <div className="flex items-center gap-2 bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-xs font-bold text-slate-400">Use 'break'?</span>
                    <button
                        onClick={() => setUseBreak(!useBreak)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${useBreak ? 'bg-green-600' : 'bg-red-600'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${useBreak ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="bg-slate-900 p-4 rounded-xl border-2 border-slate-800 flex flex-col gap-2">
                        <div className="text-center text-slate-500 text-xs font-bold uppercase mb-2">Vending Machine</div>
                        {[1, 2, 3].map(num => (
                            <button
                                key={num}
                                onClick={() => setChoice(num)}
                                className={`p-3 rounded-lg border-2 text-left transition-all flex justify-between items-center
                  ${choice === num ? 'border-orange-500 bg-orange-900/20 text-white' : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700'}
                `}
                            >
                                <span>{num}. {num === 1 ? 'Cola' : num === 2 ? 'Chips' : 'Candy'}</span>
                                {choice === num && <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>}
                            </button>
                        ))}
                        <button
                            onClick={() => setChoice(99)}
                            className={`p-3 rounded-lg border-2 text-left transition-all ${choice > 3 ? 'border-red-500 bg-red-900/20 text-white' : 'border-slate-700 bg-slate-800 text-slate-400'}`}
                        >
                            99. [Invalid]
                        </button>
                    </div>
                </div>

                <div className="bg-black rounded-xl p-4 font-mono text-sm border border-slate-800 overflow-hidden relative">
                    <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] px-2 py-1 rounded-bl">OUTPUT CONSOLE</div>
                    <div className="mt-4 space-y-2">
                        {output.map((line, i) => (
                            <div key={i} className={`flex items-start gap-2 animate-in slide-in-from-left-2 fade-in duration-300 ${i > 0 ? 'text-yellow-500' : 'text-green-400'}`}>
                                <span className="text-slate-600">&gt;</span>
                                <span>{line}</span>
                                {i > 0 && <span className="text-[10px] bg-red-900/30 text-red-400 px-1 rounded ml-auto border border-red-900/50">FALLTHROUGH</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {!useBreak && choice < 4 && (
                <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded text-xs text-yellow-200 flex items-center gap-2">
                    <AlertTriangle size={14} /> Without <code>break</code>, execution "falls through" to the next case automatically!
                </div>
            )}
        </div>
    );
};

const NestedLogic = () => {
    const [age, setAge] = useState(20);
    const [hasId, setHasId] = useState(true);

    // Determine state
    let status = "denied";
    let message = "Too young.";

    if (age >= 18) {
        if (hasId) {
            status = "allowed";
            message = "Access Granted.";
        } else {
            status = "id_required";
            message = "Need ID Card.";
        }
    }

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 my-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <CornerDownRight size={20} className="text-purple-400" /> Nested Decisions
            </h3>

            <div className="flex gap-6 mb-8 justify-center">
                <div className="text-center">
                    <label className="text-xs text-slate-500 font-bold uppercase block mb-1">Age</label>
                    <input
                        type="number" value={age} onChange={e => setAge(Number(e.target.value))}
                        className="w-20 bg-slate-950 border border-slate-700 rounded p-2 text-center text-white"
                    />
                </div>
                <div className="text-center">
                    <label className="text-xs text-slate-500 font-bold uppercase block mb-1">Has ID?</label>
                    <button
                        onClick={() => setHasId(!hasId)}
                        className={`w-20 p-2 rounded font-bold text-sm border ${hasId ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-red-900/20 border-red-500 text-red-400'}`}
                    >
                        {hasId ? 'YES' : 'NO'}
                    </button>
                </div>
            </div>

            <div className="relative p-4 border-2 border-slate-700 rounded-xl bg-slate-950/50">
                <span className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs text-slate-400 font-mono">Outer Block (Age &gt;= 18)</span>

                <div className={`p-4 rounded transition-all duration-500 ${age >= 18 ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
                    <div className="flex items-center gap-2 mb-4 text-green-400 font-bold">
                        <CheckCircle size={16} /> Age Check Passed
                    </div>

                    <div className="relative p-4 border-2 border-purple-500/30 rounded-xl bg-purple-900/10 ml-8">
                        <span className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs text-purple-400 font-mono">Inner Block (Has ID?)</span>

                        <div className="flex items-center justify-between mt-2">
                            <span className={`font-bold ${hasId ? 'text-green-400' : 'text-red-400'}`}>
                                {hasId ? 'ID Verified' : 'ID Missing'}
                            </span>
                            <div className={`px-4 py-1 rounded text-xs font-bold uppercase text-white ${status === 'allowed' ? 'bg-green-600' : status === 'id_required' ? 'bg-yellow-600' : 'bg-red-600'
                                }`}>
                                {message}
                            </div>
                        </div>
                    </div>
                </div>

                {age < 18 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-xl">
                        <div className="bg-red-900/80 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2">
                            <XCircle /> Age Check Failed
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const AtmSimulator = () => {
    const [screen, setScreen] = useState<'pin' | 'menu' | 'withdraw' | 'deposit' | 'success'>('pin');
    const [pin, setPin] = useState("");
    const [balance, setBalance] = useState(1000);
    const [amount, setAmount] = useState(0);
    const [msg, setMsg] = useState("");

    const handlePin = () => {
        if (pin === "1234") {
            setScreen('menu');
            setMsg("");
        } else {
            setMsg("Invalid PIN!");
            setPin("");
        }
    };

    const handleWithdraw = () => {
        if (amount <= 0) {
            setMsg("Invalid Amount");
        } else if (amount > balance) {
            setMsg("Insufficient Funds!");
        } else {
            setBalance(b => b - amount);
            setScreen('success');
            setMsg(`Withdrawn $${amount}`);
        }
    };

    const handleDeposit = () => {
        if (amount <= 0) {
            setMsg("Invalid Amount");
        } else {
            setBalance(b => b + amount);
            setScreen('success');
            setMsg(`Deposited $${amount}`);
        }
    };

    return (
        <div className="bg-slate-900 border-4 border-slate-700 rounded-2xl p-6 my-8 max-w-lg mx-auto shadow-2xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 border-2 border-slate-600 px-4 py-1 rounded-full text-xs font-bold text-slate-400 uppercase tracking-widest">
                ATM Simulator
            </div>

            {/* Sticky Note */}
            <div className="absolute -top-6 -right-6 bg-yellow-200 text-yellow-900 p-3 rounded shadow-lg transform rotate-6 border border-yellow-300 w-24 text-center">
                <div className="text-[10px] font-bold uppercase border-b border-yellow-400 mb-1 pb-1">Secret</div>
                <div className="font-mono text-sm font-bold">PIN: 1234</div>
            </div>

            {/* SCREEN */}
            <div className="bg-[#0a0a0a] rounded-lg border-2 border-slate-600 p-6 h-64 flex flex-col items-center justify-center text-center relative overflow-hidden">
                {/* Scanlines Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>

                {screen === 'pin' && (
                    <div className="space-y-4 z-20">
                        <Lock size={40} className="text-red-500 mx-auto" />
                        <h4 className="text-green-400 font-mono">ENTER PIN</h4>
                        {/* Masked PIN Display */}
                        <div className="flex gap-2 justify-center h-8">
                            {[0, 1, 2, 3].map(i => (
                                <div key={i} className={`w-4 h-4 rounded-full border border-green-500 ${i < pin.length ? 'bg-green-500' : 'bg-transparent'}`}></div>
                            ))}
                        </div>
                        {msg && <div className="text-red-500 text-xs font-bold blink bg-red-900/20 px-2 py-1 rounded">{msg}</div>}
                    </div>
                )}

                {screen === 'menu' && (
                    <div className="w-full text-left space-y-2 font-mono text-green-400 text-sm z-20">
                        <div className="border-b border-green-800 pb-1 mb-2 flex justify-between items-center">
                            <span>Welcome User</span>
                            <Unlock size={14} />
                        </div>
                        <div className="cursor-pointer hover:bg-green-900/30 p-1 rounded" onClick={() => setScreen('withdraw')}>1. Withdraw</div>
                        <div className="cursor-pointer hover:bg-green-900/30 p-1 rounded" onClick={() => setScreen('deposit')}>2. Deposit</div>
                        <div className="cursor-pointer hover:bg-green-900/30 p-1 rounded" onClick={() => { setScreen('pin'); setPin(""); }}>3. Exit</div>
                        <div className="mt-4 text-white border-t border-slate-800 pt-2">Bal: <span className="font-bold">${balance}</span></div>
                    </div>
                )}

                {screen === 'withdraw' && (
                    <div className="space-y-4 z-20">
                        <DollarSign size={40} className="text-yellow-400 mx-auto" />
                        <h4 className="text-green-400 font-mono">WITHDRAW AMOUNT?</h4>
                        <input
                            type="number"
                            className="bg-transparent border-b-2 border-green-500 text-center text-white font-mono text-xl w-32 outline-none"
                            onChange={(e) => setAmount(Number(e.target.value))}
                            placeholder="0"
                        />
                        {msg && <div className="text-red-500 text-xs font-bold">{msg}</div>}
                        <div className="flex gap-2 justify-center mt-2">
                            <button onClick={handleWithdraw} className="bg-green-700 text-white px-3 py-1 rounded text-xs hover:bg-green-600">OK</button>
                            <button onClick={() => { setScreen('menu'); setMsg("") }} className="bg-red-700 text-white px-3 py-1 rounded text-xs hover:bg-red-600">Back</button>
                        </div>
                    </div>
                )}

                {screen === 'deposit' && (
                    <div className="space-y-4 z-20">
                        <TrendingUp size={40} className="text-green-400 mx-auto" />
                        <h4 className="text-green-400 font-mono">DEPOSIT AMOUNT?</h4>
                        <input
                            type="number"
                            className="bg-transparent border-b-2 border-green-500 text-center text-white font-mono text-xl w-32 outline-none"
                            onChange={(e) => setAmount(Number(e.target.value))}
                            placeholder="0"
                        />
                        {msg && <div className="text-red-500 text-xs font-bold">{msg}</div>}
                        <div className="flex gap-2 justify-center mt-2">
                            <button onClick={handleDeposit} className="bg-green-700 text-white px-3 py-1 rounded text-xs hover:bg-green-600">OK</button>
                            <button onClick={() => { setScreen('menu'); setMsg("") }} className="bg-red-700 text-white px-3 py-1 rounded text-xs hover:bg-red-600">Back</button>
                        </div>
                    </div>
                )}

                {screen === 'success' && (
                    <div className="space-y-4 z-20">
                        <CheckCircle size={50} className="text-green-500 mx-auto animate-bounce" />
                        <div className="text-white font-mono bg-green-900/30 px-4 py-2 rounded border border-green-500/30">{msg}</div>
                        <div className="text-xs text-slate-400">New Balance: ${balance}</div>
                        <button onClick={() => { setScreen('menu'); setMsg("") }} className="bg-blue-600 text-white px-4 py-2 rounded text-xs mt-4 hover:bg-blue-500">Main Menu</button>
                    </div>
                )}
            </div>

            {/* KEYPAD SIMULATION */}
            {screen === 'pin' && (
                <div className="grid grid-cols-3 gap-2 mt-6 max-w-[200px] mx-auto">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                        <button key={n} onClick={() => pin.length < 4 && setPin(p => p + n)} className="bg-slate-800 text-white p-3 rounded shadow border border-slate-600 hover:bg-slate-700 active:scale-95 font-bold transition-all">{n}</button>
                    ))}
                    <button onClick={() => setPin("")} className="bg-red-900/50 text-red-200 p-2 rounded border border-red-800 hover:bg-red-900/70 font-bold">CLR</button>
                    <button onClick={() => pin.length < 4 && setPin(p => p + 0)} className="bg-slate-800 text-white p-2 rounded border border-slate-600 hover:bg-slate-700 font-bold">0</button>
                    <button onClick={handlePin} className="bg-green-900/50 text-green-200 p-2 rounded border border-green-800 hover:bg-green-900/70 font-bold">OK</button>
                </div>
            )}
        </div>
    );
};

const BugHunter = () => {
    return (
        <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="bg-red-900/10 border border-red-500/30 p-6 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10"><AlertTriangle size={80} /></div>
                <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">Trap #1: Assignment (=)</h3>
                <CodeBlock code={`int x = 0;\nif (x = 5) {  // Sets x to 5!\n  printf("True!"); \n}`} title="Buggy Code" />
                <p className="text-xs text-slate-400 mt-2">
                    <strong>Result:</strong> Prints "True!" because 5 is non-zero. The condition <code>x=5</code> evaluates to 5.
                </p>
            </div>

            <div className="bg-orange-900/10 border border-orange-500/30 p-6 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10"><Code size={80} /></div>
                <h3 className="text-orange-400 font-bold mb-4 flex items-center gap-2">Trap #2: Dangling Else</h3>
                <CodeBlock code={`if (a)\n  if (b) print("B");\nelse print("A"); // Whose else?`} title="Confusing Indentation" />
                <p className="text-xs text-slate-400 mt-2">
                    <strong>Result:</strong> The <code>else</code> attaches to the <strong>nearest</strong> <code>if</code> (the inner one), despite indentation! Use <code>{`{ }`}</code> to fix.
                </p>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function Lecture2Page() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-32">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <img src="/cunits/logo.png" alt="C-Units Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20" />
                    <div className="hidden md:block">
                        <h1 className="font-bold text-white text-sm leading-tight">Branching & Decisions</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 2 • Lecture 2</p>
                    </div>
                </div>
            </header>

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

                {/* HERO */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-900/20 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold animate-fade-in-up">
                        <GitBranch size={14} /> Control Flow
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                        Choosing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white">Right Path</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Programs aren't linear. They fork, jump, and decide. In this lecture, we master <code>if-else</code> ladders and <code>switch</code> statements to control logic flow.
                    </p>
                </div>

                {/* SECTION 1: IF-ELSE LADDER */}
                <section>
                    <SectionHeader title="The Decision Ladder" icon={Split} color="blue" />
                    <p className="text-slate-400 mb-8">
                        When you have multiple mutually exclusive conditions (like grades), use an <code>else if</code> ladder.
                        The program stops checking as soon as it finds a <strong>True</strong> condition.
                    </p>
                    <DecisionEngine />
                </section>

                {/* SECTION 2: SWITCH CASE */}
                <section>
                    <SectionHeader title="The Switch Statement" icon={List} color="orange" />
                    <p className="text-slate-400 mb-8">
                        <code>switch</code> is perfect for menus or testing a single variable against specific constants.
                        Beware the <strong>Fall-through</strong> behavior!
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                            <h4 className="font-bold text-white mb-2">When to use Switch?</h4>
                            <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                                <li>Checking specific values (1, 2, 'A', 'B').</li>
                                <li>Menu selections.</li>
                                <li>When if-else becomes too messy.</li>
                                <li><strong>Constraint:</strong> Works only with Integers and Chars. No ranges or floats!</li>
                            </ul>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                            <h4 className="font-bold text-white mb-2">Syntax Structure</h4>
                            <CodeBlock code={`switch(x) {\n  case 1: ... break;\n  case 2: ... break;\n  default: ...\n}`} />
                        </div>
                    </div>

                    <SwitchMachine />
                </section>

                {/* SECTION 3: NESTED LOGIC */}
                <section>
                    <SectionHeader title="Nested Decisions" icon={CornerDownRight} color="purple" />
                    <p className="text-slate-400 mb-8">
                        Placing an <code>if</code> inside another <code>if</code> allows for hierarchical decision making.
                        Think of it like passing multiple security checkpoints.
                    </p>
                    <NestedLogic />
                </section>

                {/* SECTION 4: REAL WORLD APPLICATION */}
                <section>
                    <SectionHeader title="Capstone: The ATM Logic" icon={CreditCard} color="green" />
                    <p className="text-slate-400 mb-8">
                        Let's put it all together. This simulation uses <code>if-else</code> for authentication,
                        <code>switch</code> for the menu, and nested logic for withdrawals.
                    </p>
                    <AtmSimulator />
                </section>

                {/* SECTION 5: PITFALLS */}
                <section>
                    <SectionHeader title="Common Bugs & Traps" icon={AlertTriangle} color="yellow" />
                    <BugHunter />
                </section>

            </main>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-slate-800 bg-[#020617] py-12 text-center text-slate-600 text-sm">
                <p>C Programming Course • Unit 2 • Lecture 2</p>
            </footer>
        </div>
    );
}
