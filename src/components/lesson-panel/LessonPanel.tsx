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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">説明</h2>
          <div
            className="prose prose-sm text-gray-700"
            dangerouslySetInnerHTML={{ __html: lesson.description }}
          />
        </div>

        {/* Hints Section */}
        <div className="mb-6">
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 text-lg font-semibold text-gray-800 hover:text-gray-600 transition-colors"
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
                  className="p-3 bg-blue-50 border border-blue-200 rounded-md"
                >
                  <p className="text-sm text-blue-800">
                    ヒント {index + 1}: {typeof hint === 'string' ? hint : hint.text}
                  </p>
                </div>
              ))}

              {visibleHints < lesson.hints.length && (
                <button
                  onClick={handleShowMoreHints}
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  次のヒントを表示 ({visibleHints}/{lesson.hints.length})
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={handleCheckAnswer}
          className={cn(
            'w-full py-3 px-4 rounded-md font-medium transition-colors',
            'bg-blue-600 text-white hover:bg-blue-700',
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