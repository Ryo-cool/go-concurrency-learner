'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentLesson: number;
  totalLessons: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentLesson,
  totalLessons,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white',
        className
      )}
    >
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors',
          canGoPrevious
            ? 'text-gray-700 hover:bg-gray-100'
            : 'text-gray-400 cursor-not-allowed'
        )}
      >
        <ChevronLeft className="w-5 h-5" />
        前のレッスン
      </button>

      {/* Progress Indicator */}
      <div className="flex flex-col items-center">
        <div className="text-sm text-gray-600 mb-2">
          レッスン {currentLesson} / {totalLessons}
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalLessons }, (_, i) => (
            <div
              key={i}
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                i + 1 === currentLesson
                  ? 'bg-blue-600'
                  : i + 1 < currentLesson
                  ? 'bg-green-600'
                  : 'bg-gray-300'
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
          'flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors',
          canGoNext
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        )}
      >
        次のレッスン
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};