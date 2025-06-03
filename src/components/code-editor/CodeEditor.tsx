'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

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
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  onChange,
  onReset,
  className,
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
        <h2 className="text-sm font-medium text-gray-700">コードエディタ</h2>
        <button
          onClick={onReset}
          className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          title="コードをリセット"
        >
          <RotateCcw className="w-4 h-4" />
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
          theme="vs"
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