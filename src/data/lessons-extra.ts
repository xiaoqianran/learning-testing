import type { Lesson } from "./lessons-types";

/** v2 扩展课：对齐 Vitest/Playwright/RTL/Defuddle/Camoufox 官方文档深度 */
export const EXTRA_LESSONS: Lesson[] = [
  {
    slug: "vitest-config",
    title: "Vitest 配置与 CLI",
    summary: "defineConfig、environment、pool、CLI 过滤与 UI。",
    level: "进阶",
    track: "Vitest",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "配置入口",
        body: "官方推荐 vitest.config.ts，与 Vite 共享 resolve/alias/插件。常用：environment（node / jsdom / happy-dom）、setupFiles、globals、coverage、testTimeout。\n\nCLI：vitest（watch）、vitest run（CI）、vitest related、vitest --ui、按文件名/ -t 名过滤。\n\n权威索引：https://vitest.dev/llms.txt",
      },
      {
        type: "code",
        title: "最小生产配置",
        lang: "ts",
        code: `import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/*.d.ts', '**/test/**'],
    },
  },
})`,
      },
      {
        type: "code",
        title: "CLI 常用",
        lang: "bash",
        code: `npx vitest                 # watch
npx vitest run             # CI
npx vitest run src/foo.test.ts
npx vitest -t "VIP 折扣"   # 按名称
npx vitest --ui
npx vitest related src/a.ts`,
      },
      {
        type: "tip",
        body: "Config 全量字段见官方 Config Reference；llms-full.txt 含每项说明。别把一切塞进 globals：显式 import { describe, it, expect } 更利于可读与类型。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "vc1",
            question: "CI 推荐命令？",
            options: ["vitest（watch）", "vitest run", "vitest --ui", "vitest bench"],
            answer: 1,
            explain: "run 跑完退出，适合流水线。",
          },
          {
            id: "vc2",
            question: "测 React 组件常见 environment？",
            options: ["node only", "jsdom 或 happy-dom", "仅 browser mode", "无 environment"],
            answer: 1,
            explain: "DOM API 需要 jsdom/happy-dom；真实浏览器用 Browser Mode。",
          },
        ],
      },
    ],
  },
  {
    slug: "vitest-setup-hooks",
    title: "Setup / Hooks / 生命周期",
    summary: "beforeEach、afterEach、setupFiles、globalSetup。",
    level: "进阶",
    track: "Vitest",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "分层清理",
        body: "setupFiles：每个测试文件前加载（扩展 expect、polyfill）。\nglobalSetup：进程级（启停测试 DB）。\nbeforeEach/afterEach：用例间隔离 mock 与 DOM。\nbeforeAll/afterAll：昂贵一次性资源。\n\n官方强调 clearMocks / restoreMocks 配置可自动清理 vi.fn。",
      },
      {
        type: "code",
        title: "hooks 示例",
        lang: "ts",
        code: `import { beforeEach, afterEach, vi } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "h1",
            question: "每个测试后恢复 spy 常用？",
            options: ["vi.fn()", "vi.restoreAllMocks()", "expect.fail", "describe.skip"],
            answer: 1,
            explain: "restoreAllMocks 还原实现与历史。",
          },
        ],
      },
    ],
  },
  {
    slug: "vitest-snapshot",
    title: "Snapshot 测试",
    summary: "toMatchSnapshot、inline、更新策略与评审。",
    level: "进阶",
    track: "Vitest",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "何时用 Snapshot",
        body: "适合：序列化输出、错误消息、大对象结构、ARIA 树。\n不适合：经常变的时间戳、随机 ID（先规范化）。\n\n首次运行生成快照文件并提交；变更时 -u 更新并 Code Review。并发 async 测试要用 test context 的 expect。\n\n官方：https://vitest.dev/guide/snapshot.html",
      },
      {
        type: "code",
        title: "文件与内联快照",
        lang: "ts",
        code: `import { expect, it } from 'vitest'

it('formats user', () => {
  expect(formatUser(user)).toMatchSnapshot()
})

it('inline', () => {
  expect(sum(1, 2)).toMatchInlineSnapshot('3')
})`,
      },
      {
        type: "tip",
        body: "Snapshot 是回归锁，不是「免写断言」。Review 时逐 diff 看是否预期。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sn1",
            question: "快照文件应？",
            options: ["加入 .gitignore", "提交并参与 Review", "只存本地", "自动删除"],
            answer: 1,
            explain: "作为可审查的回归基线。",
          },
        ],
      },
    ],
  },
  {
    slug: "vitest-browser-mode",
    title: "Browser Mode 真浏览器",
    summary: "provider Playwright/WebdriverIO、组件测、视觉回归。",
    level: "实战",
    track: "Vitest",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "为何 Browser Mode",
        body: "jsdom 不完整模拟布局/真实事件。Vitest Browser Mode 在真浏览器跑测试：window/document 原生，可用 Playwright 或 WebdriverIO provider。\n\n安装：npx vitest init browser\nCI 推荐 playwright provider（可并行）；preview 仅本地预览。\n\n还能：组件测试、视觉回归、ARIA snapshots、Trace。\n文档：https://vitest.dev/guide/browser/",
      },
      {
        type: "code",
        title: "browser 配置（官方形态）",
        lang: "ts",
        code: `import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
})`,
      },
      {
        type: "code",
        title: "组件测试概念",
        lang: "tsx",
        code: `// vitest-browser-react 等 render helper
