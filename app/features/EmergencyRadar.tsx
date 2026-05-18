"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Navigation2, Crosshair, Plus, Minus, Layers, Stethoscope, Tent, AlertTriangle, ShieldAlert, Zap, MapPin, CheckCircle, Info, PhoneCall, Users, Eye, ChevronRight, Clock, Star, Route, Radio, Ambulance, Hospital, Siren } from "lucide-react";

interface Location {
  id: string;
  type: "threat" | "hospital" | "shelter" | "police" | "ambulance";
  title: string;
  desc: string;
  lat: number;
  lng: number;
  severity?: "critical" | "medium" | "low";
  status?: "available" | "busy" | "offline";
  radius?: number;
  time?: string;
  distance?: string;
  eta?: string;
  capacity?: string;
}

export default function EmergencyRadar() {
  const [activeFilters, setActiveFilters] = useState<string[]>(["threats", "hospitals", "shelters", "police", "ambulance"]);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [mapLevelIndex, setMapLevelIndex] = useState(1);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [mapStyle, setMapStyle] = useState<"default" | "satellite" | "terrain">("default");
  const [showRoute, setShowRoute] = useState(false);
  const [pulseMarkers, setPulseMarkers] = useState(true);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const mapLocations = [
    { q: "Nunudih, Dhanbad", z: 15 },
    { q: "Dhanbad", z: 13 },
    { q: "Jharkhand", z: 7 },
    { q: "India", z: 5 },
    { q: "Asia", z: 3 },
    { q: "World", z: 2 },
  ];

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const handleAction = (msg: string) => {
    setActiveAction(msg);
    setTimeout(() => setActiveAction(null), 3000);
  };

  const [incidents, setIncidents] = useState<Location[]>([
    { id: "inc1", type: "threat", title: "Flash Flood Warning", desc: "Water rising rapidly in low-lying areas. Immediate evacuation to higher ground recommended.", lat: 35, lng: 25, severity: "critical", radius: 100, time: "Live", distance: "2.3 km", eta: "15 min" },
    { id: "inc2", type: "threat", title: "Traffic Gridlock", desc: "NH-44 blocked due to multi-vehicle accident. Expect 2hr delays.", lat: 55, lng: 65, severity: "medium", radius: 50, time: "10m ago", distance: "4.1 km", eta: "25 min" },
    { id: "inc3", type: "threat", title: "Gas Leak Alert", desc: "Natural gas leak reported in industrial zone. Avoid area.", lat: 72, lng: 42, severity: "critical", radius: 80, time: "5m ago", distance: "1.8 km", eta: "8 min" },
  ]);

  const [resources, setResources] = useState<Location[]>([
    { id: "res1", type: "hospital", title: "City General Hospital", desc: "24/7 Trauma Center. 14 beds available. Full ICU capacity.", lat: 65, lng: 30, status: "available", distance: "1.2 km", eta: "5 min", capacity: "14/50 beds" },
    { id: "res2", type: "shelter", title: "Sector 5 Relief Camp", desc: "NDRF deployed. Food, water & medical aid available.", lat: 28, lng: 72, status: "available", distance: "3.5 km", eta: "18 min", capacity: "450/500 people" },
    { id: "res3", type: "police", title: "Central Police Station", desc: "Cybercrime unit active. FIR filing available.", lat: 78, lng: 78, status: "available", distance: "5.2 km", eta: "22 min" },
    { id: "res4", type: "hospital", title: "Metro Health Center", desc: "Emergency ward open. 8 beds available.", lat: 42, lng: 55, status: "available", distance: "2.8 km", eta: "12 min", capacity: "8/30 beds" },
    { id: "res5", type: "shelter", title: "Community Hall Shelter", desc: "Red Cross supplies available. Pet-friendly.", lat: 18, lng: 45, status: "available", distance: "4.2 km", eta: "20 min", capacity: "200/300 people" },
  ]);

  const [ambulancePositions, setAmbulancePositions] = useState<Location[]>([
    { id: "amb1", type: "ambulance", title: "Ambulance #47", desc: "En route to emergency", lat: 48, lng: 48, status: "busy", eta: "3 min", distance: "0.8 km" },
    { id: "amb2", type: "ambulance", title: "Ambulance #12", desc: "Standby at base", lat: 60, lng: 20, status: "available", eta: "7 min", distance: "2.1 km" },
    { id: "amb3", type: "ambulance", title: "Ambulance #89", desc: "Returning to station", lat: 35, lng: 80, status: "available", eta: "10 min", distance: "3.4 km" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmbulancePositions(prev => prev.map(amb => ({
        ...amb,
        lat: amb.lat + (Math.random() - 0.5) * 3,
        lng: amb.lng + (Math.random() - 0.5) * 3,
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getMarkerColor = (type: string, severity?: string) => {
    switch(type) {
      case "threat": return severity === "critical" ? "#ef4444" : "#f59e0b";
      case "hospital": return "#ec4899";
      case "shelter": return "#10b981";
      case "police": return "#3b82f6";
      case "ambulance": return "#f43f5e";
      default: return "#6366f1";
    }
  };

  const getMarkerIcon = (type: string) => {
    switch(type) {
      case "threat": return <AlertTriangle size={14} />;
      case "hospital": return <Stethoscope size={14} />;
      case "shelter": return <Tent size={14} />;
      case "police": return <ShieldAlert size={14} />;
      case "ambulance": return <Ambulance size={14} />;
      default: return <MapPin size={14} />;
    }
  };

  const allLocations = [...incidents, ...resources, ...ambulancePositions];

  return (
    <div className="h-[calc(100vh-8rem)] rounded-3xl shadow-2xl overflow-hidden relative font-sans border-2 border-white/50" ref={mapContainerRef}>
      <style>{`
        @keyframes markerPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        @keyframes routeDash {
          to { stroke-dashoffset: -20; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
          50% { box-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <AnimatePresence>
        {activeAction && (
          <motion.div initial={{ y: -30, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -30, opacity: 0, scale: 0.9 }} className="absolute top-24 left-1/2 -translate-x-1/2 z-[80] bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-sm pointer-events-none border border-white/20">
            <CheckCircle size={20} className="text-emerald-300" /> 
            <span>{activeAction}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Background with Bright Styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-50">
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          src={`https://maps.google.com/maps?q=${encodeURIComponent(mapLocations[mapLevelIndex].q)}&t=${mapStyle === "satellite" ? 'k' : 'm'}&z=${mapLocations[mapLevelIndex].z}&output=embed&iwloc=near`} 
          className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 origin-center"
          style={{ 
            filter: mapStyle === "satellite" 
              ? 'saturate(1.8) contrast(1.3) brightness(1.1)' 
              : 'saturate(1.4) brightness(1.08) contrast(1.1)' 
          }}
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-40 p-4 pointer-events-none">
        <div className="flex flex-col gap-3 w-full max-w-[400px]">
          {/* Search Box */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl flex items-center px-5 py-3.5 pointer-events-auto border-2 border-fuchsia-200/50"
          >
            <Search size={20} className="text-fuchsia-500 mr-3 shrink-0" />
            <input type="text" placeholder="Search locations, emergencies..." className="w-full outline-none text-sm font-semibold text-slate-800 bg-transparent placeholder-slate-400" />
            <div className="w-px h-6 bg-gradient-to-b from-fuchsia-200 to-cyan-200 mx-3 shrink-0"></div>
            <div className="bg-gradient-to-r from-fuchsia-500 to-rose-500 p-2 rounded-xl text-white shrink-0 cursor-pointer hover:shadow-lg hover:shadow-fuchsia-300/50 transition-all hover:scale-105" onClick={() => handleAction("Calculating optimal route...")}>
              <Navigation2 size={16} className="rotate-45" />
            </div>
          </motion.div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 pointer-events-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <MapChip icon={<Stethoscope size={13}/>} label="Hospitals" active={activeFilters.includes("hospitals")} onClick={() => toggleFilter("hospitals")} color="pink" />
            <MapChip icon={<Tent size={13}/>} label="Shelters" active={activeFilters.includes("shelters")} onClick={() => toggleFilter("shelters")} color="emerald" />
            <MapChip icon={<AlertTriangle size={13}/>} label="Threats" active={activeFilters.includes("threats")} onClick={() => toggleFilter("threats")} color="red" />
            <MapChip icon={<ShieldAlert size={13}/>} label="Police" active={activeFilters.includes("police")} onClick={() => toggleFilter("police")} color="blue" />
            <MapChip icon={<Ambulance size={13}/>} label="Ambulances" active={activeFilters.includes("ambulance")} onClick={() => toggleFilter("ambulance")} color="rose" />
          </div>
        </div>
      </div>

      {/* Live Stats Badge */}
      <div className="absolute top-4 right-4 z-40 pointer-events-auto">
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-4 border-2 border-cyan-200/50"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">Live Status</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-slate-500 font-medium">Active Threats</span>
              <span className="font-black text-red-500">{incidents.length}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-slate-500 font-medium">Hospitals</span>
              <span className="font-black text-pink-500">{resources.filter(r => r.type === "hospital").length}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-slate-500 font-medium">Ambulances</span>
              <span className="font-black text-rose-500">{ambulancePositions.length}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-slate-500 font-medium">Shelters</span>
              <span className="font-black text-emerald-500">{resources.filter(r => r.type === "shelter").length}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Map Markers Container */}
      <motion.div className="absolute inset-0 w-full h-full origin-center pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={mapLevelIndex}>
        
        {/* User Location with Bright Pulse */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-fuchsia-400/20 rounded-full absolute animate-ping" style={{ animationDuration: '2s' }}></div>
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400/30 to-fuchsia-400/30 rounded-full absolute"></div>
            <div className="w-10 h-10 bg-white rounded-full border-4 border-cyan-400 shadow-xl shadow-cyan-300/50 relative z-10 flex items-center justify-center">
              <div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-full border-2 border-white shadow-inner"></div>
            </div>
            <motion.div 
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-xl shadow-xl whitespace-nowrap border-2 border-cyan-200"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-cyan-500">You are here</span>
            </motion.div>
          </div>
        </div>

        {/* Safe Route Path with Bright Colors */}
        <AnimatePresence>
          {showRoute && (
            <motion.svg 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full pointer-events-none z-10" 
              style={{ filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.8))' }}
            >
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <path d="M 50% 50% Q 40% 60%, 30% 70%" fill="none" stroke="url(#routeGradient)" strokeWidth="8" strokeLinecap="round" className="opacity-80" />
              <path d="M 50% 50% Q 40% 60%, 30% 70%" fill="none" stroke="url(#routeGradient)" strokeWidth="4" strokeDasharray="12 8" style={{ animation: 'routeDash 1s linear infinite' }} />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Threats Markers */}
        <AnimatePresence>
          {activeFilters.includes("threats") && incidents.map(inc => (
            <motion.div 
              key={inc.id} 
              initial={{ scale: 0, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute z-20 pointer-events-auto cursor-pointer" 
              style={{ top: `${inc.lat}%`, left: `${inc.lng}%` }}
              onClick={() => { setShowDetails(inc.id); setSelectedMarker(inc.id); }}
            >
              <div className="relative flex flex-col items-center group">
                {pulseMarkers && inc.severity === "critical" && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-500/20 rounded-full animate-ping"></div>
                )}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed animate-[spin_20s_linear_infinite] opacity-40 pointer-events-none ${inc.severity === "critical" ? "bg-red-500/15 border-red-400" : "bg-amber-500/15 border-amber-400"}`} style={{ width: inc.radius, height: inc.radius }}></div>
                
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg relative z-10 border-2 border-white ${selectedMarker === inc.id ? 'ring-4 ring-red-300' : ''}`}
                  style={{ 
                    background: `linear-gradient(135deg, ${getMarkerColor(inc.type, inc.severity)}, ${inc.severity === "critical" ? '#dc2626' : '#d97706'})`,
                    animation: inc.severity === "critical" ? 'glowPulse 2s ease-in-out infinite' : 'none',
                    color: 'white'
                  }}
                >
                  {getMarkerIcon(inc.type)}
                </motion.div>
                
                <div className="absolute top-full mt-2 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap z-20 border border-red-200 group-hover:border-red-400 transition-colors">
                  <span className={inc.severity === "critical" ? "text-red-600" : "text-amber-600"}>{inc.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Resources Markers */}
        <AnimatePresence>
          {resources.map(res => {
            if (res.type === "hospital" && !activeFilters.includes("hospitals")) return null;
            if (res.type === "shelter" && !activeFilters.includes("shelters")) return null;
            if (res.type === "police" && !activeFilters.includes("police")) return null;

            return (
              <motion.div 
                key={res.id} 
                initial={{ scale: 0, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute z-20 pointer-events-auto cursor-pointer" 
                style={{ top: `${res.lat}%`, left: `${res.lng}%` }}
                onClick={() => { setShowDetails(res.id); setSelectedMarker(res.id); }}
              >
                <div className="relative flex flex-col items-center group">
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg relative z-10 border-2 border-white ${selectedMarker === res.id ? 'ring-4 ring-pink-300' : ''}`}
                    style={{ 
                      background: `linear-gradient(135deg, ${getMarkerColor(res.type)}, ${res.type === "hospital" ? '#be185d' : res.type === "shelter" ? '#059669' : '#2563eb'})`,
                      color: 'white'
                    }}
                  >
                    {getMarkerIcon(res.type)}
                  </motion.div>
                  
                  <div className="absolute top-full mt-2 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap z-20 border border-pink-200 group-hover:border-pink-400 transition-colors">
                    {res.title}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Ambulance Moving Markers */}
        <AnimatePresence>
          {activeFilters.includes("ambulance") && ambulancePositions.map(amb => (
            <motion.div 
              key={amb.id}
              animate={{ top: `${amb.lat}%`, left: `${amb.lng}%` }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute z-25 pointer-events-auto cursor-pointer"
              onClick={() => { setShowDetails(amb.id); setSelectedMarker(amb.id); }}
            >
              <div className="relative flex flex-col items-center group">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg relative z-10 border-2 border-white ${amb.status === "busy" ? 'animate-pulse' : ''}`}
                  style={{ 
                    background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
                    color: 'white'
                  }}
                >
                  <Ambulance size={14} />
                </div>
                <div className="absolute top-full mt-2 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap z-20 border border-rose-200 group-hover:border-rose-400 transition-colors">
                  {amb.title}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Map Style Toggle */}
      <div className="absolute top-28 right-4 z-40 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-violet-200/50 overflow-hidden">
          {(["default", "satellite", "terrain"] as const).map(style => (
            <button
              key={style}
              onClick={() => setMapStyle(style)}
              className={`px-4 py-2 text-xs font-bold transition-all block w-full text-left ${
                mapStyle === style 
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white' 
                  : 'text-slate-600 hover:bg-violet-50'
              }`}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Right Controls */}
      <div className="absolute bottom-24 right-6 z-40 flex flex-col gap-3 pointer-events-auto">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { setShowRoute(!showRoute); handleAction(showRoute ? "Route cleared" : "Calculating safe route..."); }} 
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl border-2 cursor-pointer ${showRoute ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white border-violet-300 shadow-violet-300/50' : 'bg-white/95 backdrop-blur-xl text-slate-700 border-cyan-200 hover:border-cyan-400'}`}
        >
          <Route size={22} />
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { setMapLevelIndex(1); handleAction("Locating current position..."); }} 
          className="w-14 h-14 bg-white/95 backdrop-blur-xl text-slate-700 rounded-2xl flex items-center justify-center hover:border-cyan-400 transition-all cursor-pointer shadow-xl border-2 border-cyan-200 group"
        >
          <Crosshair size={22} className="group-hover:text-cyan-500 transition" />
        </motion.button>

        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-cyan-200/50 overflow-hidden">
          <motion.button 
            whileHover={{ backgroundColor: 'rgb(236 253 245)' }}
            onClick={() => setMapLevelIndex(Math.max(0, mapLevelIndex - 1))} 
            className="w-14 h-14 text-slate-700 flex items-center justify-center hover:text-cyan-600 transition cursor-pointer border-b border-cyan-100" 
            title="Zoom In"
          >
            <Plus size={22} />
          </motion.button>
          <motion.button 
            whileHover={{ backgroundColor: 'rgb(236 253 245)' }}
            onClick={() => setMapLevelIndex(Math.min(mapLocations.length - 1, mapLevelIndex + 1))} 
            className="w-14 h-14 text-slate-700 flex items-center justify-center hover:text-cyan-600 transition cursor-pointer" 
            title="Zoom Out"
          >
            <Minus size={22} />
          </motion.button>
        </div>
      </div>

      {/* Bottom Left: Layers Toggle */}
      <div className="absolute bottom-24 left-6 z-40 flex flex-col gap-3 pointer-events-auto">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPulseMarkers(!pulseMarkers)} 
          className={`w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center cursor-pointer border-2 transition-all ${pulseMarkers ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white border-amber-300' : 'bg-white/95 backdrop-blur-xl text-slate-700 border-amber-200'}`}
          title="Toggle Animations"
        >
          <Radio size={22} />
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAction("Map layer settings opened")} 
          className="w-14 h-14 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl hover:scale-105 transition-all cursor-pointer overflow-hidden relative group border-2 border-violet-200"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-fuchsia-500 opacity-20 group-hover:opacity-30 transition"></div>
           <Layers size={22} className="relative z-10 text-violet-600" />
        </motion.button>
      </div>

      {/* Auto Route Action Button */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAction("Calculating fastest safe route avoiding all hazards...")} 
          className="relative bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-500 hover:from-fuchsia-500 hover:via-rose-400 hover:to-orange-400 text-white font-bold py-4 px-10 rounded-2xl text-sm flex justify-center items-center gap-3 transition-all shadow-2xl cursor-pointer border-2 border-white/30"
          style={{ boxShadow: '0 0 30px rgba(192, 38, 211, 0.4)' }}
        >
          <Zap size={18} className="animate-pulse" /> 
          <span>Auto-Route to Safety</span>
        </motion.button>
      </div>

      {/* Detail Pane */}
      <AnimatePresence>
        {showDetails && (
          <motion.div 
            initial={{ y: "100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "100%" }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }} 
            className="absolute bottom-0 left-0 right-0 md:left-6 md:bottom-6 md:right-auto md:w-[420px] bg-white/95 backdrop-blur-xl rounded-t-3xl md:rounded-3xl shadow-2xl border-2 border-fuchsia-200/50 z-50 overflow-hidden pointer-events-auto flex flex-col max-h-[80vh]"
          >
            <div className="flex justify-center pt-3 pb-1 md:hidden bg-white"><div className="w-12 h-1.5 bg-slate-200 rounded-full"></div></div>
            
            <div className="flex-1 overflow-y-auto">
              {(() => {
                const item = allLocations.find(i => i.id === showDetails);
                if (!item) return null;
                
                const isThreat = item.type === "threat";
                const gradientHeader = isThreat 
                  ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                  : item.type === "hospital" 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500'
                    : item.type === "shelter"
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                      : item.type === "ambulance"
                        ? 'bg-gradient-to-r from-rose-500 to-fuchsia-500'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500';
                
                return (
                  <div>
                    <div className={`${gradientHeader} p-6 relative text-white`}>
                      <button onClick={() => { setShowDetails(null); setSelectedMarker(null); }} className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition">
                        <Minus size={16}/>
                      </button>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-white/20 p-2 rounded-xl">
                          {getMarkerIcon(item.type)}
                        </div>
                        <h2 className="text-xl font-extrabold">{item.title}</h2>
                      </div>
                      <p className="text-white/90 text-sm font-medium">{item.desc}</p>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="flex gap-3">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAction("Directions started to " + item.title)} 
                          className="flex-1 bg-gradient-to-r from-fuchsia-600 to-rose-500 hover:from-fuchsia-500 hover:to-rose-400 text-white font-bold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 relative overflow-hidden group cursor-pointer"
                        >
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                          <Navigation2 size={18} className="rotate-45" /> Get Directions
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAction("Location shared with emergency contacts")}
                          className="px-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition shadow-md cursor-pointer"
                        >
                          <Share size={18} />
                        </motion.button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {item.distance && (
                          <div className="bg-gradient-to-br from-cyan-50 to-fuchsia-50 border border-cyan-200 rounded-xl p-3">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Distance</div>
                            <div className="text-sm font-black text-slate-800 mt-1">{item.distance}</div>
                          </div>
                        )}
                        {item.eta && (
                          <div className="bg-gradient-to-br from-violet-50 to-pink-50 border border-violet-200 rounded-xl p-3">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ETA</div>
                            <div className="text-sm font-black text-slate-800 mt-1">{item.eta}</div>
                          </div>
                        )}
                        {item.capacity && (
                          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-3">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Capacity</div>
                            <div className="text-sm font-black text-slate-800 mt-1">{item.capacity}</div>
                          </div>
                        )}
                        {item.status && (
                          <div className={`bg-gradient-to-br ${item.status === "available" ? 'from-emerald-50 to-green-50 border-emerald-200' : item.status === "busy" ? 'from-amber-50 to-orange-50 border-amber-200' : 'from-slate-50 to-gray-50 border-slate-200'} border rounded-xl p-3`}>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</div>
                            <div className={`text-sm font-black mt-1 ${item.status === "available" ? 'text-emerald-600' : item.status === "busy" ? 'text-amber-600' : 'text-slate-600'}`}>{item.status.toUpperCase()}</div>
                          </div>
                        )}
                        {isThreat && item.severity && (
                          <div className={`bg-gradient-to-br ${item.severity === "critical" ? 'from-red-50 to-rose-50 border-red-200' : 'from-amber-50 to-yellow-50 border-amber-200'} border rounded-xl p-3`}>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Severity</div>
                            <div className={`text-sm font-black mt-1 ${item.severity === "critical" ? 'text-red-600' : 'text-amber-600'}`}>{item.severity.toUpperCase()}</div>
                          </div>
                        )}
                        {item.time && (
                          <div className="bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-xl p-3">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Updated</div>
                            <div className="text-sm font-black text-slate-800 mt-1">{item.time}</div>
                          </div>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="pt-4 border-t border-slate-100">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Quick Actions</div>
                        <div className="grid grid-cols-2 gap-2">
                          <button onClick={() => handleAction("Calling emergency services...")} className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-500 text-white py-2.5 px-4 rounded-xl text-xs font-bold hover:shadow-lg transition cursor-pointer">
                            <PhoneCall size={14} /> Call 112
                          </button>
                          <button onClick={() => handleAction("Notifying emergency contacts")} className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-2.5 px-4 rounded-xl text-xs font-bold hover:shadow-lg transition cursor-pointer">
                            <Users size={14} /> Notify
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MapChip({ icon, label, active, onClick, color }: any) {
  const colorMap: Record<string, string> = {
    pink: "from-pink-500 to-rose-500 shadow-pink-200/50",
    emerald: "from-emerald-500 to-teal-500 shadow-emerald-200/50",
    red: "from-red-500 to-orange-500 shadow-red-200/50",
    blue: "from-blue-500 to-indigo-500 shadow-blue-200/50",
    rose: "from-rose-500 to-fuchsia-500 shadow-rose-200/50",
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick} 
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border-2 transition-all shadow-md shrink-0 whitespace-nowrap cursor-pointer ${
        active 
          ? `bg-gradient-to-r ${colorMap[color] || colorMap.blue} text-white border-transparent shadow-lg` 
          : "bg-white/95 backdrop-blur-xl text-slate-600 border-slate-200 hover:border-violet-300 hover:bg-violet-50"
      }`}
    >
      <span className={active ? "text-white" : "text-slate-400"}>{icon}</span>
      {label}
    </motion.button>
  );
}

function Share({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
  );
}
