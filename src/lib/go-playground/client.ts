import { ConsoleOutput } from '@/types/lesson';

export interface PlaygroundRequest {
  body: string;
  version?: string;
}

export interface PlaygroundResponse {
  Errors?: string;
  Events?: Array<{
    Message: string;
    Kind: string;
    Delay: number;
  }>;
  Status?: number;
  IsTest?: boolean;
  TestsFailed?: number;
}

export class GoPlaygroundClient {
  private abortController: AbortController | null = null;

  async execute(code: string): Promise<ConsoleOutput[]> {
    const outputs: ConsoleOutput[] = [];

    try {
      // 実行開始のメッセージ
      outputs.push({
        id: `${Date.now()}-start`,
        type: 'info',
        content: 'コードをコンパイル中...',
        timestamp: new Date(),
      });

      // AbortControllerを作成（キャンセル可能にする）
      this.abortController = new AbortController();

      const response = await fetch('/api/go-playground', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
        signal: this.abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PlaygroundResponse = await response.json();

      // コンパイルエラーがある場合
      if (data.Errors) {
        outputs.push({
          id: `${Date.now()}-error`,
          type: 'error',
          content: data.Errors,
          timestamp: new Date(),
        });
        return outputs;
      }

      // イベント（出力）を処理
      if (data.Events && data.Events.length > 0) {
        data.Events.forEach((event, index) => {
          const outputType = event.Kind === 'stderr' ? 'error' : 'output';
          outputs.push({
            id: `${Date.now()}-${index}`,
            type: outputType,
            content: event.Message,
            timestamp: new Date(),
          });
        });
      } else {
        // 出力がない場合
        outputs.push({
          id: `${Date.now()}-complete`,
          type: 'info',
          content: 'プログラムが正常に終了しました（出力なし）',
          timestamp: new Date(),
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          outputs.push({
            id: `${Date.now()}-cancelled`,
            type: 'info',
            content: '実行がキャンセルされました',
            timestamp: new Date(),
          });
        } else {
          outputs.push({
            id: `${Date.now()}-error`,
            type: 'error',
            content: `実行エラー: ${error.message}`,
            timestamp: new Date(),
          });
        }
      }
    } finally {
      this.abortController = null;
    }

    return outputs;
  }

  cancel(): void {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  // 危険なコードパターンをチェック
  validateCode(code: string): { isValid: boolean; message?: string } {
    const dangerousPatterns = [
      /import\s+['"]\s*os\/exec/,
      /import\s+['"]\s*net/,
      /import\s+['"]\s*syscall/,
      /import\s+['"]\s*unsafe/,
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        return {
          isValid: false,
          message: 'セキュリティ上の理由により、このパッケージは使用できません',
        };
      }
    }

    // コードサイズチェック（10KB制限）
    if (code.length > 10240) {
      return {
        isValid: false,
        message: 'コードが大きすぎます（最大10KB）',
      };
    }

    return { isValid: true };
  }
}