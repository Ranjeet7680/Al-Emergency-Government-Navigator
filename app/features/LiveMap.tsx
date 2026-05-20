"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Building2, Phone, Compass, Activity, ShieldAlert, Award, Star } from "lucide-react";

interface Responder {
  id: string;
  name: string;
  type: "hospital" | "police" | "fire";
  distance: string;
  phone: string;
  beds?: number;
  status: string;
  x: number;
  y: number;
}

export default function LiveMap() {
  const [selectedType, setSelectedType] = useState<"hospital" | "police" | "fire">("hospital");
  const [selectedResponder, setSelectedResponder] = useState<Responder | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const responders: Responder[] = [
    // Hospitals
    { id: "h1", name: "Apex Trauma & Medical Hospital", type: "hospital", distance: "1.2 km", phone: "102", beds: 18, status: "Active (Beds Available)", x: 120, y: 150 },
    { id: "h2", name: "National Cardiac Emergency Clinic", type: "hospital", distance: "2.8 km", phone: "+91 11 2345 6789", beds: 4, status: "Highly Congested", x: 280, y: 80 },
    { id: "h3", name: "Metro General Health Center", type: "hospital", distance: "4.1 km", phone: "+91 11 9876 5432", beds: 35, status: "Normal", x: 380, y: 220 },
    // Police
    { id: "p1", name: "Central Sector Headquarters", type: "police", distance: "0.8 km", phone: "100", status: "Patrol Units Dispatched", x: 190, y: 110 },
    { id: "p2", name: "Sub-Division Cyber Precinct", type: "police", distance: "3.2 km", phone: "1930", status: "Open 24/7", x: 80, y: 290 },
    // Fire
    { id: "f1", name: "Metro Fire Suppression Hub", type: "fire", distance: "1.5 km", phone: "101", status: "3 Fire Trucks Ready", x: 310, y: 170 }
  ];

  const filteredResponders = responders.filter(r => r.type === selectedType);

  const handleScan = () => {
    setIsScanning(true);
    setSelectedResponder(null);
    setTimeout(() => {
      setIsScanning(false);
      // Auto-select nearest
      const sorted = [...filteredResponders].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      if (sorted.length > 0) setSelectedResponder(sorted[0]);
    }, 1200);
  };

  // User position in the SVG grid
  const userX = 220;
  const userY = 200;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
      
      {/* Map visualization block */}
      <div className="lg:col-span-8 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-6 shadow-2xl flex flex-col space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-50/20 via-blue-50/10 to-indigo-50/20 pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Interactive Responder Finder</h2>
            <p className="text-xs text-slate-500 font-medium">Real-time GPS mapping grid (Coordinates: 28.6139° N, 77.2090° E)</p>
          </div>
          <button 
            onClick={handleScan}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-600/10"
          >
            <Compass size={14} className={isScanning ? "animate-spin" : ""} />
            Scan Area GPS
          </button>
        </div>

        {/* The Map Canvas */}
        <div className="relative w-full h-[360px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* Cyber grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {/* Radial radar waves when scanning */}
          <AnimatePresence>
            {isScanning && (
              <motion.div 
                initial={{ scale: 0.1, opacity: 0.8 }}
                animate={{ scale: 2.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                className="absolute w-48 h-48 border border-cyan-500 rounded-full pointer-events-none"
                style={{ left: `${userX - 96}px`, top: `${userY - 96}px` }}
              />
            )}
          </AnimatePresence>

          {/* SVG Map Lines (simulate street layouts) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            {/* Street Lines */}
            <path d="M 0,100 L 500,100 M 0,220 L 500,220" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
            <path d="M 150,0 L 150,400 M 330,0 L 330,400" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
            
            {/* User to Responder path if selected */}
            {selectedResponder && (
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
                d={`M ${userX},${userY} L ${selectedResponder.x},${selectedResponder.y}`}
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="6,4"
                fill="none"
              />
            )}
          </svg>

          {/* User Marker Pin */}
          <div 
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: `${userX}px`, top: `${userY}px` }}
          >
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 border-2 border-indigo-500 flex items-center justify-center relative animate-pulse">
              <div className="w-3.5 h-3.5 rounded-full bg-indigo-500"></div>
            </div>
            <span className="bg-slate-900 border border-slate-700 text-white font-black text-[9px] uppercase px-2 py-0.5 rounded shadow mt-1">My Location</span>
          </div>

          {/* Responder Pins */}
          {filteredResponders.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedResponder(r)}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
              style={{ left: `${r.x}px`, top: `${r.y}px` }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-110 shadow-lg ${
                selectedResponder?.id === r.id 
                  ? "bg-emerald-500 border-white text-white scale-105" 
                  : r.type === "hospital" 
                    ? "bg-red-600 border-red-200 text-white" 
                    : r.type === "police" 
                      ? "bg-blue-600 border-blue-200 text-white" 
                      : "bg-amber-600 border-amber-200 text-white"
              }`}>
                <Building2 size={14} />
              </div>
              <span className="bg-slate-950/90 text-slate-200 font-bold text-[8px] px-1.5 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mt-1">{r.name} ({r.distance})</span>
            </button>
          ))}

        </div>
      </div>

      {/* Control Selector & Info Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Toggle Category Buttons */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-4 shadow-xl flex gap-1 justify-between">
          {(["hospital", "police", "fire"] as const).map(t => (
            <button
              key={t}
              onClick={() => { setSelectedType(t); setSelectedResponder(null); }}
              className={`flex-1 text-center py-2.5 rounded-2xl text-xs font-black capitalize transition cursor-pointer ${
                selectedType === t 
                  ? "bg-slate-800 text-white shadow-md" 
                  : "bg-slate-50 text-slate-600 border border-slate-200/50 hover:bg-slate-100"
              }`}
            >
              {t === "hospital" ? "Hospitals" : t === "police" ? "Police" : "Fire Units"}
            </button>
          ))}
        </div>

        {/* Responders Listing */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-extrabold text-slate-950 text-sm border-b border-slate-100 pb-2 flex items-center gap-1.5">
            <Compass className="text-cyan-500" size={16} /> Available Nearest Responders
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {filteredResponders.map(r => (
              <div 
                key={r.id}
                onClick={() => setSelectedResponder(r)}
                className={`p-3.5 border rounded-2xl transition-all cursor-pointer flex flex-col gap-1.5 ${
                  selectedResponder?.id === r.id 
                    ? "bg-indigo-50 border-indigo-300 shadow-sm" 
                    : "bg-slate-50 hover:bg-slate-100/50 border-slate-200/60"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="font-extrabold text-xs text-slate-800 leading-tight pr-2">{r.name}</div>
                  <span className="text-[10px] font-black text-indigo-600 shrink-0 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">{r.distance}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                  <span className={r.beds ? "text-emerald-600 font-extrabold" : "text-slate-500"}>{r.status}</span>
                  {r.beds && <span>Beds: {r.beds}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Details Card */}
        <AnimatePresence mode="wait">
          {selectedResponder ? (
            <motion.div
              key={selectedResponder.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-950 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden border border-slate-800"
            >
              {/* Soft background light */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                    <Navigation size={18} className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm leading-tight text-slate-100">{selectedResponder.name}</h4>
                    <span className="text-[9px] text-emerald-400 font-black uppercase tracking-wider">Fastest Route Computed</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Estimated Distance</span>
                    <span className="font-black text-sm text-slate-200">{selectedResponder.distance}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">ETA Response</span>
                    <span className="font-black text-sm text-slate-200">
                      {parseFloat(selectedResponder.distance) * 4} mins
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${selectedResponder.phone}`}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3 rounded-xl transition cursor-pointer flex justify-center items-center gap-1.5 shadow-md shadow-indigo-600/10"
                  >
                    <Phone size={12} /> Call Helpline
                  </a>
                  <button
                    onClick={() => alert("Simulating directions routing on client devices...")}
                    className="bg-slate-800 hover:bg-slate-900 border border-slate-700 text-slate-200 font-bold text-xs px-4 rounded-xl transition cursor-pointer"
                  >
                    Directions
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-200 text-center py-8 rounded-3xl text-xs text-slate-400 font-bold">
              Select a responder marker on the map to display response ETA & routing directions.
            </div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
