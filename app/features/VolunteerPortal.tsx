"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, CheckCircle, Map, AlertTriangle, Shield, HeartHandshake, PhoneCall, Radio } from "lucide-react";

export default function VolunteerPortalAdvanced() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  
  const handleAction = (action: string) => {
    setActiveAction(action);
    setTimeout(() => setActiveAction(null), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8">
      <AnimatePresence>
        {activeAction && (
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold text-sm">
            <CheckCircle size={18} className="text-emerald-400" /> {activeAction}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-[2rem] p-10 md:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4"><Shield size={400}/></div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="bg-emerald-500/30 text-emerald-100 font-bold px-4 py-1.5 rounded-full inline-block mb-4 text-xs tracking-widest uppercase backdrop-blur-sm border border-emerald-400/30">Official Initiative</div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Civil Defense Network</h2>
          <p className="text-emerald-50 text-lg mb-8 leading-relaxed">Register your skills, equipment, and vehicles to assist local authorities during large-scale emergencies. Together, we save lives.</p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => handleAction("Volunteer Registration flow opened")} className="bg-white text-emerald-800 hover:bg-emerald-50 font-black px-8 py-4 rounded-2xl shadow-xl transition cursor-pointer text-lg">
              Sign Up as Volunteer
            </button>
            <button className="bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-500 font-bold px-8 py-4 rounded-2xl transition cursor-pointer flex items-center gap-2">
              <PhoneCall size={20}/> Support Helpline
            </button>
          </div>
        </div>

        <div className="relative z-10 hidden lg:block">
          <div className="w-64 h-64 bg-emerald-500/20 rounded-full flex items-center justify-center border-4 border-emerald-500/30 backdrop-blur-sm p-8">
            <HeartHandshake size={100} className="text-white opacity-90" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-extrabold text-xl text-slate-900 flex items-center gap-2"><CheckCircle className="text-emerald-500"/> Urgently Needed Skills</h3>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Updated 10m ago</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SkillCard title="First Aid & CPR" priority="High Demand" type="critical" count="120+ Required" />
            <SkillCard title="Heavy Vehicle Driving" priority="Medium" type="warning" count="45 Required" />
            <SkillCard title="Search & Rescue" priority="High Demand" type="critical" count="Specialized" />
            <SkillCard title="Local Translation" priority="Normal" type="normal" count="Any dialect" />
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
          <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mx-auto mb-6 border border-blue-500/30 group-hover:scale-110 transition-transform duration-500">
            <Map size={40}/>
          </div>
          <h3 className="font-extrabold text-2xl mb-3">Live Incident Matching</h3>
          <p className="text-slate-400 font-medium mb-8">Receive SMS alerts when an emergency matching your exact skills occurs within a 5km radius of your live location.</p>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-center gap-3">
            <Radio size={20} className="text-emerald-400 animate-pulse" />
            <span className="font-bold text-sm">GPS Sync Active</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SkillCard({ title, priority, type, count }: any) {
  const styles: any = {
    critical: "bg-red-50 text-red-700 border-red-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    normal: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <div className="border border-slate-100 bg-slate-50 p-5 rounded-2xl hover:bg-white hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-slate-900">{title}</h4>
        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg border ${styles[type]}`}>{priority}</span>
      </div>
      <div className="text-xs font-bold text-slate-400">{count}</div>
    </div>
  )
}
