"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navigation, AlertTriangle, ShieldCheck, MapPin, ArrowRight, Compass, Settings } from "lucide-react";

export default function SafeRoute() {
  const [selectedRoute, setSelectedRoute] = useState<"safe" | "default">("safe");

  // Coordinates on mock map grid
  const startX = 50;
  const startY = 320;
  const endX = 420;
  const endY = 80;

  const obstacles = [
    { name: "Heavy Water Logging - Sector 4", x: 220, y: 220, type: "flood" },
    { name: "Structural Integrity Check - Flyover Block", x: 190, y: 150, type: "traffic" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
      
      {/* Comparative Route Map Canvas */}
      <div className="lg:col-span-8 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-6 shadow-2xl flex flex-col space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/20 via-blue-50/10 to-indigo-50/20 pointer-events-none"></div>

        <div className="flex justify-between items-center relative z-10">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">AI Traffic Congestion Router</h2>
            <p className="text-xs text-slate-500 font-medium">Bypasses hazard areas, municipal water logging points, and tree fall blockages</p>
          </div>
          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1">
            <ShieldCheck size={12} /> Active Safe Guard
          </span>
        </div>

        {/* Map Grid */}
        <div className="relative w-full h-[360px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* Cyber Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          {/* SVG Map Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Base Roads */}
            <path d="M 50,320 H 420 V 80" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
            <path d="M 50,320 V 80 H 420" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
            <path d="M 50,320 Q 200,200 420,80" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />

            {/* Standard Danger Route (runs through Sector 4 water logging) */}
            <path 
              d={`M ${startX},${startY} L 220,220 L ${endX},${endY}`}
              stroke="#ef4444"
              strokeWidth={selectedRoute === "default" ? "5" : "3"}
              strokeLinecap="round"
              fill="none"
              className={`transition-all duration-300 ${selectedRoute === "default" ? "opacity-90" : "opacity-30"}`}
            />

            {/* GovAssist AI Safe Route (Bypasses block to the west) */}
            <path 
              d={`M ${startX},${startY} L 50,150 L 250,80 L ${endX},${endY}`}
              stroke="#10b981"
              strokeWidth={selectedRoute === "safe" ? "5" : "3"}
              strokeLinecap="round"
              fill="none"
              className={`transition-all duration-300 ${selectedRoute === "safe" ? "opacity-90" : "opacity-30 animate-pulse"}`}
            />
          </svg>

          {/* Start Marker Pin */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${startX}px`, top: `${startY}px` }}>
            <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center shadow-lg">
              <MapPin size={10} className="text-white" />
            </div>
            <span className="bg-slate-900 border border-slate-700 text-white font-black text-[7px] px-1.5 py-0.5 rounded shadow mt-1">Start</span>
          </div>

          {/* End Marker Pin */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${endX}px`, top: `${endY}px` }}>
            <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center shadow-lg">
              <MapPin size={10} className="text-white" />
            </div>
            <span className="bg-slate-900 border border-slate-700 text-white font-black text-[7px] px-1.5 py-0.5 rounded shadow mt-1">Destination</span>
          </div>

          {/* Obstacle Warning Nodes */}
          {obstacles.map((o, i) => (
            <div 
              key={i} 
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-default" 
              style={{ left: `${o.x}px`, top: `${o.y}px` }}
            >
              <div className="w-8 h-8 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center animate-pulse">
                <AlertTriangle size={12} className="text-red-500" />
              </div>
              <span className="bg-slate-950 text-red-400 font-bold text-[8px] border border-red-900 px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity mt-1 z-30">{o.name}</span>
            </div>
          ))}

        </div>
      </div>

      {/* Routing Comparison Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Route Cards */}
        <div className="space-y-3">
          
          {/* Safe route selection */}
          <div 
            onClick={() => setSelectedRoute("safe")}
            className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col gap-2 ${
              selectedRoute === "safe" 
                ? "bg-emerald-50/80 border-emerald-300 shadow-md shadow-emerald-500/5" 
                : "bg-white border-slate-200/80 hover:bg-slate-50"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={18} className="text-emerald-600" />
                <span className="font-extrabold text-sm text-slate-800">AI Safe Bypass Route</span>
              </div>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">RECOMMENDED</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Estimated Time</span>
                <span className="font-black text-sm text-slate-800">18 Mins</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Safety Factors</span>
                <span className="font-black text-sm text-emerald-600">No hazards (100%)</span>
              </div>
            </div>
          </div>

          {/* Standard congested route */}
          <div 
            onClick={() => setSelectedRoute("default")}
            className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col gap-2 ${
              selectedRoute === "default" 
                ? "bg-red-50/80 border-red-300 shadow-md shadow-red-500/5" 
                : "bg-white border-slate-200/80 hover:bg-slate-50"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <AlertTriangle size={18} className="text-red-500" />
                <span className="font-extrabold text-sm text-slate-800">Default Direct Route</span>
              </div>
              <span className="text-[10px] font-black text-red-700 bg-red-100 border border-red-200 px-2 py-0.5 rounded-full">BLOCKED</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Estimated Time</span>
                <span className="font-black text-sm text-slate-800">45 Mins</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Safety Factors</span>
                <span className="font-black text-sm text-red-500">2 Inundations</span>
              </div>
            </div>
          </div>

        </div>

        {/* Step by step directions */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-extrabold text-slate-950 text-sm border-b border-slate-100 pb-2 flex items-center gap-1.5">
            <Compass className="text-indigo-600" size={16} /> Safe Directions Breakdown
          </h3>

          <div className="space-y-3 font-medium text-xs text-slate-600">
            <div className="flex gap-2">
              <span className="bg-slate-100 text-slate-500 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
              <div>Depart from starting node, take Left onto West Ring Outer Bypass Road.</div>
            </div>
            <div className="flex gap-2">
              <span className="bg-slate-100 text-slate-500 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
              <div>Drive for 1.8km, ignoring direct route leading through Sector 4 water logging.</div>
            </div>
            <div className="flex gap-2">
              <span className="bg-slate-100 text-slate-500 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
              <div>Take Right at Cyber Precinct crossing onto safe highway sector bypass lane.</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
