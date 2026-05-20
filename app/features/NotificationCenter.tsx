"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ShieldAlert, Award, FileText, CheckCircle2, Search, Filter } from "lucide-react";

interface Broadcast {
  id: string;
  title: string;
  agency: string;
  message: string;
  severity: "critical" | "warning" | "info";
  time: string;
  verified: boolean;
}

export default function NotificationCenter() {
  const [filterType, setFilterType] = useState<"all" | "critical" | "warning" | "info">("all");
  const [search, setSearch] = useState("");

  const broadcasts: Broadcast[] = [
    {
      id: "1",
      title: "Yamuna Basin Water Release Notification",
      agency: "NDMA (National Disaster Management Authority)",
      message: "Heavy water release from Hathnikund Barrage expected to raise river level above warning mark. Low-lying riverbeds in Sector 5 to be evacuated by evening. Relief camps are online.",
      severity: "critical",
      time: "20 mins ago",
      verified: true
    },
    {
      id: "2",
      title: "Regional Dust Storm Warning & Wind Alerts",
      agency: "IMD (Indian Meteorological Department)",
      message: "Severe dust storms with wind speeds scaling up to 60 km/h predicted over western sectors. Residents are advised to stay indoors and protect eyes/skin.",
      severity: "warning",
      time: "2 hours ago",
      verified: true
    },
    {
      id: "3",
      title: "Anti-Phishing awareness Campaign: Cyber Fraud Warning",
      agency: "Cyber Crime Cell Helpline Unit",
      message: "Never share credit card CVVs or one-time verification pins with callers claiming to represent public subsidy bodies or bank offices. Dial 1930 for disputes.",
      severity: "info",
      time: "4 hours ago",
      verified: true
    },
    {
      id: "4",
      title: "Medical Camp Vaccination Drive Sector-12",
      agency: "Department of Municipal Health & Sanitation",
      message: "Free health camp offering general blood screening, booster shots, and emergency first-aid instruction opens this Saturday at Town Hall community pavilion.",
      severity: "info",
      time: "1 day ago",
      verified: false
    }
  ];

  const filteredBroadcasts = broadcasts.filter(b => {
    const matchesFilter = filterType === "all" || b.severity === filterType;
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || 
                          b.message.toLowerCase().includes(search.toLowerCase()) ||
                          b.agency.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header bar */}
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-50/20 via-blue-50/20 to-indigo-50/20 pointer-events-none"></div>
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg shadow-indigo-500/10">
            <Bell size={24} className="animate-bounce" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Authority Broadcast Center</h2>
            <p className="text-xs text-slate-500 font-medium">Verified notifications dispatched from national disaster response bureaus</p>
          </div>
        </div>

        {/* Count badge */}
        <span className="relative z-10 text-[10px] font-black bg-red-50 border border-red-200 text-red-700 px-3.5 py-1.5 rounded-full shadow-sm animate-pulse">
          2 Active Critical Feeds
        </span>
      </div>

      {/* Filter and Search controls */}
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-4 shadow-xl flex flex-col sm:flex-row gap-3 justify-between items-center">
        
        {/* Filter buttons */}
        <div className="flex gap-1 overflow-x-auto w-full sm:w-auto">
          {(["all", "critical", "warning", "info"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-4 py-2 rounded-xl text-xs font-black capitalize transition cursor-pointer ${
                filterType === f 
                  ? "bg-slate-800 text-white shadow-md" 
                  : "bg-slate-50 text-slate-600 border border-slate-200/50 hover:bg-slate-100"
              }`}
            >
              {f === "all" ? "All Broadcasts" : f}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 flex items-center gap-2 w-full sm:w-64 focus-within:bg-white focus-within:border-indigo-400 transition">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-xs font-bold text-slate-800 placeholder-slate-400 w-full"
          />
        </div>
      </div>

      {/* Timeline of broadcasts */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredBroadcasts.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-5 rounded-3xl border shadow-md bg-white/90 backdrop-blur-xl transition-all duration-300 ${
                b.severity === "critical" 
                  ? "border-l-red-500 border-l-4" 
                  : b.severity === "warning" 
                    ? "border-l-amber-500 border-l-4" 
                    : "border-l-indigo-500 border-l-4"
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 leading-snug">{b.title}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[10px] text-slate-400 font-extrabold">{b.agency}</span>
                      {b.verified && (
                        <span title="Government Verified Node" className="inline-flex shrink-0">
                          <CheckCircle2 size={11} className="text-blue-500 fill-blue-500/10" />
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold shrink-0">{b.time}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                  {b.message}
                </p>

                <div className="flex justify-between items-center pt-2 text-[9px] font-bold text-slate-400 border-t border-slate-100 mt-2">
                  <span className="uppercase tracking-wider">Level: {b.severity}</span>
                  <button 
                    onClick={() => alert(`Reviewing action matrix for: ${b.title}`)}
                    className="text-indigo-600 hover:text-indigo-800 transition cursor-pointer flex items-center gap-1"
                  >
                    <FileText size={10} /> View Action Plan
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredBroadcasts.length === 0 && (
            <div className="bg-white/80 border border-dashed border-slate-200/80 text-center py-12 rounded-[2rem] text-xs text-slate-400 font-bold">
              No matching alerts or notifications found.
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
