import React, { useState } from 'react';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { Navbar, NavTab } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { LearningHubView } from './components/LearningHubView';
import { ScenarioLabView } from './components/ScenarioLabView';
import { QuizView } from './components/QuizView';
import { ProgressView } from './components/ProgressView';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [targetLessonId, setTargetLessonId] = useState<string | undefined>(undefined);
  const { overallProgressPercent } = useProgress();

  const handleNavigate = (tab: NavTab, extra?: { lessonId?: string }) => {
    if (extra?.lessonId) {
      setTargetLessonId(extra.lessonId);
    } else {
      setTargetLessonId(undefined);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => handleNavigate(tab)}
        overallProgressPercent={overallProgressPercent}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'home' && (
          <HomeView onNavigate={handleNavigate} />
        )}

        {activeTab === 'lessons' && (
          <LearningHubView
            onNavigate={handleNavigate}
            initialLessonId={targetLessonId}
          />
        )}

        {activeTab === 'scenarios' && (
          <ScenarioLabView onNavigate={handleNavigate} />
        )}

        {activeTab === 'quiz' && (
          <QuizView onNavigate={handleNavigate} />
        )}

        {activeTab === 'progress' && (
          <ProgressView onNavigate={handleNavigate} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  );
}
