import { createFileRoute, Link } from "@tanstack/react-router";
import { LESSONS, TRACKS, getLessonsByTrack } from "@/data/lessons";
import { useProgress } from "@/store/progress";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Sparkles,
  RotateCcw,
  Search,
  FlaskConical,
  LayoutDashboard,
  Code2,
  Terminal,
  Library,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import type { Track } from "@/data/lessons";

export const Route = createFileRoute("/")({
  component: HomePage,
});

type TrackFilter = "全部" | Track;

function HomePage() {
  const completed = useProgress((s) => s.completed);
  const quizScores = useProgress((s) => s.quizScores);
  const streak = useProgress((s) => s.streak);
  const bookmarks = useProgress((s) => s.bookmarks);
  const reset = useProgress((s) => s.reset);
  const [q, setQ] = useState("");
  const [track, setTrack] = useState<TrackFilter>("全部");

  const progress = Math.round((completed.length / LESSONS.length) * 100);
  const firstIncomplete =
    LESSONS.find((l) => !completed.includes(l.slug)) ?? LESSONS[0];

  const filtered = useMemo(() => {
    let list = track === "全部" ? LESSONS : getLessonsByTrack(track);
    const s = q.trim().toLowerCase();
    if (s) {
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(s) ||
          l.summary.toLowerCase().includes(s) ||
          l.slug.includes(s) ||
          l.track.toLowerCase().includes(s),
      );
    }
    return list;
  }, [q, track]);

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <section className="relative overflow-hidden rounded-xl border border-border bg-surface px-5 py-8 sm:px-8 sm:py-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px 200px at 10% -10%, color-mix(in oklab, var(--color-primary) 18%, transparent), transparent 70%)",
          }}
        />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/60 px-2.5 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              v2.2 · 讲明白加厚版
            </p>
            {streak > 0 ? (
              <span className="rounded-full bg-surface-3 px-2.5 py-1 font-mono text-xs text-muted">
                连续学习 {streak} 天
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl">
            系统学前端测试
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
            共 <strong className="text-fg">{LESSONS.length}</strong>{" "}
            节：从 Vitest llms.txt、Playwright 文档目录、RTL 指南与 Camoufox
            指纹章节迁移的专题均已入库——过滤/Tags、Codegen、POM、Clock、分片、axe、GeoIP…
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/docs" className="no-underline">
              <Button size="lg">
                <Library className="h-4 w-4" />
                看迁移对照表
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link
              to="/lesson/$slug"
              params={{ slug: firstIncomplete.slug }}
              className="no-underline"
            >
              <Button size="lg" variant="secondary">
                {completed.length > 0 ? "继续学习" : "从第一节"}
              </Button>
            </Link>
            <Link to="/studio" className="no-underline">
              <Button size="lg" variant="ghost">
                <Terminal className="h-4 w-4" />
                工坊
              </Button>
            </Link>
            <Link to="/playground" className="no-underline">
              <Button size="lg" variant="ghost">
                <Code2 className="h-4 w-4" />
                沙盒
              </Button>
            </Link>
            <Link to="/lab" className="no-underline">
              <Button size="lg" variant="ghost">
                <FlaskConical className="h-4 w-4" />
                练习场
              </Button>
            </Link>
            <Link to="/hub" className="no-underline">
              <Button size="lg" variant="ghost">
                <LayoutDashboard className="h-4 w-4" />
                中心
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="h-2 min-w-[8rem] flex-1 overflow-hidden rounded-full bg-surface-3 sm:max-w-xs">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-xs tabular-nums text-muted">
              已完成 {completed.length}/{LESSONS.length}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <BookOpen className="h-3.5 w-3.5" />约{" "}
              {LESSONS.reduce((a, l) => a + l.minutes, 0)} 分钟
            </span>
            {completed.length > 0 ? (
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center gap-1 text-xs text-subtle hover:text-muted"
              >
                <RotateCcw className="h-3 w-3" />
                重置进度
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            to: "/docs" as const,
            icon: Library,
            title: "官方文档",
            desc: "迁移清单 + 外链 + llms",
          },
          {
            to: "/studio" as const,
            icon: Terminal,
            title: "测试工坊",
            desc: "定位器、断言、合规",
          },
          {
            to: "/cheatsheet" as const,
            icon: BookOpen,
            title: "速查表",
            desc: "API 一页扫",
          },
          {
            to: "/playground" as const,
            icon: Code2,
            title: "断言沙盒",
            desc: "expect 直觉",
          },
        ].map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="rounded-xl border border-border bg-surface p-4 no-underline transition-colors hover:border-border-strong hover:bg-surface-2"
          >
            <card.icon className="h-5 w-5 text-primary" />
            <h2 className="mt-2 font-medium text-fg">{card.title}</h2>
            <p className="mt-1 text-xs text-muted">{card.desc}</p>
          </Link>
        ))}
      </section>

      <section className="mt-10">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-lg font-semibold text-fg">
            课程大纲 · {LESSONS.length}
          </h2>
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜索课程 / slug…"
              className="h-10 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm text-fg placeholder:text-subtle sm:w-56"
            />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {(["全部", ...TRACKS] as TrackFilter[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTrack(t)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                track === t
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border bg-surface text-muted hover:text-fg",
              )}
            >
              {t}
              {t !== "全部" ? (
                <span className="ml-1 opacity-60">
                  {getLessonsByTrack(t).length}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        <ul className="space-y-2">
          {filtered.map((lesson) => {
            const done = completed.includes(lesson.slug);
            const score = quizScores[lesson.slug];
            const bookmarked = bookmarks.includes(lesson.slug);
            return (
              <li key={lesson.slug}>
                <Link
                  to="/lesson/$slug"
                  params={{ slug: lesson.slug }}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 no-underline transition-colors hover:border-border-strong hover:bg-surface-2"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs",
                      done
                        ? "bg-primary text-primary-fg"
                        : "bg-surface-3 text-muted",
                    )}
                  >
                    {done ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      LESSONS.indexOf(lesson) + 1
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-fg">{lesson.title}</h3>
                      <span className="rounded-full bg-surface-3 px-2 py-0.5 text-[10px] text-muted">
                        {lesson.track}
                      </span>
                      {bookmarked ? (
                        <span className="text-[10px] text-primary">已收藏</span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-sm text-muted">{lesson.summary}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-subtle">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {lesson.minutes} 分钟
                      </span>
                      <span>{lesson.level}</span>
                      <span className="font-mono opacity-70">{lesson.slug}</span>
                      {score !== undefined ? (
                        <span className="font-mono text-primary">
                          测验 {score}%
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-subtle" />
                </Link>
              </li>
            );
          })}
          {filtered.length === 0 ? (
            <li className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted">
              没有匹配的课程
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  );
}