import { render } from 'vitest-browser-react'
import { page } from '@vitest/browser/context'
import { Counter } from './Counter'

it('clicks', async () => {
  render(<Counter />)
  await page.getByRole('button', { name: '加' }).click()
  await expect.element(page.getByText('1')).toBeInTheDocument()
})`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "bm1",
            question: "CI 跑 Browser Mode 更推荐？",
            options: ["仅 preview provider", "playwright / webdriverio provider", "不要浏览器", "仅 Safari 本地"],
            answer: 1,
            explain: "官方：CI 需 playwright 或 webdriverio；preview 偏本地。",
          },
          {
            id: "bm2",
            question: "Browser Mode 与 jsdom 区别？",
            options: [
              "完全相同",
              "真浏览器 API 与事件，更接近生产",
              "不能访问 DOM",
              "只能测 Node",
            ],
            answer: 1,
            explain: "原生浏览器环境。",
          },
        ],
      },
    ],
  },
  {
    slug: "vitest-projects-types",
    title: "Projects 与类型测试",
    summary: "多项目配置、expectTypeOf / assertType。",
    level: "实战",
    track: "Vitest",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "Test Projects",
        body: "projects 可把 unit / browser / node 拆成多配置并行（不同 environment、include）。适合 monorepo 与「一部分 jsdom、一部分 browser」。\n\n类型测试：expectTypeOf / assertType 在类型层断言，不运行时执行业务。见官方 Testing Types。",
      },
      {
        type: "code",
        title: "类型测试",
        lang: "ts",
        code: `import { expectTypeOf, test } from 'vitest'

test('id is string', () => {
  expectTypeOf(getUser().id).toEqualTypeOf<string>()
})`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pt1",
            question: "expectTypeOf 主要验证？",
            options: ["运行时值", "TypeScript 类型", "网络延迟", "覆盖率数字"],
            answer: 1,
            explain: "类型层断言。",
          },
        ],
      },
    ],
  },
  {
    slug: "vitest-mocking-matrix",
    title: "Mock 矩阵：日期/模块/请求/FS",
    summary: "对齐官方 mocking 分册：dates、modules、requests、fs。",
    level: "实战",
    track: "Vitest",
    minutes: 11,
    blocks: [
      {
        type: "text",
        title: "官方 Mocking 分册",
        body: "Vitest 文档拆成：Functions、Modules、Timers、Dates、Globals、Classes、File System、Requests。\n原则：只 mock 边界；测完 restore；prefer vi.spyOn 可还原。\n\nRequests：可 mock fetch，或结合 MSW。\nFS：memfs / vi.mock('node:fs')。\nDates：vi.setSystemTime。",
      },
      {
        type: "code",
        title: "日期与模块",
        lang: "ts",
        code: `vi.useFakeTimers()
