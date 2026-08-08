import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import {
  BookOpen,
  Check,
  Menu,
  X,
  FlaskConical,
  LayoutDashboard,
  BookX,
  Award,
  Code2,
  Terminal,
  BookMarked,
  Library,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/store/progress";
import { LESSONS } from "@/data/lessons";
import { AuthProvider } from "@/lib/auth/provider";
import { CreatedWithGrokBanner } from "@/components/created-with-grok-banner";
import appCss from "@/styles.css?url";

const APP_NAME = "Learning Testing · 前端测试实战";
const host = import.meta.env.VITE_PUBLIC_HOSTNAME;
const ogImage = host
  ? `https://og.grok.me/v1/card.png?host=${encodeURIComponent(host)}&title=${encodeURIComponent(APP_NAME)}`
  : undefined;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "前端测试中文教程 v2.1：从 Vitest/Camoufox llms.txt 与 Playwright/RTL 官网目录迁移 79 节专题。含 Browser Mode、Codegen、POM、Clock、分片、axe、Defuddle、指纹。",
      },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
      { name: "theme-color", content: "#0a0c10" },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
          ]
        : []),
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "alternate", type: "text/plain", href: "/llms.txt", title: "llms.txt" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <AppShell>
        <Outlet />
      </AppShell>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <CreatedWithGrokBanner />
        <AuthProvider>{children}</AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

const NAV_EXTRA = [
  { to: "/studio" as const, label: "测试工坊", icon: Terminal },
  { to: "/docs" as const, label: "官方文档", icon: Library },
  { to: "/cheatsheet" as const, label: "速查表", icon: BookMarked },
  { to: "/playground" as const, label: "断言沙盒", icon: Code2 },
  { to: "/hub" as const, label: "学习中心", icon: LayoutDashboard },
  { to: "/lab" as const, label: "练习场", icon: FlaskConical },
  { to: "/mistakes" as const, label: "错题本", icon: BookX },
  { to: "/certificate" as const, label: "结业", icon: Award },
];

function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const completed = useProgress((s) => s.completed);
  const streak = useProgress((s) => s.streak);
  const checkInToday = useProgress((s) => s.checkInToday);
  const progress = Math.round((completed.length / LESSONS.length) * 100);

  useEffect(() => {
    checkInToday();
  }, [checkInToday]);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 pt-[var(--grok-banner-h,0px)] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-fg lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "关闭目录" : "打开目录"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link
            to="/"
            className="flex min-w-0 items-center gap-2.5 no-underline"
            onClick={() => setOpen(false)}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
              <FlaskConical className="h-4 w-4" />
            </span>
            <span className="truncate font-display text-sm font-semibold tracking-tight text-fg">
              Learning Testing
            </span>
            <span className="hidden rounded-full bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] text-primary sm:inline">
              v2.1
            </span>
          </Link>

          <nav className="ml-2 hidden items-center gap-0.5 xl:flex">
            {NAV_EXTRA.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-2 py-1.5 text-xs text-muted no-underline transition-colors hover:bg-surface-2 hover:text-fg [&.active]:bg-primary-soft [&.active]:text-primary"
                activeProps={{ className: "active" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {streak > 0 ? (
              <span className="hidden font-mono text-xs tabular-nums text-muted sm:inline">
                连续 {streak} 天
              </span>
            ) : null}
            <div className="hidden items-center gap-2 sm:flex">
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-3">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-xs tabular-nums text-muted">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-[min(18rem,88vw)] border-r border-border bg-surface pt-14 transition-transform duration-200 ease-out lg:static lg:z-0 lg:w-64 lg:shrink-0 lg:translate-x-0 lg:border-r lg:bg-transparent lg:pt-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <nav className="scrollbar-thin h-[calc(100dvh-3.5rem)] overflow-y-auto p-3 lg:sticky lg:top-14 lg:h-[calc(100dvh-3.5rem)] lg:py-6">
            <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-subtle">
              快捷入口
            </p>
            <ul className="mb-4 flex flex-col gap-0.5">
              {NAV_EXTRA.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-fg no-underline transition-colors hover:bg-surface-2 [&.active]:bg-primary-soft [&.active]:text-primary"
                      activeProps={{ className: "active" }}
                    >
                      <Icon className="h-4 w-4 shrink-0 opacity-70" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-subtle">
              课程目录 · {LESSONS.length} 节
            </p>
            <ul className="flex flex-col gap-0.5">
              {LESSONS.map((lesson, i) => {
                const done = completed.includes(lesson.slug);
                return (
                  <li key={lesson.slug}>
                    <Link
                      to="/lesson/$slug"
                      params={{ slug: lesson.slug }}
                      onClick={() => setOpen(false)}
                      className="flex items-start gap-2.5 rounded-md px-2.5 py-2 text-sm text-fg no-underline transition-colors duration-150 hover:bg-surface-2 [&.active]:bg-primary-soft [&.active]:text-primary"
                      activeProps={{ className: "active" }}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-medium",
                          done
                            ? "bg-primary text-primary-fg"
                            : "bg-surface-3 text-muted",
                        )}
                      >
                        {done ? <Check className="h-3 w-3" /> : i + 1}
                      </span>
                      <span className="min-w-0 leading-snug">
                        <span className="block">{lesson.title}</span>
                        <span className="text-[10px] text-subtle">
                          {lesson.track}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-center gap-2 px-2 text-xs text-subtle">
              <BookOpen className="h-3.5 w-3.5" />
              官网专题已迁移
            </div>
          </nav>
        </aside>

        {open ? (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-bg/60 lg:hidden"
            aria-label="关闭遮罩"
            onClick={() => setOpen(false)}
          />
        ) : null}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
