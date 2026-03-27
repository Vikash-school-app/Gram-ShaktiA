import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown, Wrench, Tractor, Truck, Store, PartyPopper, Monitor, User, HeartPulse, GraduationCap, HardHat, PawPrint, Droplets, Key, Coffee, Briefcase } from 'lucide-react';
import { Category, SearchFilters } from '../types';
import { MAIN_CATEGORIES } from '../constants';

interface SearchFormProps {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const iconMap: Record<string, any> = {
  Wrench, Tractor, Truck, Store, PartyPopper, Monitor, User, HeartPulse, GraduationCap, HardHat, PawPrint, Droplets, Key, Coffee, Briefcase
};

export default function SearchForm({ filters, setFilters, onSearch, isLoading }: SearchFormProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const selectedCategory = MAIN_CATEGORIES.find(
    cat => filters.category === `${cat.hindi} (${cat.english})` || filters.category === cat.english
  );

  const SelectedIcon = selectedCategory ? (iconMap[selectedCategory.icon] || Wrench) : Search;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 md:p-3">
        <div className="flex flex-col md:flex-row items-stretch gap-2">
          
          {/* Category Dropdown */}
          <div className="relative flex-shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full md:w-64 h-14 px-4 flex items-center justify-between gap-3 bg-slate-50 hover:bg-slate-100 border-2 border-transparent focus:border-emerald-500 rounded-2xl transition-all text-left"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className={`p-2 rounded-lg ${selectedCategory ? selectedCategory.color + ' bg-opacity-10 text-' + selectedCategory.color.split('-')[1] + '-600' : 'bg-slate-200 text-slate-500'}`}>
                  <SelectedIcon size={20} />
                </div>
                <div className="truncate">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 leading-none mb-1">Category / श्रेणी</p>
                  <p className="text-sm font-bold text-slate-700 truncate">
                    {selectedCategory ? `${selectedCategory.hindi}` : 'All Categories / सभी'}
                  </p>
                </div>
              </div>
              <ChevronDown size={20} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 md:w-80 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 max-h-[400px] overflow-y-auto py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Category / श्रेणी चुनें</p>
                </div>
                <button
                  onClick={() => {
                    setFilters({ ...filters, category: '' as Category });
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-500">
                    <Search size={18} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">All Categories / सभी श्रेणियाँ</span>
                </button>
                {MAIN_CATEGORIES.map((cat) => {
                  const Icon = iconMap[cat.icon] || Wrench;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setFilters({ 
                          ...filters, 
                          category: `${cat.hindi} (${cat.english})` as Category,
                          keyword: cat.english // Pre-set keyword for better filtering
                        });
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-emerald-50 transition-colors text-left group"
                    >
                      <div className={`p-2 rounded-lg ${cat.color} bg-opacity-10 text-${cat.color.split('-')[1]}-600 group-hover:bg-opacity-20`}>
                        <Icon size={18} />
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

          {/* Search Input */}
          <div className="flex-grow relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search Skills (e.g. Plumber, Kirana) / हुनर खोजें"
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none transition-all text-base font-medium text-slate-700 placeholder:text-slate-400"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={onSearch}
            disabled={isLoading}
            className="h-14 px-8 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-black rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-100 active:scale-95 flex-shrink-0"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <MapPin size={20} />
                <span className="hidden sm:inline">Find Nearby / खोजें</span>
                <span className="sm:hidden">Find / खोजें</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <p className="text-center text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest">
        Showing results within 10 KM / 10 किमी के भीतर परिणाम
      </p>
    </div>
  );
}
