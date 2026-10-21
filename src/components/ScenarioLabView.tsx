import React, { useState } from 'react';
import { SCENARIOS_DATA } from '../data/scenariosData';
import { Scenario, ScenarioOption } from '../types';
import { useProgress } from '../context/ProgressContext';
import { NavTab } from './Navbar';
import { 
  BrainCircuit, CheckCircle, AlertTriangle, XCircle, ArrowRight, 
  RotateCcw, Sparkles, MessageSquare, Smartphone, Globe, Wifi, Check
} from 'lucide-react';

interface ScenarioLabViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const ScenarioLabView: React.FC<ScenarioLabViewProps> = ({ onNavigate }) => {
  const { progress, saveScenarioResult } = useProgress();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const scenario: Scenario = SCENARIOS_DATA[currentScenarioIndex];
  const userRecord = progress.completedScenarios[scenario.id];

  const selectedOption: ScenarioOption | undefined = scenario.options.find(
    (o) => o.id === (selectedOptionId || userRecord?.optionId)
  );

  const handleSelectOption = (option: ScenarioOption) => {
    setSelectedOptionId(option.id);
    saveScenarioResult(scenario.id, option.id, option.score);
  };

  const handleNext = () => {
    if (currentScenarioIndex < SCENARIOS_DATA.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
      setSelectedOptionId(null);
    }
  };

  const handlePrev = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex((prev) => prev - 1);
      setSelectedOptionId(null);
    }
  };

  const handleRetryCurrent = () => {
    setSelectedOptionId(null);
  };

  const getChannelIcon = (channel: Scenario['channel']) => {
    switch (channel) {
      case 'SMS': return <Smartphone className="w-4 h-4 text-sky-600" />;
      case 'Social Media': return <Globe className="w-4 h-4 text-indigo-600" />;
      case 'Chat': return <MessageSquare className="w-4 h-4 text-emerald-600" />;
      case 'Public Wi-Fi': return <Wifi className="w-4 h-4 text-amber-600" />;
      default: return <BrainCircuit className="w-4 h-4 text-violet-600" />;
    }
  };

  const getFeedbackBadge = (type: ScenarioOption['feedbackType']) => {
    switch (type) {
      case 'excellent':
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>คำตอบปลอดภัยและเหมาะสมที่สุด (+100 คะแนน)</span>
          </div>
        );
      case 'warning':
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-fit">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>คำตอบยังมีความเสี่ยง</span>
          </div>
        );
      case 'danger':
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full w-fit">
            <XCircle className="w-3.5 h-3.5" />
            <span>คำตอบอันตรายมาก ตกเป็นเหยื่อภัยไซเบอร์</span>
          </div>
        );
    }
  };

  const completedCount = Object.keys(progress.completedScenarios).length;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>ห้องทดลองสถานการณ์ (Scenario Lab)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ฝึกทักษะการตัดสินใจในโลกดิจิทัล
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            จำลองเหตุการณ์จริงที่คุณอาจพบเจอในชีวิตประจำวัน เลือกวิธีรับมือแล้วดูผลลัพธ์ทันที
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 shrink-0">
          <span>ผ่านแล้ว:</span>
          <span className="font-bold text-indigo-600 tabular-nums">
            {completedCount} / {SCENARIOS_DATA.length} สถานการณ์
          </span>
        </div>
      </div>

      {/* Scenario Progress Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {SCENARIOS_DATA.map((sc, idx) => {
          const isDone = !!progress.completedScenarios[sc.id];
          const isCurrent = idx === currentScenarioIndex;

          return (
            <button
              key={sc.id}
              onClick={() => {
                setCurrentScenarioIndex(idx);
                setSelectedOptionId(null);
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 border cursor-pointer ${
                isCurrent
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>ด่านที่ {idx + 1}</span>
              {isDone && <Check className="w-3 h-3 text-emerald-600" />}
            </button>
          );
        })}
      </div>

      {/* Main Scenario Workspace */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Scenario Header info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              {getChannelIcon(scenario.channel)}
              {scenario.channel}
            </span>
            <span aria-hidden="true">·</span>
            <span>หมวด {scenario.categoryTitle}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {scenario.title}
          </h2>

          <p className="text-sm text-slate-700 leading-relaxed">
            {scenario.context}
          </p>
        </div>

        {/* Realistic Channel Mock UI */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>หน้าจอจำลองการสื่อสารจริง ({scenario.channel})</span>
            {scenario.mockContent.subText && (
              <span className="text-[10px] lowercase text-slate-400 font-normal">
                {scenario.mockContent.subText}
              </span>
            )}
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{scenario.mockContent.sender}</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-sans">
              {scenario.mockContent.message}
            </p>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="pt-2">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3">
            หากคุณตกอยู่ในสถานการณ์นี้ คุณควรตัดสินใจอย่างไร?
          </h3>

          <div className="space-y-3">
            {scenario.options.map((opt, oIdx) => {
              const isSelected = selectedOption?.id === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? opt.isBest
                        ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950 ring-2 ring-emerald-200'
                        : opt.score > 0
                        ? 'bg-amber-50/80 border-amber-400 text-amber-950 ring-2 ring-amber-200'
                        : 'bg-rose-50/80 border-rose-400 text-rose-950 ring-2 ring-rose-200'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-slate-50/60'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected
                      ? opt.isBest ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="leading-relaxed font-medium pt-0.5">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Immediate Result & Explanatory Feedback */}
        {selectedOption && (
          <div className={`rounded-xl p-5 border space-y-3 transition-all ${
            selectedOption.isBest
              ? 'bg-emerald-50/50 border-emerald-200'
              : selectedOption.score > 0
              ? 'bg-amber-50/50 border-amber-200'
              : 'bg-rose-50/50 border-rose-200'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              {getFeedbackBadge(selectedOption.feedbackType)}
              <span className="text-xs font-semibold text-slate-800">
                {selectedOption.feedbackTitle}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedOption.feedbackText}
            </p>

            <div className="pt-2 border-t border-slate-200/60 flex items-start gap-2 text-xs text-indigo-900 font-medium">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>แนวทางที่ถูกต้อง: {selectedOption.tips}</span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleRetryCurrent}
                className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ลองเลือกข้ออื่นดูผลลัพธ์</span>
              </button>
            </div>
          </div>
        )}

        {/* Stepper Navigation */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentScenarioIndex === 0}
            className="px-4 py-2 text-xs font-semibold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:text-slate-900 transition-colors"
          >
            ← สถานการณ์ก่อนหน้า
          </button>

          <div className="flex items-center gap-3">
            {currentScenarioIndex < SCENARIOS_DATA.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>สถานการณ์ถัดไป</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate('quiz')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>ไปทดสอบ Smart Quiz 10 ข้อ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
