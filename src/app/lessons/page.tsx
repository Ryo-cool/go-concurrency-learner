'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLessons } from '@/hooks/useLessons';
import { Lesson } from '@/types/lesson';
import { IoChevronForward, IoCheckmarkCircle, IoTime, IoPlay } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { 
  getCategoryTheme, 
  getDifficultyBadgeClasses,
  CategoryTheme
} from '@/lib/theme';

export default function LessonsPage() {
  const router = useRouter();
  const {
    lessons,
    categories,
    progress,
    isLoading,
    loadLessons,
    filterByCategory,
    searchLessons,
    selectLesson,
  } = useLessons();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    filterByCategory(categoryId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchLessons(query);
  };

  const handleLessonSelect = (lessonId: string) => {
    selectLesson(lessonId);
    router.push(`/lessons/${lessonId}`);
  };

  const getLessonStatus = (lessonId: string) => {
    const lessonProgress = progress.find(p => p.lessonId === lessonId);
    return lessonProgress?.status || 'not-started';
  };

  const getCompletionRate = (categoryId?: string) => {
    const categoryLessons = categoryId 
      ? lessons.filter(l => l.category === categoryId)
      : lessons;
    
    if (categoryLessons.length === 0) return 0;
    
    const completed = categoryLessons.filter(lesson => 
      getLessonStatus(lesson.id) === 'completed'
    ).length;
    
    return Math.round((completed / categoryLessons.length) * 100);
  };


  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-500">レッスンを読み込み中...</div>
      </div>
    );
  }

  const totalCompletionRate = getCompletionRate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Go並行処理学習
          </h1>
          <p className="text-gray-600">
            Goroutineとチャネルを使った並行処理をマスターしよう
          </p>
          
          {/* Overall Progress */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600">全体の進捗</span>
              <span className="text-sm font-medium text-gray-800">
                {totalCompletionRate}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{ width: `${totalCompletionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="レッスンを検索..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 backdrop-blur-sm"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => handleCategorySelect(null)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap",
              selectedCategory === null
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white/70 text-gray-700 hover:bg-white/90 backdrop-blur-sm"
            )}
          >
            すべて
          </button>
          {categories.map((category) => {
            const theme = getCategoryTheme(category.id as CategoryTheme);
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2",
                  theme.themeClass,
                  selectedCategory === category.id
                    ? `${theme.morphismClass} ${theme.textColor} shadow-lg`
                    : "bg-white/70 text-gray-700 hover:bg-white/90 backdrop-blur-sm"
                )}
              >
                <span>{category.icon}</span>
                {category.name}
                <span className="text-xs opacity-70">({theme.description})</span>
              </button>
            );
          })}
        </div>

        {/* Category Sections */}
        {selectedCategory === null ? (
          // Show all categories
          categories.map((category) => {
            const categoryLessons = lessons.filter(l => l.category === category.id);
            const categoryCompletion = getCompletionRate(category.id);
            
            if (categoryLessons.length === 0) return null;
            
            return (
              <div key={category.id} className="mb-12">
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{category.icon}</span>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {category.name}
                    </h2>
                    <span className="text-sm text-gray-600">
                      ({categoryCompletion}% 完了)
                    </span>
                  </div>
                  <p className="text-gray-600">{category.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryLessons.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      status={getLessonStatus(lesson.id)}
                      onClick={() => handleLessonSelect(lesson.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          // Show filtered lessons
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                status={getLessonStatus(lesson.id)}
                onClick={() => handleLessonSelect(lesson.id)}
              />
            ))}
          </div>
        )}

        {lessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">レッスンが見つかりませんでした</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface LessonCardProps {
  lesson: Lesson;
  status: string;
  onClick: () => void;
}

function LessonCard({ lesson, status, onClick }: LessonCardProps) {
  const theme = getCategoryTheme(lesson.category as CategoryTheme);
  
  const getStatusIcon = (status: string) => {
    const iconClass = "w-5 h-5";
    switch (status) {
      case 'completed':
        return <IoCheckmarkCircle className={cn(iconClass, "text-green-600")} />;
      case 'in-progress':
        return <IoTime className={cn(iconClass, "text-yellow-600")} />;
      default:
        return <IoPlay className={cn(iconClass, theme.accentColor)} />;
    }
  };

  const getDifficultyLabel = (difficulty: Lesson['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return '初級';
      case 'intermediate':
        return '中級';
      case 'advanced':
        return '上級';
    }
  };

  return (
    <div className={theme.themeClass}>
      <div
        onClick={onClick}
        className={cn(
          theme.morphismClass,
          "p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer",
          status === 'completed' ? 'ring-2 ring-green-500/30' : '',
          "hover:scale-[1.02] transform duration-300"
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className={cn("text-lg font-semibold mb-2", theme.textColor)}>
              {lesson.title}
            </h3>
            <div className={cn(
              "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
              getDifficultyBadgeClasses(lesson.difficulty, lesson.category as CategoryTheme)
            )}>
              {getDifficultyLabel(lesson.difficulty)}
            </div>
          </div>
          {getStatusIcon(status)}
        </div>
        
        <p className={cn("text-sm mb-4 line-clamp-2 opacity-80", theme.textColor)}>
          {lesson.objectives[0]}
        </p>
        
        <div className="flex items-center justify-between">
          <span className={cn("text-xs opacity-60", theme.textColor)}>
            {lesson.objectives.length} つの学習目標
          </span>
          <IoChevronForward className={cn("w-4 h-4 opacity-60", theme.textColor)} />
        </div>
      </div>
    </div>
  );
}