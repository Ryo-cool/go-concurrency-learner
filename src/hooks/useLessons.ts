'use client';

import { useState, useEffect, useCallback } from 'react';
import { Lesson, Category, LessonProgress, LessonStatus } from '@/types/lesson';

interface UseLessonsReturn {
  lessons: Lesson[];
  categories: Category[];
  currentLesson: Lesson | null;
  progress: LessonProgress[];
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  loadLessons: () => Promise<void>;
  selectLesson: (id: string) => void;
  updateProgress: (id: string, status: LessonStatus, code?: string) => void;
  filterByCategory: (category: string | null) => void;
  searchLessons: (query: string) => void;
  getNextLesson: () => Lesson | null;
  getPreviousLesson: () => Lesson | null;
}

const PROGRESS_STORAGE_KEY = 'go-concurrency-learner-progress';

export function useLessons(): UseLessonsReturn {
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Failed to load progress:', e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (progress.length > 0) {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  // Load lessons on initial mount
  useEffect(() => {
    loadLessons();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Apply filters
  useEffect(() => {
    let filtered = [...allLessons];

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter(lesson => lesson.category === categoryFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lesson =>
        lesson.title.toLowerCase().includes(query) ||
        lesson.description.toLowerCase().includes(query) ||
        lesson.objectives.some(obj => obj.toLowerCase().includes(query))
      );
    }

    setLessons(filtered);
  }, [allLessons, categoryFilter, searchQuery]);

  const loadLessons = useCallback(async () => {
    if (isInitialized) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Load categories from API
      const categoriesRes = await fetch('/api/lessons/categories');
      if (!categoriesRes.ok) throw new Error('Failed to load categories');
      const categoriesData = await categoriesRes.json();
      setCategories(categoriesData.categories);

      // Load all lessons from API
      const lessonsRes = await fetch('/api/lessons');
      if (!lessonsRes.ok) throw new Error('Failed to load lessons');
      const lessonsData = await lessonsRes.json();
      setAllLessons(lessonsData.lessons);

      setIsInitialized(true);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to load lessons'));
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  const selectLesson = useCallback((id: string) => {
    const lesson = allLessons.find(l => l.id === id);
    if (lesson) {
      setCurrentLesson(lesson);
      
      // Update progress to in-progress if not started
      const existingProgress = progress.find(p => p.lessonId === id);
      if (!existingProgress) {
        updateProgress(id, 'in-progress', lesson.initialCode);
      }
    }
  }, [allLessons, progress]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateProgress = useCallback((id: string, status: LessonStatus, code?: string) => {
    setProgress(prev => {
      const existing = prev.find(p => p.lessonId === id);
      if (existing) {
        return prev.map(p =>
          p.lessonId === id
            ? {
                ...p,
                status,
                currentCode: code !== undefined ? code : p.currentCode,
                completedAt: status === 'completed' ? new Date() : p.completedAt
              }
            : p
        );
      } else {
        return [
          ...prev,
          {
            lessonId: id,
            status,
            currentCode: code || '',
            completedAt: status === 'completed' ? new Date() : undefined
          }
        ];
      }
    });
  }, []);

  const filterByCategory = useCallback((category: string | null) => {
    setCategoryFilter(category);
  }, []);

  const searchLessons = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const getNextLesson = useCallback(() => {
    if (!currentLesson) return null;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    return currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  }, [currentLesson, lessons]);

  const getPreviousLesson = useCallback(() => {
    if (!currentLesson) return null;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    return currentIndex > 0 ? lessons[currentIndex - 1] : null;
  }, [currentLesson, lessons]);

  return {
    lessons,
    categories,
    currentLesson,
    progress,
    isLoading,
    error,
    loadLessons,
    selectLesson,
    updateProgress,
    filterByCategory,
    searchLessons,
    getNextLesson,
    getPreviousLesson,
  };
}