"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Navigation2, Crosshair, Plus, Minus, Layers, Stethoscope, Tent, AlertTriangle, ShieldAlert, Zap, MapPin, CheckCircle, Info, PhoneCall, Users, Eye, ChevronRight, Clock, Star, Route, Radio, Ambulance, Hospital, Siren, X } from "lucide-react";

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
  const [showStyleSelector, setShowStyleSelector] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const mapLocations = [
    { name: "IIT ROORKEE", q: "IIT Roorkee, Roorkee, Uttarakhand, India", z: 17 },
    { name: "ROOREE", q: "Roorkee, Uttarakhand, India", z: 15 },
    { name: "Hariwar", q: "Haridwar, Uttarakhand, India", z: 12 },
    { name: "Uttarakhand", q: "Uttarakhand, India", z: 8 },
    { name: "INDIA", q: "India", z: 5 },
    { name: "ASIA", q: "Asia", z: 3 },
    { name: "Global", q: "World", z: 2 },
    { name: "EARTH", q: "Earth", z: 1 },
    { name: "solor system", q: "Solar System", z: 1 }
  ];

  function SolarSystemView() {
    const planets = [
      { name: "Sun", size: "w-12 h-12 md:w-16 md:h-16", color: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 shadow-[0_0_40px_rgba(249,115,22,0.8)]", orbit: 0, speed: 0, info: "The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core." },
      { name: "Mercury", size: "w-2.5 h-2.5", color: "bg-slate-400 shadow-[0_0_8px_rgba(148,163,184,0.6)]", orbit: 45, speed: 12, info: "Mercury is the smallest and closest planet to the Sun. Its orbit around the Sun takes only 87.97 Earth days, the shortest of all the Sun's planets." },
      { name: "Venus", size: "w-3.5 h-3.5", color: "bg-orange-300 shadow-[0_0_10px_rgba(253,186,116,0.6)]", orbit: 70, speed: 22, info: "Venus is the second planet from the Sun. It is a terrestrial planet and is the hottest planet in the Solar System, with a mean surface temperature of 737 K (464 °C)." },
      { name: "Earth", size: "w-4 h-4", color: "bg-gradient-to-br from-blue-500 to-emerald-400 shadow-[0_0_12px_rgba(59,130,246,0.7)]", orbit: 100, speed: 30, info: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29.2% of Earth's surface is land and 70.8% is water." },
      { name: "Mars", size: "w-3 h-3", color: "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]", orbit: 130, speed: 45, info: "Mars is the fourth planet from the Sun. It is a dusty, cold, desert world with a very thin atmosphere, carrying iron oxide dust on its surface." },
      { name: "Jupiter", size: "w-7 h-7 md:w-9 md:h-9", color: "bg-gradient-to-r from-amber-600 via-orange-300 to-amber-500 shadow-[0_0_20px_rgba(217,119,6,0.6)]", orbit: 175, speed: 65, info: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets." },
      { name: "Saturn", size: "w-6 h-6 md:w-8 md:h-8", color: "bg-yellow-250 shadow-[0_0_15px_rgba(253,224,71,0.5)]", orbit: 220, speed: 90, info: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System. It is a gas giant famous for its extensive and beautiful ring system.", rings: true },
      { name: "Uranus", size: "w-5 h-5", color: "bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.6)]", orbit: 260, speed: 110, info: "Uranus is the seventh planet from the Sun. Its unique blue-green color comes from atmospheric methane. It has a unique 97.8° tilt, causing it to roll as it orbits." },
      { name: "Neptune", size: "w-4.5 h-4.5", color: "bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.6)]", orbit: 300, speed: 130, info: "Neptune is the eighth and farthest known solar planet from the Sun. It has the strongest winds of any planet in the Solar System, reaching up to 2,100 km/h." }
    ];

    const [activePlanet, setActivePlanet] = useState<any>(planets[3]); // Default to Earth

    return (
      <div className="absolute inset-0 bg-[#020306] text-white flex items-center justify-center overflow-hidden z-10">
        {/* Stars Background */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>

        {/* Solar System Orbit Map */}
        <div className="relative flex items-center justify-center w-full h-full scale-[0.9] md:scale-100">
          {/* Orbit Rings */}
          {planets.map((planet, index) => {
            if (index === 0) return null; // Skip Sun orbit
            return (
              <div 
                key={index} 
                className="absolute border border-slate-800/60 rounded-full pointer-events-none"
                style={{
                  width: `${planet.orbit * 2}px`,
                  height: `${planet.orbit * 2}px`,
                }}
              ></div>
            );
          })}

          {/* Sun (Center) */}
          <div 
            onClick={() => setActivePlanet(planets[0])}
            className={`absolute rounded-full cursor-pointer hover:scale-110 transition-transform ${planets[0].size} ${planets[0].color} flex items-center justify-center`}
          >
            <span className="text-[9px] md:text-[11px] font-black text-white/50 drop-shadow-md">SUN</span>
          </div>

          {/* Orbiting Planets */}
          {planets.map((planet, index) => {
            if (index === 0) return null;
            return (
              <div
                key={index}
                className="absolute animate-spin-slow origin-center flex items-center justify-end"
                style={{
                  width: `${planet.orbit * 2}px`,
                  height: `${planet.orbit * 2}px`,
                  animation: `spin ${planet.speed}s linear infinite`,
                }}
              >
                {/* Planet Body */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePlanet(planet);
                  }}
                  className={`relative cursor-pointer hover:scale-125 transition-transform ${planet.size} ${planet.color} rounded-full flex items-center justify-center group`}
                >
                  {/* Saturn Rings */}
                  {planet.rings && (
                    <div className="absolute w-[180%] h-[40%] border-2 border-yellow-300/40 rounded-full rotate-[15deg]"></div>
                  )}
                  {/* Label on planet */}
                  <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 bg-slate-950/90 border border-slate-800 text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-50 transition-opacity">
                    {planet.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Info Panel */}
        {activePlanet && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            key={activePlanet.name}
            className="absolute bottom-6 left-6 right-6 md:left-8 md:right-auto md:w-[340px] bg-slate-950/90 backdrop-blur-xl border border-slate-800/80 p-4 md:p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-20"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className={`w-5 h-5 rounded-full ${activePlanet.color}`}></div>
              <h4 className="text-base font-extrabold tracking-tight text-white">{activePlanet.name}</h4>
              <span className="text-[9px] uppercase font-black text-slate-500 tracking-wider ml-auto">LEVEL 9 &bull; DEEP SPACE</span>
            </div>
            <p className="text-[11px] md:text-xs text-slate-300 leading-relaxed font-medium">{activePlanet.info}</p>
          </motion.div>
        )}

        {/* Space Overlay UI */}
        <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-1 text-right pointer-events-none">
          <div className="text-[10px] font-black uppercase text-cyan-400 tracking-[0.25em]">DEEP SPACE TELESCOPE MODE</div>
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">HIERARCHY BOUNDARY: SOLAR SYSTEM</div>
        </div>

        {/* Inject custom spin animation */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

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
    { id: "inc1", type: "threat", title: "Civil Lines Waterlogging", desc: "Water rising rapidly near IIT Roorkee East Gate / Civil Lines. Evacuate to higher campus areas.", lat: 35, lng: 25, severity: "critical", radius: 100, time: "Live", distance: "0.8 km", eta: "5 min" },
    { id: "inc2", type: "threat", title: "NH-58 Solani Traffic Gridlock", desc: "Roorkee-Haridwar Highway blocked near Solani Aqueduct due to multi-vehicle accident.", lat: 55, lng: 65, severity: "medium", radius: 50, time: "10m ago", distance: "4.1 km", eta: "25 min" },
    { id: "inc3", type: "threat", title: "Chemical Lab Hazard", desc: "Minor chemical spill reported in Chemistry Dept, IIT Roorkee. Avoid Main Building North Wing.", lat: 72, lng: 42, severity: "critical", radius: 80, time: "5m ago", distance: "0.3 km", eta: "2 min" },
  ]);

  const [resources, setResources] = useState<Location[]>([
    { id: "res1", type: "hospital", title: "IIT Roorkee Campus Hospital", desc: "24/7 Campus Health Center. 10 emergency beds available. Full primary care.", lat: 65, lng: 30, status: "available", distance: "0.4 km", eta: "3 min", capacity: "10/30 beds" },
    { id: "res2", type: "shelter", title: "Solani Puram Relief Camp", desc: "SDMA relief base. Food, water & medical assistance available.", lat: 28, lng: 72, status: "available", distance: "2.5 km", eta: "12 min", capacity: "150/300 people" },
    { id: "res3", type: "police", title: "Civil Lines Police Station", desc: "Roorkee Police station. Patrol active near IIT main entrance.", lat: 78, lng: 78, status: "available", distance: "1.2 km", eta: "6 min" },
    { id: "res4", type: "hospital", title: "Roorkee Civil Hospital", desc: "District medical center. Emergency ward open. 25 beds available.", lat: 42, lng: 55, status: "available", distance: "3.2 km", eta: "15 min", capacity: "25/100 beds" },
    { id: "res5", type: "shelter", title: "Ganga Bhawan Shelter (IITR)", desc: "IIT Roorkee Ganga Hostel community hall, temporary emergency center. Pet-friendly.", lat: 18, lng: 45, status: "available", distance: "0.6 km", eta: "4 min", capacity: "120/200 people" },
  ]);

  const [ambulancePositions, setAmbulancePositions] = useState<Location[]>([
    { id: "amb1", type: "ambulance", title: "IITR Ambulance #1", desc: "En route to Chemistry Dept", lat: 48, lng: 48, status: "busy", eta: "3 min", distance: "0.3 km" },
    { id: "amb2", type: "ambulance", title: "Roorkee EMS #3", desc: "Standby at Civil Lines", lat: 60, lng: 20, status: "available", eta: "7 min", distance: "1.5 km" },
    { id: "amb3", type: "ambulance", title: "Haridwar Cardiac Unit", desc: "Returning to Roorkee Base", lat: 35, lng: 80, status: "available", eta: "10 min", distance: "3.4 km" },
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

      {/* View Level Breadcrumb Indicator */}
      <div className="absolute top-[112px] md:top-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-max max-w-[90%] z-[41] pointer-events-auto bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl md:rounded-full border border-slate-200/80 shadow-2xl flex items-center gap-1.5 overflow-x-auto text-[9px] md:text-[11px] font-black scrollbar-none">
        {mapLocations.map((loc, idx) => (
          <div key={idx} className="flex items-center gap-1 shrink-0">
            <span 
              onClick={() => setMapLevelIndex(idx)}
              className={`cursor-pointer transition-all duration-200 uppercase px-2 py-0.5 rounded select-none ${
                idx === mapLevelIndex 
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-[0_4px_12px_rgba(6,182,212,0.2)] scale-105 font-black' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {loc.name}
            </span>
            {idx < mapLocations.length - 1 && <span className="text-slate-300 font-normal select-none">&rsaquo;</span>}
          </div>
        ))}
      </div>

      {/* Map Background with Bright Styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-50">
        {mapLevelIndex === 8 ? (
          <SolarSystemView />
        ) : (
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
        )}
        {mapLevelIndex !== 8 && <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>}
      </div>

      {/* Top Bar */}
      {mapLevelIndex !== 8 && (
        <div className="absolute top-0 left-0 right-0 z-40 p-4 pointer-events-none">
          <div className="flex flex-col gap-3 w-full md:max-w-[400px] pr-14 md:pr-0">
            {/* Search Box */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl flex items-center px-4 py-3 pointer-events-auto border-2 border-fuchsia-200/50"
            >
              <Search size={18} className="text-fuchsia-500 mr-2.5 shrink-0" />
              <input type="text" placeholder="Search locations, emergencies..." className="w-full outline-none text-xs font-semibold text-slate-800 bg-transparent placeholder-slate-400" />
              <div className="w-px h-5 bg-gradient-to-b from-fuchsia-200 to-cyan-200 mx-2.5 shrink-0"></div>
              <div className="bg-gradient-to-r from-fuchsia-500 to-rose-500 p-2 rounded-xl text-white shrink-0 cursor-pointer hover:shadow-lg hover:shadow-fuchsia-300/50 transition-all hover:scale-105" onClick={() => handleAction("Calculating optimal route...")}>
                <Navigation2 size={14} className="rotate-45" />
              </div>
            </motion.div>

            {/* Filter Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 pointer-events-auto w-[calc(100vw-32px)] md:w-full scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <MapChip icon={<Stethoscope size={12}/>} label="Hospitals" active={activeFilters.includes("hospitals")} onClick={() => toggleFilter("hospitals")} color="pink" />
              <MapChip icon={<Tent size={12}/>} label="Shelters" active={activeFilters.includes("shelters")} onClick={() => toggleFilter("shelters")} color="emerald" />
              <MapChip icon={<AlertTriangle size={12}/>} label="Threats" active={activeFilters.includes("threats")} onClick={() => toggleFilter("threats")} color="red" />
              <MapChip icon={<ShieldAlert size={12}/>} label="Police" active={activeFilters.includes("police")} onClick={() => toggleFilter("police")} color="blue" />
              <MapChip icon={<Ambulance size={12}/>} label="Ambulances" active={activeFilters.includes("ambulance")} onClick={() => toggleFilter("ambulance")} color="rose" />
            </div>
          </div>
        </div>
      )}

      {/* Live Stats Badge */}
      {mapLevelIndex !== 8 && (
        <div className="absolute top-4 right-4 z-40 pointer-events-auto">
          <div className="flex flex-col items-end">
            <button 
              onClick={() => setShowStats(!showStats)} 
              className="flex items-center gap-1.5 bg-white/95 backdrop-blur-xl border-2 border-cyan-200/50 px-3 py-2.5 rounded-2xl shadow-xl text-xs font-black text-slate-700 hover:border-cyan-400 transition"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="uppercase tracking-wider">Status ({incidents.length + resources.length})</span>
            </button>
            
            <AnimatePresence>
              {showStats && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border-2 border-cyan-200/50 mt-2 w-48 text-slate-700"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500 font-bold">Threats</span>
                      <span className="font-black text-red-500">{incidents.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500 font-bold">Hospitals</span>
                      <span className="font-black text-pink-500">{resources.filter(r => r.type === "hospital").length}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500 font-bold">Ambulances</span>
                      <span className="font-black text-rose-500">{ambulancePositions.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-bold">Shelters</span>
                      <span className="font-black text-emerald-500">{resources.filter(r => r.type === "shelter").length}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Map Markers Container */}
      {mapLevelIndex !== 8 && (
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
      )}

      {/* Map Style Selector Popup */}
      <AnimatePresence>
        {mapLevelIndex !== 8 && showStyleSelector && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-40 left-4 md:left-6 z-40 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-violet-200/60 p-2.5 w-36 pointer-events-auto"
          >
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 border-b border-slate-100 mb-1">Map Style</div>
            {(["default", "satellite", "terrain"] as const).map(style => (
              <button
                key={style}
                onClick={() => {
                  setMapStyle(style);
                  setShowStyleSelector(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mapStyle === style 
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-violet-50'
                }`}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Right Controls */}
      <div className="absolute bottom-20 md:bottom-24 right-4 md:right-6 z-40 flex flex-col gap-3 pointer-events-auto">
        {mapLevelIndex !== 8 && (
          <>
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
          </>
        )}

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
      {mapLevelIndex !== 8 && (
        <div className="absolute bottom-20 md:bottom-24 left-4 md:left-6 z-40 flex flex-col gap-3 pointer-events-auto">
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
            onClick={() => {
              setShowStyleSelector(!showStyleSelector);
              handleAction(showStyleSelector ? "Layers panel closed" : "Layers panel opened");
            }} 
            className={`w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center cursor-pointer border-2 transition-all ${showStyleSelector ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white border-violet-300 shadow-violet-300/50' : 'bg-white/95 backdrop-blur-xl text-violet-600 border-violet-200 hover:border-violet-400'}`}
            title="Toggle Map Style"
          >
             <Layers size={22} />
          </motion.button>
        </div>
      )}

      {/* Auto Route Action Button */}
      {mapLevelIndex !== 8 && (
        <div className="absolute bottom-[80px] md:bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAction("Calculating fastest safe route avoiding all hazards...")} 
            className="relative bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-500 hover:from-fuchsia-500 hover:via-rose-400 hover:to-orange-400 text-white font-bold py-3 px-5 md:py-4 md:px-10 rounded-2xl text-xs md:text-sm flex justify-center items-center gap-2 md:gap-3 transition-all shadow-2xl cursor-pointer border-2 border-white/30"
            style={{ boxShadow: '0 0 30px rgba(192, 38, 211, 0.4)' }}
          >
            <Zap size={16} className="animate-pulse shrink-0" /> 
            <span className="whitespace-nowrap">Auto-Route to Safety</span>
          </motion.button>
        </div>
      )}

      {/* Detail Pane */}
      <AnimatePresence>
        {mapLevelIndex !== 8 && showDetails && (
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
                        <X size={16}/>
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
