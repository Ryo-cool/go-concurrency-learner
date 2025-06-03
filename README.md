# Go Concurrency Learner

Golang並行処理を学習するためのインタラクティブなプラットフォーム

## 🎯 概要

Go Concurrency Learnerは、Golangの並行処理（Goroutine、Channel）を効率的に学習するためのWebアプリケーションです。実際にブラウザ上でGoコードを編集・実行しながら、段階的に並行処理の概念を習得できます。

## ✨ 特徴

- **📚 体系的な学習コンテンツ**: 基礎から実践まで12のレッスン
- **💻 リアルタイムコード実行**: Go Playground APIによるブラウザ内実行
- **🎨 直感的なUI**: 3分割レイアウトで学習効率を最大化
- **📊 進捗管理**: 学習状況の自動保存
- **🔍 段階的ヒント**: 必要に応じてヒントを段階的に表示

## 📖 学習コンテンツ

### 基礎編
1. **Goルーチン基礎** - `go`キーワードによる並行処理入門
2. **チャネル基礎** - チャネルによるGoルーチン間通信
3. **Buffered Channel** - バッファ付きチャネルの理解

### チャネル操作編
4. **Select文** - 複数チャネルの同時待機
5. **チャネルのクローズ** - チャネルの適切な終了処理
6. **方向性のあるチャネル** - 送信専用・受信専用チャネル

### 同期編
7. **WaitGroup** - 複数Goルーチンの完了待機
8. **Mutex** - 排他制御による競合状態の防止
9. **RWMutex** - 読み書きロックの活用

### 実践パターン編
10. **Worker Pool** - 効率的なタスク処理パターン
11. **Pipeline Pattern** - データ処理パイプライン
12. **Fan-in/Fan-out** - 負荷分散と結果集約

## 🛠️ 技術スタック

- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **Editor**: Monaco Editor
- **Execution**: Go Playground API
- **Icons**: Lucide React

## 🏃 クイックスタート

### 前提条件

- Node.js 18以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/Ryo-cool/go-concurrency-learner.git
cd go-concurrency-learner

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで http://localhost:3000 を開いてアプリケーションを確認してください。

## 📝 利用可能なスクリプト

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# 型チェック
npm run type-check

# コードフォーマット
npm run format

# Lint実行
npm run lint
```

## 🏗️ プロジェクト構成

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   └── globals.css        # グローバルスタイル
├── components/            # Reactコンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   ├── lesson-panel/     # レッスン表示
│   ├── code-editor/      # コードエディタ
│   ├── console-panel/    # 実行結果表示
│   └── navigation/       # ナビゲーション
├── hooks/                # カスタムフック
├── lib/                  # ユーティリティライブラリ
├── types/                # TypeScript型定義
└── data/                 # 静的データ
public/
└── lessons/              # レッスンデータ（JSON）
```

## 🔧 主要機能

### コード実行環境
- Monaco Editorによる高機能コード編集
- Go Playground APIによる実際のコード実行
- リアルタイム実行結果表示
- エラーハンドリングと表示

### 学習管理
- LocalStorageによる進捗の永続化
- レッスン間のスムーズなナビゲーション
- キーワードベースの答え合わせ
- 段階的ヒント表示

## 📄 ライセンス

このプロジェクトは MIT License の下で公開されています。

---

**Go Concurrency Learner** で効率的にGolang並行処理をマスターしましょう！ 🚀