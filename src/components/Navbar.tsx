import React, { useState } from 'react';
import { ShieldCheck, BookOpen, BrainCircuit, HelpCircle, Award, Menu, X } from 'lucide-react';

export type NavTab = 'home' | 'lessons' | 'scenarios' | 'quiz' | 'progress';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  overallProgressPercent: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, overallProgressPercent }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'หน้าหลัก', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'lessons', label: 'บทเรียน', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'scenarios', label: 'ฝึกสถานการณ์', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'quiz', label: 'แบบทดสอบ', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'progress', label: 'ความก้าวหน้า', icon: <Award className="w-4 h-4" /> },
  ];

  const handleTabClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-sm shadow-indigo-100 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                Digital Smart
              </span>
              <span className="text-[10px] text-slate-500 -mt-0.5 whitespace-nowrap">
                ฉลาดใช้ชีวิตในโลกดิจิทัล
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? 'text-indigo-600 border-indigo-600 font-semibold'
                      : 'border-transparent hover:text-slate-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleTabClick('quiz')}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <span>ทำแบบทดสอบ</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono tabular-nums">
                {overallProgressPercent}%
              </span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3">
            <button
              onClick={() => handleTabClick('quiz')}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-white bg-indigo-600 rounded-lg"
            >
              ทำแบบทดสอบ (ความคืบหน้า {overallProgressPercent}%)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
