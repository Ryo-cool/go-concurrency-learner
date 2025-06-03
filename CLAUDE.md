# Golang並行処理学習プラットフォーム - プロジェクト概要

## プロジェクト概要
Golang並行処理学習プラットフォーム（GoConcurrency Learner）は、Golangの並行処理（Goroutine、Channel）を効率的に学習するためのインタラクティブな学習環境です。

## 技術スタック
- **フロントエンド**: Next.js 14+ with TypeScript
- **スタイリング**: Tailwind CSS
- **コードエディタ**: Monaco Editor
- **実行環境**: WebAssembly (Go)
- **データ管理**: JSONファイル（静的）

## 主要機能
1. **3分割レイアウト**
   - 左パネル: レッスン説明・ヒント表示
   - 中央パネル: コードエディタ（Monaco Editor）
   - 右パネル: 実行結果・コンソール出力

2. **コード実行機能**
   - WebAssemblyによるブラウザ内Go実行
   - リアルタイムコンソール出力
   - エラー表示

3. **学習進行管理**
   - レッスン間のナビゲーション
   - 進捗インジケーター
   - 答え合わせ機能

## 学習トピック
1. Goルーチン基礎
2. チャネル基礎
3. Select文
4. 同期プリミティブ（Mutex/WaitGroup）
5. 実践パターン（Worker Pool、Pipeline）

## 開発スケジュール
- **Week 1**: 基盤構築（Next.js環境、レイアウト、Monaco Editor統合）
- **Week 2**: コア機能（WebAssembly統合、コード実行）
- **Week 3**: 学習機能（答え合わせ、ナビゲーション、コンテンツ作成）
- **Week 4**: 仕上げ（UI/UX改善、バグ修正）

## 開発時の注意事項
- TypeScript strict mode準拠
- ESLint + Prettier適用
- コンポーネント単位でのモジュール化
- WebAssembly対応ブラウザ必須

## コマンド
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run type-check

# リント
npm run lint

# フォーマット
npm run format
```

## ディレクトリ構造（予定）
```
src/
├── components/
│   ├── LessonPanel/
│   ├── CodeEditor/
│   ├── ConsolePanel/
│   └── Navigation/
├── hooks/
│   ├── useLessons.ts
│   └── useWasm.ts
├── data/
│   └── lessons.json
└── app/
    └── api/
        └── lessons/
            └── route.ts
```

## 進捗状況

### 完了済み
- ✅ Next.js 14 + TypeScriptプロジェクト作成
- ✅ Tailwind CSS設定
- ✅ ESLint設定
- ✅ Monaco Editorインストール (@monaco-editor/react)
- ✅ UIライブラリインストール (lucide-react, clsx, tailwind-merge)
- ✅ Prettier設定
- ✅ 開発用スクリプト追加 (type-check, format)

### Week1 完了済み (2025/6/3)
- ✅ 基本的な3分割レイアウトの実装
- ✅ LessonPanelコンポーネント作成
- ✅ CodeEditorコンポーネント作成（Monaco Editor統合）
- ✅ ConsolePanelコンポーネント作成
- ✅ Navigationコンポーネント作成
- ✅ 共通ユーティリティ関数の作成
- ✅ 仮データでの動作確認

### Week2 完了済み (2025/6/3)
- ✅ Go Playground APIクライアントの実装
  - API Route経由でCORS回避
  - コード検証機能（危険なパッケージの検出）
  - エラーハンドリング
- ✅ useGoExecutor Hookの実装
  - 実行状態管理
  - 出力管理
  - キャンセル機能
- ✅ 実行環境の統合
  - ConsolePanelとの接続
  - リアルタイム出力表示
- ✅ 実行制御機能の実装
  - 実行中の停止ボタン
  - 複数実行の防止
  - タイムアウト処理

### Week3 完了済み (2025/6/3)
- ✅ レッスンデータ構造の拡張
  - カテゴリ、難易度、学習目標の追加
  - ヒントの段階的開示構造
  - テストケース、参考リソースの追加
- ✅ 12個の体系的なレッスン作成
  - 基礎編: 3レッスン
  - チャネル操作編: 3レッスン
  - 同期編: 3レッスン
  - 実践パターン編: 3レッスン
- ✅ useLessons Hookの実装
  - レッスンの動的読み込み
  - カテゴリフィルタリング
  - 検索機能
  - 進捗管理
- ✅ 進捗管理機能の実装
  - LocalStorageによる永続化
  - レッスンごとの状態管理

### 現在の実装状況

#### 実装済み機能
- ✅ 3分割レイアウト（レッスン説明、コードエディタ、コンソール）
- ✅ Monaco Editorによるコード編集
- ✅ Go Playground APIによる実際のコード実行
- ✅ 12個の体系的な学習コンテンツ
- ✅ 進捗の永続化（LocalStorage）
- ✅ キーワードベースの答え合わせ

#### 残りのタスク（優先度順）

**高優先度:**
- [ ] 答え合わせ機能の改善（実行結果ベースの判定）
- [ ] レッスン選択画面の実装（カテゴリ別表示）
- [ ] 進捗の可視化（完了率、バッジ等）

**中優先度:**
- [ ] API Route実装（現在は静的ファイル直接読み込み）
- [ ] トースト通知の実装（alert()の置き換え）
- [ ] エラー境界の実装
- [ ] ローディング状態の改善

**低優先度:**
- [ ] レスポンシブ対応（タブレット、モバイル）
- [ ] キーボードショートカット
- [ ] ダークモード対応
- [ ] パフォーマンス最適化
- [ ] Service Worker（オフライン対応）
- [ ] 実行履歴の保存
- [ ] コード共有機能

### 今後の拡張案
- 実行時間の測定と表示
- ベンチマーク機能
- より高度な並行処理パターンの追加
- ユーザー作成レッスンのサポート
- 多言語対応

## Week1 実装計画

### 実装順序と詳細

#### 1. プロジェクト構造の準備（30分）
```
src/
├── components/
│   ├── layout/
│   │   └── ThreePanelLayout.tsx
│   ├── lesson-panel/
│   │   └── LessonPanel.tsx
│   ├── code-editor/
│   │   └── CodeEditor.tsx
│   ├── console-panel/
│   │   └── ConsolePanel.tsx
│   └── navigation/
│       └── Navigation.tsx
├── types/
│   └── lesson.ts
├── lib/
│   └── utils.ts
└── app/
    └── page.tsx (更新)
