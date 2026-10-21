import React, { useState } from 'react';
import { Shield, CheckCircle2, Award, ArrowRight, Eye, UserCheck, MessageSquareHeart, Swords, Sparkles, PhoneCall, BookOpen } from 'lucide-react';
import { NavTab } from './Navbar';
import { useProgress } from '../context/ProgressContext';

interface HomeViewProps {
  onNavigate: (tab: NavTab, extra?: { lessonId?: string }) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { progress, completedLessonsCount, overallProgressPercent, totalLessons } = useProgress();
  const [imageError, setImageError] = useState(false);

  const categories = [
    {
      id: 'safety',
      title: 'Digital Safety',
      thaiTitle: 'ความปลอดภัยบนโลกดิจิทัล',
      desc: 'ตั้งรหัสผ่านที่เจาะยาก รู้ทันกลลวง Phishing ลิงก์หลอกลวง และรับมือบุคคลแปลกหน้าออนไลน์',
      icon: <Shield className="w-6 h-6 text-sky-600" />,
      color: 'bg-sky-50 text-sky-700 border-sky-100 hover:border-sky-300',
      actionTab: 'lessons' as NavTab,
      lessonId: 'lesson-safety'
    },
    {
      id: 'media',
      title: 'Media Check',
      thaiTitle: 'การตรวจสอบข่าวและข้อมูล',
      desc: 'แยกแยะข่าวจริง ข่าวปลอม ตรวจสอบภาพตัดต่อ AI Deepfake และเช็กความถูกต้องด้วย CRAAP Test',
      icon: <Eye className="w-6 h-6 text-indigo-600" />,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:border-indigo-300',
      actionTab: 'lessons' as NavTab,
      lessonId: 'lesson-media'
    },
    {
      id: 'privacy',
      title: 'Privacy Guard',
      thaiTitle: 'การปกป้องข้อมูลส่วนตัว',
      desc: 'ระวังการแชร์ตำแหน่ง รูปภาพ ตั๋วคอนเสิร์ต ตั้งค่าโซเชียลเป็นส่วนตัว และเข้าใจกฎหมาย PDPA',
      icon: <UserCheck className="w-6 h-6 text-violet-600" />,
      color: 'bg-violet-50 text-violet-700 border-violet-100 hover:border-violet-300',
      actionTab: 'lessons' as NavTab,
      lessonId: 'lesson-privacy'
    },
    {
      id: 'manners',
      title: 'Digital Manners',
      thaiTitle: 'มารยาทและการสื่อสารออนไลน์',
      desc: 'สื่อสารอย่างสร้างสรรค์ รับมือ Cyberbullying ด้วยหลัก Stop-Block-Tell และเคารพลิขสิทธิ์ผู้อื่น',
      icon: <MessageSquareHeart className="w-6 h-6 text-teal-600" />,
      color: 'bg-teal-50 text-teal-700 border-teal-100 hover:border-teal-300',
      actionTab: 'lessons' as NavTab,
      lessonId: 'lesson-manners'
    },
    {
      id: 'challenge',
      title: 'Smart Challenge',
      thaiTitle: 'แบบทดสอบและสถานการณ์ดิจิทัล',
      desc: 'ฝึกแก้ปัญหาในสถานการณ์จำลองจริง 6 เหตุการณ์ พร้อมทำแบบทดสอบวัดระดับความรอบรู้ 10 ข้อ',
      icon: <Swords className="w-6 h-6 text-amber-600" />,
      color: 'bg-amber-50 text-amber-700 border-amber-100 hover:border-amber-300',
      actionTab: 'scenarios' as NavTab,
    }
  ];

  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 sm:p-10">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>หลักสูตร Digital Literacy สำหรับนักเรียนและเยาวชน</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Digital Smart <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-700">
                  ฉลาดใช้ชีวิตในโลกดิจิทัล
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                เสริมภูมิคุ้มกันไซเบอร์ รู้เท่าทันสื่อและข่าวลวง ปกป้องรอยเท้าดิจิทัล
                และร่วมสร้างสังคมออนไลน์ที่ปลอดภัยและให้เกียรติซึ่งกันและกัน
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('lessons')}
                className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all flex items-center gap-2 group cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>เริ่มเรียนรู้บทเรียน</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('scenarios')}
                className="px-5 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Swords className="w-4 h-4 text-amber-600" />
                <span>ฝึกแก้สถานการณ์จำลอง</span>
              </button>
            </div>

            {/* Micro Stats Bar */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xs text-slate-500">บทเรียนสำเร็จ</div>
                <div className="text-xl font-bold text-slate-900 tabular-nums">
                  {completedLessonsCount} / {totalLessons}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">คะแนนแบบทดสอบสูงสุด</div>
                <div className="text-xl font-bold text-indigo-600 tabular-nums">
                  {progress.bestScore > 0 ? `${progress.bestScore}/10` : '-'}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">ความคืบหน้าภาพรวม</div>
                <div className="text-xl font-bold text-sky-600 tabular-nums">
                  {overallProgressPercent}%
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full h-64 sm:h-80 lg:h-full min-h-[260px] rounded-xl overflow-hidden border border-slate-200 bg-gradient-to-br from-indigo-50 to-sky-100 flex items-center justify-center shadow-inner">
              {!imageError ? (
                <img
                  src="/src/assets/images/hero_digital_smart_1792603934465.jpg"
                  alt="ภาพประกอบการเรียนรู้ Digital Literacy อย่างปลอดภัย"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="p-8 text-center space-y-3">
                  <Shield className="w-16 h-16 text-indigo-600 mx-auto" />
                  <div className="font-semibold text-slate-800 text-sm">
                    Digital Smart Learning Center
                  </div>
                  <div className="text-xs text-slate-500 max-w-xs">
                    พัฒนาทักษะการรู้เท่าทันสื่อ ปกป้องข้อมูล และใช้งานเทคโนโลยีอย่างฉลาด
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Progress Card Section */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              สถานะการเรียนรู้ของคุณ
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              ติดตามพัฒนาการการเป็นพลเมืองดิจิทัลคุณภาพ (Digital Citizen)
            </p>
          </div>
          <button
            onClick={() => onNavigate('progress')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>ดูรายงานและใบประกาศนียบัตร</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-slate-600">
            <span>ความพร้อมสู่การเป็นพลเมืองดิจิทัลรอบรู้</span>
            <span className="font-bold text-indigo-600 tabular-nums">{overallProgressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-sky-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-slate-500">บทเรียนที่สำเร็จ</div>
            <div className="text-base font-bold text-slate-800 mt-0.5 tabular-nums">
              {completedLessonsCount} / 4 บท
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-slate-500">สถานการณ์จำลอง</div>
            <div className="text-base font-bold text-slate-800 mt-0.5 tabular-nums">
              {Object.keys(progress.completedScenarios).length} / 6 ด่าน
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-slate-500">สอบวัดผลล่าสุด</div>
            <div className="text-base font-bold text-slate-800 mt-0.5 tabular-nums">
              {progress.quizHistory.length > 0 ? `${progress.quizHistory[0].score}/10 คะแนน` : 'ยังไม่ได้สอบ'}
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-slate-500">ระดับทักษะ</div>
            <div className="text-base font-bold text-indigo-600 mt-0.5">
              {overallProgressPercent >= 80 ? 'Master' : overallProgressPercent >= 50 ? 'Intermediate' : 'Beginner'}
            </div>
          </div>
        </div>
      </section>

      {/* 5 Main Categories Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              5 หมวดความรู้ดิจิทัลเพื่ออนาคต
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              เลือกหัวข้อที่สนใจเพื่อเริ่มเสริมสร้างทักษะและฝึกฝนทันที
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(cat.actionTab, { lessonId: cat.lessonId })}
              className={`p-5 rounded-xl border transition-all cursor-pointer bg-white hover:shadow-md flex flex-col justify-between ${cat.color}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-white shadow-xs border border-slate-100">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-400 tabular-nums">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600">
                    {cat.title}
                  </h3>
                  <div className="text-xs font-medium text-slate-600 mt-0.5">
                    {cat.thaiTitle}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>{cat.actionTab === 'lessons' ? 'อ่านบทเรียน' : 'เข้าสู่แบบฝึกท้าทาย'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Digital Tip & Hotlines */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
              <Sparkles className="w-4 h-4" />
              <span>เกร็ดความรู้ดิจิทัลประจำวัน (Daily Smart Tip)</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              อย่าปล่อยให้ "ความเร่งรีบ" เป็นช่องโหว่ให้มิจฉาชีพ
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              มิจฉาชีพ 90% ใช้เทคนิคสร้างความตกใจหรือเร่งเร้า เช่น "ต้องโอนภายใน 10 นาที" หรือ "บัญชีจะถูกปิดทันที"
              เพื่อระงับการคิดเชิงวิพากษ์ (Critical Thinking) ของเรา เมื่อใดที่รู้สึกถูกเร่ง ให้ "หยุด หายใจเข้าลึกๆ และเช็กกับตัวจริง" ก่อนเสมอ
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-indigo-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>หลักคิดปลอดภัย: Stop, Think, Verify</span>
          </div>
        </div>

        {/* Emergency Hotlines */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-600">
              <PhoneCall className="w-4 h-4" />
              <span>สายด่วนรับแจ้งภัยออนไลน์ (ไทย)</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              เมื่อสงสัยว่าถูกหลอกหรือโดนแฮก
            </h4>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">1441 ตำรวจไซเบอร์</div>
                <div className="text-[11px] text-slate-500">ศูนย์ปราบปรามอาชญากรรมไซเบอร์ (24 ชม.)</div>
              </div>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">1212 ETDA</div>
                <div className="text-[11px] text-slate-500">ศูนย์รับเรื่องร้องเรียนปัญหาออนไลน์</div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            บันทึกเบอร์เหล่านี้ไว้ในมือถือเพื่อช่วยเหลือตนเองและคนในครอบครัว
          </p>
        </div>
      </section>
    </div>
  );
};
