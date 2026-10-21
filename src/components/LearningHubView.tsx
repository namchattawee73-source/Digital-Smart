import React, { useState } from 'react';
import { LESSONS_DATA } from '../data/lessonsData';
import { Lesson, CategoryId } from '../types';
import { useProgress } from '../context/ProgressContext';
import { NavTab } from './Navbar';
import { 
  Shield, Eye, UserCheck, MessageSquareHeart, CheckCircle, Clock, 
  ArrowLeft, ArrowRight, BookOpen, AlertCircle, Sparkles, Check
} from 'lucide-react';
import { PasswordCheckerTool, HeadlineCheckerTool, PrivacyAuditTool, ToneConverterTool } from './InteractiveTools';

interface LearningHubViewProps {
  onNavigate: (tab: NavTab) => void;
  initialLessonId?: string;
}

export const LearningHubView: React.FC<LearningHubViewProps> = ({ onNavigate, initialLessonId }) => {
  const { isLessonCompleted, markLessonComplete, unmarkLessonComplete } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryId>('all');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(() => {
    if (initialLessonId) {
      return LESSONS_DATA.find((l) => l.id === initialLessonId) || null;
    }
    return null;
  });

  const categories = [
    { id: 'all', label: 'ทั้งหมด (4 หมวด)' },
    { id: 'safety', label: '1. Digital Safety', icon: <Shield className="w-4 h-4 text-sky-600" /> },
    { id: 'media', label: '2. Media Check', icon: <Eye className="w-4 h-4 text-indigo-600" /> },
    { id: 'privacy', label: '3. Privacy Guard', icon: <UserCheck className="w-4 h-4 text-violet-600" /> },
    { id: 'manners', label: '4. Digital Manners', icon: <MessageSquareHeart className="w-4 h-4 text-teal-600" /> },
  ];

  const filteredLessons = selectedCategory === 'all'
    ? LESSONS_DATA
    : LESSONS_DATA.filter((l) => l.categoryId === selectedCategory);

  const getCategoryIcon = (catId: CategoryId) => {
    switch (catId) {
      case 'safety': return <Shield className="w-5 h-5 text-sky-600" />;
      case 'media': return <Eye className="w-5 h-5 text-indigo-600" />;
      case 'privacy': return <UserCheck className="w-5 h-5 text-violet-600" />;
      case 'manners': return <MessageSquareHeart className="w-5 h-5 text-teal-600" />;
    }
  };

  const renderInteractiveTool = (type?: string) => {
    switch (type) {
      case 'password-checker':
        return <PasswordCheckerTool />;
      case 'headline-checker':
        return <HeadlineCheckerTool />;
      case 'privacy-audit':
        return <PrivacyAuditTool />;
      case 'tone-converter':
        return <ToneConverterTool />;
      default:
        return null;
    }
  };

  // Detailed Lesson Reader View
  if (activeLesson) {
    const isCompleted = isLessonCompleted(activeLesson.id);

    return (
      <div className="max-w-4xl mx-auto py-8 space-y-8">
        {/* Top bar navigation buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <button
            onClick={() => setActiveLesson(null)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับหน้ารวมบทเรียน</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isCompleted) {
                  unmarkLessonComplete(activeLesson.id);
                } else {
                  markLessonComplete(activeLesson.id);
                }
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
              }`}
            >
              {isCompleted ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>เรียนจบแล้ว (คลิกเพื่อยกเลิก)</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>ทำเครื่องหมายว่าเรียนจบแล้ว</span>
                </>
              )}
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors"
            >
              กลับหน้าหลัก
            </button>
          </div>
        </div>

        {/* Lesson Header Banner */}
        <header className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-indigo-700 font-medium">
            <span className="font-semibold">{activeLesson.categoryTitle}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              {activeLesson.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {activeLesson.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {activeLesson.subtitle}
          </p>
        </header>

        {/* Structured Sections */}
        <div className="space-y-8">
          {activeLesson.sections.map((sec, idx) => (
            <section
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4"
            >
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{sec.heading}</span>
              </h2>

              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Actionable Tips */}
              {sec.tips && sec.tips.length > 0 && (
                <div className="bg-sky-50/60 border border-sky-100 rounded-lg p-4 space-y-2 text-xs">
                  <div className="font-semibold text-sky-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span>ข้อแนะนำที่นำไปใช้ได้ทันที (Actionable Tips):</span>
                  </div>
                  <ul className="space-y-1.5 text-sky-800 list-disc list-inside">
                    {sec.tips.map((t, tIdx) => (
                      <li key={tIdx} className="leading-relaxed">{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Real World Case Study */}
              {sec.realCase && (
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-4 space-y-2 text-xs">
                  <div className="font-semibold text-amber-900 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>กรณีศึกษาจริง (Real-World Case Study):</span>
                  </div>
                  <div className="text-amber-950 leading-relaxed font-medium">
                    {sec.realCase.situation}
                  </div>
                  <div className="text-slate-700 pt-1 border-t border-amber-200/60">
                    <span className="font-semibold text-amber-900">บทเรียนที่ได้รับ: </span>
                    {sec.realCase.lessonLearned}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Embedded Interactive Tool */}
        {activeLesson.interactiveTool && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            {renderInteractiveTool(activeLesson.interactiveTool.type)}
          </div>
        )}

        {/* Key Takeaways: สรุปสิ่งที่ควรจำ */}
        <section className="bg-gradient-to-br from-indigo-50/70 to-sky-50/70 border border-indigo-200 rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-base">
            <CheckCircle className="w-5 h-5 text-indigo-600" />
            <span>สรุปสิ่งที่ควรจำ (Key Takeaways)</span>
          </div>

          <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
            {activeLesson.keySummary.map((item, kIdx) => (
              <li key={kIdx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-2" />
                <span className="leading-relaxed font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Bottom Navigation Buttons */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => setActiveLesson(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            ← หน้ารวมบทเรียน
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('scenarios')}
              className="px-4 py-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>ไปฝึกแก้สถานการณ์</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('quiz')}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>ทำแบบทดสอบวัดผล</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Lessons Index Grid View
  return (
    <div className="py-8 space-y-8">
      {/* Title & Introduction */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
          <BookOpen className="w-3.5 h-3.5" />
          <span>คลังความรู้ดิจิทัล (Learning Hub)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          บทเรียนหลักสูตร Digital Literacy
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          เนื้อหากระชับ เข้าใจง่าย พร้อมกรณีศึกษาจริงจากสังคมไทย และเครื่องมือฝึกปฏิบัติเสมือนจริงในแต่ละบท
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Lessons Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLessons.map((lesson) => {
          const completed = isLessonCompleted(lesson.id);

          return (
            <div
              key={lesson.id}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-slate-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg">
                      {getCategoryIcon(lesson.categoryId)}
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      {lesson.categoryTitle.split('—')[0]}
                    </span>
                  </div>

                  {completed ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                      เรียนสำเร็จแล้ว
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      {lesson.readTime}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {lesson.subtitle}
                  </p>
                </div>

                {/* Key Summary Highlights */}
                <div className="bg-slate-50 rounded-lg p-3 space-y-1.5 text-xs text-slate-700">
                  <div className="font-semibold text-slate-900 flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    <span>ประเด็นเด่นในบทเรียน:</span>
                  </div>
                  <p className="line-clamp-2 leading-relaxed text-slate-600">
                    {lesson.keySummary[0]}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveLesson(lesson)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>อ่านบทเรียน</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('scenarios')}
                    className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    ทำแบบฝึก
                  </button>

                  <button
                    onClick={() => onNavigate('quiz')}
                    className="px-3 py-2 text-xs font-medium text-indigo-600 hover:text-indigo-800 border border-indigo-100 bg-indigo-50/50 rounded-lg transition-colors cursor-pointer"
                  >
                    แบบทดสอบ
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
