"use client";

import { useState, useEffect } from "react";
import { Mic, Send, AlertTriangle, PhoneCall, FileText, Camera, MapPin, HeartPulse, ShieldAlert, Shield, Search, Bell, User, Home, BookOpen, File, Activity, Settings as SettingsIcon, ChevronRight, Stethoscope, Waves, Scale, Briefcase, Plus, Heart, Map, Globe, Eye, Lock, Zap, FileDigit, Tent, Users, GraduationCap, UserCog, Volume2, LayoutGrid, CheckCircle, Download, CreditCard, Building, Gavel, FileCheck, FileWarning, LineChart, Info, Bot, Database, Calendar, Clock, X, Edit, Trash2, Save, Upload, Filter, Star, TrendingUp, Award, Target, Wifi, WifiOff, Battery, BatteryCharging, Navigation, Radio, Siren, Ambulance, Hospital, Pill, Thermometer, Droplet, Wind, Cloud, Sun, Moon, Sunrise, Sunset, CloudRain, CloudSnow, CloudLightning, Umbrella, AlertCircle, CheckCircle2, XCircle, HelpCircle, MessageSquare, MessageCircle, Phone, Mail, Video, Share2, Link, Copy, Printer, ExternalLink, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, ChevronLeft, ChevronDown, ChevronUp, MoreVertical, MoreHorizontal, Menu, Maximize, Minimize, RefreshCw, RotateCw, ZoomIn, ZoomOut, Layers, Package, Clipboard, BookMarked, Bookmark, Tag, Hash, AtSign, DollarSign, Percent, Slash, Code, Terminal, GitBranch, Github, Twitter, Facebook, Instagram, Linkedin, Youtube, Chrome, Smartphone, Tablet, Laptop, Monitor, Tv, Watch, Headphones, Speaker, Mic2, MicOff, Volume, Volume1, VolumeX, Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, List, Grid, Columns, Rows, Square, Circle, Triangle, Hexagon, Octagon, Pentagon, Diamond, Image as ImageIcon, Film, Music, FileVideo, FileAudio, FileImage, FilePlus, FileMinus, FileX, Folder, FolderPlus, FolderMinus, FolderOpen, Archive, Inbox, Send as SendIcon, Trash, Flag, Bookmark as BookmarkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CitizenLoginModal from "./features/CitizenLogin";
import AccessibilityPanel from "./features/AccessibilityPanel";
import ProfileSetupWizard from "./features/ProfileSetup";
import EmergencyPlansAdvanced from "./features/EmergencyPlans";
import DocumentsVaultAdvanced from "./features/DocumentsVault";
import EmergencyRadar from "./features/EmergencyRadar";
import MedicalProfileAdvanced from "./features/MedicalProfile";
import EmergencyContactsAdvanced from "./features/EmergencyContacts";
import AdminDashboardAdvanced from "./features/AdminDashboard";
import VolunteerPortalAdvanced from "./features/VolunteerPortal";
import AntiGravityEffect from "./features/AntiGravityEffect";
import AIAssistant from "./features/AIAssistant";
import SOSCenter from "./features/SOSCenter";
import LiveMap from "./features/LiveMap";
import DisasterPrediction from "./features/DisasterPrediction";
import WeatherAlerts from "./features/WeatherAlerts";
import SafeRoute from "./features/SafeRoute";
import NotificationCenter from "./features/NotificationCenter";
import OCRScanner from "./features/OCRScanner";
import AnalyticsDashboard from "./features/AnalyticsDashboard";
import VoiceAssistant from "./features/VoiceAssistant";

// --- SEARCH SYSTEM DATA & HELPERS ---
const searchSuggestions = [
  { text: "SOS Ambulance Service", category: "Emergency", tab: "SOS Center", desc: "Dispatch ambulances & find online hospitals", icon: "HeartPulse", color: "red" },
  { text: "Live NDRF Flood Map", category: "Relief", tab: "Live Map", desc: "Locate nearby safety camps & dry pathways", icon: "Waves", color: "cyan" },
  { text: "Cyber Crime Reporting (1930)", category: "Directory", tab: "Legal Aid", desc: "Report digital fraud & freeze bank accounts", icon: "ShieldAlert", color: "violet" },
  { text: "Disaster Prediction Tool", category: "Emergency", tab: "Disaster Prediction", desc: "AI-based forecasting for extreme events", icon: "Activity", color: "emerald" },
  { text: "Severe Weather Alerts", category: "Emergency", tab: "Weather Alerts", desc: "Real-time updates from Indian Met Department", icon: "CloudRain", color: "amber" },
  { text: "Safe Route Evacuation", category: "Safety", tab: "Safe Route", desc: "Find safe evacuation paths in real time", icon: "Navigation", color: "blue" },
  { text: "OCR Medical Card Scan", category: "Medical", tab: "OCR Scanner", desc: "Scan health cards & identify policy benefits", icon: "FileCheck", color: "indigo" },
  { text: "Disaster Relief Camps", category: "Relief", tab: "Disaster Relief", desc: "Locate active shelter locations and aid distribution points", icon: "Tent", color: "rose" },
  { text: "Women First Safety", category: "Safety", tab: "SOS Center", desc: "Priority emergency guidance for women and vulnerable citizens", icon: "Shield", color: "rose" },
  { text: "Nearest Shelter Now", category: "Relief", tab: "Disaster Relief", desc: "Find shelter, food, water, and relief camps near you", icon: "MapPin", color: "emerald" },
  { text: "Lost Document Help", category: "Directory", tab: "Documents Vault", desc: "Recover Aadhaar, PAN, certificates, and emergency copies", icon: "FileDigit", color: "blue" },
  { text: "Call 112 Emergency", category: "Emergency", tab: "SOS Center", desc: "Open emergency response guidance and contact options", icon: "PhoneCall", color: "red" },
  { text: "Official Government Alerts", category: "All", tab: "Official Alerts", desc: "View notifications from Ministry of Electronics & IT", icon: "Bell", color: "pink" },
  { text: "Contact Agency Directory", category: "Directory", tab: "Agency Directory", desc: "State and national help desk telephone directory", icon: "Briefcase", color: "sky" },
  { text: "Innovator Team Members", category: "All", tab: "Our Team", desc: "About developers of GovAssist AI", icon: "Users", color: "teal" },
  { text: "User Settings & Profile", category: "All", tab: "Settings", desc: "Manage notification preferences and user profile data", icon: "SettingsIcon", color: "slate" },
];

const quickSearchSuggestions = searchSuggestions.filter((suggestion) =>
  [
    "Call 112 Emergency",
    "Women First Safety",
    "Live NDRF Flood Map",
    "Cyber Crime Reporting (1930)",
    "Lost Document Help",
    "Nearest Shelter Now",
  ].includes(suggestion.text)
);

function renderSuggestionIcon(iconName: string, size = 16) {
  switch (iconName) {
    case "HeartPulse": return <HeartPulse size={size} />;
    case "Waves": return <Waves size={size} />;
    case "ShieldAlert": return <ShieldAlert size={size} />;
    case "Activity": return <Activity size={size} />;
    case "CloudRain": return <CloudRain size={size} />;
    case "Navigation": return <Navigation size={size} />;
    case "FileCheck": return <FileCheck size={size} />;
    case "Tent": return <Tent size={size} />;
    case "Shield": return <Shield size={size} />;
    case "MapPin": return <MapPin size={size} />;
    case "FileDigit": return <FileDigit size={size} />;
    case "PhoneCall": return <PhoneCall size={size} />;
    case "Bell": return <Bell size={size} />;
    case "Briefcase": return <Briefcase size={size} />;
    case "Users": return <Users size={size} />;
    case "SettingsIcon": return <SettingsIcon size={size} />;
    default: return <Zap size={size} />;
  }
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Welcome");
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isTopSearchOpen, setIsTopSearchOpen] = useState(false);
  const [topSearchQuery, setTopSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [showUserAgreement, setShowUserAgreement] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showCriticalAlert, setShowCriticalAlert] = useState(true);
  const [showEmergencyBanner, setShowEmergencyBanner] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
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

  const topSearchMatches = searchSuggestions.filter(s => {
    const query = topSearchQuery.trim().toLowerCase();
    const matchesCategory = searchCategory === "All" || s.category === searchCategory;
    const matchesQuery = !query || s.text.toLowerCase().includes(query) || s.desc.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const runTopSearch = () => {
    const query = topSearchQuery.trim();
    if (!query) {
      setIsTopSearchOpen(true);
      return;
    }

    const matched = searchSuggestions.find(s => s.text.toLowerCase() === query.toLowerCase());
    setActiveTab(matched ? matched.tab : "AI Navigator");
    setIsTopSearchOpen(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-cyan-50 via-fuchsia-50/30 to-violet-50 text-slate-900 font-sans overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen pointer-events-none"></div>

      <AntiGravityEffect />

      {/* Sidebar - Fixed Position */}
      <aside className={`fixed inset-y-0 left-0 z-50 ${isSidebarCollapsed ? 'w-[72px]' : 'w-[280px]'} bg-white/80 backdrop-blur-xl text-slate-700 border-r border-fuchsia-100/60 flex flex-col justify-between hidden md:flex transition-all duration-300 ease-in-out [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-y-auto overflow-x-visible shadow-lg shadow-fuchsia-100/20`}>
        <div className="w-full">
          <div className="p-4 flex items-center justify-between h-20 border-b border-fuchsia-100/40">
            {!isSidebarCollapsed && (
              <div className="animate-in fade-in duration-300 whitespace-nowrap flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-fuchsia-300 shadow-lg shadow-fuchsia-200/40 shrink-0 bg-white p-0.5">
                  <img src="/api/logo" alt="GovAssist AI" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-lg font-extrabold text-slate-800 tracking-tight">GovAssist<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500"> AI</span></h1>
                  <p className="text-[9px] text-fuchsia-400 mt-0 uppercase tracking-[0.2em] font-bold">Emergency OS</p>
                </div>
              </div>
            )}
            <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="text-slate-400 hover:text-fuchsia-600 transition cursor-pointer p-2 rounded-lg hover:bg-fuchsia-50 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
          <nav className="px-3 space-y-0.5 mt-4 mb-6 w-full">
            {!isSidebarCollapsed && <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2 px-3">Primary</div>}
            <NavItem icon={<LayoutGrid size={20} />} label="Welcome" active={activeTab === "Welcome"} onClick={() => setActiveTab("Welcome")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Home size={20} />} label="Dashboard" active={activeTab === "Home"} onClick={() => setActiveTab("Home")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Zap size={20} />} label="AI Navigator" active={activeTab === "AI Navigator"} onClick={() => setActiveTab("AI Navigator")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<AlertTriangle size={20} />} label="SOS Center" active={activeTab === "SOS Center"} onClick={() => setActiveTab("SOS Center")} isAlert badge="2" collapsed={isSidebarCollapsed} />
            <NavItem icon={<Map size={20} />} label="Live Map" active={activeTab === "Live Map"} onClick={() => setActiveTab("Live Map")} collapsed={isSidebarCollapsed} />
            
            {!isSidebarCollapsed ? (
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-5 mb-2 px-3">Safety AI</div>
            ) : <div className="mt-5 border-t border-slate-100 pt-2 mx-2"></div>}
            <NavItem icon={<Activity size={20} />} label="Disaster Prediction" active={activeTab === "Disaster Prediction"} onClick={() => setActiveTab("Disaster Prediction")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<CloudRain size={20} />} label="Weather Alerts" active={activeTab === "Weather Alerts"} onClick={() => setActiveTab("Weather Alerts")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Navigation size={20} />} label="Safe Route" active={activeTab === "Safe Route"} onClick={() => setActiveTab("Safe Route")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Bell size={20} />} label="Notification Center" active={activeTab === "Notification Center"} onClick={() => setActiveTab("Notification Center")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<FileCheck size={20} />} label="OCR Scanner" active={activeTab === "OCR Scanner"} onClick={() => setActiveTab("OCR Scanner")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<LineChart size={20} />} label="Analytics Dashboard" active={activeTab === "Analytics Dashboard"} onClick={() => setActiveTab("Analytics Dashboard")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Mic size={20} />} label="Voice Assistant" active={activeTab === "Voice Assistant"} onClick={() => setActiveTab("Voice Assistant")} collapsed={isSidebarCollapsed} />
            
            {!isSidebarCollapsed ? (
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-5 mb-2 px-3">Resources</div>
            ) : <div className="mt-5 border-t border-slate-100 pt-2 mx-2"></div>}
            <NavItem icon={<BookOpen size={20} />} label="Emergency Plans" active={activeTab === "Emergency Plans"} onClick={() => setActiveTab("Emergency Plans")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<FileDigit size={20} />} label="Documents Vault" active={activeTab === "Documents Vault"} onClick={() => setActiveTab("Documents Vault")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Activity size={20} />} label="Official Alerts" active={activeTab === "Official Alerts"} onClick={() => setActiveTab("Official Alerts")} badge="5" collapsed={isSidebarCollapsed} />
            <NavItem icon={<Calendar size={20} />} label="Calendar" active={activeTab === "Calendar"} onClick={() => setActiveTab("Calendar")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Briefcase size={20} />} label="Agency Directory" active={activeTab === "Agency Directory"} onClick={() => setActiveTab("Agency Directory")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Scale size={20} />} label="Legal Aid" active={activeTab === "Legal Aid"} onClick={() => setActiveTab("Legal Aid")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Tent size={20} />} label="Disaster Relief" active={activeTab === "Disaster Relief"} onClick={() => setActiveTab("Disaster Relief")} collapsed={isSidebarCollapsed} />
            
            {!isSidebarCollapsed ? (
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-5 mb-2 px-3">Personal</div>
            ) : <div className="mt-5 border-t border-slate-100 pt-2 mx-2"></div>}
            <NavItem icon={<User size={20} />} label="My Profile" active={activeTab === "My Profile"} onClick={() => setActiveTab("My Profile")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Heart size={20} />} label="Medical Profile" active={activeTab === "Medical Profile"} onClick={() => setActiveTab("Medical Profile")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Users size={20} />} label="Emergency Contacts" active={activeTab === "Emergency Contacts"} onClick={() => setActiveTab("Emergency Contacts")} collapsed={isSidebarCollapsed} />
            
            {!isSidebarCollapsed ? (
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-5 mb-2 px-3">System</div>
            ) : <div className="mt-5 border-t border-slate-100 pt-2 mx-2"></div>}
            <NavItem icon={<SettingsIcon size={20} />} label="Settings" active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<UserCog size={20} />} label="Admin Dashboard" active={activeTab === "Admin Dashboard"} onClick={() => setActiveTab("Admin Dashboard")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Shield size={20} />} label="Volunteer Portal" active={activeTab === "Volunteer Portal"} onClick={() => setActiveTab("Volunteer Portal")} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Users size={20} />} label="Our Team" active={activeTab === "Our Team"} onClick={() => setActiveTab("Our Team")} collapsed={isSidebarCollapsed} />
          </nav>
        </div>
        <div className="p-4 sticky bottom-0 z-10 border-t border-slate-100/60 bg-white/80 backdrop-blur-md flex flex-col gap-4">
          <button 
            onClick={() => setActiveTab("SOS Center")}
            className={`${isSidebarCollapsed ? 'w-12 h-12 rounded-full mx-auto p-0 justify-center' : 'w-full py-3 px-4 rounded-xl justify-center gap-2'} bg-gradient-to-r from-rose-500 to-fuchsia-500 hover:from-rose-600 hover:to-fuchsia-600 text-white font-bold flex items-center transition-all shadow-lg shadow-rose-300/50 animate-pulse group relative`}
            title={isSidebarCollapsed ? "EMERGENCY 112" : undefined}
          >
            <PhoneCall size={isSidebarCollapsed ? 20 : 18} />
            {!isSidebarCollapsed && <span>EMERGENCY 112</span>}
          </button>

          {/* Developer Credit */}
          {!isSidebarCollapsed && (
            <div className="flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <p className="text-[9px] text-slate-500 font-bold">Developed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-rose-500 to-cyan-500 font-black">INNOVATOR TEAM</span></p>
            </div>
          )}
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
              className="fixed inset-0 bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 backdrop-blur-sm z-[60] md:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[70] w-[280px] bg-white/95 backdrop-blur-xl text-slate-700 border-r border-fuchsia-100/60 flex flex-col justify-between md:hidden overflow-y-auto shadow-xl"
            >
              <div className="w-full">
                <div className="p-4 flex items-center justify-between h-20 border-b border-slate-100/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-200 shadow-lg shadow-blue-200/40 shrink-0 bg-white p-0.5">
                      <img src="/api/logo" alt="GovAssist AI" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h1 className="text-lg font-extrabold text-slate-800 tracking-tight">GovAssist<span className="text-blue-600"> AI</span></h1>
                      <p className="text-[9px] text-slate-400 mt-0 uppercase tracking-[0.2em] font-bold">Emergency OS</p>
                    </div>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-red-500 transition cursor-pointer p-2 rounded-lg hover:bg-slate-50">
                    <X size={24} />
                  </button>
                </div>
                
                <nav className="px-3 space-y-0.5 mt-4 mb-6 w-full">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2 px-3">Primary</div>
                  <NavItem icon={<LayoutGrid size={20} />} label="Welcome" active={activeTab === "Welcome"} onClick={() => { setActiveTab("Welcome"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Home size={20} />} label="Dashboard" active={activeTab === "Home"} onClick={() => { setActiveTab("Home"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Zap size={20} />} label="AI Navigator" active={activeTab === "AI Navigator"} onClick={() => { setActiveTab("AI Navigator"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<AlertTriangle size={20} />} label="SOS Center" active={activeTab === "SOS Center"} onClick={() => { setActiveTab("SOS Center"); setIsMobileMenuOpen(false); }} isAlert badge="2" collapsed={false} />
                  <NavItem icon={<Map size={20} />} label="Live Map" active={activeTab === "Live Map"} onClick={() => { setActiveTab("Live Map"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-5 mb-2 px-3">Safety AI</div>
                  <NavItem icon={<Activity size={20} />} label="Disaster Prediction" active={activeTab === "Disaster Prediction"} onClick={() => { setActiveTab("Disaster Prediction"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<CloudRain size={20} />} label="Weather Alerts" active={activeTab === "Weather Alerts"} onClick={() => { setActiveTab("Weather Alerts"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Navigation size={20} />} label="Safe Route" active={activeTab === "Safe Route"} onClick={() => { setActiveTab("Safe Route"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Bell size={20} />} label="Notification Center" active={activeTab === "Notification Center"} onClick={() => { setActiveTab("Notification Center"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<FileCheck size={20} />} label="OCR Scanner" active={activeTab === "OCR Scanner"} onClick={() => { setActiveTab("OCR Scanner"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<LineChart size={20} />} label="Analytics Dashboard" active={activeTab === "Analytics Dashboard"} onClick={() => { setActiveTab("Analytics Dashboard"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Mic size={20} />} label="Voice Assistant" active={activeTab === "Voice Assistant"} onClick={() => { setActiveTab("Voice Assistant"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-5 mb-2 px-3">Resources</div>
                  <NavItem icon={<BookOpen size={20} />} label="Emergency Plans" active={activeTab === "Emergency Plans"} onClick={() => { setActiveTab("Emergency Plans"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<FileDigit size={20} />} label="Documents Vault" active={activeTab === "Documents Vault"} onClick={() => { setActiveTab("Documents Vault"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Activity size={20} />} label="Official Alerts" active={activeTab === "Official Alerts"} onClick={() => { setActiveTab("Official Alerts"); setIsMobileMenuOpen(false); }} badge="5" collapsed={false} />
                  <NavItem icon={<Calendar size={20} />} label="Calendar" active={activeTab === "Calendar"} onClick={() => { setActiveTab("Calendar"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Briefcase size={20} />} label="Agency Directory" active={activeTab === "Agency Directory"} onClick={() => { setActiveTab("Agency Directory"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Scale size={20} />} label="Legal Aid" active={activeTab === "Legal Aid"} onClick={() => { setActiveTab("Legal Aid"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Tent size={20} />} label="Disaster Relief" active={activeTab === "Disaster Relief"} onClick={() => { setActiveTab("Disaster Relief"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-5 mb-2 px-3">Personal</div>
                  <NavItem icon={<User size={20} />} label="My Profile" active={activeTab === "My Profile"} onClick={() => { setActiveTab("My Profile"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Heart size={20} />} label="Medical Profile" active={activeTab === "Medical Profile"} onClick={() => { setActiveTab("Medical Profile"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Users size={20} />} label="Emergency Contacts" active={activeTab === "Emergency Contacts"} onClick={() => { setActiveTab("Emergency Contacts"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-5 mb-2 px-3">System</div>
                  <NavItem icon={<SettingsIcon size={20} />} label="Settings" active={activeTab === "Settings"} onClick={() => { setActiveTab("Settings"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<UserCog size={20} />} label="Admin Dashboard" active={activeTab === "Admin Dashboard"} onClick={() => { setActiveTab("Admin Dashboard"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Shield size={20} />} label="Volunteer Portal" active={activeTab === "Volunteer Portal"} onClick={() => { setActiveTab("Volunteer Portal"); setIsMobileMenuOpen(false); }} collapsed={false} />
                  <NavItem icon={<Users size={20} />} label="Our Team" active={activeTab === "Our Team"} onClick={() => { setActiveTab("Our Team"); setIsMobileMenuOpen(false); }} collapsed={false} />
                </nav>
              </div>
              
              <div className="p-4 sticky bottom-0 z-10 border-t border-slate-100/60 bg-white/80 backdrop-blur-md flex flex-col gap-4">
                <button 
                  onClick={() => { setActiveTab("SOS Center"); setIsMobileMenuOpen(false); }}
                  className="w-full py-3 px-4 rounded-xl justify-center gap-2 bg-gradient-to-r from-red-500 to-slate-500 active:from-red-600 active:to-slate-600 text-white font-bold flex items-center transition-all shadow-lg shadow-red-200 animate-pulse"
                >
                  <PhoneCall size={18} />
                  <span>EMERGENCY 112</span>
                </button>

                {/* Developer Credit */}
                <div className="flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity pb-2">
                  <p className="text-[9px] text-slate-500 font-bold">Developed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-rose-500 to-cyan-500 font-black">INNOVATOR TEAM</span></p>
                </div>
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
            className="bg-gradient-to-r from-rose-600 via-red-500 to-orange-500 text-white px-4 py-2.5 text-xs md:text-sm font-bold flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 z-40 relative shadow-lg shadow-rose-200/50 shrink-0 overflow-hidden"
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
        <div className="flex flex-col w-full z-[45] shrink-0">
          {/* Strip 1: GovAssist AI minibar */}
          <div className="bg-[#7a123f] text-white px-4 md:px-12 py-1.5 flex items-center justify-between text-[11px] font-bold z-[46] shadow-sm select-none">
            <div className="flex items-center gap-2">
              {/* Indian Flag SVG */}
              <div className="flex flex-col w-5 h-3.5 border border-white/10 shrink-0 overflow-hidden rounded-sm">
                <div className="h-1/3 bg-[#FF9933]"></div>
                <div className="h-1/3 bg-white flex items-center justify-center relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#000080] absolute"></div>
                </div>
                <div className="h-1/3 bg-[#138808]"></div>
              </div>
              <span className="tracking-wide uppercase text-[10px] md:text-[11px]">GovAssist AI</span>
            </div>
            
            <div className="flex items-center gap-4 text-white/90">
              <button className="hover:text-white transition cursor-pointer hidden md:inline">Skip to main content</button>
              <span className="text-white/20 hidden md:inline">|</span>
              
              {/* Language Switcher */}
              <div className="relative">
                <button 
                  onClick={() => setShowLangMenu(!showLangMenu)} 
                  className="no-min-size flex items-center gap-1.5 px-2 py-0.5 bg-white/10 hover:bg-white/20 border border-white/25 rounded transition cursor-pointer text-[10px] font-extrabold uppercase"
                  title="Select Language"
                >
                  <Globe size={11} />
                  <span>A/अ {currentLang}</span>
                  <ChevronDown size={10} />
                </button>
                {showLangMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)}></div>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800 text-sm z-50 p-1.5 animate-in fade-in slide-in-from-top-2">
                      <div className="px-3 py-1.5 text-[9px] font-black text-slate-400 uppercase tracking-wider">Select Language</div>
                      {languages.map((lang) => (
                        <button 
                          key={lang.code}
                          onClick={() => { setCurrentLang(lang.code); setShowLangMenu(false); }}
                          className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition ${
                            currentLang === lang.code 
                              ? 'bg-gradient-to-r from-blue-50 to-slate-50 text-blue-600 font-bold' 
                              : 'text-slate-600 hover:bg-slate-50/50'
                          }`}
                        >
                          <span className="font-semibold">{lang.native}</span>
                          {currentLang === lang.code && <CheckCircle2 size={12} className="text-blue-500" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Accessibility Menu */}
              <button 
                onClick={() => setShowAccessibilityPanel(true)} 
                className="hover:text-white p-1 hover:bg-white/10 rounded transition cursor-pointer flex items-center justify-center"
                title="Accessibility Options"
              >
                <Eye size={14} />
              </button>

              {/* Quick Sign In button */}
              <button 
                onClick={() => isSignedIn ? undefined : setShowSignInModal(true)} 
                className="hover:text-white p-1 hover:bg-white/10 rounded transition cursor-pointer flex items-center justify-center gap-1 text-[10px]"
                title={isSignedIn ? "Logged In" : "Citizen Sign In"}
              >
                {isSignedIn ? <CheckCircle size={14} className="text-emerald-400" /> : <UserCog size={14} />}
              </button>
            </div>
          </div>

          {/* Strip 2: Main Header with Logos, Custom Search box & Controls */}
          <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200/80 px-4 md:px-12 py-3 flex items-center justify-between z-[44] shrink-0 shadow-sm relative h-16 md:h-20">
            
            {/* Left: Branding */}
            <div className="flex items-center gap-2 shrink-0">
              {/* GovAssist AI Logo Branding */}
              <div className="flex flex-col items-start leading-none select-none cursor-pointer min-w-0" onClick={() => setActiveTab("Welcome")}>
                <div className="text-base md:text-xl font-black text-slate-800 tracking-tight flex items-center whitespace-nowrap">
                  <span className="text-[#FF9933]">Gov</span>
                  <span className="text-[#1A5F7A] font-extrabold">Assist</span>
                  <span className="text-[#138808] text-xs font-semibold ml-1 bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent uppercase tracking-wider">AI</span>
                </div>
                <div className="text-[8px] md:text-[9px] text-[#1A5F7A] font-extrabold uppercase tracking-[0.08em] mt-0.5 whitespace-nowrap">Citizen Emergency Portal</div>
              </div>
            </div>

            {/* Center: Search Box (exact matching Category Dropdown + Text Input + Orange Search Button) */}
            <div className="hidden lg:flex flex-1 justify-center max-w-xl mx-auto px-6">
              <div className="relative w-full flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden shadow-inner focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all h-10">
                {/* Category Dropdown */}
                <select 
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="bg-slate-50 text-slate-700 font-bold text-xs h-full px-3 outline-none cursor-pointer border-r border-slate-250 hover:bg-slate-100 transition"
                >
                  <option value="All">All Categories</option>
                  <option value="Emergency">Emergency Assist</option>
                  <option value="Medical">Medical Schemes</option>
                  <option value="Relief">Relief Camps</option>
                  <option value="Safety">Safety AI Agent</option>
                  <option value="Directory">Directory</option>
                </select>
                
                {/* Text input */}
                <input 
                  type="text" 
                  value={topSearchQuery}
                  onChange={(e) => setTopSearchQuery(e.target.value)}
                  onFocus={() => setIsTopSearchOpen(true)}
                  onKeyDown={(e) => { if (e.key === "Enter") runTopSearch(); }}
                  placeholder="Search in GovAssist..." 
                  className="flex-1 bg-transparent px-3 text-xs md:text-sm font-semibold text-slate-850 outline-none placeholder-slate-400"
                />

                {/* Microphone Icon button */}
                <button onClick={() => setActiveTab("Voice Assistant")} className="no-min-size p-2 text-slate-400 hover:text-orange-500 transition cursor-pointer" title="Voice Search">
                  <Mic size={14} />
                </button>

                {/* Orange Search Button */}
                <button 
                  onClick={runTopSearch}
                  className="h-full bg-[#d97746] hover:bg-[#c66534] text-white text-xs font-black px-5 border-l border-slate-200 transition-colors duration-200 cursor-pointer uppercase flex items-center gap-1"
                >
                  <Search size={12} className="stroke-[3px]" />
                  <span>Search</span>
                </button>

                {/* AI Intent Suggestions Dropdown */}
                {isTopSearchOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2.5 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left z-[100] animate-in fade-in slide-in-from-top-2">
                    <div className="p-3.5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2"><Zap size={12} className="text-orange-500"/> Suggested AI Services</span>
                      <button onClick={() => setIsTopSearchOpen(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600">Close</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto p-2 space-y-0.5">
                      {topSearchMatches
                        .slice(0, 5)
                        .map((s, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => { 
                              setTopSearchQuery(s.text); 
                              setActiveTab(s.tab); 
                              setIsTopSearchOpen(false); 
                            }} 
                            className="w-full text-left p-2.5 hover:bg-slate-50 rounded-xl flex items-center gap-3 transition border border-transparent hover:border-slate-100 cursor-pointer"
                          >
                            <div className="p-2 rounded-lg bg-orange-50 text-orange-600 shrink-0">
                              {renderSuggestionIcon(s.icon)}
                            </div>
                            <div>
                              <div className="font-bold text-xs text-slate-900">{s.text}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">{s.desc}</div>
                            </div>
                          </button>
                        ))
                      }
                      {topSearchMatches.length === 0 && (
                        <div className="p-4 text-center text-xs text-slate-400">
                          No specific matching services. Press Enter to ask the AI Navigator.
                        </div>
                      )}
                      
                      {/* Dynamic suggested options tags */}
                      <div className="border-t border-slate-100 p-2.5 mt-2 bg-slate-50/50 flex flex-wrap gap-1.5 items-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mr-1">Suggested:</span>
                        {quickSearchSuggestions.slice(0, 4).map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setTopSearchQuery(s.text);
                              setActiveTab(s.tab);
                              setIsTopSearchOpen(false);
                            }}
                            className="text-[10px] font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-100 hover:border-orange-200 px-2.5 py-1 rounded-full cursor-pointer transition whitespace-nowrap"
                          >
                            {s.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Controls (Language select, Notification bell, Sidebar toggle, and Avatar) */}
            <div className="flex items-center justify-end gap-2 md:gap-3">
              {/* Notification icon */}
              <div className="relative">
                <button onClick={() => setActiveTab("Official Alerts")} className="no-min-size p-2 text-slate-400 hover:text-orange-500 hover:bg-slate-50 rounded-xl transition cursor-pointer relative" title="Notifications">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                </button>
              </div>

              {/* Hamburger menu (Menu Icon next to profile avatar, toggling sidebar) */}
              <button 
                onClick={() => {
                  setIsSidebarCollapsed(!isSidebarCollapsed);
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition cursor-pointer shrink-0"
                title="Toggle Menu"
              >
                <Menu size={20} />
              </button>

              {/* Profile Avatar (Orange Circle with White Silhouette silhouette exactly as shown in reference image) */}
              <div className="relative group shrink-0">
                <button 
                  onClick={() => isSignedIn ? undefined : setShowSignInModal(true)} 
                  className="no-min-size w-9 h-9 rounded-full overflow-hidden border-2 border-orange-200 hover:border-orange-400 transition cursor-pointer shadow-md bg-gradient-to-tr from-[#FF9933] to-[#e07b39] flex items-center justify-center text-white" 
                  title="My Profile"
                >
                  {isSignedIn ? (
                    <img src="/api/avatar" alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <User size={18} className="text-white" />
                  )}
                </button>
                {isSignedIn && (
                  <div className="hidden group-hover:block absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden text-sm z-50 p-2 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-3 px-3 py-3 border-b border-slate-50 mb-1">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-200 shadow-sm shrink-0">
                        <img src="/api/avatar" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 text-sm truncate">{userName}</p>
                        <p className="text-[10px] text-slate-400 truncate">{userEmail}</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab("My Profile")} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700 font-medium cursor-pointer text-xs flex items-center gap-2"><User size={14} /> My Profile</button>
                    <button onClick={() => setActiveTab("Medical Profile")} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700 font-medium cursor-pointer text-xs flex items-center gap-2"><Heart size={14} /> Medical Profile</button>
                    <button onClick={() => setActiveTab("Settings")} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700 font-medium cursor-pointer text-xs flex items-center gap-2"><SettingsIcon size={14} /> Preferences</button>
                    <button onClick={() => setShowUserAgreement(true)} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700 font-medium flex items-center justify-between cursor-pointer text-xs">
                      <span className="flex items-center gap-2"><Info size={14} /> User Agreement</span>
                    </button>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <button onClick={() => { setIsSignedIn(false); setActiveTab("Welcome"); }} className="w-full text-left px-3 py-2 hover:bg-red-50 rounded-lg text-red-500 font-bold cursor-pointer text-xs flex items-center gap-2"><X size={14} /> Sign Out</button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Mobile Search */}
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200/80 px-3 pb-3 shadow-sm relative z-[43]">
            <div className="relative">
              <div className="flex items-center h-11 bg-white border border-slate-300 rounded-xl overflow-hidden shadow-inner focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-[116px] h-full bg-slate-50 text-slate-700 font-black text-[10px] px-2 outline-none border-r border-slate-200"
                  aria-label="Search category"
                >
                  <option value="All">All</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Medical">Medical</option>
                  <option value="Relief">Relief</option>
                  <option value="Safety">Safety</option>
                  <option value="Directory">Directory</option>
                </select>
                <input
                  type="text"
                  value={topSearchQuery}
                  onChange={(e) => setTopSearchQuery(e.target.value)}
                  onFocus={() => setIsTopSearchOpen(true)}
                  onKeyDown={(e) => { if (e.key === "Enter") runTopSearch(); }}
                  placeholder="Search emergency help..."
                  className="min-w-0 flex-1 bg-transparent px-3 text-[13px] font-semibold text-slate-800 outline-none placeholder-slate-400"
                />
                <button onClick={() => setActiveTab("Voice Assistant")} className="no-min-size h-full px-2 text-slate-400 hover:text-orange-500 transition cursor-pointer" title="Voice Search">
                  <Mic size={15} />
                </button>
                <button
                  onClick={runTopSearch}
                  className="no-min-size h-full w-12 bg-[#d97746] hover:bg-[#c66534] text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Search"
                >
                  <Search size={16} className="stroke-[3px]" />
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto pt-2 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {quickSearchSuggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setTopSearchQuery(s.text);
                      setActiveTab(s.tab);
                      setIsTopSearchOpen(false);
                    }}
                    className="shrink-0 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-[10px] font-black text-orange-700 shadow-sm"
                  >
                    {s.text}
                  </button>
                ))}
              </div>

              {isTopSearchOpen && (
                <div className="absolute top-[3.25rem] left-0 right-0 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left z-[100] animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 border-b border-slate-100 bg-slate-50/80 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-2"><Zap size={12} className="text-orange-500"/> Suggestions</span>
                    <button onClick={() => setIsTopSearchOpen(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600">Close</button>
                  </div>
                  <div className="max-h-72 overflow-y-auto p-2 space-y-1">
                    {topSearchMatches.slice(0, 6).map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setTopSearchQuery(s.text);
                          setActiveTab(s.tab);
                          setIsTopSearchOpen(false);
                        }}
                        className="w-full text-left p-2.5 hover:bg-slate-50 rounded-xl flex items-center gap-3 transition border border-transparent hover:border-slate-100 cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-orange-50 text-orange-600 shrink-0">
                          {renderSuggestionIcon(s.icon)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-slate-900 truncate">{s.text}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">{s.desc}</div>
                        </div>
                      </button>
                    ))}
                    {topSearchMatches.length === 0 && (
                      <div className="p-4 text-center text-xs text-slate-400">
                        No specific matching services. Press Enter to ask the AI Navigator.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {isTopSearchOpen && <div className="fixed inset-0 z-[44] bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10 backdrop-blur-sm transition-all cursor-default" onClick={() => setIsTopSearchOpen(false)}></div>}

        {/* Emergency Banner */}
        <AnimatePresence>
          {showEmergencyBanner && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0, padding: 0 }}
              className="w-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white text-xs md:text-sm font-extrabold py-3.5 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between shadow-lg shadow-red-500/20 relative z-30 shrink-0"
            >
              <div className="flex flex-col md:flex-row items-center gap-2.5 md:gap-3 mx-auto text-center justify-center pr-8 md:pr-0">
                <div className="flex items-center gap-2 justify-center">
                  <AlertTriangle size={18} className="animate-pulse text-yellow-300 shrink-0" />
                  <span className="tracking-wide">CRITICAL ALERT: FLASH FLOOD WARNING FOR DOWNTOWN AREA. EVACUATION ROUTES ACTIVE.</span>
                </div>
                <button onClick={() => setActiveTab("Live Map")} className="no-min-size bg-white text-red-600 hover:bg-red-50 px-4 py-1.5 rounded-full text-xs font-black transition shadow-md hover:scale-105 active:scale-95 cursor-pointer shrink-0">View Map &rarr;</button>
              </div>
              <button 
                onClick={() => setShowEmergencyBanner(false)} 
                className="no-min-size absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1.5 hover:bg-white/20 rounded-full transition cursor-pointer"
                title="Dismiss Alert"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`flex-1 overflow-y-auto ${activeTab === "Welcome" ? "p-0" : "p-4 md:p-8"} space-y-8 pb-0 relative`} style={{ background: 'linear-gradient(180deg, #faf5ff 0%, #f0fdfa 50%, #f0f4ff 100%)' }}>
          
          {activeTab === "Welcome" && <WelcomeTab setActiveTab={setActiveTab} setShowAccessibilityPanel={setShowAccessibilityPanel} />}
          {activeTab === "Home" && <HomeTab setActiveTab={setActiveTab} />}
          {activeTab === "AI Navigator" && <AIAssistant />}
          {activeTab === "SOS Center" && <SOSCenter />}
          {activeTab === "Live Map" && <EmergencyRadar />}
          {activeTab === "Disaster Prediction" && <DisasterPrediction />}
          {activeTab === "Weather Alerts" && <WeatherAlerts />}
          {activeTab === "Safe Route" && <SafeRoute />}
          {activeTab === "Notification Center" && <NotificationCenter />}
          {activeTab === "OCR Scanner" && <OCRScanner />}
          {activeTab === "Analytics Dashboard" && <AnalyticsDashboard />}
          {activeTab === "Voice Assistant" && <VoiceAssistant />}
          {activeTab === "Settings" && <SettingsTab />}
          {activeTab === "Emergency Plans" && <EmergencyPlansAdvanced />}
          {activeTab === "Documents Vault" && <DocumentsVaultAdvanced />}
          {activeTab === "Official Alerts" && <OfficialAlertsTab />}
          {activeTab === "Agency Directory" && <AgencyDirectoryTab />}
          {activeTab === "Legal Aid" && <LegalAidTab />}
          {activeTab === "Disaster Relief" && <DisasterReliefTab />}
          {activeTab === "Admin Dashboard" && <AdminDashboardAdvanced />}
          {activeTab === "Volunteer Portal" && <VolunteerPortalAdvanced />}
          {activeTab === "Medical Profile" && <MedicalProfileAdvanced />}
          {activeTab === "My Profile" && <ProfileSetupWizard />}
          {activeTab === "Emergency Contacts" && <EmergencyContactsAdvanced />}
          {activeTab === "Calendar" && <CalendarTab />}
          {activeTab === "Our Team" && <OurTeamTab />}
          {activeTab === "Website Policies" && <WebsitePoliciesTab />}

          {/* Global Footer (shown on all content tabs, hidden on full-screen tools like Map/AI Chat/SOS) */}
          {!["Live Map", "AI Navigator", "SOS Center"].includes(activeTab) && <Footer setActiveTab={setActiveTab} />}
        </div>

        {/* Floating AI Button */}
        {activeTab !== "AI Navigator" && (
          <button 
            onClick={() => setActiveTab("AI Navigator")}
            className="fixed bottom-14 md:bottom-8 right-4 md:right-8 bg-gradient-to-br from-fuchsia-500 to-cyan-500 hover:from-fuchsia-600 hover:to-cyan-600 text-white p-3.5 md:p-4 rounded-full shadow-xl shadow-fuchsia-300/50 flex items-center justify-center transition-all hover:scale-110 group z-50 cursor-pointer border-2 border-white/50"
          >
            <Zap size={20} className="md:w-6 md:h-6" />
            <span className="absolute right-full mr-4 bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none hidden md:block">
              Talk to AI Assistant
            </span>
          </button>
        )}

        {/* User Agreement Modal */}
        <AnimatePresence>
          {showUserAgreement && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowUserAgreement(false)}
            >
              <motion.div 
                initial={{ y: 20, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 p-6 text-white text-center relative">
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
        <CitizenLoginModal 
          isOpen={showSignInModal} 
          onClose={() => setShowSignInModal(false)}
          onLogin={(name, email) => {
            setUserName(name);
            setUserEmail(email);
            setIsSignedIn(true);
            setShowSignInModal(false);
          }}
        />

        {/* Accessibility Panel */}
        <AccessibilityPanel 
          isOpen={showAccessibilityPanel} 
          onClose={() => setShowAccessibilityPanel(false)} 
        />

        {/* Not Signed In Banner */}
        {!isSignedIn && (
          <div className="fixed top-0 left-0 right-0 z-[90] bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white py-2 px-4 flex items-center justify-center gap-3 shadow-lg shadow-fuchsia-200/50">
            <Lock size={14} />
            <span className="text-xs md:text-sm font-bold">You're not signed in. Some features may be limited.</span>
            <button onClick={() => setShowSignInModal(true)} className="px-3 py-1 bg-white text-slate-600 font-bold rounded-lg text-xs hover:bg-slate-50 transition cursor-pointer">Sign In</button>
          </div>
        )}

        {/* Mobile Bottom Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/80 flex items-center justify-around h-14 shadow-[0_-8px_30px_rgb(0,0,0,0.06)] px-2">
          <button 
            onClick={() => setActiveTab("Welcome")} 
            className={`flex flex-col items-center justify-center transition-all ${
              activeTab === "Welcome" ? "text-indigo-600 font-black scale-105" : "text-slate-500 hover:text-slate-750"
            }`}
          >
            <LayoutGrid size={20} className={activeTab === "Welcome" ? "text-indigo-600" : "text-slate-500"} />
            <span className="text-[9px] mt-1 font-bold">Welcome</span>
          </button>
          <button 
            onClick={() => setActiveTab("Home")} 
            className={`flex flex-col items-center justify-center transition-all ${
              activeTab === "Home" ? "text-indigo-600 font-black scale-105" : "text-slate-500 hover:text-slate-750"
            }`}
          >
            <Home size={20} className={activeTab === "Home" ? "text-indigo-600" : "text-slate-500"} />
            <span className="text-[9px] mt-1 font-bold">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab("Live Map")} 
            className={`flex flex-col items-center justify-center transition-all ${
              activeTab === "Live Map" ? "text-indigo-600 font-black scale-105" : "text-slate-500 hover:text-slate-750"
            }`}
          >
            <Map size={20} className={activeTab === "Live Map" ? "text-indigo-600" : "text-slate-500"} />
            <span className="text-[9px] mt-1 font-bold">Live Map</span>
          </button>
          <button 
            onClick={() => setActiveTab("SOS Center")} 
            className={`flex flex-col items-center justify-center transition-all relative ${
              activeTab === "SOS Center" ? "text-red-600 font-black scale-105" : "text-slate-500 hover:text-red-550"
            }`}
          >
            <AlertTriangle size={20} className={activeTab === "SOS Center" ? "text-red-600 animate-pulse" : "text-slate-500"} />
            <span className="absolute top-0.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
            <span className="text-[9px] mt-1 font-bold">SOS</span>
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className={`flex flex-col items-center justify-center transition-all ${
              isMobileMenuOpen ? "text-fuchsia-600 scale-105" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Menu size={20} className={isMobileMenuOpen ? "text-fuchsia-600" : "text-slate-500"} />
            <span className="text-[9px] mt-1 font-bold">More</span>
          </button>
        </div>
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
    <div className="fixed inset-0 bg-gradient-to-br from-white via-blue-50 to-pink-50 text-slate-800 flex flex-col items-center justify-center z-[100] overflow-hidden">
      {/* 3D Grid Ground Plane */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden pointer-events-none opacity-40 z-0">
        <div className="w-[200%] h-[200%] left-[-50%] top-0 absolute" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(65deg)',
          transformOrigin: 'center top',
          maskImage: 'linear-gradient(to bottom, transparent 10%, black 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 10%, black 80%)'
        }}></div>
      </div>

      {/* Rotating 3D Orbits */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-200/20 rounded-full animate-[spin_60s_linear_infinite] z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-[2px] shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-pink-300/25 rounded-full animate-[spin_40s_linear_infinite_reverse] z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full blur-[2px] shadow-[0_0_15px_rgba(236,72,153,0.6)]"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-emerald-300/30 rounded-full animate-[spin_20s_linear_infinite] z-0">
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-[2px] shadow-[0_0_15px_rgba(16,185,129,0.6)]"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* 3D Animated Logo Container */}
        <motion.div 
          animate={{ 
            rotateY: [0, 15, -15, 0], 
            rotateX: [0, 10, -10, 0], 
            y: [0, -10, 10, 0] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8, 
            ease: "easeInOut" 
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="w-24 h-24 rounded-2xl mb-6 shadow-2xl shadow-blue-500/10 overflow-hidden border-2 border-white bg-white p-1 flex items-center justify-center relative group z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img src="/api/logo" alt="GovAssist AI" className="w-[85%] h-[85%] object-contain" />
        </motion.div>

        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-slate-900">GovAssist<span className="text-blue-600"> AI</span></h1>
        <p className="text-lg font-medium text-slate-500 mb-12 text-center px-4">Initializing Emergency Response Network...</p>
        
        <div className="h-6 overflow-hidden mb-6 w-full flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={textIndex} 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: -20, opacity: 0 }} 
              transition={{ duration: 0.2 }}
              className="text-sm text-pink-500 font-bold font-mono tracking-wider uppercase text-center"
            >
              {loadingTexts[textIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: "0%" }} 
            animate={{ width: "100%" }} 
            transition={{ duration: 4.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-blue-500 via-emerald-400 to-pink-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)]"
          ></motion.div>
        </div>
        <div className="mt-3 text-xs font-mono text-slate-400">SYS_BOOT_v1.0.4 // ENCRYPTED</div>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-3 w-full">
        <div className="text-slate-500 text-sm font-medium tracking-widest uppercase text-center">
          &ldquo;Smarter Government. Stronger Citizens.&rdquo;
        </div>
        <div className="flex items-center gap-2.5 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-blue-100 hover:border-pink-300 transition-colors shadow-sm">
          <div className="w-7 h-7 rounded-lg overflow-hidden border border-slate-100 shadow-sm bg-white shrink-0 p-0.5">
            <img src="/api/team-logo" alt="IT" className="w-full h-full object-contain" />
          </div>
          <span className="text-xs font-bold text-slate-600">Developed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-rose-500 to-cyan-500 font-extrabold">INNOVATOR TEAM</span></span>
        </div>
      </div>
    </div>
  )
}

const teamMembers = [
  {
    name: "Ranjeet Kumar",
    role: "Team Leader & Architect",
    email: "rajranjeet7680@gmail.com",
    degree: "Bachelor Of Technology (b.tech)",
    college: "IIT ROORKEE",
    hack2skill: "https://hack2skill.com/dashboard/user_public_profile/?userId=6817753bbd3f11d6144699e1&tabIndex=about&utm_source=hack2skill&utm_medium=homepage",
    initials: "RK",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    isLeader: true
  },
  {
    name: "Dhanush",
    role: "Systems Engineer",
    email: "dhanushs99777@gmail.com",
    degree: "Bachelor Of Technology (b.tech)",
    college: "AMRITA VISHWA VIDHYAPEETHAM CAMPUS",
    hack2skill: "https://hack2skill.com/dashboard/user_public_profile/?userId=6a0c0b114f987adad8760e48&tabIndex=about&utm_source=hack2skill&utm_medium=homepage",
    initials: "D",
    gradient: "from-blue-400 via-indigo-500 to-violet-500",
    isLeader: false
  },
  {
    name: "Sahil Thakur",
    role: "AI Developer",
    email: "sahilthakur2953@gmail.com",
    degree: "Bachelor Of Science (b.sc)",
    college: "JAYPEE UNIVERSITY OF INFO. TECH.",
    collegeSub: "SOLAN, HIMACHAL PRADESH 173234",
    hack2skill: "https://hack2skill.com/dashboard/user_public_profile/?userId=67e53ed0f17eac942114cb86&tabIndex=about&utm_source=hack2skill&utm_medium=homepage",
    initials: "ST",
    gradient: "from-cyan-400 via-teal-500 to-emerald-500",
    isLeader: false
  },
  {
    name: "Bathula Chinmai Pavani",
    role: "Core QA & Developer",
    email: "bathulachinmaipavani@gmail.com",
    degree: "Bachelor Of Technology (b.tech)",
    college: "Avanthi Institute of Eng. & Tech.",
    collegeSub: "Tamaram Village, Narsipatnam",
    hack2skill: "https://hack2skill.com/dashboard/user_public_profile/?userId=6867912176ce14837dd82506&tabIndex=about&utm_source=hack2skill&utm_medium=homepage",
    initials: "BP",
    gradient: "from-fuchsia-400 via-pink-500 to-rose-500",
    isLeader: false
  }
];

function WelcomeTab({ setActiveTab, setShowAccessibilityPanel }: any) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isWelcomeSearchOpen, setIsWelcomeSearchOpen] = useState(false);
  const slides = [
    { title: "Women First, Safety Always", desc: "Priority SOS guidance, trusted contacts, and live routing for safer movement and immediate response.", color: "from-rose-500 via-pink-500 to-fuchsia-500", action: "SOS Center", badge: "Safety First", image: "/women-first-safety.png" },
    { title: "National Emergency Response Mission", desc: "AI-powered citizen emergency assistance for faster response and seamless service delivery.", color: "from-fuchsia-500 via-rose-500 to-orange-500", action: "SOS Center", badge: "Mission Control", image: "/national-emergency-response.png" },
    { title: "National Flood Alert", desc: "Heavy rainfall expected in coastal regions. NDRF response and relief camp tracking are active.", color: "from-cyan-500 via-blue-500 to-indigo-500", action: "Live Map", badge: "Active Alert", image: "/national-flood-alert.png" },
    { title: "Cyber Fraud Awareness", desc: "Never share OTPs, passwords, or remote access. Dial 1930 immediately if defrauded.", color: "from-violet-500 via-purple-500 to-fuchsia-500", action: "Legal Aid", badge: "Cyber Safety", image: "/cyber-fraud-awareness.png" },
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full min-h-screen pb-24 text-slate-800 bg-gradient-to-br from-slate-50 via-white to-slate-100">

      <div className="relative w-full min-h-[520px] md:min-h-[520px] md:h-[560px] bg-cover bg-center overflow-hidden flex flex-col md:flex-row transition-all duration-700 shadow-inner px-4 py-8 md:p-0" style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}>
        {/* Subtle, highly transparent overlay with very low blur to keep background image sharp and colorful */}
        <div className="absolute inset-0 bg-slate-950/35 backdrop-blur-[1px] pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/78 to-white/5 pointer-events-none z-0"></div>
        {/* Vibrant color gradient mask to tint the background image */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${slides[currentSlide].color} opacity-[0.04] transition-opacity duration-700 mix-blend-normal pointer-events-none z-0`}></div>
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay pointer-events-none"></div>
        
        {/* Floating Live Alert Badge */}
        <div className="absolute top-4 right-4 md:top-6 md:right-12 z-30 bg-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-lg flex items-center gap-2 animate-pulse border border-red-400/50 hover:scale-105 transition cursor-pointer">
          <span className="w-2 h-2 rounded-full bg-white animate-ping absolute left-2.5"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-white ml-0"></span>
          <span className="text-[10px] md:text-xs font-black uppercase tracking-wider">LIVE &bull; NDRF ACTIVE</span>
        </div>

        {/* Left Content */}
        <div className="relative z-20 w-full md:w-[55%] flex flex-col justify-center text-slate-800 md:pl-16 px-4 md:px-0">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide} 
              initial={{ opacity: 0, x: -15 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 15 }} 
              transition={{ duration: 0.4 }}
              className="bg-white/88 backdrop-blur-xl border border-white/70 rounded-[1.75rem] p-6 sm:p-8 md:p-10 shadow-[0_24px_70px_rgba(15,23,42,0.16)] max-w-xl"
            >
              <span className="bg-slate-900/10 backdrop-blur-md px-3.5 py-1 rounded-full text-[9px] md:text-[10px] font-black w-max mb-4 md:mb-6 tracking-[0.2em] uppercase border border-slate-900/20 inline-block shadow-sm text-slate-800">
                {slides[currentSlide].badge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[3.5rem] font-black mb-4 md:mb-5 leading-[1.15] drop-shadow-sm tracking-tight text-slate-900">{slides[currentSlide].title}</h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 md:text-slate-700 mb-6 md:mb-10 font-medium max-w-lg leading-relaxed">{slides[currentSlide].desc}</p>
              
              <div className="flex flex-col gap-3 md:gap-4">
                <button onClick={() => setActiveTab(slides[currentSlide].action)} className="w-full sm:w-auto bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 hover:from-red-700 hover:via-rose-600 hover:to-orange-600 text-white font-extrabold px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-transparent">
                  Need Help Now
                </button>
                <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-row sm:gap-3">
                  <button onClick={() => setActiveTab("Home")} className="bg-white/80 backdrop-blur-md hover:bg-white border-2 border-slate-200/80 hover:border-slate-300 text-slate-800 font-extrabold px-4 sm:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-xs md:text-sm uppercase tracking-wider shadow-sm flex items-center justify-center whitespace-nowrap">
                    <span className="sm:hidden">Services</span>
                    <span className="hidden sm:inline">Explore Services</span>
                  </button>
                  <button onClick={() => setActiveTab("Our Team")} className="bg-white/80 backdrop-blur-md hover:bg-white border-2 border-slate-200/80 hover:border-slate-300 text-slate-800 font-extrabold px-4 sm:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-xs md:text-sm uppercase tracking-wider shadow-sm flex items-center justify-center whitespace-nowrap">
                    <span className="sm:hidden">Meet Team</span>
                    <span className="hidden sm:inline">Meet the Team</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Image Thumbnail */}
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center overflow-visible perspective-[1000px] pr-12">
          <motion.div
            key={currentSlide}
            initial={{ scale: 0.94, opacity: 0, rotateY: 10 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.65, type: "spring" }}
            className="relative w-full max-w-xl aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/70 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.28)]"
          >
            <img
              src={slides[currentSlide].image}
              className="w-full h-full object-cover"
              alt={slides[currentSlide].title}
            />
            <div className={`absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t ${slides[currentSlide].color} text-white`}>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-90">{slides[currentSlide].badge}</div>
              <div className="text-xl font-black tracking-tight mt-1">{slides[currentSlide].title}</div>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-16 flex gap-2.5 z-30">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className="no-min-size h-2 rounded-full transition-all duration-300 cursor-pointer bg-slate-350 w-2 data-[active=true]:w-8 data-[active=true]:bg-indigo-600 data-[active=true]:shadow-[0_0_10px_rgba(79,70,229,0.3)]" data-active={i === currentSlide}></button>
          ))}
        </div>
      </div>

      {/* Live Stats Strip */}
      <div className="relative z-10 -mt-6 px-6 md:px-12 max-w-7xl xl:max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => {
            const colors: Record<string, { bg: string, text: string, border: string, shadow: string, hoverIcon: string }> = {
              "text-red-600": { bg: "bg-red-50 text-red-500", text: "text-red-500", border: "border-red-100", shadow: "shadow-red-500/5", hoverIcon: "group-hover:bg-red-600 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]" },
              "text-blue-600": { bg: "bg-blue-50 text-blue-500", text: "text-blue-500", border: "border-blue-100", shadow: "shadow-blue-500/5", hoverIcon: "group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]" },
              "text-emerald-600": { bg: "bg-emerald-50 text-emerald-500", text: "text-emerald-500", border: "border-emerald-100", shadow: "shadow-emerald-500/5", hoverIcon: "group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(5,150,105,0.3)]" },
              "text-amber-600": { bg: "bg-amber-50 text-amber-500", text: "text-amber-500", border: "border-amber-100", shadow: "shadow-amber-500/5", hoverIcon: "group-hover:bg-amber-600 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(217,119,6,0.3)]" }
            };
            const c = colors[s.color] || colors["text-blue-600"];
            return (
              <div key={i} className={`flex items-center gap-2.5 sm:gap-4 bg-white/95 backdrop-blur-md border border-slate-200/80 p-3 sm:p-5 rounded-2xl hover:bg-white hover:scale-[1.03] hover:shadow-xl ${c.shadow} transition-all duration-300 group cursor-default`}>
                <div className={`p-2.5 sm:p-4 rounded-xl transition-all duration-300 ${c.bg} ${c.text} ${c.hoverIcon} border ${c.border} shrink-0`}>
                  {s.icon}
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-black text-slate-800 leading-none mb-1 sm:mb-1.5 tracking-tight">{s.value}</div>
                  <div className="text-[9px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Advanced AI Search Section */}
      <div className="px-6 md:px-12 py-12">
        <div className="max-w-6xl xl:max-w-[1300px] mx-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(148,163,184,0.15)] relative overflow-hidden">
            {/* Soft glowing orb background effects for light mode */}
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-fuchsia-100/50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-100/50 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 text-fuchsia-600 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4 border border-fuchsia-200 shadow-sm">
                <Zap size={14} className="text-fuchsia-500 animate-pulse"/> AI-Powered Assistance
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">How can GovAssist help you today?</h3>
              <p className="text-slate-500 mt-3 text-base md:text-lg max-w-2xl mx-auto font-medium">Describe what you need. Our AI will instantly route you to the correct government service.</p>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-[2rem] shadow-sm group focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100/50 transition-all flex flex-col md:flex-row items-center gap-2">
                <div className="flex items-center w-full md:w-auto px-4 md:px-0 md:pl-4 gap-3">
                  <button className="no-min-size text-slate-400 hover:text-indigo-600 transition cursor-pointer hover:scale-110 active:scale-95" title="Voice Input"><Mic size={22} /></button>
                  <button className="no-min-size text-slate-400 hover:text-indigo-600 transition cursor-pointer hover:scale-110 active:scale-95" title="Camera Input"><Camera size={22} /></button>
                  <button className="no-min-size text-slate-400 hover:text-indigo-600 transition cursor-pointer hover:scale-110 active:scale-95" title="Add Location"><MapPin size={22} /></button>
                </div>
                <input 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  onFocus={() => setIsWelcomeSearchOpen(true)}
                  type="text" 
                  placeholder="Describe your emergency or request (e.g., medical emergency, water logging, file cyber report)..." 
                  className="w-full bg-transparent border-none outline-none py-3 px-4 md:px-6 text-base md:text-lg font-medium text-slate-800 placeholder-slate-400" 
                />
                <button onClick={() => setActiveTab("AI Navigator")} className="btn w-full md:w-auto bg-gradient-to-r from-indigo-600 via-indigo-50 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-black py-4 px-8 rounded-2xl flex justify-center items-center gap-2 transition cursor-pointer shadow-lg shadow-indigo-600/20 whitespace-nowrap hover:scale-102 active:scale-98">
                  Analyze <Zap size={18} className="animate-pulse" />
                </button>
              </div>

              {/* Autocomplete / dynamic suggestions dropdown for main Welcome search */}
              {isWelcomeSearchOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left z-[100] animate-in fade-in slide-in-from-top-2">
                  <div className="p-3.5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2"><Zap size={12} className="text-indigo-500"/> Suggested AI Services</span>
                    <button onClick={() => setIsWelcomeSearchOpen(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600">Close</button>
                  </div>
                  <div className="max-h-72 overflow-y-auto p-2 space-y-0.5">
                    {searchSuggestions
                      .filter(s => {
                        const q = searchQuery.toLowerCase();
                        return !q || s.text.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
                      })
                      .slice(0, 5)
                      .map((s, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => { 
                            setSearchQuery(s.text); 
                            setActiveTab(s.tab); 
                            setIsWelcomeSearchOpen(false); 
                          }} 
                          className="w-full text-left p-2.5 hover:bg-slate-50 rounded-xl flex items-center gap-3 transition border border-transparent hover:border-slate-100 cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                            {renderSuggestionIcon(s.icon)}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900">{s.text}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{s.desc}</div>
                          </div>
                        </button>
                      ))
                    }
                    {searchSuggestions.filter(s => {
                      const q = searchQuery.toLowerCase();
                      return !q || s.text.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
                    }).length === 0 && (
                      <div className="p-4 text-center text-xs text-slate-400">
                        No specific services found. Click Analyze to ask the AI Navigator.
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap justify-center items-center gap-2.5 mt-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mr-2">Quick Triggers:</span>
                <span onClick={() => { setSearchQuery("My father is unconscious"); setIsWelcomeSearchOpen(true); }} className="bg-slate-100 hover:bg-indigo-50/50 hover:text-indigo-600 hover:border-indigo-200 text-slate-600 text-xs font-semibold px-4 py-2 rounded-full border border-slate-200 cursor-pointer transition-all duration-200">"My father is unconscious"</span>
                <span onClick={() => { setSearchQuery("Phone stolen"); setIsWelcomeSearchOpen(true); }} className="bg-slate-100 hover:bg-indigo-50/50 hover:text-indigo-600 hover:border-indigo-200 text-slate-600 text-xs font-semibold px-4 py-2 rounded-full border border-slate-200 cursor-pointer transition-all duration-200">"Phone stolen"</span>
                <span onClick={() => { setSearchQuery("Flood in my area"); setIsWelcomeSearchOpen(true); }} className="bg-slate-100 hover:bg-indigo-50/50 hover:text-indigo-600 hover:border-indigo-200 text-slate-600 text-xs font-semibold px-4 py-2 rounded-full border border-slate-200 cursor-pointer transition-all duration-200">"Flood in my area"</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Grid Section */}
      <div className="px-6 md:px-12 py-8 max-w-7xl xl:max-w-[1400px] mx-auto">
        <div className="text-center md:text-left mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">Explore OS Directory</span>
            <h4 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-2 tracking-tight">Citizen Core Emergency Services</h4>
          </div>
          <p className="text-slate-500 text-sm max-w-md">Access localized emergency assistance, scheme directories, medical status tools, and disaster relief portals instantly.</p>
        </div>
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

      {/* Developer Team Section */}
      <div className="px-6 md:px-12 pb-24 mt-12 max-w-7xl xl:max-w-[1400px] mx-auto">
        <div className="border-t border-slate-200 pt-16">
          <div className="text-center mb-10">
            <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4 border border-indigo-100 inline-block shadow-sm">
              <Award size={12} className="inline mr-1" /> HACK4SOC 3.0 INNOVATOR TEAM
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">The Minds Behind GovAssist AI</h3>
            <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto">Built with passion by 4 engineers to revolutionize citizen emergency services.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between items-center text-center relative overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Accent Gradient Border */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${member.gradient} rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10`}></div>
                
                <div className="relative flex flex-col items-center w-full">
                  {member.isLeader && (
                    <div className="absolute -top-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-black text-[8px] tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5 z-20">
                      <Star size={8} className="fill-current" /> Leader
                    </div>
                  )}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${member.gradient} p-0.5 mb-3 shadow-md flex items-center justify-center`}>
                    <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center font-black text-lg text-slate-700">
                      {member.initials}
                    </div>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-850 leading-tight">{member.name}</h4>
                  <p className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-indigo-600 uppercase tracking-wider mt-1.5">{member.role}</p>
                </div>
                
                <div className="w-full border-t border-slate-100 pt-3 mt-4 text-[10px] text-slate-500 flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 font-semibold text-slate-600 w-full justify-center">
                    <GraduationCap size={12} className="text-blue-500 shrink-0" />
                    <span className="truncate max-w-[170px]" title={member.college}>{member.college}</span>
                  </div>
                  <div className="flex gap-2 w-full mt-3">
                    <a href={`mailto:${member.email}`} className="no-min-size flex-1 py-1.5 bg-slate-50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white rounded-lg transition text-[10px] font-bold flex items-center justify-center gap-1 text-slate-500 border border-slate-200 cursor-pointer">
                      <Mail size={10} /> Mail
                    </a>
                    <a href={member.hack2skill} target="_blank" rel="noopener noreferrer" className="no-min-size flex-1 py-1.5 bg-slate-50 hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-rose-600 hover:text-white rounded-lg transition text-[10px] font-bold flex items-center justify-center gap-1 text-slate-500 border border-slate-200 cursor-pointer">
                      <ExternalLink size={10} /> Profile
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button onClick={() => setActiveTab("Our Team")} className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold px-8 py-3 rounded-2xl hover:from-fuchsia-600 hover:to-cyan-600 transition hover:-translate-y-0.5 cursor-pointer text-sm shadow-md flex items-center gap-2 mx-auto">
              Meet the Innovators <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ServiceTile({icon, title, desc, color, onClick}: any) {
  const colorClasses: Record<string, string> = {
    red: "text-rose-600 bg-rose-50 border-rose-100 group-hover:bg-rose-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]",
    slate: "text-violet-600 bg-violet-50 border-violet-100 group-hover:bg-violet-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]",
    blue: "text-cyan-600 bg-cyan-50 border-cyan-100 group-hover:bg-cyan-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    amber: "text-amber-600 bg-amber-50 border-amber-100 group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    purple: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100 group-hover:bg-fuchsia-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(217,70,239,0.3)]",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]",
    teal: "text-teal-600 bg-teal-50 border-teal-100 group-hover:bg-teal-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]",
  };

  return (
    <button onClick={onClick} className="bg-white border-2 border-slate-100 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3 shadow-md hover:shadow-xl hover:border-slate-200 md:hover:-translate-y-2 active:scale-95 transition-all duration-300 group cursor-pointer md:card-3d min-h-[140px] md:min-h-[160px]">
      <div className={`p-3 md:p-4 rounded-2xl transition-all duration-300 border ${colorClasses[color]}`}>{icon}</div>
      <div className="text-center">
        <div className="font-extrabold text-slate-800 text-sm md:text-base mb-1 group-hover:text-slate-950">{title}</div>
        <div className="text-xs font-semibold text-slate-400 group-hover:text-slate-500 transition-colors">{desc}</div>
      </div>
    </button>
  )
}

function HomeTab({ setActiveTab }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Advanced Gateway Hero (Dashboard) */}
      <section className="bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-fuchsia-100/30 border border-slate-200 flex flex-col lg:flex-row relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-fuchsia-50/30 to-cyan-50/30 z-0"></div>
        
        {/* Left Side: Main Interaction */}
        <div className="relative z-10 lg:w-3/5 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-fuchsia-600 uppercase bg-fuchsia-50 px-3 py-1.5 rounded-full border border-fuchsia-200 shadow-sm">
                <Shield size={14} className="text-fuchsia-500" /> Secure Government Gateway
              </div>
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition">
                <CheckCircle size={14} /> PM Modi <ChevronDown size={14} />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-[4rem] font-extrabold text-slate-900 leading-[1.05] mb-6 tracking-tight">
              Right government help,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-500">right now.</span>
            </h1>
            
            <p className="text-slate-500 text-lg font-medium max-w-lg mb-10 leading-relaxed">
              Immediate AI-guided assistance for emergencies, legal aid, and disaster recovery. Powered by verified official data.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-3xl mb-12">
              <div className="flex items-center gap-2 px-3 pt-2 pb-3 flex-wrap">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Examples:</span>
                <span className="bg-white text-slate-600 text-xs font-medium px-4 py-1.5 rounded-full border border-slate-200 cursor-pointer hover:bg-fuchsia-50 hover:text-fuchsia-600 hover:border-fuchsia-200 transition">"My father is unconscious"</span>
                <span className="bg-white text-slate-600 text-xs font-medium px-4 py-1.5 rounded-full border border-slate-200 cursor-pointer hover:bg-fuchsia-50 hover:text-fuchsia-600 hover:border-fuchsia-200 transition">"Phone stolen"</span>
                <span className="bg-white text-slate-600 text-xs font-medium px-4 py-1.5 rounded-full border border-slate-200 cursor-pointer hover:bg-fuchsia-50 hover:text-fuchsia-600 hover:border-fuchsia-200 transition">"Flood in my area"</span>
              </div>
              <div className="flex items-center bg-white rounded-2xl p-2 border border-slate-200">
                <button className="text-slate-400 hover:text-fuchsia-500 ml-3 transition cursor-pointer"><Mic size={20} /></button>
                <button className="text-slate-400 hover:text-fuchsia-500 ml-4 transition cursor-pointer"><Camera size={20} /></button>
                <button className="text-slate-400 hover:text-fuchsia-500 ml-4 transition cursor-pointer"><MapPin size={20} /></button>
                <input type="text" placeholder="Describe your emergency..." className="bg-transparent border-none outline-none flex-1 ml-5 text-slate-900 placeholder-slate-400 font-medium text-lg" />
                <button className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition shadow-lg shadow-fuchsia-200/50 cursor-pointer">
                  Analyze <Zap size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-medium">
            <Lock size={12} /> Your data is secure and used only to get you the right help.
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-100 pt-8">
            <div className="flex items-start gap-3">
              <div className="bg-emerald-100 p-2.5 rounded-full text-emerald-600 border border-emerald-200"><CheckCircle size={20} /></div>
              <div>
                <div className="text-slate-900 font-bold text-sm mb-1">Verified Data</div>
                <div className="text-slate-500 text-xs font-medium leading-relaxed">Information from official government sources</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-fuchsia-100 p-2.5 rounded-full text-fuchsia-600 border border-fuchsia-200"><Lock size={20} /></div>
              <div>
                <div className="text-slate-900 font-bold text-sm mb-1">Secure & Private</div>
                <div className="text-slate-500 text-xs font-medium leading-relaxed">End-to-end encryption and data protection</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-cyan-100 p-2.5 rounded-full text-cyan-600 border border-cyan-200"><CheckCircle size={20} /></div>
              <div>
                <div className="text-slate-900 font-bold text-sm mb-1">Always Available</div>
                <div className="text-slate-500 text-xs font-medium leading-relaxed">24/7 support when you need it most</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: How It Helps */}
        <div className="relative z-10 lg:w-2/5 bg-slate-50 border-l border-slate-100 p-8 md:p-12 flex flex-col">
          <h3 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-6">How it helps</h3>
          
          <div className="flex-1 flex flex-col gap-4">
            <HelpCard icon={<ShieldAlert size={20}/>} title="Emergency Response" desc="Get immediate guidance and connect with local emergency services." color="blue" />
            <HelpCard icon={<Scale size={20}/>} title="Legal Aid" desc="Find legal information and connect with verified legal assistance." color="emerald" />
            <HelpCard icon={<CloudRain size={20}/>} title="Disaster Recovery" desc="Access relief services, report damage and track support updates." color="indigo" />
            <HelpCard icon={<Phone size={20}/>} title="Helpline Directory" desc="Connect with verified helplines and essential services." color="amber" />
          </div>
          
          <div className="mt-8 bg-white border border-slate-200 p-6 rounded-2xl relative shadow-sm">
            <div className="text-fuchsia-300 font-serif text-5xl leading-none absolute -top-2 left-4">"</div>
            <p className="text-slate-600 text-sm font-serif italic leading-relaxed relative z-10 mt-3">
              Connecting citizens to services with integrity and speed. A digital twin for emergency response.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic AI Quick Actions Grid (Live Dashboard) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Severity Indicator */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-lg">
          <h3 className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
            <Activity size={16} className="text-fuchsia-500" /> Area Risk Scoring
          </h3>
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-fuchsia-400 flex items-center justify-center text-lg md:text-xl font-extrabold text-fuchsia-600 shadow-lg bg-white">
              68
            </div>
            <div>
              <div className="text-base md:text-lg font-bold text-slate-800">Elevated Risk</div>
              <div className="text-xs md:text-sm text-slate-500">Heavy rainfall detected in Sector 4</div>
            </div>
          </div>
          <div className="space-y-2 md:space-y-3">
            <div className="flex justify-between text-xs font-bold"><span className="text-slate-600">Flood Risk</span><span className="text-amber-600">Medium</span></div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden"><div className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full shadow-sm" style={{width: '68%'}}></div></div>
            
            <div className="flex justify-between text-xs font-bold mt-2 md:mt-3"><span className="text-slate-600">Medical Overload</span><span className="text-emerald-600">Low</span></div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden"><div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2 rounded-full shadow-sm" style={{width: '30%'}}></div></div>
          </div>
        </div>

        {/* Dynamic Actions Map */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3 md:mb-4">
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-800">Live AI Emergency Radar</h3>
              <p className="text-xs md:text-sm text-slate-500">Real-time resource allocation map</p>
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

function HelpCard({icon, title, desc, color}: any) {
  const colorClasses: Record<string, string> = {
    blue: "bg-cyan-100 text-cyan-600 border-cyan-200",
    emerald: "bg-emerald-100 text-emerald-600 border-emerald-200",
    indigo: "bg-violet-100 text-violet-600 border-violet-200",
    amber: "bg-amber-100 text-amber-600 border-amber-200"
  };
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">
      <div className={`p-3 rounded-full border ${colorClasses[color]}`}>{icon}</div>
      <div>
        <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
        <p className="text-slate-500 text-xs">{desc}</p>
      </div>
    </div>
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-8rem)] flex flex-col bg-white relative overflow-hidden rounded-2xl shadow-lg border border-slate-200">
      
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
          <div className="bg-gradient-to-br from-fuchsia-500 to-cyan-500 p-2.5 rounded-xl shadow-md"><Zap size={20} className="text-white" /></div>
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
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-[1100px] mx-auto space-y-6 pb-40 relative z-10 flex flex-col">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-4 w-full md:max-w-[55%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                
                {/* Avatar */}
                {msg.sender === "ai" && (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-fuchsia-200/50 border border-fuchsia-300/30">
                    <Shield size={18} />
                  </div>
                )}
                
                <div className={`flex flex-col gap-3 w-full ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  {/* Bubble */}
                  <div className={`p-5 shadow-sm text-[15px] leading-relaxed relative ${
                    msg.sender === "user" 
                      ? "bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white rounded-[24px] rounded-tr-sm text-right" 
                      : "bg-white border border-fuchsia-200 text-slate-800 rounded-[24px] rounded-tl-sm w-full"
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-fuchsia-200/50 border border-fuchsia-300/30">
                  <Shield size={18} />
                </div>
                <div className="p-4 bg-white border border-fuchsia-200 rounded-[24px] rounded-tl-sm shadow-sm flex items-center gap-2 text-slate-500 text-sm font-medium w-max">
                  GovAssist AI is analyzing <span className="flex gap-1 ml-1"><span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span><span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span><span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Composer */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-12 pb-6 px-4 md:px-8 z-30 pointer-events-none">
        <div className="max-w-[1000px] mx-auto pointer-events-auto">
          {/* Quick Actions (Horizontal Scroll) */}
          <div className="flex overflow-x-auto gap-2 mb-3 no-scrollbar pb-2">
            <button onClick={() => handleSend("Need ambulance immediately")} className="shrink-0 bg-white border border-red-200 hover:bg-red-50 text-slate-700 hover:text-red-600 px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"><HeartPulse size={14} className="text-red-500"/> Need Ambulance</button>
            <button onClick={() => handleSend("Report stolen phone")} className="shrink-0 bg-white border border-slate-200 hover:bg-blue-50 text-slate-700 hover:text-blue-600 px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"><ShieldAlert size={14} className="text-blue-500"/> Report Theft</button>
            <button onClick={() => handleSend("Where is the nearest flood shelter?")} className="shrink-0 bg-white border border-slate-200 hover:bg-cyan-50 text-slate-700 hover:text-cyan-600 px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"><Waves size={14} className="text-cyan-500"/> Find Shelter</button>
            <button onClick={() => handleSend("Bank account frozen")} className="shrink-0 bg-white border border-slate-200 hover:bg-amber-50 text-slate-700 hover:text-amber-600 px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"><Lock size={14} className="text-amber-500"/> Cyber Fraud</button>
          </div>

          {/* Premium Input Bar */}
          <div className="bg-white border-2 border-slate-200 shadow-lg p-2 rounded-[32px] flex items-center gap-2 transition-all focus-within:ring-4 focus-within:ring-fuchsia-100 focus-within:border-fuchsia-400">
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
              className="bg-gradient-to-br from-fuchsia-500 to-cyan-500 hover:from-fuchsia-600 hover:to-cyan-600 disabled:opacity-50 disabled:from-slate-400 disabled:to-slate-500 text-white p-3.5 rounded-full transition cursor-pointer flex items-center justify-center shadow-lg mr-1 border border-fuchsia-400/50"
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
        <button className="bg-white hover:bg-red-50 text-slate-700 rounded-3xl p-8 shadow-lg border border-red-200 transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center gap-4 group">
          <div className="bg-gradient-to-br from-red-500 to-rose-500 p-6 rounded-full group-hover:scale-110 transition-transform text-white">
            <HeartPulse size={64} />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black tracking-tight mb-1 text-slate-900">Ambulance</h3>
            <p className="font-medium text-red-500">Medical emergencies only</p>
          </div>
        </button>

        <button className="bg-white hover:bg-cyan-50 text-slate-700 rounded-3xl p-8 shadow-lg border border-cyan-200 transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center gap-4 group">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-6 rounded-full group-hover:scale-110 transition-transform text-white">
            <ShieldAlert size={64} />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black tracking-tight mb-1 text-slate-900">Police</h3>
            <p className="font-medium text-cyan-600">Crime in progress / Threat</p>
          </div>
        </button>

        <button className="bg-white hover:bg-amber-50 text-slate-700 rounded-3xl p-8 shadow-lg border border-amber-200 transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center gap-4 group">
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-6 rounded-full group-hover:scale-110 transition-transform text-white">
            <AlertTriangle size={64} />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black tracking-tight mb-1 text-slate-900">Fire / Rescue</h3>
            <p className="font-medium text-amber-600">Fire, accidents, trapped</p>
          </div>
        </button>

        <button className="bg-white hover:bg-violet-50 text-slate-700 rounded-3xl p-8 shadow-lg border border-violet-200 transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center gap-4 group">
          <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-6 rounded-full group-hover:scale-110 transition-transform text-white">
            <Volume2 size={64} />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black tracking-tight mb-1 text-slate-900">Silent Panic</h3>
            <p className="font-medium text-violet-500">Sends location secretly to contacts</p>
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
            <div className="bg-gradient-to-r from-fuchsia-50 via-violet-50 to-cyan-50 border border-fuchsia-200 text-slate-900 rounded-xl p-6 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-lg mb-1 text-fuchsia-700">District Emergency Pack</h4>
                <p className="text-sm text-slate-600 max-w-sm">Downloads offline maps, local shelter coordinates, and cached helplines for your current district.</p>
              </div>
              <button onClick={() => handleAction('Downloading District Emergency Pack (45MB)...')} className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-600 hover:to-cyan-600 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 cursor-pointer transition shadow-md">
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
      active ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white shadow-md shadow-fuchsia-200/50' : 'text-slate-600 hover:bg-fuchsia-50'
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

function NavItem({ icon, label, active, onClick, isAlert, badge, collapsed }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, isAlert?: boolean, badge?: string, collapsed?: boolean }) {
  return (
    <div className="relative group/nav cursor-pointer" onClick={onClick}>
      <button 
        className={`w-full flex items-center ${collapsed ? 'justify-center h-[48px]' : 'justify-between h-[44px]'} px-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
          active 
            ? (isAlert 
                ? "bg-gradient-to-r from-red-50 to-slate-50 text-red-600 border border-red-200 shadow-sm shadow-red-100" 
                : (collapsed 
                    ? "bg-blue-50 text-blue-600 border-l-[3px] border-blue-500 rounded-l-none" 
                    : "bg-gradient-to-r from-blue-50 to-slate-50/50 text-blue-600 border border-blue-200 shadow-sm shadow-blue-100"))
            : "text-slate-500 hover:bg-slate-50/50 hover:text-slate-700 border border-transparent"
        }`}
      >
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} w-full relative`}>
          <div className={`${active ? (isAlert ? "text-red-500" : "text-blue-600") : "text-slate-400 group-hover:text-slate-500 transition-colors"} ${collapsed ? 'group-hover/nav:scale-110 transition-transform' : ''}`}>
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

// --- NEW MODULES ---

function VolunteerPortalTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white text-slate-900 rounded-3xl p-8 shadow-xl border border-emerald-200 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-5"><Users size={200}/></div>
        <h2 className="text-3xl font-extrabold mb-2 relative z-10">Civil Defense Network</h2>
        <p className="text-slate-500 max-w-xl relative z-10">Register your skills and vehicles to assist local authorities during large-scale emergencies.</p>
        <button className="mt-6 bg-white text-emerald-600 font-bold px-6 py-3 rounded-lg shadow-lg relative z-10 hover:shadow-xl transition">Sign Up as Volunteer</button>
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
        <div className="bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-500 text-white p-6 rounded-2xl shadow-lg shadow-fuchsia-200/50 relative overflow-hidden group cursor-pointer">
          <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform"><FileText size={100}/></div>
          <h3 className="text-xl font-bold mb-2">Draft e-FIR</h3>
          <p className="text-white/80 text-sm mb-6">AI-assisted drafting for lost items or non-heinous crimes.</p>
          <button onClick={() => handleAction('e-FIR Draft initiated! AI is preparing your document...')} className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-bold shadow cursor-pointer transition">Start Draft</button>
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
      <div className="bg-white text-slate-900 rounded-3xl p-8 flex justify-between items-center shadow-xl border border-fuchsia-200">
        <div>
          <h2 className="text-3xl font-extrabold mb-2">Disaster Relief Hub</h2>
          <p className="text-slate-500 max-w-xl">Coordinate volunteers, claim government compensation, and donate securely to official state funds.</p>
        </div>
        <Tent size={64} className="text-fuchsia-300" />
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
          <button onClick={() => handleAction('Volunteer registration submitted! You will be contacted shortly.')} className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold py-2 rounded-lg hover:shadow-lg hover:shadow-fuchsia-200/50 transition cursor-pointer">Register as Volunteer</button>
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
        <div className="bg-gradient-to-br from-rose-500 via-fuchsia-500 to-violet-500 text-white p-5 rounded-2xl shadow-lg shadow-rose-200/50 flex flex-col justify-center border border-rose-300">
          <div className="text-white/80 text-xs font-bold mb-1 uppercase">Emergency Action</div>
          <p className="text-xs text-white/70 mb-3 leading-tight">Instantly override networks to push SMS to all active citizens.</p>
          <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md border border-white/20">
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
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow transition pointer-events-none">{val}</div>
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
          
          <div className="bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-500 p-6 rounded-2xl shadow-lg shadow-fuchsia-200/50 border border-fuchsia-300 text-white relative overflow-hidden">
             <div className="absolute -right-6 -bottom-6 opacity-10"><Bell size={100}/></div>
             <h3 className="font-bold mb-2">Never miss an update</h3>
             <p className="text-xs text-white/80 mb-4">Sync these events directly to your personal Google or Apple Calendar.</p>
             <button onClick={() => handleAction('Events synced to your calendar! Check Google Calendar.')} className="w-full bg-white/20 hover:bg-white/30 border border-white/30 transition rounded-lg py-2 text-sm font-bold flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer">
               <Download size={16}/> Sync to Calendar
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function OurTeamTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 max-w-7xl mx-auto px-4 py-8">
      {/* Team Header Card */}
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-100/30 via-violet-50/20 to-cyan-100/30 pointer-events-none"></div>
        <div className="relative z-10 flex-1 space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-100 to-pink-100 text-fuchsia-700 text-xs font-bold px-4 py-1.5 rounded-full border border-fuchsia-200 shadow-sm">
            <Award size={14} /> HACK4SOC 3.0 Hackathon Submission
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-rose-500 to-cyan-500 font-extrabold">Innovators</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl leading-relaxed">
            The visionary team of developers and problem-solvers behind <strong>GovAssist AI</strong> — an end-to-end emergency response and citizen navigator operating system.
          </p>
        </div>
        <div className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-white p-2 flex items-center justify-center shrink-0">
          <img src="/api/team-logo" alt="Innovator Team Logo" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Grid of Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card border border-white/50 rounded-3xl p-6 flex flex-col justify-between items-center text-center relative overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Ambient Background Light */}
            <div className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${member.gradient} opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
            
            {/* Glowing Accent Border Outline */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${member.gradient} rounded-3xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10`}></div>
            
            <div className="relative flex flex-col items-center w-full">
              {/* Leader Crown Badge */}
              {member.isLeader && (
                <div className="absolute -top-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-black text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 z-20">
                  <Star size={10} className="fill-current" /> Leader
                </div>
              )}
              
              {/* Profile Initials Circle */}
              <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${member.gradient} p-1 mb-4 shadow-lg flex items-center justify-center relative`}>
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-black text-2xl text-slate-800 tracking-tight relative overflow-hidden group-hover:bg-transparent group-hover:text-white transition-colors duration-300">
                  {member.initials}
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="font-extrabold text-lg text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{member.name}</h3>
              <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-cyan-600 uppercase tracking-wider mt-1.5 mb-4">{member.role}</p>

              {/* Education Info */}
              <div className="flex gap-2.5 items-start text-slate-500 hover:text-slate-700 transition-colors text-xs text-center border-t border-slate-100 pt-4 w-full justify-center">
                <GraduationCap size={16} className="text-blue-500 mt-0.5 shrink-0" />
                <div className="text-left w-full">
                  <span className="font-bold text-slate-700 block leading-tight">{member.degree}</span>
                  <span className="text-[10px] text-slate-400 font-semibold block leading-tight mt-1 truncate max-w-[190px]" title={member.college}>{member.college}</span>
                  {member.collegeSub && (
                    <span className="text-[8px] text-slate-400 block leading-tight mt-0.5">{member.collegeSub}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Social / Contact Links */}
            <div className="grid grid-cols-2 gap-3 w-full mt-6 pt-4 border-t border-slate-100/60 z-10">
              <a
                href={`mailto:${member.email}`}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white text-slate-600 border border-slate-100 rounded-xl transition duration-300 text-xs font-bold cursor-pointer"
                title="Email Developer"
              >
                <Mail size={14} /> Email
              </a>
              <a
                href={member.hack2skill}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-rose-500 hover:text-white text-slate-600 border border-slate-100 rounded-xl transition duration-300 text-xs font-bold cursor-pointer"
                title="Hack2skill Profile"
              >
                <ExternalLink size={14} /> Profile
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Shared Vision Section */}
      <div className="bg-gradient-to-r from-fuchsia-500/10 via-pink-500/5 to-cyan-500/10 border border-fuchsia-100 rounded-[2rem] p-6 text-center max-w-3xl mx-auto">
        <h4 className="font-extrabold text-slate-800 text-base mb-1">🏛️ GovAssist AI - Hackathon Project</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Developed during HACK4SOC 3.0 as a futuristic, responsive emergency coordination portal designed to support citizens in crisis, minimize emergency response latency, and integrate real-time digital assistance.
        </p>
      </div>
    </motion.div>
  );
}

// --- GLOBAL FOOTER COMPONENT (MyGov Themed) ---
function WebsitePoliciesTab() {
  const policies = [
    {
      title: "Privacy & Data Use",
      desc: "GovAssist AI uses citizen data only to route emergency support, improve service discovery, and prefill user-approved forms.",
      icon: <Lock size={20} />,
      tone: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      title: "Emergency Disclaimer",
      desc: "For life-threatening situations, citizens should call 112 first. AI guidance is supplementary and should not delay official emergency contact.",
      icon: <AlertTriangle size={20} />,
      tone: "text-rose-600 bg-rose-50 border-rose-100"
    },
    {
      title: "Accessibility",
      desc: "The portal aims to support keyboard access, readable contrast, responsive layouts, and multilingual assistance for essential services.",
      icon: <Eye size={20} />,
      tone: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      title: "Content Accuracy",
      desc: "Emergency alerts, directories, and scheme information should be cross-checked with official sources whenever decisions carry risk.",
      icon: <CheckCircle2 size={20} />,
      tone: "text-cyan-600 bg-cyan-50 border-cyan-100"
    }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <section className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/40 overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-orange-500 via-rose-500 to-emerald-500"></div>
        <div className="max-w-3xl">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">GovAssist AI</span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-5">Website Policies</h1>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed mt-4">
            Clear operating rules for privacy, emergency use, accessibility, and responsible AI assistance across the GovAssist AI citizen portal.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {policies.map((policy) => (
          <div key={policy.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
            <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${policy.tone}`}>
              {policy.icon}
            </div>
            <h2 className="text-lg font-black text-slate-900 mt-5">{policy.title}</h2>
            <p className="text-sm text-slate-500 leading-relaxed mt-2">{policy.desc}</p>
          </div>
        ))}
      </div>

      <section className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-10 shadow-xl">
        <h2 className="text-2xl font-black tracking-tight">Responsible Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-sm text-slate-300 leading-relaxed">
          <p>Do not file false SOS requests, e-FIRs, claims, or reports. Misuse can delay real response operations.</p>
          <p>Do not upload documents or identity details unless you are using a trusted device and understand the requested action.</p>
          <p>Use official helplines and verified agencies for final confirmation during disasters, cyber fraud, or medical emergencies.</p>
        </div>
      </section>
    </motion.div>
  );
}

function Footer({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <footer className="bg-[#1c1c1c] text-white pt-10 pb-6 mt-12 px-6 md:px-12 rounded-t-[2.5rem] relative overflow-hidden z-10">
      {/* Decorative top border line in flag gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-white to-emerald-500"></div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top: Website Policies Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs md:text-sm font-semibold text-slate-350 border-b border-slate-800 pb-5">
          <button onClick={() => setActiveTab("Website Policies")} className="hover:text-white transition cursor-pointer">Website Policies</button>
          <span className="text-slate-700">|</span>
          <button onClick={() => setActiveTab("Emergency Plans")} className="hover:text-white transition cursor-pointer">Help</button>
          <span className="text-slate-700">|</span>
          <button onClick={() => setActiveTab("Our Team")} className="hover:text-white transition cursor-pointer">Contact Us</button>
          <span className="text-slate-700">|</span>
          <button onClick={() => setActiveTab("Voice Assistant")} className="hover:text-white transition cursor-pointer">Feedback</button>
        </div>

        {/* Bottom Strip: Ownership by INNOVATOR TEAM */}
        <div className="pt-2 flex flex-col items-center justify-center text-center gap-2">
          <p className="text-[11px] text-slate-400 leading-relaxed max-w-3xl">
            &copy; Content owned, updated and maintained by the <span className="text-white font-bold">INNOVATOR TEAM</span>. 
            Platform is designed, developed and hosted by <span className="text-white font-bold">INNOVATOR TEAM</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}

