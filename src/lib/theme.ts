import { Lesson } from '@/types/lesson';

export type CategoryTheme = 'basic' | 'channel' | 'sync' | 'pattern';

export interface ThemeConfig {
  id: CategoryTheme;
  name: string;
  morphismClass: string;
  themeClass: string;
  textColor: string;
  accentColor: string;
  description: string;
}

export const CATEGORY_THEMES: Record<CategoryTheme, ThemeConfig> = {
  basic: {
    id: 'basic',
    name: '基礎編',
    morphismClass: 'neomorphism',
    themeClass: 'theme-basic',
    textColor: 'text-gray-900 font-medium',
    accentColor: 'text-teal-800',
    description: 'ネオモーフィズム - 柔らかい影の立体感'
  },
  channel: {
    id: 'channel',
    name: 'チャネル操作編',
    morphismClass: 'glassmorphism',
    themeClass: 'theme-channel',
    textColor: 'text-white font-bold drop-shadow-sm',
    accentColor: 'text-indigo-100',
    description: 'グラスモーフィズム - 透明感のあるガラス風'
  },
  sync: {
    id: 'sync',
    name: '同期編',
    morphismClass: 'metallicmorphism',
    themeClass: 'theme-sync',
    textColor: 'text-white font-semibold',
    accentColor: 'text-gray-300',
    description: 'メタリックモーフィズム - 金属質の質感'
  },
  pattern: {
    id: 'pattern',
    name: '実践パターン編',
    morphismClass: 'cybermorphism',
    themeClass: 'theme-pattern',
    textColor: 'text-white font-bold drop-shadow-md',
    accentColor: 'text-purple-200',
    description: 'サイバーモーフィズム - 未来的なネオン風'
  }
};

export function getCategoryTheme(category: CategoryTheme): ThemeConfig {
  return CATEGORY_THEMES[category];
}

export function getLessonTheme(lesson: Lesson): ThemeConfig {
  return getCategoryTheme(lesson.category);
}

export function getCategoryGradientClass(category: CategoryTheme): string {
  return `bg-theme-${category}`;
}

export function getCategoryCardClasses(category: CategoryTheme): string {
  const theme = getCategoryTheme(category);
  return `${theme.themeClass} ${theme.morphismClass}`;
}

export function getCategoryTextClasses(category: CategoryTheme): string {
  const theme = getCategoryTheme(category);
  return theme.textColor;
}

export function getCategoryAccentClasses(category: CategoryTheme): string {
  const theme = getCategoryTheme(category);
  return theme.accentColor;
}

export function getDifficultyBadgeClasses(difficulty: 'beginner' | 'intermediate' | 'advanced', category: CategoryTheme): string {
  const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
  
  // カテゴリ別に色を調整
  switch (category) {
    case 'basic':
      switch (difficulty) {
        case 'beginner':
          return `${baseClasses} bg-green-600/80 text-white border border-green-700`;
        case 'intermediate':
          return `${baseClasses} bg-yellow-600/80 text-white border border-yellow-700`;
        case 'advanced':
          return `${baseClasses} bg-red-600/80 text-white border border-red-700`;
        default:
          return `${baseClasses} bg-gray-600/80 text-white border border-gray-700`;
      }
    case 'channel':
      switch (difficulty) {
        case 'beginner':
          return `${baseClasses} bg-green-600/80 text-white font-bold border border-green-400 shadow-lg shadow-green-600/20`;
        case 'intermediate':
          return `${baseClasses} bg-yellow-600/80 text-white font-bold border border-yellow-400 shadow-lg shadow-yellow-600/20`;
        case 'advanced':
          return `${baseClasses} bg-red-600/80 text-white font-bold border border-red-400 shadow-lg shadow-red-600/20`;
        default:
          return `${baseClasses} bg-gray-600/80 text-white font-bold border border-gray-400 shadow-lg shadow-gray-600/20`;
      }
    default:
      switch (difficulty) {
        case 'beginner':
          return `${baseClasses} bg-green-500/20 text-green-300 border border-green-500/30`;
        case 'intermediate':
          return `${baseClasses} bg-yellow-500/20 text-yellow-300 border border-yellow-500/30`;
        case 'advanced':
          return `${baseClasses} bg-red-500/20 text-red-300 border border-red-500/30`;
        default:
          return `${baseClasses} bg-gray-500/20 text-gray-300 border border-gray-500/30`;
      }
  }
}

export function getProgressBarClasses(category: CategoryTheme): string {
  switch (category) {
    case 'basic':
      return 'bg-teal-500';
    case 'channel':
      return 'bg-indigo-500';
    case 'sync':
      return 'bg-gray-500';
    case 'pattern':
      return 'bg-purple-500';
    default:
      return 'bg-blue-500';
  }
}