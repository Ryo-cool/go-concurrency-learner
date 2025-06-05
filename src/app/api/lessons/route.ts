import { NextRequest, NextResponse } from 'next/server';
import { loadAllLessons } from '@/lib/lessons-loader';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // レッスンデータを読み込み
    const allLessons = await loadAllLessons();

    // フィルタリング
    let filteredLessons = allLessons;

    if (category) {
      filteredLessons = filteredLessons.filter(lesson => lesson.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredLessons = filteredLessons.filter(lesson =>
        lesson.title.toLowerCase().includes(searchLower) ||
        lesson.description.toLowerCase().includes(searchLower) ||
        lesson.objectives.some((obj: string) => obj.toLowerCase().includes(searchLower))
      );
    }

    return NextResponse.json({
      lessons: filteredLessons,
      total: filteredLessons.length
    });
  } catch (error) {
    console.error('Lessons API error:', error);
    return NextResponse.json(
      { error: 'レッスンデータの取得中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 