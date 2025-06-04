export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'basic' | 'channel' | 'sync' | 'pattern';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objectives: string[];
  hints: {
    text: string;
    level: number;
  }[];
  initialCode: string;
  expectedKeywords: string[];
  solution: string;
  testCases?: {
    input?: string;
    expectedOutput: string;
  }[];
  expectedOutputPatterns?: string[]; // 正規表現パターン
  requiredOutputs?: string[]; // 必須の出力文字列
  validationMode?: 'keywords' | 'output' | 'both'; // 検証モード
  resources?: {
    title: string;
    url: string;
  }[];
}

export interface ConsoleOutput {
  id: string;
  type: 'output' | 'error' | 'info';
  content: string;
  timestamp: Date;
}

export type LessonStatus = 'not-started' | 'in-progress' | 'completed';

export interface LessonProgress {
  lessonId: string;
  status: LessonStatus;
  currentCode: string;
  completedAt?: Date;
}

export interface Category {
  id: 'basic' | 'channel' | 'sync' | 'pattern';
  name: string;
  description: string;
  icon?: string;
  order: number;
}

export interface ValidationResult {
  isCorrect: boolean;
  score: number; // 0-100
  feedback: {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
  }[];
  details?: {
    keywordCheck?: {
      passed: boolean;
      missing: string[];
    };
    outputCheck?: {
      passed: boolean;
      expected: string[];
      actual: string[];
      missing: string[];
    };
  };
}