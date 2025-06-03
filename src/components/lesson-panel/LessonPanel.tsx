'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Lesson } from '@/types/lesson';

interface LessonPanelProps {
  lesson: Lesson;
  onCheckAnswer?: (code: string) => void;
  currentCode?: string;
}

export const LessonPanel: React.FC<LessonPanelProps> = ({
  lesson,
  onCheckAnswer,
  currentCode = '',
}) => {
  const [showHints, setShowHints] = useState(false);
  const [visibleHints, setVisibleHints] = useState(1);

  const handleShowMoreHints = () => {
    setVisibleHints((prev) => Math.min(prev + 1, lesson.hints.length));
  };

  const handleCheckAnswer = () => {
    if (onCheckAnswer) {
      onCheckAnswer(currentCode);
    }
  };

  return (
    <div className="flex flex-col h-full text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">説明</h2>
          <div
            className="prose prose-sm prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: lesson.description }}
          />
        </div>

        {/* Hints Section */}
        <div className="mb-6">
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 text-lg font-semibold hover:text-gray-200 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            ヒント
            {showHints ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showHints && (
            <div className="mt-3 space-y-3">
              {lesson.hints.slice(0, visibleHints).map((hint, index) => (
                <div
                  key={index}
                  className="p-3 glass-light rounded-lg"
                >
                  <p className="text-sm">
                    ヒント {index + 1}: {typeof hint === 'string' ? hint : hint.text}
                  </p>
                </div>
              ))}

              {visibleHints < lesson.hints.length && (
                <button
                  onClick={handleShowMoreHints}
                  className="text-sm text-white/80 hover:text-white underline"
                >
                  次のヒントを表示 ({visibleHints}/{lesson.hints.length})
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-white/20">
        <button
          onClick={handleCheckAnswer}
          className={cn(
            'w-full py-3 px-4 rounded-lg font-medium transition-all duration-300',
            'glass-light hover:bg-white/30',
            'flex items-center justify-center gap-2'
          )}
        >
          <CheckCircle2 className="w-5 h-5" />
          答え合わせ
        </button>
      </div>
    </div>
  );
};