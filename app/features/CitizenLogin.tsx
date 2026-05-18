"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, User, Mail, Phone, Eye, EyeOff, Fingerprint, CheckCircle, AlertTriangle, ArrowRight, ArrowLeft, Smartphone, Key, Globe, X, Zap, Star, CreditCard } from "lucide-react";

type LoginStep = "method" | "credentials" | "otp" | "biometric" | "success";

export default function CitizenLoginModal({ isOpen, onClose, onLogin }: { isOpen: boolean; onClose: () => void; onLogin: (name: string, email: string) => void }) {
  const [step, setStep] = useState<LoginStep>("method");
  const [method, setMethod] = useState<"email" | "aadhaar" | "digilocker">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("Citizen User");
  const [email, setEmail] = useState("citizen@govassist.in");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [aadhaar, setAadhaar] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [biometricProgress, setBiometricProgress] = useState(0);
  const [biometricStatus, setBiometricStatus] = useState<"idle" | "scanning" | "success" | "fail">("idle");
  const [loginStrength, setLoginStrength] = useState(0);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === "otp" && otpTimer > 0) {
      const t = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [step, otpTimer]);

  useEffect(() => {
    if (step === "biometric" && biometricStatus === "scanning") {
      const interval = setInterval(() => {
        setBiometricProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setBiometricStatus("success");
            setTimeout(() => setStep("success"), 800);
            return 100;
          }
          return p + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [step, biometricStatus]);

  useEffect(() => {
    let s = 0;
    if (password.length >= 8) s += 25;
    if (/[A-Z]/.test(password)) s += 25;
    if (/[0-9]/.test(password)) s += 25;
    if (/[^A-Za-z0-9]/.test(password)) s += 25;
    setLoginStrength(s);
  }, [password]);

  useEffect(() => {
    if (step === "success") {
      const t = setTimeout(() => {
        onLogin(name, email);
        onClose();
        // Reset
        setStep("method");
        setOtp(["", "", "", "", "", ""]);
        setBiometricProgress(0);
        setBiometricStatus("idle");
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [step]);

  const handleOtpChange = (idx: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
    if (newOtp.every(d => d !== "")) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setStep("biometric");
      }, 1500);
    }
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleCredentialsSubmit = () => {
    setOtpTimer(30);
    setStep("otp");
  };

  if (!isOpen) return null;

  const strengthColor = loginStrength <= 25 ? "bg-red-500" : loginStrength <= 50 ? "bg-amber-500" : loginStrength <= 75 ? "bg-blue-500" : "bg-emerald-500";
  const strengthLabel = loginStrength <= 25 ? "Weak" : loginStrength <= 50 ? "Fair" : loginStrength <= 75 ? "Good" : "Strong";

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ y: 30, scale: 0.95, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 30, scale: 0.95, opacity: 0 }} transition={{ type: "spring", damping: 25 }} className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative" onClick={e => e.stopPropagation()}>
          
          {/* Progress Bar */}
          <div className="h-1 bg-slate-100 relative">
            <motion.div animate={{ width: step === "method" ? "20%" : step === "credentials" ? "40%" : step === "otp" ? "60%" : step === "biometric" ? "80%" : "100%" }} className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all" />
          </div>

          {/* Header */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition z-10"><X size={20} /></button>
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg">
                <img src="/api/logo" alt="" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight">Citizen Login</h2>
                <p className="text-blue-200 text-xs font-medium mt-0.5 flex items-center gap-1.5">
                  <Lock size={10} /> Secured by NIC • End-to-End Encrypted
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 relative z-10">
              {["method", "credentials", "otp", "biometric", "success"].map((s, i) => (
                <div key={s} className="flex items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all ${
                    step === s ? "bg-white text-blue-700 border-white shadow-lg" :
                    ["method","credentials","otp","biometric","success"].indexOf(step) > i ? "bg-emerald-400 border-emerald-400 text-white" : "border-white/30 text-white/40"
                  }`}>{["method","credentials","otp","biometric","success"].indexOf(step) > i ? "✓" : i + 1}</div>
                  {i < 4 && <div className={`w-6 h-0.5 ${["method","credentials","otp","biometric","success"].indexOf(step) > i ? "bg-emerald-400" : "bg-white/20"}`} />}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === "method" && (
                <motion.div key="method" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Choose Authentication</h3>
                  <p className="text-sm text-slate-500 mb-5">Select your preferred sign-in method</p>
                  <div className="space-y-3">
                    {[
                      { id: "email" as const, icon: <Mail size={20} />, title: "Email & Password", desc: "Standard secure login", badge: "Popular" },
                      { id: "aadhaar" as const, icon: <CreditCard size={20} />, title: "Aadhaar OTP", desc: "12-digit UIDAI verification", badge: "Recommended" },
                      { id: "digilocker" as const, icon: <Shield size={20} />, title: "DigiLocker SSO", desc: "Government single sign-on", badge: "Fastest" },
                    ].map(m => (
                      <button key={m.id} onClick={() => { setMethod(m.id); setStep("credentials"); }} className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 group cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-md ${method === m.id ? "border-blue-500 bg-blue-50" : "border-slate-200"}`}>
                        <div className={`p-3 rounded-xl transition-colors ${method === m.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"}`}>{m.icon}</div>
                        <div className="flex-1">
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            {m.title}
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">{m.badge}</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">{m.desc}</div>
                        </div>
                        <ArrowRight size={18} className="text-slate-300 group-hover:text-blue-500 transition" />
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                    <Shield size={16} className="text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-slate-500 leading-relaxed">Your data is encrypted with AES-256 and stored on government-certified servers. We comply with IT Act 2000 and DPDPA 2023.</p>
                  </div>
                </motion.div>
              )}

              {step === "credentials" && (
                <motion.div key="creds" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <button onClick={() => setStep("method")} className="text-xs text-blue-600 font-bold flex items-center gap-1 mb-4 hover:text-blue-700 cursor-pointer"><ArrowLeft size={14} /> Back</button>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Enter Credentials</h3>
                  <div className="space-y-4">
                    {method === "email" && (
                      <>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                          <input value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-sm transition" placeholder="Enter full name" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                          <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-sm transition" placeholder="citizen@example.com" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
                          <div className="relative mt-1">
                            <input value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-sm transition" placeholder="••••••••" />
                            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                          </div>
                          {password && (
                            <div className="mt-2 flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${strengthColor} rounded-full transition-all`} style={{ width: `${loginStrength}%` }} /></div>
                              <span className="text-[10px] font-bold text-slate-500">{strengthLabel}</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {method === "aadhaar" && (
                      <>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Aadhaar Number</label>
                          <input value={aadhaar} onChange={e => { const v = e.target.value.replace(/\D/g, "").slice(0, 12); setAadhaar(v); }} className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-sm transition font-mono tracking-widest" placeholder="XXXX XXXX XXXX" />
                          <p className="text-[10px] text-slate-400 mt-1">12-digit unique identification number</p>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Registered Mobile</label>
                          <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-sm transition" placeholder="+91 XXXXX XXXXX" />
                        </div>
                      </>
                    )}
                    {method === "digilocker" && (
                      <div className="text-center py-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-blue-200">
                          <Shield size={36} className="text-blue-600" />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">DigiLocker SSO</h4>
                        <p className="text-sm text-slate-500 mb-4">You will be redirected to DigiLocker to authenticate your identity securely.</p>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-700 font-medium flex items-center gap-2 justify-center">
                          <CheckCircle size={14} /> Auto-imports Aadhaar, PAN & Driving License
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-2 mt-2">
                      <input type="checkbox" checked={agreedTerms} onChange={() => setAgreedTerms(!agreedTerms)} className="mt-1 cursor-pointer accent-blue-600" />
                      <label className="text-[11px] text-slate-500 cursor-pointer" onClick={() => setAgreedTerms(!agreedTerms)}>I agree to the <span className="text-blue-600 font-bold">Terms of Service</span> and <span className="text-blue-600 font-bold">Privacy Policy</span> under IT Act 2000</label>
                    </div>
                    <button onClick={handleCredentialsSubmit} disabled={!agreedTerms} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition cursor-pointer">
                      <Lock size={16} /> Continue Securely <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "otp" && (
                <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md border border-blue-200">
                    <Smartphone size={28} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">OTP Verification</h3>
                  <p className="text-sm text-slate-500 mb-6">Enter 6-digit code sent to <span className="font-bold text-slate-800">{phone}</span></p>
                  <div className="flex justify-center gap-2 mb-4">
                    {otp.map((digit, i) => (
                      <input key={i} ref={el => { otpRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={digit}
                        onChange={e => handleOtpChange(i, e.target.value)}
                        onKeyDown={e => handleOtpKeyDown(i, e)}
                        className={`w-12 h-14 text-center text-xl font-black rounded-xl border-2 outline-none transition-all ${digit ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"}`} />
                    ))}
                  </div>
                  {isVerifying && (
                    <div className="flex items-center justify-center gap-2 text-blue-600 text-sm font-bold mb-4">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> Verifying OTP...
                    </div>
                  )}
                  <div className="text-xs text-slate-500 mt-2">
                    {otpTimer > 0 ? <span>Resend code in <span className="font-bold text-slate-800">{otpTimer}s</span></span> : <button onClick={() => setOtpTimer(30)} className="text-blue-600 font-bold cursor-pointer hover:underline">Resend OTP</button>}
                  </div>
                  <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-700 flex items-start gap-2">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                    <span>Never share your OTP with anyone. GovAssist will never call you asking for this code.</span>
                  </div>
                </motion.div>
              )}

              {step === "biometric" && (
                <motion.div key="bio" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Biometric Verification</h3>
                  <p className="text-sm text-slate-500 mb-6">Touch sensor to complete authentication</p>
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke={biometricStatus === "success" ? "#22c55e" : "#3b82f6"} strokeWidth="6" strokeDasharray={`${biometricProgress * 2.83} 283`} strokeLinecap="round" className="transition-all" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button onClick={() => biometricStatus === "idle" && setBiometricStatus("scanning")} className={`p-5 rounded-full transition-all cursor-pointer ${biometricStatus === "success" ? "bg-emerald-100 text-emerald-600" : biometricStatus === "scanning" ? "bg-blue-100 text-blue-600 animate-pulse" : "bg-slate-100 text-slate-400 hover:bg-blue-50 hover:text-blue-500"}`}>
                        {biometricStatus === "success" ? <CheckCircle size={32} /> : <Fingerprint size={32} />}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-600">
                    {biometricStatus === "idle" ? "Tap the fingerprint icon" : biometricStatus === "scanning" ? `Scanning... ${biometricProgress}%` : "✓ Identity Verified!"}
                  </p>
                  <button onClick={() => { setStep("success"); }} className="mt-6 text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer">Skip biometric</button>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10 }} className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl shadow-emerald-200">
                    <CheckCircle size={40} className="text-white" />
                  </motion.div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">Welcome, {name}!</h3>
                  <p className="text-sm text-slate-500 mb-4">Authentication successful. Redirecting to dashboard...</p>
                  <div className="flex items-center justify-center gap-6 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1"><Shield size={12} className="text-emerald-500" /> KYC Verified</span>
                    <span className="flex items-center gap-1"><Lock size={12} className="text-blue-500" /> Session Encrypted</span>
                  </div>
                  <div className="mt-4 w-48 h-1 bg-slate-100 rounded-full mx-auto overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2 }} className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
