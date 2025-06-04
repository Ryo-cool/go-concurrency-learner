'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { IoRefresh } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { getLessonTheme } from '@/lib/theme';
import { Lesson } from '@/types/lesson';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="text-gray-500">エディタを読み込み中...</div>
    </div>
  ),
});

interface CodeEditorProps {
  initialCode: string;
  onChange: (code: string) => void;
  onReset: () => void;
  className?: string;
  lesson?: Lesson;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  onChange,
  onReset,
  className,
  lesson,
}) => {
  const theme = lesson ? getLessonTheme(lesson) : null;
  const editorRef = useRef<unknown>(null);

  const handleEditorDidMount = (editor: unknown) => {
    editorRef.current = editor;
    if (editor && typeof editor === 'object' && 'focus' in editor && typeof editor.focus === 'function') {
      editor.focus();
    }
  };

  const handleChange = (value: string | undefined) => {
    onChange(value || '');
  };

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
        )}>コードエディタ</h2>
        <button
          onClick={onReset}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300",
            "border border-gray-200/50 backdrop-blur-sm",
            theme ? `${theme.textColor} hover:bg-gray-100/70` : "text-gray-700 hover:bg-gray-100/70",
            "shadow-sm hover:shadow-md"
          )}
          title="コードをリセット"
        >
          <IoRefresh className="w-4 h-4" />
          リセット
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <MonacoEditor
          height="100%"
          defaultLanguage="go"
          value={initialCode}
          onChange={handleChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            rulers: [],
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: false,
            wordWrap: 'on',
            wrappingIndent: 'indent',
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'mouseover',
            renderWhitespace: 'selection',
            cursorStyle: 'line',
            cursorBlinking: 'blink',
            smoothScrolling: true,
            contextmenu: true,
            multiCursorModifier: 'alt',
            quickSuggestions: {
              other: true,
              comments: false,
              strings: false,
            },
          }}
        />
      </div>
    </div>
  );
};