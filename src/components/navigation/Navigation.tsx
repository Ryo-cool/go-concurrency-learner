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
        'glass mx-4 mb-4 px-6 py-4 rounded-2xl',
        className
      )}
    >
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-white',
            canGoPrevious
              ? 'hover:bg-white/20'
              : 'opacity-40 cursor-not-allowed'
          )}
        >
          <ChevronLeft className="w-5 h-5" />
          前のレッスン
        </button>

        {/* Progress Indicator */}
        <div className="flex flex-col items-center">
          <div className="text-sm text-white mb-2">
            レッスン {currentLesson} / {totalLessons}
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalLessons }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  i + 1 === currentLesson
                    ? 'bg-white scale-125'
                    : i + 1 < currentLesson
                    ? 'bg-green-400'
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
            'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-white',
            canGoNext
              ? 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600'
              : 'bg-gray-500/50 opacity-40 cursor-not-allowed'
          )}
        >
          次のレッスン
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};