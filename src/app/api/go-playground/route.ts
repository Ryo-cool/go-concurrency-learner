import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'コードが提供されていません' },
        { status: 400 }
      );
    }

    // コードサイズチェック
    if (code.length > 10240) {
      return NextResponse.json(
        { error: 'コードが大きすぎます（最大10KB）' },
        { status: 400 }
      );
    }

    // Go Playground APIにリクエストを送信
    const response = await fetch('https://play.golang.org/compile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        version: '2',
        body: code,
      }),
    });

    if (!response.ok) {
      throw new Error(`Go Playground API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Go Playground API error:', error);
    return NextResponse.json(
      { error: 'コードの実行中にエラーが発生しました' },
      { status: 500 }
    );
  }
}