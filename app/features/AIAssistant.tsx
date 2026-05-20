"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Volume2, VolumeX, ShieldAlert, Sparkles, User, Bot, HelpCircle, Activity } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  hasVoice?: boolean;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Namaste! I am your AI Emergency Navigator. I can provide real-time guidance for fires, floods, cyber fraud, medical emergencies, or document recovery. Type your emergency or ask for guidelines.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hasVoice: true
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [stressLevel, setStressLevel] = useState("Normal");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const quickQuestions = [
    "Fire escape steps",
    "CPR guide line",
    "Flood alert response",
    "Lost Aadhaar card guide"
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate voice stress analysis
    if (textToSend.toLowerCase().includes("urgent") || textToSend.toLowerCase().includes("cpr") || textToSend.toLowerCase().includes("fire")) {
      setStressLevel("Elevated Stress Detected");
    } else {
      setStressLevel("Normal");
    }

    setTimeout(() => {
      let responseText = "Understood. Searching state databases and responder networks... ";
      const textLower = textToSend.toLowerCase();

      if (textLower.includes("fire")) {
        responseText = "⚠️ FIRE EMERGENCY PROTOCOL:\n1. Evacuate immediately. Avoid elevators.\n2. Stay low to the ground to avoid inhaling toxic smoke.\n3. Call 101 for Fire Services immediately.\n4. If trapped, seal doors with wet cloths and signal out a window.";
      } else if (textLower.includes("cpr") || textLower.includes("heart") || textLower.includes("unconscious")) {
        responseText = "❤️ MEDICAL CPR PROTOCOL:\n1. Call 102 (Ambulance) immediately.\n2. Place person on their back on a firm surface.\n3. Push hard & fast in center of chest (100-120 compressions/min).\n4. Allow chest to recoil. Continue until responders arrive.";
      } else if (textLower.includes("flood") || textLower.includes("water")) {
        responseText = "🌊 FLOOD DISASTER INSTRUCTIONS:\n1. Move to higher ground or upper floor immediately.\n2. Disconnect electricity & gas supply mains.\n3. Do not walk or drive through flowing water.\n4. Stay tuned to NDRF broadcasts on frequencies or local channels.";
      } else if (textLower.includes("aadhaar") || textLower.includes("documents") || textLower.includes("card")) {
        responseText = "📄 DOCUMENT RECOVERY STEPS:\n1. Open GovAssist Documents Vault to download encrypted digital copy.\n2. Log into the UIDAI portal to request a reprint using verification code.\n3. File an e-Lost report in the Legal Aid panel to secure identity tracking.";
      } else {
        responseText = "I've analyzed your query. Connecting you to local municipal services and active emergency contacts. Please stay calm while I pinpoint your coordinates.";
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasVoice: true
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Assistant Header Card */}
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center gap-4 sm:justify-between">
        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-50/20 via-blue-50/20 to-cyan-50/20 pointer-events-none"></div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-fuchsia-500 to-indigo-500 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
            <Sparkles size={24} className="animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">AI Chat Emergency Assistant</h2>
            <p className="text-xs text-slate-500 font-medium">Real-time voice & text emergency decision matrix</p>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2 items-center">
          {/* Stress Analyzer badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-extrabold shadow-sm transition ${
            stressLevel.includes("Stress") 
              ? "bg-red-50 text-red-700 border-red-200 animate-pulse" 
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}>
            <Activity size={12} />
            <span>Voice Stress: {stressLevel}</span>
          </div>

          {/* Voice Switcher */}
          <button 
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${
              voiceEnabled 
                ? "bg-indigo-50 text-indigo-700 border-indigo-200" 
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            {voiceEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>{voiceEnabled ? "Voice On" : "Muted"}</span>
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-[2rem] shadow-2xl flex flex-col h-[500px] overflow-hidden">
        {/* Chat Feed */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex gap-3 max-w-[85%] ${m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border ${
                m.sender === "user" 
                  ? "bg-indigo-600 border-indigo-700 text-white" 
                  : "bg-white border-slate-200 text-fuchsia-600"
              }`}>
                {m.sender === "user" ? <User size={14} /> : <Bot size={14} />}
              </div>

              <div className="space-y-1">
                <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed whitespace-pre-line shadow-sm border ${
                  m.sender === "user"
                    ? "bg-indigo-600 border-indigo-700 text-white rounded-tr-none"
                    : "bg-white border-slate-200/80 text-slate-800 rounded-tl-none"
                }`}>
                  {m.text}
                </div>
                <div className={`text-[10px] font-bold text-slate-400 px-1 flex items-center gap-2 justify-end ${m.sender === "user" ? "text-right" : "text-left flex-row-reverse"}`}>
                  <span>{m.timestamp}</span>
                  {m.sender === "ai" && m.hasVoice && voiceEnabled && (
                    <span className="flex items-center gap-0.5 text-indigo-500 font-extrabold uppercase text-[9px] tracking-wider animate-pulse">
                      <Volume2 size={10} /> TTS Playing
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 mr-auto items-center">
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-fuchsia-600 flex items-center justify-center shadow-sm">
                <Bot size={14} />
              </div>
              <div className="bg-white border border-slate-200/80 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-2 items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <HelpCircle size={12} /> Suggest:
          </span>
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="bg-white hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 border border-slate-200/80 text-xs font-semibold px-3 py-1.5 rounded-full transition cursor-pointer shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200/80 flex items-center gap-3">
          <button 
            onClick={() => handleSend("Trigger Micro Voice Command SOS")}
            className="text-slate-400 hover:text-indigo-600 transition cursor-pointer bg-slate-50 hover:bg-indigo-50 p-3 rounded-xl border border-slate-200/80"
            title="Speech-to-text input"
          >
            <Mic size={20} className="animate-pulse" />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Type your emergency query (e.g. fire safety guidelines, cardiac arrest)..."
            className="w-full bg-slate-50 border border-slate-200/80 outline-none rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-400 transition"
          />

          <button
            onClick={() => handleSend(input)}
            className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 text-white p-3 rounded-xl shadow-md transition cursor-pointer shrink-0"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
