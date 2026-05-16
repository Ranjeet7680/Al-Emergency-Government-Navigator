"use client";

import { useState, useEffect } from "react";
import { Mic, Send, AlertTriangle, PhoneCall, FileText, Camera, MapPin, HeartPulse, ShieldAlert, Shield, Search, Bell, User, Home, BookOpen, File, Activity, Settings as SettingsIcon, ChevronRight, Stethoscope, Waves, Scale, Briefcase, Plus, Heart, Map, Globe, Eye, Lock, Zap, FileDigit, Tent, Users, UserCog, Volume2, LayoutGrid, CheckCircle, Download, CreditCard, Building, Gavel, FileCheck, FileWarning, LineChart, Info, Bot, Database, Calendar, Clock, X, Edit, Trash2, Save, Upload, Filter, Star, TrendingUp, Award, Target, Wifi, WifiOff, Battery, BatteryCharging, Navigation, Radio, Siren, Ambulance, Hospital, Pill, Thermometer, Droplet, Wind, Cloud, Sun, Moon, Sunrise, Sunset, CloudRain, CloudSnow, CloudLightning, Umbrella, AlertCircle, CheckCircle2, XCircle, HelpCircle, MessageSquare, MessageCircle, Phone, Mail, Video, Share2, Link, Copy, Printer, ExternalLink, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, ChevronLeft, ChevronDown, ChevronUp, MoreVertical, MoreHorizontal, Menu, Maximize, Minimize, RefreshCw, RotateCw, ZoomIn, ZoomOut, Layers, Package, Clipboard, BookMarked, Bookmark, Tag, Hash, AtSign, DollarSign, Percent, Slash, Code, Terminal, GitBranch, Github, Twitter, Facebook, Instagram, Linkedin, Youtube, Chrome, Smartphone, Tablet, Laptop, Monitor, Tv, Watch, Headphones, Speaker, Mic2, MicOff, Volume, Volume1, VolumeX, Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, List, Grid, Columns, Rows, Square, Circle, Triangle, Hexagon, Octagon, Pentagon, Diamond, Image as ImageIcon, Film, Music, FileVideo, FileAudio, FileImage, FilePlus, FileMinus, FileX, Folder, FolderPlus, FolderMinus, FolderOpen, Archive, Inbox, Send as SendIcon, Trash, Flag, Bookmark as BookmarkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Welcome");
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isTopSearchOpen, setIsTopSearchOpen] = useState(false);
  const [topSearchQuery, setTopSearchQuery] = useState("");
  const [showUserAgreement, setShowUserAgreement] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showCriticalAlert, setShowCriticalAlert] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [userName, setUserName] = useState("Citizen User");
  const [userEmail, setUserEmail] = useState("citizen@govassist.in");

  const languages = [
    { code: "EN", label: "English", native: "English" },
    { code: "HI", label: "Hindi", native: "हिन्दी" },
    { code: "TA", label: "Tamil", native: "தமிழ்" },
    { code: "BN", label: "Bengali", native: "বাংলা" },
    { code: "TE", label: "Telugu", native: "తెలుగు" },
    { code: "MR", label: "Marathi", native: "मराठी" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return <AppLoader />;
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-900 font-sans overflow-hidden">
      {/* Sidebar - Fixed Position */}
      <aside className={`fixed inset-y-0 left-0 z-50 ${isSidebarCollapsed ? 'w-[72px]' : 'w-[280px]'} sidebar-glass text-slate-700 border-r border-pink-100/60 flex flex-col justify-between hidden md:flex transition-all duration-300 ease-in-out [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-y-auto overflow-x-visible`}>
        <div className="w-full">
          <div className="p-4 flex items-center justify-between h-20 border-b border-pink-100/40">
            {!isSidebarCollapsed && (
              <div className="animate-in fade-in duration-300 whitespace-nowrap flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-200 shadow-lg shadow-blue-200/40 shrink-0 bg-white p-0.5">
                  <img src="/api/logo" alt="GovAssist AI" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-lg font-extrabold text-slate-800 tracking-tight">GovAssist<span className="text-blue-600"> AI</span></h1>
                  <p className="text-[9px] text-pink-400 mt-0 uppercase tracking-[0.2em] font-bold">Emergency OS</p>
                </div>
              </div>
            )}
            <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="text-slate-400 hover:text-blue-600 transition cursor-pointer p-2 rounded-lg hover:bg-blue-50 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
          <nav className="px-3 space-y-0.5 mt-4 mb-6 w-full">
            {!isSidebarCollapsed && <div className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.15em] mb-2 px-3">Primary</div>}
            <NavItem icon={<LayoutGrid size={20} />} label="Welcome" active={activeTab === "Welcome"} onClick={() => setActiveTab("Welcome")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Home size={20} />} label="Dashboard" active={activeTab === "Home"} onClick={() => setActiveTab("Home")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Zap size={20} />} label="AI Navigator" active={activeTab === "AI Navigator"} onClick={() => setActiveTab("AI Navigator")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<AlertTriangle size={20} />} label="SOS Center" active={activeTab === "SOS Center"} onClick={() => setActiveTab("SOS Center")} isAlert badge="2" collapsed={isSidebarCollapsed} />
            <NavItem icon={<Map size={20} />} label="Live Map" active={activeTab === "Live Map"} onClick={() => setActiveTab("Live Map")} collapsed={isSidebarCollapsed} />
            
            {!isSidebarCollapsed ? (
              <div className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.15em] mt-5 mb-2 px-3">Resources</div>
            ) : <div className="mt-5 border-t border-pink-100 pt-2 mx-2"></div>}
            <NavItem icon={<BookOpen size={20} />} label="Emergency Plans" active={activeTab === "Emergency Plans"} onClick={() => setActiveTab("Emergency Plans")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<FileDigit size={20} />} label="Documents Vault" active={activeTab === "Documents Vault"} onClick={() => setActiveTab("Documents Vault")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Activity size={20} />} label="Official Alerts" active={activeTab === "Official Alerts"} onClick={() => setActiveTab("Official Alerts")} badge="5" collapsed={isSidebarCollapsed} />
            <NavItem icon={<Calendar size={20} />} label="Calendar" active={activeTab === "Calendar"} onClick={() => setActiveTab("Calendar")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Briefcase size={20} />} label="Agency Directory" active={activeTab === "Agency Directory"} onClick={() => setActiveTab("Agency Directory")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Scale size={20} />} label="Legal Aid" active={activeTab === "Legal Aid"} onClick={() => setActiveTab("Legal Aid")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Tent size={20} />} label="Disaster Relief" active={activeTab === "Disaster Relief"} onClick={() => setActiveTab("Disaster Relief")} collapsed={isSidebarCollapsed} />
            
            {!isSidebarCollapsed ? (
              <div className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.15em] mt-5 mb-2 px-3">Personal</div>
            ) : <div className="mt-5 border-t border-pink-100 pt-2 mx-2"></div>}
            <NavItem icon={<User size={20} />} label="My Profile" active={activeTab === "My Profile"} onClick={() => setActiveTab("My Profile")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Heart size={20} />} label="Medical Profile" active={activeTab === "Medical Profile"} onClick={() => setActiveTab("Medical Profile")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Users size={20} />} label="Emergency Contacts" active={activeTab === "Emergency Contacts"} onClick={() => setActiveTab("Emergency Contacts")} collapsed={isSidebarCollapsed} />
            
            {!isSidebarCollapsed ? (
              <div className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.15em] mt-5 mb-2 px-3">System</div>
            ) : <div className="mt-5 border-t border-pink-100 pt-2 mx-2"></div>}
            <NavItem icon={<SettingsIcon size={20} />} label="Settings" active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<UserCog size={20} />} label="Admin Dashboard" active={activeTab === "Admin Dashboard"} onClick={() => setActiveTab("Admin Dashboard")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Shield size={20} />} label="Volunteer Portal" active={activeTab === "Volunteer Portal"} onClick={() => setActiveTab("Volunteer Portal")} collapsed={isSidebarCollapsed} />
          </nav>
        </div>
        <div className="p-4 sticky bottom-0 z-10 border-t border-pink-100/60 bg-white/80 backdrop-blur-md">
          <button 
            onClick={() => setActiveTab("SOS Center")}
            className={`${isSidebarCollapsed ? 'w-12 h-12 rounded-full mx-auto p-0 justify-center' : 'w-full py-3 px-4 rounded-xl justify-center gap-2'} bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold flex items-center transition-all shadow-lg shadow-red-200 animate-pulse group relative`}
            title={isSidebarCollapsed ? "EMERGENCY 112" : undefined}
          >
            <PhoneCall size={isSidebarCollapsed ? 20 : 18} />
            {!isSidebarCollapsed && <span>EMERGENCY 112</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] md:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[70] w-[280px] sidebar-glass text-slate-700 border-r border-pink-100/60 flex flex-col justify-between md:hidden overflow-y-auto"
            >
              <div className="w-full">
                <div className="p-4 flex items-center justify-between h-20 border-b border-pink-100/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-200 shadow-lg shadow-blue-200/40 shrink-0 bg-white p-0.5">
                      <img src="/api/logo" alt="GovAssist AI" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h1 className="text-lg font-extrabold text-slate-800 tracking-tight">GovAssist<span className="text-blue-600"> AI</span></h1>
                      <p className="text-[9px] text-pink-400 mt-0 uppercase tracking-[0.2em] font-bold">Emergency OS</p>
                    </div>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-red-500 transition cursor-pointer p-2 rounded-lg hover:bg-pink-50">
                    <X size={24} />
                  </button>
                </div>
                
                <nav className="px-3 space-y-0.5 mt-4 mb-6 w-full">
                  <div className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.15em] mb-2 px-3">Primary</div>
                  <NavItem icon={<LayoutGrid size={20} />} label="Welcome" active={activeTab === "Welcome"} onClick={() => { setActiveTab("Welcome"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Home size={20} />} label="Dashboard" active={activeTab === "Home"} onClick={() => { setActiveTab("Home"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Zap size={20} />} label="AI Navigator" active={activeTab === "AI Navigator"} onClick={() => { setActiveTab("AI Navigator"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<AlertTriangle size={20} />} label="SOS Center" active={activeTab === "SOS Center"} onClick={() => { setActiveTab("SOS Center"); setIsMobileMenuOpen(false); }} isAlert badge="2" collapsed={false} />
                  <NavItem icon={<Map size={20} />} label="Live Map" active={activeTab === "Live Map"} onClick={() => { setActiveTab("Live Map"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  
                  <div className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.15em] mt-5 mb-2 px-3">Resources</div>
                  <NavItem icon={<BookOpen size={20} />} label="Emergency Plans" active={activeTab === "Emergency Plans"} onClick={() => { setActiveTab("Emergency Plans"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<FileDigit size={20} />} label="Documents Vault" active={activeTab === "Documents Vault"} onClick={() => { setActiveTab("Documents Vault"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Activity size={20} />} label="Official Alerts" active={activeTab === "Official Alerts"} onClick={() => { setActiveTab("Official Alerts"); setIsMobileMenuOpen(false); }} badge="5" collapsed={false} />
                  <NavItem icon={<Calendar size={20} />} label="Calendar" active={activeTab === "Calendar"} onClick={() => { setActiveTab("Calendar"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Briefcase size={20} />} label="Agency Directory" active={activeTab === "Agency Directory"} onClick={() => { setActiveTab("Agency Directory"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Scale size={20} />} label="Legal Aid" active={activeTab === "Legal Aid"} onClick={() => { setActiveTab("Legal Aid"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Tent size={20} />} label="Disaster Relief" active={activeTab === "Disaster Relief"} onClick={() => { setActiveTab("Disaster Relief"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  
                  <div className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.15em] mt-5 mb-2 px-3">Personal</div>
                  <NavItem icon={<User size={20} />} label="My Profile" active={activeTab === "My Profile"} onClick={() => { setActiveTab("My Profile"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Heart size={20} />} label="Medical Profile" active={activeTab === "Medical Profile"} onClick={() => { setActiveTab("Medical Profile"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Users size={20} />} label="Emergency Contacts" active={activeTab === "Emergency Contacts"} onClick={() => { setActiveTab("Emergency Contacts"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  
                  <div className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.15em] mt-5 mb-2 px-3">System</div>
                  <NavItem icon={<SettingsIcon size={20} />} label="Settings" active={activeTab === "Settings"} onClick={() => { setActiveTab("Settings"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<UserCog size={20} />} label="Admin Dashboard" active={activeTab === "Admin Dashboard"} onClick={() => { setActiveTab("Admin Dashboard"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Shield size={20} />} label="Volunteer Portal" active={activeTab === "Volunteer Portal"} onClick={() => { setActiveTab("Volunteer Portal"); setIsMobileMenuOpen(false); }} collapsed={false} />
                </nav>
              </div>
              
              <div className="p-4 sticky bottom-0 z-10 border-t border-pink-100/60 bg-white/80 backdrop-blur-md">
                <button 
                  onClick={() => { setActiveTab("SOS Center"); setIsMobileMenuOpen(false); }}
                  className="w-full py-3 px-4 rounded-xl justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 active:from-red-600 active:to-pink-600 text-white font-bold flex items-center transition-all shadow-lg shadow-red-200 animate-pulse"
                >
                  <PhoneCall size={18} />
                  <span>EMERGENCY 112</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content - Pushed by Sidebar */}
      <main className={`flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'md:ml-[72px]' : 'md:ml-[280px]'}`}>
        
        {/* Critical Alert Banner (Sticky Top) */}
        <AnimatePresence>
          {showCriticalAlert && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0, padding: 0 }}
              className="bg-red-600 text-white px-4 py-2.5 text-xs md:text-sm font-bold flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 z-40 relative shadow-md shrink-0 overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <span className="bg-white text-red-600 px-2 py-0.5 rounded uppercase tracking-wider text-[10px] animate-pulse">Critical</span>
                <span>Flash Flood Warning issued for coastal sectors.</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveTab("Live Map")} className="bg-red-800 hover:bg-red-900 px-3 py-1 rounded transition border border-red-500/50 cursor-pointer">View Details &rarr;</button>
              </div>
              <button onClick={() => setShowCriticalAlert(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1 cursor-pointer bg-red-700/50 rounded-full hover:bg-red-700 transition" title="Dismiss Alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 z-[45] shrink-0 shadow-sm relative">
          
          {/* Left: Mobile Menu + Branding */}
          <div className="flex items-center gap-2 md:gap-3 w-1/4">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
            >
              <Menu size={24} />
            </button>
            
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg overflow-hidden bg-white border border-blue-200 shadow-sm p-0.5 shrink-0">
                <img src="/api/logo" alt="" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-extrabold text-slate-800 leading-tight">GovAssist <span className="text-blue-600">AI</span></span>
                <span className="text-[8px] md:text-[9px] text-pink-400 font-bold uppercase tracking-wider leading-tight">Emergency OS</span>
              </div>
            </div>
          </div>
          
          {/* Center: Search */}
          <div className="flex-1 flex justify-center w-2/4 max-w-2xl mx-auto">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 md:pl-4">
                <Zap size={16} className="text-amber-500 md:w-[18px] md:h-[18px]" />
              </div>
              <input 
                type="text" 
                value={topSearchQuery}
                onChange={(e) => setTopSearchQuery(e.target.value)}
                onFocus={() => setIsTopSearchOpen(true)}
                placeholder="Ask AI..." 
                className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white border-2 border-transparent focus:border-blue-400 focus:ring-2 md:focus:ring-4 focus:ring-blue-100/50 text-slate-900 rounded-full py-2 md:py-2.5 pl-9 md:pl-12 pr-10 md:pr-12 outline-none transition-all text-xs md:text-sm font-medium shadow-inner"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:pr-3">
                <button onClick={() => setActiveTab("AI Navigator")} className="p-1 md:p-1.5 text-slate-400 hover:text-blue-600 transition cursor-pointer bg-white rounded-full shadow-sm border border-slate-100"><Mic size={12} className="md:w-[14px] md:h-[14px]"/></button>
              </div>

              {isTopSearchOpen && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left z-[100] animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2"><Zap size={14} className="text-blue-500"/> AI Intent Suggestions</span>
                    <button onClick={() => setIsTopSearchOpen(false)} className="text-slate-400 hover:text-slate-600">Close</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-3 space-y-1">
                    <button onClick={() => { setActiveTab("SOS Center"); setIsTopSearchOpen(false); }} className="w-full text-left p-3 hover:bg-slate-50 rounded-xl flex items-center gap-4 transition border border-transparent hover:border-slate-100 cursor-pointer">
                      <div className="bg-red-50 text-red-600 p-2.5 rounded-xl"><HeartPulse size={20} /></div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">Medical Emergency</div>
                        <div className="text-xs text-slate-500 mt-0.5">Dispatch ambulance & notify hospitals</div>
                      </div>
                    </button>
                    <button onClick={() => { setActiveTab("Legal Aid"); setIsTopSearchOpen(false); }} className="w-full text-left p-3 hover:bg-slate-50 rounded-xl flex items-center gap-4 transition border border-transparent hover:border-slate-100 cursor-pointer">
                      <div className="bg-slate-100 text-slate-700 p-2.5 rounded-xl"><ShieldAlert size={20} /></div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">Report Cyber Fraud</div>
                        <div className="text-xs text-slate-500 mt-0.5">File e-FIR & block bank transactions</div>
                      </div>
                    </button>
                    <button onClick={() => { setActiveTab("Live Map"); setIsTopSearchOpen(false); }} className="w-full text-left p-3 hover:bg-slate-50 rounded-xl flex items-center gap-4 transition border border-transparent hover:border-slate-100 cursor-pointer">
                      <div className="bg-amber-50 text-amber-600 p-2.5 rounded-xl"><Waves size={20} /></div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">Flood Evacuation</div>
                        <div className="text-xs text-slate-500 mt-0.5">Find nearest safe shelters & routes</div>
                      </div>
                    </button>
                    <button onClick={() => { setActiveTab("AI Navigator"); setIsTopSearchOpen(false); }} className="w-full text-left p-3 hover:bg-blue-50 rounded-xl flex items-center gap-4 transition border border-transparent hover:border-blue-100 cursor-pointer mt-2 bg-slate-50">
                      <div className="bg-blue-100 text-blue-600 p-2.5 rounded-xl"><Zap size={20} /></div>
                      <div className="font-bold text-sm text-blue-700">Open Full AI Assistant...</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right: Icons */}
          <div className="flex items-center justify-end gap-1.5 md:gap-2.5 w-1/4">
            <div className="relative hidden sm:block">
              <button onClick={() => setActiveTab("Live Map")} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer" title="Location Tracking"><MapPin size={18} className="md:w-5 md:h-5" /></button>
            </div>
            
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)} 
                className="flex items-center gap-1 px-2 py-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer text-xs font-bold border border-transparent hover:border-blue-100"
                title="Language"
              >
                <Globe size={16} className="md:w-[18px] md:h-[18px]" />
                <span className="hidden md:inline">{currentLang}</span>
              </button>
              {showLangMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)}></div>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-pink-100 overflow-hidden text-sm z-50 animate-in fade-in slide-in-from-top-2 p-1.5">
                    <div className="px-3 py-2 text-[10px] font-bold text-pink-400 uppercase tracking-wider">Select Language</div>
                    {languages.map((lang) => (
                      <button 
                        key={lang.code}
                        onClick={() => { setCurrentLang(lang.code); setShowLangMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition ${
                          currentLang === lang.code 
                            ? 'bg-gradient-to-r from-blue-50 to-pink-50 text-blue-600 font-bold' 
                            : 'text-slate-600 hover:bg-pink-50/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="font-semibold">{lang.native}</span>
                        </span>
                        {currentLang === lang.code && <CheckCircle2 size={14} className="text-blue-500" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button onClick={() => setActiveTab("Official Alerts")} className="p-1.5 md:p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer relative" title="Notifications">
                <Bell size={18} className="md:w-5 md:h-5" />
                <span className="absolute top-1 right-1 md:top-1.5 md:right-1.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
            </div>

            {/* User / Profile */}
            <div className="relative group">
              <button onClick={() => isSignedIn ? undefined : setShowSignInModal(true)} className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border-2 border-pink-200 hover:border-blue-400 transition cursor-pointer shadow-sm" title="My Profile">
                <img src="/api/avatar" alt="User" className="w-full h-full object-cover" />
              </button>
              {isSignedIn && (
                <div className="hidden group-hover:block absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-pink-100 overflow-hidden text-sm z-50 animate-in fade-in slide-in-from-top-2 p-2">
                  <div className="flex items-center gap-3 px-3 py-3 border-b border-pink-50 mb-1">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200 shadow-sm shrink-0">
                      <img src="/api/avatar" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{userName}</p>
                      <p className="text-[10px] text-slate-400 truncate">{userEmail}</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab("My Profile")} className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg text-slate-700 font-medium cursor-pointer text-xs flex items-center gap-2"><User size={14} /> My Profile</button>
                  <button onClick={() => setActiveTab("Medical Profile")} className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg text-slate-700 font-medium cursor-pointer text-xs flex items-center gap-2"><Heart size={14} /> Medical Profile</button>
                  <button onClick={() => setActiveTab("Settings")} className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg text-slate-700 font-medium cursor-pointer text-xs flex items-center gap-2"><SettingsIcon size={14} /> Preferences</button>
                  <button onClick={() => setShowUserAgreement(true)} className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg text-slate-700 font-medium flex items-center justify-between cursor-pointer text-xs">
                    <span className="flex items-center gap-2"><Info size={14} /> User Agreement</span>
                  </button>
                  <div className="h-px bg-pink-100 my-1"></div>
                  <button onClick={() => { setIsSignedIn(false); setActiveTab("Welcome"); }} className="w-full text-left px-3 py-2 hover:bg-red-50 rounded-lg text-red-500 font-bold cursor-pointer text-xs flex items-center gap-2"><X size={14} /> Sign Out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {isTopSearchOpen && <div className="fixed inset-0 z-[44] bg-slate-900/20 backdrop-blur-sm transition-all cursor-default" onClick={() => setIsTopSearchOpen(false)}></div>}

        {/* Emergency Banner */}
        <AnimatePresence>
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="bg-red-600 text-white text-sm font-bold py-2 px-8 flex items-center gap-2 justify-center shadow-md relative z-30"
          >
            <AlertTriangle size={16} className="animate-bounce" />
            CRITICAL ALERT: FLASH FLOOD WARNING FOR DOWNTOWN AREA. EVACUATION ROUTES ACTIVE.
            <button onClick={() => setActiveTab("Live Map")} className="ml-4 bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-xs transition cursor-pointer">View Map</button>
          </motion.div>
        </AnimatePresence>

        <div className={`flex-1 overflow-y-auto ${activeTab === "Welcome" ? "p-0" : "p-4 md:p-8"} space-y-8 pb-24 relative`} style={{ background: 'linear-gradient(180deg, #f0f4ff 0%, #f8fafc 100%)' }}>
          
          {activeTab === "Welcome" && <WelcomeTab setActiveTab={setActiveTab} />}
          {activeTab === "Home" && <HomeTab setActiveTab={setActiveTab} />}
          {activeTab === "AI Navigator" && <AINavigatorTab />}
          {activeTab === "SOS Center" && <SOSCenterTab />}
          {activeTab === "Live Map" && <LiveMapTab />}
          {activeTab === "Settings" && <SettingsTab />}
          {activeTab === "Emergency Plans" && <EmergencyPlansTab />}
          {activeTab === "Documents Vault" && <DocumentsVaultTab />}
          {activeTab === "Official Alerts" && <OfficialAlertsTab />}
          {activeTab === "Agency Directory" && <AgencyDirectoryTab />}
          {activeTab === "Legal Aid" && <LegalAidTab />}
          {activeTab === "Disaster Relief" && <DisasterReliefTab />}
          {activeTab === "Admin Dashboard" && <AdminDashboardTab />}
          {activeTab === "Volunteer Portal" && <VolunteerPortalTab />}
          {activeTab === "Medical Profile" && <MedicalProfileTab />}
          {activeTab === "My Profile" && <MyProfileTab />}
          {activeTab === "Emergency Contacts" && <EmergencyContactsTab />}
          {activeTab === "Calendar" && <CalendarTab />}

        </div>

        {/* Floating AI Button */}
        {activeTab !== "AI Navigator" && (
          <button 
            onClick={() => setActiveTab("AI Navigator")}
            className="fixed bottom-14 md:bottom-8 right-4 md:right-8 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-3.5 md:p-4 rounded-full shadow-xl shadow-blue-300/40 flex items-center justify-center transition-all hover:scale-110 group z-50 cursor-pointer border-2 border-white/50"
          >
            <Zap size={20} className="md:w-6 md:h-6" />
            <span className="absolute right-full mr-4 bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none hidden md:block">
              Talk to AI Assistant
            </span>
          </button>
        )}

        {/* Developer Credit - Separate bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 md:left-auto md:right-0 md:bottom-0 z-30 pointer-events-none" style={{ marginLeft: 'inherit' }}>
          <div className="pointer-events-auto bg-gradient-to-r from-white/95 via-pink-50/95 to-blue-50/95 backdrop-blur-xl px-4 py-2 md:py-2.5 flex items-center justify-center md:justify-end gap-2.5 border-t border-pink-200/40 shadow-[0_-2px_10px_rgba(219,39,119,0.06)]">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg overflow-hidden border border-pink-200 shadow-sm shrink-0 bg-white p-0.5">
              <img src="/api/team-logo" alt="Innovator Team" className="w-full h-full object-contain" />
            </div>
            <p className="text-[10px] md:text-xs text-slate-500 font-medium">Developed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-blue-600 font-extrabold">INNOVATOR TEAM</span></p>
          </div>
        </div>

        {/* User Agreement Modal */}
        <AnimatePresence>
          {showUserAgreement && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowUserAgreement(false)}
            >
              <motion.div 
                initial={{ y: 20, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="bg-slate-900 p-6 text-white text-center relative">
                  <Shield size={36} className="mx-auto mb-3 text-blue-400" />
                  <h2 className="text-xl font-extrabold tracking-tight">GovAssist AI User Agreement</h2>
                  <div className="text-xs text-blue-300 mt-1 uppercase tracking-widest">Citizen Privacy Policy</div>
                </div>
                <div className="p-6 h-72 overflow-y-auto text-sm text-slate-600 space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2"><PhoneCall size={16} className="text-red-500"/> 1. Emergency Response Protocol</h3>
                    <p className="leading-relaxed">GovAssist AI is a supplementary emergency platform. Always dial 112 as your primary action in life-threatening situations. Do not rely solely on AI assistance during active threats.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2"><Database size={16} className="text-blue-500"/> 2. Data Auto-Sharing</h3>
                    <p className="leading-relaxed">During an active SOS, your live location, medical profile (blood type, allergies), and device audio feed may be automatically shared with verified first responders to accelerate rescue.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2"><Bot size={16} className="text-amber-500"/> 3. AI Reliability Disclaimer</h3>
                    <p className="leading-relaxed">Our AI models strive for high accuracy using real-time government feeds, but users must verify critical information (like evacuation routes) through official broadcasts when possible.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2"><Scale size={16} className="text-slate-500"/> 4. Legal Compliance</h3>
                    <p className="leading-relaxed">Misuse of the SOS Center, filing false e-FIRs, or abusing emergency network bandwidth is a punishable offense under national cyber laws.</p>
                  </div>
                </div>
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-4 justify-end items-center">
                  <button onClick={() => setShowUserAgreement(false)} className="px-6 py-2.5 rounded-xl text-slate-500 font-bold hover:bg-slate-200 transition cursor-pointer">Decline</button>
                  <button onClick={() => setShowUserAgreement(false)} className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-md cursor-pointer flex items-center gap-2">
                    <CheckCircle size={18} /> I Agree
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sign In Modal */}
        <AnimatePresence>
          {showSignInModal && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowSignInModal(false)}
            >
              <motion.div 
                initial={{ y: 20, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-blue-600 to-pink-500 p-6 text-white text-center relative">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white mx-auto mb-3 p-1 shadow-lg">
                    <img src="/api/logo" alt="GovAssist AI" className="w-full h-full object-contain" />
                  </div>
                  <h2 className="text-xl font-extrabold tracking-tight">Welcome Back</h2>
                  <div className="text-xs text-white/80 mt-1">Sign in to GovAssist AI</div>
                </div>
                <form className="p-6 space-y-4" onSubmit={(e) => { 
                  e.preventDefault(); 
                  const form = e.target as HTMLFormElement;
                  const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || 'Citizen User';
                  const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || 'citizen@govassist.in';
                  setUserName(name);
                  setUserEmail(email);
                  setIsSignedIn(true); 
                  setShowSignInModal(false); 
                }}>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Full Name</label>
                    <input name="name" type="text" defaultValue="Citizen User" className="w-full mt-1 px-4 py-2.5 rounded-xl border border-pink-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Email / Aadhaar</label>
                    <input name="email" type="text" defaultValue="citizen@govassist.in" className="w-full mt-1 px-4 py-2.5 rounded-xl border border-pink-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition" placeholder="Email or Aadhaar number" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Password</label>
                    <input type="password" defaultValue="password" className="w-full mt-1 px-4 py-2.5 rounded-xl border border-pink-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition" placeholder="••••••••" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-pink-500 text-white font-bold hover:from-blue-700 hover:to-pink-600 transition shadow-lg shadow-blue-200 cursor-pointer flex items-center justify-center gap-2">
                    <Shield size={18} /> Sign In Securely
                  </button>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <div className="flex-1 h-px bg-slate-200"></div>
                    or
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </div>
                  <button type="button" onClick={() => { setIsSignedIn(true); setShowSignInModal(false); }} className="w-full py-2.5 rounded-xl border-2 border-pink-200 text-pink-600 font-bold hover:bg-pink-50 transition cursor-pointer text-sm">
                    Continue as Guest
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Not Signed In Banner */}
        {!isSignedIn && (
          <div className="fixed top-0 left-0 right-0 z-[90] bg-gradient-to-r from-pink-500 to-blue-600 text-white py-2 px-4 flex items-center justify-center gap-3 shadow-lg">
            <Lock size={14} />
            <span className="text-xs md:text-sm font-bold">You're not signed in. Some features may be limited.</span>
            <button onClick={() => setShowSignInModal(true)} className="px-3 py-1 bg-white text-pink-600 font-bold rounded-lg text-xs hover:bg-pink-50 transition cursor-pointer">Sign In</button>
          </div>
        )}
      </main>
    </div>
  );
}

// --- TAB COMPONENTS ---

function AppLoader() {
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = [
    "Connecting to Government Services...",
    "Loading Emergency Intelligence...",
    "Syncing Medical Profile...",
    "Mapping Nearby Responders...",
    "Verifying Secure Channels..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-pink-50 to-blue-50 text-slate-800 flex flex-col items-center justify-center z-[100] overflow-hidden">
      {/* Pulse rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[500px] h-[500px] border border-pink-200/40 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[ping_3s_linear_infinite]"></div>
        <div className="w-[300px] h-[300px] border border-blue-200/50 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[ping_2s_linear_infinite]"></div>
        <div className="w-[100px] h-[100px] border border-pink-300/60 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 rounded-2xl mb-6 shadow-xl shadow-blue-200/50 overflow-hidden border-2 border-pink-200 bg-white p-1">
          <img src="/api/logo" alt="GovAssist AI" className="w-full h-full object-contain animate-pulse" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">GovAssist<span className="text-blue-600"> AI</span></h1>
        <p className="text-lg font-medium text-slate-400 mb-12 text-center px-4">Initializing Emergency Response Network...</p>
        
        <div className="h-6 overflow-hidden mb-6 w-full flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={textIndex} 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: -20, opacity: 0 }} 
              transition={{ duration: 0.2 }}
              className="text-sm text-pink-500 font-mono tracking-wider uppercase text-center"
            >
              {loadingTexts[textIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-64 h-1.5 bg-pink-100 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: "0%" }} 
            animate={{ width: "100%" }} 
            transition={{ duration: 4.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-pink-500 via-red-400 to-blue-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]"
          ></motion.div>
        </div>
        <div className="mt-3 text-xs font-mono text-slate-400">SYS_BOOT_v1.0.4 // ENCRYPTED</div>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-3 w-full">
        <div className="text-slate-400 text-sm font-medium tracking-widest uppercase text-center">
          &ldquo;Smarter Government. Stronger Citizens.&rdquo;
        </div>
        <div className="flex items-center gap-2.5 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-pink-200/50 hover:border-blue-300 transition-colors shadow-sm">
          <div className="w-7 h-7 rounded-lg overflow-hidden border border-pink-200 shadow-sm bg-white shrink-0 p-0.5">
            <img src="/api/team-logo" alt="IT" className="w-full h-full object-contain" />
          </div>
          <span className="text-xs font-bold text-slate-500">Developed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-blue-600 font-extrabold">INNOVATOR TEAM</span></span>
        </div>
      </div>
    </div>
  )
}

function WelcomeTab({ setActiveTab }: any) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const slides = [
    { title: "National Emergency Response Mission", desc: "AI-powered citizen emergency assistance for faster response and seamless service delivery.", color: "from-blue-950 via-blue-900 to-indigo-900", action: "SOS Center", badge: "PM Initiative", pmImage: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Prime_Minister_of_India_Narendra_Modi.jpg" },
    { title: "National Flood Alert", desc: "Heavy rainfall expected in coastal regions. NDRF deployed across 12 districts.", color: "from-slate-900 via-blue-900 to-blue-800", action: "Live Map", badge: "Active Alert" },
    { title: "Cyber Fraud Awareness", desc: "Never share your OTP. Dial 1930 immediately if defrauded.", color: "from-slate-950 via-slate-900 to-slate-800", action: "Legal Aid", badge: "Security" },
    { title: "Women Safety Initiative", desc: "112 India app integrates direct tracking for immediate response.", color: "from-pink-950 via-pink-900 to-rose-800", action: "SOS Center", badge: "Safety" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Ambulances Active", value: "1,247", icon: <HeartPulse size={20}/>, color: "text-red-600" },
    { label: "Hospitals Online", value: "8,932", icon: <Building size={20}/>, color: "text-blue-600" },
    { label: "Relief Camps", value: "342", icon: <Tent size={20}/>, color: "text-emerald-600" },
    { label: "Emergency Calls Today", value: "54,821", icon: <PhoneCall size={20}/>, color: "text-amber-600" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      {/* GOI Header Strip */}
      <div className="bg-white border-b border-slate-200 px-6 md:px-12 py-3 flex flex-col md:flex-row justify-between items-center text-sm gap-3">
        <div className="flex items-center gap-3 font-bold text-slate-800">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" className="h-10" alt="Emblem"/>
          <div>
            <div className="leading-tight text-lg tracking-tight">GOVERNMENT OF INDIA</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">National Emergency Portal</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 text-slate-600 font-medium">
          <button className="hover:text-blue-600 flex items-center gap-1.5 transition cursor-pointer"><Eye size={16}/> Accessibility</button>
          <button className="hover:text-blue-600 flex items-center gap-1.5 transition cursor-pointer"><Globe size={16}/> English / हिन्दी</button>
          <button onClick={() => setActiveTab("My Profile")} className="hover:text-blue-600 flex items-center gap-1.5 transition cursor-pointer"><User size={16}/> Citizen Login</button>
          <button onClick={() => setActiveTab("Home")} className="bg-red-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-red-700 flex items-center gap-1.5 shadow-sm transition cursor-pointer"><Lock size={16}/> Guest Access</button>
        </div>
      </div>

      {/* Full-Width Hero */}
      <div className={`relative w-full min-h-[420px] md:h-[480px] bg-gradient-to-r ${slides[currentSlide].color} overflow-hidden flex flex-col md:flex-row transition-colors duration-700`}>
        {/* Floating Live Alert Badge */}
        <div className="absolute top-6 right-6 md:right-12 z-30 bg-red-600/90 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-pulse border border-red-400/50">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping absolute left-3"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-white ml-0"></span>
          <span className="text-xs font-black uppercase tracking-wider">LIVE &bull; NDRF ACTIVE</span>
        </div>

        {/* Left Content (50%) */}
        <div className="relative z-20 px-8 md:px-16 py-12 md:py-0 w-full md:w-1/2 flex flex-col justify-center text-white">
          <motion.div key={currentSlide} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <span className="bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black w-max mb-6 tracking-[0.2em] uppercase border border-white/20 inline-block">
              {slides[currentSlide].badge}
            </span>
            <h2 className="text-4xl md:text-[3.5rem] font-black mb-5 leading-[1.1] drop-shadow-lg">{slides[currentSlide].title}</h2>
            <p className="text-base md:text-lg text-white/85 mb-10 font-light max-w-lg leading-relaxed">{slides[currentSlide].desc}</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setActiveTab(slides[currentSlide].action)} className="bg-red-600 text-white font-bold px-10 py-4 rounded-2xl hover:bg-red-500 transition shadow-[0_0_30px_rgba(220,38,38,0.4)] cursor-pointer text-base">Need Help Now</button>
              <button onClick={() => setActiveTab("Home")} className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white font-bold px-10 py-4 rounded-2xl hover:bg-white/20 transition cursor-pointer text-base">Explore Services</button>
            </div>
          </motion.div>
        </div>

        {/* Right Image (50%) */}
        <div className="relative z-10 w-full md:w-1/2 h-48 md:h-full flex items-end justify-center md:justify-end overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent z-20 md:bg-gradient-to-r md:from-blue-950/60 md:via-transparent md:to-transparent"></div>
          {slides[currentSlide].pmImage ? (
            <img src={slides[currentSlide].pmImage} className="relative z-10 h-full max-h-[450px] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" alt="Portrait" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-10"><Shield size={200} className="text-white"/></div>
          )}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-8 md:left-16 flex gap-3 z-30">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`h-3 rounded-full transition-all cursor-pointer ${i === currentSlide ? 'bg-white w-10 shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'bg-white/30 hover:bg-white/50 w-3'}`}></button>
          ))}
        </div>
      </div>

      {/* Live Stats Strip */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="px-6 md:px-12 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className={`p-3 rounded-xl bg-slate-50 ${s.color} group-hover:scale-110 transition-transform`}>{s.icon}</div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">{s.value}</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Search Section */}
      <div className="px-6 md:px-12 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-black text-slate-900 mb-2">How can GovAssist help you today?</h3>
          <p className="text-slate-500 mb-8 text-base">Describe what you need. Our AI will instantly route you to the correct government service.</p>
          <div className="relative flex items-center bg-white border-2 border-slate-200 rounded-2xl p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
            <div className="pl-4 pr-2 text-blue-500"><Search size={26} /></div>
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" className="flex-1 bg-transparent py-5 px-3 text-lg outline-none text-slate-800 placeholder-slate-400" placeholder="Describe your emergency or government need..." />
            <div className="flex items-center gap-1 pr-4 border-r border-slate-200 mr-4">
              <button className="p-2.5 text-slate-400 hover:text-blue-500 transition rounded-full hover:bg-slate-100 cursor-pointer"><Mic size={22}/></button>
              <button className="p-2.5 text-slate-400 hover:text-blue-500 transition rounded-full hover:bg-slate-100 cursor-pointer hidden sm:block"><Camera size={22}/></button>
              <button className="p-2.5 text-slate-400 hover:text-blue-500 transition rounded-full hover:bg-slate-100 cursor-pointer hidden sm:block"><MapPin size={22}/></button>
            </div>
            <button onClick={() => setActiveTab("AI Navigator")} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-10 py-5 rounded-xl transition flex items-center gap-2 shadow-lg text-lg cursor-pointer">Analyze <Zap size={20} className="text-blue-200"/></button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 mt-6">
            <span className="text-sm text-slate-500 font-bold uppercase tracking-wider mr-2">Quick Actions:</span>
            <span onClick={() => setActiveTab("SOS Center")} className="text-sm bg-red-50 text-red-700 font-semibold px-4 py-2 rounded-full border border-red-100 cursor-pointer hover:bg-red-100 hover:scale-105 transition flex items-center gap-1.5 shadow-sm"><HeartPulse size={14}/> Need Ambulance</span>
            <span onClick={() => setActiveTab("Legal Aid")} className="text-sm bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-full border border-slate-200 cursor-pointer hover:bg-slate-200 hover:scale-105 transition flex items-center gap-1.5 shadow-sm"><ShieldAlert size={14}/> Report Cyber Fraud</span>
            <span onClick={() => setActiveTab("Disaster Relief")} className="text-sm bg-blue-50 text-blue-700 font-semibold px-4 py-2 rounded-full border border-blue-100 cursor-pointer hover:bg-blue-100 hover:scale-105 transition flex items-center gap-1.5 shadow-sm"><Waves size={14}/> Find Flood Shelter</span>
          </div>
        </div>
      </div>

      {/* Service Grid */}
      <div className="px-6 md:px-12 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <ServiceTile icon={<HeartPulse size={28}/>} title="Emergency Help" desc="Ambulance & SOS" color="red" onClick={() => setActiveTab("SOS Center")} />
          <ServiceTile icon={<Scale size={28}/>} title="Legal Aid" desc="e-FIR & Rights" color="slate" onClick={() => setActiveTab("Legal Aid")} />
          <ServiceTile icon={<FileDigit size={28}/>} title="Document Recovery" desc="Aadhaar & PAN" color="blue" onClick={() => setActiveTab("Documents Vault")} />
          <ServiceTile icon={<Tent size={28}/>} title="Disaster Relief" desc="Camps & Funds" color="amber" onClick={() => setActiveTab("Disaster Relief")} />
          <ServiceTile icon={<Stethoscope size={28}/>} title="Health & Medical" desc="Hospitals & Camps" color="emerald" onClick={() => setActiveTab("Medical Profile")} />
          <ServiceTile icon={<Briefcase size={28}/>} title="Employment" desc="Job Portal" color="purple" onClick={() => setActiveTab("Agency Directory")} />
          <ServiceTile icon={<CreditCard size={28}/>} title="Financial Support" desc="Loans & Claims" color="indigo" onClick={() => setActiveTab("Disaster Relief")} />
          <ServiceTile icon={<Building size={28}/>} title="Govt Schemes" desc="Subsidies" color="teal" onClick={() => setActiveTab("Agency Directory")} />
        </div>
      </div>
    </motion.div>
  )
}

function ServiceTile({icon, title, desc, color, onClick}: any) {
  const colorClasses: Record<string, string> = {
    red: "text-red-600 bg-gradient-to-br from-red-50 to-red-100 group-hover:from-red-600 group-hover:to-red-700 group-hover:text-white border-red-200 group-active:from-red-700 group-active:to-red-800",
    slate: "text-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-slate-700 group-hover:to-slate-800 group-hover:text-white border-slate-200 group-active:from-slate-800 group-active:to-slate-900",
    blue: "text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white border-blue-200 group-active:from-blue-700 group-active:to-blue-800",
    amber: "text-amber-600 bg-gradient-to-br from-amber-50 to-amber-100 group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-white border-amber-200 group-active:from-amber-600 group-active:to-amber-700",
    emerald: "text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 group-hover:from-emerald-600 group-hover:to-emerald-700 group-hover:text-white border-emerald-200 group-active:from-emerald-700 group-active:to-emerald-800",
    purple: "text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 group-hover:from-purple-600 group-hover:to-purple-700 group-hover:text-white border-purple-200 group-active:from-purple-700 group-active:to-purple-800",
    indigo: "text-indigo-600 bg-gradient-to-br from-indigo-50 to-indigo-100 group-hover:from-indigo-600 group-hover:to-indigo-700 group-hover:text-white border-indigo-200 group-active:from-indigo-700 group-active:to-indigo-800",
    teal: "text-teal-600 bg-gradient-to-br from-teal-50 to-teal-100 group-hover:from-teal-600 group-hover:to-teal-700 group-hover:text-white border-teal-200 group-active:from-teal-700 group-active:to-teal-800",
  };

  return (
    <button onClick={onClick} className="glass-card border-2 border-white/40 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3 shadow-lg hover:shadow-2xl md:hover:-translate-y-2 active:scale-95 transition-all duration-300 group cursor-pointer md:card-3d min-h-[140px] md:min-h-[160px]">
      <div className={`p-3 md:p-4 rounded-2xl transition-all duration-300 shadow-md ${colorClasses[color]}`}>{icon}</div>
      <div className="text-center">
        <div className="font-extrabold text-slate-800 text-sm md:text-base mb-1 group-hover:text-slate-900">{title}</div>
        <div className="text-xs font-semibold text-slate-500 group-hover:text-slate-600 transition-colors">{desc}</div>
      </div>
    </button>
  )
}

function HomeTab({ setActiveTab }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Enhanced Hero Section with PM Modi Image */}
      <section className="bg-gradient-to-r from-blue-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-xl text-white border border-slate-700">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        
        <div className="max-w-2xl z-10 relative">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-blue-300 uppercase mb-4 bg-blue-900/50 w-max px-3 py-1.5 rounded-full border border-blue-500/30">
            <Shield size={14} className="text-blue-400" /> Secure Government Gateway
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
            Right government help, <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">right now.</span>
          </h2>
          <p className="text-slate-300 mb-8 text-lg font-light max-w-xl">
            Immediate AI-guided assistance for emergencies, legal aid, and disaster recovery. Powered by verified official data.
          </p>
          
          {/* AI Input Bar */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
            <div className="flex items-center px-4 py-2 bg-black/20 rounded-xl mb-2">
              <span className="text-xs font-semibold text-slate-300 mr-2 uppercase tracking-wide">Examples:</span>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                <span className="text-xs bg-white/10 px-2 py-1 rounded text-white whitespace-nowrap">"My father is unconscious"</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded text-white whitespace-nowrap">"Phone stolen"</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded text-white whitespace-nowrap">"Flood in my area"</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 relative">
              <div className="flex gap-1 absolute left-2">
                <button className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition" title="Voice Input"><Mic size={20} /></button>
                <button className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition" title="Upload Image"><Camera size={20} /></button>
                <button className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition" title="Auto Detect Location"><MapPin size={20} /></button>
              </div>
              <input 
                type="text" 
                placeholder="Describe your emergency..." 
                className="flex-1 outline-none text-white bg-white/5 border border-white/10 rounded-xl py-4 pl-36 pr-4 focus:bg-white/10 transition placeholder-slate-400 text-lg"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition shadow-lg absolute right-1">
                Analyze <Zap size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* PM Modi Image Area */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 md:w-1/2 lg:w-5/12 hidden md:block z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Official_Photograph_of_Prime_Minister_Narendra_Modi_Portrait.png" 
            alt="PM Modi" 
            className="object-cover object-top w-full h-full opacity-70 sepia-[.2] hue-rotate-[-10deg]"
          />
          <div className="absolute bottom-6 right-6 z-20 bg-slate-900/60 backdrop-blur-md text-white text-xs font-medium px-4 py-3 rounded-xl border border-white/10 italic shadow-2xl max-w-xs leading-relaxed">
            "Connecting citizens to services with integrity and speed. A digital twin for emergency response."
          </div>
        </div>
      </section>

      {/* Dynamic AI Quick Actions Grid (Live Dashboard) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Severity Indicator */}
        <div className="glass-card border border-white/30 rounded-2xl p-4 md:p-6 shadow-xl md:card-3d">
          <h3 className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
            <Activity size={16} className="text-blue-500" /> Area Risk Scoring
          </h3>
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-yellow-400 flex items-center justify-center text-lg md:text-xl font-extrabold text-slate-800 shadow-lg bg-white">
              68
            </div>
            <div>
              <div className="text-base md:text-lg font-bold text-slate-800">Elevated Risk</div>
              <div className="text-xs md:text-sm text-slate-600">Heavy rainfall detected in Sector 4</div>
            </div>
          </div>
          <div className="space-y-2 md:space-y-3">
            <div className="flex justify-between text-xs font-bold"><span className="text-slate-600">Flood Risk</span><span className="text-yellow-600">Medium</span></div>
            <div className="w-full bg-slate-200/50 rounded-full h-2 overflow-hidden backdrop-blur-sm"><div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full shadow-sm" style={{width: '68%'}}></div></div>
            
            <div className="flex justify-between text-xs font-bold mt-2 md:mt-3"><span className="text-slate-600">Medical Overload</span><span className="text-emerald-600">Low</span></div>
            <div className="w-full bg-slate-200/50 rounded-full h-2 overflow-hidden backdrop-blur-sm"><div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2 rounded-full shadow-sm" style={{width: '30%'}}></div></div>
          </div>
        </div>

        {/* Dynamic Actions Map */}
        <div className="md:col-span-2 glass-card border border-white/30 rounded-2xl p-4 md:p-6 shadow-xl flex flex-col justify-between md:card-3d">
          <div className="flex justify-between items-start mb-3 md:mb-4">
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-800">Live AI Emergency Radar</h3>
              <p className="text-xs md:text-sm text-slate-600">Real-time resource allocation map</p>
            </div>
            <button onClick={() => setActiveTab("Live Map")} className="text-blue-600 text-xs md:text-sm font-bold flex items-center gap-1 bg-blue-50 px-3 md:px-4 py-1.5 md:py-2 rounded-xl hover:bg-blue-100 active:scale-95 transition cursor-pointer shadow-sm hover:shadow-md">
              <Map size={14} className="md:w-4 md:h-4" /> <span className="hidden sm:inline">Full</span> Map
            </button>
          </div>
          
          <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-slate-200 relative overflow-hidden min-h-[140px] md:min-h-[160px] flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] cursor-pointer hover:border-blue-300 active:scale-98 transition-all" onClick={() => setActiveTab("Live Map")}>
            {/* Mock Map Elements */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 md:w-4 md:h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg z-10 flex items-center justify-center">
              <span className="absolute -bottom-5 md:-bottom-6 text-[9px] md:text-[10px] font-bold bg-white px-1.5 md:px-2 py-0.5 rounded shadow whitespace-nowrap">You</span>
            </div>
            <div className="absolute top-1/3 right-1/3 bg-white p-1.5 md:p-2 rounded-lg shadow-md border border-emerald-200 flex items-center gap-1.5 md:gap-2">
              <div className="bg-emerald-100 p-1 md:p-1.5 rounded text-emerald-600"><Tent size={12} className="md:w-3.5 md:h-3.5" /></div>
              <div className="text-[10px] md:text-xs font-bold whitespace-nowrap">Relief Camp A (2km)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Actions based on AI context */}
      <section>
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Zap className="text-amber-500" /> AI Suggested Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionCard icon={<Stethoscope />} title="Find Nearest Trauma Center" desc="Based on medical risk" color="red" onClick={() => setActiveTab("Live Map")} />
          <ActionCard icon={<FileText />} title="Draft e-FIR for Lost Phone" desc="Automated legal drafting" color="blue" onClick={() => setActiveTab("Legal Aid")} />
          <ActionCard icon={<Waves />} title="Flood Evacuation Route" desc="Avoid blocked roads" color="amber" onClick={() => setActiveTab("Emergency Plans")} />
          <ActionCard icon={<ShieldAlert />} title="Cyber Scam Report" desc="1930 Helpline integration" color="slate" onClick={() => setActiveTab("Agency Directory")} />
        </div>
      </section>
    </motion.div>
  );
}

function ActionCard({icon, title, desc, color, onClick}: any) {
  const colorMap: Record<string, string> = {
    red: "bg-gradient-to-br from-red-50 to-red-100 border-red-200 text-red-600 hover:border-red-400 hover:shadow-lg hover:shadow-red-100 active:scale-95",
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-600 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 active:scale-95",
    amber: "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 text-amber-600 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-100 active:scale-95",
    slate: "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 text-slate-700 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-100 active:scale-95",
  };
  
  return (
    <button onClick={onClick} className={`glass-card p-4 md:p-6 rounded-2xl border-2 transition-all text-left flex flex-col justify-between h-36 md:h-40 cursor-pointer transform md:hover:scale-105 md:hover:-translate-y-1 ${colorMap[color]}`}>
      <div className="bg-white/80 backdrop-blur-sm p-2 md:p-3 rounded-xl w-max shadow-md">{icon}</div>
      <div>
        <h4 className="font-bold text-slate-900 text-sm md:text-base leading-tight mb-1 md:mb-1.5">{title}</h4>
        <p className="text-xs opacity-80 font-medium line-clamp-2">{desc}</p>
      </div>
    </button>
  )
}

function AINavigatorTab() {
  type Message = {
    id: number;
    text: string;
    sender: "ai" | "user";
    type: "intro" | "text" | "action" | "context_card";
    actions?: { icon: any, label: string }[];
    cardData?: any;
    severity?: "HIGH" | "MEDIUM" | "LOW";
  };

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "GovAssist AI initialized. I have access to real-time government feeds, legal databases, and emergency routing. How can I assist you today?", 
      sender: "ai", 
      type: "intro" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeMode, setActiveMode] = useState("Emergency");
  const [showEscalation, setShowEscalation] = useState(false);

  const handleSend = (textOverride?: string) => {
    const textToSend = textOverride || input;
    if(!textToSend.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: textToSend, sender: "user", type: "text" }]);
    setInput("");
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const query = textToSend.toLowerCase();
      
      if(query.includes("ambulance") || query.includes("medical")) {
        setShowEscalation(true);
        setMessages(prev => [
          ...prev, 
          { 
            id: Date.now()+1, 
            text: "Medical emergency detected. I have prioritized your request.", 
            sender: "ai", 
            type: "context_card",
            severity: "HIGH",
            cardData: {
              type: "medical",
              title: "City General Hospital",
              distance: "3 mins away (Ambulance ETA)",
              capacity: "Trauma Center Active",
              status: "Dispatch Ready"
            },
            actions: [
              { icon: <PhoneCall size={16}/>, label: "Call 108 Now" },
              { icon: <MapPin size={16}/>, label: "Share Live Location" },
              { icon: <HeartPulse size={16}/>, label: "CPR Guide" },
              { icon: <Users size={16}/>, label: "Notify Contacts" }
            ]
          }
        ]);
      } 
      else if(query.includes("theft") || query.includes("stolen")) {
        setMessages(prev => [
          ...prev, 
          { 
            id: Date.now()+1, 
            text: "I understand you've experienced a theft. Here is the immediate legal protocol.", 
            sender: "ai", 
            type: "action",
            severity: "MEDIUM",
            actions: [
              { icon: <FileText size={16}/>, label: "Generate FIR Draft" },
              { icon: <Shield size={16}/>, label: "Block IMEI Number" },
              { icon: <MapPin size={16}/>, label: "Locate Police Station" }
            ]
          }
        ]);
      }
      else if(query.includes("flood") || query.includes("shelter")) {
        setMessages(prev => [
          ...prev, 
          { 
            id: Date.now()+1, 
            text: "I have located the nearest active flood shelter based on your GPS coordinates. NDRF teams are currently stationed here.", 
            sender: "ai", 
            type: "context_card",
            severity: "HIGH",
            cardData: {
              type: "disaster",
              title: "Sector 5 Community Shelter",
              distance: "1.2 km away",
              capacity: "450/500 capacity",
              status: "Accepting Citizens"
            },
            actions: [
              { icon: <MapPin size={16}/>, label: "Navigate Safe Route" },
              { icon: <PhoneCall size={16}/>, label: "Request Rescue" }
            ]
          }
        ]);
      }
      else if(query.includes("cyber") || query.includes("fraud") || query.includes("frozen")) {
        setMessages(prev => [
          ...prev, 
          { 
            id: Date.now()+1, 
            text: "Financial cyber fraud detected. Immediate action is required to secure your assets.", 
            sender: "ai", 
            type: "action",
            severity: "HIGH",
            actions: [
              { icon: <Lock size={16}/>, label: "Freeze Accounts" },
              { icon: <PhoneCall size={16}/>, label: "Report to 1930" },
              { icon: <FileWarning size={16}/>, label: "Cybercrime Portal" }
            ]
          }
        ]);
      }
      else {
        setMessages(prev => [
          ...prev, 
          { 
            id: Date.now()+1, 
            text: "I am analyzing your context and cross-referencing with local authorities. How would you like to proceed?", 
            sender: "ai", 
            type: "action",
            actions: [
              { icon: <FileText size={16}/>, label: "File General Report" },
              { icon: <MapPin size={16}/>, label: "Find Govt Office" }
            ]
          }
        ]);
      }
    }, 1200);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-8rem)] flex flex-col bg-slate-50 relative overflow-hidden rounded-2xl shadow-sm border border-slate-200">
      
      {/* Auto Escalation Popup */}
      <AnimatePresence>
        {showEscalation && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 w-full max-w-md border border-red-500"
          >
            <div className="bg-white/20 p-3 rounded-full animate-pulse"><HeartPulse size={24} /></div>
            <div className="flex-1">
              <h4 className="font-black text-lg">EMERGENCY DETECTED</h4>
              <p className="text-sm text-red-100 font-medium">Do you need to call 108 immediately?</p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-white text-red-700 font-bold px-4 py-1.5 rounded-lg text-sm hover:bg-slate-100 transition shadow-sm cursor-pointer">Call Now</button>
              <button onClick={() => setShowEscalation(false)} className="bg-red-800 text-white font-bold px-4 py-1.5 rounded-lg text-sm hover:bg-red-900 transition cursor-pointer">Dismiss</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Header */}
      <div className="bg-white border-b border-slate-200 p-4 flex flex-col md:flex-row items-center justify-between gap-4 z-40 shrink-0 shadow-sm relative">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-md"><Zap size={20} className="text-white" /></div>
          <div>
            <h2 className="font-extrabold text-slate-900 leading-tight">AI Command Center</h2>
            <div className="flex items-center gap-3 mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <span className="flex items-center gap-1 text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Gov Feeds</span>
              <span className="flex items-center gap-1 text-blue-600"><MapPin size={10}/> GPS Active</span>
              <span className="flex items-center gap-1"><Lock size={10}/> Encrypted</span>
            </div>
          </div>
        </div>
        
        {/* Segmented Mode Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto w-full md:w-auto no-scrollbar">
          {["Emergency", "Legal", "Cyber", "Medical", "Disaster"].map(mode => (
            <button 
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${activeMode === mode ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area with Background Grid */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 relative [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        {/* Subtle Emergency Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-[1100px] mx-auto space-y-6 pb-40 relative z-10 flex flex-col">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-4 w-full md:max-w-[55%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                
                {/* Avatar */}
                {msg.sender === "ai" && (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md border border-blue-400/30">
                    <Shield size={18} />
                  </div>
                )}
                
                <div className={`flex flex-col gap-3 w-full ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  {/* Bubble */}
                  <div className={`p-5 shadow-sm text-[15px] leading-relaxed relative ${
                    msg.sender === "user" 
                      ? "bg-slate-900 text-white rounded-[24px] rounded-tr-sm text-right" 
                      : "bg-white border border-slate-200 text-slate-800 rounded-[24px] rounded-tl-sm w-full"
                  }`}>
                    {msg.sender === "ai" && msg.severity && (
                      <span className={`absolute -top-3 left-4 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm border ${
                        msg.severity === "HIGH" ? "bg-red-100 text-red-700 border-red-200" : "bg-amber-100 text-amber-700 border-amber-200"
                      }`}>
                        {msg.severity} PRIORITY
                      </span>
                    )}
                    <p className={msg.sender === "ai" && msg.severity ? "mt-1" : ""}>{msg.text}</p>
                  </div>

                  {/* Context Card Rendering */}
                  {msg.type === "context_card" && msg.cardData && (
                    <div className={`bg-white border rounded-2xl p-5 shadow-sm relative overflow-hidden w-full ${msg.cardData.type === 'medical' ? 'border-red-200' : 'border-emerald-200'}`}>
                      <div className="absolute top-0 right-0 p-4 opacity-5">{msg.cardData.type === 'medical' ? <HeartPulse size={100}/> : <Tent size={100}/>}</div>
                      <div className="flex items-center justify-between mb-3 relative z-10">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${msg.cardData.type === 'medical' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>Verified Active</span>
                        <span className="text-slate-500 text-xs font-bold">{msg.cardData.distance}</span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-lg mb-1 relative z-10">{msg.cardData.title}</h4>
                      <div className="text-sm text-slate-600 font-medium mb-4 relative z-10">{msg.cardData.capacity} &bull; {msg.cardData.status}</div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {msg.actions && (
                    <div className="flex flex-wrap gap-2 w-full">
                      {msg.actions.map((act, i) => (
                        <button key={i} onClick={() => handleSend(act.label)} className="bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer group">
                          <span className="text-blue-500 group-hover:scale-110 transition-transform">{act.icon}</span> {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex w-full justify-start">
              <div className="flex gap-4 w-full md:max-w-[55%]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md border border-blue-400/30">
                  <Shield size={18} />
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-[24px] rounded-tl-sm shadow-sm flex items-center gap-2 text-slate-500 text-sm font-medium w-max">
                  GovAssist AI is analyzing <span className="flex gap-1 ml-1"><span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span><span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span><span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Composer */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-12 pb-6 px-4 md:px-8 z-30 pointer-events-none">
        <div className="max-w-[1000px] mx-auto pointer-events-auto">
          {/* Quick Actions (Horizontal Scroll) */}
          <div className="flex overflow-x-auto gap-2 mb-3 no-scrollbar pb-2">
            <button onClick={() => handleSend("Need ambulance immediately")} className="shrink-0 bg-white/90 backdrop-blur-md border border-red-200 hover:bg-red-50 text-slate-700 hover:text-red-700 px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"><HeartPulse size={14} className="text-red-500"/> Need Ambulance</button>
            <button onClick={() => handleSend("Report stolen phone")} className="shrink-0 bg-white/90 backdrop-blur-md border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"><ShieldAlert size={14} className="text-blue-500"/> Report Theft</button>
            <button onClick={() => handleSend("Where is the nearest flood shelter?")} className="shrink-0 bg-white/90 backdrop-blur-md border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"><Waves size={14} className="text-cyan-500"/> Find Shelter</button>
            <button onClick={() => handleSend("Bank account frozen")} className="shrink-0 bg-white/90 backdrop-blur-md border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-700 hover:text-slate-900 px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"><Lock size={14} className="text-amber-500"/> Cyber Fraud</button>
          </div>

          {/* Premium Input Bar */}
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-2 rounded-[32px] flex items-center gap-2 transition-all focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-400">
            <div className="flex items-center gap-1 pl-2">
              <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition cursor-pointer"><Mic size={22}/></button>
              <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition cursor-pointer hidden sm:block"><Camera size={22}/></button>
              <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition cursor-pointer hidden sm:block"><FileText size={22}/></button>
              <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition cursor-pointer hidden sm:block"><MapPin size={22}/></button>
            </div>
            
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe your emergency..."
              className="flex-1 bg-transparent border-none outline-none text-slate-800 text-[15px] px-2 h-full py-3"
            />
            
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:from-slate-400 disabled:to-slate-500 text-white p-3.5 rounded-full transition cursor-pointer flex items-center justify-center shadow-lg mr-1 border border-blue-500/50"
            >
              <Send size={20} className={input.trim() ? "translate-x-0.5 translate-y-[-1px]" : ""} />
            </button>
          </div>
        </div>
      </div>

    </motion.div>
  )
}

function SOSCenterTab() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900">Critical SOS Center</h2>
        <p className="text-slate-500 mt-2">Tap any button to instantly dispatch services to your live location.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="bg-red-600 hover:bg-red-700 text-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_10px_40px_rgba(220,38,38,0.5)] transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center gap-4 group">
          <div className="bg-white/20 p-6 rounded-full group-hover:scale-110 transition-transform">
            <HeartPulse size={64} />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black tracking-tight mb-1">Ambulance</h3>
            <p className="font-medium text-red-200">Medical emergencies only</p>
          </div>
        </button>

        <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(29,78,216,0.3)] hover:shadow-[0_10px_40px_rgba(29,78,216,0.5)] transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center gap-4 group">
          <div className="bg-white/20 p-6 rounded-full group-hover:scale-110 transition-transform">
            <ShieldAlert size={64} />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black tracking-tight mb-1">Police</h3>
            <p className="font-medium text-blue-200">Crime in progress / Threat</p>
          </div>
        </button>

        <button className="bg-orange-600 hover:bg-orange-700 text-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(234,88,12,0.3)] hover:shadow-[0_10px_40px_rgba(234,88,12,0.5)] transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center gap-4 group">
          <div className="bg-white/20 p-6 rounded-full group-hover:scale-110 transition-transform">
            <AlertTriangle size={64} />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black tracking-tight mb-1">Fire / Rescue</h3>
            <p className="font-medium text-orange-200">Fire, accidents, trapped</p>
          </div>
        </button>

        <button className="bg-slate-900 hover:bg-black text-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(15,23,42,0.3)] hover:shadow-[0_10px_40px_rgba(15,23,42,0.5)] transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center gap-4 group">
          <div className="bg-white/10 p-6 rounded-full group-hover:scale-110 transition-transform">
            <Volume2 size={64} />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black tracking-tight mb-1">Silent Panic</h3>
            <p className="font-medium text-slate-400">Sends location secretly to contacts</p>
          </div>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-8 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <MapPin size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Live Location Tracking Active</h4>
            <p className="text-sm text-slate-500">Latitude: 22.5726 • Longitude: 88.3639 (Accuracy: High)</p>
          </div>
        </div>
        <button className="font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-6 py-2.5 rounded-lg transition">
          Share Location
        </button>
      </div>
    </motion.div>
  )
}

function SettingsTab() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [activeStyle, setActiveStyle] = useState('Simple');
  const [toggles, setToggles] = useState({autoCall: true, shareLoc: true, bgAudio: false, autoCam: true});
  
  const handleAction = (action: string) => {
    setActiveAction(action);
    setTimeout(() => setActiveAction(null), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-8 pb-12">
      {activeAction && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed top-4 right-4 z-[80] bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle size={18} /> {activeAction}
        </motion.div>
      )}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900">Platform Settings</h2>
        <p className="text-slate-500">Manage your emergency profile, preferences, and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm h-max sticky top-0">
          <div className="space-y-1">
            <SettingsNav label="Account & ID" icon={<User size={18} />} active />
            <SettingsNav label="Emergency Contacts" icon={<Users size={18} />} />
            <SettingsNav label="Medical Profile" icon={<Heart size={18} />} />
            <SettingsNav label="Location & Privacy" icon={<MapPin size={18} />} />
            <SettingsNav label="Language & Access" icon={<Globe size={18} />} />
            <SettingsNav label="SOS Preferences" icon={<AlertTriangle size={18} />} />
            <SettingsNav label="Security Vault" icon={<Lock size={18} />} />
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-2 space-y-6">
          
          <SettingSection title="Account Information" desc="Government verified identity details">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputGroup label="Full Name" value="Rahul Sharma" />
              <InputGroup label="Phone Number" value="+91 98765 43210" />
              <InputGroup label="Email Address" value="rahul.s@example.com" />
              <InputGroup label="Blood Group" value="O Positive" />
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="text-emerald-600" size={24} />
                <div>
                  <div className="font-bold text-emerald-900">Aadhaar Verified KYC</div>
                  <div className="text-xs text-emerald-700">Identity linked successfully for fast-track processing</div>
                </div>
              </div>
              <button onClick={() => handleAction('KYC verification updated successfully!')} className="text-sm font-bold text-emerald-700 bg-white px-4 py-1.5 rounded-lg border border-emerald-200 cursor-pointer hover:bg-emerald-50 transition">Update</button>
            </div>
          </SettingSection>

          <SettingSection title="SOS Preferences" desc="How the system reacts when you trigger panic mode">
            <div className="space-y-4">
              <ToggleRow label="Auto-Call 112 on Panic" desc="Automatically dial emergency services when SOS is triggered" enabled={toggles.autoCall} onToggle={() => { setToggles(p => ({...p, autoCall: !p.autoCall})); handleAction(toggles.autoCall ? 'Auto-Call 112 disabled' : 'Auto-Call 112 enabled'); }} />
              <ToggleRow label="Share Live Location" desc="Send tracking link to emergency contacts immediately" enabled={toggles.shareLoc} onToggle={() => { setToggles(p => ({...p, shareLoc: !p.shareLoc})); handleAction(toggles.shareLoc ? 'Live location sharing disabled' : 'Live location sharing enabled'); }} />
              <ToggleRow label="Background Audio Recording" desc="Start recording ambient audio to secure server when in danger" enabled={toggles.bgAudio} onToggle={() => { setToggles(p => ({...p, bgAudio: !p.bgAudio})); handleAction(toggles.bgAudio ? 'Audio recording disabled' : 'Audio recording enabled'); }} />
              <ToggleRow label="Auto-capture Camera" desc="Take silent photos from front and back cameras" enabled={toggles.autoCam} onToggle={() => { setToggles(p => ({...p, autoCam: !p.autoCam})); handleAction(toggles.autoCam ? 'Auto-capture disabled' : 'Auto-capture enabled'); }} />
            </div>
          </SettingSection>

          <SettingSection title="AI Response Style" desc="Customize how the AI Navigator communicates">
             <div className="grid grid-cols-3 gap-4">
               {['Simple', 'Expert', 'Voice-First'].map(style => (
                 <div key={style} onClick={() => { setActiveStyle(style); handleAction(`AI style set to: ${style}`); }} className={`rounded-xl p-4 cursor-pointer relative transition-all ${activeStyle === style ? 'border-2 border-blue-600 bg-blue-50' : 'border border-slate-200 hover:border-slate-300'}`}>
                   {activeStyle === style && <div className="absolute top-2 right-2 w-3 h-3 bg-blue-600 rounded-full"></div>}
                   <div className="font-bold text-slate-900 mb-1">{style}</div>
                   <div className="text-xs text-slate-500">{style === 'Simple' ? 'Clear, step-by-step instructions. Best for high stress.' : style === 'Expert' ? 'Detailed legal and procedural terminology.' : 'Large buttons, auto-reads responses aloud.'}</div>
                 </div>
               ))}
             </div>
          </SettingSection>

          <SettingSection title="Offline Mode (Hackathon Special)" desc="Download critical data for use without internet">
            <div className="bg-slate-900 text-white rounded-xl p-6 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-lg mb-1">District Emergency Pack</h4>
                <p className="text-sm text-slate-400 max-w-sm">Downloads offline maps, local shelter coordinates, and cached helplines for your current district.</p>
              </div>
              <button onClick={() => handleAction('Downloading District Emergency Pack (45MB)...')} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 cursor-pointer transition">
                Download (45MB)
              </button>
            </div>
          </SettingSection>

        </div>
      </div>
    </motion.div>
  )
}

// Subcomponents for cleaner code
function SettingsNav({label, icon, active = false}: any) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
      active ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
    }`}>
      {icon} {label}
    </button>
  )
}

function SettingSection({title, desc, children}: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
      {children}
    </div>
  )
}

function InputGroup({label, value}: any) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">{label}</label>
      <input type="text" value={value} readOnly className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 outline-none" />
    </div>
  )
}

function ToggleRow({label, desc, enabled, onToggle}: any) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="font-bold text-slate-800">{label}</div>
        <div className="text-sm text-slate-500">{desc}</div>
      </div>
      <div onClick={onToggle} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${enabled ? 'bg-blue-600' : 'bg-slate-300'}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${enabled ? 'right-1' : 'left-1'}`}></div>
      </div>
    </div>
  )
}

function ActionCard_OLD({icon, title, desc, color}: any) {
  const colorMap: Record<string, string> = {
    red: "bg-red-50 border-red-100 text-red-600 hover:border-red-300",
    blue: "bg-blue-50 border-blue-100 text-blue-600 hover:border-blue-300",
    amber: "bg-amber-50 border-amber-100 text-amber-600 hover:border-amber-300",
    slate: "bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300",
  };
  
  return (
    <button className={`p-4 rounded-xl border transition text-left flex flex-col justify-between h-32 ${colorMap[color]}`}>
      <div className="bg-white p-2 rounded-lg w-max shadow-sm">{icon}</div>
      <div>
        <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{title}</h4>
        <p className="text-xs opacity-80">{desc}</p>
      </div>
    </button>
  )
}

function NavItem({ icon, label, active, onClick, isAlert, badge, collapsed }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, isAlert?: boolean, badge?: string, collapsed?: boolean }) {
  return (
    <div className="relative group/nav cursor-pointer" onClick={onClick}>
      <button 
        className={`w-full flex items-center ${collapsed ? 'justify-center h-[48px]' : 'justify-between h-[44px]'} px-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
          active 
            ? (isAlert 
                ? "bg-gradient-to-r from-red-50 to-pink-50 text-red-600 border border-red-200 shadow-sm shadow-red-100" 
                : (collapsed 
                    ? "bg-blue-50 text-blue-600 border-l-[3px] border-blue-500 rounded-l-none" 
                    : "bg-gradient-to-r from-blue-50 to-pink-50/50 text-blue-600 border border-blue-200 shadow-sm shadow-blue-100"))
            : "text-slate-500 hover:bg-pink-50/50 hover:text-slate-700 border border-transparent"
        }`}
      >
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} w-full relative`}>
          <div className={`${active ? (isAlert ? "text-red-500" : "text-blue-600") : "text-slate-400 group-hover:text-pink-500 transition-colors"} ${collapsed ? 'group-hover/nav:scale-110 transition-transform' : ''}`}>
            {icon}
          </div>
          {!collapsed && <span>{label}</span>}
          {badge && (
            <span className={`text-[10px] font-black rounded-full flex items-center justify-center ${isAlert ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'} ${collapsed ? 'absolute -top-2 -right-2 w-4 h-4 shadow' : 'px-2 py-0.5'}`}>
              {badge}
            </span>
          )}
        </div>
      </button>
      {collapsed && (
        <div className="hidden group-hover/nav:block absolute left-[85px] top-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-xl z-[100] whitespace-nowrap before:content-[''] before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-blue-600 pointer-events-none">
          {label}
        </div>
      )}
    </div>
  );
}

// --- NEW FEATURES FOR COMMAND CENTER ---

function LiveMapTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-8rem)] flex bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
      
      {/* Sidebar for Map */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col z-20 relative shadow-lg hidden md:flex">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2"><Map size={18} /> Emergency Radar</h2>
          <div className="mt-3 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search areas, shelters..." className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase px-2 pt-2">Active Threats near you</div>
          <button className="w-full text-left p-3 hover:bg-slate-50 rounded-xl transition border border-transparent hover:border-slate-200">
            <div className="flex gap-3">
              <div className="bg-red-100 text-red-600 p-2 rounded-lg h-max"><AlertTriangle size={16} /></div>
              <div>
                <div className="font-bold text-slate-800 text-sm">Flash Flood Zone</div>
                <div className="text-xs text-slate-500 mt-0.5">Downtown • 1.2km away</div>
                <div className="text-xs font-bold text-red-600 mt-1">EVACUATE IMMEDIATELY</div>
              </div>
            </div>
          </button>
          <button className="w-full text-left p-3 hover:bg-slate-50 rounded-xl transition border border-transparent hover:border-slate-200 bg-blue-50/50 border-blue-100">
            <div className="flex gap-3">
              <div className="bg-amber-100 text-amber-600 p-2 rounded-lg h-max"><AlertTriangle size={16} /></div>
              <div>
                <div className="font-bold text-slate-800 text-sm">Traffic Blockage</div>
                <div className="text-xs text-slate-500 mt-0.5">NH-44 Highway • 3.5km</div>
                <div className="text-xs font-bold text-amber-600 mt-1">AVOID ROUTE</div>
              </div>
            </div>
          </button>

          <div className="text-xs font-bold text-slate-500 uppercase px-2 pt-4">Resources</div>
          <button className="w-full text-left p-3 hover:bg-slate-50 rounded-xl transition border border-transparent hover:border-slate-200">
            <div className="flex gap-3">
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg h-max"><Tent size={16} /></div>
              <div>
                <div className="font-bold text-slate-800 text-sm">Relief Camp Alpha</div>
                <div className="text-xs text-slate-500 mt-0.5">Central School • 2.1km</div>
                <div className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1"><CheckCircle size={12}/> Space Available</div>
              </div>
            </div>
          </button>
          <button className="w-full text-left p-3 hover:bg-slate-50 rounded-xl transition border border-transparent hover:border-slate-200">
            <div className="flex gap-3">
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg h-max"><Stethoscope size={16} /></div>
              <div>
                <div className="font-bold text-slate-800 text-sm">City Hospital</div>
                <div className="text-xs text-slate-500 mt-0.5">West Block • 4.0km</div>
                <div className="text-xs font-bold text-emerald-600 mt-1">Trauma Center Open</div>
              </div>
            </div>
          </button>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <button className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-lg text-sm flex justify-center items-center gap-2 hover:bg-slate-800 transition shadow">
            <Zap size={16} /> Auto-Route to Safety
          </button>
        </div>
      </div>

      {/* Actual Map Area */}
      <div className="flex-1 relative bg-slate-100">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-80 z-0"></div>
        
        {/* Route Line SVG Mock */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))' }}>
          <path d="M 50% 50% Q 60% 40%, 75% 75%" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="8 8" className="animate-[dash_20s_linear_infinite]" />
        </svg>
        
        {/* Map Filters Overlay */}
        <div className="absolute top-4 left-4 md:left-4 z-10 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 flex flex-col md:flex-row gap-1">
          <button className="p-2.5 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer" title="Hospitals"><Stethoscope size={20}/></button>
          <button className="p-2.5 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer" title="Police"><ShieldAlert size={20}/></button>
          <button className="p-2.5 bg-slate-100 rounded-lg text-slate-900 cursor-pointer shadow-inner" title="Shelters"><Tent size={20}/></button>
          <button className="p-2.5 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer" title="Hazards"><FileWarning size={20}/></button>
          <div className="w-px h-8 bg-slate-200 my-auto mx-1 hidden md:block"></div>
          <div className="h-px w-8 bg-slate-200 mx-auto my-1 md:hidden"></div>
          <button className="p-2.5 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 cursor-pointer" title="My Location"><MapPin size={20}/></button>
        </div>

        {/* You */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group">
          <div className="relative">
             <div className="w-24 h-24 bg-blue-500/20 rounded-full animate-ping absolute -top-8 -left-8"></div>
             <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-xl relative z-10 flex items-center justify-center">
               <User size={14} className="text-white"/>
             </div>
             <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">Your Location</div>
          </div>
        </div>

        {/* Traffic Blocked */}
        <div className="absolute top-1/3 left-[20%] z-10 bg-white p-3 rounded-xl shadow-lg border border-amber-200 flex items-center gap-3 cursor-pointer hover:scale-105 transition">
          <div className="bg-amber-100 p-2 rounded-lg text-amber-600"><AlertTriangle size={16}/></div>
          <div>
            <div className="text-xs font-bold text-slate-800">Traffic Blocked</div>
            <div className="text-[10px] text-slate-500">Avoid NH-44</div>
          </div>
        </div>

        {/* City Hospital */}
        <div className="absolute bottom-[20%] right-[30%] z-10 bg-white p-3 rounded-xl shadow-lg border border-emerald-200 flex items-center gap-3 cursor-pointer hover:scale-105 transition">
          <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><Stethoscope size={16}/></div>
          <div>
            <div className="text-xs font-bold text-slate-800">City Hospital</div>
            <div className="text-[10px] text-emerald-600 font-bold">Available Beds: 14</div>
          </div>
        </div>

        {/* Relief Camp */}
        <div className="absolute bottom-[25%] right-[25%] z-10 bg-white p-3 rounded-xl shadow-lg border border-emerald-200 flex items-center gap-3 cursor-pointer hover:scale-105 transition">
          <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><Tent size={16}/></div>
          <div>
            <div className="text-xs font-bold text-slate-800">Relief Camp Alpha</div>
            <div className="text-[10px] text-emerald-600 font-bold">Destination</div>
          </div>
        </div>
        
        {/* Danger Zone Polygon Mock */}
        <div className="absolute top-[20%] right-[20%] w-64 h-64 bg-red-500/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] border-2 border-red-500/50 animate-[spin_20s_linear_infinite] z-0 pointer-events-none"></div>
        <div className="absolute top-[35%] right-[28%] z-10 bg-red-600 text-white px-2 py-1 rounded shadow text-[10px] font-bold uppercase animate-pulse">Flood Zone</div>

        <div className="absolute top-4 right-4 z-10 bg-slate-900/90 backdrop-blur text-white px-4 py-2 rounded-xl shadow-lg font-bold text-sm flex items-center gap-2">
          <Activity size={16} className="text-emerald-400 animate-pulse" />
          Live GPS Sync
        </div>
      </div>
    </motion.div>
  )
}

function VolunteerPortalTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-emerald-600 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10"><Users size={200}/></div>
        <h2 className="text-3xl font-extrabold mb-2 relative z-10">Civil Defense Network</h2>
        <p className="text-emerald-100 max-w-xl relative z-10">Register your skills and vehicles to assist local authorities during large-scale emergencies.</p>
        <button className="mt-6 bg-white text-emerald-700 font-bold px-6 py-3 rounded-lg shadow-lg relative z-10">Sign Up as Volunteer</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><CheckCircle className="text-emerald-500"/> Required Skills</h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex justify-between items-center bg-slate-50 p-2 rounded"><span>First Aid & CPR</span> <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-bold">High Demand</span></li>
            <li className="flex justify-between items-center bg-slate-50 p-2 rounded"><span>Heavy Vehicle Driving</span> <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded font-bold">Medium</span></li>
            <li className="flex justify-between items-center bg-slate-50 p-2 rounded"><span>Language Translation</span> <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded font-bold">Medium</span></li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
            <Map size={32}/>
          </div>
          <h3 className="font-bold text-lg mb-2">Live Incident Matching</h3>
          <p className="text-sm text-slate-500 mb-4">You will receive SMS alerts when an emergency matches your skills within a 5km radius.</p>
        </div>
      </div>
    </motion.div>
  )
}

function MedicalProfileTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Medical Profile</h2>
          <p className="text-slate-500">Critical health data automatically shared with first responders during SOS.</p>
        </div>
        <button className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg font-bold text-sm transition">Edit Profile</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-red-50 p-6 flex items-center gap-4 border-b border-red-100">
          <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-md">
            O+
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-900">Rahul Sharma</h3>
            <p className="text-red-700 text-sm font-medium">ABHA ID: 91-0000-1111-2222</p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Allergies & Conditions</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-bold border border-amber-200">Penicillin Allergy</span>
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-bold border border-slate-200">Asthma</span>
            </div>

            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Current Medications</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Albuterol Inhaler (As needed)</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Cetirizine 10mg (Daily)</li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Emergency Doctor</h4>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="font-bold text-slate-800">Dr. Anjali Desai</div>
                <div className="text-sm text-slate-500">General Physician • +91 98765 11111</div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Health Insurance</h4>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="font-bold text-slate-800">Ayushman Bharat PM-JAY</div>
                <div className="text-sm text-slate-500">Policy: AB-4455-6677</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// --- NEW MODULES ---

function EmergencyPlansTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900">Emergency Plans</h2>
        <p className="text-slate-500">Step-by-step government-approved preparedness guides and checklists.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Waves size={64} /></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600"><Waves size={24} /></div>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">100% READY</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Flood & Cyclone</h3>
          <p className="text-sm text-slate-500 mb-4">Evacuation routes, shelter items, and communication plan.</p>
          <div className="w-full bg-slate-100 h-2 rounded-full mb-4"><div className="bg-blue-500 h-2 rounded-full w-full"></div></div>
          <button className="text-sm font-bold text-blue-600 flex items-center gap-1">Review Plan <ChevronRight size={16}/></button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Activity size={64} /></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600"><Activity size={24} /></div>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">60% READY</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Earthquake</h3>
          <p className="text-sm text-slate-500 mb-4">Drop, cover, and hold on drills. Structural safety check.</p>
          <div className="w-full bg-slate-100 h-2 rounded-full mb-4"><div className="bg-amber-500 h-2 rounded-full w-3/5"></div></div>
          <button className="text-sm font-bold text-amber-600 flex items-center gap-1">Resume Plan <ChevronRight size={16}/></button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><AlertTriangle size={64} /></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-red-50 text-red-600"><AlertTriangle size={24} /></div>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">20% READY</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Fire Emergency</h3>
          <p className="text-sm text-slate-500 mb-4">Evacuation map and extinguisher locations.</p>
          <div className="w-full bg-slate-100 h-2 rounded-full mb-4"><div className="bg-red-500 h-2 rounded-full w-1/5"></div></div>
          <button className="text-sm font-bold text-red-600 flex items-center gap-1">Start Plan <ChevronRight size={16}/></button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldAlert size={64} /></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-slate-100 text-slate-600"><ShieldAlert size={24} /></div>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">NOT STARTED</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Cyber Fraud Protocol</h3>
          <p className="text-sm text-slate-500 mb-4">Secure banking contacts and instant freeze steps.</p>
          <div className="w-full bg-slate-100 h-2 rounded-full mb-4"></div>
          <button className="text-sm font-bold text-slate-600 flex items-center gap-1">Create Plan <ChevronRight size={16}/></button>
        </div>
      </div>
    </motion.div>
  )
}

function DocumentsVaultTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Documents Vault</h2>
          <p className="text-slate-500">Securely store and share IDs during emergencies. DigiLocker Synced.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus size={16}/> Upload</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm relative">
          <div className="absolute top-4 right-4 text-emerald-500"><CheckCircle size={20} /></div>
          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4"><CreditCard className="text-slate-600"/></div>
          <h3 className="font-bold text-slate-900">Aadhaar Card</h3>
          <p className="text-xs text-slate-500 mb-4">XXXX-XXXX-1234</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-slate-50 border border-slate-200 text-slate-700 py-1.5 rounded-lg text-sm font-semibold">View</button>
            <button className="bg-blue-50 text-blue-600 p-1.5 rounded-lg border border-blue-100"><Download size={18}/></button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm relative">
          <div className="absolute top-4 right-4 text-emerald-500"><CheckCircle size={20} /></div>
          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4"><FileText className="text-slate-600"/></div>
          <h3 className="font-bold text-slate-900">PAN Card</h3>
          <p className="text-xs text-slate-500 mb-4">ABCDE1234F</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-slate-50 border border-slate-200 text-slate-700 py-1.5 rounded-lg text-sm font-semibold">View</button>
            <button className="bg-blue-50 text-blue-600 p-1.5 rounded-lg border border-blue-100"><Download size={18}/></button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm relative border-dashed">
          <div className="absolute top-4 right-4 text-amber-500"><AlertTriangle size={20} /></div>
          <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-4"><HeartPulse className="text-amber-600"/></div>
          <h3 className="font-bold text-slate-900">Medical Records</h3>
          <p className="text-xs text-amber-600 mb-4 font-medium">Missing ABHA ID</p>
          <button className="w-full bg-amber-50 text-amber-700 border border-amber-200 py-1.5 rounded-lg text-sm font-semibold">Link Account</button>
        </div>
      </div>
    </motion.div>
  )
}

function OfficialAlertsTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900">Official Alerts</h2>
        <p className="text-slate-500">Real-time localized broadcasts from government agencies.</p>
      </div>
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex gap-4">
          <div className="text-red-500 mt-1"><AlertTriangle size={24} /></div>
          <div>
            <div className="flex gap-2 items-center mb-1">
              <span className="text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded uppercase">Critical</span>
              <span className="text-xs font-semibold text-slate-500">10 mins ago • NDMA</span>
            </div>
            <h3 className="font-bold text-red-900 text-lg">Flash Flood Warning - Sector 4</h3>
            <p className="text-red-800 text-sm mt-1">Immediate evacuation advised for low-lying areas. Relief camps activated at Central School.</p>
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
          <div className="text-amber-500 mt-1"><FileWarning size={24} /></div>
          <div>
            <div className="flex gap-2 items-center mb-1">
              <span className="text-xs font-bold bg-amber-500 text-white px-2 py-0.5 rounded uppercase">Warning</span>
              <span className="text-xs font-semibold text-slate-500">2 hours ago • Traffic Police</span>
            </div>
            <h3 className="font-bold text-amber-900 text-lg">Highway Blockage</h3>
            <p className="text-amber-800 text-sm mt-1">NH-44 blocked due to landslide. Take alternate route via State Highway 12.</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex gap-4">
          <div className="text-blue-500 mt-1"><Info size={24} /></div>
          <div>
            <div className="flex gap-2 items-center mb-1">
              <span className="text-xs font-bold bg-blue-500 text-white px-2 py-0.5 rounded uppercase">Info</span>
              <span className="text-xs font-semibold text-slate-500">1 day ago • Health Ministry</span>
            </div>
            <h3 className="font-bold text-blue-900 text-lg">Polio Vaccination Drive</h3>
            <p className="text-blue-800 text-sm mt-1">Free vaccination available at all primary health centers this weekend.</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function AgencyDirectoryTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Agency Directory</h2>
          <p className="text-slate-500">Direct contact info for state and national government agencies.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search agencies..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: "NDRF HQ", desc: "National Disaster Response Force", icon: <Building/>, phone: "1078" },
          { name: "Cyber Crime Cell", desc: "Financial fraud reporting", icon: <ShieldAlert/>, phone: "1930" },
          { name: "Women Helpline", desc: "Domestic abuse & safety", icon: <Users/>, phone: "1091" },
          { name: "Child Helpline", desc: "Child protection services", icon: <User/>, phone: "1098" },
          { name: "Ambulance", desc: "Medical emergencies", icon: <HeartPulse/>, phone: "108" },
          { name: "Fire Brigade", desc: "Fire and rescue", icon: <AlertTriangle/>, phone: "101" },
        ].map((agency, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-40">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-slate-400">{agency.icon}</div>
                <h3 className="font-bold text-slate-900">{agency.name}</h3>
              </div>
              <p className="text-xs text-slate-500">{agency.desc}</p>
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.open(`tel:${agency.phone}`, '_self'); }} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-lg text-sm flex justify-center items-center gap-2 transition cursor-pointer">
              <PhoneCall size={14}/> Dial {agency.phone}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function LegalAidTab() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  
  const handleAction = (action: string) => {
    setActiveAction(action);
    setTimeout(() => setActiveAction(null), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-6">
      {activeAction && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="fixed top-4 right-4 z-[80] bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle size={18} /> {activeAction}
        </motion.div>
      )}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900">Legal Aid & Rights</h2>
        <p className="text-slate-500">Accessible legal assistance and automated documentation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group cursor-pointer">
          <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform"><FileText size={100}/></div>
          <h3 className="text-xl font-bold mb-2">Draft e-FIR</h3>
          <p className="text-slate-400 text-sm mb-6">AI-assisted drafting for lost items or non-heinous crimes.</p>
          <button onClick={() => handleAction('e-FIR Draft initiated! AI is preparing your document...')} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-bold shadow cursor-pointer transition">Start Draft</button>
        </div>

        <div onClick={() => handleAction('Connecting you with available Pro Bono lawyers...')} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="text-blue-600 mb-4"><Gavel size={32}/></div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Pro Bono Consult</h3>
          <p className="text-slate-500 text-sm mb-4">Connect with registered volunteer lawyers for immediate advice.</p>
          <span className="text-blue-600 font-bold text-sm">Find Lawyer &rarr;</span>
        </div>

        <div onClick={() => handleAction('Opening Citizen Rights Guide...')} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="text-emerald-600 mb-4"><BookOpen size={32}/></div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Know Your Rights</h3>
          <p className="text-slate-500 text-sm mb-4">Plain-language explanations of citizen rights during police interaction.</p>
          <span className="text-emerald-600 font-bold text-sm">Read Guides &rarr;</span>
        </div>
      </div>
    </motion.div>
  )
}

function DisasterReliefTab() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  
  const handleAction = (action: string) => {
    setActiveAction(action);
    setTimeout(() => setActiveAction(null), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-6">
      {activeAction && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed top-4 right-4 z-[80] bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle size={18} /> {activeAction}
        </motion.div>
      )}
      <div className="bg-amber-600 text-white rounded-3xl p-8 flex justify-between items-center shadow-xl">
        <div>
          <h2 className="text-3xl font-extrabold mb-2">Disaster Relief Hub</h2>
          <p className="text-amber-100 max-w-xl">Coordinate volunteers, claim government compensation, and donate securely to official state funds.</p>
        </div>
        <Tent size={64} className="opacity-50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Claim Compensation</h3>
          <p className="text-slate-600 text-sm mb-6">File a claim for property damage or crop loss under SDRF guidelines.</p>
          <button onClick={() => handleAction('Compensation claim form opened! Please fill the details...')} className="w-full border-2 border-amber-600 text-amber-700 font-bold py-2 rounded-lg hover:bg-amber-50 transition cursor-pointer">File New Claim</button>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Volunteer Registration</h3>
          <p className="text-slate-600 text-sm mb-6">Join the civil defense or local NGO network for active relief work.</p>
          <button onClick={() => handleAction('Volunteer registration submitted! You will be contacted shortly.')} className="w-full bg-slate-900 text-white font-bold py-2 rounded-lg hover:bg-slate-800 transition cursor-pointer">Register as Volunteer</button>
        </div>
      </div>
    </motion.div>
  )
}

function AdminDashboardTab() {
  const chartData = [40, 60, 35, 85, 110, 75, 45, 30, 50, 95, 120, 80];
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Control Center</h2>
          <p className="text-slate-500">Restricted access: District Magistrate / Nodal Officers</p>
        </div>
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-bold border border-red-200 flex items-center gap-2 shadow-sm">
          <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></div> 12 Active SOS Calls
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="text-slate-500 text-xs font-bold mb-1 uppercase">Total Users</div>
          <div className="text-3xl font-black text-slate-900">24,592</div>
          <div className="text-emerald-500 text-xs font-bold mt-2 flex items-center gap-1"><CheckCircle size={12}/> +12% this week</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="text-slate-500 text-xs font-bold mb-1 uppercase">AI Queries Handled</div>
          <div className="text-3xl font-black text-slate-900">8,204</div>
          <div className="text-emerald-500 text-xs font-bold mt-2 flex items-center gap-1"><CheckCircle size={12}/> 99.8% resolution rate</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="text-slate-500 text-xs font-bold mb-1 uppercase">Active Personnel</div>
          <div className="text-3xl font-black text-slate-900">145</div>
          <div className="text-blue-500 text-xs font-bold mt-2">Deployed across 12 zones</div>
        </div>
        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg flex flex-col justify-center border border-slate-800">
          <div className="text-slate-400 text-xs font-bold mb-1 uppercase">Emergency Action</div>
          <p className="text-xs text-slate-300 mb-3 leading-tight">Instantly override networks to push SMS to all active citizens.</p>
          <button className="w-full bg-red-600 hover:bg-red-500 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md">
            <Volume2 size={16}/> Push SMS Broadcast
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Analytics Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-900">System Activity (24h)</h3>
              <p className="text-xs text-slate-500">SOS requests vs AI interventions</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-xs font-bold rounded p-1 outline-none">
              <option>Today</option>
              <option>This Week</option>
            </select>
          </div>
          <div className="flex-1 flex items-end gap-2 justify-between h-48 mt-4 border-b border-slate-100 pb-2">
            {chartData.map((val, i) => (
              <div key={i} className="w-full flex flex-col justify-end items-center group relative h-full">
                <div 
                  className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-400 transition-colors" 
                  style={{ height: `${(val / 120) * 100}%` }}
                ></div>
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow transition pointer-events-none">{val}</div>
                <span className="text-[10px] text-slate-400 mt-2">{i*2}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Incident Feed */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[320px]">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><AlertTriangle size={18} className="text-red-500"/> Live Incidents</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            <div className="border-l-2 border-red-500 pl-3">
              <div className="flex justify-between items-start">
                <div className="font-bold text-sm text-slate-800">Medical Emergency</div>
                <span className="text-[10px] text-slate-400">2 min ago</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">Ambulance dispatched to Sector 5. Patient: O+ blood group.</div>
            </div>
            <div className="border-l-2 border-amber-500 pl-3">
              <div className="flex justify-between items-start">
                <div className="font-bold text-sm text-slate-800">Evacuation Needed</div>
                <span className="text-[10px] text-slate-400">14 min ago</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">Flood water rising in North District. NDRF notified.</div>
            </div>
            <div className="border-l-2 border-blue-500 pl-3">
              <div className="flex justify-between items-start">
                <div className="font-bold text-sm text-slate-800">Cyber Complaint Filed</div>
                <span className="text-[10px] text-slate-400">1 hr ago</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">Bank account frozen automatically via API.</div>
            </div>
            <div className="border-l-2 border-slate-300 pl-3">
              <div className="flex justify-between items-start">
                <div className="font-bold text-sm text-slate-800">AI Consultation</div>
                <span className="text-[10px] text-slate-400">2 hr ago</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">Citizen successfully guided for e-FIR process.</div>
            </div>
          </div>
          <button className="mt-4 w-full text-center text-xs font-bold text-blue-600 hover:text-blue-700">View All Logs &rarr;</button>
        </div>
      </div>
    </motion.div>
  )
}

function MyProfileTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-center p-12 relative">
        <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
           <User size={200}/>
        </div>
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-6">
          <User size={48} />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Profile Setup Required</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">Complete your GovAssist citizen profile to enable fast-track SOS response and automatic form filling for e-FIRs and claims.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <button className="bg-blue-50 border border-blue-200 p-5 rounded-xl hover:bg-blue-100 transition cursor-pointer group">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><User size={20}/></div>
            <h3 className="font-bold text-blue-900 mb-1">Complete Profile</h3>
            <p className="text-xs text-blue-700">Add basic details manually</p>
          </button>
          <button className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl hover:bg-emerald-100 transition cursor-pointer group">
            <div className="bg-emerald-600 text-white w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><Shield size={20}/></div>
            <h3 className="font-bold text-emerald-900 mb-1">Import DigiLocker</h3>
            <p className="text-xs text-emerald-700">1-click Aadhaar sync</p>
          </button>
          <button className="bg-slate-50 border border-slate-200 p-5 rounded-xl hover:bg-slate-100 transition cursor-pointer group">
            <div className="bg-slate-700 text-white w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><Users size={20}/></div>
            <h3 className="font-bold text-slate-900 mb-1">Emergency Contacts</h3>
            <p className="text-xs text-slate-600">Setup SOS notification list</p>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function EmergencyContactsTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Emergency Contacts</h2>
          <p className="text-slate-500">People who will be notified instantly when you trigger an SOS.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-sm cursor-pointer"><Plus size={16}/> Add Contact</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition h-40 cursor-pointer group">
          <div className="bg-white p-3 rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform"><Users size={24}/></div>
          <span className="font-bold text-sm">Add Family</span>
        </button>
        <button className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition h-40 cursor-pointer group">
          <div className="bg-white p-3 rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform"><Stethoscope size={24}/></div>
          <span className="font-bold text-sm">Add Doctor</span>
        </button>
        <button className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition h-40 cursor-pointer group">
          <div className="bg-white p-3 rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform"><Scale size={24}/></div>
          <span className="font-bold text-sm">Add Lawyer</span>
        </button>
        <button className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition h-40 cursor-pointer group">
          <div className="bg-white p-3 rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform"><Home size={24}/></div>
          <span className="font-bold text-sm">Add Neighbor</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
         <div className="p-8 text-center text-slate-500">
           <Users size={48} className="mx-auto mb-4 opacity-20" />
           <h3 className="text-lg font-bold text-slate-800 mb-1">No Contacts Added Yet</h3>
           <p className="text-sm max-w-md mx-auto">Your SOS alerts currently have no trusted recipients. We highly recommend adding at least two family members.</p>
         </div>
      </div>
    </motion.div>
  )
}

function CalendarTab() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  
  const handleAction = (action: string) => {
    setActiveAction(action);
    setTimeout(() => setActiveAction(null), 3000);
  };

  const events = [
    { id: 1, title: "Community Evacuation Drill", date: "May 20, 2026", time: "10:00 AM", location: "Sector 5 Community Center", type: "Drill", color: "text-amber-600 bg-amber-50 border-amber-200" },
    { id: 2, title: "Blood Donation Camp", date: "May 22, 2026", time: "09:00 AM", location: "District Hospital", type: "Health", color: "text-red-600 bg-red-50 border-red-200" },
    { id: 3, title: "PM-JAY Registration Drive", date: "May 25, 2026", time: "11:00 AM", location: "City Hall Main Auditorium", type: "Govt Scheme", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { id: 4, title: "Cyber Security Awareness Webinar", date: "May 28, 2026", time: "04:00 PM", location: "Online (Zoom)", type: "Awareness", color: "text-blue-600 bg-blue-50 border-blue-200" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-6">
      {activeAction && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed top-4 right-4 z-[80] bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle size={18} /> {activeAction}
        </motion.div>
      )}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Event Calendar</h2>
          <p className="text-slate-500">Upcoming government drives, drills, and community programs.</p>
        </div>
        <button onClick={() => handleAction('Event suggestion form submitted! Under review by admin.')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-sm cursor-pointer"><Plus size={16}/> Suggest Event</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Calendar size={20} className="text-blue-500"/> Scheduled Events</h3>
            <div className="space-y-4">
              {events.map(ev => (
                <div key={ev.id} onClick={() => handleAction(`Viewing details for: ${ev.title}`)} className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition cursor-pointer group">
                  <div className={`shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center border ${ev.color}`}>
                    <span className="text-xs font-bold uppercase opacity-80">{ev.date.split(' ')[0]}</span>
                    <span className="text-xl font-black">{ev.date.split(' ')[1].replace(',', '')}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{ev.title}</h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{ev.type}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1"><Clock size={14}/> {ev.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={14}/> {ev.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <h3 className="font-bold text-slate-800 mb-4">May 2026</h3>
             {/* Simple Calendar Mockup */}
             <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
               <div className="font-bold text-slate-400">Su</div>
               <div className="font-bold text-slate-400">Mo</div>
               <div className="font-bold text-slate-400">Tu</div>
               <div className="font-bold text-slate-400">We</div>
               <div className="font-bold text-slate-400">Th</div>
               <div className="font-bold text-slate-400">Fr</div>
               <div className="font-bold text-slate-400">Sa</div>
             </div>
             <div className="grid grid-cols-7 gap-1 text-center text-sm">
               {Array.from({length: 31}).map((_, i) => (
                 <div key={i} onClick={() => { if([20,22,25,28].includes(i+1)) handleAction(`Event on May ${i+1} selected`); }} className={`p-2 rounded-lg cursor-pointer ${
                   [20, 22, 25, 28].includes(i+1) ? 'bg-blue-100 text-blue-700 font-bold' : 
                   (i+1 === 16 ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-slate-600 hover:bg-slate-50')
                 }`}>
                   {i+1}
                 </div>
               ))}
             </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 text-white relative overflow-hidden">
             <div className="absolute -right-6 -bottom-6 opacity-10"><Bell size={100}/></div>
             <h3 className="font-bold mb-2">Never miss an update</h3>
             <p className="text-xs text-slate-300 mb-4">Sync these events directly to your personal Google or Apple Calendar.</p>
             <button onClick={() => handleAction('Events synced to your calendar! Check Google Calendar.')} className="w-full bg-white/10 hover:bg-white/20 border border-white/20 transition rounded-lg py-2 text-sm font-bold flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer">
               <Download size={16}/> Sync to Calendar
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
