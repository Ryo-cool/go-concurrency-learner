'use client';

import React from 'react';
import { Play, Trash2, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConsoleOutput } from '@/types/lesson';

interface ConsolePanelProps {
  outputs: ConsoleOutput[];
  onRun: () => void;
  onClear: () => void;
  isRunning: boolean;
  onCancel?: () => void;
  className?: string;
}

export const ConsolePanel: React.FC<ConsolePanelProps> = ({
  outputs,
  onRun,
  onClear,
  isRunning,
  onCancel,
  className,
}) => {
  return (
    <div className={cn('flex flex-col h-full text-white', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/20">
        <h2 className="text-sm font-medium">コンソール</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            disabled={outputs.length === 0}
            className={cn(
              'flex items-center gap-1 px-3 py-1 text-sm rounded-lg transition-all duration-300',
              outputs.length === 0
                ? 'text-white/40 cursor-not-allowed'
                : 'text-white/80 hover:text-white hover:bg-white/20'
            )}
            title="出力をクリア"
          >
            <Trash2 className="w-4 h-4" />
            クリア
          </button>
          {isRunning && onCancel ? (
            <button
              onClick={onCancel}
              className="flex items-center gap-1 px-4 py-1 text-sm font-medium rounded-lg transition-all duration-300 bg-red-500/80 text-white hover:bg-red-500"
            >
              <Square className="w-4 h-4" />
              停止
            </button>
          ) : (
            <button
              onClick={onRun}
              disabled={isRunning}
              className={cn(
                'flex items-center gap-1 px-4 py-1 text-sm font-medium rounded-lg transition-all duration-300',
                isRunning
                  ? 'bg-gray-500/50 text-white/50 cursor-not-allowed'
                  : 'bg-green-500/80 text-white hover:bg-green-500'
              )}
              title="コードを実行"
            >
              <Play className="w-4 h-4" />
              実行
            </button>
          )}
        </div>
      </div>

      {/* Output Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-black/20">
        {outputs.length === 0 ? (
          <div className="text-white/50 text-sm">出力がここに表示されます...</div>
        ) : (
          <div className="space-y-2">
            {outputs.map((output) => (
              <div
                key={output.id}
                className={cn(
                  'text-sm font-mono whitespace-pre-wrap',
                  output.type === 'error' && 'text-red-400',
                  output.type === 'output' && 'text-green-400',
                  output.type === 'info' && 'text-blue-400'
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