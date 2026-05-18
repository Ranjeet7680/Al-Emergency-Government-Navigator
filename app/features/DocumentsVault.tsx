"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDigit, CheckCircle, Plus, Download, Eye, Lock, Share2, Trash2, Upload, Search, Filter, Shield, CreditCard, FileText, HeartPulse, AlertTriangle, Star, Clock, Globe, Fingerprint, X, ChevronRight, ExternalLink, Copy, CheckCircle2, Image as ImageIcon, File, Archive, Building } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  number: string;
  icon: any;
  status: "verified" | "pending" | "expired" | "missing";
  encrypted: boolean;
  lastAccessed: string;
  size: string;
  category: "identity" | "medical" | "financial" | "property" | "education";
  shared: boolean;
  expiryDate?: string;
}

export default function DocumentsVaultAdvanced() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleAction = (msg: string) => {
    setActiveAction(msg);
    setTimeout(() => setActiveAction(null), 3000);
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setShowUpload(false);
          handleAction("Document uploaded & encrypted successfully!");
          return 100;
        }
        return p + 5;
      });
    }, 80);
  };

  const documents: Document[] = [
    { id: "1", name: "Aadhaar Card", type: "UIDAI", number: "XXXX-XXXX-1234", icon: <CreditCard size={20} />, status: "verified", encrypted: true, lastAccessed: "2 hours ago", size: "245 KB", category: "identity", shared: false },
    { id: "2", name: "PAN Card", type: "Income Tax", number: "ABCDE1234F", icon: <FileText size={20} />, status: "verified", encrypted: true, lastAccessed: "1 day ago", size: "180 KB", category: "identity", shared: false },
    { id: "3", name: "Voter ID", type: "ECI", number: "ABC1234567", icon: <Building size={20} />, status: "verified", encrypted: true, lastAccessed: "3 days ago", size: "320 KB", category: "identity", shared: false },
    { id: "4", name: "Driving License", type: "RTO", number: "DL-1420110012345", icon: <CreditCard size={20} />, status: "pending", encrypted: true, lastAccessed: "1 week ago", size: "410 KB", category: "identity", shared: false, expiryDate: "2028-06-15" },
    { id: "5", name: "Medical Records", type: "ABHA", number: "91-0000-1111-2222", icon: <HeartPulse size={20} />, status: "missing", encrypted: false, lastAccessed: "Never", size: "—", category: "medical", shared: false },
    { id: "6", name: "Health Insurance", type: "PM-JAY", number: "AB-4455-6677", icon: <Shield size={20} />, status: "verified", encrypted: true, lastAccessed: "5 days ago", size: "156 KB", category: "medical", shared: true },
    { id: "7", name: "Bank Statement", type: "SBI", number: "XXXX-4521", icon: <Building size={20} />, status: "verified", encrypted: true, lastAccessed: "1 day ago", size: "1.2 MB", category: "financial", shared: false },
    { id: "8", name: "Property Deed", type: "Sub-Registrar", number: "REG/2020/54321", icon: <File size={20} />, status: "verified", encrypted: true, lastAccessed: "2 months ago", size: "3.4 MB", category: "property", shared: false },
    { id: "9", name: "Passport", type: "MEA", number: "K1234567", icon: <Globe size={20} />, status: "expired", encrypted: true, lastAccessed: "6 months ago", size: "520 KB", category: "identity", shared: false, expiryDate: "2024-01-15" },
    { id: "10", name: "Degree Certificate", type: "UGC", number: "UGC/2020/12345", icon: <FileText size={20} />, status: "verified", encrypted: true, lastAccessed: "1 month ago", size: "890 KB", category: "education", shared: false },
  ];

  const categories = [
    { id: "all", label: "All", count: documents.length },
    { id: "identity", label: "Identity", count: documents.filter(d => d.category === "identity").length },
    { id: "medical", label: "Medical", count: documents.filter(d => d.category === "medical").length },
    { id: "financial", label: "Financial", count: documents.filter(d => d.category === "financial").length },
    { id: "property", label: "Property", count: documents.filter(d => d.category === "property").length },
    { id: "education", label: "Education", count: documents.filter(d => d.category === "education").length },
  ];

  const filteredDocs = documents.filter(d => {
    const matchesCategory = activeCategory === "all" || d.category === activeCategory;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.number.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    verified: { label: "Verified", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle size={12} /> },
    pending: { label: "Pending", color: "bg-amber-100 text-amber-700 border-amber-200", icon: <Clock size={12} /> },
    expired: { label: "Expired", color: "bg-red-100 text-red-700 border-red-200", icon: <AlertTriangle size={12} /> },
    missing: { label: "Missing", color: "bg-slate-100 text-slate-500 border-slate-200", icon: <X size={12} /> },
  };

  const verifiedCount = documents.filter(d => d.status === "verified").length;
  const encryptedCount = documents.filter(d => d.encrypted).length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-6">
      {activeAction && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed top-4 right-4 z-[80] bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle size={18} /> {activeAction}
        </motion.div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Documents Vault</h2>
          <p className="text-slate-500">Securely store, manage, and share your identity documents. DigiLocker Synced.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleAction("Syncing with DigiLocker API...")} className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-emerald-700 transition cursor-pointer shadow">
            <Globe size={16} /> Sync DigiLocker
          </button>
          <button onClick={() => setShowUpload(true)} className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition cursor-pointer shadow">
            <Plus size={16} /> Upload
          </button>
        </div>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="bg-blue-100 text-blue-600 p-2.5 rounded-xl"><FileDigit size={20} /></div>
          <div><div className="text-xl font-black text-slate-900">{documents.length}</div><div className="text-[11px] text-slate-500 font-bold">Total Documents</div></div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="bg-emerald-100 text-emerald-600 p-2.5 rounded-xl"><CheckCircle size={20} /></div>
          <div><div className="text-xl font-black text-emerald-600">{verifiedCount}</div><div className="text-[11px] text-slate-500 font-bold">Verified</div></div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="bg-indigo-100 text-indigo-600 p-2.5 rounded-xl"><Lock size={20} /></div>
          <div><div className="text-xl font-black text-indigo-600">{encryptedCount}</div><div className="text-[11px] text-slate-500 font-bold">Encrypted</div></div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="bg-amber-100 text-amber-600 p-2.5 rounded-xl"><AlertTriangle size={20} /></div>
          <div><div className="text-xl font-black text-amber-600">{documents.filter(d => d.status === "expired" || d.status === "missing").length}</div><div className="text-[11px] text-slate-500 font-bold">Needs Attention</div></div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" placeholder="Search by document name or number..." className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-sm transition shadow-sm" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${activeCategory === cat.id ? "bg-blue-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"}`}>
              {cat.label} <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeCategory === cat.id ? "bg-white/20" : "bg-slate-100"}`}>{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map(doc => {
          const status = statusConfig[doc.status];
          return (
            <motion.div key={doc.id} layout className={`bg-white rounded-2xl border-2 shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer ${
              doc.status === "missing" ? "border-dashed border-slate-300" : doc.status === "expired" ? "border-red-200" : "border-slate-200 hover:border-blue-300"
            }`} onClick={() => setSelectedDoc(selectedDoc === doc.id ? null : doc.id)}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${doc.status === "verified" ? "bg-emerald-50 text-emerald-600" : doc.status === "expired" ? "bg-red-50 text-red-600" : doc.status === "missing" ? "bg-slate-100 text-slate-400" : "bg-amber-50 text-amber-600"}`}>{doc.icon}</div>
                  <div className="flex items-center gap-2">
                    {doc.encrypted && <Lock size={12} className="text-indigo-400" />}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${status.color}`}>{status.icon} {status.label}</span>
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-0.5">{doc.name}</h3>
                <p className="text-xs text-slate-500 font-mono mb-1">{doc.number}</p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1"><Clock size={10} /> {doc.lastAccessed} • {doc.size}</p>
                {doc.expiryDate && doc.status === "expired" && (
                  <p className="text-[10px] text-red-500 font-bold mt-1 flex items-center gap-1"><AlertTriangle size={10} /> Expired: {doc.expiryDate}</p>
                )}
              </div>

              {/* Expanded Actions */}
              <AnimatePresence>
                {selectedDoc === doc.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-4 pt-0 border-t border-slate-100 flex flex-wrap gap-2 mt-0 pt-3">
                      {doc.status !== "missing" ? (
                        <>
                          <button onClick={e => { e.stopPropagation(); handleAction(`Viewing ${doc.name}...`); }} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"><Eye size={14} /> View</button>
                          <button onClick={e => { e.stopPropagation(); handleAction(`Downloading ${doc.name}...`); }} className="bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-blue-100"><Download size={14} /></button>
                          <button onClick={e => { e.stopPropagation(); handleAction(`Document number copied to clipboard!`); }} className="bg-slate-50 hover:bg-slate-100 text-slate-600 py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-slate-200"><Copy size={14} /></button>
                          <button onClick={e => { e.stopPropagation(); handleAction(`Secure sharing link generated for ${doc.name}`); }} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-emerald-100"><Share2 size={14} /></button>
                        </>
                      ) : (
                        <button onClick={e => { e.stopPropagation(); setShowUpload(true); }} className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-700 transition"><Upload size={14} /> Upload Document</button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Encryption Notice */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl p-6 text-white flex items-center gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10 shrink-0 relative z-10"><Shield size={28} /></div>
        <div className="relative z-10">
          <h3 className="font-extrabold text-lg mb-1">AES-256 Military-Grade Encryption</h3>
          <p className="text-slate-300 text-sm">All documents are encrypted at rest and in transit. Zero-knowledge architecture — only YOU can access your vault.</p>
        </div>
        <div className="shrink-0 relative z-10 hidden md:block">
          <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-emerald-500/30">
            <Fingerprint size={16} /> Biometric Lock Active
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => !isUploading && setShowUpload(false)}>
            <motion.div initial={{ y: 30, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.95 }} className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-extrabold text-slate-900">Upload Document</h3>
                  <button onClick={() => !isUploading && setShowUpload(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X size={20} /></button>
                </div>
                <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${isUploading ? "border-blue-300 bg-blue-50" : "border-slate-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"}`} onClick={() => !isUploading && simulateUpload()}>
                  {isUploading ? (
                    <div>
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><Upload size={24} className="text-blue-600 animate-bounce" /></div>
                      <p className="text-sm font-bold text-blue-700 mb-3">Encrypting & Uploading...</p>
                      <div className="w-full bg-blue-200 h-2 rounded-full"><div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} /></div>
                      <p className="text-xs text-blue-500 mt-2 font-mono">{uploadProgress}%</p>
                    </div>
                  ) : (
                    <div>
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"><Upload size={24} className="text-slate-400" /></div>
                      <p className="text-sm font-bold text-slate-700 mb-1">Click to upload or drag & drop</p>
                      <p className="text-xs text-slate-400">PDF, JPG, PNG (max 10MB). Auto-encrypted with AES-256.</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-700 font-medium">
                  <Lock size={14} className="shrink-0" /> Your document will be encrypted before storage
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
