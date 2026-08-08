import { EXTRA_LESSONS } from "./lessons-extra";
import { CORE_LESSONS } from "./lessons-core";
import type { Lesson, Track, QuizQuestion, DemoKind, LessonBlock } from "./lessons-types";

export type { QuizQuestion, DemoKind, LessonBlock, Track, Lesson };

export const TRACKS: Track[] = [
  "基础概念",
  "Vitest",
  "Testing Library",
  "Playwright",
  "Puppeteer",
  "高级工具",
  "工程化",
];

/** 按路径合并：核心课在前，扩展课接在同路径之后 */
function mergeLessons(core: Lesson[], extra: Lesson[]): Lesson[] {
  const buckets = new Map<Track, Lesson[]>();
  for (const t of TRACKS) buckets.set(t, []);
  for (const l of core) buckets.get(l.track)!.push(l);
  for (const l of extra) buckets.get(l.track)!.push(l);
  return TRACKS.flatMap((t) => buckets.get(t) ?? []);
}

export const LESSONS: Lesson[] = mergeLessons(CORE_LESSONS, EXTRA_LESSONS);

export function getLesson(slug: string) {
  return LESSONS.find((l) => l.slug === slug);
}

export function getLessonIndex(slug: string) {
  return LESSONS.findIndex((l) => l.slug === slug);
}

export function getAdjacent(slug: string) {
  const i = getLessonIndex(slug);
  return {
    prev: i > 0 ? LESSONS[i - 1] : null,
    next: i >= 0 && i < LESSONS.length - 1 ? LESSONS[i + 1] : null,
  };
}

export function getLessonsByTrack(track: Track) {
  return LESSONS.filter((l) => l.track === track);
}

export function getAllQuizQuestions() {
  const out: (QuizQuestion & {
    lessonSlug: string;
    lessonTitle: string;
  })[] = [];
  for (const lesson of LESSONS) {
    for (const block of lesson.blocks) {
      if (block.type === "quiz") {
        for (const q of block.questions) {
          out.push({
            ...q,
            lessonSlug: lesson.slug,
            lessonTitle: lesson.title,
          });
        }
      }
    }
  }
  return out;
}
