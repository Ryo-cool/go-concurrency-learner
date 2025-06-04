'use client';

import React from 'react';
import { IoPlay, IoTrash, IoStop } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { ConsoleOutput, Lesson } from '@/types/lesson';
import { getLessonTheme } from '@/lib/theme';

interface ConsolePanelProps {
  outputs: ConsoleOutput[];
  onRun: () => void;
  onClear: () => void;
  isRunning: boolean;
  onCancel?: () => void;
  className?: string;
  lesson?: Lesson;
}

export const ConsolePanel: React.FC<ConsolePanelProps> = ({
  outputs,
  onRun,
  onClear,
  isRunning,
  onCancel,
  className,
  lesson,
}) => {
  const theme = lesson ? getLessonTheme(lesson) : null;
  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between px-4 py-3 border-b",
        theme?.themeClass,
        "bg-white/95 backdrop-blur-sm border-gray-200/50"
      )}>
        <h2 className={cn(
          "text-base font-bold tracking-wide",
          theme ? theme.textColor : "text-gray-800",
          "drop-shadow-sm"
        )}>コンソール</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            disabled={outputs.length === 0}
            className={cn(
              'flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300',
              'border border-gray-200/50 backdrop-blur-sm shadow-sm hover:shadow-md',
              outputs.length === 0
                ? 'text-gray-400 cursor-not-allowed bg-gray-50/50'
                : theme ? `${theme.textColor} hover:bg-gray-100/70` : 'text-gray-700 hover:bg-gray-100/70'
            )}
            title="出力をクリア"
          >
            <IoTrash className="w-4 h-4" />
            クリア
          </button>
          {isRunning && onCancel ? (
            <button
              onClick={onCancel}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 bg-red-500 text-white hover:bg-red-600 shadow-lg border border-red-400"
            >
              <IoStop className="w-4 h-4" />
              停止
            </button>
          ) : (
            <button
              onClick={onRun}
              disabled={isRunning}
              className={cn(
                'flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 shadow-lg border',
                isRunning
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed border-gray-300'
                  : 'bg-green-500 text-white hover:bg-green-600 border-green-400'
              )}
              title="コードを実行"
            >
              <IoPlay className="w-4 h-4" />
              実行
            </button>
          )}
        </div>
      </div>

      {/* Output Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50">
        {outputs.length === 0 ? (
          <div className="text-gray-400 text-sm font-medium tracking-wide">出力がここに表示されます...</div>
        ) : (
          <div className="space-y-3">
            {outputs.map((output) => (
              <div
                key={output.id}
                className={cn(
                  'text-sm font-mono whitespace-pre-wrap leading-relaxed p-2 rounded-md border-l-4',
                  output.type === 'error' && 'text-red-300 bg-red-950/30 border-red-500 shadow-red-500/20 shadow-sm',
                  output.type === 'output' && 'text-green-300 bg-green-950/30 border-green-500 shadow-green-500/20 shadow-sm',
                  output.type === 'info' && 'text-blue-300 bg-blue-950/30 border-blue-500 shadow-blue-500/20 shadow-sm'
                )}
              >
                {output.content}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};