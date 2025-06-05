import { NextRequest, NextResponse } from 'next/server';
import { loadLessonById } from '@/lib/lessons-loader';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'レッスンIDが指定されていません' },
        { status: 400 }
      );
    }

    // 指定されたIDのレッスンを取得
    const lesson = await loadLessonById(id);

    if (!lesson) {
      return NextResponse.json(
        { error: 'レッスンが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      lesson
    });
  } catch (error) {
    console.error('Lesson API error:', error);
    return NextResponse.json(
      { error: 'レッスンデータの取得中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 