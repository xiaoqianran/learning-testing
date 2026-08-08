import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  getAdjacent,
  getLesson,
  getLessonIndex,
  LESSONS,
} from "@/data/lessons";
import { DEEP_BY_SLUG } from "@/data/lessons-deep";
import { CodeBlock } from "@/components/CodeBlock";
import { InteractiveDemo } from "@/components/demos/InteractiveDemos";
import { Quiz } from "@/components/Quiz";
import { RichText } from "@/components/lesson/RichText";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/store/progress";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Check,
  Clock,
  ExternalLink,
  Lightbulb,
  Target,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lesson/$slug")({
  component: LessonPage,
});

function LessonPage() {
  const { slug } = Route.useParams();
  const lesson = getLesson(slug);
  if (!lesson) {
    throw notFound();
  }

  const deep = DEEP_BY_SLUG[slug];
  const idx = getLessonIndex(slug);
  const { prev, next } = getAdjacent(slug);
  const completed = useProgress((s) => s.completed);
  const markComplete = useProgress((s) => s.markComplete);
  const bookmarks = useProgress((s) => s.bookmarks);
  const toggleBookmark = useProgress((s) => s.toggleBookmark);
  const notes = useProgress((s) => s.notes);
  const setNote = useProgress((s) => s.setNote);
  const checkInToday = useProgress((s) => s.checkInToday);
  const done = completed.includes(slug);
  const bookmarked = bookmarks.includes(slug);
  const [note, setNoteLocal] = useState(notes[slug] ?? "");

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setNoteLocal(notes[slug] ?? "");
  }, [slug, notes]);

  return (
    <article className="mx-auto max-w-3xl pb-20">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted">
        <Link to="/" className="text-muted no-underline hover:text-fg">
          课程首页
        </Link>
        <span className="text-subtle">/</span>
        <span className="text-fg">
          第 {idx + 1}/{LESSONS.length} 节
        </span>
        <span className="rounded-full bg-surface-3 px-2 py-0.5 text-[10px]">
          {lesson.track}路径
        </span>
      </div>

      <header className="border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] font-medium text-primary">
            {lesson.level}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <Clock className="h-3.5 w-3.5" />约 {lesson.minutes} 分钟
          </span>
          {done ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] text-primary">
              <Check className="h-3 w-3" />
              已完成
            </span>
          ) : null}
        </div>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            {lesson.title}
          </h1>
          <button
            type="button"
            onClick={() => toggleBookmark(slug)}
            className={cn(
              "inline-flex h-10 items-center gap-1.5 rounded-md border px-3 text-sm transition-colors",
              bookmarked
                ? "border-primary/40 bg-primary-soft text-primary"
                : "border-border bg-surface text-muted hover:text-fg",
            )}
          >
            {bookmarked ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            {bookmarked ? "已收藏" : "收藏"}
          </button>
        </div>
        <p className="mt-2 text-base text-muted">{lesson.summary}</p>

        {deep?.objectives?.length ? (
          <div className="mt-4 rounded-xl border border-primary/25 bg-primary-soft/60 p-4">
            <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
              <Target className="h-3.5 w-3.5" />
              学完应能
            </p>
            <ul className="mt-2 space-y-1.5">
              {deep.objectives.map((o) => (
                <li key={o} className="flex gap-2 text-sm text-fg">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {deep?.official ? (
          <a
            href={deep.official}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary no-underline hover:underline"
          >
            打开官方文档对照
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : null}
      </header>

      <div className="mt-8 space-y-8">
        {lesson.blocks.map((block, i) => {
          if (block.type === "text") {
            const isPitfall = block.title?.includes("易错");
            const isLearn = block.title?.includes("学会了");
            const isProblem = block.title?.includes("讲明白");
            return (
              <section
                key={i}
                className={cn(
                  isPitfall &&
                    "rounded-xl border border-warn/30 bg-warn/5 p-4 sm:p-5",
                  isLearn &&
                    "rounded-xl border border-primary/25 bg-primary-soft/40 p-4 sm:p-5",
                  isProblem &&
                    "rounded-xl border border-border bg-surface p-4 sm:p-5 shadow-soft",
                )}
              >
                {block.title ? (
                  <h2
                    className={cn(
                      "mb-3 flex items-center gap-2 font-display text-lg font-semibold text-fg",
                    )}
                  >
                    {isPitfall ? (
                      <AlertTriangle className="h-4 w-4 text-warn" />
                    ) : null}
                    {block.title}
                  </h2>
                ) : null}
                <RichText body={block.body} />
              </section>
            );
          }
          if (block.type === "code") {
            return (
              <CodeBlock
                key={i}
                code={block.code}
                title={block.title}
                lang={block.lang}
              />
            );
          }
          if (block.type === "tip") {
            return (
              <aside
                key={i}
                className="flex gap-3 rounded-lg border border-border bg-surface-2 px-4 py-3"
              >
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-muted">
                  {block.body.startsWith("官方对照") ||
                  block.body.startsWith("http") ? (
                    <>
                      {block.body.includes("http") ? (
                        <>
                          {block.body.split("：")[0]}：
                          <a
                            href={
                              block.body.match(/https?:\/\/\S+/)?.[0] ?? "#"
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary underline-offset-2 hover:underline"
                          >
                            {block.body.match(/https?:\/\/\S+/)?.[0]}
                          </a>
                        </>
                      ) : (
                        block.body
                      )}
                    </>
                  ) : (
                    block.body
                  )}
                </p>
              </aside>
            );
          }
          if (block.type === "demo") {
            return (
              <InteractiveDemo
                key={i}
                kind={block.kind}
                title={block.title}
                hint={block.hint}
              />
            );
          }
          if (block.type === "quiz") {
            return <Quiz key={i} slug={slug} questions={block.questions} />;
          }
          return null;
        })}
      </div>

      <section className="mt-10 rounded-xl border border-border bg-surface p-4 sm:p-5">
        <h2 className="font-display text-base font-semibold text-fg">本节笔记</h2>
        <p className="mt-1 text-xs text-muted">
          建议记下：适用场景、最小例子、易错点。自动保存在本机。
        </p>
        <textarea
          value={note}
          onChange={(e) => setNoteLocal(e.target.value)}
          onBlur={() => setNote(slug, note)}
          rows={4}
          placeholder="例如：POM 里只放动作，断言留在测试…"
          className="mt-3 w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-fg placeholder:text-subtle"
        />
      </section>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-6">
        {!done ? (
          <Button
            variant="secondary"
            onClick={() => {
              markComplete(slug);
              checkInToday();
            }}
          >
            <Check className="h-4 w-4" />
            标记本节完成
          </Button>
        ) : null}
      </div>

      <nav className="mt-6 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            to="/lesson/$slug"
            params={{ slug: prev.slug }}
            className="no-underline"
          >
            <div className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong hover:bg-surface-2">
              <p className="inline-flex items-center gap-1 text-xs text-muted">
                <ArrowLeft className="h-3.5 w-3.5" />
                上一节
              </p>
              <p className="mt-1 text-sm font-medium text-fg">{prev.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            to="/lesson/$slug"
            params={{ slug: next.slug }}
            className="no-underline sm:text-right"
          >
            <div className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong hover:bg-surface-2">
              <p className="inline-flex items-center gap-1 text-xs text-muted sm:justify-end">
                下一节
                <ArrowRight className="h-3.5 w-3.5" />
              </p>
              <p className="mt-1 text-sm font-medium text-fg">{next.title}</p>
            </div>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
