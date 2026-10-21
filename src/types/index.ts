export type CategoryId = 'safety' | 'media' | 'privacy' | 'manners';

export interface Lesson {
  id: string;
  categoryId: CategoryId;
  categoryTitle: string;
  title: string;
  subtitle: string;
  readTime: string;
  keySummary: string[];
  sections: {
    heading: string;
    content: string[];
    tips?: string[];
    realCase?: {
      situation: string;
      lessonLearned: string;
    };
  }[];
  interactiveTool?: {
    type: 'password-checker' | 'headline-checker' | 'privacy-audit' | 'tone-converter';
    title: string;
    description: string;
  };
}

export interface ScenarioOption {
  id: string;
  text: string;
  isBest: boolean;
  score: number; // 0 (dangerous), 50 (risky/suboptimal), 100 (best)
  feedbackType: 'excellent' | 'warning' | 'danger';
  feedbackTitle: string;
  feedbackText: string;
  tips: string;
}

export interface Scenario {
  id: string;
  categoryId: CategoryId;
  categoryTitle: string;
  title: string;
  context: string;
  channel: 'SMS' | 'Social Media' | 'Chat' | 'Public Wi-Fi' | 'Video/AI' | 'Email';
  mockContent: {
    sender: string;
    message: string;
    subText?: string;
  };
  options: ScenarioOption[];
}

export interface QuizQuestion {
  id: number;
  categoryId: CategoryId;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  tip: string;
}

export interface UserProgress {
  learnerName: string;
  completedLessons: string[]; // lesson ids
  completedScenarios: Record<string, { optionId: string; score: number }>;
  quizHistory: {
    score: number;
    total: number;
    percentage: number;
    date: string;
  }[];
  bestScore: number;
}
