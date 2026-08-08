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
  track?: string;
  /** 本站已迁移的官网专题 slug */
  migrated?: string[];
};

export const OFFICIAL_DOCS: DocGroup[] = [
  {
    id: "vitest",
    name: "Vitest",
    blurb:
      "已从官方 llms.txt 迁移：过滤/Tags/并行/UI/Reporters/In-source/扩展 matchers/常见错误/Browser 组件测/视觉与 ARIA/请求与 FS mock 等。",
    homepage: "https://vitest.dev/",
    track: "Vitest",
    migrated: [
      "vitest-filtering",
      "vitest-tags",
      "vitest-parallelism",
      "vitest-ui-reporters",
      "vitest-in-source",
      "vitest-extend-matchers",
      "vitest-common-errors",
      "vitest-browser-component",
      "vitest-visual-aria",
      "vitest-mock-requests-fs",
      "vitest-test-context",
      "vitest-environment",
      "vitest-browser-mode",
      "vitest-snapshot",
      "vitest-config",
    ],
    links: [
      { title: "llms.txt", url: "https://vitest.dev/llms.txt", kind: "llms" },
      { title: "llms-full.txt", url: "https://vitest.dev/llms-full.txt", kind: "llms" },
      { title: "Filtering", url: "https://vitest.dev/guide/filtering.html", kind: "guide" },
      { title: "Test Tags", url: "https://vitest.dev/guide/test-tags.html", kind: "guide" },
      { title: "Parallelism", url: "https://vitest.dev/guide/parallelism.html", kind: "guide" },
      { title: "UI", url: "https://vitest.dev/guide/ui.html", kind: "guide" },
      { title: "Reporters", url: "https://vitest.dev/guide/reporters.html", kind: "guide" },
      { title: "In-source", url: "https://vitest.dev/guide/in-source.html", kind: "guide" },
      { title: "Extending matchers", url: "https://vitest.dev/guide/extending-matchers.html", kind: "guide" },
      { title: "Common errors", url: "https://vitest.dev/guide/common-errors.html", kind: "guide" },
      { title: "Browser Mode", url: "https://vitest.dev/guide/browser/", kind: "guide" },
      { title: "Component testing", url: "https://vitest.dev/guide/browser/component-testing.html", kind: "guide" },
      { title: "Visual regression", url: "https://vitest.dev/guide/browser/visual-regression-testing.html", kind: "guide" },
      { title: "ARIA snapshots", url: "https://vitest.dev/guide/browser/aria-snapshots.html", kind: "guide" },
      { title: "Mocking requests", url: "https://vitest.dev/guide/mocking/requests.html", kind: "guide" },
      { title: "中文站", url: "https://cn.vitest.dev/", kind: "docs" },
    ],
  },
  {
    id: "testing-library",
    name: "Testing Library",
    blurb:
      "已迁移：Which-query、within/debug、消失等待、自定义 query、Accessibility API、MSW、a11y role。",
    homepage: "https://testing-library.com/",
    track: "Testing Library",
    migrated: [
      "rtl-which-query",
      "rtl-within-debug",
      "rtl-disappearance",
      "rtl-custom-queries",
      "rtl-accessibility-api",
      "rtl-a11y",
      "rtl-frameworks",
    ],
    links: [
      { title: "Guiding Principles", url: "https://testing-library.com/docs/guiding-principles", kind: "guide" },
      { title: "Which query?", url: "https://testing-library.com/docs/queries/about/#priority", kind: "guide" },
      { title: "within", url: "https://testing-library.com/docs/dom-testing-library/api-within", kind: "api" },
      { title: "Disappearance", url: "https://testing-library.com/docs/guide-disappearance", kind: "guide" },
      { title: "Async", url: "https://testing-library.com/docs/dom-testing-library/api-async", kind: "api" },
      { title: "user-event", url: "https://testing-library.com/docs/user-event/intro", kind: "guide" },
      { title: "Accessibility", url: "https://testing-library.com/docs/dom-testing-library/api-accessibility", kind: "api" },
      { title: "Custom queries", url: "https://testing-library.com/docs/dom-testing-library/api-custom-queries", kind: "api" },
    ],
  },
  {
    id: "playwright",
    name: "Playwright",
    blurb:
      "已迁移：Codegen、POM、Actionability、Clock、并行/分片/重试、Dialog/Download、Frame/Context、参数化/webServer、设备模拟/视频、axe、ARIA snapshot、Agents/MCP、Fixtures/Auth 等。",
    homepage: "https://playwright.dev/",
    track: "Playwright",
    migrated: [
      "pw-codegen",
      "pw-pom",
      "pw-actionability",
      "pw-clock",
      "pw-parallel-shard",
      "pw-dialogs-downloads",
      "pw-frames-context",
      "pw-parameterize-webserver",
      "pw-emulation-media",
      "pw-a11y-axe",
      "pw-aria-snapshots",
      "pw-agents-mcp",
      "pw-fixtures",
      "pw-auth",
      "pw-best-practices",
      "pw-component-testing",
    ],
    links: [
      { title: "Codegen", url: "https://playwright.dev/docs/codegen", kind: "guide" },
      { title: "Page Object Model", url: "https://playwright.dev/docs/pom", kind: "guide" },
      { title: "Actionability", url: "https://playwright.dev/docs/actionability", kind: "guide" },
      { title: "Clock", url: "https://playwright.dev/docs/clock", kind: "guide" },
      { title: "Parallel", url: "https://playwright.dev/docs/test-parallel", kind: "guide" },
      { title: "Sharding", url: "https://playwright.dev/docs/test-sharding", kind: "guide" },
      { title: "Retries", url: "https://playwright.dev/docs/test-retries", kind: "guide" },
      { title: "Dialogs", url: "https://playwright.dev/docs/dialogs", kind: "guide" },
      { title: "Downloads", url: "https://playwright.dev/docs/downloads", kind: "guide" },
      { title: "Frames", url: "https://playwright.dev/docs/frames", kind: "guide" },
      { title: "webServer", url: "https://playwright.dev/docs/test-webserver", kind: "guide" },
      { title: "Emulation", url: "https://playwright.dev/docs/emulation", kind: "guide" },
      { title: "Accessibility", url: "https://playwright.dev/docs/accessibility-testing", kind: "guide" },
      { title: "ARIA snapshots", url: "https://playwright.dev/docs/aria-snapshots", kind: "guide" },
      { title: "Test Agents", url: "https://playwright.dev/docs/test-agents", kind: "guide" },
      { title: "MCP", url: "https://playwright.dev/docs/getting-started-mcp", kind: "guide" },
      { title: "Best Practices", url: "https://playwright.dev/docs/best-practices", kind: "guide" },
    ],
  },
  {
    id: "puppeteer",
    name: "Puppeteer",
    blurb: "已迁移：入门对比、截图/PDF、BiDi 与实验 WebMCP。",
    homepage: "https://pptr.dev/",
    track: "Puppeteer",
    migrated: ["puppeteer-intro", "puppeteer-vs-pw", "puppeteer-screenshots-pdf", "puppeteer-bidi-webmcp"],
    links: [
      { title: "Getting started", url: "https://pptr.dev/guides/getting-started", kind: "guide" },
      { title: "WebMCP", url: "https://pptr.dev/guides/webmcp", kind: "guide" },
      { title: "API", url: "https://pptr.dev/api/puppeteer.puppeteer", kind: "api" },
      { title: "GitHub", url: "https://github.com/puppeteer/puppeteer", kind: "github" },
    ],
  },
  {
    id: "defuddle",
    name: "Defuddle",
    blurb: "已迁移：Browser/Node API、CLI 全选项、frontmatter、标准化与元数据。",
    homepage: "https://github.com/kepano/defuddle",
    track: "高级工具",
    migrated: ["defuddle", "defuddle-api", "defuddle-cli-options"],
    links: [
      { title: "GitHub README", url: "https://github.com/kepano/defuddle", kind: "github" },
      { title: "npm", url: "https://www.npmjs.com/package/defuddle", kind: "docs" },
    ],
  },
  {
    id: "camoufox",
    name: "Camoufox",
    blurb:
      "已从官方 llms.txt 迁移：Sync/Async 用法、GeoIP、指纹矩阵、虚拟显示/Main World、Python 参数。",
    homepage: "https://camoufox.com/",
    track: "高级工具",
    migrated: [
      "camoufox",
      "camoufox-python",
      "camoufox-usage-sync-async",
      "camoufox-geoip-proxy",
      "camoufox-fingerprint-matrix",
      "camoufox-virtual-mainworld",
      "stealth-ethics",
    ],
    links: [
      { title: "llms.txt", url: "https://camoufox.com/llms.txt", kind: "llms" },
      { title: "Usage", url: "https://camoufox.com/python/usage.md", kind: "guide" },
      { title: "GeoIP", url: "https://camoufox.com/python/geoip.md", kind: "guide" },
      { title: "Features", url: "https://camoufox.com/features.md", kind: "guide" },
      { title: "Fingerprint", url: "https://camoufox.com/fingerprint/index.md", kind: "guide" },
      { title: "Virtual display", url: "https://camoufox.com/python/virtual-display.md", kind: "guide" },
      { title: "Legal", url: "https://camoufox.com/legal.md", kind: "docs" },
    ],
  },
  {
    id: "vite",
    name: "Vite",
    blurb: "Vitest 同生态；提供 llms.txt。",
    homepage: "https://vite.dev/",
    links: [
      { title: "llms.txt", url: "https://vite.dev/llms.txt", kind: "llms" },
      { title: "llms-full.txt", url: "https://vite.dev/llms-full.txt", kind: "llms" },
    ],
  },
  {
    id: "llmstxt-spec",
    name: "llms.txt 规范",
    blurb: "站点向 LLM 提供结构化文档入口。",
    homepage: "https://llmstxt.org/",
    migrated: ["llms-txt-for-testers"],
    links: [{ title: "llmstxt.org", url: "https://llmstxt.org/", kind: "docs" }],
  },
];

export const SITE_LLMS = {
  index: "/llms.txt",
  full: "/llms-full.txt",
};
