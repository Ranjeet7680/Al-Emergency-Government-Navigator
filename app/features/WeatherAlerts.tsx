"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudRain, Sun, Wind, Eye, Droplets, ShieldAlert, Heart, Activity } from "lucide-react";

export default function WeatherAlerts() {
  const [aqi, setAqi] = useState(148); // Moderate level as default

  const getAqiColor = (val: number) => {
    if (val <= 50) return { bg: "bg-emerald-500", text: "text-emerald-700", border: "border-emerald-200", label: "Good", info: "Air quality is satisfactory, and air pollution poses little or no risk." };
    if (val <= 100) return { bg: "bg-yellow-500", text: "text-yellow-700", border: "border-yellow-200", label: "Moderate", info: "Air quality is acceptable. However, active kids and adults should limit heavy outdoor activities." };
    if (val <= 150) return { bg: "bg-orange-500", text: "text-orange-700", border: "border-orange-200", label: "Unhealthy for Sensitive Groups", info: "Members of sensitive groups may experience health effects. Wear protective N95 masks." };
    if (val <= 200) return { bg: "bg-red-500", text: "text-red-700", border: "border-red-200", label: "Unhealthy", info: "Everyone may begin to experience health effects. Limit prolonged outdoor exposure." };
    return { bg: "bg-purple-600", text: "text-purple-700", border: "border-purple-200", label: "Hazardous", info: "Health warning of emergency conditions. Entire population is highly likely to be affected." };
  };

  const aqiInfo = getAqiColor(aqi);

  const regionalAlerts = [
    { region: "North Zone - National Capital Region", alert: "Severe Heat Wave Alert", severity: "Orange", type: "temp", advice: "Limit outdoor exposure between 12 PM and 4 PM. Keep hydrated." },
    { region: "Coastal South - Mumbai Belt", alert: "Heavy Rainfall Forecast (70mm+)", severity: "Red", type: "rain", advice: "Risk of high tides and water logging. Avoid subway underpasses." },
    { region: "Western Plains - Rajasthan Border", alert: "Dust Storm Advisories", severity: "Yellow", type: "wind", advice: "Visibility reduced below 500m. Wear safety glasses." }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
      
      {/* AQI Dial Gauge and health warnings */}
      <div className="lg:col-span-6 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-8 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-50/20 via-blue-50/10 to-indigo-50/20 pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Air Quality Index (AQI)</h2>
          <p className="text-xs text-slate-500 font-medium">Real-time particulate matter (PM2.5) air toxicity tracker</p>
        </div>

        {/* Dial display */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
          <div className="relative w-44 h-44 rounded-full border-8 border-slate-100 flex flex-col items-center justify-center shadow-lg bg-white">
            <div className={`absolute top-0 w-4 h-4 rounded-full border border-white -translate-y-1.5 shadow ${aqiInfo.bg}`}></div>
            <span className="text-5xl font-black text-slate-900 tracking-tight">{aqi}</span>
            <span className={`text-xs font-black uppercase tracking-wider mt-1.5 px-3 py-1 rounded-full ${aqiInfo.text} ${aqiInfo.bg}/10 border ${aqiInfo.border}`}>
              {aqiInfo.label}
            </span>
          </div>

          <div className="w-full space-y-2 px-4">
            <input 
              type="range" 
              min="10" 
              max="350" 
              value={aqi} 
              onChange={e => setAqi(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Clean (0)</span>
              <span>Moderate (100)</span>
              <span>Hazardous (350)</span>
            </div>
          </div>
        </div>

        {/* Health Advisory card */}
        <div className="bg-slate-950 text-white rounded-3xl p-5 border border-slate-800 space-y-3 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
          
          <div className="flex items-center gap-2 relative z-10">
            <Heart className="text-pink-500 animate-pulse" size={18} />
            <span className="font-extrabold text-xs text-slate-200">Precautionary Health Guidelines</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed relative z-10 font-medium">
            {aqiInfo.info}
          </p>
        </div>

      </div>

      {/* Regional Weather Alerts timeline */}
      <div className="lg:col-span-6 space-y-6">
        
        {/* Metric widgets */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-5 shadow-xl grid grid-cols-3 gap-3">
          <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-2xl text-center">
            <Wind size={20} className="mx-auto text-indigo-500 mb-1.5" />
            <span className="text-[9px] text-slate-400 uppercase font-bold block">Wind Speed</span>
            <span className="font-black text-sm text-slate-800">22.4 km/h</span>
          </div>
          
          <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-2xl text-center">
            <Eye size={20} className="mx-auto text-emerald-500 mb-1.5" />
            <span className="text-[9px] text-slate-400 uppercase font-bold block">Visibility</span>
            <span className="font-black text-sm text-slate-800">3.8 km</span>
          </div>

          <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-2xl text-center">
            <Droplets size={20} className="mx-auto text-blue-500 mb-1.5" />
            <span className="text-[9px] text-slate-400 uppercase font-bold block">Humidity</span>
            <span className="font-black text-sm text-slate-800">78%</span>
          </div>
        </div>

        {/* Alerts listing */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-extrabold text-slate-950 text-base border-b border-slate-100 pb-2 flex items-center gap-1.5">
            <ShieldAlert className="text-red-500" size={20} /> Active Regional Warnings
          </h3>

          <div className="space-y-4">
            {regionalAlerts.map((a, i) => (
              <div key={i} className="flex gap-3 border-l-4 border-l-rose-500 bg-slate-50 p-4 rounded-r-2xl border border-slate-200/50 border-l-0">
                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl w-10 h-10 flex items-center justify-center shrink-0 border border-rose-100">
                  {a.type === "temp" ? <Sun size={18} /> : a.type === "rain" ? <CloudRain size={18} /> : <Wind size={18} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-slate-800 leading-tight pr-1">{a.alert}</span>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                      a.severity === "Red" 
                        ? "bg-red-50 text-red-700 border border-red-100 animate-pulse" 
                        : a.severity === "Orange" 
                          ? "bg-orange-50 text-orange-700 border border-orange-100" 
                          : "bg-yellow-50 text-yellow-700 border border-yellow-100"
                    }`}>{a.severity}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{a.region}</div>
                  <div className="text-[10px] text-slate-500 font-medium leading-normal border-t border-slate-200/50 pt-2 mt-2">💡 Advice: {a.advice}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
