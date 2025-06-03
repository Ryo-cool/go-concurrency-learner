'use client';

import React, { useState, useEffect } from 'react';
import { ThreePanelLayout } from '@/components/layout/ThreePanelLayout';
import { LessonPanel } from '@/components/lesson-panel/LessonPanel';
import { CodeEditor } from '@/components/code-editor/CodeEditor';
import { ConsolePanel } from '@/components/console-panel/ConsolePanel';
import { Navigation } from '@/components/navigation/Navigation';
import { useGoExecutor } from '@/hooks/useGoExecutor';
import { useLessons } from '@/hooks/useLessons';

export default function Home() {
  const [code, setCode] = useState('');
  const goExecutor = useGoExecutor();
  const {
    lessons,
    currentLesson,
    isLoading,
    loadLessons,
    selectLesson,
    updateProgress,
    getNextLesson,
    getPreviousLesson,
  } = useLessons();

  // Load lessons on mount
  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  // Update code when lesson changes
  useEffect(() => {
    if (currentLesson) {
      setCode(currentLesson.initialCode);
    }
  }, [currentLesson]);

  const handlePrevious = () => {
    const prevLesson = getPreviousLesson();
    if (prevLesson) {
      selectLesson(prevLesson.id);
      goExecutor.clearOutputs();
    }
  };

  const handleNext = () => {
    const nextLesson = getNextLesson();
    if (nextLesson) {
      selectLesson(nextLesson.id);
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
    await goExecutor.execute(code);
  };

  const handleClear = () => {
    goExecutor.clearOutputs();
  };

  const handleCheckAnswer = (currentCode: string) => {
    if (!currentLesson) return;
    
    const hasAllKeywords = currentLesson.expectedKeywords.every((keyword) =>
      currentCode.includes(keyword)
    );

    // Update progress if correct
    if (hasAllKeywords) {
      updateProgress(currentLesson.id, 'completed', currentCode);
    }

    const message = hasAllKeywords
      ? '✅ 正解です！必要なキーワードが全て含まれています。'
      : '❌ 不正解です。ヒントを参考にもう一度試してみてください。';
    
    // 一時的にアラートで表示（後でより良いUIに改善）
    alert(message);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-500">レッスンを読み込み中...</div>
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-500">レッスンが見つかりません</div>
      </div>
    );
  }

  const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);

  return (
    <div className="h-screen flex flex-col">
      <ThreePanelLayout
        className="flex-1"
        leftPanel={
          <LessonPanel
            lesson={currentLesson}
            onCheckAnswer={handleCheckAnswer}
            currentCode={code}
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