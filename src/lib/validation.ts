import { Lesson, ConsoleOutput, ValidationResult } from '@/types/lesson';

export function validateLesson(
  lesson: Lesson,
  code: string,
  outputs: ConsoleOutput[]
): ValidationResult {
  const result: ValidationResult = {
    isCorrect: false,
    score: 0,
    feedback: [],
    details: {},
  };

  // 検証モードの決定
  const mode = lesson.validationMode || 'keywords';
  
  let keywordScore = 0;
  let outputScore = 0;

  // 1. キーワードチェック
  if (mode === 'keywords' || mode === 'both') {
    const keywordResult = checkKeywords(lesson, code);
    result.details!.keywordCheck = keywordResult;
    keywordScore = keywordResult.passed ? 50 : (50 * (lesson.expectedKeywords.length - keywordResult.missing.length) / lesson.expectedKeywords.length);
    
    if (!keywordResult.passed) {
      result.feedback.push({
        type: 'warning',
        message: `必要なキーワードが不足しています: ${keywordResult.missing.join(', ')}`
      });
    }
  }

  // 2. 出力チェック
  if (mode === 'output' || mode === 'both') {
    const outputResult = checkOutputs(lesson, outputs);
    result.details!.outputCheck = outputResult;
    outputScore = outputResult.passed ? 50 : (50 * (outputResult.expected.length - outputResult.missing.length) / outputResult.expected.length);
    
    if (!outputResult.passed) {
      if (outputs.length === 0) {
        result.feedback.push({
          type: 'error',
          message: 'コードを実行してから答え合わせしてください。'
        });
      } else {
        result.feedback.push({
          type: 'warning',
          message: '期待する出力が得られていません。'
        });
        if (outputResult.missing.length > 0) {
          result.feedback.push({
            type: 'info',
            message: `必要な出力: ${outputResult.missing.join(', ')}`
          });
        }
      }
    }
  }

  // スコア計算
  if (mode === 'keywords') {
    result.score = keywordScore * 2; // 0-100
  } else if (mode === 'output') {
    result.score = outputScore * 2; // 0-100
  } else {
    result.score = keywordScore + outputScore; // 0-100
  }

  // 合格判定
  result.isCorrect = result.score >= 80; // 80%以上で合格

  // 成功メッセージ
  if (result.isCorrect) {
    result.feedback.unshift({
      type: 'success',
      message: result.score === 100 
        ? '完璧です！全ての要件を満たしています。' 
        : '正解です！基本的な要件を満たしています。'
    });
  }

  return result;
}

function checkKeywords(lesson: Lesson, code: string): { passed: boolean; missing: string[] } {
  const missing = lesson.expectedKeywords.filter(keyword => !code.includes(keyword));
  return {
    passed: missing.length === 0,
    missing
  };
}

function checkOutputs(lesson: Lesson, outputs: ConsoleOutput[]): {
  passed: boolean;
  expected: string[];
  actual: string[];
  missing: string[];
} {
  const outputContents = outputs
    .filter(o => o.type === 'output')
    .map(o => o.content.trim());
  
  const allExpected: string[] = [];
  const missing: string[] = [];

  // テストケースからの期待値
  if (lesson.testCases) {
    lesson.testCases.forEach(tc => {
      allExpected.push(tc.expectedOutput);
      const found = outputContents.some(output => 
        output.includes(tc.expectedOutput) || 
        matchesPattern(output, tc.expectedOutput)
      );
      if (!found) {
        missing.push(tc.expectedOutput);
      }
    });
  }

  // 必須出力のチェック
  if (lesson.requiredOutputs) {
    lesson.requiredOutputs.forEach(required => {
      allExpected.push(required);
      const found = outputContents.some(output => output.includes(required));
      if (!found && !missing.includes(required)) {
        missing.push(required);
      }
    });
  }

  // パターンマッチング
  if (lesson.expectedOutputPatterns) {
    lesson.expectedOutputPatterns.forEach(pattern => {
      const regex = new RegExp(pattern);
      const found = outputContents.some(output => regex.test(output));
      if (!found) {
        allExpected.push(`パターン: ${pattern}`);
        missing.push(`パターン: ${pattern}`);
      }
    });
  }

  return {
    passed: missing.length === 0,
    expected: allExpected,
    actual: outputContents,
    missing
  };
}

function matchesPattern(output: string, expected: string): boolean {
  // 簡単なパターンマッチング（時刻やIDなどの変動する値を考慮）
  const patterns = [
    // 時刻パターン (例: "2024-01-01 12:34:56")
    /\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}/g,
    // 数値パターン
    /\d+/g,
  ];

  let outputNormalized = output;
  let expectedNormalized = expected;

  patterns.forEach(pattern => {
    outputNormalized = outputNormalized.replace(pattern, '*');
    expectedNormalized = expectedNormalized.replace(pattern, '*');
  });

  return outputNormalized === expectedNormalized;
}