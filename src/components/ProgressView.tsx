import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { LESSONS_DATA } from '../data/lessonsData';
import { NavTab } from './Navbar';
import { 
  Award, CheckCircle, BookOpen, BrainCircuit, RefreshCw, Printer, 
  Sparkles, Check, ArrowRight, ShieldCheck, AlertCircle, Edit3
} from 'lucide-react';

interface ProgressViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onNavigate }) => {
  const { 
    progress, 
    completedLessonsCount, 
    totalLessons, 
    overallProgressPercent, 
    setLearnerName, 
    resetProgress 
  } = useProgress();

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(progress.learnerName);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [badgeImgError, setBadgeImgError] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    setLearnerName(tempName);
    setIsEditingName(false);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  // Recommendations according to latest score & completed lessons
  const latestQuiz = progress.quizHistory[0];
  const latestScore = latestQuiz ? latestQuiz.score : null;

  const getPersonalizedTips = () => {
    const tips: { topic: string; tip: string; priority: 'high' | 'medium' | 'good' }[] = [];

    if (completedLessonsCount < 4) {
      tips.push({
        topic: 'เรียนรู้บทเรียนให้ครบ 4 หมวด',
        tip: `คุณเรียนจบแล้ว ${completedLessonsCount} จาก 4 บทเรียน แนะนำให้อ่านบทเรียนที่เหลือเพื่อเสริมรากฐานความรู้ให้ครอบคลุม`,
        priority: 'high',
      });
    }

    if (latestScore === null) {
      tips.push({
        topic: 'ทดสอบประเมินตนเองด้วย Smart Quiz',
        tip: 'ลองทำแบบทดสอบวัดระดับ 10 ข้อ เพื่อดูจุดแข็งและข้อที่ควรระวังในการท่องโลกไซเบอร์',
        priority: 'high',
      });
    } else if (latestScore < 7) {
      tips.push({
        topic: 'ทบทวนการสังเกตข้อความฟิชชิงและสิทธิ์ PDPA',
        tip: 'สังเกตโดเมนสะกดเลียนแบบ และไม่โพสต์รูปภาพตั๋ว บัตรประชาชน หรือเอกสารสำคัญลงโซเชียลสาธารณะ',
        priority: 'medium',
      });
    } else {
      tips.push({
        topic: 'แบ่งปันและส่งต่อภูมิคุ้มกันให้คนรอบข้าง',
        tip: 'คุณมีทักษะระดับสูง ลองนำความรู้เรื่องหลัก "ชัวร์ก่อนแชร์" และ 2FA ไปช่วยแนะนำคนในครอบครัวและเพื่อนร่วมชั้น',
        priority: 'good',
      });
    }

    tips.push({
      topic: 'เปิดใช้งานการยืนยันตัวตน 2 ขั้นตอน (2FA)',
      tip: 'ตรวจเช็กบัญชีโซเชียลมีเดียหลักของคุณ (Line, Facebook, Google) ว่าได้เปิดใช้งาน 2FA ครบทุกบัญชีหรือยัง',
      priority: 'good',
    });

    return tips;
  };

  const recommendations = getPersonalizedTips();

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
          <Award className="w-3.5 h-3.5" />
          <span>แดชบอร์ดสรุปผลและความก้าวหน้า (Learner Progress)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          ความก้าวหน้าในการเป็นพลเมืองดิจิทัลรอบรู้
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          ข้อมูลจะถูกบันทึกไว้ในอุปกรณ์ของคุณโดยอัตโนมัติ (Local Storage) สามารถกลับมาเรียนต่อได้ทุกเมื่อ
        </p>
      </div>

