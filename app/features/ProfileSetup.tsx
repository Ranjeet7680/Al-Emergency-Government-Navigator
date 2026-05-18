"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Shield, Users, Heart, MapPin, Phone, CheckCircle, ArrowRight, ArrowLeft, CreditCard, Camera, Upload, Lock, Building, Stethoscope, FileText, Zap, Star, AlertTriangle, Globe, Fingerprint } from "lucide-react";

type WizardStep = 1 | 2 | 3 | 4;

export default function ProfileSetupWizard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [isComplete, setIsComplete] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "", dob: "", gender: "", phone: "", email: "",
    aadhaar: "", pan: "", address: "", city: "", state: "", pincode: "",
    bloodGroup: "", allergies: "", medications: "", conditions: "", emergencyDoc: "", insuranceId: "",
    contact1Name: "", contact1Phone: "", contact1Relation: "",
    contact2Name: "", contact2Phone: "", contact2Relation: "",
  });
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("govassist_citizen_profile");
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {}
    }
    const savedComplete = localStorage.getItem("govassist_citizen_profile_complete");
    if (savedComplete === "true") setIsComplete(true);
    
    const savedAadhaar = localStorage.getItem("govassist_citizen_aadhaar_verified");
    if (savedAadhaar === "true") setAadhaarVerified(true);
    
    setIsLoaded(true);
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("govassist_citizen_profile", JSON.stringify(profile));
    }
  }, [profile, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("govassist_citizen_profile_complete", isComplete.toString());
    }
  }, [isComplete, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("govassist_citizen_aadhaar_verified", aadhaarVerified.toString());
    }
  }, [aadhaarVerified, isLoaded]);

  const updateField = (key: string, value: string) => setProfile(p => ({ ...p, [key]: value }));

  const steps = [
    { num: 1, title: "Identity", icon: <User size={16} /> },
    { num: 2, title: "Medical", icon: <Heart size={16} /> },
    { num: 3, title: "Contacts", icon: <Users size={16} /> },
    { num: 4, title: "Verify", icon: <Shield size={16} /> },
  ];

  const verifyAadhaar = () => {
    setIsVerifying(true);
    setTimeout(() => { setIsVerifying(false); setAadhaarVerified(true); }, 2000);
  };

  const completion = (() => {
    let filled = 0;
    const fields = Object.values(profile);
    fields.forEach(v => { if (v && typeof v === 'string' && v.trim()) filled++; });
    return fields.length ? Math.round((filled / fields.length) * 100) : 0;
  })();

  if (!isLoaded) {
    return <div className="p-12 text-center text-pink-500 font-bold animate-pulse text-lg">✨ Initializing your profile...</div>;
  }

  if (isComplete) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl shadow-pink-100 border border-pink-100 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 p-8 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/40 backdrop-blur-sm shadow-xl">
                {photoUploaded ? <img src="/api/avatar" alt="" className="w-full h-full rounded-full object-cover" /> : <User size={40} />}
              </div>
              <h2 className="text-2xl font-extrabold">{profile.fullName || "Citizen User"}</h2>
              <p className="text-blue-200 text-sm mt-1">{profile.email || "citizen@govassist.in"}</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Shield size={12} /> KYC Verified</span>
                <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Heart size={12} /> Medical Linked</span>
                <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Zap size={12} /> SOS Ready</span>
              </div>
            </div>
          </div>
          {/* Profile Details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailSection title="Identity" items={[
              { label: "Full Name", value: profile.fullName || "—" },
              { label: "Phone", value: profile.phone || "—" },
              { label: "Email", value: profile.email || "—" },
              { label: "Aadhaar", value: profile.aadhaar ? `XXXX-XXXX-${profile.aadhaar.slice(-4)}` : "—" },
              { label: "Address", value: `${profile.address}, ${profile.city}` },
            ]} />
            <DetailSection title="Medical Info" items={[
              { label: "Blood Group", value: profile.bloodGroup || "—" },
              { label: "Allergies", value: profile.allergies || "None reported" },
              { label: "Conditions", value: profile.conditions || "None reported" },
              { label: "Insurance", value: profile.insuranceId || "Not linked" },
            ]} />
            <DetailSection title="Emergency Contacts" items={[
              { label: profile.contact1Relation || "Contact 1", value: `${profile.contact1Name} • ${profile.contact1Phone}` },
              { label: profile.contact2Relation || "Contact 2", value: `${profile.contact2Name} • ${profile.contact2Phone}` },
            ]} />
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2"><CheckCircle size={18} /> Profile Completion</h4>
              <div className="w-full bg-emerald-200 h-3 rounded-full mb-2"><div className="bg-emerald-500 h-3 rounded-full transition-all" style={{ width: `${completion}%` }} /></div>
              <p className="text-xs text-emerald-700 font-bold">{completion}% Complete</p>
              <button onClick={() => { setIsComplete(false); setCurrentStep(1); }} className="mt-3 text-sm text-emerald-700 font-bold underline cursor-pointer hover:text-emerald-800">Edit Profile</button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl shadow-2xl shadow-pink-100 border border-pink-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="relative z-10">
            <h2 className="text-2xl font-extrabold mb-1 drop-shadow-sm">Profile Setup Required</h2>
            <p className="text-pink-100 text-sm font-medium">Complete your citizen profile for fast-track SOS and auto-form filling</p>
            {/* Steps */}
            <div className="flex items-center gap-2 mt-5">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center gap-2">
                  <button onClick={() => setCurrentStep(s.num as WizardStep)} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${currentStep === s.num ? "bg-white text-blue-700 shadow-lg" : currentStep > s.num ? "bg-emerald-400 text-white" : "bg-white/15 text-white/60"}`}>
                    {currentStep > s.num ? <CheckCircle size={12} /> : s.icon} {s.title}
                  </button>
                  {i < 3 && <div className={`w-6 h-0.5 ${currentStep > s.num ? "bg-emerald-400" : "bg-white/20"}`} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div className="flex items-center gap-4 mb-6">
                  <button onClick={() => setPhotoUploaded(true)} className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center justify-center gap-1 cursor-pointer transition shrink-0 group">
                    {photoUploaded ? <img src="/api/avatar" alt="" className="w-full h-full rounded-2xl object-cover" /> : <><Camera size={20} className="text-slate-400 group-hover:text-blue-500" /><span className="text-[9px] text-slate-400 font-bold">Photo</span></>}
                  </button>
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <WizardInput label="Full Name *" value={profile.fullName} onChange={(v: string) => updateField("fullName", v)} placeholder="Enter full name" />
                    <WizardInput label="Date of Birth" value={profile.dob} onChange={(v: string) => updateField("dob", v)} placeholder="DD/MM/YYYY" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gender</label>
                    <div className="flex gap-2 mt-1.5">
                      {["Male", "Female", "Other"].map(g => (
                        <button key={g} onClick={() => updateField("gender", g)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${profile.gender === g ? "bg-blue-600 text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"}`}>{g}</button>
                      ))}
                    </div>
                  </div>
                  <WizardInput label="Phone *" value={profile.phone} onChange={(v: string) => updateField("phone", v)} placeholder="+91 XXXXX XXXXX" icon={<Phone size={14} />} />
                </div>
                <WizardInput label="Email" value={profile.email} onChange={(v: string) => updateField("email", v)} placeholder="citizen@example.com" icon={<Globe size={14} />} />
                
                {/* Aadhaar KYC */}
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-5 border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2"><CreditCard size={16} className="text-blue-600" /><span className="font-bold text-slate-800 text-sm">Aadhaar KYC</span></div>
                    {aadhaarVerified && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle size={10} /> VERIFIED</span>}
                  </div>
                  <div className="flex gap-3">
                    <input value={profile.aadhaar} onChange={e => updateField("aadhaar", e.target.value.replace(/\D/g, "").slice(0, 12))} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-sm font-mono tracking-widest" placeholder="XXXX XXXX XXXX" />
                    <button onClick={verifyAadhaar} disabled={profile.aadhaar.length < 12 || aadhaarVerified || isVerifying} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm disabled:opacity-40 cursor-pointer hover:bg-blue-700 transition flex items-center gap-2 shadow">
                      {isVerifying ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Verifying</> : aadhaarVerified ? <><CheckCircle size={16} /> Done</> : <><Fingerprint size={16} /> Verify</>}
                    </button>
                  </div>
                </div>

                <WizardInput label="Address" value={profile.address} onChange={(v: string) => updateField("address", v)} placeholder="House no, Street, Area" icon={<MapPin size={14} />} />
                <div className="grid grid-cols-3 gap-3">
                  <WizardInput label="City" value={profile.city} onChange={(v: string) => updateField("city", v)} placeholder="City" />
                  <WizardInput label="State" value={profile.state} onChange={(v: string) => updateField("state", v)} placeholder="State" />
                  <WizardInput label="PIN Code" value={profile.pincode} onChange={(v: string) => updateField("pincode", v)} placeholder="XXXXXX" />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                  <AlertTriangle size={18} className="text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-900 text-sm">Why is medical info critical?</h4>
                    <p className="text-xs text-red-700 mt-0.5">During SOS, your blood group, allergies, and medications are auto-shared with first responders to prevent fatal errors.</p>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Blood Group *</label>
                  <div className="grid grid-cols-4 gap-2 mt-1.5">
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                      <button key={bg} onClick={() => updateField("bloodGroup", bg)} className={`py-3 rounded-xl text-sm font-black transition cursor-pointer ${profile.bloodGroup === bg ? "bg-red-600 text-white shadow-lg shadow-red-200" : "bg-white text-slate-700 border border-slate-200 hover:border-red-300 hover:bg-red-50"}`}>{bg}</button>
                    ))}
                  </div>
                </div>
                <WizardInput label="Known Allergies" value={profile.allergies} onChange={(v: string) => updateField("allergies", v)} placeholder="e.g., Penicillin, Peanuts, Latex" icon={<AlertTriangle size={14} />} />
                <WizardInput label="Current Medications" value={profile.medications} onChange={(v: string) => updateField("medications", v)} placeholder="e.g., Albuterol, Cetirizine" icon={<Stethoscope size={14} />} />
                <WizardInput label="Medical Conditions" value={profile.conditions} onChange={(v: string) => updateField("conditions", v)} placeholder="e.g., Asthma, Diabetes, Epilepsy" />
                <WizardInput label="Emergency Doctor / Contact" value={profile.emergencyDoc} onChange={(v: string) => updateField("emergencyDoc", v)} placeholder="Dr. Name — Specialty" icon={<Stethoscope size={14} />} />
                <WizardInput label="Health Insurance ID (ABHA / PM-JAY)" value={profile.insuranceId} onChange={(v: string) => updateField("insuranceId", v)} placeholder="Policy Number" icon={<FileText size={14} />} />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <p className="text-sm text-slate-500">These contacts will be auto-notified with your live location during SOS triggers.</p>
                <div className="bg-white border-2 border-blue-200 rounded-2xl p-5 space-y-4">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2"><Star size={16} className="text-blue-600" /> Primary Contact</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <WizardInput label="Full Name *" value={profile.contact1Name} onChange={(v: string) => updateField("contact1Name", v)} placeholder="Contact name" />
                    <WizardInput label="Phone *" value={profile.contact1Phone} onChange={(v: string) => updateField("contact1Phone", v)} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Relationship</label>
                    <div className="flex gap-2 mt-1.5 flex-wrap">
                      {["Spouse", "Parent", "Sibling", "Child", "Friend", "Other"].map(r => (
                        <button key={r} onClick={() => updateField("contact1Relation", r)} className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${profile.contact1Relation === r ? "bg-blue-600 text-white shadow" : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"}`}>{r}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2"><Users size={16} className="text-slate-500" /> Secondary Contact</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <WizardInput label="Full Name" value={profile.contact2Name} onChange={(v: string) => updateField("contact2Name", v)} placeholder="Contact name" />
                    <WizardInput label="Phone" value={profile.contact2Phone} onChange={(v: string) => updateField("contact2Phone", v)} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Relationship</label>
                    <div className="flex gap-2 mt-1.5 flex-wrap">
                      {["Spouse", "Parent", "Sibling", "Child", "Friend", "Other"].map(r => (
                        <button key={r} onClick={() => updateField("contact2Relation", r)} className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${profile.contact2Relation === r ? "bg-blue-600 text-white shadow" : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"}`}>{r}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div className="text-center py-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md border border-blue-200">
                    <Shield size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">Review & Submit</h3>
                  <p className="text-sm text-slate-500">Verify your information before activation</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                  <ReviewRow label="Name" value={profile.fullName || "—"} icon={<User size={14} />} />
                  <ReviewRow label="Phone" value={profile.phone || "—"} icon={<Phone size={14} />} />
                  <ReviewRow label="Email" value={profile.email || "—"} icon={<Globe size={14} />} />
                  <ReviewRow label="Blood Group" value={profile.bloodGroup || "—"} icon={<Heart size={14} />} />
                  <ReviewRow label="Aadhaar" value={aadhaarVerified ? "✓ Verified" : "Not verified"} icon={<CreditCard size={14} />} />
                  <ReviewRow label="Primary Contact" value={profile.contact1Name ? `${profile.contact1Name} (${profile.contact1Relation})` : "—"} icon={<Users size={14} />} />
                </div>
                <div className="w-full bg-slate-200 h-3 rounded-full"><div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all" style={{ width: `${completion}%` }} /></div>
                <p className="text-center text-xs text-slate-500 font-bold">{completion}% Profile Completion</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
            <button onClick={() => setCurrentStep(Math.max(1, currentStep - 1) as WizardStep)} disabled={currentStep === 1} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-700 disabled:opacity-30 transition cursor-pointer"><ArrowLeft size={16} /> Back</button>
            {currentStep < 4 ? (
              <button onClick={() => setCurrentStep(Math.min(4, currentStep + 1) as WizardStep)} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 hover:from-blue-700 hover:to-indigo-700 transition cursor-pointer">
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={() => setIsComplete(true)} className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-200 hover:from-emerald-600 hover:to-blue-700 transition cursor-pointer">
                <CheckCircle size={16} /> Activate Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WizardInput({ label, value, onChange, placeholder, icon }: any) {
  return (
    <div>
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</label>
      <div className="relative mt-1">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
        <input value={value} onChange={e => onChange(e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition ${icon ? "pl-9" : ""}`} placeholder={placeholder} />
      </div>
    </div>
  );
}

function ReviewRow({ label, value, icon }: any) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="flex items-center gap-2 text-sm text-slate-500 font-medium">{icon} {label}</span>
      <span className="text-sm font-bold text-slate-800">{value}</span>
    </div>
  );
}

function DetailSection({ title, items }: { title: string; items: { label: string; value: string }[] }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
      <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">{title}</h4>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-slate-500">{item.label}</span>
            <span className="font-bold text-slate-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
