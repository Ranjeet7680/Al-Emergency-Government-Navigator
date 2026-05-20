"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Shield, Users, Phone, ShieldX, CheckCircle, MessageSquare, Send, Settings, UserCheck } from "lucide-react";

interface Contact {
  name: string;
  phone: string;
  relation: string;
}

export default function SOSCenter() {
  const [isAlerting, setIsAlerting] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isTriggered, setIsTriggered] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([
    { name: "Ramesh Sharma (Father)", phone: "+91 98765 43210", relation: "Primary" },
    { name: "Suman Sharma (Mother)", phone: "+91 87654 32109", relation: "Secondary" }
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRelation, setNewRelation] = useState("Relative");
  
  const [smsLogs, setSmsLogs] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAlerting && countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (isAlerting && countdown === 0) {
      setIsAlerting(false);
      setIsTriggered(true);
      triggerSOSAlerts();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isAlerting, countdown]);

  const startSOS = () => {
    setCountdown(3);
    setIsAlerting(true);
    setIsTriggered(false);
  };

  const cancelSOS = () => {
    setIsAlerting(false);
    setCountdown(3);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const triggerSOSAlerts = () => {
    const timestamp = new Date().toLocaleTimeString();
    const newLogs = contacts.map(c => 
      `[${timestamp}] 📤 ALERT SENT to ${c.name} (${c.phone}): "EMERGENCY! I need help. My current location is Lat: 28.6139, Lng: 77.2090. View tracking link: https://maps.govassist.in/sos/2376A"`
    );
    setSmsLogs(prev => [...newLogs, ...prev]);
  };

  const addContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;
    setContacts(prev => [...prev, { name: newName, phone: newPhone, relation: newRelation }]);
    setNewName("");
    setNewPhone("");
  };

  const deleteContact = (index: number) => {
    setContacts(prev => prev.filter((_, i) => i !== index));
  };

  const mockNumbers = [
    { label: "National Emergency Number", number: "112", desc: "All-in-one helpline response" },
    { label: "Police Hotline", number: "100", desc: "Local law enforcement dispatch" },
    { label: "Fire Station Services", number: "101", desc: "Municipal fire suppression" },
    { label: "Ambulance Network", number: "102", desc: "Trauma care & medical transport" },
    { label: "Women Helpline Bureau", number: "1091", desc: "Safety counseling and tracking" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
      
      {/* Pulse Alert Card Trigger */}
      <div className="lg:col-span-7 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-red-50/20 via-pink-50/10 to-orange-50/20 pointer-events-none"></div>

        {!isAlerting && !isTriggered && (
          <div className="text-center space-y-6 relative z-10 flex flex-col items-center">
            <div className="p-4 bg-red-100 rounded-3xl text-red-600 w-16 h-16 flex items-center justify-center shadow-md">
              <AlertTriangle size={36} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">One-Tap Emergency SOS</h2>
              <p className="text-slate-500 text-sm max-w-sm">Pressing this button activates a 3-second countdown to alert police, local medical responders, and your emergency contacts.</p>
            </div>
            
            <button 
              onClick={startSOS}
              className="w-48 h-48 rounded-full bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-black text-3xl shadow-[0_15px_40px_rgba(239,68,68,0.4)] cursor-pointer flex items-center justify-center border-4 border-white/60 active:scale-95 transition-transform relative group"
            >
              <div className="absolute -inset-2 bg-red-500 rounded-full blur opacity-25 group-hover:opacity-40 animate-ping"></div>
              SOS
            </button>
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest animate-pulse">Ready to coordinate</span>
          </div>
        )}

        {isAlerting && (
          <div className="text-center space-y-8 relative z-10 flex flex-col items-center">
            <div className="space-y-2 animate-bounce">
              <h2 className="text-4xl font-black text-red-600 tracking-tight">ALERTING FAMILY</h2>
              <p className="text-slate-500 text-sm font-semibold">Broadcasting coordinates in...</p>
            </div>

            <div className="w-48 h-48 rounded-full bg-slate-900 text-white font-black text-7xl flex items-center justify-center border-8 border-red-500 shadow-2xl relative">
              <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-spin border-t-transparent"></div>
              {countdown}
            </div>

            <button 
              onClick={cancelSOS}
              className="bg-slate-800 hover:bg-slate-900 text-white font-extrabold px-8 py-3.5 rounded-2xl flex items-center gap-2 transition cursor-pointer shadow-md text-sm border border-slate-700"
            >
              <ShieldX size={16} /> Cancel Broadcast
            </button>
          </div>
        )}

        {isTriggered && (
          <div className="text-center space-y-6 relative z-10 flex flex-col items-center">
            <div className="p-4 bg-emerald-100 rounded-full text-emerald-600 w-16 h-16 flex items-center justify-center shadow-md animate-pulse">
              <CheckCircle size={36} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">SOS Triggered Successfully</h2>
              <p className="text-slate-500 text-sm max-w-sm">Emergency dispatchers, regional volunteer units, and contacts have been sent your satellite coordinates.</p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={startSOS}
                className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded-2xl transition cursor-pointer shadow-md text-sm"
              >
                Trigger Again
              </button>
              <button 
                onClick={() => setIsTriggered(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-2xl transition cursor-pointer text-sm border border-slate-200"
              >
                Clear State
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Emergency Contacts Panel */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Contact setup */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Users className="text-indigo-600" size={20} />
            <h3 className="font-extrabold text-slate-950 text-base">Emergency Family SMS Contacts</h3>
          </div>

          <div className="space-y-2">
            {contacts.map((c, i) => (
              <div key={i} className="flex justify-between items-center bg-slate-50 border border-slate-200/50 p-3 rounded-2xl">
                <div>
                  <div className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                    {c.name}
                    <span className="text-[9px] font-black uppercase bg-indigo-50 border border-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">{c.relation}</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">{c.phone}</div>
                </div>
                <button 
                  onClick={() => deleteContact(i)} 
                  className="text-red-500 hover:text-red-700 text-xs font-bold transition cursor-pointer hover:underline px-2 py-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add form */}
          <form onSubmit={addContact} className="space-y-2 pt-2 border-t border-slate-100">
            <input 
              type="text" 
              placeholder="Contact Name" 
              value={newName} 
              onChange={e => setNewName(e.target.value)}
              className="w-full text-xs font-bold border border-slate-200/80 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white outline-none transition"
            />
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="text" 
                placeholder="Phone Number" 
                value={newPhone} 
                onChange={e => setNewPhone(e.target.value)}
                className="text-xs font-bold border border-slate-200/80 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white outline-none transition"
              />
              <select 
                value={newRelation} 
                onChange={e => setNewRelation(e.target.value)}
                className="text-xs font-bold border border-slate-200/80 rounded-xl px-2 py-2 bg-slate-50 outline-none cursor-pointer"
              >
                <option>Relative</option>
                <option>Friend</option>
                <option>Doctor</option>
                <option>Guardian</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs py-2 rounded-xl transition cursor-pointer flex justify-center items-center gap-1.5"
            >
              Add Emergency Contact
            </button>
          </form>
        </div>

        {/* Dispatch Hotlines */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Phone className="text-rose-600" size={20} />
            <h3 className="font-extrabold text-slate-950 text-base">Direct Emergency Dials</h3>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {mockNumbers.map((m, i) => (
              <a 
                href={`tel:${m.number}`}
                key={i} 
                className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-rose-50 border border-slate-200/50 hover:border-rose-200 rounded-xl transition group cursor-pointer"
              >
                <div>
                  <div className="font-extrabold text-xs text-slate-800">{m.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{m.desc}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-slate-900 bg-white border border-slate-200 px-3 py-1 rounded-lg group-hover:border-rose-300 group-hover:text-rose-600 transition">{m.number}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* SMS timeline feed logs */}
        {smsLogs.length > 0 && (
          <div className="bg-slate-950 text-emerald-400 font-mono text-[11px] p-4 rounded-3xl shadow-xl max-h-48 overflow-y-auto space-y-1.5 border border-slate-800">
            <div className="text-[10px] uppercase font-black tracking-wider text-slate-500 border-b border-slate-800 pb-1.5 mb-1.5 flex items-center gap-1">
              <MessageSquare size={12} /> SMS Broadcaster System Logs
            </div>
            {smsLogs.map((log, index) => (
              <div key={index} className="leading-relaxed border-b border-slate-900 pb-1">{log}</div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
