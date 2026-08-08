export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
};

export type DemoKind =
  | "pyramid"
  | "aaa"
  | "vitest-expect"
  | "vitest-mock"
  | "rtl-query"
  | "rtl-user"
  | "playwright-locator"
  | "playwright-assert"
  | "puppeteer-nav"
  | "defuddle-extract"
  | "camoufox-stealth"
  | "coverage"
  | "flaky"
  | "ci-pipeline";

export type LessonBlock =
  | { type: "text"; title?: string; body: string }
  | { type: "code"; title?: string; lang?: string; code: string }
  | { type: "tip"; body: string }
  | { type: "demo"; kind: DemoKind; title: string; hint?: string }
  | { type: "quiz"; questions: QuizQuestion[] };

export type Track =
  | "基础概念"
  | "Vitest"
  | "Testing Library"
  | "Playwright"
  | "Puppeteer"
  | "高级工具"
  | "工程化";

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  level: "入门" | "进阶" | "实战";
  track: Track;
  minutes: number;
  blocks: LessonBlock[];
};

export const TRACKS: Track[] = [
  "基础概念",
  "Vitest",
  "Testing Library",
  "Playwright",
  "Puppeteer",
  "高级工具",
  "工程化",
];

export const LESSONS: Lesson[] = [
  {
    slug: "why-test",
    title: "为什么要写测试",
    summary: "测试的价值、成本与何时值得投入。",
    level: "入门",
    track: "基础概念",
    minutes: 6,
    blocks: [
      {
        type: "text",
        title: "测试不是形式主义",
        body: "测试的核心价值是：用可重复的检查，把「代码行为」固定下来。重构时不怕改坏；上线前尽早发现回归；新人接手时有可运行的文档。\n\n但测试也有成本：编写、维护、CI 时间。好的策略是：关键路径必须有测试，纯展示 UI 可以少写，业务规则与边界条件优先。",
      },
      {
        type: "code",
        title: "没有测试时的风险",
        lang: "ts",
        code: `// 改了一行，线上炸了——没人知道
function discount(price: number, vip: boolean) {
  return vip ? price * 0.8 : price
  // 某次 refactor 写成了 price * 0.8 对所有人生效
}`,
      },
      {
        type: "tip",
        body: "把测试当「可执行规格」：描述期望行为，而不是实现细节。实现可以变，规格应稳定。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "w1",
            question: "测试最主要的长期价值是？",
            options: [
              "让覆盖率数字好看",
              "固定行为、支撑重构与回归",
              "完全替代 Code Review",
              "让 CI 变慢显得专业",
            ],
            answer: 1,
            explain: "可重复检查行为，降低改坏与回归成本。",
          },
          {
            id: "w2",
            question: "何时可以少写测试？",
            options: [
              "纯展示、几乎无逻辑的 UI",
              "支付与权限逻辑",
              "核心业务规则",
              "数据转换边界条件",
            ],
            answer: 0,
            explain: "无逻辑展示层性价比低；关键业务必须测。",
          },
        ],
      },
    ],
  },
  {
    slug: "test-pyramid",
    title: "测试金字塔",
    summary: "单元 / 集成 / E2E 的配比与选择。",
    level: "入门",
    track: "基础概念",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "三层怎么分",
        body: "单元测试：函数、纯逻辑，快、多、定位准。\n集成测试：模块协作（组件+状态、API client）。\nE2E：真实浏览器路径（登录→下单），少而精。\n\n经典金字塔：底部单元最多，顶部 E2E 最少。反模式是「冰淇淋甜筒」——全靠慢脆 E2E。",
      },
      {
        type: "demo",
        kind: "pyramid",
        title: "动手：金字塔配比",
        hint: "拖动滑块，看速度与信心如何权衡",
      },
      {
        type: "code",
        title: "同一需求的三种测法",
        lang: "ts",
        code: `// 单元：纯函数
expect(calcTax(100, 0.1)).toBe(10)

// 组件集成：RTL
render(<Cart />)
await user.click(screen.getByRole('button', { name: '加购' }))

// E2E：Playwright
await page.getByRole('button', { name: '结算' }).click()
await expect(page.getByText('订单已创建')).toBeVisible()`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "p1",
            question: "金字塔底部应该是？",
            options: ["E2E", "单元测试", "手工点点点", "截图测试"],
            answer: 1,
            explain: "单元快、多、定位准。",
          },
          {
            id: "p2",
            question: "E2E 适合验证？",
            options: [
              "每个私有函数",
              "关键用户主路径",
              "所有 CSS 像素",
              "第三方 SDK 内部",
            ],
            answer: 1,
            explain: "少而精，覆盖主路径即可。",
          },
        ],
      },
    ],
  },
  {
    slug: "aaa-pattern",
    title: "AAA 模式",
    summary: "Arrange · Act · Assert 写清晰用例。",
    level: "入门",
    track: "基础概念",
    minutes: 7,
    blocks: [
      {
        type: "text",
        title: "结构即可读性",
        body: "Arrange：准备数据与环境。\nAct：执行被测行为（一次为主）。\nAssert：验证结果。\n\n一个 it 只验证一件事；避免「一个用例里 assert 七八个无关点」。",
      },
      {
        type: "demo",
        kind: "aaa",
        title: "动手：拆分 AAA",
      },
      {
        type: "code",
        title: "标准 AAA 示例",
        lang: "ts",
        code: `it('VIP 打八折', () => {
  // Arrange
  const price = 100
  const vip = true

  // Act
  const result = discount(price, vip)

  // Assert
  expect(result).toBe(80)
})`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "a1",
            question: "Act 阶段应该？",
            options: [
              "准备很多 mock",
              "执行被测行为",
              "只写 expect",
              "启动整个数据库",
            ],
            answer: 1,
            explain: "Act = 触发行为。",
          },
          {
            id: "a2",
            question: "一个 it 里最好？",
            options: [
              "测完一个模块所有分支",
              "聚焦一个行为/结果",
              "复制粘贴 20 个 expect",
              "不写 assert 看日志",
            ],
            answer: 1,
            explain: "单一意图，失败时好定位。",
          },
        ],
      },
    ],
  },
  {
    slug: "first-principles",
    title: "好测试的原则",
    summary: "独立、可重复、快速、有意义的失败信息。",
    level: "入门",
    track: "基础概念",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "FIRST 与实用准则",
        body: "Fast：快，才愿意常跑。\nIndependent：不依赖执行顺序与共享可变状态。\nRepeatable：同一结果可复现。\nSelf-validating：自动 pass/fail。\nTimely：与代码同步写（或 TDD）。\n\n额外：失败信息要说清「期望 vs 实际」；不要测试实现细节（如内部 state 字段名）。",
      },
      {
        type: "code",
        title: "脆弱 vs 稳健",
        lang: "ts",
        code: `// 脆弱：绑死 class 名
expect(container.querySelector('.btn-primary-v2')).toBeTruthy()

// 稳健：用户可见语义
expect(screen.getByRole('button', { name: '提交' })).toBeEnabled()`,
      },
      {
        type: "tip",
        body: "测「用户能感知的行为」，少测「组件私有 state 结构」。重构 UI 实现时测试不应成片红。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "f1",
            question: "测试之间共享可变全局状态会？",
            options: [
              "更快",
              "导致顺序依赖与 flaky",
              "提高覆盖率",
              "替代 mock",
            ],
            answer: 1,
            explain: "破坏独立性，难复现。",
          },
          {
            id: "f2",
            question: "更推荐的断言目标？",
            options: [
              "私有方法是否被调用 N 次",
              "用户可见的文案与交互结果",
              "具体 CSS 文件哈希",
              "内部变量名",
            ],
            answer: 1,
            explain: "行为优先于实现。",
          },
        ],
      },
    ],
  },
  {
    slug: "vitest-intro",
    title: "Vitest 入门",
    summary: "与 Vite 同构的现代测试运行器。",
    level: "入门",
    track: "Vitest",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "为什么是 Vitest",
        body: "Vitest 与 Vite 共享配置与转换管线，ESM 友好，API 兼容 Jest 风格（describe/it/expect），watch 模式极快。前端 monorepo 与 Vite 项目首选。",
      },
      {
        type: "code",
        title: "安装与最小配置",
        lang: "bash",
        code: `npm i -D vitest
# package.json
"scripts": { "test": "vitest", "test:run": "vitest run" }`,
      },
      {
        type: "code",
        title: "第一个测试",
        lang: "ts",
        code: `import { describe, it, expect } from 'vitest'
import { sum } from './sum'

describe('sum', () => {
  it('adds numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })
})`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "v1",
            question: "Vitest 与 Vite 的关系？",
            options: [
              "完全无关",
              "共享配置与转换，开发体验一致",
              "只能测 Vue",
              "必须用 Jest 作为底层",
            ],
            answer: 1,
            explain: "同构工具链是核心卖点。",
          },
          {
            id: "v2",
            question: "CI 里通常用？",
            options: ["vitest（watch）", "vitest run", "vitest ui 人工点", "无头浏览器"],
            answer: 1,
            explain: "run 模式跑完即退，适合 CI。",
          },
        ],
      },
    ],
  },
  {
    slug: "vitest-expect",
    title: "断言与匹配器",
    summary: "toBe、toEqual、toMatchObject 等常用 API。",
    level: "入门",
    track: "Vitest",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "选对匹配器",
        body: "toBe：引用相等（原始值常用）。\ntoEqual：深比较。\ntoMatchObject：对象子集。\ntoThrow：异常。\ntoBeCloseTo：浮点。\n异步：await expect(p).resolves / rejects。",
      },
      {
        type: "demo",
        kind: "vitest-expect",
        title: "动手：选对 expect",
      },
      {
        type: "code",
        title: "常用断言",
        lang: "ts",
        code: `expect(1 + 1).toBe(2)
expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 })
expect({ a: 1, b: 2 }).toMatchObject({ a: 1 })
expect([1, 2, 3]).toContain(2)
expect(() => parse()).toThrow(/invalid/i)
await expect(fetchUser(1)).resolves.toHaveProperty('id', 1)`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "e1",
            question: "比较两个对象内容用？",
            options: ["toBe", "toEqual", "toBeTruthy", "toBeNull"],
            answer: 1,
            explain: "toEqual 深比较。",
          },
          {
            id: "e2",
            question: "只检查对象部分字段？",
            options: ["toBe", "toStrictEqual", "toMatchObject", "toContain"],
            answer: 2,
            explain: "toMatchObject 子集匹配。",
          },
        ],
      },
    ],
  },
  {
    slug: "vitest-mock",
    title: "Mock 与 Spy",
    summary: "vi.fn、vi.spyOn、vi.mock 隔离依赖。",
    level: "进阶",
    track: "Vitest",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "何时 mock",
        body: "网络、时间、随机数、第三方 SDK——不可控依赖用 mock。\n单元测业务规则时，mock 掉 I/O。\n集成/E2E 则尽量少 mock，或只 mock 外部边界。",
      },
      {
        type: "demo",
        kind: "vitest-mock",
        title: "动手：mock 调用次数",
      },
      {
        type: "code",
        title: "vi.fn 与模块 mock",
        lang: "ts",
        code: `import { vi, expect, it } from 'vitest'
import * as api from './api'
import { loadProfile } from './profile'

it('calls api once', async () => {
  const spy = vi.spyOn(api, 'getUser').mockResolvedValue({ id: 1 })
  await loadProfile(1)
  expect(spy).toHaveBeenCalledWith(1)
  expect(spy).toHaveBeenCalledTimes(1)
  spy.mockRestore()
})

// 整模块
vi.mock('./api', () => ({
  getUser: vi.fn().mockResolvedValue({ id: 1 }),
}))`,
      },
      {
        type: "tip",
        body: "mock 过度会测到「自己写的假实现」。优先测真实协作；mock 只挡真正的外部边界。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "m1",
            question: "vi.fn() 用来？",
            options: [
              "启动浏览器",
              "创建可追踪的假函数",
              "编译 TypeScript",
              "生成覆盖率报告",
            ],
            answer: 1,
            explain: "可断言调用次数与参数。",
          },
          {
            id: "m2",
            question: "mock 的合理边界？",
            options: [
              "每个内部函数都 mock",
              "外部 I/O / 不稳定依赖",
              "永远不 mock",
              "只 mock 字符串",
            ],
            answer: 1,
            explain: "隔离不可控外部依赖。",
          },
        ],
      },
    ],
  },
  {
    slug: "vitest-async",
    title: "异步与定时器",
    summary: "async/await、fake timers、waitFor。",
    level: "进阶",
    track: "Vitest",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "异步测试要点",
        body: "永远 await 异步 Act。\n不要用固定 sleep 等结果（慢且 flaky）。\n时间相关逻辑用 vi.useFakeTimers() + advanceTimers。\n组件侧可用 waitFor / findBy*。",
      },
      {
        type: "code",
        title: "Fake timers",
        lang: "ts",
        code: `import { vi, it, expect, beforeEach, afterEach } from 'vitest'

beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

it('debounces', () => {
  const fn = vi.fn()
  const d = debounce(fn, 300)
  d()
  d()
  vi.advanceTimersByTime(300)
  expect(fn).toHaveBeenCalledTimes(1)
})`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "as1",
            question: "等待异步结果应优先？",
            options: [
              "setTimeout 固定 2 秒",
              "await + 正确的异步断言/查询",
              "while(true) 轮询",
              "忽略 Promise",
            ],
            answer: 1,
            explain: "明确等待条件，避免固定 sleep。",
          },
          {
            id: "as2",
            question: "vi.useFakeTimers 的用途？",
            options: [
              "加速真实网络",
              "控制 setTimeout/setInterval 时间",
              "替换浏览器",
              "加密",
            ],
            answer: 1,
            explain: "确定性推进时间。",
          },
        ],
      },
    ],
  },
  {
    slug: "vitest-coverage",
    title: "覆盖率怎么读",
    summary: "行/分支覆盖率的意义与陷阱。",
    level: "进阶",
    track: "Vitest",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "数字不是目标",
        body: "覆盖率告诉你「哪些代码没被执行」，不告诉你「行为是否正确」。\n100% 仍可能全是废话断言。\n关注：关键路径分支、错误处理、边界值。\nCI 可设合理阈值（如 70–80%），别为了数字写空测试。",
      },
      {
        type: "demo",
        kind: "coverage",
        title: "动手：解读覆盖报告",
      },
      {
        type: "code",
        title: "开启覆盖率",
        lang: "bash",
        code: `npm i -D @vitest/coverage-v8
npx vitest run --coverage`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "c1",
            question: "高覆盖率意味着？",
            options: [
              "零 bug",
              "更多代码被执行到，不保证断言有意义",
              "E2E 已完备",
              "可以不上线 Review",
            ],
            answer: 1,
            explain: "覆盖 ≠ 正确。",
          },
        ],
      },
    ],
  },
  {
    slug: "rtl-intro",
    title: "Testing Library 理念",
    summary: "按用户使用方式查询与交互。",
    level: "入门",
    track: "Testing Library",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "Guiding principle",
        body: "The more your tests resemble the way your software is used, the more confidence they can give you.\n\n优先：getByRole / getByLabelText / getByText。\n慎用：getByTestId（最后手段）。\n避免：依赖 CSS 选择器与组件内部 state。",
      },
      {
        type: "code",
        title: "React Testing Library 最小例",
        lang: "tsx",
        code: `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Counter } from './Counter'

it('increments', async () => {
  const user = userEvent.setup()
  render(<Counter />)
  await user.click(screen.getByRole('button', { name: /加/i }))
  expect(screen.getByText('1')).toBeInTheDocument()
})`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "r1",
            question: "RTL 更推荐的查询？",
            options: [
              "document.querySelector('.x')",
              "getByRole / getByLabelText",
              "仅 getByTestId",
              "enzyme shallow",
            ],
            answer: 1,
            explain: "贴近可访问性与用户视角。",
          },
        ],
      },
    ],
  },
  {
    slug: "rtl-queries",
    title: "查询优先级",
    summary: "get/find/query 与 ByRole 家族。",
    level: "入门",
    track: "Testing Library",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "三类查询",
        body: "get*：同步，找不到就抛错。\nquery*：同步，找不到返回 null（适合断言不存在）。\nfind*：异步，等待出现（返回 Promise）。\n\n*All* 变体返回数组。",
      },
      {
        type: "demo",
        kind: "rtl-query",
        title: "动手：选对查询",
      },
      {
        type: "code",
        title: "查询对照",
        lang: "ts",
        code: `// 必须存在
screen.getByRole('heading', { name: '标题' })

// 断言不存在
expect(screen.queryByText('错误')).not.toBeInTheDocument()

// 等待异步出现
await screen.findByText('加载完成')`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "q1",
            question: "断言某元素不存在用？",
            options: ["getByText", "queryByText", "findByText", "getAllByText"],
            answer: 1,
            explain: "query 返回 null 而不抛。",
          },
          {
            id: "q2",
            question: "等待接口返回后的文案？",
            options: ["getBy", "queryBy", "findBy", "only testid"],
            answer: 2,
            explain: "find* 自带等待。",
          },
        ],
      },
    ],
  },
  {
    slug: "rtl-user-event",
    title: "user-event 交互",
    summary: "点击、输入、键盘——更接近真实用户。",
    level: "进阶",
    track: "Testing Library",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "user-event vs fireEvent",
        body: "user-event 模拟完整事件序列（pointer、focus、input…），更真实。\nfireEvent 是底层派发，写起来短但可能漏路径。\n新项目优先 userEvent.setup()。",
      },
      {
        type: "demo",
        kind: "rtl-user",
        title: "动手：模拟表单",
      },
      {
        type: "code",
        title: "输入与提交",
        lang: "tsx",
        code: `const user = userEvent.setup()
render(<LoginForm onSubmit={fn} />)
await user.type(screen.getByLabelText('邮箱'), 'a@b.com')
await user.type(screen.getByLabelText('密码'), 'secret12')
await user.click(screen.getByRole('button', { name: '登录' }))
expect(fn).toHaveBeenCalled()`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "u1",
            question: "推荐的用户交互方式？",
            options: [
              "直接改 props",
              "userEvent.setup()",
              "只 snapshot",
              "手动 innerHTML",
            ],
            answer: 1,
            explain: "贴近真实交互。",
          },
        ],
      },
    ],
  },
  {
    slug: "rtl-async",
    title: "异步 UI 与 waitFor",
    summary: "加载态、请求后更新、act 警告处理。",
    level: "进阶",
    track: "Testing Library",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "异步渲染",
        body: "数据请求后 UI 更新：用 findBy 或 waitFor。\nmock fetch / MSW 控制网络。\n出现 act(...) 警告通常是：状态更新未包在已 await 的交互或 waitFor 里。",
      },
      {
        type: "code",
        title: "MSW 或 mock fetch",
        lang: "ts",
        code: `vi.spyOn(global, 'fetch').mockResolvedValue(
  new Response(JSON.stringify({ name: 'Ada' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  }),
)
render(<Profile id="1" />)
expect(await screen.findByText('Ada')).toBeInTheDocument()`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ra1",
            question: "等待异步文案出现优先？",
            options: ["sleep(3000)", "findByText", "getByText 立刻", "忽略"],
            answer: 1,
            explain: "findBy 内置重试等待。",
          },
        ],
      },
    ],
  },
  {
    slug: "pw-intro",
    title: "Playwright 入门",
    summary: "现代 E2E：多浏览器、自动等待、强断言。",
    level: "入门",
    track: "Playwright",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "为何选 Playwright",
        body: "Microsoft 维护；Chromium / Firefox / WebKit；自动等待；trace / 视频 / 截图调试强大；API 测试与组件实验性支持。\n适合主路径 E2E 与跨浏览器回归。",
      },
      {
        type: "code",
        title: "初始化",
        lang: "bash",
        code: `npm init playwright@latest
npx playwright test
npx playwright show-report`,
      },
      {
        type: "code",
        title: "第一个 E2E",
        lang: "ts",
        code: `import { test, expect } from '@playwright/test'

test('homepage has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Learning Testing/)
  await page.getByRole('link', { name: '课程' }).click()
})`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pw1",
            question: "Playwright 内置自动？",
            options: ["部署", "等待可交互/可见", "写业务代码", "设计 UI"],
            answer: 1,
            explain: "actionability 自动等待是核心能力。",
          },
        ],
      },
    ],
  },
  {
    slug: "pw-locators",
    title: "Locator 策略",
    summary: "getByRole 优先，避免脆弱 CSS。",
    level: "入门",
    track: "Playwright",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "定位优先级",
        body: "1. getByRole（可访问名）\n2. getByLabel / getByPlaceholder / getByText\n3. getByTestId\n4. CSS/XPath 最后\n\nLocator 惰性且可重试，配合 auto-wait。",
      },
      {
        type: "demo",
        kind: "playwright-locator",
        title: "动手：选定位器",
      },
      {
        type: "code",
        title: "稳健定位",
        lang: "ts",
        code: `await page.getByRole('button', { name: '提交' }).click()
await page.getByLabel('邮箱').fill('a@b.com')
await page.getByTestId('nav-settings').click() // 必要时`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "l1",
            question: "最推荐的定位？",
            options: [
              "page.locator('div > span:nth-child(3)')",
              "getByRole + name",
              "绝对 XPath",
              "坐标点击",
            ],
            answer: 1,
            explain: "语义化、抗重构。",
          },
        ],
      },
    ],
  },
  {
    slug: "pw-assertions",
    title: "Web-First 断言",
    summary: "expect(locator).toBeVisible 等自动重试断言。",
    level: "进阶",
    track: "Playwright",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "Web-first assertions",
        body: "Playwright 的 expect(locator)... 会自动重试直到超时，适配异步 UI。\n不要先取 textContent 再 toBe——会丢重试。",
      },
      {
        type: "demo",
        kind: "playwright-assert",
        title: "动手：正确断言写法",
      },
      {
        type: "code",
        title: "对 vs 错",
        lang: "ts",
        code: `// 好：自动重试
await expect(page.getByText('成功')).toBeVisible()

// 差：一次性取值，易 flaky
const t = await page.locator('.msg').textContent()
expect(t).toBe('成功')`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pa1",
            question: "web-first 断言的优势？",
            options: [
              "更快失败",
              "自动重试直到条件满足",
              "不需要 await",
              "只能测 API",
            ],
            answer: 1,
            explain: "适配异步 DOM 更新。",
          },
        ],
      },
    ],
  },
  {
    slug: "pw-network",
    title: "网络拦截与 Fixture",
    summary: "route、storageState、项目配置。",
    level: "进阶",
    track: "Playwright",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "控制边界",
        body: "page.route 可 mock API、模拟慢网/失败。\nstorageState 复用登录态，避免每测都走登录。\nproject 配置多浏览器与不同 baseURL。",
      },
      {
        type: "code",
        title: "Mock API",
        lang: "ts",
        code: `await page.route('**/api/user', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ name: 'Ada' }),
  })
})
await page.goto('/profile')
await expect(page.getByText('Ada')).toBeVisible()`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "n1",
            question: "storageState 常用于？",
            options: [
              "存截图",
              "复用登录会话",
              "压缩 JS",
              "生成覆盖率",
            ],
            answer: 1,
            explain: "跳过重复登录，加速 E2E。",
          },
        ],
      },
    ],
  },
  {
    slug: "pw-debug",
    title: "调试 Trace 与 UI Mode",
    summary: "失败可回放：trace、headed、codegen。",
    level: "实战",
    track: "Playwright",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "失败时可观测",
        body: "npx playwright test --debug\nUI Mode 逐步看动作。\ntrace: 'on-first-retry' 在 CI 重试时留证据。\ncodegen 录制定位器草稿，再人工改稳健。",
      },
      {
        type: "code",
        title: "常用调试命令",
        lang: "bash",
        code: `npx playwright test --ui
npx playwright test --debug
npx playwright show-trace trace.zip
npx playwright codegen http://localhost:8080`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "d1",
            question: "trace 的价值？",
            options: [
              "美化报告封面",
              "回放步骤、网络与 DOM 快照",
              "替代单元测试",
              "自动修 bug",
            ],
            answer: 1,
            explain: "失败现场可复盘。",
          },
        ],
      },
    ],
  },
  {
    slug: "puppeteer-intro",
    title: "Puppeteer 基础",
    summary: "Chrome DevTools Protocol 控制浏览器。",
    level: "入门",
    track: "Puppeteer",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "Puppeteer 定位",
        body: "Google 的无头 Chrome 自动化库。强项：截图、PDF、爬虫脚本、DevTools 级控制。\nE2E 产品测试现在更常选 Playwright（多浏览器、断言、并行）。\n了解 Puppeteer 有助于读懂大量存量脚本与 SSR 截图管线。",
      },
      {
        type: "demo",
        kind: "puppeteer-nav",
        title: "动手：导航与截图流程",
      },
      {
        type: "code",
        title: "最小脚本",
        lang: "ts",
        code: `import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.goto('https://example.com', { waitUntil: 'networkidle2' })
await page.screenshot({ path: 'example.png' })
await browser.close()`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pp1",
            question: "Puppeteer 主要驱动？",
            options: ["仅 Firefox", "Chrome/Chromium (CDP)", "仅 Safari", "JVM"],
            answer: 1,
            explain: "基于 CDP 控制 Chromium。",
          },
        ],
      },
    ],
  },
  {
    slug: "puppeteer-vs-pw",
    title: "Puppeteer vs Playwright",
    summary: "选型对照：场景、生态、API。",
    level: "进阶",
    track: "Puppeteer",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "怎么选",
        body: "选 Playwright：产品 E2E、多浏览器、测试报告与 fixture。\n选 Puppeteer：Chrome 专用脚本、与现有 CDP 工具链集成、轻量爬取。\nAPI 相似：page.goto / click / type；Playwright 的 locator + web-first assert 更测试友好。",
      },
      {
        type: "code",
        title: "对照",
        lang: "ts",
        code: `// Puppeteer
await page.click('#submit')
const text = await page.$eval('.msg', (el) => el.textContent)

// Playwright
await page.getByRole('button', { name: '提交' }).click()
await expect(page.getByText('成功')).toBeVisible()`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pv1",
            question: "多浏览器产品 E2E 更倾向？",
            options: ["仅 Puppeteer", "Playwright", "仅 curl", "仅单元测试"],
            answer: 1,
            explain: "Playwright 原生多引擎 + 测试工具链。",
          },
        ],
      },
    ],
  },
  {
    slug: "defuddle",
    title: "Defuddle 内容提取",
    summary: "从杂乱 HTML 抽取可读正文，服务测试与数据管线。",
    level: "进阶",
    track: "高级工具",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "Defuddle 是什么",
        body: "Defuddle 一类「可读性提取」工具：去掉导航、广告、页脚，保留文章正文与结构。\n在测试中可用于：快照正文稳定性、监控关键文案、对比渲染内容；在自动化中用于清洗爬取结果。\n与「完整 DOM 断言」互补——关注语义内容而非布局噪声。",
      },
      {
        type: "demo",
        kind: "defuddle-extract",
        title: "动手：提取正文",
      },
      {
        type: "code",
        title: "概念用法",
        lang: "ts",
        code: `import { defuddle } from 'defuddle' // 包名以实际为准

const html = await page.content()
const { title, content } = await defuddle(html)
expect(title).toMatch(/季度报告/)
expect(content).toContain('营收增长 12%')
// 不关心侧边栏广告节点是否变动`,
      },
      {
        type: "tip",
        body: "内容提取测试适合「文案/合规关键句」；视觉布局请用截图对比或专用视觉回归工具。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "df1",
            question: "Defuddle 类工具擅长？",
            options: [
              "替换 Playwright",
              "从 HTML 提取可读正文",
              "编译 TypeScript",
              "管理 npm 私服",
            ],
            answer: 1,
            explain: "清洗噪声，保留内容。",
          },
        ],
      },
    ],
  },
  {
    slug: "camoufox",
    title: "Camoufox 反检测浏览器",
    summary: "指纹伪装与自动化隐身场景（合法用途）。",
    level: "实战",
    track: "高级工具",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "Camoufox 是什么",
        body: "Camoufox 是侧重「反自动化检测」的 Firefox 定制方案：降低 webdriver 指纹、统一/伪装 navigator、字体、WebGL 等信号。\n合法用途：测试你自己的风控/反爬是否误伤真实用户；研究检测逻辑；公开数据合规采集。\n禁止：绕过他人服务条款的滥用、未授权攻击。",
      },
      {
        type: "demo",
        kind: "camoufox-stealth",
        title: "动手：指纹信号对照",
      },
      {
        type: "code",
        title: "概念启动",
        lang: "ts",
        code: `// 概念示例：以项目文档 API 为准
import { Camoufox } from 'camoufox'

const browser = await Camoufox.launch({
  headless: true,
  // humanize, geoip, block_images 等选项见文档
})
const page = await browser.newPage()
await page.goto('https://your-app.example/bot-check')
// 断言你的站点对「类真人」自动化的策略
await browser.close()`,
      },
      {
        type: "tip",
        body: "自动化检测与隐私是双刃剑：在课程与工作中只用于防御性测试与授权场景。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cf1",
            question: "Camoufox 主要解决？",
            options: [
              "单元测试速度",
              "降低自动化浏览器被检测的指纹特征",
              "CSS 覆盖率",
              "TypeScript 类型生成",
            ],
            answer: 1,
            explain: "反检测/指纹伪装向的浏览器方案。",
          },
          {
            id: "cf2",
            question: "合理用途包括？",
            options: [
              "未授权撞库",
              "测试自有风控与合规采集",
              "窃取账号",
              "绕过支付",
            ],
            answer: 1,
            explain: "仅限合法、授权场景。",
          },
        ],
      },
    ],
  },
  {
    slug: "stealth-ethics",
    title: "自动化伦理与边界",
    summary: "robots、授权、速率与数据合规。",
    level: "进阶",
    track: "高级工具",
    minutes: 7,
    blocks: [
      {
        type: "text",
        title: "红线",
        body: "遵守服务条款与 robots.txt 精神；控制并发与频率；不采集敏感个人信息；密钥不进仓库。\n测试环境用 mock/stage，别拿生产当沙箱打满。\n反检测技术用于「验证防御」，不是「做坏事的加速器」。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "et1",
            question: "对生产站点无授权高频爬取？",
            options: ["最佳实践", "通常违规且不道德", "能提高覆盖率", "等于 E2E"],
            answer: 1,
            explain: "需授权与合规。",
          },
        ],
      },
    ],
  },
  {
    slug: "flaky-tests",
    title: "消灭 Flaky",
    summary: "偶发失败的根因与治理。",
    level: "实战",
    track: "工程化",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "常见根因",
        body: "固定 sleep、竞态、共享状态、依赖真实时间/网络、动画未等完、顺序依赖。\n治理：隔离数据、web-first 断言、重试要克制（先修再 retry）、quarantine 列表、记录 trace。",
      },
      {
        type: "demo",
        kind: "flaky",
        title: "动手：找出 flaky 写法",
      },
      {
        type: "code",
        title: "从 sleep 到条件等待",
        lang: "ts",
        code: `// flaky
await page.waitForTimeout(3000)

// 稳健
await expect(page.getByRole('status')).toHaveText('已保存')`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "fl1",
            question: "治理 flaky 的首选？",
            options: [
              "无限加大 timeout",
              "修根因 + 条件等待",
              "关闭失败用例",
              "只在本地跑",
            ],
            answer: 1,
            explain: "修根因，而非掩盖。",
          },
        ],
      },
    ],
  },
  {
    slug: "ci-testing",
    title: "CI 中的测试",
    summary: "GitHub Actions、并行、缓存、分片。",
    level: "实战",
    track: "工程化",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "流水线设计",
        body: "PR：lint + typecheck + unit（必跑）。\nE2E：可分片并行；用 preview URL 或 ephemeral env。\n缓存 node_modules / playwright browsers。\n失败上传 artifact（报告、trace）。",
      },
      {
        type: "demo",
        kind: "ci-pipeline",
        title: "动手：流水线阶段",
      },
      {
        type: "code",
        title: "简化 GitHub Actions",
        lang: "yaml",
        code: `jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run test:run
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ci1",
            question: "E2E 失败时建议？",
            options: [
              "不留证据",
              "上传 trace/报告 artifact",
              "删掉用例",
              "只看绿灯",
            ],
            answer: 1,
            explain: "可观测才能修。",
          },
        ],
      },
    ],
  },
  {
    slug: "test-strategy",
    title: "团队测试策略",
    summary: "谁写测、何时写、Definition of Done。",
    level: "实战",
    track: "工程化",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "落地建议",
        body: "新功能：关键路径至少有单测或组件测 + 一条 E2E（若用户可见主流程）。\nBugfix：先补失败测试再修（回归锁）。\nCode Review 看测试是否描述行为。\nDoD：类型检查通过、相关测试绿、无新增 flaky。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ts1",
            question: "修 bug 的推荐顺序？",
            options: [
              "先改代码再口头保证",
              "先写/补失败测试再修",
              "只加 console.log",
              "提高覆盖率阈值了事",
            ],
            answer: 1,
            explain: "回归锁，防止再犯。",
          },
        ],
      },
    ],
  },
  {
    slug: "interview-testing",
    title: "测试面试串讲",
    summary: "高频问答：金字塔、mock、E2E、flaky。",
    level: "实战",
    track: "工程化",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "能讲清楚的点",
        body: "1) 金字塔与冰淇淋反模式\n2) 测行为不测实现\n3) mock 边界\n4) Playwright 自动等待\n5) flaky 根因\n6) 覆盖率误区\n7) CI 分片与 artifact\n\n用你真实项目里的例子（哪怕本站工坊任务）会更有说服力。",
      },
      {
        type: "code",
        title: "一分钟电梯稿",
        lang: "txt",
        code: `我按金字塔组织测试：业务纯函数用 Vitest 单测；
组件用 Testing Library 从用户视角交互；
主路径用 Playwright E2E，少而稳。
Mock 只挡网络等外部边界。
CI 上 unit 必跑，E2E 并行分片，失败上传 trace。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "iv1",
            question: "面试中描述测试策略时应强调？",
            options: [
              "工具 logo 多少",
              "分层目标、边界与可维护性",
              "只谈 100% 覆盖",
              "从不用 E2E",
            ],
            answer: 1,
            explain: "讲清楚为什么这样分层。",
          },
        ],
      },
    ],
  },
];

export function getLesson(slug: string) {
  return LESSONS.find((l) => l.slug === slug);
}

export function getLessonIndex(slug: string) {
  return LESSONS.findIndex((l) => l.slug === slug);
}

export function getAdjacent(slug: string) {
  const i = getLessonIndex(slug);
  return {
    prev: i > 0 ? LESSONS[i - 1] : null,
    next: i >= 0 && i < LESSONS.length - 1 ? LESSONS[i + 1] : null,
  };
}

export function getLessonsByTrack(track: Track) {
  return LESSONS.filter((l) => l.track === track);
}

export function getAllQuizQuestions() {
  const out: (QuizQuestion & {
    lessonSlug: string;
    lessonTitle: string;
  })[] = [];
  for (const lesson of LESSONS) {
    for (const block of lesson.blocks) {
      if (block.type === "quiz") {
        for (const q of block.questions) {
          out.push({
            ...q,
            lessonSlug: lesson.slug,
            lessonTitle: lesson.title,
          });
        }
      }
    }
  }
  return out;
}
