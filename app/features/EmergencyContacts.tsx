"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Stethoscope, Scale, Home, Plus, CheckCircle, ShieldAlert, PhoneCall, Trash2, X, AlertTriangle } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: "Family" | "Doctor" | "Lawyer" | "Neighbor";
}

export default function EmergencyContactsAdvanced() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState<Partial<Contact>>({ relation: "Family" });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("govassist_contacts");
    if (saved) {
      try {
        setContacts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse contacts");
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever contacts change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("govassist_contacts", JSON.stringify(contacts));
    }
  }, [contacts, isLoaded]);
  
  const handleAction = (action: string) => {
    setActiveAction(action);
    setTimeout(() => setActiveAction(null), 3000);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone || !newContact.relation) return;
    
    const contact: Contact = {
      id: Date.now().toString(),
      name: newContact.name,
      phone: newContact.phone,
      relation: newContact.relation as any,
    };
    
    setContacts(prev => [...prev, contact]);
    setIsModalOpen(false);
    setNewContact({ relation: "Family" });
    handleAction(`${contact.name} added to emergency list`);
  };

  const handleDelete = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    handleAction("Contact removed");
  };

  const getRelationIcon = (relation: string, size = 20) => {
    switch(relation) {
      case "Family": return <Users size={size} />;
      case "Doctor": return <Stethoscope size={size} />;
      case "Lawyer": return <Scale size={size} />;
      case "Neighbor": return <Home size={size} />;
      default: return <Users size={size} />;
    }
  };

  const getRelationColor = (relation: string) => {
    switch(relation) {
      case "Family": return "text-blue-600 bg-blue-100 border-blue-200";
      case "Doctor": return "text-emerald-600 bg-emerald-100 border-emerald-200";
      case "Lawyer": return "text-amber-600 bg-amber-100 border-amber-200";
      case "Neighbor": return "text-purple-600 bg-purple-100 border-purple-200";
      default: return "text-slate-600 bg-slate-100 border-slate-200";
    }
  };

  if (!isLoaded) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-6 relative">
      <AnimatePresence>
        {activeAction && (
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="fixed top-4 right-4 z-[80] bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
            <CheckCircle size={18} /> {activeAction}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Emergency Contacts</h2>
          <p className="text-slate-500 max-w-xl">Trusted individuals who will be instantly notified with your live location when you trigger an SOS.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200 cursor-pointer shrink-0">
          <Plus size={18} /> Add Contact
        </button>
      </div>

      {/* Suggested Contact Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button onClick={() => { setNewContact({ relation: "Family" }); setIsModalOpen(true); }} className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition h-36 cursor-pointer group shadow-sm hover:shadow-md">
          <div className="bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-blue-500 p-3 rounded-xl mb-3 shadow-sm group-hover:scale-110 transition"><Users size={24}/></div>
          <span className="font-bold text-sm">Add Family</span>
        </button>
        <button onClick={() => { setNewContact({ relation: "Doctor" }); setIsModalOpen(true); }} className="border-2 border-dashed border-slate-200 hover:border-emerald-400 bg-white hover:bg-emerald-50 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-emerald-600 transition h-36 cursor-pointer group shadow-sm hover:shadow-md">
          <div className="bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-emerald-500 p-3 rounded-xl mb-3 shadow-sm group-hover:scale-110 transition"><Stethoscope size={24}/></div>
          <span className="font-bold text-sm">Add Doctor</span>
        </button>
        <button onClick={() => { setNewContact({ relation: "Lawyer" }); setIsModalOpen(true); }} className="border-2 border-dashed border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-amber-600 transition h-36 cursor-pointer group shadow-sm hover:shadow-md">
          <div className="bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-amber-500 p-3 rounded-xl mb-3 shadow-sm group-hover:scale-110 transition"><Scale size={24}/></div>
          <span className="font-bold text-sm">Add Lawyer</span>
        </button>
        <button onClick={() => { setNewContact({ relation: "Neighbor" }); setIsModalOpen(true); }} className="border-2 border-dashed border-slate-200 hover:border-purple-400 bg-white hover:bg-purple-50 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-purple-600 transition h-36 cursor-pointer group shadow-sm hover:shadow-md">
          <div className="bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-purple-500 p-3 rounded-xl mb-3 shadow-sm group-hover:scale-110 transition"><Home size={24}/></div>
          <span className="font-bold text-sm">Add Neighbor</span>
        </button>
      </div>

      {/* Main Content Area */}
      {contacts.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden relative">
           <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
             <ShieldAlert size={150} />
           </div>
           <div className="p-12 text-center flex flex-col items-center relative z-10">
             <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-300 mb-6 border-4 border-white shadow-lg animate-pulse">
               <Users size={40} />
             </div>
             <h3 className="text-2xl font-extrabold text-slate-900 mb-3">No Contacts Added Yet</h3>
             <p className="text-slate-500 max-w-lg mx-auto leading-relaxed text-sm">
               Your SOS alerts currently have no trusted recipients. In a life-threatening situation, every second counts. We highly recommend adding at least two family members immediately.
             </p>
             
             <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-4 text-left max-w-md w-full">
               <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><PhoneCall size={20} /></div>
               <div>
                 <div className="font-bold text-slate-800 text-sm">Auto-Dial Feature Inactive</div>
                 <div className="text-xs text-slate-500">Add a contact to enable auto-dial during emergencies.</div>
               </div>
             </div>
           </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact, idx) => (
            <motion.div 
              key={contact.id} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center justify-between group hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl border ${getRelationColor(contact.relation)}`}>
                  {getRelationIcon(contact.relation, 24)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{contact.name}</h3>
                  <p className="text-slate-500 font-medium font-mono mt-0.5">{contact.phone}</p>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">{contact.relation}</div>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(contact.id)}
                className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition cursor-pointer opacity-0 group-hover:opacity-100"
                title="Remove Contact"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
          
          <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10"><ShieldAlert size={100} /></div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-emerald-500 text-white p-1 rounded-full"><CheckCircle size={14}/></div>
              <h3 className="font-bold text-emerald-900 text-lg">Auto-Dial Active</h3>
            </div>
            <p className="text-sm text-emerald-700 max-w-[80%] relative z-10">When you trigger an SOS, {contacts.length} contact{contacts.length > 1 ? 's' : ''} will receive an automated voice call with your live GPS location.</p>
          </div>
        </motion.div>
      )}

      {/* Add Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-extrabold text-slate-900">Add Trusted Contact</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 bg-white rounded-full p-2 shadow-sm"><X size={20}/></button>
              </div>
              <form onSubmit={handleAddContact} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input required type="text" value={newContact.name || ""} onChange={(e) => setNewContact({...newContact, name: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" placeholder="e.g. Ramesh Kumar" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                  <input required type="tel" value={newContact.phone || ""} onChange={(e) => setNewContact({...newContact, phone: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition font-mono" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Relation</label>
                  <select required value={newContact.relation} onChange={(e) => setNewContact({...newContact, relation: e.target.value as any})} className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white appearance-none">
                    <option value="Family">Family Member</option>
                    <option value="Doctor">Doctor / Physician</option>
                    <option value="Lawyer">Legal Advisor</option>
                    <option value="Neighbor">Neighbor</option>
                  </select>
                </div>
                
                <div className="bg-amber-50 text-amber-700 p-4 rounded-xl flex items-start gap-3 border border-amber-200 text-sm">
                  <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                  <p>This contact will be notified automatically if you use the SOS Auto-Dial feature.</p>
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition">
                  Save Contact
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
