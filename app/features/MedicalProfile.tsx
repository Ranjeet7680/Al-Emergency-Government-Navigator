"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, Shield, Stethoscope, HeartPulse, Edit3, X, Save } from "lucide-react";

interface Medication {
  name: string;
  freq: string;
}

interface MedicalData {
  name: string;
  abha: string;
  blood: string;
  allergies: string; // Comma separated for easy edit
  medications: Medication[];
  doctorName: string;
  doctorType: string;
  doctorPhone: string;
  insurance: string;
  policy: string;
}

const defaultData: MedicalData = {
  name: "Rahul Sharma",
  abha: "91-0000-1111-2222",
  blood: "O+",
  allergies: "Penicillin Allergy, Asthma",
  medications: [
    { name: "Albuterol Inhaler", freq: "As needed" },
    { name: "Cetirizine 10mg", freq: "Daily" }
  ],
  doctorName: "Dr. Anjali Desai",
  doctorType: "General Physician",
  doctorPhone: "+91 98765 11111",
  insurance: "Ayushman Bharat PM-JAY",
  policy: "AB-4455-6677"
};

export default function MedicalProfileAdvanced() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<MedicalData>(defaultData);
  const [editForm, setEditForm] = useState<MedicalData>(defaultData);

  useEffect(() => {
    const saved = localStorage.getItem("govassist_medical");
    if (saved) {
      try {
        setData(JSON.parse(saved));
        setEditForm(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse medical data");
      }
    }
    setIsLoaded(true);
  }, []);

  const handleAction = (action: string) => {
    setActiveAction(action);
    setTimeout(() => setActiveAction(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setData(editForm);
    localStorage.setItem("govassist_medical", JSON.stringify(editForm));
    setIsEditing(false);
    handleAction("Medical profile successfully saved to DigiLocker sync");
  };

  const handleMedChange = (index: number, field: "name" | "freq", value: string) => {
    const newMeds = [...editForm.medications];
    newMeds[index][field] = value;
    setEditForm({ ...editForm, medications: newMeds });
  };

  if (!isLoaded) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6 relative">
      <AnimatePresence>
        {activeAction && (
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="fixed top-4 right-4 z-[80] bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
            <CheckCircle size={18} /> {activeAction}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Medical Profile</h2>
          <p className="text-slate-500">Critical health data automatically shared with first responders during SOS.</p>
        </div>
        <button onClick={() => { setEditForm(data); setIsEditing(true); }} className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl font-bold text-sm transition flex items-center gap-2 border border-blue-200 shadow-sm cursor-pointer">
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative">
        {/* Top Header Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 p-8 flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-red-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
             <HeartPulse size={120} />
          </div>
          <div className="bg-white text-red-600 w-24 h-24 rounded-2xl flex flex-col items-center justify-center font-black text-3xl shadow-xl relative z-10 border-4 border-red-100">
            {data.blood}
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 mt-1">Blood</span>
          </div>
          <div className="text-center md:text-left text-white relative z-10">
            <h3 className="text-3xl font-extrabold drop-shadow-md mb-1">{data.name}</h3>
            <p className="text-red-100 font-medium flex items-center gap-2 justify-center md:justify-start">
              <Shield size={16} /> ABHA ID: {data.abha}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 bg-red-700/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold shadow-inner">
              <CheckCircle size={14} className="text-emerald-400" />
              Verified via DigiLocker
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50">
          <div className="space-y-8">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" /> Allergies & Conditions
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.allergies.split(",").map(a => a.trim()).filter(Boolean).length === 0 ? (
                  <span className="text-sm text-slate-400 font-medium">No known allergies</span>
                ) : (
                  data.allergies.split(",").map((allergy, i) => (
                    <span key={i} className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-amber-200 shadow-sm flex items-center gap-1.5 cursor-default">
                      {allergy.trim()}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Stethoscope size={16} className="text-emerald-500" /> Current Medications
              </h4>
              <ul className="space-y-3 text-sm text-slate-700 font-medium">
                {data.medications.filter(m => m.name.trim() !== "").length === 0 ? (
                  <li className="text-slate-400">No active medications</li>
                ) : (
                  data.medications.filter(m => m.name.trim() !== "").map((med, i) => (
                    <li key={i} className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                      <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500"/> {med.name}</span>
                      <span className="text-xs text-emerald-700 bg-emerald-200 px-2 py-0.5 rounded font-bold">{med.freq}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition h-full flex flex-col justify-between group">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Emergency Doctor</h4>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                    <Stethoscope size={24} />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-800 text-lg">{data.doctorName || "Not Assigned"}</div>
                    <div className="text-sm text-slate-500 font-medium">{data.doctorType || "-"}</div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 bg-slate-900 text-white font-bold py-2.5 rounded-xl hover:bg-slate-800 transition cursor-pointer">
                Call {data.doctorPhone || ""}
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                 <Shield size={80} />
               </div>
              <h4 className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-2 relative z-10">Health Insurance</h4>
              <div className="relative z-10">
                <div className="font-extrabold text-xl mb-1 drop-shadow-sm">{data.insurance || "No Insurance Found"}</div>
                <div className="text-sm text-blue-100 font-medium font-mono bg-black/20 p-2 rounded-lg inline-block mt-2">
                  Policy: {data.policy || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsEditing(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl relative z-10 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 sticky top-0 z-20">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2"><Edit3 size={20} className="text-blue-600" /> Edit Medical Profile</h3>
                <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-700 bg-white rounded-full p-2 shadow-sm cursor-pointer"><X size={20}/></button>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                    <input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Blood Group</label>
                    <select value={editForm.blood} onChange={(e) => setEditForm({...editForm, blood: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white">
                      {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Allergies & Conditions (Comma Separated)</label>
                  <input type="text" value={editForm.allergies} onChange={(e) => setEditForm({...editForm, allergies: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" placeholder="e.g. Asthma, Penicillin" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Medications</label>
                  <div className="space-y-3">
                    {editForm.medications.map((med, index) => (
                      <div key={index} className="flex gap-2">
                        <input type="text" value={med.name} onChange={(e) => handleMedChange(index, "name", e.target.value)} className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition" placeholder="Medication Name" />
                        <input type="text" value={med.freq} onChange={(e) => handleMedChange(index, "freq", e.target.value)} className="w-1/3 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition" placeholder="Frequency" />
                      </div>
                    ))}
                    {editForm.medications.length < 4 && (
                      <button onClick={() => setEditForm({...editForm, medications: [...editForm.medications, {name: "", freq: ""}]})} className="text-sm font-bold text-emerald-600 hover:text-emerald-700">
                        + Add Medication
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Doctor Name</label>
                    <input type="text" value={editForm.doctorName} onChange={(e) => setEditForm({...editForm, doctorName: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Doctor Phone</label>
                    <input type="tel" value={editForm.doctorPhone} onChange={(e) => setEditForm({...editForm, doctorPhone: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 transition font-mono" />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 sticky bottom-0">
                <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition cursor-pointer">Cancel</button>
                <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition cursor-pointer">
                  <Save size={18} /> Save Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
