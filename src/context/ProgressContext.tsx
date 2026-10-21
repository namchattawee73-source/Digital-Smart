import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProgress } from '../types';

interface ProgressContextType {
  progress: UserProgress;
  markLessonComplete: (lessonId: string) => void;
  unmarkLessonComplete: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  saveScenarioResult: (scenarioId: string, optionId: string, score: number) => void;
  saveQuizResult: (score: number, total: number) => { isNewBest: boolean };
  setLearnerName: (name: string) => void;
  resetProgress: () => void;
  totalLessons: number;
  completedLessonsCount: number;
  completedScenariosCount: number;
  overallProgressPercent: number;
}

const STORAGE_KEY = 'digital_smart_progress_v1';

const defaultProgress: UserProgress = {
  learnerName: 'ผู้เรียนรู้ดิจิทัล',
  completedLessons: [],
  completedScenarios: {},
  quizHistory: [],
  bestScore: 0,
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // LocalStorage not available or parse error
    }
    return defaultProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  const markLessonComplete = (lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const unmarkLessonComplete = (lessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedLessons: prev.completedLessons.filter((id) => id !== lessonId),
    }));
  };

  const isLessonCompleted = (lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  };

  const saveScenarioResult = (scenarioId: string, optionId: string, score: number) => {
    setProgress((prev) => ({
      ...prev,
      completedScenarios: {
        ...prev.completedScenarios,
        [scenarioId]: { optionId, score },
      },
    }));
  };

  const saveQuizResult = (score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    const date = new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    let isNewBest = false;
    setProgress((prev) => {
      isNewBest = score > prev.bestScore;
      const updatedBest = Math.max(prev.bestScore, score);
      return {
        ...prev,
        bestScore: updatedBest,
        quizHistory: [
          { score, total, percentage, date },
          ...prev.quizHistory.slice(0, 9), // keep last 10 attempts
        ],
      };
    });

    return { isNewBest };
  };

  const setLearnerName = (name: string) => {
    const trimmed = name.trim() || 'ผู้เรียนรู้ดิจิทัล';
    setProgress((prev) => ({
      ...prev,
      learnerName: trimmed,
    }));
  };

  const resetProgress = () => {
    setProgress({
      ...defaultProgress,
      learnerName: progress.learnerName,
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const totalLessons = 4;
  const completedLessonsCount = progress.completedLessons.length;
  const completedScenariosCount = Object.keys(progress.completedScenarios).length;

  // Calculation: Lessons 50% weight (12.5% each), Scenarios 25% weight, Quiz 25% weight
  const lessonProgress = (completedLessonsCount / 4) * 50;
  const scenarioProgress = Math.min(25, (completedScenariosCount / 4) * 25);
  const quizProgress = progress.quizHistory.length > 0 ? (progress.bestScore / 10) * 25 : 0;
  const overallProgressPercent = Math.min(100, Math.round(lessonProgress + scenarioProgress + quizProgress));

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markLessonComplete,
        unmarkLessonComplete,
        isLessonCompleted,
        saveScenarioResult,
        saveQuizResult,
        setLearnerName,
        resetProgress,
        totalLessons,
        completedLessonsCount,
        completedScenariosCount,
        overallProgressPercent,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
