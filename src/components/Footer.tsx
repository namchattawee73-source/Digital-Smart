import React from 'react';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { NavTab } from './Navbar';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-base">Digital Smart</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              เว็บแอปพลิเคชันเพื่อการศึกษา พัฒนาทักษะ Digital Literacy สำหรับนักเรียน นักศึกษา และเยาวชน
              เพื่อการใช้อินเทอร์เน็ตอย่างปลอดภัย รู้เท่าทันสื่อ ปกป้องข้อมูลส่วนตัว และสร้างสรรค์สังคมออนไลน์ที่น่าอยู่
            </p>
            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} Digital Smart — ฉลาดใช้ชีวิตในโลกดิจิทัล
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-900 mb-2">แผนผังการเรียนรู้</div>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-indigo-600 transition-colors">
                  หน้าหลัก (Home)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('lessons')} className="hover:text-indigo-600 transition-colors">
                  คลังบทเรียน 4 หมวด (Learning Hub)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('scenarios')} className="hover:text-indigo-600 transition-colors">
                  ห้องฝึกสถานการณ์จำลอง (Scenario Lab)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-indigo-600 transition-colors">
                  แบบทดสอบ 10 ข้อ (Smart Quiz)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('progress')} className="hover:text-indigo-600 transition-colors">
                  สรุปความก้าวหน้าและใบประกาศ
                </button>
              </li>
            </ul>
          </div>

          {/* Cyber Safety Hotlines */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-900 mb-2">สายด่วนช่วยเหลือไซเบอร์</div>
            <div className="space-y-2 text-slate-600">
              <div>
                <span className="font-bold text-slate-800">1441</span>
                <span className="text-slate-500"> — ศูนย์ปราบปรามอาชญากรรมไซเบอร์ (24 ชม.)</span>
              </div>
              <div>
                <span className="font-bold text-slate-800">1212</span>
                <span className="text-slate-500"> — ศูนย์รับเรื่องร้องเรียนออนไลน์ ETDA</span>
              </div>
              <div>
                <span className="font-bold text-slate-800">1323</span>
                <span className="text-slate-500"> — สายด่วนสุขภาพจิต (ปรึกษา Cyberbullying)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
