import { promises as fs } from 'fs';
import path from 'path';
import { Lesson, Category } from '@/types/lesson';

export async function loadAllLessons(): Promise<Lesson[]> {
  const allLessons: Lesson[] = [];
  const categoryIds = ['basic', 'channel', 'sync', 'pattern'];
  const lessonsDir = path.join(process.cwd(), 'public', 'lessons');

  for (const categoryId of categoryIds) {
    try {
      const filePath = path.join(lessonsDir, `${categoryId}.json`);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileContent);
      allLessons.push(...data.lessons);
    } catch (error) {
      console.error(`Failed to load lessons for ${categoryId}:`, error);
      // エラーがあっても他のカテゴリは続行
    }
  }

  return allLessons;
}

export async function loadCategories(): Promise<Category[]> {
  try {
    const categoriesPath = path.join(process.cwd(), 'public', 'lessons', 'categories.json');
    const fileContent = await fs.readFile(categoriesPath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data.categories;
  } catch (error) {
    console.error('Failed to load categories:', error);
    return [];
  }
}

export async function loadLessonById(id: string): Promise<Lesson | null> {
  const allLessons = await loadAllLessons();
  return allLessons.find(lesson => lesson.id === id) || null;
} 