'use client';

import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp, IoCheckmarkCircle, IoHelpCircle, IoAlertCircle, IoInformationCircle, IoWarning } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { Lesson, ValidationResult } from '@/types/lesson';
import { getLessonTheme } from '@/lib/theme';

interface LessonPanelProps {
  lesson: Lesson;
  onCheckAnswer?: (code: string) => void;
  currentCode?: string;
  validationResult?: ValidationResult | null;
}

export const LessonPanel: React.FC<LessonPanelProps> = ({
  lesson,
  onCheckAnswer,
  currentCode = '',
  validationResult,
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

  const theme = getLessonTheme(lesson);

  return (
    <div className={cn("flex flex-col h-full", theme.textColor)}>
      {/* Header */}
      <div className={cn("p-6 border-b", lesson.category === 'basic' ? "border-gray-200/50" : "border-white/20")}>
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">説明</h2>
          <div
            className={cn("prose prose-sm max-w-none", lesson.category === 'basic' ? "prose-gray" : "prose-invert")}
            dangerouslySetInnerHTML={{ __html: lesson.description }}
          />
        </div>

        {/* Validation Result */}
        {validationResult && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">検証結果</h2>
            
            {/* Score Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>スコア</span>
                <span>{validationResult.score}%</span>
              </div>
              <div className={cn("w-full rounded-full h-2", lesson.category === 'basic' ? "bg-gray-200" : "bg-white/20")}>
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    validationResult.score >= 80 ? "bg-green-500" : 
                    validationResult.score >= 50 ? "bg-yellow-500" : "bg-red-500"
                  )}
                  style={{ width: `${validationResult.score}%` }}
                />
              </div>
            </div>

            {/* Feedback Messages */}
            <div className="space-y-2">
              {validationResult.feedback.map((feedback, index) => {
                const Icon = feedback.type === 'success' ? IoCheckmarkCircle :
                           feedback.type === 'error' ? IoAlertCircle :
                           feedback.type === 'warning' ? IoWarning : IoInformationCircle;
                
                const getMessageStyles = (type: string, isBasic: boolean) => {
                  if (isBasic) {
                    return {
                      success: "bg-green-50 border border-green-200 text-green-800",
                      error: "bg-red-50 border border-red-200 text-red-800", 
                      warning: "bg-yellow-50 border border-yellow-200 text-yellow-800",
                      info: "bg-blue-50 border border-blue-200 text-blue-800"
                    }[type];
                  } else {
                    return {
                      success: "bg-green-500/20 text-green-200 border border-green-500/30",
                      error: "bg-red-500/20 text-red-200 border border-red-500/30",
                      warning: "bg-yellow-500/20 text-yellow-200 border border-yellow-500/30", 
                      info: "bg-blue-500/20 text-blue-200 border border-blue-500/30"
                    }[type];
                  }
                };
                
                return (
                  <div
                    key={index}
                    className={cn(
                      "p-3 rounded-lg flex items-start gap-3 shadow-sm backdrop-blur-sm",
                      getMessageStyles(feedback.type, lesson.category === 'basic')
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium leading-relaxed">{feedback.message}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Hints Section */}
        <div className="mb-6">
          <button
            onClick={() => setShowHints(!showHints)}
            className={cn("flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition-all", theme.textColor)}
          >
            <IoHelpCircle className="w-5 h-5" />
            ヒント
            {showHints ? (
              <IoChevronUp className="w-4 h-4" />
            ) : (
              <IoChevronDown className="w-4 h-4" />
            )}
          </button>

          {showHints && (
            <div className="mt-3 space-y-3">
              {lesson.hints.slice(0, visibleHints).map((hint, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-3 rounded-lg border shadow-sm backdrop-blur-sm",
                    lesson.category === 'basic' 
                      ? "bg-blue-50 border-blue-200 text-blue-800" 
                      : "bg-white/10 border-white/20 text-white/90"
                  )}
                >
                  <p className="text-sm font-medium leading-relaxed">
                    ヒント {index + 1}: {typeof hint === 'string' ? hint : hint.text}
                  </p>
                </div>
              ))}

              {visibleHints < lesson.hints.length && (
                <button
                  onClick={handleShowMoreHints}
                  className={cn("text-sm opacity-80 hover:opacity-100 underline transition-opacity", theme.textColor)}
                >
                  次のヒントを表示 ({visibleHints}/{lesson.hints.length})
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={cn("p-6 border-t", lesson.category === 'basic' ? "border-gray-200/50" : "border-white/20")}>
        <button
          onClick={handleCheckAnswer}
          className={cn(
            'w-full py-3 px-4 rounded-lg font-bold transition-all duration-300',
            'flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm border',
            lesson.category === 'basic' 
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400' 
              : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
          )}
        >
          <IoCheckmarkCircle className="w-5 h-5" />
          答え合わせ
        </button>
      </div>
    </div>
  );
};