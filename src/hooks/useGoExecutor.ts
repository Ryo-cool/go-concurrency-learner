'use client';

import { useState, useCallback, useRef } from 'react';
import { ConsoleOutput } from '@/types/lesson';
import { GoPlaygroundClient } from '@/lib/go-playground/client';

export interface UseGoExecutorReturn {
  execute: (code: string) => Promise<ConsoleOutput | null>;
  isExecuting: boolean;
  outputs: ConsoleOutput[];
  clearOutputs: () => void;
  cancelExecution: () => void;
}

export function useGoExecutor(): UseGoExecutorReturn {
  const [isExecuting, setIsExecuting] = useState(false);
  const [outputs, setOutputs] = useState<ConsoleOutput[]>([]);
  const clientRef = useRef<GoPlaygroundClient | null>(null);

  const execute = useCallback(async (code: string) => {
    // 既に実行中の場合は無視
    if (isExecuting) {
      return null;
    }

    // クライアントの初期化
    if (!clientRef.current) {
      clientRef.current = new GoPlaygroundClient();
    }

    const client = clientRef.current;

    // コードの検証
    const validation = client.validateCode(code);
    if (!validation.isValid) {
      const errorOutput: ConsoleOutput = {
        id: `${Date.now()}-validation-error`,
        type: 'error',
        content: validation.message || '無効なコードです',
        timestamp: new Date(),
      };
      setOutputs([errorOutput]);
      return errorOutput;
    }

    setIsExecuting(true);
    setOutputs([]);

    try {
      const results = await client.execute(code);
      setOutputs(results);
      return null;
    } catch {
      const errorOutput: ConsoleOutput = {
        id: `${Date.now()}-unexpected-error`,
        type: 'error',
        content: '予期しないエラーが発生しました',
        timestamp: new Date(),
      };
      setOutputs([errorOutput]);
      return errorOutput;
    } finally {
      setIsExecuting(false);
    }
  }, [isExecuting]);

  const clearOutputs = useCallback(() => {
    setOutputs([]);
  }, []);

  const cancelExecution = useCallback(() => {
    if (clientRef.current && isExecuting) {
      clientRef.current.cancel();
      setIsExecuting(false);
      setOutputs((prev) => [
        ...prev,
        {
          id: `${Date.now()}-cancelled`,
          type: 'info',
          content: '実行がキャンセルされました',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isExecuting]);

  return {
    execute,
    isExecuting,
    outputs,
    clearOutputs,
    cancelExecution,
  };
}