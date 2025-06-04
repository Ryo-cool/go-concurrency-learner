'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ThreePanelLayout } from '@/components/layout/ThreePanelLayout';
import { LessonPanel } from '@/components/lesson-panel/LessonPanel';
import { CodeEditor } from '@/components/code-editor/CodeEditor';
import { ConsolePanel } from '@/components/console-panel/ConsolePanel';
import { Navigation } from '@/components/navigation/Navigation';
import { ToastContainer } from '@/components/toast/ToastContainer';
import { useGoExecutor } from '@/hooks/useGoExecutor';
import { useLessons } from '@/hooks/useLessons';
import { useToast } from '@/hooks/useToast';
import { ArrowLeft } from 'lucide-react';
import { validateLesson } from '@/lib/validation';
import { ValidationResult } from '@/types/lesson';
import { getLessonTheme, CategoryTheme } from '@/lib/theme';

interface LessonPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [code, setCode] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const goExecutor = useGoExecutor();
  const { toasts, showToast, removeToast } = useToast();
  const {
    lessons,
    currentLesson,
    isLoading,
    error,
    loadLessons,
    selectLesson,
    updateProgress,
    getNextLesson,
    getPreviousLesson,
  } = useLessons();

  // Select lesson when id changes or lessons are loaded
  useEffect(() => {
    if (lessons.length > 0 && id) {
      selectLesson(id);
    }
  }, [lessons, selectLesson, id]);

  // Update code when lesson changes
  useEffect(() => {
    if (currentLesson) {
      setCode(currentLesson.initialCode);
      setValidationResult(null); // Reset validation result
    }
  }, [currentLesson]);

  const handlePrevious = () => {
    const prevLesson = getPreviousLesson();
    if (prevLesson) {
      router.push(`/lessons/${prevLesson.id}`);
      goExecutor.clearOutputs();
    }
  };

  const handleNext = () => {
    const nextLesson = getNextLesson();
    if (nextLesson) {
      router.push(`/lessons/${nextLesson.id}`);
      goExecutor.clearOutputs();
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (currentLesson) {
      updateProgress(currentLesson.id, 'in-progress', newCode);
    }
  };

  const handleReset = () => {
    if (currentLesson) {
      setCode(currentLesson.initialCode);
    }
  };

  const handleRun = async () => {
    const result = await goExecutor.execute(code);
    if (result && result.type === 'error' && result.content.includes('validation failed')) {
      showToast('error', result.content);
    }
  };

  const handleClear = () => {
    goExecutor.clearOutputs();
  };

  const handleCheckAnswer = async (currentCode: string) => {
    if (!currentLesson) return;
    
    // 検証モードを確認
    const validationMode = currentLesson.validationMode || 'keywords';
    
    // 出力ベースの検証が必要な場合、実行が必要
    if ((validationMode === 'output' || validationMode === 'both') && goExecutor.outputs.length === 0) {
      showToast('info', 'まずコードを実行してください。');
      return;
    }
    
    // 検証を実行
    const result = validateLesson(currentLesson, currentCode, goExecutor.outputs);
    setValidationResult(result);
    
    // トースト通知
    if (result.isCorrect) {
      updateProgress(currentLesson.id, 'completed', currentCode);
      showToast('success', result.feedback[0].message);
    } else {
      const errorFeedback = result.feedback.find(f => f.type === 'error');
      if (errorFeedback) {
        showToast('error', errorFeedback.message);
      } else {
        showToast('error', '要件を満たしていません。フィードバックを確認してください。');
      }
    }
  };

  const handleBackToList = () => {
    router.push('/lessons');
  };

  if (isLoading || (lessons.length === 0 && !error)) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-500">レッスンを読み込み中...</div>
      </div>
    );
  }

  if (!currentLesson && lessons.length > 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-500">レッスンを選択中...</div>
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="text-gray-500 mb-4">レッスンが見つかりません</div>
        <button
          onClick={handleBackToList}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          レッスン一覧に戻る
        </button>
      </div>
    );
  }

  const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
  const theme = getLessonTheme(currentLesson);

  return (
    <div className={`h-screen flex flex-col bg-theme-${currentLesson.category} ${theme.themeClass}`}>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      {/* Header with back button */}
      <div className="border-b border-white/20 px-4 py-2">
        <button
          onClick={handleBackToList}
          className={`flex items-center gap-2 ${theme.textColor} hover:opacity-80 transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          レッスン一覧
        </button>
      </div>
      
      <ThreePanelLayout
        className="flex-1"
        leftPanel={
          <LessonPanel
            lesson={currentLesson}
            onCheckAnswer={handleCheckAnswer}
            currentCode={code}
            validationResult={validationResult}
          />
        }
        centerPanel={
          <CodeEditor
            initialCode={code}
            onChange={handleCodeChange}
            onReset={handleReset}
          />
        }
        rightPanel={
          <ConsolePanel
            outputs={goExecutor.outputs}
            onRun={handleRun}
            onClear={handleClear}
            isRunning={goExecutor.isExecuting}
            onCancel={goExecutor.cancelExecution}
          />
        }
      />
      <Navigation
        currentLesson={currentIndex + 1}
        totalLessons={lessons.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoPrevious={currentIndex > 0}
        canGoNext={currentIndex < lessons.length - 1}
      />
    </div>
  );
}