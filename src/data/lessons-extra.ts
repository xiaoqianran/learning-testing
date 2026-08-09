import type { Lesson } from "./lessons-types";

/** v2 扩展课：对齐 Vitest/Playwright/RTL/Defuddle/Camoufox 官方文档深度 */
export const EXTRA_LESSONS: Lesson[] = [
  {
    slug: "vitest-config",
    title: "Vitest 配置与 CLI",
    summary: "defineConfig、environment、pool、CLI 过滤与 UI。",
    level: "进阶",
    track: "Vitest",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `官方推荐 vitest.config.ts，与 Vite 共享 resolve/alias/插件。常用：environment（node / jsdom / happy-dom）、setupFiles、globals、coverage、testTimeout。

CLI：vitest（watch）、vitest run（CI）、vitest related、vitest --ui、按文件名/ -t 名过滤。

权威索引：https://vitest.dev/llms.txt

为什么这一节重要：defineConfig、environment、pool、CLI 过滤与 UI。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Vitest 配置与 CLI」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "补充要点 1",
        body: `Config 全量字段见官方 Config Reference；llms-full.txt 含每项说明。别把一切塞进 globals：显式 import { describe, it, expect } 更利于可读与类型。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Vitest 配置与 CLI」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「vitest-config」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Vitest 配置与 CLI？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
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
        title: "示例代码 2",
        lang: "tsx",
        code: `npx vitest                 # watch
npx vitest run             # CI
npx vitest run src/foo.test.ts
npx vitest -t "VIP 折扣"   # 按名称
npx vitest --ui
npx vitest related src/a.ts`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "vitest-config-947d-1",
            question: "关于「Vitest 配置与 CLI」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "vitest-config-947d-2",
            question: "学习「Vitest 配置与 CLI」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "vitest-config-947d-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `setupFiles：每个测试文件前加载（扩展 expect、polyfill）。
globalSetup：进程级（启停测试 DB）。
beforeEach/afterEach：用例间隔离 mock 与 DOM。
beforeAll/afterAll：昂贵一次性资源。

官方强调 clearMocks / restoreMocks 配置可自动清理 vi.fn。

为什么这一节重要：beforeEach、afterEach、setupFiles、globalSetup。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Setup / Hooks / 生命周期」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Setup / Hooks / 生命周期」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「vitest-setup-hooks」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Setup / Hooks / 生命周期？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
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
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Setup / Hooks / 生命周期
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "vitest-setup-hooks-4281-1",
            question: "关于「Setup / Hooks / 生命周期」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "vitest-setup-hooks-4281-2",
            question: "学习「Setup / Hooks / 生命周期」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "vitest-setup-hooks-4281-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `适合：序列化输出、错误消息、大对象结构、ARIA 树。
不适合：经常变的时间戳、随机 ID（先规范化）。

首次运行生成快照文件并提交；变更时 -u 更新并 Code Review。并发 async 测试要用 test context 的 expect。

官方：https://vitest.dev/guide/snapshot.html

为什么这一节重要：toMatchSnapshot、inline、更新策略与评审。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Snapshot 测试」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "补充要点 1",
        body: `Snapshot 是回归锁，不是「免写断言」。Review 时逐 diff 看是否预期。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Snapshot 测试」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「vitest-snapshot」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Snapshot 测试？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
        code: `import { expect, it } from 'vitest'

it('formats user', () => {
  expect(formatUser(user)).toMatchSnapshot()
})

it('inline', () => {
  expect(sum(1, 2)).toMatchInlineSnapshot('3')
})`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Snapshot 测试
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "vitest-snapshot-6390-1",
            question: "关于「Snapshot 测试」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "vitest-snapshot-6390-2",
            question: "学习「Snapshot 测试」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "vitest-snapshot-6390-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
        title: "概念深讲",
        body: `jsdom 不完整模拟布局/真实事件。Vitest Browser Mode 在真浏览器跑测试：window/document 原生，可用 Playwright 或 WebdriverIO provider。

安装：npx vitest init browser
CI 推荐 playwright provider（可并行）；preview 仅本地预览。

还能：组件测试、视觉回归、ARIA snapshots、Trace。
文档：https://vitest.dev/guide/browser/

为什么这一节重要：provider Playwright/WebdriverIO、组件测、视觉回归。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Browser Mode 真浏览器」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Browser Mode 真浏览器」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「vitest-browser-mode」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Browser Mode 真浏览器？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
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
        title: "示例代码 2",
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
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "vitest-browser-mode-fe15-1",
            question: "关于「Browser Mode 真浏览器」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "vitest-browser-mode-fe15-2",
            question: "学习「Browser Mode 真浏览器」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "vitest-browser-mode-fe15-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `projects 可把 unit / browser / node 拆成多配置并行（不同 environment、include）。适合 monorepo 与「一部分 jsdom、一部分 browser」。

类型测试：expectTypeOf / assertType 在类型层断言，不运行时执行业务。见官方 Testing Types。

为什么这一节重要：多项目配置、expectTypeOf / assertType。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Projects 与类型测试」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Projects 与类型测试」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「vitest-projects-types」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Projects 与类型测试？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
        code: `import { expectTypeOf, test } from 'vitest'

test('id is string', () => {
  expectTypeOf(getUser().id).toEqualTypeOf<string>()
})`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Projects 与类型测试
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "vitest-projects-types-65fc-1",
            question: "关于「Projects 与类型测试」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "vitest-projects-types-65fc-2",
            question: "学习「Projects 与类型测试」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "vitest-projects-types-65fc-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `Vitest 文档拆成：Functions、Modules、Timers、Dates、Globals、Classes、File System、Requests。
原则：只 mock 边界；测完 restore；prefer vi.spyOn 可还原。

Requests：可 mock fetch，或结合 MSW。
FS：memfs / vi.mock('node:fs')。
Dates：vi.setSystemTime。

为什么这一节重要：对齐官方 mocking 分册：dates、modules、requests、fs。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Mock 矩阵：日期/模块/请求/FS」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Mock 矩阵：日期/模块/请求/FS」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「vitest-mocking-matrix」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Mock 矩阵：日期/模块/请求/FS？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
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
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Mock 矩阵：日期/模块/请求/FS
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "vitest-mocking-matrix-6344-1",
            question: "关于「Mock 矩阵：日期/模块/请求/FS」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "vitest-mocking-matrix-6344-2",
            question: "学习「Mock 矩阵：日期/模块/请求/FS」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "vitest-mocking-matrix-6344-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `1. getByRole（可访问名 / name 选项）
2. getByLabelText（表单）
3. getByPlaceholderText
4. getByText
5. getByDisplayValue
6. getByAltText
7. getByTitle
8. getByTestId（最后手段）

语义化查询 = 更好 a11y + 更抗重构。

为什么这一节重要：官方推荐顺序：Role → Label → Placeholder → Text → DisplayValue → Alt → Title → TestId。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Which Query 完整优先级」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Which Query 完整优先级」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「rtl-which-query」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Which Query 完整优先级？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
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
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Which Query 完整优先级
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rtl-which-query-de01-1",
            question: "关于「Which Query 完整优先级」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "rtl-which-query-de01-2",
            question: "学习「Which Query 完整优先级」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "rtl-which-query-de01-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `getByRole 依赖可访问树。按钮要有可访问名（文本或 aria-label）。heading 可用 { level: 1 }。

扩展：@testing-library/jest-dom 的 toBeInTheDocument、toBeVisible、toHaveAccessibleName 等。
测 a11y 不是额外工作——它就是更好的选择器。

为什么这一节重要：name、hidden、level、jest-dom 匹配器。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「可访问性与 Role」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「可访问性与 Role」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「rtl-a11y」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是可访问性与 Role？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
        code: `expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('设置')
expect(screen.getByRole('button', { name: '保存' })).toBeEnabled()`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：可访问性与 Role
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rtl-a11y-6969-1",
            question: "关于「可访问性与 Role」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "rtl-a11y-6969-2",
            question: "学习「可访问性与 Role」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "rtl-a11y-6969-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `React：@testing-library/react 的 render / screen。
Vue：@testing-library/vue。
核心仍是 DOM Testing Library。

网络：MSW（Mock Service Worker）在请求层 mock，组件测与部分 E2E 可复用 handler。

为什么这一节重要：React/Vue 包装差异；MSW 拦网络。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「多框架与 MSW」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「多框架与 MSW」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「rtl-frameworks」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是多框架与 MSW？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
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
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：多框架与 MSW
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rtl-frameworks-e5a0-1",
            question: "关于「多框架与 MSW」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "rtl-frameworks-e5a0-2",
            question: "学习「多框架与 MSW」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "rtl-frameworks-e5a0-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `Playwright Test 用 fixture 注入 page、context、browser、request。
test.extend 可封装登录用户、API client、临时数据，并声明 scope（test/worker）。

官方：https://playwright.dev/docs/test-fixtures

为什么这一节重要：内置 page/context；自定义 fixture 与作用域。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Fixtures 与 test.extend」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Fixtures 与 test.extend」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「pw-fixtures」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Fixtures 与 test.extend？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
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
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Fixtures 与 test.extend
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pw-fixtures-06d7-1",
            question: "关于「Fixtures 与 test.extend」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "pw-fixtures-06d7-2",
            question: "学习「Fixtures 与 test.extend」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "pw-fixtures-06d7-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `官方 Authentication 指南：setup 项目登录 → 保存 storageState → 依赖项目复用。
或 API 登录拿 cookie 写入 context。
敏感环境用独立测试账号。

为什么这一节重要：global setup 登录一次，多测复用 cookie。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「登录态与 storageState」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「登录态与 storageState」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「pw-auth」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是登录态与 storageState？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
        code: `// setup
await page.goto('/login')
await page.getByLabel('Email').fill(process.env.USER!)
await page.getByLabel('Password').fill(process.env.PASS!)
await page.getByRole('button', { name: 'Sign in' }).click()
await page.context().storageState({ path: 'playwright/.auth/user.json' })

// playwright.config.ts
// projects: [{ name: 'setup', testMatch: /.*\\\\.setup\\\\.ts/ },
//   { name: 'chromium', dependencies: ['setup'], use: { storageState: '...' } }]`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：登录态与 storageState
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pw-auth-1cec-1",
            question: "关于「登录态与 storageState」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "pw-auth-1cec-2",
            question: "学习「登录态与 storageState」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "pw-auth-1cec-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `API testing：APIRequestContext（request fixture）发 HTTP，可与 UI 混合（先 API 造数再 UI 验证）。
视觉：expect(page).toHaveScreenshot() / locator 截图；注意字体、动画、动态数据需屏蔽。

文档：api-testing、test-snapshots。

为什么这一节重要：request fixture；toHaveScreenshot。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「API 测试与视觉对比」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「API 测试与视觉对比」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「pw-api-visual」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是API 测试与视觉对比？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
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
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：API 测试与视觉对比
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pw-api-visual-766c-1",
            question: "关于「API 测试与视觉对比」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "pw-api-visual-766c-2",
            question: "学习「API 测试与视觉对比」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "pw-api-visual-766c-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `Playwright Test Agents（1.56+）：
- planner：探索应用 → Markdown 测试计划
- generator：计划 → 测试代码
- healer：跑测并尝试修复失败

npx playwright init-agents --loop=vscode

Playwright MCP：通过 Model Context Protocol 让 LLM 用可访问性快照操作浏览器（非纯截图 vision）。

文档：/docs/test-agents 、/docs/getting-started-mcp

为什么这一节重要：planner / generator / healer；Playwright MCP。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Test Agents 与 MCP」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "补充要点 1",
        body: `Agent 生成的代码仍需人审：定位器是否稳健、是否测到实现细节、敏感操作是否安全。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Test Agents 与 MCP」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「pw-agents-mcp」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Test Agents 与 MCP？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
        code: `npx playwright init-agents --loop=vscode
# 或 claude / other loops 见官方`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Test Agents 与 MCP
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pw-agents-mcp-d19d-1",
            question: "关于「Test Agents 与 MCP」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "pw-agents-mcp-d19d-2",
            question: "学习「Test Agents 与 MCP」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "pw-agents-mcp-d19d-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `1. 测试独立，可任意顺序并行
2. 用 web-first 断言
3. 优先用户可见定位
4. 少用 page.waitForTimeout
5. 软断言 toPass 谨慎
6. 调试靠 trace 不是加 sleep

完整列表：https://playwright.dev/docs/best-practices

为什么这一节重要：官方 best-practices：隔离、定位、断言、测试独立性。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Playwright 最佳实践」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Playwright 最佳实践」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「pw-best-practices」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Playwright 最佳实践？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "示例",
        lang: "tsx",
        code: `// Playwright 最佳实践
// slug: pw-best-practices
console.log('demo: pw-best-practices')`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Playwright 最佳实践
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pw-best-practices-7d79-1",
            question: "关于「Playwright 最佳实践」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "pw-best-practices-7d79-2",
            question: "学习「Playwright 最佳实践」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "pw-best-practices-7d79-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `Puppeteer 可通过 CDP 或 WebDriver BiDi 控制 Chrome/Firefox。
WebMCP（实验）：页面注册 tools，自动化/LLM 可 page.webmcp.tools() 发现并用 execute 调用——站点主动暴露能力，而非盲目点 DOM。

文档：https://pptr.dev/guides/webmcp

为什么这一节重要：WebDriver BiDi；实验性 WebMCP 工具发现与调用。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「BiDi 与 WebMCP」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「BiDi 与 WebMCP」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「puppeteer-bidi-webmcp」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是BiDi 与 WebMCP？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
        code: `// 页面侧（站点）注册 tool；Puppeteer 侧：
const tools = await page.webmcp.tools()
// 监听 toolsadded / toolsremoved
// tool.execute(args)`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：BiDi 与 WebMCP
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "puppeteer-bidi-webmcp-0114-1",
            question: "关于「BiDi 与 WebMCP」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "puppeteer-bidi-webmcp-0114-2",
            question: "学习「BiDi 与 WebMCP」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "puppeteer-bidi-webmcp-0114-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `Defuddle = 去掉杂乱，提取主内容（HTML 或 Markdown）。源自 Obsidian Web Clipper，可替代 Mozilla Readability：更宽容、脚注/数学/代码块更一致、元数据更全（schema.org）。

Browser：new Defuddle(document).parse()
Node：Defuddle(document, url, { markdown: true })（需 linkedom/jsdom）
CLI：npx defuddle parse URL --markdown --json

为什么这一节重要：Browser / Node / CLI；Markdown 与元数据。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Defuddle 官方 API」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "补充要点 1",
        body: `在测试中：对「正文合规句」断言用提取结果，避免侧栏广告 DOM 抖动导致 flaky。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Defuddle 官方 API」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「defuddle-api」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Defuddle 官方 API？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
        code: `import Defuddle from 'defuddle'

const defuddle = new Defuddle(document)
const result = defuddle.parse()
// result.content, title, author, description, published, ...`,
      },
      {
        type: "code",
        title: "示例代码 2",
        lang: "tsx",
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
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "defuddle-api-9896-1",
            question: "关于「Defuddle 官方 API」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "defuddle-api-9896-2",
            question: "学习「Defuddle 官方 API」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "defuddle-api-9896-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
        title: "概念深讲",
        body: `Camoufox 提供 https://camoufox.com/llms.txt —— 含 Stealth、Features、Python Interface、Fingerprint 分章。

Python 包包装 Playwright：改启动方式即可复用既有 page 代码。指纹在 C++ 层注入（非页面 JS 补丁），含 navigator、WebGL、字体、WebRTC IP、人机鼠标轨迹等。

仅限伦理与授权场景（见 legal.md）。

为什么这一节重要：官方库：指纹注入、GeoIP、与 Playwright 代码兼容。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Camoufox Python + Playwright」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Camoufox Python + Playwright」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「camoufox-python」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Camoufox Python + Playwright？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
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
        title: "示例代码 2",
        lang: "tsx",
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
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "camoufox-python-ea56-1",
            question: "关于「Camoufox Python + Playwright」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "camoufox-python-ea56-2",
            question: "学习「Camoufox Python + Playwright」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "camoufox-python-ea56-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `llms.txt（https://llmstxt.org/）：站点根路径的 Markdown 索引，告诉模型「该读哪些权威页」。
llms-full.txt：尽量全文拼接，适合一次性灌入。

已发现：
- Vitest：/llms.txt + /llms-full.txt
- Vite：/llms.txt + /llms-full.txt
- Camoufox：/llms.txt
- Playwright / Testing Library / Puppeteer：暂无根路径 llms.txt → 用文档 URL + MCP/Agents

本站：/llms.txt 与 /llms-full.txt，以及「官方文档」页汇总链接。

为什么这一节重要：如何用官方 llms.txt 喂给 AI；本站也提供索引。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「llms.txt 与测试文档」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「llms.txt 与测试文档」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「llms-txt-for-testers」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是llms.txt 与测试文档？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "tsx",
        code: `1. @https://vitest.dev/llms.txt 了解目录
2. 需要细节时再拉具体 /guide/*.md 或 llms-full 片段
3. Playwright 用官方 Test Agents / MCP 代替臆造 API
4. 生成测试后仍跑 vitest/playwright 验证`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：llms.txt 与测试文档
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "llms-txt-for-testers-bf1a-1",
            question: "关于「llms.txt 与测试文档」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "llms-txt-for-testers-bf1a-2",
            question: "学习「llms.txt 与测试文档」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "llms-txt-for-testers-bf1a-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
];
