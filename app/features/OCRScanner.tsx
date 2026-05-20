"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, ShieldAlert, AlertCircle, RefreshCw, FolderPlus } from "lucide-react";

interface ScannedData {
  cardType: string;
  name: string;
  idNumber: string;
  bloodGroup: string;
  allergies: string;
  insuranceProvider?: string;
  validUntil?: string;
}

export default function OCRScanner() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<ScannedData | null>(null);

  const mockTemplates = [
    { label: "Emergency Medical Card", type: "medical", file: "medical_id_card.png" },
    { label: "Aadhaar Card Copy", type: "government", file: "aadhaar_card_proof.jpg" },
    { label: "Health Insurance Plan", type: "insurance", file: "insurance_policy.pdf" }
  ];

  const handleSelectTemplate = (t: typeof mockTemplates[0]) => {
    setSelectedFile(t.file);
    setScannedResult(null);
  };

  const startScanning = () => {
    if (!selectedFile) return;
    setIsScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      setIsScanning(false);
      if (selectedFile.includes("medical")) {
        setScannedResult({
          cardType: "Emergency Medical Card",
          name: "Ranjeet Kumar",
          idNumber: "MC-9872-X01",
          bloodGroup: "O Positive (O+)",
          allergies: "Penicillin, Peanuts",
          validUntil: "12/2028"
        });
      } else if (selectedFile.includes("aadhaar")) {
        setScannedResult({
          cardType: "UIDAI Government National ID",
          name: "Ranjeet Kumar",
          idNumber: "4321 8976 5012",
          bloodGroup: "O+",
          allergies: "None Reported",
          validUntil: "Permanent"
        });
      } else {
        setScannedResult({
          cardType: "Star Health Insurance Policy",
          name: "Ranjeet Kumar",
          idNumber: "SHI-8871927",
          bloodGroup: "O+",
          allergies: "None",
          insuranceProvider: "Star Health Assurance Ltd.",
          validUntil: "08/2027"
        });
      }
    }, 1800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
      
      {/* File Upload / Scanner Screen */}
      <div className="lg:col-span-7 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-6 shadow-2xl flex flex-col space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-50/20 via-blue-50/10 to-indigo-50/20 pointer-events-none"></div>

        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">AI Document OCR Scanner</h2>
          <p className="text-xs text-slate-500 font-medium">Extract vital health metadata, blood groups, and policy details from document scans</p>
        </div>

        {/* Scan Frame */}
        <div className="relative border-2 border-dashed border-slate-300 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[260px] bg-slate-50/40 relative overflow-hidden group">
          
          {/* Scanning line animation */}
          {isScanning && (
            <motion.div 
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399] z-20"
            />
          )}

          {selectedFile ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl inline-flex text-indigo-600">
                <FileText size={40} className="animate-pulse" />
              </div>
              <div>
                <span className="font-extrabold text-sm text-slate-800 block">{selectedFile}</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Ready for OCR Extraction</span>
              </div>
              <div className="flex gap-2 justify-center">
                <button 
                  onClick={startScanning}
                  disabled={isScanning}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition cursor-pointer shadow-md"
                >
                  {isScanning ? "Extracting Text..." : "Scan & OCR"}
                </button>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 rounded-xl transition cursor-pointer border border-slate-200"
                >
                  Clear File
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <div className="p-4 bg-slate-100 rounded-full inline-flex text-slate-400">
                <Upload size={32} />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-700 block">Select a mock document template below</span>
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Simulates client device photo uploads</span>
              </div>
            </div>
          )}
        </div>

        {/* Mock Upload templates selection */}
        <div className="space-y-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Mock Document Scopes:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {mockTemplates.map((t, i) => (
              <button
                key={i}
                onClick={() => handleSelectTemplate(t)}
                className={`p-3 border rounded-2xl text-left transition cursor-pointer flex items-center gap-2.5 ${
                  selectedFile === t.file 
                    ? "bg-indigo-50 border-indigo-300" 
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200/60"
                }`}
              >
                <FileText size={16} className="text-slate-500 shrink-0" />
                <div>
                  <div className="font-extrabold text-[10px] text-slate-800 leading-tight">{t.label}</div>
                  <div className="text-[8px] text-slate-400 mt-0.5">{t.file}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Scanned Results Panel */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Results Card */}
        <AnimatePresence mode="wait">
          {scannedResult ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl space-y-4"
            >
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckCircle className="text-emerald-500" size={20} />
                <h3 className="font-extrabold text-slate-950 text-base">Extracted OCR Metadata</h3>
              </div>

              <div className="grid grid-cols-1 gap-2.5 text-xs">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Document Classification</span>
                  <span className="font-black text-slate-800">{scannedResult.cardType}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-2">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Full Name</span>
                    <span className="font-black text-slate-800">{scannedResult.name}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Unique ID Code</span>
                    <span className="font-black text-slate-800">{scannedResult.idNumber}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-2">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Blood Group</span>
                    <span className="font-black text-emerald-600">{scannedResult.bloodGroup}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Allergies Detected</span>
                    <span className="font-black text-red-500">{scannedResult.allergies}</span>
                  </div>
                </div>
                {scannedResult.insuranceProvider && (
                  <div className="border-t border-slate-100 pt-2">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Insurance Insurer</span>
                    <span className="font-black text-slate-800">{scannedResult.insuranceProvider}</span>
                  </div>
                )}
                <div className="border-t border-slate-100 pt-2">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Verification Expiry</span>
                  <span className="font-black text-slate-800">{scannedResult.validUntil}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => alert("Digital ID added and encrypted in Citizens Vault.")}
                  className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs py-3 rounded-xl transition cursor-pointer flex justify-center items-center gap-1.5 shadow"
                >
                  <FolderPlus size={12} /> Sync to Vault
                </button>
                <button
                  onClick={startScanning}
                  className="p-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-slate-600 transition cursor-pointer"
                  title="Re-run scanner"
                >
                  <RefreshCw size={12} />
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-200 text-center py-12 rounded-3xl text-xs text-slate-400 font-bold flex flex-col items-center justify-center gap-2">
              <AlertCircle size={24} className="text-slate-300" />
              Upload template copy and click "Scan & OCR" to display extracted database records.
            </div>
          )}
        </AnimatePresence>

        {/* Compliance Notice */}
        <div className="bg-slate-950 border border-slate-800 text-slate-400 p-5 rounded-3xl shadow-xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-200 font-bold">
            <ShieldAlert size={14} className="text-amber-500 animate-pulse" />
            <span>Identity Data Policy Notice</span>
          </div>
          <p className="text-[10px] leading-normal font-mono text-slate-400">
            GovAssist utilizes localized sandbox client-side OCR parsing to preserve identity privacy. Parsed credentials are never saved on remote server buffers without encrypted authorization codes.
          </p>
        </div>

      </div>

    </div>
  );
}
