'use client';

import React from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { getLessonTheme } from '@/lib/theme';
import { Lesson } from '@/types/lesson';

interface NavigationProps {
  currentLesson: number;
  totalLessons: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  className?: string;
  lesson?: Lesson;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentLesson,
  totalLessons,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  className,
  lesson,
}) => {
  const theme = lesson ? getLessonTheme(lesson) : null;
  const isBasic = lesson?.category === 'basic';
  return (
    <div
      className={cn(
        'mx-4 mb-4 px-6 py-4 rounded-2xl backdrop-blur-md border shadow-lg',
        isBasic 
          ? 'bg-white/90 border-gray-200/50' 
          : 'bg-white/10 border-white/20',
        className
      )}
    >
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 border backdrop-blur-sm shadow-sm',
            canGoPrevious
              ? isBasic 
                ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 border-gray-200/50'
                : 'text-white hover:text-white hover:bg-white/20 border-white/30'
              : isBasic
                ? 'text-gray-400 cursor-not-allowed bg-gray-50/50 border-gray-200/30'
                : 'text-white/40 cursor-not-allowed bg-white/5 border-white/10'
          )}
        >
          <IoChevronBack className="w-5 h-5" />
          前のレッスン
        </button>

        {/* Progress Indicator */}
        <div className="flex flex-col items-center">
          <div className={cn(
            'text-sm font-bold tracking-wide mb-2',
            isBasic ? 'text-gray-700' : 'text-white'
          )}>
            レッスン {currentLesson} / {totalLessons}
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalLessons }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm',
                  i + 1 === currentLesson
                    ? isBasic 
                      ? 'bg-emerald-500 scale-125 shadow-emerald-500/50' 
                      : 'bg-white scale-125 shadow-white/50'
                    : i + 1 < currentLesson
                    ? 'bg-green-400 shadow-green-400/50'
                    : isBasic 
                      ? 'bg-gray-300' 
                      : 'bg-white/30'
                )}
              />
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg border',
            canGoNext
              ? isBasic
                ? 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-emerald-400'
                : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white border-green-400'
              : isBasic
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-200'
                : 'bg-gray-500/50 text-white/40 cursor-not-allowed border-gray-500/30'
          )}
        >
          次のレッスン
          <IoChevronForward className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};