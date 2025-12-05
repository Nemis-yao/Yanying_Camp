import type { Chapter, Ending } from './types';

/**
 * StoryEngine 管理章节与结局。
 * - chaptersMap: chapterId -> Chapter
 * - endingsMap: endingId -> Ending
 *
 * 选择 use:
 *  engine.next('someChapterId') -> 会把 current 指向章节并返回 Chapter
 *  engine.next('ending:endingId') -> 返回 Ending（current 不变或可置 null）
 */
export class StoryEngine {
  private chaptersMap = new Map<string, Chapter>();
  private endingsMap = new Map<string, Ending>();
  public current: Chapter | null = null;

  constructor(chapters: Chapter[], endings: Ending[], startId = 'start') {
    chapters.forEach(c => this.chaptersMap.set(c.id, c));
    endings.forEach(e => this.endingsMap.set(e.id, e));
    this.current = this.chaptersMap.get(startId) ?? null;
  }

  /**
   * 跳转到章节或结局。
   * @param to chapterId 或 'ending:endingId'
   */
  next(to: string): Chapter | Ending | null {
    if (!to) return null;
    if (to.startsWith('ending:')) {
      const id = to.replace(/^ending:/, '');
      return this.endingsMap.get(id) ?? null;
    }
    const chapter = this.chaptersMap.get(to) ?? null;
    if (chapter) {
      this.current = chapter;
      return chapter;
    }
    console.warn('[StoryEngine] Unknown to:', to);
    return null;
  }

  getChapter(id: string): Chapter | undefined {
    return this.chaptersMap.get(id);
  }

  getEnding(id: string): Ending | undefined {
    return this.endingsMap.get(id);
  }
}
