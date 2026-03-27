import React, { useState, useRef, useEffect } from 'react';
import { auth, db, signInWithGoogle } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Category } from '../types';
import { CATEGORIES, MAIN_CATEGORIES } from '../constants';
import { MapPin, Phone, User, Home, CheckCircle, LogIn, ChevronDown, Wrench, Tractor, Truck, Store, PartyPopper, Monitor, HeartPulse, GraduationCap, HardHat, PawPrint, Droplets, Key, Coffee, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const iconMap: Record<string, any> = {
  Wrench, Tractor, Truck, Store, PartyPopper, Monitor, User, HeartPulse, GraduationCap, HardHat, PawPrint, Droplets, Key, Coffee, Briefcase
};

export default function WorkerRegistration() {
  const [user, setUser] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pincode: '',
    village: '',
    category: `${MAIN_CATEGORIES[0].hindi} (${MAIN_CATEGORIES[0].english})` as Category,
    skills: '',
    location: null as { lat: number; lng: number } | null,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const captureLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
        setIsLoading(false);
      },
      (error) => {
        console.error('Error capturing location:', error);
        alert('Could not capture location. Please enable GPS. / स्थान का पता नहीं चल सका। कृपया GPS चालू करें।');
        setIsLoading(false);
      }
    );
  };

  const handleFirestoreError = (error: any, operation: string, path: string) => {
    const errInfo = {
      error: error.message || String(error),
      operation,
      path,
      auth: {
        uid: auth.currentUser?.uid,
        email: auth.currentUser?.email
      }
    };
    console.error('Firestore Error:', JSON.stringify(errInfo));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!formData.location) {
      alert('Please capture your GPS location first. / कृपया पहले अपना GPS स्थान कैप्चर करें।');
      return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(db, 'workers'), {
        ...formData,
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });
      setIsSuccess(true);
    } catch (error: any) {
      handleFirestoreError(error, 'create', 'workers');
      alert('Failed to register. Please try again. / पंजीकरण विफल रहा। कृपया पुनः प्रयास करें।');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedMainCat = MAIN_CATEGORIES.find(
    cat => formData.category.includes(cat.hindi) || formData.category.includes(cat.english)
  );

  const SelectedIcon = selectedMainCat ? (iconMap[selectedMainCat.icon] || Wrench) : Wrench;

  if (!user) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 text-center">
        <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="text-emerald-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Register as a Worker / कार्यकर्ता के रूप में पंजीकरण करें</h2>
        <p className="text-slate-600 mb-6">Sign in with Google to create your worker profile and reach more customers. / अपना प्रोफाइल बनाने और अधिक ग्राहकों तक पहुँचने के लिए Google से साइन इन करें।</p>
        <button
          onClick={signInWithGoogle}
          className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign in with Google / Google से साइन इन करें
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-emerald-600" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Registration Successful! / पंजीकरण सफल रहा!</h2>
            <p className="text-slate-600 mb-8">Your profile is now live and visible to nearby customers. / आपकी प्रोफ़ाइल अब लाइव है और आस-पास के ग्राहकों को दिखाई दे रही है।</p>
            <button
              onClick={() => setIsSuccess(false)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all"
            >
              Register Another / एक और पंजीकरण करें
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Create Your Profile / अपनी प्रोफ़ाइल बनाएं</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <User size={16} /> Name / Shop Name (नाम / दुकान का नाम)
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Phone size={16} /> Mobile Number (मोबाइल नंबर)
                </label>
                <input
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="10-digit number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Home size={16} /> Pincode (पिनकोड)
                </label>
                <input
                  required
                  type="text"
                  placeholder="6-digit pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <MapPin size={16} /> Village / Locality (गाँव / इलाका)
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter village name"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              
              {/* Custom Category Dropdown */}
              <div className="space-y-2 relative" ref={dropdownRef}>
                <label className="block text-sm font-semibold text-slate-700">Category / श्रेणी</label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none flex items-center justify-between gap-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${selectedMainCat ? selectedMainCat.color + ' bg-opacity-10 text-' + selectedMainCat.color.split('-')[1] + '-600' : 'bg-slate-200 text-slate-500'}`}>
                      <SelectedIcon size={18} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">
                      {selectedMainCat ? `${selectedMainCat.hindi} (${selectedMainCat.english})` : 'Select Category'}
                    </span>
                  </div>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 max-h-[300px] overflow-y-auto py-2">
                    {MAIN_CATEGORIES.map((cat) => {
                      const Icon = iconMap[cat.icon] || Wrench;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, category: `${cat.hindi} (${cat.english})` as Category });
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-emerald-50 transition-colors text-left group"
                        >
                          <div className={`p-1.5 rounded-lg ${cat.color} bg-opacity-10 text-${cat.color.split('-')[1]}-600 group-hover:bg-opacity-20`}>
                            <Icon size={16} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-700">{cat.hindi}</span>
                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{cat.english}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Skills / Services (हुनर / सेवाएं)</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Electrician, Grocery, Plumber"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h3 className="font-bold text-slate-900">GPS Location / GPS स्थान</h3>
                  <p className="text-sm text-slate-500">We need your exact location to show you to nearby customers. / हमें आस-पास के ग्राहकों को दिखाने के लिए आपके सटीक स्थान की आवश्यकता है।</p>
                </div>
                <button
                  type="button"
                  onClick={captureLocation}
                  disabled={isLoading}
                  className={`flex items-center gap-2 py-3 px-6 rounded-xl font-bold transition-all ${
                    formData.location 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <MapPin size={18} />
                  {formData.location ? 'Location Captured / स्थान कैप्चर किया गया' : 'Capture GPS / GPS कैप्चर करें'}
                </button>
              </div>
              {formData.location && (
                <p className="text-xs text-emerald-600 mt-2 font-medium">
                  ✓ Lat: {formData.location.lat.toFixed(4)}, Lng: {formData.location.lng.toFixed(4)}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-emerald-200"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Submit Registration / पंजीकरण जमा करें'
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