vi.setSystemTime(new Date('2026-01-01'))

vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: '1' }),
}))

// 部分 mock
vi.mock('./utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./utils')>()
  return { ...actual, randomId: () => 'fixed' }
})`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "mm1",
            question: "固定系统时间用？",
            options: ["Date = null", "vi.setSystemTime", "只有 Playwright", "CSS clock"],
            answer: 1,
            explain: "配合 fake timers。",
          },
        ],
      },
    ],
  },
  {
    slug: "rtl-which-query",
    title: "Which Query 完整优先级",
    summary: "官方推荐顺序：Role → Label → Placeholder → Text → DisplayValue → Alt → Title → TestId。",
    level: "进阶",
    track: "Testing Library",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "官方优先级（queries/about）",
        body: "1. getByRole（可访问名 / name 选项）\n2. getByLabelText（表单）\n3. getByPlaceholderText\n4. getByText\n5. getByDisplayValue\n6. getByAltText\n7. getByTitle\n8. getByTestId（最后手段）\n\n语义化查询 = 更好 a11y + 更抗重构。",
      },
      {
        type: "code",
        title: "对照",
        lang: "tsx",
        code: `// 好
screen.getByRole('button', { name: /提交/i })
screen.getByLabelText('邮箱')

// 勉强
screen.getByTestId('submit-btn')

// 差
container.querySelector('.btn.btn-primary')`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "wq1",
            question: "最后才用的查询？",
            options: ["getByRole", "getByLabelText", "getByTestId", "getByText"],
            answer: 2,
            explain: "TestId 是逃生舱。",
          },
        ],
      },
    ],
  },
  {
    slug: "rtl-a11y",
    title: "可访问性与 Role",
    summary: "name、hidden、level、jest-dom 匹配器。",
    level: "进阶",
    track: "Testing Library",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "Role 的力量",
        body: "getByRole 依赖可访问树。按钮要有可访问名（文本或 aria-label）。heading 可用 { level: 1 }。\n\n扩展：@testing-library/jest-dom 的 toBeInTheDocument、toBeVisible、toHaveAccessibleName 等。\n测 a11y 不是额外工作——它就是更好的选择器。",
      },
      {
        type: "code",
        title: "可访问断言",
        lang: "ts",
        code: `expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('设置')
