import chaptersData from '@/data/chapters.json';
import endingsData from '@/data/endings.json';
import type { Chapter, Ending } from './types';

export async function loadChapters(): Promise<Chapter[]> {
  return chaptersData.chapters as Chapter[];
}

export async function loadEndings(): Promise<Ending[]> {
  return endingsData.ENDINGS as Ending[];
}
