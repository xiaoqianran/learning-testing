/** 官方文档与 llms.txt 索引 —— 对齐官网可检索性 */

export type DocLink = {
  title: string;
  url: string;
  note?: string;
  kind?: "docs" | "llms" | "api" | "github" | "guide";
};

export type DocGroup = {
  id: string;
  name: string;
  blurb: string;
  homepage: string;
  links: DocLink[];
  /** 我们课程里对应的 track */
  track?: string;
};

export const OFFICIAL_DOCS: DocGroup[] = [
  {
    id: "vitest",
    name: "Vitest",
    blurb:
      "Vite 原生测试框架。官网提供完整 llms.txt / llms-full.txt，覆盖 config、Browser Mode、Mock、Snapshot、Projects、类型测试等。",
    homepage: "https://vitest.dev/",
    track: "Vitest",
    links: [
      { title: "指南入口", url: "https://vitest.dev/guide/", kind: "docs" },
      { title: "llms.txt（目录索引）", url: "https://vitest.dev/llms.txt", kind: "llms" },
      {
        title: "llms-full.txt（全文，约 1MB+）",
        url: "https://vitest.dev/llms-full.txt",
        kind: "llms",
      },
      { title: "Config 参考", url: "https://vitest.dev/config/", kind: "api" },
      { title: "expect API", url: "https://vitest.dev/api/expect.html", kind: "api" },
      { title: "vi API", url: "https://vitest.dev/api/vi.html", kind: "api" },
      { title: "Browser Mode", url: "https://vitest.dev/guide/browser/", kind: "guide" },
      { title: "Coverage", url: "https://vitest.dev/guide/coverage.html", kind: "guide" },
      { title: "Mocking", url: "https://vitest.dev/guide/mocking.html", kind: "guide" },
      { title: "Snapshot", url: "https://vitest.dev/guide/snapshot.html", kind: "guide" },
      { title: "Projects", url: "https://vitest.dev/guide/projects.html", kind: "guide" },
      { title: "Testing Types", url: "https://vitest.dev/guide/testing-types.html", kind: "guide" },
      { title: "中文站", url: "https://cn.vitest.dev/", kind: "docs" },
    ],
  },
  {
    id: "testing-library",
    name: "Testing Library",
    blurb:
      "用户视角的 DOM 查询与交互。核心理念：The more your tests resemble the way your software is used… 暂无官方 llms.txt，以文档站为准。",
    homepage: "https://testing-library.com/",
    track: "Testing Library",
    links: [
      { title: "文档首页", url: "https://testing-library.com/docs/", kind: "docs" },
      {
        title: "Guiding Principles",
        url: "https://testing-library.com/docs/guiding-principles",
        kind: "guide",
      },
      {
        title: "Which query?",
        url: "https://testing-library.com/docs/queries/about/#priority",
        kind: "guide",
      },
      {
        title: "Async methods",
        url: "https://testing-library.com/docs/dom-testing-library/api-async",
        kind: "api",
      },
      {
        title: "user-event",
        url: "https://testing-library.com/docs/user-event/intro",
        kind: "guide",
      },
      {
        title: "React Testing Library",
        url: "https://testing-library.com/docs/react-testing-library/intro",
        kind: "docs",
      },
      {
        title: "Vue Testing Library",
        url: "https://testing-library.com/docs/vue-testing-library/intro",
        kind: "docs",
      },
      {
        title: "GitHub monorepo",
        url: "https://github.com/testing-library",
        kind: "github",
      },
    ],
  },
  {
    id: "playwright",
    name: "Playwright",
    blurb:
      "现代 E2E：多浏览器、自动等待、Trace、Fixture、API 测试、组件实验、Test Agents / MCP。暂无根路径 llms.txt，文档站即权威。",
    homepage: "https://playwright.dev/",
    track: "Playwright",
    links: [
      { title: "文档入口", url: "https://playwright.dev/docs/intro", kind: "docs" },
      { title: "Locators", url: "https://playwright.dev/docs/locators", kind: "guide" },
      { title: "Assertions", url: "https://playwright.dev/docs/test-assertions", kind: "guide" },
      { title: "Fixtures", url: "https://playwright.dev/docs/test-fixtures", kind: "guide" },
      { title: "Network", url: "https://playwright.dev/docs/network", kind: "guide" },
      { title: "Trace Viewer", url: "https://playwright.dev/docs/trace-viewer", kind: "guide" },
      { title: "Authentication", url: "https://playwright.dev/docs/auth", kind: "guide" },
      { title: "API testing", url: "https://playwright.dev/docs/api-testing", kind: "guide" },
      {
        title: "Visual comparisons",
        url: "https://playwright.dev/docs/test-snapshots",
        kind: "guide",
      },
      { title: "CI", url: "https://playwright.dev/docs/ci", kind: "guide" },
      {
        title: "Test Agents",
        url: "https://playwright.dev/docs/test-agents",
        kind: "guide",
      },
      {
        title: "Playwright MCP",
        url: "https://playwright.dev/docs/getting-started-mcp",
        kind: "guide",
      },
      {
        title: "Best Practices",
        url: "https://playwright.dev/docs/best-practices",
        kind: "guide",
      },
    ],
  },
  {
    id: "puppeteer",
    name: "Puppeteer",
    blurb:
      "Chrome/Firefox 自动化（CDP / WebDriver BiDi）。截图、PDF、扩展测试、实验性 WebMCP。暂无 llms.txt。",
    homepage: "https://pptr.dev/",
    track: "Puppeteer",
    links: [
      { title: "文档站", url: "https://pptr.dev/", kind: "docs" },
      { title: "Getting started", url: "https://pptr.dev/guides/getting-started", kind: "guide" },
      { title: "What is Puppeteer", url: "https://pptr.dev/guides/what-is-puppeteer", kind: "guide" },
      { title: "API", url: "https://pptr.dev/api/puppeteer.puppeteer", kind: "api" },
      { title: "WebMCP (experimental)", url: "https://pptr.dev/guides/webmcp", kind: "guide" },
      {
        title: "GitHub",
        url: "https://github.com/puppeteer/puppeteer",
        kind: "github",
      },
    ],
  },
  {
    id: "defuddle",
    name: "Defuddle",
    blurb:
      "提取页面主内容为干净 HTML/Markdown（Obsidian Web Clipper 同源）。可替代 Readability；支持 Browser / Node / CLI。",
    homepage: "https://github.com/kepano/defuddle",
    track: "高级工具",
    links: [
      {
        title: "GitHub README（权威）",
        url: "https://github.com/kepano/defuddle",
        kind: "github",
      },
      {
        title: "npm: defuddle",
        url: "https://www.npmjs.com/package/defuddle",
        kind: "docs",
      },
      {
        title: "Obsidian Web Clipper",
        url: "https://github.com/obsidianmd/obsidian-clipper",
        kind: "github",
      },
    ],
  },
  {
    id: "camoufox",
    name: "Camoufox",
    blurb:
      "面向 AI agent 的反检测 Firefox。官网提供 llms.txt；Python 封装兼容 Playwright API；指纹在 C++ 层注入。",
    homepage: "https://camoufox.com/",
    track: "高级工具",
    links: [
      { title: "官网", url: "https://camoufox.com/", kind: "docs" },
      { title: "llms.txt", url: "https://camoufox.com/llms.txt", kind: "llms" },
      { title: "Stealth 概览", url: "https://camoufox.com/stealth.md", kind: "guide" },
      { title: "Features 列表", url: "https://camoufox.com/features.md", kind: "guide" },
      {
        title: "Python 安装",
        url: "https://camoufox.com/python/installation.md",
        kind: "guide",
      },
      { title: "Python 用法", url: "https://camoufox.com/python/usage.md", kind: "guide" },
      {
        title: "GeoIP & Proxy",
        url: "https://camoufox.com/python/geoip.md",
        kind: "guide",
      },
      {
        title: "Fingerprint 注入",
        url: "https://camoufox.com/fingerprint/index.md",
        kind: "guide",
      },
      {
        title: "PyPI camoufox",
        url: "https://pypi.org/project/camoufox/",
        kind: "docs",
      },
      { title: "法律声明", url: "https://camoufox.com/legal.md", kind: "docs" },
    ],
  },
  {
    id: "vite",
    name: "Vite（相关）",
    blurb: "Vitest 与 Vite 同构；Vite 亦提供 llms.txt 便于对照构建工具概念。",
    homepage: "https://vite.dev/",
    links: [
      { title: "llms.txt", url: "https://vite.dev/llms.txt", kind: "llms" },
      { title: "llms-full.txt", url: "https://vite.dev/llms-full.txt", kind: "llms" },
      { title: "Vite 指南", url: "https://vite.dev/guide/", kind: "docs" },
    ],
  },
  {
    id: "llmstxt-spec",
    name: "llms.txt 规范",
    blurb: "站点向 LLM 提供结构化文档入口的约定（类似 robots/sitemap 的 AI 版索引）。",
    homepage: "https://llmstxt.org/",
    links: [
      { title: "规范主页 llmstxt.org", url: "https://llmstxt.org/", kind: "docs" },
    ],
  },
];

export const SITE_LLMS = {
  index: "/llms.txt",
  full: "/llms-full.txt",
};
