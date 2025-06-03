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
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
        <h2 className="text-sm font-medium text-gray-700">コンソール</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            disabled={outputs.length === 0}
            className={cn(
              'flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors',
              outputs.length === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
            title="出力をクリア"
          >
            <Trash2 className="w-4 h-4" />
            クリア
          </button>
          {isRunning && onCancel ? (
            <button
              onClick={onCancel}
              className="flex items-center gap-1 px-4 py-1 text-sm font-medium rounded transition-colors bg-red-600 text-white hover:bg-red-700"
            >
              <Square className="w-4 h-4" />
              停止
            </button>
          ) : (
            <button
              onClick={onRun}
              disabled={isRunning}
              className={cn(
                'flex items-center gap-1 px-4 py-1 text-sm font-medium rounded transition-colors',
                isRunning
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              )}
            >
              <Play className="w-4 h-4" />
              {isRunning ? '実行中...' : '実行'}
            </button>
          )}
        </div>
      </div>

      {/* Output Area */}
      <div className="flex-1 overflow-y-auto bg-gray-900 p-4">
        {outputs.length === 0 ? (
          <div className="text-gray-500 text-sm">
            コードを実行すると、ここに出力が表示されます。
          </div>
        ) : (
          <div className="space-y-1">
            {outputs.map((output) => (
              <div
                key={output.id}
                className={cn(
                  'font-mono text-sm whitespace-pre-wrap',
                  output.type === 'output' && 'text-gray-100',
                  output.type === 'error' && 'text-red-400',
                  output.type === 'info' && 'text-blue-400'
                )}
              >
                {output.type === 'info' && (
                  <span className="text-gray-500">
                    [{new Date(output.timestamp).toLocaleTimeString()}]{' '}
                  </span>
                )}
                {output.content}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};