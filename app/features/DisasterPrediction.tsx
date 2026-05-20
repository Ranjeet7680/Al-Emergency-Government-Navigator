"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Activity, Droplets, Zap, ShieldCheck, Flame, Compass, HelpCircle } from "lucide-react";

export default function DisasterPrediction() {
  const [seismicActive, setSeismicActive] = useState(false);
  const [seismicData, setSeismicData] = useState<number[]>([15, 20, 18, 22, 17, 19, 25, 21, 24, 20]);
  const [floodRisk, setFloodRisk] = useState(38); // percentage
  const [detectedType, setDetectedType] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const triggerSeismicCheck = () => {
    setSeismicActive(true);
    let count = 0;
    const interval = setInterval(() => {
      setSeismicData(prev => {
        const next = [...prev.slice(1)];
        // Simulate high spike if seismic active
        const spike = Math.floor(Math.random() * (count > 4 && count < 8 ? 60 : 15)) + 10;
        next.push(spike);
        return next;
      });
      count++;
      if (count > 12) {
        clearInterval(interval);
        setSeismicActive(false);
      }
    }, 250);
  };

  const handleAIAnalysis = (type: string) => {
    setIsAnalyzing(true);
    setDetectedType("");
    setTimeout(() => {
      setIsAnalyzing(false);
      setDetectedType(type);
    }, 1000);
  };

  // Convert seismograph data array into SVG path points
  const getSvgPath = () => {
    const width = 450;
    const height = 120;
    const step = width / (seismicData.length - 1);
    return seismicData
      .map((val, idx) => {
        const x = idx * step;
        const y = height - (val / 100) * height;
        return `${idx === 0 ? "M" : "L"} ${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
      
      {/* Seismograph & Early Warning */}
      <div className="lg:col-span-7 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-6 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-50/20 via-pink-50/10 to-amber-50/20 pointer-events-none"></div>

        <div className="flex justify-between items-center relative z-10">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">AI Early Warning Telemetry</h2>
            <p className="text-xs text-slate-500 font-medium">Real-time seismic and river-basin sensor analytics</p>
          </div>
          <button 
            onClick={triggerSeismicCheck}
            disabled={seismicActive}
            className={`font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-md ${
              seismicActive 
                ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
                : "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/10"
            }`}
          >
            {seismicActive ? "Monitoring..." : "Simulate Seismic Wave"}
          </button>
        </div>

        {/* Seismograph graph visualizer */}
        <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 space-y-3 relative overflow-hidden">
          <div className="absolute top-2 right-4 flex items-center gap-1.5 text-[9px] font-mono text-amber-500">
            <Activity size={10} className={seismicActive ? "animate-pulse text-red-500" : ""} />
            <span>Telemetry: {seismicActive ? "WARN_SPIKE_DETECTED" : "SYS_NOMINAL"}</span>
          </div>

          <div className="text-[10px] text-slate-500 font-mono">SEISMIC SENSOR MESH #049 (RICHTER FILTER)</div>
          
          <div className="h-32 w-full flex items-center justify-center">
            <svg className="w-full h-full overflow-visible">
              <path 
                d={getSvgPath()}
                fill="none"
                stroke={seismicActive ? "#ef4444" : "#f59e0b"}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-200"
              />
            </svg>
          </div>
        </div>

        {/* River basin water level warning */}
        <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-3xl space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Droplets className="text-blue-500" size={18} />
              <span className="font-extrabold text-sm text-slate-800">Yamuna Basin Flood Level Predictor</span>
            </div>
            <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
              floodRisk > 75 
                ? "bg-red-50 border-red-200 text-red-700 animate-pulse" 
                : floodRisk > 50 
                  ? "bg-amber-50 border-amber-200 text-amber-700" 
                  : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}>
              {floodRisk > 75 ? "Severe Threat" : floodRisk > 50 ? "Orange Warning" : "Safe Zone"}
            </span>
          </div>

          <div className="space-y-2">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={floodRisk} 
              onChange={e => setFloodRisk(parseInt(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none" 
            />
            <div className="flex justify-between text-[9px] font-bold text-slate-400">
              <span>0m (Dry)</span>
              <span>45m (Warning Threshold)</span>
              <span>100m (Danger Mark)</span>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-500 leading-relaxed bg-white border border-slate-100 p-3 rounded-2xl">
            🤖 AI Prediction: At water level <span className="text-slate-800 font-extrabold">{floodRisk}%</span>, the threat of low-lying flood inundation is <span className={floodRisk > 75 ? "text-red-600 font-extrabold" : "text-slate-700 font-extrabold"}>{floodRisk > 75 ? "IMMINENT" : floodRisk > 50 ? "ELEVATED" : "LOW"}.</span>
          </div>
        </div>

      </div>

      {/* AI Disaster Type Detection Simulator */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Detection Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Zap className="text-indigo-600" size={20} />
            <h3 className="font-extrabold text-slate-950 text-base">Image Disaster Classifier (AI)</h3>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Select a sample disaster feed below to simulate real-time AI computer vision classifications.
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => handleAIAnalysis("Forest Fire")}
              className="bg-slate-50 hover:bg-orange-50 border border-slate-200/60 hover:border-orange-200 p-3 rounded-2xl transition cursor-pointer flex flex-col items-center gap-1.5 text-slate-700"
            >
              <Flame size={20} className="text-orange-500" />
              <span className="font-bold text-[10px]">Thermal Fire Feed</span>
            </button>
            
            <button 
              onClick={() => handleAIAnalysis("Urban Flooding")}
              className="bg-slate-50 hover:bg-blue-50 border border-slate-200/60 hover:border-blue-200 p-3 rounded-2xl transition cursor-pointer flex flex-col items-center gap-1.5 text-slate-700"
            >
              <Droplets size={20} className="text-blue-500" />
              <span className="font-bold text-[10px]">Water logging Feed</span>
            </button>
          </div>

          {/* Classifier Output */}
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 animate-pulse">
                <span className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin"></span>
                <span className="text-[10px] font-black text-indigo-700 tracking-wider uppercase">Running Neural Matrix...</span>
              </div>
            ) : detectedType ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-4 space-y-3 relative overflow-hidden"
              >
                <div className="absolute top-2 right-3 bg-red-500 text-white font-black text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full animate-pulse">Critical match</div>
                
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">AI Classification</span>
                  <span className="font-black text-sm text-slate-200">{detectedType}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-[8px] text-slate-500 uppercase tracking-wider block">Risk Score</span>
                    <span className="font-black text-xs text-red-400">97.8% Confidence</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 uppercase tracking-wider block">Alert Dispatch</span>
                    <span className="font-black text-xs text-emerald-400">Auto Dispatched</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="border border-dashed border-slate-200/80 text-center py-6 rounded-2xl text-[10px] text-slate-400 font-bold flex flex-col items-center gap-1">
                <Compass size={24} className="text-slate-300" />
                Select simulated live feed for neural network classification.
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Prediction summary */}
        <div className="bg-slate-950 border border-slate-800 text-emerald-400 p-5 rounded-3xl shadow-xl space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <ShieldCheck size={18} className="text-emerald-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider font-extrabold">Active Prediction Nodes</span>
          </div>

          <ul className="space-y-2 font-mono text-[10px] text-slate-400 leading-normal">
            <li>🛰️ <span className="text-emerald-400">Satellite Hazard Monitor:</span> NOMINAL. (Zero active hurricane trajectories detected)</li>
            <li>🌪️ <span className="text-emerald-400">Wind Telemetry Node:</span> Calm. (Avg velocity 14 km/h)</li>
            <li>🔥 <span className="text-emerald-400">Earthquake Warning Node:</span> ACTIVE monitoring (Yamuna boundary faultline)</li>
          </ul>
        </div>

      </div>

    </div>
  );
}
