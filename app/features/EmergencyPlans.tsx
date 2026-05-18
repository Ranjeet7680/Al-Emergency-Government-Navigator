"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, CheckCircle, ChevronRight, ChevronDown, Download, Waves, Activity, AlertTriangle, ShieldAlert, Zap, Clock, Users, MapPin, Phone, FileText, Star, Shield, HeartPulse, Play, Pause, RotateCw, Target, Eye, Lock, Volume2 } from "lucide-react";

interface PlanItem {
  text: string;
  checked: boolean;
}

interface DrillStep {
  title: string;
  duration: string;
  desc: string;
}

export default function EmergencyPlansAdvanced() {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [drillActive, setDrillActive] = useState(false);
  const [drillStep, setDrillStep] = useState(0);
  const [drillTimer, setDrillTimer] = useState(0);

  const [checklists, setChecklists] = useState<Record<string, PlanItem[]>>({
    flood: [
      { text: "Emergency kit packed (water, torch, first aid)", checked: true },
      { text: "Important documents in waterproof bag", checked: true },
      { text: "Evacuation route memorized", checked: true },
      { text: "Emergency contacts list printed", checked: false },
      { text: "Phone fully charged + power bank", checked: false },
      { text: "Offline maps downloaded", checked: true },
      { text: "Family meeting point decided", checked: true },
      { text: "Insurance documents photocopied", checked: false },
    ],
    earthquake: [
      { text: "Drop-Cover-Hold drill practiced", checked: true },
      { text: "Furniture anchored to walls", checked: false },
      { text: "Emergency water supply (3 days)", checked: true },
      { text: "Gas valve location identified", checked: false },
      { text: "Building structural assessment done", checked: false },
      { text: "Emergency whistle in each room", checked: true },
    ],
    fire: [
      { text: "Smoke detectors tested monthly", checked: false },
      { text: "Fire extinguisher locations known", checked: false },
      { text: "Evacuation map posted at home", checked: false },
      { text: "Emergency ladder for upper floors", checked: false },
    ],
    cyber: [
      { text: "Bank helpline numbers saved offline", checked: false },
      { text: "2FA enabled on all financial accounts", checked: false },
      { text: "SIM swap protection activated", checked: false },
      { text: "Cybercrime portal bookmarked (1930)", checked: false },
      { text: "Regular password changes (90 days)", checked: false },
    ],
  });

  const toggleCheck = (planId: string, idx: number) => {
    setChecklists(prev => ({
      ...prev,
      [planId]: prev[planId].map((item, i) => i === idx ? { ...item, checked: !item.checked } : item),
    }));
  };

  const getProgress = (planId: string) => {
    const items = checklists[planId];
    if (!items) return 0;
    return Math.round((items.filter(i => i.checked).length / items.length) * 100);
  };

  const handleAction = (msg: string) => {
    setActiveAction(msg);
    setTimeout(() => setActiveAction(null), 3000);
  };

  const drillSteps: DrillStep[] = [
    { title: "🚨 Alert Received", duration: "0:00", desc: "Emergency siren activated. Remain calm." },
    { title: "📍 Drop & Cover", duration: "0:10", desc: "Get under sturdy furniture. Cover head and neck." },
    { title: "🚪 Evacuate", duration: "0:30", desc: "Move to nearest exit. Do NOT use elevators." },
    { title: "📱 Report Status", duration: "1:00", desc: "Mark yourself safe. Notify emergency contacts." },
    { title: "🏕️ Assembly Point", duration: "2:00", desc: "Gather at designated rally point. Head count." },
  ];

  const plans = [
    { id: "flood", icon: <Waves size={24} />, title: "Flood & Cyclone", desc: "Evacuation routes, shelter items, and communication plan", color: "blue", severity: "HIGH", lastUpdated: "2 days ago", estimatedTime: "15 min" },
    { id: "earthquake", icon: <Activity size={24} />, title: "Earthquake", desc: "Drop, cover, and hold on drills. Structural safety checks.", color: "amber", severity: "MEDIUM", lastUpdated: "1 week ago", estimatedTime: "20 min" },
    { id: "fire", icon: <AlertTriangle size={24} />, title: "Fire Emergency", desc: "Evacuation map, extinguisher locations, escape routes.", color: "red", severity: "HIGH", lastUpdated: "3 weeks ago", estimatedTime: "10 min" },
    { id: "cyber", icon: <ShieldAlert size={24} />, title: "Cyber Fraud Protocol", desc: "Secure banking contacts and instant freeze steps.", color: "slate", severity: "LOW", lastUpdated: "1 month ago", estimatedTime: "8 min" },
  ];

  const colorMap: Record<string, { bg: string; icon: string; border: string; progress: string; badge: string }> = {
    blue: { bg: "bg-blue-50", icon: "bg-blue-100 text-blue-600", border: "border-blue-200", progress: "bg-blue-500", badge: "bg-blue-600" },
    amber: { bg: "bg-amber-50", icon: "bg-amber-100 text-amber-600", border: "border-amber-200", progress: "bg-amber-500", badge: "bg-amber-600" },
    red: { bg: "bg-red-50", icon: "bg-red-100 text-red-600", border: "border-red-200", progress: "bg-red-500", badge: "bg-red-600" },
    slate: { bg: "bg-slate-50", icon: "bg-slate-100 text-slate-600", border: "border-slate-200", progress: "bg-slate-500", badge: "bg-slate-700" },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-6">
      {activeAction && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed top-4 right-4 z-[80] bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle size={18} /> {activeAction}
        </motion.div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Emergency Plans</h2>
          <p className="text-slate-500">Step-by-step government-approved preparedness guides with interactive checklists.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleAction("Starting emergency drill simulation...")} className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-red-200 hover:from-red-600 hover:to-orange-600 transition cursor-pointer">
            <Play size={16} /> Start Drill
          </button>
          <button onClick={() => handleAction("Downloading all plans for offline use (12MB)...")} className="bg-slate-900 text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow hover:bg-slate-800 transition cursor-pointer">
            <Download size={16} /> Download All
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-2xl font-black text-slate-900">{plans.length}</div>
          <div className="text-xs text-slate-500 font-bold mt-1">Active Plans</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-2xl font-black text-emerald-600">{Math.round(plans.reduce((a, p) => a + getProgress(p.id), 0) / plans.length)}%</div>
          <div className="text-xs text-slate-500 font-bold mt-1">Avg. Readiness</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-2xl font-black text-blue-600">0</div>
          <div className="text-xs text-slate-500 font-bold mt-1">Drills Completed</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-2xl font-black text-amber-600">2</div>
          <div className="text-xs text-slate-500 font-bold mt-1">Plans Need Update</div>
        </div>
      </div>

      {/* Emergency Plans */}
      <div className="space-y-4">
        {plans.map(plan => {
          const c = colorMap[plan.color];
          const progress = getProgress(plan.id);
          const isExpanded = expandedPlan === plan.id;
          const items = checklists[plan.id] || [];
          const checkedCount = items.filter(i => i.checked).length;

          return (
            <div key={plan.id} className={`bg-white rounded-2xl border ${isExpanded ? "border-blue-300 shadow-lg" : "border-slate-200 shadow-sm"} overflow-hidden transition-all`}>
              {/* Plan Header */}
              <button onClick={() => setExpandedPlan(isExpanded ? null : plan.id)} className="w-full p-5 flex items-center gap-4 cursor-pointer hover:bg-slate-50/50 transition text-left">
                <div className={`p-3.5 rounded-2xl ${c.icon} shrink-0 shadow-sm`}>{plan.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-lg font-extrabold text-slate-900">{plan.title}</h3>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-white ${c.badge}`}>{plan.severity}</span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-1">{plan.desc}</p>
                  <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><Clock size={11} /> {plan.estimatedTime}</span>
                    <span className="flex items-center gap-1"><RotateCw size={11} /> Updated {plan.lastUpdated}</span>
                    <span className="flex items-center gap-1"><CheckCircle size={11} /> {checkedCount}/{items.length} tasks</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-black text-slate-800">{progress}%</span>
                    <div className="w-24 bg-slate-100 h-2 rounded-full mt-1"><div className={`${c.progress} h-2 rounded-full transition-all`} style={{ width: `${progress}%` }} /></div>
                  </div>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={20} className="text-slate-400" />
                  </motion.div>
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-5 pb-5 pt-0 border-t border-slate-100">
                      {/* Checklist */}
                      <div className="mt-4 space-y-2">
                        {items.map((item, i) => (
                          <div key={i} onClick={() => toggleCheck(plan.id, i)} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${item.checked ? "bg-emerald-50 border border-emerald-200" : "bg-slate-50 border border-slate-100 hover:border-slate-200"}`}>
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all ${item.checked ? "bg-emerald-500 text-white shadow" : "bg-white border-2 border-slate-300"}`}>
                              {item.checked && <CheckCircle size={14} />}
                            </div>
                            <span className={`text-sm font-medium flex-1 ${item.checked ? "text-emerald-800 line-through opacity-70" : "text-slate-700"}`}>{item.text}</span>
                          </div>
                        ))}
                      </div>
                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 mt-5">
                        <button onClick={() => handleAction(`Downloading ${plan.title} PDF...`)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer border border-slate-200">
                          <Download size={14} /> Download PDF
                        </button>
                        <button onClick={() => handleAction(`Sharing ${plan.title} plan with emergency contacts...`)} className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer border border-blue-200">
                          <Users size={14} /> Share with Contacts
                        </button>
                        <button onClick={() => handleAction(`Starting ${plan.title} drill mode...`)} className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer border border-red-200">
                          <Play size={14} /> Practice Drill
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Emergency Drill Simulator */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl border border-slate-700">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-xl font-extrabold flex items-center gap-2"><Target size={20} className="text-red-400" /> Emergency Drill Simulator</h3>
              <p className="text-sm text-slate-400 mt-1">Practice real-world emergency response scenarios</p>
            </div>
            <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-emerald-500/30">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> READY
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {drillSteps.map((ds, i) => (
              <div key={i} className={`p-3 rounded-xl border transition-all ${i === drillStep ? "bg-white/10 border-white/30" : i < drillStep ? "bg-emerald-500/10 border-emerald-500/20" : "bg-white/5 border-white/10"}`}>
                <div className="text-xs font-bold mb-1">{ds.title}</div>
                <div className="text-[10px] text-slate-400">{ds.desc}</div>
                <div className="text-[10px] text-slate-500 mt-2 font-mono">{ds.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
