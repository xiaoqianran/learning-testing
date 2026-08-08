import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";

export const Route = createFileRoute("/cheatsheet")({
  component: CheatsheetPage,
});

const SECTIONS: { title: string; items: { k: string; v: string }[] }[] = [
  {
    title: "Vitest",
    items: [
      { k: "describe / it", v: "用例分组与用例" },
      { k: "expect(...).toBe", v: "原始值 / 引用相等" },
      { k: "toEqual / toMatchObject", v: "深比较 / 子集" },
      { k: "vi.fn / spyOn", v: "假函数与监视" },
      { k: "vi.mock", v: "模块级 mock" },
      { k: "vi.useFakeTimers", v: "控制定时器" },
      { k: "vitest run", v: "CI 单次跑完" },
    ],
  },
  {
    title: "Testing Library",
    items: [
      { k: "getByRole", v: "首选查询（可访问名）" },
      { k: "getByLabelText", v: "表单控件" },
      { k: "queryBy*", v: "断言不存在" },
      { k: "findBy*", v: "异步等待出现" },
      { k: "userEvent.setup()", v: "真实交互序列" },
      { k: "waitFor", v: "等待条件成立" },
    ],
  },
  {
    title: "Playwright",
    items: [
      { k: "page.goto", v: "导航" },
      { k: "getByRole / getByLabel", v: "稳健定位" },
      { k: "expect(locator)", v: "Web-first 自动重试" },
      { k: "page.route", v: "拦截 / mock 网络" },
      { k: "storageState", v: "复用登录态" },
      { k: "trace / --ui", v: "调试与回放" },
    ],
  },
  {
    title: "Puppeteer",
    items: [
      { k: "puppeteer.launch", v: "启动 Chromium" },
      { k: "page.goto", v: "waitUntil: networkidle2 等" },
      { k: "page.screenshot", v: "截图 / PDF" },
      { k: "page.$eval", v: "在页面上下文取值" },
      { k: "vs Playwright", v: "E2E 产品测试优先 PW" },
    ],
  },
  {
    title: "高级工具",
    items: [
      { k: "Defuddle", v: "HTML → 可读正文，降噪声" },
      { k: "Camoufox", v: "反检测 Firefox，合法防御测试" },
      { k: "伦理", v: "授权、限速、合规" },
    ],
  },
  {
    title: "工程化",
    items: [
      { k: "金字塔", v: "单元多 · E2E 少而精" },
      { k: "AAA", v: "Arrange Act Assert" },
      { k: "Flaky", v: "条件等待，忌固定 sleep" },
      { k: "CI", v: "lint + typecheck + unit + E2E 分片" },
      { k: "覆盖率", v: "找盲区，不唯数字" },
    ],
  },
];

function CheatsheetPage() {
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <BookMarked className="h-3.5 w-3.5" />
          速查
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg sm:text-3xl">
          前端测试速查表
        </h1>
        <p className="mt-2 text-sm text-muted">
          面试前 / 写用例时快速扫一眼。详细讲解见课程；闯关见{" "}
          <Link
            to="/studio"
            className="text-primary no-underline hover:underline"
          >
            测试工坊
          </Link>
          。
        </p>
      </header>

      <div className="grid gap-4">
        {SECTIONS.map((sec) => (
          <section
            key={sec.title}
            className="overflow-hidden rounded-xl border border-border bg-surface"
          >
            <h2 className="border-b border-border bg-surface-2 px-4 py-2.5 font-display text-sm font-semibold text-fg">
              {sec.title}
            </h2>
            <ul className="divide-y divide-border">
              {sec.items.map((it) => (
                <li
                  key={it.k}
                  className="grid gap-1 px-4 py-2.5 sm:grid-cols-[12rem_1fr] sm:gap-3"
                >
                  <code className="font-mono text-xs text-primary">{it.k}</code>
                  <span className="text-sm text-muted">{it.v}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-subtle">
        建议顺序：基础概念 → Vitest → Testing Library → Playwright → Puppeteer →
        高级工具 → 工程化 → 工坊闯关
      </p>
    </div>
  );
}
