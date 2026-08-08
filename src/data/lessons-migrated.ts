import type { Lesson } from "./lessons-types";

/** 从官网文档/llms.txt 迁移的专题（v2.1） */
export const MIGRATED_LESSONS: Lesson[] = [
  {
    slug: "vitest-filtering",
    title: "过滤测试：文件 / -t / only / skip",
    summary: "官网 filtering：缩小运行范围，避免无关测试拖慢反馈。",
    level: "进阶",
    track: "Vitest",
    minutes: 8,
    blocks: [
      { type: "text", title: "为何要过滤", body: "测试套件变大后，改一处模块不必跑几百无关用例。Vitest 支持：文件名模式、CLI -t 名称、describe/it.only、.skip、以及 tags。\n\n性能注意：-t / .only / tags 仍会加载各测试文件去发现用例；大仓库请同时传文件路径，或使用 --experimental.preParse。" },
      { type: "text", title: "三种入口", body: "1) 文件：vitest basic 匹配路径含 basic 的文件\n2) 名称：vitest -t \"empty input\"\n3) 源码：it.only / describe.skip / it.todo" },
      { type: "code", title: "CLI", lang: "bash", code: `vitest utils.test.ts -t "handles empty input"
vitest basic
vitest --experimental.preParse -t "handles empty input"
vitest related src/utils.ts` },
      { type: "tip", body: "官方：https://vitest.dev/guide/filtering.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-filtering-0",
          question: "缩小范围时最佳实践？",
          options: ["只开 -t 不传文件", "文件路径 + -t 组合", "永远跑全量", "只用 .skip 隐藏"],
          answer: 1,
          explain: "传文件路径可避免加载全部测试文件。",
        },
      ] },
    ],
  },
  {
    slug: "vitest-tags",
    title: "Test Tags 标签筛选",
    summary: "官网 test-tags：给用例打标签，按能力/环境筛选。",
    level: "进阶",
    track: "Vitest",
    minutes: 8,
    blocks: [
      { type: "text", title: "标签是什么", body: "tags 可挂在 test/describe 上，CLI --tags-filter 或配置 strictTags 控制。适合：slow、network、browser、flaky 等分组。" },
      { type: "text", title: "与 projects 关系", body: "粗分用 projects（不同环境），细分用 tags（同一配置内筛选）。" },
      { type: "code", title: "示例", lang: "ts", code: `import { test } from 'vitest'

test('checkout', { tags: ['slow', 'e2e'] }, async () => {
  // ...
})

// vitest --tags-filter=slow
// vitest --tags-filter='not flaky'` },
      { type: "tip", body: "官方：https://vitest.dev/guide/test-tags.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-tags-0",
          question: "标签的典型用途？",
          options: ["替代断言", "按场景/速度筛选子集", "删除测试", "只改覆盖率"],
          answer: 1,
          explain: "按标签跑子集。",
        },
      ] },
    ],
  },
  {
    slug: "vitest-parallelism",
    title: "并行与 pool / maxWorkers",
    summary: "官网 parallelism：文件并行、isolate、顺序控制。",
    level: "实战",
    track: "Vitest",
    minutes: 9,
    blocks: [
      { type: "text", title: "默认并行", body: "Vitest 默认多文件并行。pool 控制 worker 类型；fileParallelism、maxWorkers 调吞吐。\n隔离：isolate true 时每文件独立上下文，更安全更慢。\n顺序：sequence.concurrent / shuffle；用例内 test.concurrent。" },
      { type: "text", title: "何时串行", body: "共享全局状态、真实端口、某些浏览器实例限制时关闭并行或拆 projects。" },
      { type: "code", title: "配置", lang: "ts", code: `export default defineConfig({
  test: {
    fileParallelism: true,
    maxWorkers: 4,
    isolate: true,
    sequence: { concurrent: false },
  },
})` },
      { type: "tip", body: "官方：https://vitest.dev/guide/parallelism.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-parallelism-0",
          question: "并行变慢时优先查？",
          options: ["删掉所有测试", "worker 数、隔离、共享资源争用", "关掉 TypeScript", "只用 toBe"],
          answer: 1,
          explain: "资源与隔离配置。",
        },
      ] },
    ],
  },
  {
    slug: "vitest-ui-reporters",
    title: "Vitest UI 与 Reporters",
    summary: "官网 UI + reporters：本地可视化与 CI 报告格式。",
    level: "进阶",
    track: "Vitest",
    minutes: 8,
    blocks: [
      { type: "text", title: "Vitest UI", body: "vitest --ui 打开浏览器 UI：筛选、看失败、覆盖率。适合本地调试。" },
      { type: "text", title: "Reporters", body: "default / verbose / json / junit / html / tap / dot / github-actions 等。可多 reporter 并行；自定义 reporter 实现 onFinished 等钩子。CI 常用 junit + github-actions。" },
      { type: "code", title: "配置", lang: "ts", code: `export default defineConfig({
  test: {
    reporters: ['default', 'junit', 'github-actions'],
    outputFile: { junit: './reports/junit.xml' },
  },
})
// npx vitest --ui` },
      { type: "tip", body: "官方：ui.md · reporters.md" },
      { type: "quiz", questions: [
        {
          id: "vitest-ui-reporters-0",
          question: "CI 常见组合？",
          options: ["仅 --ui", "junit + default/github-actions", "无 reporter", "只 console.log"],
          answer: 1,
          explain: "可机读报告 + 控制台。",
        },
      ] },
    ],
  },
  {
    slug: "vitest-in-source",
    title: "In-Source Testing 源内测试",
    summary: "官网 in-source：与实现同文件的 import.meta.vitest。",
    level: "进阶",
    track: "Vitest",
    minutes: 7,
    blocks: [
      { type: "text", title: "是什么", body: "在生产源文件底部用 if (import.meta.vitest) 写测试，适合小工具函数、紧密耦合的断言，减少文件跳转。构建需剔除或 tree-shake 该分支。" },
      { type: "text", title: "取舍", body: "优点：贴近实现。缺点：污染源文件、不适合大组件。团队需统一规范。" },
      { type: "code", title: "示例", lang: "ts", code: `export function sum(a: number, b: number) {
  return a + b
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('sum', () => {
    expect(sum(1, 2)).toBe(3)
  })
}` },
      { type: "tip", body: "官方：https://vitest.dev/guide/in-source.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-in-source-0",
          question: "in-source 适合？",
          options: ["巨型 E2E", "小函数/紧耦合单元断言", "替代 Playwright", "只 mock 网络"],
          answer: 1,
          explain: "小而紧的单元。",
        },
      ] },
    ],
  },
  {
    slug: "vitest-extend-matchers",
    title: "扩展 Matchers",
    summary: "官网 extending-matchers：expect.extend 自定义断言。",
    level: "进阶",
    track: "Vitest",
    minutes: 8,
    blocks: [
      { type: "text", title: "为何扩展", body: "领域断言（toBeWithinRange、toBeValidEmail）提高可读性。基于 chai/jest 风格 expect.extend，返回 { pass, message }。" },
      { type: "text", title: "TypeScript", body: "需模块增强 Matcher 接口才能有类型提示。" },
      { type: "code", title: "示例", lang: "ts", code: `import { expect } from 'vitest'

expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling
    return {
      pass,
      message: () =>
        \`expected \${received} to be within \${floor}..\${ceiling}\`,
    }
  },
})

expect(100).toBeWithinRange(90, 110)` },
      { type: "tip", body: "官方：https://vitest.dev/guide/extending-matchers.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-extend-matchers-0",
          question: "extend 返回值必须含？",
          options: ["只有 true", "pass 与 message", "coverage", "page"],
          answer: 1,
          explain: "pass + message。",
        },
      ] },
    ],
  },
  {
    slug: "vitest-common-errors",
    title: "常见错误与调试",
    summary: "官网 common-errors + debugging：顶层 await、环境、mock 陷阱。",
    level: "进阶",
    track: "Vitest",
    minutes: 9,
    blocks: [
      { type: "text", title: "高频坑", body: "1) jsdom 中缺少浏览器 API → polyfill 或 Browser Mode\n2) mock 提升（hoist）导致顺序困惑 → vi.hoisted\n3) 异步未 await\n4) 多环境混用 globals\n5) ESM/CJS 互操作\n用 vitest --inspect-brk / IDE 断点 / UI 面板定位。" },
      { type: "text", title: "AI 写测试", body: "官方 Writing Tests with AI：给模型项目约定、真实失败日志、禁止臆造 API；优先用官方 llms.txt。" },
      { type: "code", title: "调试", lang: "bash", code: `npx vitest run path/to/file.test.ts
npx vitest --inspect-brk --no-file-parallelism
npx vitest --ui` },
      { type: "tip", body: "官方：common-errors · debugging · writing-tests-with-ai" },
      { type: "quiz", questions: [
        {
          id: "vitest-common-errors-0",
          question: "异步测试最常见失败原因？",
          options: ["字体", "未 await Promise / 断言", "CSS 颜色", "Git 分支名"],
          answer: 1,
          explain: "未正确等待异步。",
        },
      ] },
    ],
  },
  {
    slug: "vitest-browser-component",
    title: "Browser 组件测试深水",
    summary: "官网 component-testing：真浏览器组件、locators、框架 render。",
    level: "实战",
    track: "Vitest",
    minutes: 12,
    blocks: [
      { type: "text", title: "定位", body: "组件测夹在单元与 E2E 之间：快于整站 E2E，真于 jsdom。推荐 Browser Mode（Playwright provider）。" },
      { type: "text", title: "框架包", body: "vitest-browser-react / vue / svelte 等提供 render；配合 @vitest/browser/context 的 page.getByRole 与 expect.element。" },
      { type: "text", title: "与 RTL 关系", body: "理念接近用户视角；但跑在真浏览器，可测 CSS 布局、真实焦点与 pointer。" },
      { type: "code", title: "概念代码", lang: "tsx", code: `import { render } from 'vitest-browser-react'
import { page } from '@vitest/browser/context'
import { Counter } from './Counter'

test('increment', async () => {
  render(<Counter />)
  await page.getByRole('button', { name: '加' }).click()
  await expect.element(page.getByText('1')).toBeInTheDocument()
})` },
      { type: "tip", body: "官方：https://vitest.dev/guide/browser/component-testing.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-browser-component-0",
          question: "组件测推荐环境？",
          options: ["仅 Node 无 DOM", "Browser Mode 真浏览器", "只用 grep", "仅 Python"],
          answer: 1,
          explain: "真浏览器最准。",
        },
      ] },
    ],
  },
  {
    slug: "vitest-visual-aria",
    title: "视觉回归与 ARIA Snapshot",
    summary: "官网 visual-regression + aria-snapshots。",
    level: "实战",
    track: "Vitest",
    minutes: 11,
    blocks: [
      { type: "text", title: "视觉回归", body: "Browser Mode 可对组件/页面截图对比。注意：字体、动画、动态数据需稳定化；阈值阈值与更新流程要写进团队规范。" },
      { type: "text", title: "ARIA Snapshot", body: "序列化可访问树做快照，比像素稳：测结构/角色/名称，不绑 CSS 细节。适合 a11y 回归。" },
      { type: "code", title: "ARIA 概念", lang: "ts", code: `// Browser Mode 概念
await expect(page.getByRole('navigation')).toMatchAriaSnapshot(\`
  - navigation:
    - link "首页"
    - link "设置"
\`)` },
      { type: "tip", body: "官方：visual-regression-testing · aria-snapshots" },
      { type: "quiz", questions: [
        {
          id: "vitest-visual-aria-0",
          question: "ARIA snapshot 更关注？",
          options: ["像素颜色", "可访问树结构与名称", "网络带宽", "CPU 温度"],
          answer: 1,
          explain: "a11y 树。",
        },
      ] },
    ],
  },
  {
    slug: "vitest-mock-requests-fs",
    title: "Mock 请求与文件系统",
    summary: "官网 mocking/requests + file-system。",
    level: "实战",
    track: "Vitest",
    minutes: 9,
    blocks: [
      { type: "text", title: "请求", body: "vi.stubGlobal('fetch', ...) 或 mock 模块；复杂场景用 MSW 更接近真实。" },
      { type: "text", title: "文件系统", body: "vi.mock('node:fs') 或 memfs；勿对真实磁盘写测试垃圾。" },
      { type: "code", title: "fetch mock", lang: "ts", code: `vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ id: '1' }),
}))

// fs
vi.mock('node:fs', async (importOriginal) => {
  const fs = await importOriginal<typeof import('node:fs')>()
  return { ...fs, readFileSync: vi.fn(() => 'stub') }
})` },
      { type: "tip", body: "官方：mocking/requests · mocking/file-system" },
      { type: "quiz", questions: [
        {
          id: "vitest-mock-requests-fs-0",
          question: "复杂 HTTP 场景更推荐？",
          options: ["手写 20 个全局变量", "MSW 请求层 mock", "删除 fetch", "只用 alert"],
          answer: 1,
          explain: "MSW。",
        },
      ] },
    ],
  },
  {
    slug: "rtl-within-debug",
    title: "within / 调试查询",
    summary: "官网 within + debug + screen.debug。",
    level: "进阶",
    track: "Testing Library",
    minutes: 8,
    blocks: [
      { type: "text", title: "within", body: "在容器子树内查询，避免页面多处相同 role 冲突：within(dialog).getByRole('button', {name:'确认'})。" },
      { type: "text", title: "调试", body: "screen.debug() 打印 DOM；screen.logTestingPlaygroundURL() 辅助选查询；配置 testIdAttribute。" },
      { type: "code", title: "within", lang: "tsx", code: `import { render, screen, within } from '@testing-library/react'

render(<App />)
const dialog = screen.getByRole('dialog')
await user.click(within(dialog).getByRole('button', { name: '确认' }))` },
      { type: "tip", body: "官方：api-within · api-debugging" },
      { type: "quiz", questions: [
        {
          id: "rtl-within-debug-0",
          question: "多个相同按钮时？",
          options: ["用第一个 querySelector", "within(容器) 缩小范围", "随机点", "只用 testid 到处"],
          answer: 1,
          explain: "within 限定子树。",
        },
      ] },
    ],
  },
  {
    slug: "rtl-disappearance",
    title: "元素消失与 waitForElementToBeRemoved",
    summary: "官网 guide-disappearance。",
    level: "进阶",
    track: "Testing Library",
    minutes: 7,
    blocks: [
      { type: "text", title: "断言消失", body: "queryBy* 在断言「当前不存在」；等待移除用 waitForElementToBeRemoved 或 waitFor(() => expect(query).not.toBeInTheDocument())。" },
      { type: "text", title: "陷阱", body: "getBy* 在元素不存在时直接抛错，不能用来「等它消失」。" },
      { type: "code", title: "示例", lang: "ts", code: `import { waitForElementToBeRemoved, screen } from '@testing-library/react'

await user.click(screen.getByRole('button', { name: '关闭' }))
await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))` },
      { type: "tip", body: "官方：guide-disappearance" },
      { type: "quiz", questions: [
        {
          id: "rtl-disappearance-0",
          question: "等待元素移除用？",
          options: ["getByRole 循环", "waitForElementToBeRemoved / waitFor + query", "sleep(9999)", "location.reload"],
          answer: 1,
          explain: "专用移除等待。",
        },
      ] },
    ],
  },
  {
    slug: "rtl-custom-queries",
    title: "自定义 Queries 与配置",
    summary: "官网 custom-queries + configuration。",
    level: "实战",
    track: "Testing Library",
    minutes: 8,
    blocks: [
      { type: "text", title: "自定义", body: "团队可扩展 query 绑定设计系统（getByDesignId）。优先仍用 Role/Label；自定义是补充。" },
      { type: "text", title: "configure", body: "asyncUtilTimeout、defaultHidden、testIdAttribute 等全局默认。" },
      { type: "code", title: "configure", lang: "ts", code: `import { configure } from '@testing-library/react'
configure({ testIdAttribute: 'data-test' })` },
      { type: "tip", body: "官方：api-custom-queries · api-configuration" },
      { type: "quiz", questions: [
        {
          id: "rtl-custom-queries-0",
          question: "自定义 query 应？",
          options: ["取代所有 role", "作为语义查询不足时的补充", "禁止使用", "只用于 CSS"],
          answer: 1,
          explain: "补充而非替代。",
        },
      ] },
    ],
  },
  {
    slug: "rtl-accessibility-api",
    title: "Accessibility 查询与 a11y 工具",
    summary: "官网 api-accessibility 与 jest-dom a11y 匹配器。",
    level: "进阶",
    track: "Testing Library",
    minutes: 8,
    blocks: [
      { type: "text", title: "可访问查询", body: "getByRole 选项：name、hidden、selected、checked、pressed、level。" },
      { type: "text", title: "配套", body: "eslint-plugin-testing-library、jest-dom 的 toHaveAccessibleName / toHaveAccessibleDescription；E2E 再用 axe。" },
      { type: "code", title: "role 选项", lang: "ts", code: `screen.getByRole('heading', { level: 2, name: '账单' })
screen.getByRole('checkbox', { checked: true, name: '记住我' })` },
      { type: "tip", body: "官方：api-accessibility · ecosystem-jest-dom" },
      { type: "quiz", questions: [
        {
          id: "rtl-accessibility-api-0",
          question: "heading 指定级别用？",
          options: ["className", "{ level: n }", "Math.random", "xpath"],
          answer: 1,
          explain: "level 选项。",
        },
      ] },
    ],
  },
  {
    slug: "pw-codegen",
    title: "Codegen 录制测试",
    summary: "官网 codegen：用生成器快速得到定位器草稿。",
    level: "入门",
    track: "Playwright",
    minutes: 8,
    blocks: [
      { type: "text", title: "做什么", body: "npx playwright codegen URL 打开录制器，操作生成脚本。输出是起点，需人工改为稳健 getByRole、去掉冗余等待。" },
      { type: "text", title: "VS Code", body: "官方 Getting started with VS Code 可边录边跑。" },
      { type: "code", title: "命令", lang: "bash", code: `npx playwright codegen https://demo.playwright.dev/todomvc
npx playwright codegen --target=javascript
npx playwright codegen --viewport-size=390,844` },
      { type: "tip", body: "官方：https://playwright.dev/docs/codegen" },
      { type: "quiz", questions: [
        {
          id: "pw-codegen-0",
          question: "codegen 产物应？",
          options: ["原样永不改", "审阅并改为语义定位/删冗余", "当作生产密钥", "删除 package.json"],
          answer: 1,
          explain: "人工审阅必须。",
        },
      ] },
    ],
  },
  {
    slug: "pw-pom",
    title: "Page Object Model",
    summary: "官网 pom：封装页面操作与选择器。",
    level: "进阶",
    track: "Playwright",
    minutes: 10,
    blocks: [
      { type: "text", title: "动机", body: "大套件用 POM：选择器集中、操作复用、测试读起来像业务语言。每个重要页面/组件一块 API。" },
      { type: "text", title: "要点", body: "构造注入 Page；字段存 Locator；方法返回 void 或其它 Page Object；断言可在 POM 或测试中（团队统一）。" },
      { type: "code", title: "示例", lang: "ts", code: `import { type Page, type Locator, expect } from '@playwright/test'

export class TodoPage {
  readonly input: Locator
  readonly items: Locator
  constructor(private page: Page) {
    this.input = page.getByPlaceholder('What needs to be done?')
    this.items = page.getByTestId('todo-item')
  }
  async add(text: string) {
    await this.input.fill(text)
    await this.input.press('Enter')
  }
  async expectCount(n: number) {
    await expect(this.items).toHaveCount(n)
  }
}` },
      { type: "tip", body: "官方：https://playwright.dev/docs/pom" },
      { type: "quiz", questions: [
        {
          id: "pw-pom-0",
          question: "POM 主要收益？",
          options: ["加密流量", "集中选择器与可复用页面 API", "取消断言", "强制 sleep"],
          answer: 1,
          explain: "可维护性。",
        },
      ] },
    ],
  },
  {
    slug: "pw-actionability",
    title: "Actionability 自动等待检查",
    summary: "官网 actionability：click 前可见/稳定/可接收事件/启用。",
    level: "进阶",
    track: "Playwright",
    minutes: 9,
    blocks: [
      { type: "text", title: "自动检查", body: "locator.click 前：唯一匹配、Visible、Stable（动画结束）、Receives Events（未被遮挡）、Enabled。fill 还要求 Editable。" },
      { type: "text", title: "Force", body: "force: true 跳过部分检查——仅排查用，产品测试应修页面或定位。" },
      { type: "text", title: "启示", body: "少手写 waitForTimeout；让 actionability + web-first 断言工作。" },
      { type: "tip", body: "官方：https://playwright.dev/docs/actionability" },
      { type: "quiz", questions: [
        {
          id: "pw-actionability-0",
          question: "click 前不会检查？",
          options: ["Visible", "Stable", "Git commit 哈希", "Enabled"],
          answer: 2,
          explain: "与 DOM 可操作性相关。",
        },
      ] },
    ],
  },
  {
    slug: "pw-clock",
    title: "Clock 控制时间",
    summary: "官网 clock：setFixedTime / install / fastForward。",
    level: "实战",
    track: "Playwright",
    minutes: 9,
    blocks: [
      { type: "text", title: "用途", body: "测倒计时、营业时间、动画调度，无需真等。page.clock 覆盖 Date、timer、rAF 等。" },
      { type: "text", title: "推荐", body: "优先 setFixedTime；需要暂停/快进再用 install（且须在其它 clock 调用前）。" },
      { type: "code", title: "示例", lang: "ts", code: `test('offer expires', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-01-01T10:00:00'))
  await page.goto('/offer')
  await page.clock.fastForward('30:00')
  await expect(page.getByText('已过期')).toBeVisible()
})` },
      { type: "tip", body: "官方：https://playwright.dev/docs/clock" },
      { type: "quiz", questions: [
        {
          id: "pw-clock-0",
          question: "控制时间首选？",
          options: ["sleep 真实半小时", "page.clock.setFixedTime / install", "改系统 BIOS", "忽略断言"],
          answer: 1,
          explain: "Clock API。",
        },
      ] },
    ],
  },
  {
    slug: "pw-parallel-shard",
    title: "并行、分片与重试",
    summary: "官网 parallel + sharding + retries。",
    level: "实战",
    track: "Playwright",
    minutes: 11,
    blocks: [
      { type: "text", title: "并行", body: "默认文件级并行；workers 配置。测试必须独立。" },
      { type: "text", title: "分片", body: "CI 多机：--shard=1/4 … 完整覆盖。配合 blob reporter 合并报告。" },
      { type: "text", title: "重试", body: "retries 仅掩盖偶发？应先修 flaky。可用于收集 trace 再失败。" },
      { type: "code", title: "CI", lang: "bash", code: `npx playwright test --shard=$SHARD_INDEX/$SHARD_TOTAL
npx playwright test --retries=2
# playwright.config.ts: workers: process.env.CI ? 2 : undefined` },
      { type: "tip", body: "官方：test-parallel · test-sharding · test-retries" },
      { type: "quiz", questions: [
        {
          id: "pw-parallel-shard-0",
          question: "shard 的作用？",
          options: ["加密截图", "把全量测试拆到多机并行", "删除失败", "只跑 skipped"],
          answer: 1,
          explain: "水平扩展 CI。",
        },
      ] },
    ],
  },
  {
    slug: "pw-dialogs-downloads",
    title: "对话框与下载",
    summary: "官网 dialogs + downloads。",
    level: "进阶",
    track: "Playwright",
    minutes: 8,
    blocks: [
      { type: "text", title: "Dialog", body: "page.on('dialog') 或 page.waitForEvent('dialog') 处理 alert/confirm/prompt；需先监听再触发。" },
      { type: "text", title: "Download", body: "建议等 download 事件再 assert path；用 suggestedFilename。" },
      { type: "code", title: "示例", lang: "ts", code: `page.once('dialog', async (dialog) => {
  expect(dialog.message()).toContain('删除')
  await dialog.accept()
})
await page.getByRole('button', { name: '删除' }).click()

const [ download ] = await Promise.all([
  page.waitForEvent('download'),
  page.getByRole('button', { name: '导出' }).click(),
])
await download.saveAs('out.csv')` },
      { type: "tip", body: "官方：dialogs · downloads" },
      { type: "quiz", questions: [
        {
          id: "pw-dialogs-downloads-0",
          question: "处理 dialog 要点？",
          options: ["先点后监听即可", "先注册监听再触发", "忽略", "只用 CSS"],
          answer: 1,
          explain: "先监听。",
        },
      ] },
    ],
  },
  {
    slug: "pw-frames-context",
    title: "Frame 与 BrowserContext",
    summary: "官网 frames + browser-contexts。",
    level: "进阶",
    track: "Playwright",
    minutes: 8,
    blocks: [
      { type: "text", title: "Frame", body: "iframe 用 frameLocator / frame。主 page 定位器进不去子 frame。" },
      { type: "text", title: "Context", body: "独立 cookie/storage 的会话；多用户并行互不污染。storageState 按 context 加载。" },
      { type: "code", title: "frameLocator", lang: "ts", code: `const frame = page.frameLocator('#stripe-frame')
await frame.getByLabel('Card').fill('4242')

const context = await browser.newContext({ storageState: 'admin.json' })
const page = await context.newPage()` },
      { type: "tip", body: "官方：frames · browser-contexts" },
      { type: "quiz", questions: [
        {
          id: "pw-frames-context-0",
          question: "iframe 内元素应？",
          options: ["page.getBy 直接盲点", "frameLocator/frame 进入", "忽略 iframe", "只截图"],
          answer: 1,
          explain: "进入 frame。",
        },
      ] },
    ],
  },
  {
    slug: "pw-parameterize-webserver",
    title: "参数化与 webServer",
    summary: "官网 test-parameterize + test-webserver。",
    level: "实战",
    track: "Playwright",
    minutes: 9,
    blocks: [
      { type: "text", title: "参数化", body: "for 循环 / test.describe 数据表生成多例；或项目级 projects 多浏览器。" },
      { type: "text", title: "webServer", body: "config.webServer 在测前拉起 dev/preview，url 就绪再跑，CI 本地一致。" },
      { type: "code", title: "webServer", lang: "ts", code: `export default defineConfig({
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
})` },
      { type: "tip", body: "官方：test-parameterize · test-webserver" },
      { type: "quiz", questions: [
        {
          id: "pw-parameterize-webserver-0",
          question: "webServer 用途？",
          options: ["发邮件", "测试前自动启动被测应用", "编译内核", "替代 git"],
          answer: 1,
          explain: "启动应用。",
        },
      ] },
    ],
  },
  {
    slug: "pw-emulation-media",
    title: "设备模拟、截图与视频",
    summary: "官网 emulation + screenshots + videos。",
    level: "进阶",
    track: "Playwright",
    minutes: 9,
    blocks: [
      { type: "text", title: "模拟", body: "devices['iPhone 13']、locale、timezoneId、colorScheme、geolocation、permissions。" },
      { type: "text", title: "截图", body: "page.screenshot / locator.screenshot；全页 fullPage。" },
      { type: "text", title: "视频", body: "use.video: 'on' | 'retain-on-failure'；失败保留最实用。" },
      { type: "code", title: "设备", lang: "ts", code: `import { devices } from '@playwright/test'
export default defineConfig({
  projects: [{
    name: 'Mobile Safari',
    use: { ...devices['iPhone 13'] },
  }],
  use: { video: 'retain-on-failure', screenshot: 'only-on-failure' },
})` },
      { type: "tip", body: "官方：emulation · screenshots · videos" },
      { type: "quiz", questions: [
        {
          id: "pw-emulation-media-0",
          question: "CI 视频策略常见？",
          options: ["永远全开占满磁盘", "retain-on-failure", "禁止任何证据", "只录音频"],
          answer: 1,
          explain: "失败保留。",
        },
      ] },
    ],
  },
  {
    slug: "pw-a11y-axe",
    title: "无障碍测试（axe）",
    summary: "官网 accessibility-testing。",
    level: "实战",
    track: "Playwright",
    minutes: 9,
    blocks: [
      { type: "text", title: "做法", body: "@axe-core/playwright 扫描页面，断言无严重违规。与 getByRole 策略互补：一个防回归违规，一个日常定位。" },
      { type: "text", title: "范围", body: "关键页/关键流扫；动态路由切换后重新 scan。" },
      { type: "code", title: "概念", lang: "ts", code: `import AxeBuilder from '@axe-core/playwright'

const results = await new AxeBuilder({ page }).analyze()
expect(results.violations).toEqual([])` },
      { type: "tip", body: "官方：https://playwright.dev/docs/accessibility-testing" },
      { type: "quiz", questions: [
        {
          id: "pw-a11y-axe-0",
          question: "axe 主要发现？",
          options: ["TypeScript 类型错误", "a11y 规则违规", "CSS 压缩率", "npm 漏洞 CVE 列表（专门）"],
          answer: 1,
          explain: "无障碍违规。",
        },
      ] },
    ],
  },
  {
    slug: "pw-aria-snapshots",
    title: "Playwright ARIA Snapshots",
    summary: "官网 aria-snapshots：可访问树快照断言。",
    level: "实战",
    track: "Playwright",
    minutes: 8,
    blocks: [
      { type: "text", title: "是什么", body: "toMatchAriaSnapshot 锁定角色树，抗 CSS 重构、敏于 a11y 倒退。" },
      { type: "text", title: "更新", body: "变更需 Review，像视觉基线一样管理。" },
      { type: "code", title: "示例", lang: "ts", code: `await expect(page.getByRole('navigation')).toMatchAriaSnapshot(\`
  - navigation:
    - link "Docs"
    - link "API"
\`)` },
      { type: "tip", body: "官方：https://playwright.dev/docs/aria-snapshots" },
      { type: "quiz", questions: [
        {
          id: "pw-aria-snapshots-0",
          question: "ARIA snapshot 怕的是？",
          options: ["换主题色", "可访问结构/名称被改坏", "换 CDN", "改 README 错别字"],
          answer: 1,
          explain: "结构与名称。",
        },
      ] },
    ],
  },
  {
    slug: "puppeteer-screenshots-pdf",
    title: "截图、PDF 与页面评估",
    summary: "pptr 经典能力：screenshot、pdf、$eval。",
    level: "进阶",
    track: "Puppeteer",
    minutes: 8,
    blocks: [
      { type: "text", title: "渲染管线", body: "page.screenshot({ fullPage, type })；page.pdf 仅 Chromium 路径可靠。page.$eval / evaluate 在页面沙箱取数。" },
      { type: "text", title: "等待", body: "waitForSelector / waitForFunction；新协议 BiDi 能力持续演进。" },
      { type: "code", title: "示例", lang: "ts", code: `const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('https://example.com', { waitUntil: 'networkidle2' })
await page.screenshot({ path: 'x.png', fullPage: true })
const title = await page.$eval('h1', (el) => el.textContent)
await page.pdf({ path: 'x.pdf', format: 'A4' })
await browser.close()` },
      { type: "tip", body: "官方：https://pptr.dev/guides/getting-started" },
      { type: "quiz", questions: [
        {
          id: "puppeteer-screenshots-pdf-0",
          question: "pdf() 更成熟于？",
          options: ["任意浏览器一律相同", "Chromium 路径", "仅 Safari", "仅 IE"],
          answer: 1,
          explain: "Chromium。",
        },
      ] },
    ],
  },
  {
    slug: "defuddle-cli-options",
    title: "Defuddle CLI 与标准化",
    summary: "README：CLI 选项、frontmatter、元数据、标准化。",
    level: "进阶",
    track: "高级工具",
    minutes: 9,
    blocks: [
      { type: "text", title: "CLI 全集", body: "parse 文件/URL/stdin；--markdown --json --frontmatter --property --debug --lang --user-agent --output。403 可换 UA。" },
      { type: "text", title: "标准化", body: "标题层级、代码块语言、脚注、MathJax→MathML、GitHub/Obsidian callout 统一。比 Readability 更宽容、元数据更全。" },
      { type: "text", title: "测试场景", body: "对合规正文断言；侧栏广告变化不进快照。" },
      { type: "code", title: "CLI", lang: "bash", code: `npx defuddle parse https://example.com/a --markdown --json
npx defuddle parse page.html --frontmatter -o out.md
npx defuddle parse https://example.com/a --user-agent "Mozilla/5.0 ..."
curl -L URL | npx defuddle parse --markdown` },
      { type: "tip", body: "官方：https://github.com/kepano/defuddle" },
      { type: "quiz", questions: [
        {
          id: "defuddle-cli-options-0",
          question: "--frontmatter 作用？",
          options: ["删除内容", "前置 YAML 元数据", "开启 headless", "编译 Rust"],
          answer: 1,
          explain: "YAML 头。",
        },
      ] },
    ],
  },
  {
    slug: "camoufox-geoip-proxy",
    title: "GeoIP、代理与时区对齐",
    summary: "官网 python/geoip：geoip=True 对齐经纬度/时区/locale/WebRTC。",
    level: "实战",
    track: "高级工具",
    minutes: 10,
    blocks: [
      { type: "text", title: "问题", body: "代理出口 IP 在纽约，但浏览器时区还是东京 → 风控直接标异常。" },
      { type: "text", title: "做法", body: "geoip=True 或传入目标 IP，自动设 longitude/latitude/timezone/locale 并伪装 WebRTC IP。必须与代理一致。" },
      { type: "text", title: "伦理", body: "只测自有/授权系统。" },
      { type: "code", title: "概念", lang: "python", code: `from camoufox.sync_api import Camoufox

with Camoufox(
    headless=True,
    geoip=True,
    proxy={"server": "http://proxy.example:8080"},
) as browser:
    page = browser.new_page()
    page.goto("https://your-staging.example/geo-check")` },
      { type: "tip", body: "官方：https://camoufox.com/python/geoip.md" },
      { type: "quiz", questions: [
        {
          id: "camoufox-geoip-proxy-0",
          question: "geoip 主要解决？",
          options: ["CSS 布局", "IP/时区/locale/WebRTC 一致性", "单元覆盖率", "npm 安装速度"],
          answer: 1,
          explain: "地理信号一致。",
        },
      ] },
    ],
  },
  {
    slug: "camoufox-fingerprint-matrix",
    title: "指纹矩阵：WebGL/字体/媒体/语音",
    summary: "官网 fingerprint/* 能力清单迁移。",
    level: "实战",
    track: "高级工具",
    minutes: 12,
    blocks: [
      { type: "text", title: "C++ 注入清单", body: "Navigator、Screen、Window、Document、WebGL（参数/扩展/shader）、Fonts、Geolocation & Intl、HTTP Headers、WebRTC ICE/SDP、Media 设备数、Speech voices、Addons、人机光标轨迹。" },
      { type: "text", title: "一致性", body: "BrowserForge 分布采样，避免 Windows UA + 苹果 GPU 等矛盾组合。" },
      { type: "text", title: "光标", body: "Human-like 轨迹 C++ 重写，距离感知，比简单 JS 贝塞尔更难识别。" },
      { type: "code", title: "对照", lang: "txt", code: `检测点          普通自动化        Camoufox
webdriver        true             实现层处理
WebGL vendor     软件渲染特征      类真机画像
字体枚举         容器默认集        可注入列表
WebRTC           漏真实 IP         协议层改写
鼠标             瞬移点击          类人轨迹` },
      { type: "tip", body: "官方：https://camoufox.com/fingerprint/index.md · features.md" },
      { type: "quiz", questions: [
        {
          id: "camoufox-fingerprint-matrix-0",
          question: "Camoufox 强调的注入层？",
          options: ["仅 document.write", "C++ 实现层", "只改 favicon", "Service Worker 仅"],
          answer: 1,
          explain: "C++。",
        },
      ] },
    ],
  },
  {
    slug: "camoufox-virtual-mainworld",
    title: "虚拟显示、Main World、Remote",
    summary: "官网 virtual-display、main-world-eval、remote-server。",
    level: "实战",
    track: "高级工具",
    minutes: 9,
    blocks: [
      { type: "text", title: "Virtual Display", body: "无界面环境建议用虚拟显示缓冲跑「有头」路径，降低未来 headless 指纹风险。" },
      { type: "text", title: "Main World", body: "默认 JS 在隔离世界执行，页面不可见；需要与页面同世界时用官方 main-world 能力（谨慎）。" },
      { type: "text", title: "Remote Server", body: "实验性；依赖未文档化 Playwright 方法，生产慎用。" },
      { type: "tip", body: "官方：python/virtual-display · main-world-eval · remote-server" },
      { type: "quiz", questions: [
        {
          id: "camoufox-virtual-mainworld-0",
          question: "默认 JS 执行世界？",
          options: ["一定与页面同世界可被探测", "隔离世界（isolated）", "只在服务端", "无 JS"],
          answer: 1,
          explain: "隔离更安全。",
        },
      ] },
    ],
  },
  {
    slug: "camoufox-usage-sync-async",
    title: "Camoufox Sync/Async 与参数",
    summary: "官网 usage：Sync/Async API、browser 版本、与 Playwright 参数兼容。",
    level: "进阶",
    track: "高级工具",
    minutes: 10,
    blocks: [
      { type: "text", title: "初始化", body: "from camoufox.sync_api import Camoufox / async_api.AsyncCamoufox。接受 Playwright Firefox launch 选项 + Camoufox 扩展参数。" },
      { type: "text", title: "版本", body: "camoufox set official/stable && camoufox fetch；launch 时 browser= 覆盖单次版本。" },
      { type: "text", title: "迁移成本", body: "原 Playwright 页面操作基本不动，只换 browser 启动。" },
      { type: "code", title: "Sync", lang: "python", code: `from camoufox.sync_api import Camoufox

with Camoufox() as browser:
    page = browser.new_page()
    page.goto("https://example.com")

# async
# from camoufox.async_api import AsyncCamoufox
# async with AsyncCamoufox() as browser:
#     page = await browser.new_page()` },
      { type: "tip", body: "官方：https://camoufox.com/python/usage.md" },
      { type: "quiz", questions: [
        {
          id: "camoufox-usage-sync-async-0",
          question: "迁移既有 Playwright 脚本？",
          options: ["重写全部断言", "通常只改 browser 初始化", "不能迁移", "必须改成 Selenium"],
          answer: 1,
          explain: "改启动即可。",
        },
      ] },
    ],
  },
  {
    slug: "pw-component-testing",
    title: "Playwright 组件测试（实验）",
    summary: "官网 test-components：在 PW 中测组件。",
    level: "实战",
    track: "Playwright",
    minutes: 8,
    blocks: [
      { type: "text", title: "定位", body: "Playwright 提供组件测试实验能力；与 Vitest Browser Mode 组件测目标类似，选型看栈。" },
      { type: "text", title: "原则", body: "仍用用户可见角色定位；隔离依赖；真浏览器事件。" },
      { type: "tip", body: "官方：https://playwright.dev/docs/test-components" },
      { type: "quiz", questions: [
        {
          id: "pw-component-testing-0",
          question: "组件测与 E2E 比？",
          options: ["更慢更整站", "更小更快、隔离组件", "无法点按钮", "没有断言"],
          answer: 1,
          explain: "隔离更快。",
        },
      ] },
    ],
  },
  {
    slug: "vitest-test-context",
    title: "Test Context 与 expect 局部",
    summary: "官网 test-context：concurrent 下正确绑定 expect。",
    level: "进阶",
    track: "Vitest",
    minutes: 7,
    blocks: [
      { type: "text", title: "问题", body: "并发测试若用全局 expect，快照会串号。" },
      { type: "text", title: "做法", body: "使用 test 回调参数 context 的 expect / 注解；官方对 concurrent + snapshot 特别警告。" },
      { type: "code", title: "示例", lang: "ts", code: `import { test, expect } from 'vitest'

test.concurrent('a', async ({ expect }) => {
  expect(1).toMatchInlineSnapshot('1')
})` },
      { type: "tip", body: "官方：https://vitest.dev/guide/test-context.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-test-context-0",
          question: "concurrent 快照要用？",
          options: ["随意全局 expect", "context 里的 expect", "禁用所有断言", "只用 assert"],
          answer: 1,
          explain: "局部 expect。",
        },
      ] },
    ],
  },
  {
    slug: "vitest-environment",
    title: "Test Environment 详解",
    summary: "官网 environment：node / jsdom / happy-dom / 自定义。",
    level: "进阶",
    track: "Vitest",
    minutes: 8,
    blocks: [
      { type: "text", title: "选择", body: "纯逻辑 → node；需要 DOM 但不测布局 → jsdom/happy-dom；要布局/真实事件 → Browser Mode。" },
      { type: "text", title: "每文件覆盖", body: "文档顶部 // @vitest-environment jsdom" },
      { type: "code", title: "注释", lang: "ts", code: `// @vitest-environment jsdom
import { window } from '...'` },
      { type: "tip", body: "官方：https://vitest.dev/guide/environment.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-environment-0",
          question: "要测真实 CSS 布局？",
          options: ["node environment 足够", "Browser Mode", "只靠字符串匹配 HTML", "禁用 DOM"],
          answer: 1,
          explain: "真浏览器。",
        },
      ] },
    ],
  },
];