```

#### 2. 共通ユーティリティと型定義（30分）
- `lib/utils.ts`: cn関数（clsxとtailwind-mergeを使用）
- `types/lesson.ts`: Lesson型、ConsoleOutput型などの定義

#### 3. ThreePanelLayoutコンポーネント（1時間）
**責務**: 3分割レイアウトの管理
**機能**:
- レスポンシブ対応（最小幅1024px）
- パネルサイズの固定（左:30%, 中央:40%, 右:30%）
- パネル間の境界線

#### 4. 各パネルコンポーネントの仮実装（各30分）

**LessonPanel**:
- レッスンタイトル表示
- 説明文表示（HTMLレンダリング）
- ヒント表示（段階的開示）
- 答え合わせボタン

**CodeEditor**:
- Monaco Editor統合（dynamic import使用）
- Go言語シンタックスハイライト
- エディタオプション設定
- コードリセット機能

**ConsolePanel**:
- 実行ボタン
- 出力表示エリア
- エラー表示
- クリアボタン

#### 5. Navigationコンポーネント（30分）
- 前へ/次へボタン
- 現在のレッスン番号表示
- 進捗インジケーター

#### 6. メインページ統合（30分）
- 全コンポーネントの組み合わせ
- 仮のレッスンデータでの動作確認

### 各コンポーネントのProps設計

```typescript
// ThreePanelLayout
interface ThreePanelLayoutProps {
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

// LessonPanel
interface LessonPanelProps {
  lesson: Lesson;
  onCheckAnswer?: (code: string) => void;
}

// CodeEditor
interface CodeEditorProps {
  initialCode: string;
  onChange: (code: string) => void;
  onReset: () => void;
}

// ConsolePanel
interface ConsolePanelProps {
  outputs: ConsoleOutput[];
  onRun: () => void;
  onClear: () => void;
  isRunning: boolean;
}

// Navigation
interface NavigationProps {
  currentLesson: number;
  totalLessons: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}
```

### 実装時の注意点

1. **Monaco Editor**:
   - SSR対応のためdynamic importを使用
   - ローディング状態の表示
   - エディタの高さは親要素に合わせる

2. **スタイリング**:
   - Tailwind CSSクラスを優先使用
   - 必要に応じてCSS Modulesを併用
   - ダークモード対応は後回し

3. **型安全性**:
   - 全てのPropsにTypeScriptの型定義
   - strictモードでのコンパイル確認

4. **アクセシビリティ**:
   - 適切なaria-label
   - キーボードナビゲーション対応

### 予想される課題と対策

1. **Monaco EditorのSSR問題**:
   - 対策: `next/dynamic`でクライアントサイドのみロード

2. **レイアウトの崩れ**:
   - 対策: flexboxとgridを適切に使用、最小幅の設定

3. **パフォーマンス**:
   - 対策: React.memoでの最適化、必要に応じてuseMemo使用

## Week2 実装計画 - WebAssembly統合

### 実装方針
GoコードをWebAssemblyで実行するために、以下のアプローチを採用:
1. **Go Playground Service API**: Go公式のPlayground APIを利用
2. **実行制限**: タイムアウトとメモリ制限を設定
3. **セキュリティ**: サンドボックス環境での実行

### 実装タスク

#### 1. Go Playground API統合 (2時間)
- API通信用のクライアント作成
- エラーハンドリングの実装
- レート制限への対応

#### 2. useGoExecutor Hookの実装 (1時間)
**責務**: Goコードの実行管理
**機能**:
- コード実行リクエスト
- 実行状態の管理
- 出力のストリーミング
- エラーハンドリング

#### 3. 実行環境の統合 (1時間)
- ConsolePanelとの接続
- リアルタイム出力表示
- エラー表示の改善

#### 4. 実行制御機能 (30分)
- 実行中の中断機能
- タイムアウト処理
- 複数実行の防止

### API設計

```typescript
// Go Playground API
interface PlaygroundRequest {
  body: string;
  version?: string;
}

interface PlaygroundResponse {
  compile_errors?: string;
  output?: string;
  system_errors?: string;
}

// useGoExecutor Hook
interface UseGoExecutorReturn {
  execute: (code: string) => Promise<void>;
  isExecuting: boolean;
  outputs: ConsoleOutput[];
  clearOutputs: () => void;
  cancelExecution: () => void;
}
```

### セキュリティ考慮事項
1. **入力検証**: 危険なコードパターンの検出
2. **実行時間制限**: 最大10秒
3. **出力サイズ制限**: 最大1MB
4. **ネットワークアクセス**: 制限付き

### 代替案
Go Playground APIが使用できない場合:
1. **WebAssembly直接実行**: gopherjs/goscriptを使用
2. **サーバーサイド実行**: API Route経由でDocker実行
3. **静的解析のみ**: 実際の実行は行わず、コード検証のみ

## Week3 実装計画 - 学習機能

### 実装目標
- 体系的な学習コンテンツの作成
- 動的なレッスン管理システム
- 学習進捗の管理
- 答え合わせ機能の改善

### 実装タスク

#### 1. レッスンデータ構造の拡張 (30分)
```typescript
interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'basic' | 'channel' | 'sync' | 'pattern';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objectives: string[];
  hints: {
    text: string;
    level: number; // ヒントの段階
  }[];
  initialCode: string;
  expectedKeywords: string[];
  solution: string;
  testCases?: {
    input?: string;
    expectedOutput: string;
  }[];
  resources?: {
    title: string;
    url: string;
  }[];
}
```

#### 2. 完全なレッスンセット作成 (2時間)

**基礎編 (basic)**
1. Goルーチン基礎
2. チャネル基礎
3. Buffered Channel

**チャネル操作編 (channel)**
4. Select文
5. チャネルのクローズ
6. 方向性のあるチャネル

**同期編 (sync)**
7. WaitGroup
8. Mutex
9. RWMutex

**実践パターン編 (pattern)**
10. Worker Pool
11. Pipeline Pattern
12. Fan-in/Fan-out

#### 3. useLessons Hookの実装 (1時間)
**機能**:
- レッスンデータの取得
- カテゴリ別フィルタリング
- 進捗状態の管理
- レッスンの検索

```typescript
interface UseLessonsReturn {
  lessons: Lesson[];
  categories: Category[];
  currentLesson: Lesson | null;
  progress: LessonProgress[];
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  loadLessons: () => Promise<void>;
  selectLesson: (id: string) => void;
  updateProgress: (id: string, status: LessonStatus) => void;
  filterByCategory: (category: string) => void;
  searchLessons: (query: string) => void;
}
```

#### 4. API Route実装 (30分)
- `/api/lessons`: レッスン一覧取得
- `/api/lessons/[id]`: 個別レッスン取得
- レスポンスのキャッシュ設定

#### 5. 答え合わせ機能の改善 (1時間)
- 実行結果ベースの判定
- 部分点の導入
- フィードバックメッセージの改善
- 成功時のアニメーション

#### 6. 進捗管理機能 (30分)
- LocalStorageへの進捗保存
- 進捗のビジュアル表示
- レッスン完了率の計算
- バッジシステム（オプション）

### UI/UX改善案

1. **レッスン選択画面**
   - カテゴリ別のカード表示
   - 難易度表示
   - 進捗状況の可視化

2. **学習画面の改善**
   - 目標リストの表示
   - ヒントの段階的開示の改善
   - 参考リソースへのリンク

3. **フィードバック改善**
   - トースト通知の実装
   - 成功/失敗のアニメーション
   - 詳細なエラーメッセージ

### データ管理戦略

1. **静的JSONファイル**
   - `public/lessons/` ディレクトリに配置
   - カテゴリ別にファイル分割
   - ビルド時に検証

2. **キャッシュ戦略**
   - ブラウザキャッシュの活用
   - Service Workerの検討（将来）

3. **状態管理**
   - Context APIまたはZustandの検討
   - 進捗データのLocalStorage永続化