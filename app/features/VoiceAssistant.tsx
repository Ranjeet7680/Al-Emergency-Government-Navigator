"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, Sparkles, Command, ShieldAlert, CheckCircle, HelpCircle } from "lucide-react";

interface CommandLog {
  time: string;
  command: string;
  response: string;
}

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState("Idle");
  const [logs, setLogs] = useState<CommandLog[]>([]);
  const [simulatedCmd, setSimulatedCmd] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const mockCommands = [
    "Call Emergency Ambulance",
    "Show Safe Route to AIIMS",
    "Trigger SOS Alarm Now",
    "Find Nearest Police Station"
  ];

  const handleSimulateCommand = (cmd: string) => {
    setIsListening(true);
    setSimulatedCmd(cmd);
    setStatus("Listening...");

    if (timerRef.current) clearTimeout(timerRef.current);

    // Timeline steps
    timerRef.current = setTimeout(() => {
      setStatus("Processing Vocal Matrix...");
      
      timerRef.current = setTimeout(() => {
        setStatus(`Command Recognized: "${cmd}"`);
        
        timerRef.current = setTimeout(() => {
          setIsListening(false);
          setStatus("Idle");
          
          let respText = "Understood. Performing action...";
          if (cmd.includes("Ambulance")) respText = "Initiating direct dialing hotline to Ambulance Services (102)...";
          else if (cmd.includes("Route")) respText = "Routing safe route maps to destination Hospital (ETA 18 mins)...";
          else if (cmd.includes("SOS")) respText = "ALERT! Triggering emergency SOS countdown timer...";
          else respText = "Locating nearest Police station sector grids...";

          setLogs(prev => [
            {
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              command: cmd,
              response: respText
            },
            ...prev
          ]);
        }, 1200);
      }, 1000);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
      
      {/* Sound wave visualizer trigger */}
      <div className="lg:col-span-7 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-8 shadow-2xl flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-50/20 via-pink-50/10 to-indigo-50/20 pointer-events-none"></div>

        <div className="text-center space-y-6 relative z-10 flex flex-col items-center">
          <div className="p-3 bg-gradient-to-br from-fuchsia-500 to-indigo-500 rounded-2xl text-white shadow-lg inline-flex">
            <Sparkles size={24} className="animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Speech-to-Text Voice Navigator</h2>
            <p className="text-slate-500 text-xs max-w-sm mt-1">Simulate vocal commands to navigate services during physical stress or vision impairment.</p>
          </div>

          {/* Sound wave concentric circles */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <AnimatePresence>
              {isListening && (
                <>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border border-indigo-400 pointer-events-none"
                  />
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                    className="absolute inset-0 rounded-full border border-fuchsia-400 pointer-events-none"
                  />
                </>
              )}
            </AnimatePresence>

            <button
              onClick={() => handleSimulateCommand("Trigger SOS Alarm Now")}
              className={`w-28 h-28 rounded-full border-4 border-white shadow-2xl flex flex-col items-center justify-center gap-1.5 transition-transform duration-300 active:scale-95 cursor-pointer ${
                isListening 
                  ? "bg-indigo-600 text-white shadow-indigo-500/20" 
                  : "bg-white hover:bg-slate-50 text-indigo-600"
              }`}
            >
              <Mic size={32} className={isListening ? "animate-pulse" : ""} />
              <span className="text-[10px] font-black uppercase tracking-wider">
                {isListening ? "Listening" : "Speak SOS"}
              </span>
            </button>
          </div>

          {/* Status Box */}
          <div className={`px-5 py-2 rounded-2xl border text-xs font-black shadow-sm transition-all duration-300 ${
            status.includes("Recognized") 
              ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
              : status.includes("Process") 
                ? "bg-indigo-50 border-indigo-200 text-indigo-700" 
                : status.includes("Listen") 
                  ? "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700 animate-pulse" 
                  : "bg-slate-50 border-slate-200 text-slate-500"
          }`}>
            Status: {status}
          </div>
        </div>

      </div>

      {/* Suggestion list and Command Logs */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Commands Selection List */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-3">
          <h3 className="font-extrabold text-slate-950 text-sm border-b border-slate-100 pb-2 flex items-center gap-1.5">
            <Command className="text-indigo-600" size={16} /> Click to Simulate Command
          </h3>

          <div className="grid grid-cols-1 gap-2">
            {mockCommands.map((c, i) => (
              <button
                key={i}
                onClick={() => handleSimulateCommand(c)}
                disabled={isListening}
                className="w-full text-left p-3 bg-slate-50 hover:bg-indigo-50 border border-slate-200/50 hover:border-indigo-200 rounded-2xl transition cursor-pointer flex items-center justify-between text-xs font-extrabold text-slate-700"
              >
                <span>"{c}"</span>
                <HelpCircle size={12} className="text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Command outputs history */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-extrabold border-b border-slate-800 pb-2">
            <CheckCircle size={14} className="text-emerald-400" />
            <span>Vocal Command History</span>
          </div>

          <div className="space-y-4 max-h-52 overflow-y-auto pr-1">
            {logs.map((l, i) => (
              <div key={i} className="text-[11px] leading-relaxed border-b border-slate-900 pb-3 last:border-b-0 space-y-1">
                <div className="flex justify-between font-mono text-slate-500 text-[10px]">
                  <span>🎤 Voice Input</span>
                  <span>{l.time}</span>
                </div>
                <div className="font-extrabold text-slate-200">"{l.command}"</div>
                <div className="text-emerald-400 font-mono text-[10px] bg-slate-900/60 p-2 rounded-xl border border-slate-800/80 mt-1.5">⚙️ {l.response}</div>
              </div>
            ))}

            {logs.length === 0 && (
              <div className="text-center py-6 text-[10px] text-slate-500 font-bold">
                No vocal commands processed yet. Click suggestions to simulate.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
