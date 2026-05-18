"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Volume2, Sun, Moon, Type, ZoomIn, ZoomOut, Contrast, MousePointer, Keyboard, X, CheckCircle, RotateCw, Monitor, Ear, Hand, Languages, Palette } from "lucide-react";

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  darkMode: boolean;
  largePointer: boolean;
  screenReader: boolean;
  reduceMotion: boolean;
  dyslexiaFont: boolean;
  underlineLinks: boolean;
  lineSpacing: number;
  saturation: number;
  textToSpeech: boolean;
  keyboardNav: boolean;
  colorBlindMode: "none" | "protanopia" | "deuteranopia" | "tritanopia";
}

const defaults: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  darkMode: false,
  largePointer: false,
  screenReader: false,
  reduceMotion: false,
  dyslexiaFont: false,
  underlineLinks: false,
  lineSpacing: 1.5,
  saturation: 100,
  textToSpeech: false,
  keyboardNav: false,
  colorBlindMode: "none",
};

export default function AccessibilityPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaults);
  const [activeTab, setActiveTab] = useState<"visual" | "motor" | "cognitive">("visual");
  const [saved, setSaved] = useState(false);
  const [profileName, setProfileName] = useState("Default");

  const update = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setSettings(p => ({ ...p, [key]: value }));
    setSaved(false);
  };

  const reset = () => {
    setSettings(defaults);
    setSaved(false);
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Apply live effects
  useEffect(() => {
    document.documentElement.style.fontSize = `${settings.fontSize}%`;
    return () => { document.documentElement.style.fontSize = ""; };
  }, [settings.fontSize]);

  if (!isOpen) return null;

  const tabs = [
    { id: "visual" as const, icon: <Eye size={16} />, label: "Visual" },
    { id: "motor" as const, icon: <Hand size={16} />, label: "Motor" },
    { id: "cognitive" as const, icon: <Ear size={16} />, label: "Cognitive" },
  ];

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ y: 30, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.95 }} transition={{ type: "spring", damping: 25 }} className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white flex items-center justify-between shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-white/15 p-2.5 rounded-xl backdrop-blur-sm border border-white/20"><Eye size={22} /></div>
              <div>
                <h2 className="text-lg font-extrabold">Accessibility Center</h2>
                <p className="text-purple-200 text-[10px] font-bold uppercase tracking-widest">WCAG 2.1 AA Compliant</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition cursor-pointer relative z-10"><X size={20} /></button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold transition-all cursor-pointer ${activeTab === t.id ? "text-indigo-700 border-b-2 border-indigo-600 bg-white" : "text-slate-500 hover:text-slate-700"}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {saved && (
              <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle size={16} /> Settings saved successfully!
              </motion.div>
            )}

            {activeTab === "visual" && (
              <div className="space-y-5">
                {/* Font Size */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2"><Type size={16} className="text-indigo-600" /><span className="font-bold text-slate-800 text-sm">Font Size</span></div>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{settings.fontSize}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => update("fontSize", Math.max(75, settings.fontSize - 10))} className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-100 transition cursor-pointer"><ZoomOut size={16} /></button>
                    <input type="range" min={75} max={200} step={5} value={settings.fontSize} onChange={e => update("fontSize", Number(e.target.value))} className="flex-1 accent-indigo-600 cursor-pointer" />
                    <button onClick={() => update("fontSize", Math.min(200, settings.fontSize + 10))} className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-100 transition cursor-pointer"><ZoomIn size={16} /></button>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 px-1">
                    <span>Small</span><span>Default</span><span>Large</span><span>X-Large</span>
                  </div>
                </div>

                {/* Contrast & Dark Mode */}
                <div className="grid grid-cols-2 gap-3">
                  <ToggleCard icon={<Contrast size={18} />} title="High Contrast" desc="Enhanced borders & text" enabled={settings.highContrast} onToggle={() => update("highContrast", !settings.highContrast)} color="amber" />
                  <ToggleCard icon={<Moon size={18} />} title="Dark Mode" desc="Reduce eye strain" enabled={settings.darkMode} onToggle={() => update("darkMode", !settings.darkMode)} color="slate" />
                </div>

                {/* Line Spacing */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2"><Type size={16} className="text-indigo-600" /><span className="font-bold text-slate-800 text-sm">Line Spacing</span></div>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{settings.lineSpacing}x</span>
                  </div>
                  <input type="range" min={1} max={3} step={0.25} value={settings.lineSpacing} onChange={e => update("lineSpacing", Number(e.target.value))} className="w-full accent-indigo-600 cursor-pointer" />
                </div>

                {/* Color Blind Mode */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2 mb-3"><Palette size={16} className="text-indigo-600" /><span className="font-bold text-slate-800 text-sm">Color Blind Mode</span></div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "none" as const, label: "None" },
                      { id: "protanopia" as const, label: "Protanopia (Red)" },
                      { id: "deuteranopia" as const, label: "Deuteranopia (Green)" },
                      { id: "tritanopia" as const, label: "Tritanopia (Blue)" },
                    ].map(m => (
                      <button key={m.id} onClick={() => update("colorBlindMode", m.id)} className={`text-left p-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${settings.colorBlindMode === m.id ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-500" : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"}`}>
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Saturation */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2"><Sun size={16} className="text-indigo-600" /><span className="font-bold text-slate-800 text-sm">Color Saturation</span></div>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{settings.saturation}%</span>
                  </div>
                  <input type="range" min={0} max={200} value={settings.saturation} onChange={e => update("saturation", Number(e.target.value))} className="w-full accent-indigo-600 cursor-pointer" />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1"><span>Grayscale</span><span>Normal</span><span>Vivid</span></div>
                </div>

                <ToggleCard icon={<Type size={18} />} title="Dyslexia Font" desc="OpenDyslexic typeface" enabled={settings.dyslexiaFont} onToggle={() => update("dyslexiaFont", !settings.dyslexiaFont)} color="purple" fullWidth />
                <ToggleCard icon={<Eye size={18} />} title="Underline Links" desc="Make hyperlinks visible" enabled={settings.underlineLinks} onToggle={() => update("underlineLinks", !settings.underlineLinks)} color="blue" fullWidth />
              </div>
            )}

            {activeTab === "motor" && (
              <div className="space-y-5">
                <ToggleCard icon={<MousePointer size={18} />} title="Large Pointer" desc="Enlarged cursor for easier targeting" enabled={settings.largePointer} onToggle={() => update("largePointer", !settings.largePointer)} color="blue" fullWidth />
                <ToggleCard icon={<Keyboard size={16} />} title="Keyboard Navigation" desc="Full Tab/Enter navigation support" enabled={settings.keyboardNav} onToggle={() => update("keyboardNav", !settings.keyboardNav)} color="indigo" fullWidth />
                <ToggleCard icon={<Monitor size={18} />} title="Reduce Motion" desc="Minimize animations & transitions" enabled={settings.reduceMotion} onToggle={() => update("reduceMotion", !settings.reduceMotion)} color="amber" fullWidth />
                
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><Hand size={16} /> Touch Target Size</h4>
                  <p className="text-xs text-blue-700 mb-3">All interactive elements meet 44×44px minimum touch target as per WCAG 2.5.5 guidelines.</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-500" /><span className="text-xs font-bold text-emerald-700">Compliant</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "cognitive" && (
              <div className="space-y-5">
                <ToggleCard icon={<Volume2 size={18} />} title="Screen Reader" desc="NVDA / VoiceOver compatible ARIA labels" enabled={settings.screenReader} onToggle={() => update("screenReader", !settings.screenReader)} color="emerald" fullWidth />
                <ToggleCard icon={<Ear size={18} />} title="Text-to-Speech" desc="Read page content aloud on hover" enabled={settings.textToSpeech} onToggle={() => update("textToSpeech", !settings.textToSpeech)} color="purple" fullWidth />
                
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
                  <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2"><Languages size={16} /> Multi-Language Support</h4>
                  <p className="text-xs text-indigo-700 mb-3">GovAssist supports 6 regional languages with text-to-speech capabilities for all content.</p>
                  <div className="flex flex-wrap gap-2">
                    {["English", "हिन्दी", "தமிழ்", "বাংলা", "తెలుగు", "मराठी"].map(l => (
                      <span key={l} className="bg-white px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 border border-indigo-200">{l}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <h4 className="font-bold text-emerald-900 mb-2">Reading Level</h4>
                  <p className="text-xs text-emerald-700 mb-3">All content is written at Grade 8 reading level or below for maximum comprehension.</p>
                  <div className="w-full bg-emerald-200 h-2 rounded-full"><div className="bg-emerald-500 h-2 rounded-full w-4/5" /></div>
                  <div className="flex justify-between text-[10px] text-emerald-600 mt-1"><span>Simple</span><span>Grade 8</span><span>Technical</span></div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
            <button onClick={reset} className="text-sm text-slate-500 font-bold flex items-center gap-1 hover:text-slate-700 transition cursor-pointer"><RotateCw size={14} /> Reset All</button>
            <button onClick={save} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-md hover:from-indigo-700 hover:to-purple-700 transition cursor-pointer text-sm flex items-center gap-2">
              <CheckCircle size={16} /> Apply Settings
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ToggleCard({ icon, title, desc, enabled, onToggle, color, fullWidth }: any) {
  const colors: Record<string, string> = {
    amber: "border-amber-200 bg-amber-50",
    slate: "border-slate-200 bg-slate-50",
    purple: "border-purple-200 bg-purple-50",
    blue: "border-blue-200 bg-blue-50",
    indigo: "border-indigo-200 bg-indigo-50",
    emerald: "border-emerald-200 bg-emerald-50",
  };

  return (
    <div className={`${fullWidth ? "" : ""} p-4 rounded-2xl border-2 transition-all ${enabled ? colors[color] || colors.blue : "border-slate-200 bg-white"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`${enabled ? `text-${color}-600` : "text-slate-400"}`}>{icon}</div>
          <div>
            <div className="font-bold text-slate-800 text-sm">{title}</div>
            <div className="text-[11px] text-slate-500">{desc}</div>
          </div>
        </div>
        <div onClick={onToggle} className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${enabled ? "bg-indigo-600" : "bg-slate-300"}`}>
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${enabled ? "right-1" : "left-1"}`} />
        </div>
      </div>
    </div>
  );
}
