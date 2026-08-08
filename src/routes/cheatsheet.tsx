import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";

export const Route = createFileRoute("/cheatsheet")({
  component: CheatsheetPage,
});

const SECTIONS: { title: string; items: { k: string; v: string }[] }[] = [
  {
    title: "Vitest",
    items: [
      { k: "defineConfig", v: "vitest.config.ts，与 Vite 共享插件/alias" },
      { k: "environment", v: "node | jsdom | happy-dom" },
      { k: "vitest run", v: "CI 单次跑完" },
      { k: "describe / it / test", v: "分组与用例" },
      { k: "expect(...).toBe", v: "原始值 / 引用" },
      { k: "toEqual / toMatchObject", v: "深比较 / 子集" },
      { k: "toMatchSnapshot", v: "快照；-u 更新并 Review" },
      { k: "vi.fn / spyOn", v: "假函数与监视" },
      { k: "vi.mock", v: "模块级 mock；可 importOriginal 部分 mock" },
      { k: "vi.useFakeTimers", v: "定时器；setSystemTime" },
      { k: "setupFiles / hooks", v: "文件级 setup；beforeEach 清理" },
      { k: "projects", v: "多项目并行（unit/browser 分流）" },
      { k: "expectTypeOf", v: "类型测试" },
      { k: "browser.enabled", v: "Browser Mode + playwright provider" },
      { k: "coverage v8", v: "找盲区；分支比行数更重要" },
      { k: "llms.txt", v: "https://vitest.dev/llms.txt" },
    ],
  },
  {
    title: "Testing Library",
    items: [
      { k: "原则", v: "像用户一样使用软件" },
      { k: "getByRole", v: "首选；带 name / level" },
      { k: "getByLabelText", v: "表单控件" },
      { k: "queryBy*", v: "断言不存在" },
      { k: "findBy*", v: "异步等待出现" },
      { k: "userEvent.setup()", v: "真实交互序列" },
      { k: "TestId", v: "最后手段" },
      { k: "jest-dom", v: "toBeInTheDocument / toBeVisible …" },
      { k: "MSW", v: "请求层 mock，可复用 handler" },
    ],
  },
  {
    title: "Playwright",
    items: [
      { k: "page.goto", v: "导航" },
      { k: "getByRole / Label", v: "稳健定位" },
      { k: "expect(locator)", v: "Web-first 自动重试" },
      { k: "page.route", v: "拦截 / mock 网络" },
      { k: "storageState", v: "复用登录态" },
      { k: "test.extend", v: "自定义 fixture" },
      { k: "request", v: "API 测试 fixture" },
      { k: "toHaveScreenshot", v: "视觉对比" },
      { k: "trace / --ui", v: "调试回放" },
      { k: "init-agents", v: "planner / generator / healer" },
      { k: "MCP", v: "LLM 用 a11y 快照驱动浏览器" },
      { k: "best-practices", v: "忌 waitForTimeout 当同步" },
    ],
  },
  {
    title: "Puppeteer",
    items: [
      { k: "launch / connect", v: "CDP 或 BiDi" },
      { k: "page.goto", v: "waitUntil 选项" },
      { k: "screenshot / pdf", v: "渲染管线" },
      { k: "page.$eval", v: "页面上下文取值" },
      { k: "WebMCP", v: "实验：页面注册 tools" },
      { k: "vs PW", v: "产品 E2E 优先 Playwright" },
    ],
  },
  {
    title: "Defuddle",
    items: [
      { k: "new Defuddle(doc).parse()", v: "浏览器提取" },
      { k: "defuddle/node", v: "Node + linkedom/jsdom" },
      { k: "npx defuddle parse", v: "CLI；--markdown --json" },
      { k: "metadata", v: "title/author/schema.org …" },
      { k: "vs Readability", v: "更宽容、输出更一致" },
    ],
  },
  {
    title: "Camoufox",
    items: [
      { k: "llms.txt", v: "https://camoufox.com/llms.txt" },
      { k: "Python + Playwright", v: "改启动即可复用 page API" },
      { k: "C++ 指纹", v: "非页面 JS 补丁" },
      { k: "geoip", v: "时区/locale/WebRTC 对齐" },
      { k: "human cursor", v: "类人轨迹" },
      { k: "legal", v: "仅伦理与授权场景" },
    ],
  },
  {
    title: "工程化",
    items: [
      { k: "金字塔", v: "单元多 · E2E 少而精" },
      { k: "AAA", v: "Arrange Act Assert" },
      { k: "Flaky", v: "条件等待，忌固定 sleep" },
      { k: "CI", v: "lint + typecheck + unit + E2E 分片 + artifact" },
      { k: "覆盖率", v: "找盲区，不唯数字" },
      { k: "llms.txt", v: "给 AI 权威文档地图" },
    ],
  },
];

function CheatsheetPage() {
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <BookMarked className="h-3.5 w-3.5" />
          v2 · 速查
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg sm:text-3xl">
          前端测试速查表
        </h1>
        <p className="mt-2 text-sm text-muted">
          对齐各官网 API。详细讲解见课程；外链总表见{" "}
          <Link to="/docs" className="text-primary no-underline hover:underline">
            官方文档
          </Link>
          ；闯关见{" "}
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
    </div>
  );
}
