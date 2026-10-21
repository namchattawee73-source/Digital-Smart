import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizQuestion } from '../types';
import { useProgress } from '../context/ProgressContext';
import { NavTab } from './Navbar';
import { 
  HelpCircle, CheckCircle, XCircle, RotateCcw, ArrowRight, 
  Home, Award, Sparkles, Check, ChevronRight, BarChart3
} from 'lucide-react';

interface QuizViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onNavigate }) => {
  const { saveQuizResult } = useProgress();

  // State
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => [...QUIZ_QUESTIONS]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const currentQ = questions[currentIndex];
  const selectedAnswer = userAnswers[currentQ.id];

  const handleSelectOption = (optIndex: number) => {
    if (isAnswerChecked) return; // Prevent changing after checking
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIndex,
    }));
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === undefined) return;
    setIsAnswerChecked(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswerChecked(userAnswers[questions[currentIndex + 1].id] !== undefined);
    } else {
      // Calculate final score
      let score = 0;
      questions.forEach((q) => {
        if (userAnswers[q.id] === q.correctAnswerIndex) {
          score += 1;
        }
      });
      setFinalScore(score);
      setIsQuizCompleted(true);
      saveQuizResult(score, questions.length);
    }
  };

  const handleRestart = () => {
    // Shuffle questions slightly for retake challenge
    const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setUserAnswers({});
    setIsAnswerChecked(false);
    setIsQuizCompleted(false);
    setFinalScore(0);
  };

  // Evaluation Tier Description
  const getScoreTier = (score: number) => {
    const percentage = Math.round((score / 10) * 100);
    if (score >= 9) {
      return {
        level: 'Digital Master (ระดับเชี่ยวชาญยอดเยี่ยม)',
        badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
        textColor: 'text-indigo-700',
        desc: 'ยอดเยี่ยมมาก! คุณมีความรู้เท่าทันสื่อและภัยไซเบอร์ในระดับสูงสุด สามารถปกป้องตนเองจากกลโกง ข่าวลวง และเป็นที่พึ่งพาให้คำแนะนำแก่เพื่อนๆ และครอบครัวได้อย่างมั่นใจ'
      };
    }
    if (score >= 7) {
      return {
        level: 'Digital Native (ระดับรอบรู้และปลอดภัย)',
        badgeColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        textColor: 'text-emerald-700',
        desc: 'ทำได้ดีมาก! คุณมีพื้นฐาน Digital Literacy ที่แข็งแกร่ง รู้จักป้องกันรหัสผ่าน และแยกแยะข้อมูลได้ดี เพียงทบทวนรายละเอียดเรื่องการแชร์ข้อมูลส่วนตัวอีกเล็กน้อยจะสมบูรณ์แบบ'
      };
    }
    if (score >= 5) {
      return {
        level: 'Digital Explorer (ระดับกำลังพัฒนา)',
        badgeColor: 'text-amber-600 bg-amber-50 border-amber-200',
        textColor: 'text-amber-700',
        desc: 'ผ่านเกณฑ์มาตรฐาน แต่ยังมีบางจุดที่อาจเผลอตกเป็นเหยื่อภัยไซเบอร์ เช่น การตรวจสอบข่าวปลอมหรือการเปิดเผยข้อมูลส่วนตัว แนะนำให้กลับไปทบทวนบทเรียนและทำแบบฝึกสถานการณ์เพิ่มเติม'
      };
    }
    return {
      level: 'Digital Rookie (ระดับต้องระวังเป็นพิเศษ)',
      badgeColor: 'text-rose-600 bg-rose-50 border-rose-200',
      textColor: 'text-rose-700',
      desc: 'ควรเพิ่มความระมัดระวังในการใช้งานอินเทอร์เน็ต! ภัยไซเบอร์ในปัจจุบันมีความซับซ้อน แนะนำให้อ่านบทเรียนทั้ง 4 หมวดอย่างละเอียดเพื่อเสริมสร้างเกราะคุ้มกันดิจิทัลของคุณ'
    };
  };

  // 1. Completion Result Screen
  if (isQuizCompleted) {
    const tier = getScoreTier(finalScore);
    const percentage = Math.round((finalScore / 10) * 100);

    return (
      <div className="max-w-3xl mx-auto py-8 space-y-8">
        {/* Score Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${tier.badgeColor}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tier.level}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              ผลการประเมินทักษะดิจิทัล
            </h1>
          </div>

          {/* Big Score Display */}
          <div className="py-4">
            <div className="text-6xl sm:text-7xl font-extrabold text-indigo-600 tabular-nums">
              {finalScore}
              <span className="text-2xl sm:text-3xl text-slate-400 font-bold"> / 10</span>
            </div>
            <div className="text-sm font-semibold text-slate-600 mt-1">
              คิดเป็น <span className="text-slate-900 font-bold tabular-nums">{percentage}%</span> ของคะแนนเต็ม
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto leading-relaxed">
            {tier.desc}
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ทำแบบทดสอบอีกครั้ง</span>
            </button>

            <button
              onClick={() => onNavigate('progress')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>ดูสรุปความก้าวหน้าและใบประกาศ</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>กลับหน้าหลัก</span>
            </button>
          </div>
        </div>

        {/* Detailed Answers Review with Explanations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-indigo-600" />
              เฉลยพร้อมคำอธิบายแบบละเอียด (ครบ 10 ข้อ)
            </h2>
            <span className="text-xs text-slate-500">
              ถูก {finalScore} ข้อ · ผิด {10 - finalScore} ข้อ
            </span>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.correctAnswerIndex;

              return (
                <div
                  key={q.id}
                  className={`bg-white border rounded-xl p-5 shadow-xs space-y-3 ${
                    isCorrect ? 'border-slate-200' : 'border-rose-200 bg-rose-50/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      ข้อที่ {idx + 1}. {q.question}
                    </h3>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                        <Check className="w-3 h-3" /> ถูกต้อง
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full shrink-0">
                        <XCircle className="w-3 h-3" /> ตอบผิด
                      </span>
                    )}
                  </div>

                  {/* Options List */}
                  <div className="space-y-1.5 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const isOptionCorrect = oIdx === q.correctAnswerIndex;
                      const isOptionSelected = oIdx === userAns;

                      let style = 'text-slate-600 bg-slate-50 border-slate-100';
                      if (isOptionCorrect) {
                        style = 'text-emerald-900 bg-emerald-50 border-emerald-300 font-semibold';
                      } else if (isOptionSelected && !isOptionCorrect) {
                        style = 'text-rose-900 bg-rose-50 border-rose-300 font-medium line-through';
                      }

                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-lg border flex items-center justify-between ${style}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                            <span>{opt}</span>
                          </div>
                          {isOptionCorrect && (
                            <span className="text-[10px] bg-emerald-200/60 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                              คำตอบที่ถูกต้อง
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Note */}
                  <div className="pt-2 text-xs text-slate-600 border-t border-slate-100 space-y-1">
                    <p className="leading-relaxed">
                      <span className="font-semibold text-slate-800">คำอธิบาย: </span>
                      {q.explanation}
                    </p>
                    <p className="text-indigo-700 font-medium">
                      💡 สรุปข้อคิด: {q.tip}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 2. Active Quiz Taking Screen
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      {/* Quiz Header & Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="inline-flex items-center gap-1.5 font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>แบบทดสอบทักษะดิจิทัล (Smart Quiz)</span>
          </div>

          <div className="font-semibold text-slate-700 tabular-nums">
            คำถามข้อที่ {currentIndex + 1} จาก {questions.length}
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
            หมวด {currentQ.categoryId === 'safety' ? 'Digital Safety' : currentQ.categoryId === 'media' ? 'Media Check' : currentQ.categoryId === 'privacy' ? 'Privacy Guard' : 'Digital Manners'}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, optIdx) => {
            const isSelected = selectedAnswer === optIdx;
            const isCorrect = optIdx === currentQ.correctAnswerIndex;

            let cardStyle = 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/50 text-slate-800';

            if (isAnswerChecked) {
              if (isCorrect) {
                cardStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-500';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'border-rose-400 bg-rose-50/70 text-rose-950 ring-1 ring-rose-400';
              } else {
                cardStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-70';
              }
            } else if (isSelected) {
              cardStyle = 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-200';
            }

            return (
              <button
                key={optIdx}
                disabled={isAnswerChecked}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${cardStyle}`}
              >
                <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                  isAnswerChecked
                    ? isCorrect
                      ? 'bg-emerald-600 text-white'
                      : isSelected
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                    : isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="leading-relaxed pt-0.5">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Answer Checked Feedback Box */}
        {isAnswerChecked && (
          <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 animate-fadeIn ${
            selectedAnswer === currentQ.correctAnswerIndex
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            <div className="font-bold flex items-center gap-1.5">
              {selectedAnswer === currentQ.correctAnswerIndex ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>ถูกต้อง!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>ยังไม่ถูกต้อง</span>
                </>
              )}
            </div>
            <p className="text-slate-700">{currentQ.explanation}</p>
            <p className="font-semibold text-indigo-700 pt-1">💡 ข้อคิด: {currentQ.tip}</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← กลับหน้าหลัก
          </button>

          <div className="flex items-center gap-3">
            {!isAnswerChecked ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === undefined}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                ตรวจคำตอบ
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>{currentIndex < questions.length - 1 ? 'ข้อต่อไป' : 'ดูผลคะแนนเต็ม'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
