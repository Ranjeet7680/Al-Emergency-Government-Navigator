"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Users, ShieldAlert, CheckCircle, Volume2, AlertTriangle, Search, BarChart3, TrendingUp, Clock } from "lucide-react";

export default function AdminDashboardAdvanced() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  
  const handleAction = (action: string) => {
    setActiveAction(action);
    setTimeout(() => setActiveAction(null), 3000);
  };

  const chartData = [40, 60, 35, 85, 110, 75, 45, 30, 50, 95, 120, 80];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-6">
      {activeAction && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle size={18} className="text-emerald-400" /> {activeAction}
        </motion.div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <Activity className="text-blue-600" size={32} /> Central Command
          </h2>
          <p className="text-slate-500 font-medium mt-1">District Magistrate Level Access • Session Active</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-2 shadow-sm">
            <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#dc2626]"></div> 12 Active SOS Calls
          </div>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-xl transition cursor-pointer">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard title="Total Citizens" value="24,592" trend="+12% this week" icon={<Users size={24}/>} color="blue" />
        <KPICard title="AI Resolutions" value="8,204" trend="99.8% success rate" icon={<BarChart3 size={24}/>} color="emerald" />
        <KPICard title="Field Personnel" value="145" trend="Deployed in 12 zones" icon={<ShieldAlert size={24}/>} color="amber" />
        
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
            <Volume2 size={120} />
          </div>
          <div className="relative z-10">
            <div className="text-red-200 text-xs font-bold mb-2 uppercase tracking-widest flex items-center gap-2">
              <AlertTriangle size={14}/> Emergency Action
            </div>
            <p className="text-sm text-red-50 mb-4 font-medium leading-relaxed">Override cellular networks to push critical SMS alerts to all citizens.</p>
          </div>
          <button onClick={() => handleAction("EAS Broadcast initiated. Networks overriding...")} className="relative z-10 w-full bg-white text-red-600 hover:bg-red-50 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg cursor-pointer">
            <Volume2 size={18}/> Push SMS Broadcast
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Analytics Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2"><TrendingUp size={20} className="text-blue-500"/> System Load (24h)</h3>
              <p className="text-sm text-slate-500 font-medium">SOS requests vs Automated AI handling</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-xl px-3 py-2 outline-none cursor-pointer hover:bg-slate-100 transition">
              <option>Today</option>
              <option>This Week</option>
            </select>
          </div>
          
          <div className="flex-1 flex items-end gap-3 justify-between h-56 mt-4 border-b border-slate-100 pb-2 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              {[...Array(4)].map((_, i) => <div key={i} className="w-full h-px bg-slate-400"></div>)}
            </div>
            
            {chartData.map((val, i) => (
              <div key={i} className="w-full flex flex-col justify-end items-center group relative h-full z-10">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(val / 120) * 100}%` }}
                  transition={{ duration: 1, delay: i * 0.05, type: "spring" }}
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md hover:from-blue-500 hover:to-blue-300 transition-colors shadow-sm" 
                ></motion.div>
                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-slate-900 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-xl transition pointer-events-none whitespace-nowrap">{val} Calls</div>
                <span className="text-[10px] font-bold text-slate-400 mt-3">{i*2}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Incident Feed */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
          <h3 className="font-extrabold text-slate-900 mb-6 flex items-center gap-2"><Clock size={20} className="text-slate-500"/> Live Operations Log</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-5 custom-scrollbar">
            <LogItem type="critical" title="Medical Emergency" time="2 min ago" desc="Ambulance dispatched to Sector 5. Patient: O+ blood group." />
            <LogItem type="warning" title="Evacuation Needed" time="14 min ago" desc="Flood water rising in North District. NDRF notified." />
            <LogItem type="info" title="Cyber Complaint Filed" time="1 hr ago" desc="Bank account frozen automatically via API interface." />
            <LogItem type="success" title="AI Consultation" time="2 hr ago" desc="Citizen successfully guided through e-FIR drafting process." />
            <LogItem type="warning" title="Traffic Anomaly" time="3 hr ago" desc="Heavy congestion reported on NH-44. Routing updated." />
          </div>
          <button className="mt-4 w-full bg-slate-50 hover:bg-slate-100 text-slate-700 py-3 rounded-xl font-bold text-sm transition cursor-pointer">
            View Complete Logs
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function KPICard({ title, value, trend, icon, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600"
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${colors[color]}`}>
          {icon}
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg">Live</div>
      </div>
      <div className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">{title}</div>
      <div className="text-4xl font-black text-slate-900 mb-2">{value}</div>
      <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5"><TrendingUp size={14} className={colors[color].split(' ')[1]}/> {trend}</div>
    </div>
  )
}

function LogItem({ type, title, time, desc }: any) {
  const styles: any = {
    critical: "border-red-500 bg-red-50/50 text-red-900",
    warning: "border-amber-500 bg-amber-50/50 text-amber-900",
    info: "border-blue-500 bg-blue-50/50 text-blue-900",
    success: "border-emerald-500 bg-emerald-50/50 text-emerald-900",
  };

  return (
    <div className={`border-l-4 pl-4 py-1 relative ${styles[type].split(' ')[0]}`}>
      <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${styles[type].split(' ')[0].replace('border', 'bg')}`}></div>
      <div className="flex justify-between items-start mb-1">
        <div className="font-extrabold text-sm text-slate-900">{title}</div>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{time}</span>
      </div>
      <div className="text-xs text-slate-600 font-medium leading-relaxed">{desc}</div>
    </div>
  )
}
