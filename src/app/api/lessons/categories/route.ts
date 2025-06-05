import { NextResponse } from 'next/server';
import { loadCategories } from '@/lib/lessons-loader';

export async function GET() {
  try {
    // カテゴリデータを読み込み
    const categories = await loadCategories();

    return NextResponse.json({
      categories
    });
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { error: 'カテゴリデータの取得中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 