expect(screen.getByRole('button', { name: '保存' })).toBeEnabled()`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "a11y1",
            question: "按钮没有可见文本时应用？",
            options: ["随便 class", "aria-label / aria-labelledby", "只靠坐标", "隐藏 DOM"],
            answer: 1,
            explain: "提供可访问名。",
          },
        ],
      },
    ],
  },
  {
    slug: "rtl-frameworks",
    title: "多框架与 MSW",
    summary: "React/Vue 包装差异；MSW 拦网络。",
    level: "实战",
    track: "Testing Library",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "同一查询理念",
        body: "React：@testing-library/react 的 render / screen。\nVue：@testing-library/vue。\n核心仍是 DOM Testing Library。\n\n网络：MSW（Mock Service Worker）在请求层 mock，组件测与部分 E2E 可复用 handler。",
      },
      {
        type: "code",
        title: "MSW 概念",
        lang: "ts",
        code: `import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  http.get('/api/user', () => HttpResponse.json({ name: 'Ada' })),
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "fw1",
            question: "MSW 拦截位置？",
            options: ["仅 CSS", "网络请求层", "TypeScript 编译", "Git hooks"],
            answer: 1,
            explain: "在 fetch/XHR 层返回 mock。",
          },
        ],
      },
    ],
  },
  {
    slug: "pw-fixtures",
    title: "Fixtures 与 test.extend",
    summary: "内置 page/context；自定义 fixture 与作用域。",
    level: "进阶",
    track: "Playwright",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "依赖注入式测试",
        body: "Playwright Test 用 fixture 注入 page、context、browser、request。\ntest.extend 可封装登录用户、API client、临时数据，并声明 scope（test/worker）。\n\n官方：https://playwright.dev/docs/test-fixtures",
      },
      {
        type: "code",
        title: "自定义 fixture",
        lang: "ts",
        code: `import { test as base, expect } from '@playwright/test'

type Fixtures = { todoPage: import('@playwright/test').Page }

export const test = base.extend<Fixtures>({
  todoPage: async ({ page }, use) => {
    await page.goto('/todos')
    await use(page)
  },
})

test('add item', async ({ todoPage }) => {
  await todoPage.getByPlaceholder('What needs doing?').fill('写测试')
  await todoPage.getByRole('button', { name: 'Add' }).click()
  await expect(todoPage.getByText('写测试')).toBeVisible()
})`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "fx1",
            question: "fixture 的核心价值？",
            options: [
              "替代断言",
              "可组合的测试前置/资源注入",
              "只用于截图",
              "关闭并行",
            ],
            answer: 1,
            explain: "隔离与复用 setup。",
          },
        ],
      },
    ],
  },
  {
    slug: "pw-auth",
    title: "登录态与 storageState",
    summary: "global setup 登录一次，多测复用 cookie。",
    level: "实战",
    track: "Playwright",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "别每个用例手点登录",
        body: "官方 Authentication 指南：setup 项目登录 → 保存 storageState → 依赖项目复用。\n或 API 登录拿 cookie 写入 context。\n敏感环境用独立测试账号。",
      },
      {
        type: "code",
        title: "保存状态",
        lang: "ts",
        code: `// setup
await page.goto('/login')
await page.getByLabel('Email').fill(process.env.USER!)
await page.getByLabel('Password').fill(process.env.PASS!)
await page.getByRole('button', { name: 'Sign in' }).click()
await page.context().storageState({ path: 'playwright/.auth/user.json' })

// playwright.config.ts
// projects: [{ name: 'setup', testMatch: /.*\\.setup\\.ts/ },
//   { name: 'chromium', dependencies: ['setup'], use: { storageState: '...' } }]`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "au1",
            question: "storageState 保存的是？",
            options: ["仅截图", "cookies / localStorage 等会话", "源码", "覆盖率"],
            answer: 1,
            explain: "浏览器存储的会话状态。",
          },
        ],
      },
    ],
  },
  {
    slug: "pw-api-visual",
    title: "API 测试与视觉对比",
    summary: "request fixture；toHaveScreenshot。",
    level: "实战",
    track: "Playwright",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "不止 UI",
        body: "API testing：APIRequestContext（request fixture）发 HTTP，可与 UI 混合（先 API 造数再 UI 验证）。\n视觉：expect(page).toHaveScreenshot() / locator 截图；注意字体、动画、动态数据需屏蔽。\n\n文档：api-testing、test-snapshots。",
      },
      {
        type: "code",
        title: "API + 截图",
        lang: "ts",
        code: `test('create via API', async ({ request, page }) => {
  const res = await request.post('/api/items', { data: { title: 'A' } })
  expect(res.ok()).toBeTruthy()
  await page.goto('/items')
  await expect(page.getByText('A')).toBeVisible()
})

test('hero visual', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('home.png', {
    maxDiffPixelRatio: 0.01,
  })
})`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "av1",
            question: "视觉测试需注意？",
            options: [
              "忽略字体与动态区域",
              "固定动画/动态数据，控制环境",
              "永远 0 阈值",
              "只在本地看一眼",
            ],
            answer: 1,
            explain: "稳定基线才能有意义。",
          },
        ],
      },
    ],
  },
  {
    slug: "pw-agents-mcp",
    title: "Test Agents 与 MCP",
    summary: "planner / generator / healer；Playwright MCP。",
    level: "实战",
    track: "Playwright",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "面向 LLM 的测试工作流",
        body: "Playwright Test Agents（1.56+）：\n- planner：探索应用 → Markdown 测试计划\n- generator：计划 → 测试代码\n- healer：跑测并尝试修复失败\n\nnpx playwright init-agents --loop=vscode\n\nPlaywright MCP：通过 Model Context Protocol 让 LLM 用可访问性快照操作浏览器（非纯截图 vision）。\n\n文档：/docs/test-agents 、/docs/getting-started-mcp",
      },
      {
        type: "code",
        title: "初始化 agents",
        lang: "bash",
        code: `npx playwright init-agents --loop=vscode
# 或 claude / other loops 见官方`,
      },
      {
        type: "tip",
        body: "Agent 生成的代码仍需人审：定位器是否稳健、是否测到实现细节、敏感操作是否安全。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ag1",
            question: "healer agent 的职责？",
            options: [
              "只写 README",
              "执行测试并尝试修复失败用例",
              "部署生产",
              "替换 fixture",
            ],
            answer: 1,
            explain: "跑测 + 修复循环。",
          },
        ],
      },
    ],
  },
  {
    slug: "pw-best-practices",
    title: "Playwright 最佳实践",
    summary: "官方 best-practices：隔离、定位、断言、测试独立性。",
    level: "实战",
    track: "Playwright",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "高频准则",
        body: "1. 测试独立，可任意顺序并行\n2. 用 web-first 断言\n3. 优先用户可见定位\n4. 少用 page.waitForTimeout\n5. 软断言 toPass 谨慎\n6. 调试靠 trace 不是加 sleep\n\n完整列表：https://playwright.dev/docs/best-practices",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "bp1",
            question: "官方反对的常见写法？",
            options: [
              "getByRole",
              "固定 waitForTimeout 当同步手段",
              "expect(locator).toBeVisible()",
              "storageState",
            ],
            answer: 1,
            explain: "固定等待导致慢与 flaky。",
          },
        ],
      },
    ],
  },
  {
    slug: "puppeteer-bidi-webmcp",
    title: "BiDi 与 WebMCP",
    summary: "WebDriver BiDi；实验性 WebMCP 工具发现与调用。",
    level: "实战",
    track: "Puppeteer",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "协议演进",
        body: "Puppeteer 可通过 CDP 或 WebDriver BiDi 控制 Chrome/Firefox。\nWebMCP（实验）：页面注册 tools，自动化/LLM 可 page.webmcp.tools() 发现并用 execute 调用——站点主动暴露能力，而非盲目点 DOM。\n\n文档：https://pptr.dev/guides/webmcp",
      },
      {
        type: "code",
        title: "WebMCP 概念",
        lang: "ts",
        code: `// 页面侧（站点）注册 tool；Puppeteer 侧：
const tools = await page.webmcp.tools()
// 监听 toolsadded / toolsremoved
// tool.execute(args)`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "wm1",
            question: "WebMCP 的方向是？",
            options: [
              "废弃所有测试",
              "页面显式注册可被 agent 调用的 tools",
              "只截图",
              "仅 CSS",
            ],
            answer: 1,
            explain: "结构化工具接口给 agent。",
          },
        ],
      },
    ],
  },
  {
    slug: "defuddle-api",
    title: "Defuddle 官方 API",
    summary: "Browser / Node / CLI；Markdown 与元数据。",
    level: "进阶",
    track: "高级工具",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "权威来源：kepano/defuddle",
        body: "Defuddle = 去掉杂乱，提取主内容（HTML 或 Markdown）。源自 Obsidian Web Clipper，可替代 Mozilla Readability：更宽容、脚注/数学/代码块更一致、元数据更全（schema.org）。\n\nBrowser：new Defuddle(document).parse()\nNode：Defuddle(document, url, { markdown: true })（需 linkedom/jsdom）\nCLI：npx defuddle parse URL --markdown --json",
      },
      {
        type: "code",
        title: "Browser",
        lang: "ts",
        code: `import Defuddle from 'defuddle'

const defuddle = new Defuddle(document)
const result = defuddle.parse()
// result.content, title, author, description, published, ...`,
      },
      {
        type: "code",
        title: "Node + CLI",
        lang: "ts",
        code: `import { parseHTML } from 'linkedom'
import { Defuddle } from 'defuddle/node'

const { document } = parseHTML(html)
const result = await Defuddle(document, 'https://example.com/a', {
  markdown: true,
})

// CLI
// npx defuddle parse https://example.com/a --markdown --json
// npx defuddle parse page.html --property title`,
      },
      {
        type: "tip",
        body: "在测试中：对「正文合规句」断言用提取结果，避免侧栏广告 DOM 抖动导致 flaky。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "dfapi1",
            question: "Node 端需要？",
            options: [
              "只能在浏览器",
              "DOM 实现（linkedom/jsdom）+ defuddle/node",
              "仅 Python",
              "必须 Camoufox",
            ],
            answer: 1,
            explain: "传入 Document 即可。",
          },
        ],
      },
    ],
  },
  {
    slug: "camoufox-python",
    title: "Camoufox Python + Playwright",
    summary: "官方库：指纹注入、GeoIP、与 Playwright 代码兼容。",
    level: "实战",
    track: "高级工具",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "官网 llms.txt 结构",
        body: "Camoufox 提供 https://camoufox.com/llms.txt —— 含 Stealth、Features、Python Interface、Fingerprint 分章。\n\nPython 包包装 Playwright：改启动方式即可复用既有 page 代码。指纹在 C++ 层注入（非页面 JS 补丁），含 navigator、WebGL、字体、WebRTC IP、人机鼠标轨迹等。\n\n仅限伦理与授权场景（见 legal.md）。",
      },
      {
        type: "code",
        title: "用法概念（以官方文档为准）",
        lang: "python",
        code: `# pip install camoufox[geoip]
# 概念示例 —— API 以 camoufox.com/python/usage 为准
from camoufox.sync_api import Camoufox

with Camoufox(headless=True, geoip=True) as browser:
    page = browser.new_page()
    page.goto("https://your-staging.example/bot-check")
    # 既有 Playwright 风格断言/操作
    page.screenshot(path="check.png")`,
      },
      {
        type: "code",
        title: "指纹相关能力（摘要）",
        lang: "txt",
        code: `Navigator / Screen / Window / Document
WebGL 参数与扩展
Fonts 列表
Geolocation + Intl + Timezone
WebRTC ICE/SDP 层 IP 伪装
Human-like cursor movement
BrowserForge 指纹分布
Virtual display 建议用于「类有头」无界面`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cfpy1",
            question: "Camoufox 指纹注入层次？",
            options: [
              "仅 document.title 改写",
              "C++ 实现层拦截，JS 难探测",
              "只改 User-Agent 字符串",
              "只改 CSS",
            ],
            answer: 1,
            explain: "官方强调 C++ 层注入。",
          },
          {
            id: "cfpy2",
            question: "与 Playwright 关系？",
            options: [
              "完全不兼容",
              "Python 库兼容既有 Playwright 页面 API",
              "只能 Puppeteer",
              "只能 JUnit",
            ],
            answer: 1,
            explain: "改初始化即可复用代码。",
          },
        ],
      },
    ],
  },
  {
    slug: "llms-txt-for-testers",
    title: "llms.txt 与测试文档",
    summary: "如何用官方 llms.txt 喂给 AI；本站也提供索引。",
    level: "进阶",
    track: "工程化",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "给 LLM 的文档地图",
        body: "llms.txt（https://llmstxt.org/）：站点根路径的 Markdown 索引，告诉模型「该读哪些权威页」。\nllms-full.txt：尽量全文拼接，适合一次性灌入。\n\n已发现：\n- Vitest：/llms.txt + /llms-full.txt\n- Vite：/llms.txt + /llms-full.txt\n- Camoufox：/llms.txt\n- Playwright / Testing Library / Puppeteer：暂无根路径 llms.txt → 用文档 URL + MCP/Agents\n\n本站：/llms.txt 与 /llms-full.txt，以及「官方文档」页汇总链接。",
      },
      {
        type: "code",
        title: "Cursor / Agent 用法",
        lang: "txt",
        code: `1. @https://vitest.dev/llms.txt 了解目录
2. 需要细节时再拉具体 /guide/*.md 或 llms-full 片段
3. Playwright 用官方 Test Agents / MCP 代替臆造 API
4. 生成测试后仍跑 vitest/playwright 验证`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ll1",
            question: "llms.txt 的作用？",
            options: [
              "封锁所有爬虫",
              "为 LLM 提供结构化文档入口",
              "替代 package-lock",
              "加密源码",
            ],
            answer: 1,
            explain: "AI 可读的文档索引。",
          },
        ],
      },
    ],
  },
];