      {/* Main KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Overall Progress */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-medium">ความคืบหน้าภาพรวม</span>
          <div className="text-3xl font-extrabold text-indigo-600 tabular-nums">
            {overallProgressPercent}%
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Card 2: Lessons Completed */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-medium">บทเรียนที่สำเร็จ</span>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {completedLessonsCount}
            <span className="text-base text-slate-400 font-normal"> / {totalLessons} บท</span>
          </div>
          <p className="text-[11px] text-slate-500">
            {completedLessonsCount === totalLessons ? 'ครบทุกบทเรียนแล้ว 🎉' : `เหลืออีก ${totalLessons - completedLessonsCount} บทเรียน`}
          </p>
        </div>

        {/* Card 3: Scenarios Solved */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-medium">ฝึกแก้สถานการณ์</span>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {Object.keys(progress.completedScenarios).length}
            <span className="text-base text-slate-400 font-normal"> / 6 ด่าน</span>
          </div>
          <p className="text-[11px] text-slate-500">
            ห้องทดลอง Scenario Lab
          </p>
        </div>

        {/* Card 4: Latest / Best Quiz Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-medium">คะแนนแบบทดสอบสูงสุด</span>
          <div className="text-3xl font-extrabold text-emerald-600 tabular-nums">
            {progress.bestScore}
            <span className="text-base text-slate-400 font-normal"> / 10 คะแนน</span>
          </div>
          <p className="text-[11px] text-slate-500">
            {latestQuiz ? `สอบล่าสุดเมื่อ ${latestQuiz.date}` : 'ยังไม่เคยทำแบบทดสอบ'}
          </p>
        </div>
      </div>

      {/* Module by Module Breakdown */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          สถานะความรู้รายหมวดวิชา (Curriculum Mastery)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LESSONS_DATA.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                  isCompleted
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                    : 'bg-slate-50/50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-slate-500">
                    {lesson.categoryTitle.split('—')[0]}
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {lesson.title}
                  </div>
                </div>

                {isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-white border border-emerald-200 px-2.5 py-1 rounded-full shrink-0 shadow-2xs">
                    <Check className="w-3.5 h-3.5" />
                    สำเร็จแล้ว
                  </span>
                ) : (
                  <button
                    onClick={() => onNavigate('lessons')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 shrink-0"
                  >
                    เริ่มเรียน →
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          คำแนะนำพัฒนาทักษะเฉพาะบุคคล (Personalized Recommendations)
        </h2>

        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1 text-xs"
            >
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>{rec.topic}</span>
              </div>
              <p className="text-slate-600 leading-relaxed pl-4">
                {rec.tip}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz History Table */}
      {progress.quizHistory.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            ประวัติการทดสอบ Smart Quiz
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-3">ครั้งที่</th>
                  <th className="py-2.5 px-3">วันและเวลา</th>
                  <th className="py-2.5 px-3">คะแนนที่ได้</th>
                  <th className="py-2.5 px-3">ร้อยละ</th>
                  <th className="py-2.5 px-3">ระดับประเมิน</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {progress.quizHistory.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/60 font-sans">
                    <td className="py-2.5 px-3 font-mono font-medium text-slate-500 tabular-nums">
                      #{progress.quizHistory.length - index}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">{item.date}</td>
                    <td className="py-2.5 px-3 font-bold text-indigo-600 tabular-nums">
                      {item.score} / {item.total}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 tabular-nums font-semibold">
                      {item.percentage}%
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                        item.score >= 9 ? 'bg-indigo-50 text-indigo-700' :
                        item.score >= 7 ? 'bg-emerald-50 text-emerald-700' :
                        item.score >= 5 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {item.score >= 9 ? 'Digital Master' :
                         item.score >= 7 ? 'Digital Native' :
                         item.score >= 5 ? 'Digital Explorer' : 'Digital Rookie'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Official Digital Citizen Certificate */}
      <section className="space-y-4 print:p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              ใบประกาศนียบัตร Digital Smart Citizen
            </h2>
            <p className="text-xs text-slate-500">
              รับรองความพร้อมทักษะความรู้ดิจิทัลและการรู้เท่าทันสื่อออนไลน์
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditingName(!isEditingName)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>เปลี่ยนชื่อผู้เรียน</span>
            </button>

            <button
              onClick={handlePrintCertificate}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>พิมพ์ / บันทึก PDF</span>
            </button>
          </div>
        </div>

        {/* Change Name Inline Form */}
        {isEditingName && (
          <form onSubmit={handleSaveName} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="กรอกชื่อ-นามสกุล ของคุณ..."
              className="px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1 max-w-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              บันทึกชื่อ
            </button>
            <button
              type="button"
              onClick={() => setIsEditingName(false)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              ยกเลิก
            </button>
          </form>
        )}

        {/* Certificate Canvas Frame */}
        <div className="relative bg-white border-8 border-double border-indigo-900/40 rounded-2xl p-8 sm:p-12 shadow-md text-center space-y-6 overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-indigo-100/50 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-sky-100/50 to-transparent rounded-tr-full pointer-events-none" />

          {/* Certificate Badge Image */}
          <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28">
            {!badgeImgError ? (
              <img
                src="/src/assets/images/badge_digital_citizen_1792603933861.jpg"
                alt="Digital Literacy Certificate Badge"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-md"
                onError={() => setBadgeImgError(true)}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-12 h-12" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-widest text-indigo-700 uppercase">
              CERTIFICATE OF DIGITAL LITERACY ACHIEVEMENT
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              ประกาศนียบัตรพลเมืองดิจิทัลรอบรู้
            </h3>
            <p className="text-xs text-slate-500">
              มอบให้เพื่อแสดงว่า
            </p>
          </div>

          {/* Recipient Name */}
          <div className="py-2 border-b-2 border-indigo-600/40 max-w-md mx-auto">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-900 tracking-wide font-sans">
              {progress.learnerName}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            ได้ผ่านการศึกษาหลักสูตร <strong>Digital Smart — ฉลาดใช้ชีวิตในโลกดิจิทัล</strong> ครบถ้วนทั้ง 4 หมวดวิชา
            มีความรู้ความเข้าใจด้านความปลอดภัยไซเบอร์ การตรวจสอบข้อเท็จจริงของสื่อ
            การปกป้องข้อมูลส่วนบุคคล และการสื่อสารอย่างสร้างสรรค์ในสังคมออนไลน์
          </p>

          {/* Signatures & Verification Details */}
          <div className="pt-6 grid grid-cols-2 gap-8 max-w-md mx-auto text-xs text-slate-600 border-t border-slate-200">
            <div>
              <div className="font-semibold text-slate-900">วันที่มอบ</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            <div>
              <div className="font-semibold text-slate-900">เกียรติบัตรรับรอง</div>
              <div className="text-[11px] text-indigo-700 font-bold mt-0.5">
                Digital Smart Thailand
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reset Progress Danger Zone */}
      <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          ต้องการเริ่มเรียนและทำคะแนนใหม่ทั้งหมด?
        </div>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>รีเซ็ตประวัติความก้าวหน้า</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-rose-600 font-medium">ยืนยันการล้างข้อมูล?</span>
            <button
              onClick={() => {
                resetProgress();
                setShowResetConfirm(false);
              }}
              className="px-2.5 py-1 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded transition-colors"
            >
              ใช่, รีเซ็ต
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-800"
            >
              ยกเลิก
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
