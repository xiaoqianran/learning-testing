export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
};

export type DemoKind =
  | "pyramid"
  | "aaa"
  | "vitest-expect"
  | "vitest-mock"
  | "rtl-query"
  | "rtl-user"
  | "playwright-locator"
  | "playwright-assert"
  | "puppeteer-nav"
  | "defuddle-extract"
  | "camoufox-stealth"
  | "coverage"
  | "flaky"
  | "ci-pipeline";

export type LessonBlock =
  | { type: "text"; title?: string; body: string }
  | { type: "code"; title?: string; lang?: string; code: string }
  | { type: "tip"; body: string }
  | { type: "demo"; kind: DemoKind; title: string; hint?: string }
  | { type: "quiz"; questions: QuizQuestion[] };

export type Track =
  | "基础概念"
  | "Vitest"
  | "Testing Library"
  | "Playwright"
  | "Puppeteer"
  | "高级工具"
  | "工程化";

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  level: "入门" | "进阶" | "实战";
  track: Track;
  minutes: number;
  blocks: LessonBlock[];
};
