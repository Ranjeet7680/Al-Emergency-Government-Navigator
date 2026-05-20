"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Shield, Users, Calendar, Filter, CheckCircle, Clock, Zap, AlertTriangle, ArrowRight } from "lucide-react";

interface Incident {
  id: string;
  type: string;
  location: string;
  severity: "high" | "medium" | "low";
  status: "dispatched" | "active" | "resolved";
  time: string;
}

export default function AnalyticsDashboard() {
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "dispatched" | "resolved">("all");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const incidents: Incident[] = [
    { id: "INC-209", type: "Water Logging / Drainage Leak", location: "Sector 5 Block A", severity: "medium", status: "active", time: "10 mins ago" },
    { id: "INC-208", type: "Medical / Loss of Consciousness", location: "Subway Station Exit 3", severity: "high", status: "dispatched", time: "18 mins ago" },
    { id: "INC-207", type: "Electrical Transformer Fire", location: "Outer Ring Road Crossing", severity: "high", status: "resolved", time: "1 hour ago" },
    { id: "INC-206", type: "Cyber Phishing Dispute", location: "Online Portal Portal Feed", severity: "low", status: "active", time: "3 hours ago" }
  ];

  const filteredIncidents = incidents.filter(i => statusFilter === "all" || i.status === statusFilter);

  // Line chart coordinates for weekly case analytics
  const casesData = [24, 45, 30, 68, 42, 58, 85];
  const chartWidth = 500;
  const chartHeight = 140;
  
  const getLinePath = () => {
    const step = chartWidth / (casesData.length - 1);
    return casesData
      .map((val, idx) => {
        const x = idx * step;
        const y = chartHeight - (val / 100) * chartHeight;
        return `${idx === 0 ? "M" : "L"} ${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Quick stats summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 p-5 rounded-3xl shadow-xl flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100 shadow-sm shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Active Incidents</span>
            <span className="font-black text-2xl text-slate-900">14 Cases</span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 p-5 rounded-3xl shadow-xl flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-sm shrink-0">
            <Users size={24} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Volunteers Active</span>
            <span className="font-black text-2xl text-slate-900">382 Online</span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 p-5 rounded-3xl shadow-xl flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 shadow-sm shrink-0">
            <Shield size={24} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Resource Allocation</span>
            <span className="font-black text-2xl text-slate-900">82% Utilized</span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 p-5 rounded-3xl shadow-xl flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 shadow-sm shrink-0">
            <Activity size={24} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Response Average</span>
            <span className="font-black text-2xl text-slate-900">4.8 Mins</span>
          </div>
        </div>
      </div>

      {/* SVG Charts Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Weekly Emergency Calls Frequency */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-6 shadow-2xl space-y-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/20 via-blue-50/10 to-cyan-50/20 pointer-events-none"></div>
          
          <div className="relative z-10 flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Emergency Calls Rate (Weekly Timeline)</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Dispatched vs Resolved Case Analytics</p>
            </div>
            <Calendar size={14} className="text-slate-400" />
          </div>

          <div className="relative z-10 bg-slate-950 p-4 rounded-3xl border border-slate-800 h-[180px] flex items-center justify-center">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            
            <svg className="w-full h-full overflow-visible">
              {/* Grid guide lines */}
              <line x1="0" y1="35" x2={chartWidth} y2="35" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
              <line x1="0" y1="70" x2={chartWidth} y2="70" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
              <line x1="0" y1="105" x2={chartWidth} y2="105" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />

              <path 
                d={getLinePath()}
                fill="none"
                stroke="#6366f1"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            
            <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[8px] font-mono text-slate-500 uppercase tracking-widest">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Resources Allocation Breakdown */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-6 shadow-2xl space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm">Disaster Resource Allocation</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Municipal dispatch inventory status</p>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs font-extrabold text-slate-700 mb-1.5">
                <span>Ambulance Vans</span>
                <span>45 / 60 Units</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-extrabold text-slate-700 mb-1.5">
                <span>Fire Suppressors</span>
                <span>28 / 40 Units</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-extrabold text-slate-700 mb-1.5">
                <span>Relief Camps</span>
                <span>12 / 15 Shelters</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Incident Case Tracking Table */}
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-6 shadow-2xl space-y-4">
        
        {/* Table header with filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-slate-950 text-base">Active Incident Monitoring Log</h3>
            <p className="text-xs text-slate-500 font-medium">Real-time coordinator dispatch timeline feed</p>
          </div>

          <div className="flex gap-1 overflow-x-auto w-full sm:w-auto">
            {(["all", "active", "dispatched", "resolved"] as const).map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black capitalize transition cursor-pointer ${
                  statusFilter === f 
                    ? "bg-slate-800 text-white" 
                    : "bg-slate-50 text-slate-600 border border-slate-200/50 hover:bg-slate-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table lists */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/60 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Incident Category</th>
                <th className="py-3 px-4">Municipal Location</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold text-slate-700">
              {filteredIncidents.map((i) => (
                <tr 
                  key={i.id}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition duration-150"
                >
                  <td className="py-4 px-4 font-mono font-black text-indigo-600">{i.id}</td>
                  <td className="py-4 px-4 font-extrabold">{i.type}</td>
                  <td className="py-4 px-4 font-medium text-slate-500">{i.location}</td>
                  <td className="py-4 px-4">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                      i.severity === "high" 
                        ? "bg-red-50 border-red-200 text-red-700" 
                        : i.severity === "medium" 
                          ? "bg-amber-50 border-amber-200 text-amber-700" 
                          : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}>
                      {i.severity}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${
                      i.status === "resolved" 
                        ? "text-emerald-600" 
                        : i.status === "dispatched" 
                          ? "text-blue-600 animate-pulse" 
                          : "text-amber-600"
                    }`}>
                      {i.status === "resolved" ? <CheckCircle size={10} /> : <Clock size={10} />}
                      <span className="capitalize">{i.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-400">{i.time}</td>
                  <td className="py-4 px-4 text-right">
                    <button 
                      onClick={() => setSelectedIncident(i)}
                      className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition cursor-pointer hover:underline"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Case Management Drawer Mock */}
      <AnimatePresence>
        {selectedIncident && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-[2rem] border border-slate-200 p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-950 text-sm">Disaster Allocation Management</h4>
                  <span className="text-[9px] font-mono text-indigo-600 font-bold block mt-0.5">{selectedIncident.id}</span>
                </div>
                <button 
                  onClick={() => setSelectedIncident(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-xs cursor-pointer p-1"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 text-xs leading-normal">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/50 space-y-2">
                  <div className="font-extrabold text-slate-800">{selectedIncident.type}</div>
                  <div className="text-slate-500">Location: <span className="font-extrabold text-slate-700">{selectedIncident.location}</span></div>
                  <div className="text-slate-500">Dispatch Status: <span className="font-extrabold text-indigo-600 uppercase text-[9px] tracking-wider">{selectedIncident.status}</span></div>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Allocate Dispatch Assets</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => { alert("Dispatching local Ambulance unit..."); setSelectedIncident(null); }} className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-[11px] py-2.5 rounded-xl transition cursor-pointer shadow">Ambulance Team</button>
                    <button onClick={() => { alert("Dispatching local NDRF rescue vehicle..."); setSelectedIncident(null); }} className="bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-[11px] py-2.5 rounded-xl transition cursor-pointer border border-slate-700">Rescue Squad</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
