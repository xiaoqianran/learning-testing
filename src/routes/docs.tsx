import { createFileRoute, Link } from "@tanstack/react-router";
import { OFFICIAL_DOCS, SITE_LLMS } from "@/data/official-docs";
import { BookOpen, ExternalLink, FileText, Sparkles, Check } from "lucide-react";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
});

function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <BookOpen className="h-3.5 w-3.5" />
          官方文档 · v3.1 迁移
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg sm:text-3xl">
          官网有的，我们尽量都有
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          对照 Vitest/Camoufox <code className="text-primary">llms.txt</code>{" "}
          与 Playwright/RTL 文档站目录，把原先缺失的专题迁入课程。每组下列出「已迁移课」可直达。
        </p>
      </header>

      <section className="mb-6 rounded-xl border border-primary/30 bg-primary-soft p-4">
        <div className="flex items-start gap-2">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <h2 className="text-sm font-semibold text-fg">本站 llms.txt</h2>
            <p className="mt-1 text-xs text-muted">
              含完整课表与正文摘要，供 Cursor / Claude / 其他 agent 读取。
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={SITE_LLMS.index}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-bg px-3 py-1.5 font-mono text-xs text-primary no-underline"
                target="_blank"
                rel="noreferrer"
              >
                <FileText className="h-3.5 w-3.5" />
                /llms.txt
              </a>
              <a
                href={SITE_LLMS.full}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-bg px-3 py-1.5 font-mono text-xs text-primary no-underline"
                target="_blank"
                rel="noreferrer"
              >
                <FileText className="h-3.5 w-3.5" />
                /llms-full.txt
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-4">
        {OFFICIAL_DOCS.map((group) => (
          <section
            key={group.id}
            className="overflow-hidden rounded-xl border border-border bg-surface"
          >
            <div className="border-b border-border bg-surface-2 px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-base font-semibold text-fg">
                  {group.name}
                </h2>
                {group.track ? (
                  <span className="rounded-full bg-surface-3 px-2 py-0.5 text-[10px] text-muted">
                    {group.track}
                  </span>
                ) : null}
                {group.migrated?.length ? (
                  <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] text-primary">
                    已迁移 {group.migrated.length} 课
                  </span>
                ) : null}
                <a
                  href={group.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-1 text-xs text-primary no-underline hover:underline"
                >
                  官网
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {group.blurb}
              </p>
            </div>

            {group.migrated && group.migrated.length > 0 ? (
              <div className="border-b border-border px-4 py-3">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-subtle">
                  本站课程（点进学习）
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {group.migrated.map((slug) => (
                    <li key={slug}>
                      <Link
                        to="/lesson/$slug"
                        params={{ slug }}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-bg px-2.5 py-1 text-[11px] text-fg no-underline hover:border-primary/40 hover:text-primary"
                      >
                        <Check className="h-3 w-3 text-primary" />
                        {slug}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <ul className="divide-y divide-border">
              {group.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-wrap items-center gap-2 px-4 py-2.5 text-sm no-underline hover:bg-surface-2"
                  >
                    <span className="text-fg">{link.title}</span>
                    {link.kind ? (
                      <span className="rounded-xs bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] uppercase text-subtle">
                        {link.kind}
                      </span>
                    ) : null}
                    <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 text-subtle" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
