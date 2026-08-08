import type { Lesson, LessonBlock } from "./lessons-types";

export type DeepLesson = {
  objectives: string[];
  pitfalls: string[];
  takeaway?: string;
  official?: string;
  minutes?: number;
  blocks: LessonBlock[];
};

/** 讲明白版：问题 → 讲解 → 示例 → 易错点 → 学会标准 → 测验 */
export const DEEP_BY_SLUG: Record<string, DeepLesson> = {
  "why-test": {
    objectives: ["能用自己的话解释「为什么要写测试」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["为测而测","一层打天下","失败信息无法读"],
    takeaway: "先锁高风险（钱、权限、主路径），用最快的测试层表达；低风险展示类可以克制。",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「为什么要写测试」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "【痛点】\n很多人把测试当成 KPI 或形式主义，结果写了一堆既慢又脆、还不敢删的用例。\n\n【为什么要管】\n测试真正买的是「可重复验证约定」的能力：敢重构、敢发版、回归能早发现。\n\n【正确做法（概要）】\n先锁高风险（钱、权限、主路径），用最快的测试层表达；低风险展示类可以克制。" },
      { type: "text", title: "测试不是形式主义", body: "测试的核心价值是：用可重复的检查，把「代码行为」固定下来。重构时不怕改坏；上线前尽早发现回归；新人接手时有可运行的文档。\n\n但测试也有成本：编写、维护、CI 时间。好的策略是：关键路径必须有测试，纯展示 UI 可以少写，业务规则与边界条件优先。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「没有测试时的风险」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "没有测试时的风险", lang: "ts", code: `// 改了一行，线上炸了——没人知道
function discount(price: number, vip: boolean) {
  return vip ? price * 0.8 : price
  // 某次 refactor 写成了 price * 0.8 对所有人生效
}` },
      { type: "text", title: "易错点（务必读）", body: "• 为测而测\n• 一层打天下\n• 失败信息无法读" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「为什么要写测试」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：先锁高风险（钱、权限、主路径），用最快的测试层表达；低风险展示类可以克制。" },
      { type: "tip", body: "把测试当「可执行规格」：描述期望行为，而不是实现细节。实现可以变，规格应稳定。" },
      { type: "quiz", questions: [
        {
          id: "w1",
          question: "测试最主要的长期价值是？",
          options: ["让覆盖率数字好看","固定行为、支撑重构与回归","完全替代 Code Review","让 CI 变慢显得专业"],
          answer: 1,
          explain: "可重复检查行为，降低改坏与回归成本。",
        },
        {
          id: "w2",
          question: "何时可以少写测试？",
          options: ["纯展示、几乎无逻辑的 UI","支付与权限逻辑","核心业务规则","数据转换边界条件"],
          answer: 0,
          explain: "无逻辑展示层性价比低；关键业务必须测。",
        },
      ] },
    ],
  },
  "test-pyramid": {
    objectives: ["能用自己的话解释「测试金字塔」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["为测而测","一层打天下","失败信息无法读"],
    takeaway: "底层多、顶层精；主路径少量 E2E，规则与边界下沉到单元/集成。",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「测试金字塔」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "【痛点】\n全靠 E2E 会又慢又脆；全靠单元又缺少「真用户路径」信心。\n\n【为什么要管】\n不同层回答不同问题：单元定位准，E2E 信心高但贵。\n\n【正确做法（概要）】\n底层多、顶层精；主路径少量 E2E，规则与边界下沉到单元/集成。" },
      { type: "text", title: "三层怎么分", body: "单元测试：函数、纯逻辑，快、多、定位准。\n集成测试：模块协作（组件+状态、API client）。\nE2E：真实浏览器路径（登录→下单），少而精。\n\n经典金字塔：底部单元最多，顶部 E2E 最少。反模式是「冰淇淋甜筒」——全靠慢脆 E2E。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「同一需求的三种测法」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "同一需求的三种测法", lang: "ts", code: `// 单元：纯函数
expect(calcTax(100, 0.1)).toBe(10)

// 组件集成：RTL
render(<Cart />)
await user.click(screen.getByRole('button', { name: '加购' }))

// E2E：Playwright
await page.getByRole('button', { name: '结算' }).click()
await expect(page.getByText('订单已创建')).toBeVisible()` },
      { type: "text", title: "动手 Demo", body: "下面的交互用来建立直觉。做完问自己：若这是真实 PR，我还缺哪条自动化检查？" },
      { type: "demo", kind: "pyramid", title: "动手：金字塔配比", hint: "拖动滑块，看速度与信心如何权衡", },
      { type: "text", title: "易错点（务必读）", body: "• 为测而测\n• 一层打天下\n• 失败信息无法读" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「测试金字塔」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：底层多、顶层精；主路径少量 E2E，规则与边界下沉到单元/集成。" },
      { type: "quiz", questions: [
        {
          id: "p1",
          question: "金字塔底部应该是？",
          options: ["E2E","单元测试","手工点点点","截图测试"],
          answer: 1,
          explain: "单元快、多、定位准。",
        },
        {
          id: "p2",
          question: "E2E 适合验证？",
          options: ["每个私有函数","关键用户主路径","所有 CSS 像素","第三方 SDK 内部"],
          answer: 1,
          explain: "少而精，覆盖主路径即可。",
        },
      ] },
    ],
  },
  "aaa-pattern": {
    objectives: ["能用自己的话解释「AAA 模式」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["为测而测","一层打天下","失败信息无法读"],
    takeaway: "AAA 模式：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「AAA 模式」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：AAA 模式。\n\n一句话：Arrange · Act · Assert 写清晰用例。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "结构即可读性", body: "Arrange：准备数据与环境。\nAct：执行被测行为（一次为主）。\nAssert：验证结果。\n\n一个 it 只验证一件事；避免「一个用例里 assert 七八个无关点」。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「标准 AAA 示例」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "标准 AAA 示例", lang: "ts", code: `it('VIP 打八折', () => {
  // Arrange
  const price = 100
  const vip = true

  // Act
  const result = discount(price, vip)

  // Assert
  expect(result).toBe(80)
})` },
      { type: "text", title: "动手 Demo", body: "下面的交互用来建立直觉。做完问自己：若这是真实 PR，我还缺哪条自动化检查？" },
      { type: "demo", kind: "aaa", title: "动手：拆分 AAA", },
      { type: "text", title: "易错点（务必读）", body: "• 为测而测\n• 一层打天下\n• 失败信息无法读" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「AAA 模式」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：AAA 模式：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "quiz", questions: [
        {
          id: "a1",
          question: "Act 阶段应该？",
          options: ["准备很多 mock","执行被测行为","只写 expect","启动整个数据库"],
          answer: 1,
          explain: "Act = 触发行为。",
        },
        {
          id: "a2",
          question: "一个 it 里最好？",
          options: ["测完一个模块所有分支","聚焦一个行为/结果","复制粘贴 20 个 expect","不写 assert 看日志"],
          answer: 1,
          explain: "单一意图，失败时好定位。",
        },
      ] },
    ],
  },
  "first-principles": {
    objectives: ["能用自己的话解释「好测试的原则」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["为测而测","一层打天下","失败信息无法读"],
    takeaway: "好测试的原则：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「好测试的原则」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：好测试的原则。\n\n一句话：独立、可重复、快速、有意义的失败信息。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "FIRST 与实用准则", body: "Fast：快，才愿意常跑。\nIndependent：不依赖执行顺序与共享可变状态。\nRepeatable：同一结果可复现。\nSelf-validating：自动 pass/fail。\nTimely：与代码同步写（或 TDD）。\n\n额外：失败信息要说清「期望 vs 实际」；不要测试实现细节（如内部 state 字段名）。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「脆弱 vs 稳健」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "脆弱 vs 稳健", lang: "ts", code: `// 脆弱：绑死 class 名
expect(container.querySelector('.btn-primary-v2')).toBeTruthy()

// 稳健：用户可见语义
expect(screen.getByRole('button', { name: '提交' })).toBeEnabled()` },
      { type: "text", title: "易错点（务必读）", body: "• 为测而测\n• 一层打天下\n• 失败信息无法读" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「好测试的原则」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：好测试的原则：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "测「用户能感知的行为」，少测「组件私有 state 结构」。重构 UI 实现时测试不应成片红。" },
      { type: "quiz", questions: [
        {
          id: "f1",
          question: "测试之间共享可变全局状态会？",
          options: ["更快","导致顺序依赖与 flaky","提高覆盖率","替代 mock"],
          answer: 1,
          explain: "破坏独立性，难复现。",
        },
        {
          id: "f2",
          question: "更推荐的断言目标？",
          options: ["私有方法是否被调用 N 次","用户可见的文案与交互结果","具体 CSS 文件哈希","内部变量名"],
          answer: 1,
          explain: "行为优先于实现。",
        },
      ] },
    ],
  },
  "vitest-intro": {
    objectives: ["能用自己的话解释「Vitest 入门」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "Vitest 入门：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Vitest 入门」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Vitest 入门。\n\n一句话：与 Vite 同构的现代测试运行器。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "为什么是 Vitest", body: "Vitest 与 Vite 共享配置与转换管线，ESM 友好，API 兼容 Jest 风格（describe/it/expect），watch 模式极快。前端 monorepo 与 Vite 项目首选。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「安装与最小配置」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "安装与最小配置", lang: "bash", code: `npm i -D vitest
# package.json
"scripts": { "test": "vitest", "test:run": "vitest run" }` },
      { type: "text", title: "怎么读这段代码", body: "下面是「第一个测试」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "第一个测试", lang: "ts", code: `import { describe, it, expect } from 'vitest'
import { sum } from './sum'

describe('sum', () => {
  it('adds numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })
})` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Vitest 入门」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Vitest 入门：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/" },
      { type: "quiz", questions: [
        {
          id: "v1",
          question: "Vitest 与 Vite 的关系？",
          options: ["完全无关","共享配置与转换，开发体验一致","只能测 Vue","必须用 Jest 作为底层"],
          answer: 1,
          explain: "同构工具链是核心卖点。",
        },
        {
          id: "v2",
          question: "CI 里通常用？",
          options: ["vitest（watch）","vitest run","vitest ui 人工点","无头浏览器"],
          answer: 1,
          explain: "run 模式跑完即退，适合 CI。",
        },
      ] },
    ],
  },
  "vitest-expect": {
    objectives: ["能用自己的话解释「断言与匹配器」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "断言与匹配器：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/api/expect.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「断言与匹配器」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：断言与匹配器。\n\n一句话：toBe、toEqual、toMatchObject 等常用 API。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "选对匹配器", body: "toBe：引用相等（原始值常用）。\ntoEqual：深比较。\ntoMatchObject：对象子集。\ntoThrow：异常。\ntoBeCloseTo：浮点。\n异步：await expect(p).resolves / rejects。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「常用断言」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "常用断言", lang: "ts", code: `expect(1 + 1).toBe(2)
expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 })
expect({ a: 1, b: 2 }).toMatchObject({ a: 1 })
expect([1, 2, 3]).toContain(2)
expect(() => parse()).toThrow(/invalid/i)
await expect(fetchUser(1)).resolves.toHaveProperty('id', 1)` },
      { type: "text", title: "动手 Demo", body: "下面的交互用来建立直觉。做完问自己：若这是真实 PR，我还缺哪条自动化检查？" },
      { type: "demo", kind: "vitest-expect", title: "动手：选对 expect", },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「断言与匹配器」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：断言与匹配器：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/api/expect.html" },
      { type: "quiz", questions: [
        {
          id: "e1",
          question: "比较两个对象内容用？",
          options: ["toBe","toEqual","toBeTruthy","toBeNull"],
          answer: 1,
          explain: "toEqual 深比较。",
        },
        {
          id: "e2",
          question: "只检查对象部分字段？",
          options: ["toBe","toStrictEqual","toMatchObject","toContain"],
          answer: 2,
          explain: "toMatchObject 子集匹配。",
        },
      ] },
    ],
  },
  "vitest-mock": {
    objectives: ["能用自己的话解释「Mock 与 Spy」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "vi.fn / spyOn / mock 模块；断言调用；afterEach restore。",
    official: "https://vitest.dev/guide/mocking.html",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Mock 与 Spy」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "【痛点】\n要么完全不 mock 被网络拖死，要么 mock 过度只测到假实现。\n\n【为什么要管】\nMock 应用在不可控/昂贵边界（网络、时间、第三方）。\n\n【正确做法（概要）】\nvi.fn / spyOn / mock 模块；断言调用；afterEach restore。" },
      { type: "text", title: "何时 mock", body: "网络、时间、随机数、第三方 SDK——不可控依赖用 mock。\n单元测业务规则时，mock 掉 I/O。\n集成/E2E 则尽量少 mock，或只 mock 外部边界。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「vi.fn 与模块 mock」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "vi.fn 与模块 mock", lang: "ts", code: `import { vi, expect, it } from 'vitest'
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
}))` },
      { type: "text", title: "动手 Demo", body: "下面的交互用来建立直觉。做完问自己：若这是真实 PR，我还缺哪条自动化检查？" },
      { type: "demo", kind: "vitest-mock", title: "动手：mock 调用次数", },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Mock 与 Spy」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：vi.fn / spyOn / mock 模块；断言调用；afterEach restore。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/mocking.html" },
      { type: "tip", body: "mock 过度会测到「自己写的假实现」。优先测真实协作；mock 只挡真正的外部边界。" },
      { type: "quiz", questions: [
        {
          id: "m1",
          question: "vi.fn() 用来？",
          options: ["启动浏览器","创建可追踪的假函数","编译 TypeScript","生成覆盖率报告"],
          answer: 1,
          explain: "可断言调用次数与参数。",
        },
        {
          id: "m2",
          question: "mock 的合理边界？",
          options: ["每个内部函数都 mock","外部 I/O / 不稳定依赖","永远不 mock","只 mock 字符串"],
          answer: 1,
          explain: "隔离不可控外部依赖。",
        },
      ] },
    ],
  },
  "vitest-async": {
    objectives: ["能用自己的话解释「异步与定时器」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "异步与定时器：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/learn/async.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「异步与定时器」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：异步与定时器。\n\n一句话：async/await、fake timers、waitFor。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "异步测试要点", body: "永远 await 异步 Act。\n不要用固定 sleep 等结果（慢且 flaky）。\n时间相关逻辑用 vi.useFakeTimers() + advanceTimers。\n组件侧可用 waitFor / findBy*。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「Fake timers」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "Fake timers", lang: "ts", code: `import { vi, it, expect, beforeEach, afterEach } from 'vitest'

beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

it('debounces', () => {
  const fn = vi.fn()
  const d = debounce(fn, 300)
  d()
  d()
  vi.advanceTimersByTime(300)
  expect(fn).toHaveBeenCalledTimes(1)
})` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「异步与定时器」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：异步与定时器：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/learn/async.html" },
      { type: "quiz", questions: [
        {
          id: "as1",
          question: "等待异步结果应优先？",
          options: ["setTimeout 固定 2 秒","await + 正确的异步断言/查询","while(true) 轮询","忽略 Promise"],
          answer: 1,
          explain: "明确等待条件，避免固定 sleep。",
        },
        {
          id: "as2",
          question: "vi.useFakeTimers 的用途？",
          options: ["加速真实网络","控制 setTimeout/setInterval 时间","替换浏览器","加密"],
          answer: 1,
          explain: "确定性推进时间。",
        },
      ] },
    ],
  },
  "vitest-coverage": {
    objectives: ["能用自己的话解释「覆盖率怎么读」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "覆盖率怎么读：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/coverage.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「覆盖率怎么读」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：覆盖率怎么读。\n\n一句话：行/分支覆盖率的意义与陷阱。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "数字不是目标", body: "覆盖率告诉你「哪些代码没被执行」，不告诉你「行为是否正确」。\n100% 仍可能全是废话断言。\n关注：关键路径分支、错误处理、边界值。\nCI 可设合理阈值（如 70–80%），别为了数字写空测试。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「开启覆盖率」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "开启覆盖率", lang: "bash", code: `npm i -D @vitest/coverage-v8
npx vitest run --coverage` },
      { type: "text", title: "动手 Demo", body: "下面的交互用来建立直觉。做完问自己：若这是真实 PR，我还缺哪条自动化检查？" },
      { type: "demo", kind: "coverage", title: "动手：解读覆盖报告", },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「覆盖率怎么读」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：覆盖率怎么读：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/coverage.html" },
      { type: "quiz", questions: [
        {
          id: "c1",
          question: "高覆盖率意味着？",
          options: ["零 bug","更多代码被执行到，不保证断言有意义","E2E 已完备","可以不上线 Review"],
          answer: 1,
          explain: "覆盖 ≠ 正确。",
        },
      ] },
    ],
  },
  "vitest-config": {
    objectives: ["能用自己的话解释「Vitest 配置与 CLI」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "Vitest 配置与 CLI：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/config/",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Vitest 配置与 CLI」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Vitest 配置与 CLI。\n\n一句话：defineConfig、environment、pool、CLI 过滤与 UI。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "配置入口", body: "官方推荐 vitest.config.ts，与 Vite 共享 resolve/alias/插件。常用：environment（node / jsdom / happy-dom）、setupFiles、globals、coverage、testTimeout。\n\nCLI：vitest（watch）、vitest run（CI）、vitest related、vitest --ui、按文件名/ -t 名过滤。\n\n权威索引：https://vitest.dev/llms.txt" },
      { type: "text", title: "怎么读这段代码", body: "下面是「最小生产配置」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "最小生产配置", lang: "ts", code: `import { defineConfig } from 'vitest/config'

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
})` },
      { type: "text", title: "怎么读这段代码", body: "下面是「CLI 常用」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "CLI 常用", lang: "bash", code: `npx vitest                 # watch
npx vitest run             # CI
npx vitest run src/foo.test.ts
npx vitest -t "VIP 折扣"   # 按名称
npx vitest --ui
npx vitest related src/a.ts` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Vitest 配置与 CLI」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Vitest 配置与 CLI：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/config/" },
      { type: "quiz", questions: [
        {
          id: "vc1",
          question: "CI 推荐命令？",
          options: ["vitest（watch）","vitest run","vitest --ui","vitest bench"],
          answer: 1,
          explain: "run 跑完退出，适合流水线。",
        },
        {
          id: "vc2",
          question: "测 React 组件常见 environment？",
          options: ["node only","jsdom 或 happy-dom","仅 browser mode","无 environment"],
          answer: 1,
          explain: "DOM API 需要 jsdom/happy-dom；真实浏览器用 Browser Mode。",
        },
      ] },
    ],
  },
  "vitest-setup-hooks": {
    objectives: ["能用自己的话解释「Setup / Hooks / 生命周期」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "Setup / Hooks / 生命周期：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/learn/setup-teardown.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Setup / Hooks / 生命周期」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Setup / Hooks / 生命周期。\n\n一句话：beforeEach、afterEach、setupFiles、globalSetup。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "分层清理", body: "setupFiles：每个测试文件前加载（扩展 expect、polyfill）。\nglobalSetup：进程级（启停测试 DB）。\nbeforeEach/afterEach：用例间隔离 mock 与 DOM。\nbeforeAll/afterAll：昂贵一次性资源。\n\n官方强调 clearMocks / restoreMocks 配置可自动清理 vi.fn。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「hooks 示例」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "hooks 示例", lang: "ts", code: `import { beforeEach, afterEach, vi } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Setup / Hooks / 生命周期」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Setup / Hooks / 生命周期：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/learn/setup-teardown.html" },
      { type: "quiz", questions: [
        {
          id: "h1",
          question: "每个测试后恢复 spy 常用？",
          options: ["vi.fn()","vi.restoreAllMocks()","expect.fail","describe.skip"],
          answer: 1,
          explain: "restoreAllMocks 还原实现与历史。",
        },
      ] },
    ],
  },
  "vitest-snapshot": {
    objectives: ["能用自己的话解释「Snapshot 测试」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "Snapshot 测试：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/snapshot.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Snapshot 测试」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Snapshot 测试。\n\n一句话：toMatchSnapshot、inline、更新策略与评审。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "何时用 Snapshot", body: "适合：序列化输出、错误消息、大对象结构、ARIA 树。\n不适合：经常变的时间戳、随机 ID（先规范化）。\n\n首次运行生成快照文件并提交；变更时 -u 更新并 Code Review。并发 async 测试要用 test context 的 expect。\n\n官方：https://vitest.dev/guide/snapshot.html" },
      { type: "text", title: "怎么读这段代码", body: "下面是「文件与内联快照」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "文件与内联快照", lang: "ts", code: `import { expect, it } from 'vitest'

it('formats user', () => {
  expect(formatUser(user)).toMatchSnapshot()
})

it('inline', () => {
  expect(sum(1, 2)).toMatchInlineSnapshot('3')
})` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Snapshot 测试」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Snapshot 测试：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/snapshot.html" },
      { type: "tip", body: "Snapshot 是回归锁，不是「免写断言」。Review 时逐 diff 看是否预期。" },
      { type: "quiz", questions: [
        {
          id: "sn1",
          question: "快照文件应？",
          options: ["加入 .gitignore","提交并参与 Review","只存本地","自动删除"],
          answer: 1,
          explain: "作为可审查的回归基线。",
        },
      ] },
    ],
  },
  "vitest-browser-mode": {
    objectives: ["能用自己的话解释「Browser Mode 真浏览器」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "Browser Mode 真浏览器：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/browser/",
    minutes: 12,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Browser Mode 真浏览器」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Browser Mode 真浏览器。\n\n一句话：provider Playwright/WebdriverIO、组件测、视觉回归。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "为何 Browser Mode", body: "jsdom 不完整模拟布局/真实事件。Vitest Browser Mode 在真浏览器跑测试：window/document 原生，可用 Playwright 或 WebdriverIO provider。\n\n安装：npx vitest init browser\nCI 推荐 playwright provider（可并行）；preview 仅本地预览。\n\n还能：组件测试、视觉回归、ARIA snapshots、Trace。\n文档：https://vitest.dev/guide/browser/" },
      { type: "text", title: "怎么读这段代码", body: "下面是「browser 配置（官方形态）」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "browser 配置（官方形态）", lang: "ts", code: `import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
})` },
      { type: "text", title: "怎么读这段代码", body: "下面是「组件测试概念」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "组件测试概念", lang: "tsx", code: `// vitest-browser-react 等 render helper
import { render } from 'vitest-browser-react'
import { page } from '@vitest/browser/context'
import { Counter } from './Counter'

it('clicks', async () => {
  render(<Counter />)
  await page.getByRole('button', { name: '加' }).click()
  await expect.element(page.getByText('1')).toBeInTheDocument()
})` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Browser Mode 真浏览器」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Browser Mode 真浏览器：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/browser/" },
      { type: "quiz", questions: [
        {
          id: "bm1",
          question: "CI 跑 Browser Mode 更推荐？",
          options: ["仅 preview provider","playwright / webdriverio provider","不要浏览器","仅 Safari 本地"],
          answer: 1,
          explain: "官方：CI 需 playwright 或 webdriverio；preview 偏本地。",
        },
        {
          id: "bm2",
          question: "Browser Mode 与 jsdom 区别？",
          options: ["完全相同","真浏览器 API 与事件，更接近生产","不能访问 DOM","只能测 Node"],
          answer: 1,
          explain: "原生浏览器环境。",
        },
      ] },
    ],
  },
  "vitest-projects-types": {
    objectives: ["能用自己的话解释「Projects 与类型测试」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "Projects 与类型测试：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/projects.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Projects 与类型测试」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Projects 与类型测试。\n\n一句话：多项目配置、expectTypeOf / assertType。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "Test Projects", body: "projects 可把 unit / browser / node 拆成多配置并行（不同 environment、include）。适合 monorepo 与「一部分 jsdom、一部分 browser」。\n\n类型测试：expectTypeOf / assertType 在类型层断言，不运行时执行业务。见官方 Testing Types。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「类型测试」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "类型测试", lang: "ts", code: `import { expectTypeOf, test } from 'vitest'

test('id is string', () => {
  expectTypeOf(getUser().id).toEqualTypeOf<string>()
})` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Projects 与类型测试」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Projects 与类型测试：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/projects.html" },
      { type: "quiz", questions: [
        {
          id: "pt1",
          question: "expectTypeOf 主要验证？",
          options: ["运行时值","TypeScript 类型","网络延迟","覆盖率数字"],
          answer: 1,
          explain: "类型层断言。",
        },
      ] },
    ],
  },
  "vitest-mocking-matrix": {
    objectives: ["能用自己的话解释「Mock 矩阵：日期/模块/请求/FS」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "Mock 矩阵：日期/模块/请求/FS：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/mocking.html",
    minutes: 11,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Mock 矩阵：日期/模块/请求/FS」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Mock 矩阵：日期/模块/请求/FS。\n\n一句话：对齐官方 mocking 分册：dates、modules、requests、fs。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "官方 Mocking 分册", body: "Vitest 文档拆成：Functions、Modules、Timers、Dates、Globals、Classes、File System、Requests。\n原则：只 mock 边界；测完 restore；prefer vi.spyOn 可还原。\n\nRequests：可 mock fetch，或结合 MSW。\nFS：memfs / vi.mock('node:fs')。\nDates：vi.setSystemTime。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「日期与模块」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "日期与模块", lang: "ts", code: `vi.useFakeTimers()
vi.setSystemTime(new Date('2026-01-01'))

vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: '1' }),
}))

// 部分 mock
vi.mock('./utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./utils')>()
  return { ...actual, randomId: () => 'fixed' }
})` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Mock 矩阵：日期/模块/请求/FS」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Mock 矩阵：日期/模块/请求/FS：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/mocking.html" },
      { type: "quiz", questions: [
        {
          id: "mm1",
          question: "固定系统时间用？",
          options: ["Date = null","vi.setSystemTime","只有 Playwright","CSS clock"],
          answer: 1,
          explain: "配合 fake timers。",
        },
      ] },
    ],
  },
  "vitest-filtering": {
    objectives: ["能用自己的话解释「过滤测试：文件 / -t / only / skip」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "文件路径 + -t；注意 only/tags 仍可能加载多文件；大仓用路径约束。",
    official: "https://vitest.dev/guide/filtering.html",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「过滤测试：文件 / -t / only / skip」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "【痛点】\n改一个工具函数却跑全仓库，watch 体验崩掉。\n\n【为什么要管】\n过滤让反馈回到秒级。\n\n【正确做法（概要）】\n文件路径 + -t；注意 only/tags 仍可能加载多文件；大仓用路径约束。" },
      { type: "text", title: "为何要过滤", body: "测试套件变大后，改一处模块不必跑几百无关用例。Vitest 支持：文件名模式、CLI -t 名称、describe/it.only、.skip、以及 tags。\n\n性能注意：-t / .only / tags 仍会加载各测试文件去发现用例；大仓库请同时传文件路径，或使用 --experimental.preParse。" },
      { type: "text", title: "三种入口", body: "1) 文件：vitest basic 匹配路径含 basic 的文件\n2) 名称：vitest -t \"empty input\"\n3) 源码：it.only / describe.skip / it.todo\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「CLI」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "CLI", lang: "bash", code: `vitest utils.test.ts -t "handles empty input"
vitest basic
vitest --experimental.preParse -t "handles empty input"
vitest related src/utils.ts` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「过滤测试：文件 / -t / only / skip」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：文件路径 + -t；注意 only/tags 仍可能加载多文件；大仓用路径约束。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/filtering.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-filtering-0",
          question: "缩小范围时最佳实践？",
          options: ["只开 -t 不传文件","文件路径 + -t 组合","永远跑全量","只用 .skip 隐藏"],
          answer: 1,
          explain: "传文件路径可避免加载全部测试文件。",
        },
      ] },
    ],
  },
  "vitest-tags": {
    objectives: ["能用自己的话解释「Test Tags 标签筛选」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "Test Tags 标签筛选：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/test-tags.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Test Tags 标签筛选」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Test Tags 标签筛选。\n\n一句话：官网 test-tags：给用例打标签，按能力/环境筛选。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "标签是什么", body: "tags 可挂在 test/describe 上，CLI --tags-filter 或配置 strictTags 控制。适合：slow、network、browser、flaky 等分组。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "与 projects 关系", body: "粗分用 projects（不同环境），细分用 tags（同一配置内筛选）。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「代码示例」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "示例", lang: "ts", code: `import { test } from 'vitest'

test('checkout', { tags: ['slow', 'e2e'] }, async () => {
  // ...
})

// vitest --tags-filter=slow
// vitest --tags-filter='not flaky'` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Test Tags 标签筛选」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Test Tags 标签筛选：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/test-tags.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-tags-0",
          question: "标签的典型用途？",
          options: ["替代断言","按场景/速度筛选子集","删除测试","只改覆盖率"],
          answer: 1,
          explain: "按标签跑子集。",
        },
      ] },
    ],
  },
  "vitest-parallelism": {
    objectives: ["能用自己的话解释「并行与 pool / maxWorkers」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "并行与 pool / maxWorkers：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/parallelism.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「并行与 pool / maxWorkers」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：并行与 pool / maxWorkers。\n\n一句话：官网 parallelism：文件并行、isolate、顺序控制。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "默认并行", body: "Vitest 默认多文件并行。pool 控制 worker 类型；fileParallelism、maxWorkers 调吞吐。\n隔离：isolate true 时每文件独立上下文，更安全更慢。\n顺序：sequence.concurrent / shuffle；用例内 test.concurrent。" },
      { type: "text", title: "何时串行", body: "共享全局状态、真实端口、某些浏览器实例限制时关闭并行或拆 projects。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「配置」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "配置", lang: "ts", code: `export default defineConfig({
  test: {
    fileParallelism: true,
    maxWorkers: 4,
    isolate: true,
    sequence: { concurrent: false },
  },
})` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「并行与 pool / maxWorkers」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：并行与 pool / maxWorkers：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/parallelism.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-parallelism-0",
          question: "并行变慢时优先查？",
          options: ["删掉所有测试","worker 数、隔离、共享资源争用","关掉 TypeScript","只用 toBe"],
          answer: 1,
          explain: "资源与隔离配置。",
        },
      ] },
    ],
  },
  "vitest-ui-reporters": {
    objectives: ["能用自己的话解释「Vitest UI 与 Reporters」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "Vitest UI 与 Reporters：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/ui.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Vitest UI 与 Reporters」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Vitest UI 与 Reporters。\n\n一句话：官网 UI + reporters：本地可视化与 CI 报告格式。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "Vitest UI", body: "vitest --ui 打开浏览器 UI：筛选、看失败、覆盖率。适合本地调试。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "Reporters", body: "default / verbose / json / junit / html / tap / dot / github-actions 等。可多 reporter 并行；自定义 reporter 实现 onFinished 等钩子。CI 常用 junit + github-actions。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「配置」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "配置", lang: "ts", code: `export default defineConfig({
  test: {
    reporters: ['default', 'junit', 'github-actions'],
    outputFile: { junit: './reports/junit.xml' },
  },
})
// npx vitest --ui` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Vitest UI 与 Reporters」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Vitest UI 与 Reporters：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/ui.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-ui-reporters-0",
          question: "CI 常见组合？",
          options: ["仅 --ui","junit + default/github-actions","无 reporter","只 console.log"],
          answer: 1,
          explain: "可机读报告 + 控制台。",
        },
      ] },
    ],
  },
  "vitest-in-source": {
    objectives: ["能用自己的话解释「In-Source Testing 源内测试」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "In-Source Testing 源内测试：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/in-source.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「In-Source Testing 源内测试」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：In-Source Testing 源内测试。\n\n一句话：官网 in-source：与实现同文件的 import.meta.vitest。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "是什么", body: "在生产源文件底部用 if (import.meta.vitest) 写测试，适合小工具函数、紧密耦合的断言，减少文件跳转。构建需剔除或 tree-shake 该分支。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "取舍", body: "优点：贴近实现。缺点：污染源文件、不适合大组件。团队需统一规范。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「代码示例」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "示例", lang: "ts", code: `export function sum(a: number, b: number) {
  return a + b
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('sum', () => {
    expect(sum(1, 2)).toBe(3)
  })
}` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「In-Source Testing 源内测试」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：In-Source Testing 源内测试：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/in-source.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-in-source-0",
          question: "in-source 适合？",
          options: ["巨型 E2E","小函数/紧耦合单元断言","替代 Playwright","只 mock 网络"],
          answer: 1,
          explain: "小而紧的单元。",
        },
      ] },
    ],
  },
  "vitest-extend-matchers": {
    objectives: ["能用自己的话解释「扩展 Matchers」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "扩展 Matchers：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/extending-matchers.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「扩展 Matchers」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：扩展 Matchers。\n\n一句话：官网 extending-matchers：expect.extend 自定义断言。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "为何扩展", body: "领域断言（toBeWithinRange、toBeValidEmail）提高可读性。基于 chai/jest 风格 expect.extend，返回 { pass, message }。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "TypeScript", body: "需模块增强 Matcher 接口才能有类型提示。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「代码示例」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
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
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「扩展 Matchers」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：扩展 Matchers：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/extending-matchers.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-extend-matchers-0",
          question: "extend 返回值必须含？",
          options: ["只有 true","pass 与 message","coverage","page"],
          answer: 1,
          explain: "pass + message。",
        },
      ] },
    ],
  },
  "vitest-common-errors": {
    objectives: ["能用自己的话解释「常见错误与调试」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "常见错误与调试：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/common-errors.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「常见错误与调试」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：常见错误与调试。\n\n一句话：官网 common-errors + debugging：顶层 await、环境、mock 陷阱。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "高频坑", body: "1) jsdom 中缺少浏览器 API → polyfill 或 Browser Mode\n2) mock 提升（hoist）导致顺序困惑 → vi.hoisted\n3) 异步未 await\n4) 多环境混用 globals\n5) ESM/CJS 互操作\n用 vitest --inspect-brk / IDE 断点 / UI 面板定位。" },
      { type: "text", title: "AI 写测试", body: "官方 Writing Tests with AI：给模型项目约定、真实失败日志、禁止臆造 API；优先用官方 llms.txt。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「调试」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "调试", lang: "bash", code: `npx vitest run path/to/file.test.ts
npx vitest --inspect-brk --no-file-parallelism
npx vitest --ui` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「常见错误与调试」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：常见错误与调试：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/common-errors.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-common-errors-0",
          question: "异步测试最常见失败原因？",
          options: ["字体","未 await Promise / 断言","CSS 颜色","Git 分支名"],
          answer: 1,
          explain: "未正确等待异步。",
        },
      ] },
    ],
  },
  "vitest-browser-component": {
    objectives: ["能用自己的话解释「Browser 组件测试深水」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "Browser 组件测试深水：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/browser/component-testing.html",
    minutes: 12,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Browser 组件测试深水」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Browser 组件测试深水。\n\n一句话：官网 component-testing：真浏览器组件、locators、框架 render。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "定位", body: "组件测夹在单元与 E2E 之间：快于整站 E2E，真于 jsdom。推荐 Browser Mode（Playwright provider）。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "框架包", body: "vitest-browser-react / vue / svelte 等提供 render；配合 @vitest/browser/context 的 page.getByRole 与 expect.element。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "与 RTL 关系", body: "理念接近用户视角；但跑在真浏览器，可测 CSS 布局、真实焦点与 pointer。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「概念代码」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "概念代码", lang: "tsx", code: `import { render } from 'vitest-browser-react'
import { page } from '@vitest/browser/context'
import { Counter } from './Counter'

test('increment', async () => {
  render(<Counter />)
  await page.getByRole('button', { name: '加' }).click()
  await expect.element(page.getByText('1')).toBeInTheDocument()
})` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Browser 组件测试深水」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Browser 组件测试深水：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/browser/component-testing.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-browser-component-0",
          question: "组件测推荐环境？",
          options: ["仅 Node 无 DOM","Browser Mode 真浏览器","只用 grep","仅 Python"],
          answer: 1,
          explain: "真浏览器最准。",
        },
      ] },
    ],
  },
  "vitest-visual-aria": {
    objectives: ["能用自己的话解释「视觉回归与 ARIA Snapshot」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "视觉回归与 ARIA Snapshot：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/browser/aria-snapshots.html",
    minutes: 11,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「视觉回归与 ARIA Snapshot」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：视觉回归与 ARIA Snapshot。\n\n一句话：官网 visual-regression + aria-snapshots。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "视觉回归", body: "Browser Mode 可对组件/页面截图对比。注意：字体、动画、动态数据需稳定化；阈值阈值与更新流程要写进团队规范。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "ARIA Snapshot", body: "序列化可访问树做快照，比像素稳：测结构/角色/名称，不绑 CSS 细节。适合 a11y 回归。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「ARIA 概念」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "ARIA 概念", lang: "ts", code: `// Browser Mode 概念
await expect(page.getByRole('navigation')).toMatchAriaSnapshot(\`
  - navigation:
    - link "首页"
    - link "设置"
\`)` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「视觉回归与 ARIA Snapshot」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：视觉回归与 ARIA Snapshot：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/browser/aria-snapshots.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-visual-aria-0",
          question: "ARIA snapshot 更关注？",
          options: ["像素颜色","可访问树结构与名称","网络带宽","CPU 温度"],
          answer: 1,
          explain: "a11y 树。",
        },
      ] },
    ],
  },
  "vitest-mock-requests-fs": {
    objectives: ["能用自己的话解释「Mock 请求与文件系统」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "Mock 请求与文件系统：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/mocking/requests.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Mock 请求与文件系统」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Mock 请求与文件系统。\n\n一句话：官网 mocking/requests + file-system。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "请求", body: "vi.stubGlobal('fetch', ...) 或 mock 模块；复杂场景用 MSW 更接近真实。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "文件系统", body: "vi.mock('node:fs') 或 memfs；勿对真实磁盘写测试垃圾。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「fetch mock」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "fetch mock", lang: "ts", code: `vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ id: '1' }),
}))

// fs
vi.mock('node:fs', async (importOriginal) => {
  const fs = await importOriginal<typeof import('node:fs')>()
  return { ...fs, readFileSync: vi.fn(() => 'stub') }
})` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Mock 请求与文件系统」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Mock 请求与文件系统：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/mocking/requests.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-mock-requests-fs-0",
          question: "复杂 HTTP 场景更推荐？",
          options: ["手写 20 个全局变量","MSW 请求层 mock","删除 fetch","只用 alert"],
          answer: 1,
          explain: "MSW。",
        },
      ] },
    ],
  },
  "vitest-test-context": {
    objectives: ["能用自己的话解释「Test Context 与 expect 局部」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "Test Context 与 expect 局部：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/test-context.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Test Context 与 expect 局部」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Test Context 与 expect 局部。\n\n一句话：官网 test-context：concurrent 下正确绑定 expect。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "问题", body: "并发测试若用全局 expect，快照会串号。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "做法", body: "使用 test 回调参数 context 的 expect / 注解；官方对 concurrent + snapshot 特别警告。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「代码示例」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "示例", lang: "ts", code: `import { test, expect } from 'vitest'

test.concurrent('a', async ({ expect }) => {
  expect(1).toMatchInlineSnapshot('1')
})` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Test Context 与 expect 局部」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Test Context 与 expect 局部：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/test-context.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-test-context-0",
          question: "concurrent 快照要用？",
          options: ["随意全局 expect","context 里的 expect","禁用所有断言","只用 assert"],
          answer: 1,
          explain: "局部 expect。",
        },
      ] },
    ],
  },
  "vitest-environment": {
    objectives: ["能用自己的话解释「Test Environment 详解」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["漏 await 导致假绿","mock 完不 restore 串案","CI 误用 watch","用覆盖率数字代替风险思考"],
    takeaway: "Test Environment 详解：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://vitest.dev/guide/environment.html",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Test Environment 详解」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Test Environment 详解。\n\n一句话：官网 environment：node / jsdom / happy-dom / 自定义。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "选择", body: "纯逻辑 → node；需要 DOM 但不测布局 → jsdom/happy-dom；要布局/真实事件 → Browser Mode。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "每文件覆盖", body: "文档顶部 // @vitest-environment jsdom\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「注释」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "注释", lang: "ts", code: `// @vitest-environment jsdom
import { window } from '...'` },
      { type: "text", title: "易错点（务必读）", body: "• 漏 await 导致假绿\n• mock 完不 restore 串案\n• CI 误用 watch\n• 用覆盖率数字代替风险思考" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Test Environment 详解」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Test Environment 详解：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://vitest.dev/guide/environment.html" },
      { type: "quiz", questions: [
        {
          id: "vitest-environment-0",
          question: "要测真实 CSS 布局？",
          options: ["node environment 足够","Browser Mode","只靠字符串匹配 HTML","禁用 DOM"],
          answer: 1,
          explain: "真浏览器。",
        },
      ] },
    ],
  },
  "rtl-intro": {
    objectives: ["能用自己的话解释「Testing Library 理念」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["用 getBy 断言不存在","优先 testid 忽略 a11y","fireEvent 代替真实输入序列","测内部 state 而不是结果"],
    takeaway: "Role/Label 查询 + user-event + 断言用户可见结果。",
    official: "https://testing-library.com/docs/guiding-principles",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Testing Library 理念」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "【痛点】\n测试绑死内部 state 与 class，一重构就红，用户体验却没变。\n\n【为什么要管】\n信心来自「像用户一样用软件」。\n\n【正确做法（概要）】\nRole/Label 查询 + user-event + 断言用户可见结果。" },
      { type: "text", title: "Guiding principle", body: "The more your tests resemble the way your software is used, the more confidence they can give you.\n\n优先：getByRole / getByLabelText / getByText。\n慎用：getByTestId（最后手段）。\n避免：依赖 CSS 选择器与组件内部 state。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「React Testing Library 最小例」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "React Testing Library 最小例", lang: "tsx", code: `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Counter } from './Counter'

it('increments', async () => {
  const user = userEvent.setup()
  render(<Counter />)
  await user.click(screen.getByRole('button', { name: /加/i }))
  expect(screen.getByText('1')).toBeInTheDocument()
})` },
      { type: "text", title: "易错点（务必读）", body: "• 用 getBy 断言不存在\n• 优先 testid 忽略 a11y\n• fireEvent 代替真实输入序列\n• 测内部 state 而不是结果" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Testing Library 理念」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Role/Label 查询 + user-event + 断言用户可见结果。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://testing-library.com/docs/guiding-principles" },
      { type: "quiz", questions: [
        {
          id: "r1",
          question: "RTL 更推荐的查询？",
          options: ["document.querySelector('.x')","getByRole / getByLabelText","仅 getByTestId","enzyme shallow"],
          answer: 1,
          explain: "贴近可访问性与用户视角。",
        },
      ] },
    ],
  },
  "rtl-queries": {
    objectives: ["能用自己的话解释「查询优先级」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["用 getBy 断言不存在","优先 testid 忽略 a11y","fireEvent 代替真实输入序列","测内部 state 而不是结果"],
    takeaway: "查询优先级：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://testing-library.com/docs/queries/about",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「查询优先级」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：查询优先级。\n\n一句话：get/find/query 与 ByRole 家族。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "三类查询", body: "get*：同步，找不到就抛错。\nquery*：同步，找不到返回 null（适合断言不存在）。\nfind*：异步，等待出现（返回 Promise）。\n\n*All* 变体返回数组。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「查询对照」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "查询对照", lang: "ts", code: `// 必须存在
screen.getByRole('heading', { name: '标题' })

// 断言不存在
expect(screen.queryByText('错误')).not.toBeInTheDocument()

// 等待异步出现
await screen.findByText('加载完成')` },
      { type: "text", title: "动手 Demo", body: "下面的交互用来建立直觉。做完问自己：若这是真实 PR，我还缺哪条自动化检查？" },
      { type: "demo", kind: "rtl-query", title: "动手：选对查询", },
      { type: "text", title: "易错点（务必读）", body: "• 用 getBy 断言不存在\n• 优先 testid 忽略 a11y\n• fireEvent 代替真实输入序列\n• 测内部 state 而不是结果" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「查询优先级」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：查询优先级：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://testing-library.com/docs/queries/about" },
      { type: "quiz", questions: [
        {
          id: "q1",
          question: "断言某元素不存在用？",
          options: ["getByText","queryByText","findByText","getAllByText"],
          answer: 1,
          explain: "query 返回 null 而不抛。",
        },
        {
          id: "q2",
          question: "等待接口返回后的文案？",
          options: ["getBy","queryBy","findBy","only testid"],
          answer: 2,
          explain: "find* 自带等待。",
        },
      ] },
    ],
  },
  "rtl-user-event": {
    objectives: ["能用自己的话解释「user-event 交互」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["用 getBy 断言不存在","优先 testid 忽略 a11y","fireEvent 代替真实输入序列","测内部 state 而不是结果"],
    takeaway: "user-event 交互：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://testing-library.com/docs/user-event/intro",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「user-event 交互」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：user-event 交互。\n\n一句话：点击、输入、键盘——更接近真实用户。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "user-event vs fireEvent", body: "user-event 模拟完整事件序列（pointer、focus、input…），更真实。\nfireEvent 是底层派发，写起来短但可能漏路径。\n新项目优先 userEvent.setup()。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「输入与提交」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "输入与提交", lang: "tsx", code: `const user = userEvent.setup()
render(<LoginForm onSubmit={fn} />)
await user.type(screen.getByLabelText('邮箱'), 'a@b.com')
await user.type(screen.getByLabelText('密码'), 'secret12')
await user.click(screen.getByRole('button', { name: '登录' }))
expect(fn).toHaveBeenCalled()` },
      { type: "text", title: "动手 Demo", body: "下面的交互用来建立直觉。做完问自己：若这是真实 PR，我还缺哪条自动化检查？" },
      { type: "demo", kind: "rtl-user", title: "动手：模拟表单", },
      { type: "text", title: "易错点（务必读）", body: "• 用 getBy 断言不存在\n• 优先 testid 忽略 a11y\n• fireEvent 代替真实输入序列\n• 测内部 state 而不是结果" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「user-event 交互」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：user-event 交互：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://testing-library.com/docs/user-event/intro" },
      { type: "quiz", questions: [
        {
          id: "u1",
          question: "推荐的用户交互方式？",
          options: ["直接改 props","userEvent.setup()","只 snapshot","手动 innerHTML"],
          answer: 1,
          explain: "贴近真实交互。",
        },
      ] },
    ],
  },
  "rtl-async": {
    objectives: ["能用自己的话解释「异步 UI 与 waitFor」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["用 getBy 断言不存在","优先 testid 忽略 a11y","fireEvent 代替真实输入序列","测内部 state 而不是结果"],
    takeaway: "异步 UI 与 waitFor：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://testing-library.com/docs/dom-testing-library/api-async",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「异步 UI 与 waitFor」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：异步 UI 与 waitFor。\n\n一句话：加载态、请求后更新、act 警告处理。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "异步渲染", body: "数据请求后 UI 更新：用 findBy 或 waitFor。\nmock fetch / MSW 控制网络。\n出现 act(...) 警告通常是：状态更新未包在已 await 的交互或 waitFor 里。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「MSW 或 mock fetch」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "MSW 或 mock fetch", lang: "ts", code: `vi.spyOn(global, 'fetch').mockResolvedValue(
  new Response(JSON.stringify({ name: 'Ada' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  }),
)
render(<Profile id="1" />)
expect(await screen.findByText('Ada')).toBeInTheDocument()` },
      { type: "text", title: "易错点（务必读）", body: "• 用 getBy 断言不存在\n• 优先 testid 忽略 a11y\n• fireEvent 代替真实输入序列\n• 测内部 state 而不是结果" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「异步 UI 与 waitFor」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：异步 UI 与 waitFor：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://testing-library.com/docs/dom-testing-library/api-async" },
      { type: "quiz", questions: [
        {
          id: "ra1",
          question: "等待异步文案出现优先？",
          options: ["sleep(3000)","findByText","getByText 立刻","忽略"],
          answer: 1,
          explain: "findBy 内置重试等待。",
        },
      ] },
    ],
  },
  "rtl-which-query": {
    objectives: ["能用自己的话解释「Which Query 完整优先级」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["用 getBy 断言不存在","优先 testid 忽略 a11y","fireEvent 代替真实输入序列","测内部 state 而不是结果"],
    takeaway: "Which Query 完整优先级：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://testing-library.com/docs/queries/about/#priority",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Which Query 完整优先级」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Which Query 完整优先级。\n\n一句话：官方推荐顺序：Role → Label → Placeholder → Text → DisplayValue → Alt → Title → TestId。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "官方优先级（queries/about）", body: "1. getByRole（可访问名 / name 选项）\n2. getByLabelText（表单）\n3. getByPlaceholderText\n4. getByText\n5. getByDisplayValue\n6. getByAltText\n7. getByTitle\n8. getByTestId（最后手段）\n\n语义化查询 = 更好 a11y + 更抗重构。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「对照」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "对照", lang: "tsx", code: `// 好
screen.getByRole('button', { name: /提交/i })
screen.getByLabelText('邮箱')

// 勉强
screen.getByTestId('submit-btn')

// 差
container.querySelector('.btn.btn-primary')` },
      { type: "text", title: "易错点（务必读）", body: "• 用 getBy 断言不存在\n• 优先 testid 忽略 a11y\n• fireEvent 代替真实输入序列\n• 测内部 state 而不是结果" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Which Query 完整优先级」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Which Query 完整优先级：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://testing-library.com/docs/queries/about/#priority" },
      { type: "quiz", questions: [
        {
          id: "wq1",
          question: "最后才用的查询？",
          options: ["getByRole","getByLabelText","getByTestId","getByText"],
          answer: 2,
          explain: "TestId 是逃生舱。",
        },
      ] },
    ],
  },
  "rtl-a11y": {
    objectives: ["能用自己的话解释「可访问性与 Role」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["用 getBy 断言不存在","优先 testid 忽略 a11y","fireEvent 代替真实输入序列","测内部 state 而不是结果"],
    takeaway: "可访问性与 Role：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「可访问性与 Role」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：可访问性与 Role。\n\n一句话：name、hidden、level、jest-dom 匹配器。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "Role 的力量", body: "getByRole 依赖可访问树。按钮要有可访问名（文本或 aria-label）。heading 可用 { level: 1 }。\n\n扩展：@testing-library/jest-dom 的 toBeInTheDocument、toBeVisible、toHaveAccessibleName 等。\n测 a11y 不是额外工作——它就是更好的选择器。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「可访问断言」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "可访问断言", lang: "ts", code: `expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('设置')
expect(screen.getByRole('button', { name: '保存' })).toBeEnabled()` },
      { type: "text", title: "易错点（务必读）", body: "• 用 getBy 断言不存在\n• 优先 testid 忽略 a11y\n• fireEvent 代替真实输入序列\n• 测内部 state 而不是结果" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「可访问性与 Role」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：可访问性与 Role：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "quiz", questions: [
        {
          id: "a11y1",
          question: "按钮没有可见文本时应用？",
          options: ["随便 class","aria-label / aria-labelledby","只靠坐标","隐藏 DOM"],
          answer: 1,
          explain: "提供可访问名。",
        },
      ] },
    ],
  },
  "rtl-frameworks": {
    objectives: ["能用自己的话解释「多框架与 MSW」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["用 getBy 断言不存在","优先 testid 忽略 a11y","fireEvent 代替真实输入序列","测内部 state 而不是结果"],
    takeaway: "多框架与 MSW：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「多框架与 MSW」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：多框架与 MSW。\n\n一句话：React/Vue 包装差异；MSW 拦网络。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "同一查询理念", body: "React：@testing-library/react 的 render / screen。\nVue：@testing-library/vue。\n核心仍是 DOM Testing Library。\n\n网络：MSW（Mock Service Worker）在请求层 mock，组件测与部分 E2E 可复用 handler。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「MSW 概念」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "MSW 概念", lang: "ts", code: `import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  http.get('/api/user', () => HttpResponse.json({ name: 'Ada' })),
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())` },
      { type: "text", title: "易错点（务必读）", body: "• 用 getBy 断言不存在\n• 优先 testid 忽略 a11y\n• fireEvent 代替真实输入序列\n• 测内部 state 而不是结果" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「多框架与 MSW」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：多框架与 MSW：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "quiz", questions: [
        {
          id: "fw1",
          question: "MSW 拦截位置？",
          options: ["仅 CSS","网络请求层","TypeScript 编译","Git hooks"],
          answer: 1,
          explain: "在 fetch/XHR 层返回 mock。",
        },
      ] },
    ],
  },
  "rtl-within-debug": {
    objectives: ["能用自己的话解释「within / 调试查询」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["用 getBy 断言不存在","优先 testid 忽略 a11y","fireEvent 代替真实输入序列","测内部 state 而不是结果"],
    takeaway: "within / 调试查询：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://testing-library.com/docs/dom-testing-library/api-within",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「within / 调试查询」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：within / 调试查询。\n\n一句话：官网 within + debug + screen.debug。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "within", body: "在容器子树内查询，避免页面多处相同 role 冲突：within(dialog).getByRole('button', {name:'确认'})。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "调试", body: "screen.debug() 打印 DOM；screen.logTestingPlaygroundURL() 辅助选查询；配置 testIdAttribute。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「within」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "within", lang: "tsx", code: `import { render, screen, within } from '@testing-library/react'

render(<App />)
const dialog = screen.getByRole('dialog')
await user.click(within(dialog).getByRole('button', { name: '确认' }))` },
      { type: "text", title: "易错点（务必读）", body: "• 用 getBy 断言不存在\n• 优先 testid 忽略 a11y\n• fireEvent 代替真实输入序列\n• 测内部 state 而不是结果" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「within / 调试查询」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：within / 调试查询：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://testing-library.com/docs/dom-testing-library/api-within" },
      { type: "quiz", questions: [
        {
          id: "rtl-within-debug-0",
          question: "多个相同按钮时？",
          options: ["用第一个 querySelector","within(容器) 缩小范围","随机点","只用 testid 到处"],
          answer: 1,
          explain: "within 限定子树。",
        },
      ] },
    ],
  },
  "rtl-disappearance": {
    objectives: ["能用自己的话解释「元素消失与 waitForElementToBeRemoved」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["用 getBy 断言不存在","优先 testid 忽略 a11y","fireEvent 代替真实输入序列","测内部 state 而不是结果"],
    takeaway: "元素消失与 waitForElementToBeRemoved：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://testing-library.com/docs/guide-disappearance",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「元素消失与 waitForElementToBeRemoved」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：元素消失与 waitForElementToBeRemoved。\n\n一句话：官网 guide-disappearance。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "断言消失", body: "queryBy* 在断言「当前不存在」；等待移除用 waitForElementToBeRemoved 或 waitFor(() => expect(query).not.toBeInTheDocument())。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "陷阱", body: "getBy* 在元素不存在时直接抛错，不能用来「等它消失」。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「代码示例」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "示例", lang: "ts", code: `import { waitForElementToBeRemoved, screen } from '@testing-library/react'

await user.click(screen.getByRole('button', { name: '关闭' }))
await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))` },
      { type: "text", title: "易错点（务必读）", body: "• 用 getBy 断言不存在\n• 优先 testid 忽略 a11y\n• fireEvent 代替真实输入序列\n• 测内部 state 而不是结果" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「元素消失与 waitForElementToBeRemoved」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：元素消失与 waitForElementToBeRemoved：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://testing-library.com/docs/guide-disappearance" },
      { type: "quiz", questions: [
        {
          id: "rtl-disappearance-0",
          question: "等待元素移除用？",
          options: ["getByRole 循环","waitForElementToBeRemoved / waitFor + query","sleep(9999)","location.reload"],
          answer: 1,
          explain: "专用移除等待。",
        },
      ] },
    ],
  },
  "rtl-custom-queries": {
    objectives: ["能用自己的话解释「自定义 Queries 与配置」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["用 getBy 断言不存在","优先 testid 忽略 a11y","fireEvent 代替真实输入序列","测内部 state 而不是结果"],
    takeaway: "自定义 Queries 与配置：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://testing-library.com/docs/dom-testing-library/api-custom-queries",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「自定义 Queries 与配置」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：自定义 Queries 与配置。\n\n一句话：官网 custom-queries + configuration。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "自定义", body: "团队可扩展 query 绑定设计系统（getByDesignId）。优先仍用 Role/Label；自定义是补充。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "configure", body: "asyncUtilTimeout、defaultHidden、testIdAttribute 等全局默认。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「configure」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "configure", lang: "ts", code: `import { configure } from '@testing-library/react'
configure({ testIdAttribute: 'data-test' })` },
      { type: "text", title: "易错点（务必读）", body: "• 用 getBy 断言不存在\n• 优先 testid 忽略 a11y\n• fireEvent 代替真实输入序列\n• 测内部 state 而不是结果" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「自定义 Queries 与配置」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：自定义 Queries 与配置：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://testing-library.com/docs/dom-testing-library/api-custom-queries" },
      { type: "quiz", questions: [
        {
          id: "rtl-custom-queries-0",
          question: "自定义 query 应？",
          options: ["取代所有 role","作为语义查询不足时的补充","禁止使用","只用于 CSS"],
          answer: 1,
          explain: "补充而非替代。",
        },
      ] },
    ],
  },
  "rtl-accessibility-api": {
    objectives: ["能用自己的话解释「Accessibility 查询与 a11y 工具」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["用 getBy 断言不存在","优先 testid 忽略 a11y","fireEvent 代替真实输入序列","测内部 state 而不是结果"],
    takeaway: "Accessibility 查询与 a11y 工具：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://testing-library.com/docs/dom-testing-library/api-accessibility",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Accessibility 查询与 a11y 工具」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Accessibility 查询与 a11y 工具。\n\n一句话：官网 api-accessibility 与 jest-dom a11y 匹配器。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "可访问查询", body: "getByRole 选项：name、hidden、selected、checked、pressed、level。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "配套", body: "eslint-plugin-testing-library、jest-dom 的 toHaveAccessibleName / toHaveAccessibleDescription；E2E 再用 axe。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「role 选项」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "role 选项", lang: "ts", code: `screen.getByRole('heading', { level: 2, name: '账单' })
screen.getByRole('checkbox', { checked: true, name: '记住我' })` },
      { type: "text", title: "易错点（务必读）", body: "• 用 getBy 断言不存在\n• 优先 testid 忽略 a11y\n• fireEvent 代替真实输入序列\n• 测内部 state 而不是结果" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Accessibility 查询与 a11y 工具」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Accessibility 查询与 a11y 工具：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://testing-library.com/docs/dom-testing-library/api-accessibility" },
      { type: "quiz", questions: [
        {
          id: "rtl-accessibility-api-0",
          question: "heading 指定级别用？",
          options: ["className","{ level: n }","Math.random","xpath"],
          answer: 1,
          explain: "level 选项。",
        },
      ] },
    ],
  },
  "pw-intro": {
    objectives: ["能用自己的话解释「Playwright 入门」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "Playwright 入门：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/intro",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Playwright 入门」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Playwright 入门。\n\n一句话：现代 E2E：多浏览器、自动等待、强断言。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "为何选 Playwright", body: "Microsoft 维护；Chromium / Firefox / WebKit；自动等待；trace / 视频 / 截图调试强大；API 测试与组件实验性支持。\n适合主路径 E2E 与跨浏览器回归。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「初始化」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "初始化", lang: "bash", code: `npm init playwright@latest
npx playwright test
npx playwright show-report` },
      { type: "text", title: "怎么读这段代码", body: "下面是「第一个 E2E」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "第一个 E2E", lang: "ts", code: `import { test, expect } from '@playwright/test'

test('homepage has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Learning Testing/)
  await page.getByRole('link', { name: '课程' }).click()
})` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Playwright 入门」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Playwright 入门：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/intro" },
      { type: "quiz", questions: [
        {
          id: "pw1",
          question: "Playwright 内置自动？",
          options: ["部署","等待可交互/可见","写业务代码","设计 UI"],
          answer: 1,
          explain: "actionability 自动等待是核心能力。",
        },
      ] },
    ],
  },
  "pw-locators": {
    objectives: ["能用自己的话解释「Locator 策略」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "Locator 策略：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/locators",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Locator 策略」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Locator 策略。\n\n一句话：getByRole 优先，避免脆弱 CSS。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "定位优先级", body: "1. getByRole（可访问名）\n2. getByLabel / getByPlaceholder / getByText\n3. getByTestId\n4. CSS/XPath 最后\n\nLocator 惰性且可重试，配合 auto-wait。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「稳健定位」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "稳健定位", lang: "ts", code: `await page.getByRole('button', { name: '提交' }).click()
await page.getByLabel('邮箱').fill('a@b.com')
await page.getByTestId('nav-settings').click() // 必要时` },
      { type: "text", title: "动手 Demo", body: "下面的交互用来建立直觉。做完问自己：若这是真实 PR，我还缺哪条自动化检查？" },
      { type: "demo", kind: "playwright-locator", title: "动手：选定位器", },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Locator 策略」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Locator 策略：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/locators" },
      { type: "quiz", questions: [
        {
          id: "l1",
          question: "最推荐的定位？",
          options: ["page.locator('div > span:nth-child(3)')","getByRole + name","绝对 XPath","坐标点击"],
          answer: 1,
          explain: "语义化、抗重构。",
        },
      ] },
    ],
  },
  "pw-assertions": {
    objectives: ["能用自己的话解释「Web-First 断言」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "用 expect(locator).toBeVisible/toHaveText 等 web-first API。",
    official: "https://playwright.dev/docs/test-assertions",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Web-First 断言」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "【痛点】\n先 textContent 再 toBe，请求慢一点就 flaky。\n\n【为什么要管】\nUI 异步，断言需要重试直到超时。\n\n【正确做法（概要）】\n用 expect(locator).toBeVisible/toHaveText 等 web-first API。" },
      { type: "text", title: "Web-first assertions", body: "Playwright 的 expect(locator)... 会自动重试直到超时，适配异步 UI。\n不要先取 textContent 再 toBe——会丢重试。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「对 vs 错」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "对 vs 错", lang: "ts", code: `// 好：自动重试
await expect(page.getByText('成功')).toBeVisible()

// 差：一次性取值，易 flaky
const t = await page.locator('.msg').textContent()
expect(t).toBe('成功')` },
      { type: "text", title: "动手 Demo", body: "下面的交互用来建立直觉。做完问自己：若这是真实 PR，我还缺哪条自动化检查？" },
      { type: "demo", kind: "playwright-assert", title: "动手：正确断言写法", },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Web-First 断言」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：用 expect(locator).toBeVisible/toHaveText 等 web-first API。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/test-assertions" },
      { type: "quiz", questions: [
        {
          id: "pa1",
          question: "web-first 断言的优势？",
          options: ["更快失败","自动重试直到条件满足","不需要 await","只能测 API"],
          answer: 1,
          explain: "适配异步 DOM 更新。",
        },
      ] },
    ],
  },
  "pw-network": {
    objectives: ["能用自己的话解释「网络拦截与 Fixture」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "网络拦截与 Fixture：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/network",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「网络拦截与 Fixture」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：网络拦截与 Fixture。\n\n一句话：route、storageState、项目配置。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "控制边界", body: "page.route 可 mock API、模拟慢网/失败。\nstorageState 复用登录态，避免每测都走登录。\nproject 配置多浏览器与不同 baseURL。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「Mock API」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "Mock API", lang: "ts", code: `await page.route('**/api/user', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ name: 'Ada' }),
  })
})
await page.goto('/profile')
await expect(page.getByText('Ada')).toBeVisible()` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「网络拦截与 Fixture」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：网络拦截与 Fixture：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/network" },
      { type: "quiz", questions: [
        {
          id: "n1",
          question: "storageState 常用于？",
          options: ["存截图","复用登录会话","压缩 JS","生成覆盖率"],
          answer: 1,
          explain: "跳过重复登录，加速 E2E。",
        },
      ] },
    ],
  },
  "pw-debug": {
    objectives: ["能用自己的话解释「调试 Trace 与 UI Mode」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "调试 Trace 与 UI Mode：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/trace-viewer",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「调试 Trace 与 UI Mode」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：调试 Trace 与 UI Mode。\n\n一句话：失败可回放：trace、headed、codegen。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "失败时可观测", body: "npx playwright test --debug\nUI Mode 逐步看动作。\ntrace: 'on-first-retry' 在 CI 重试时留证据。\ncodegen 录制定位器草稿，再人工改稳健。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「常用调试命令」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "常用调试命令", lang: "bash", code: `npx playwright test --ui
npx playwright test --debug
npx playwright show-trace trace.zip
npx playwright codegen http://localhost:8080` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「调试 Trace 与 UI Mode」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：调试 Trace 与 UI Mode：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/trace-viewer" },
      { type: "quiz", questions: [
        {
          id: "d1",
          question: "trace 的价值？",
          options: ["美化报告封面","回放步骤、网络与 DOM 快照","替代单元测试","自动修 bug"],
          answer: 1,
          explain: "失败现场可复盘。",
        },
      ] },
    ],
  },
  "pw-fixtures": {
    objectives: ["能用自己的话解释「Fixtures 与 test.extend」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "Fixtures 与 test.extend：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/test-fixtures",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Fixtures 与 test.extend」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Fixtures 与 test.extend。\n\n一句话：内置 page/context；自定义 fixture 与作用域。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "依赖注入式测试", body: "Playwright Test 用 fixture 注入 page、context、browser、request。\ntest.extend 可封装登录用户、API client、临时数据，并声明 scope（test/worker）。\n\n官方：https://playwright.dev/docs/test-fixtures" },
      { type: "text", title: "怎么读这段代码", body: "下面是「自定义 fixture」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "自定义 fixture", lang: "ts", code: `import { test as base, expect } from '@playwright/test'

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
})` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Fixtures 与 test.extend」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Fixtures 与 test.extend：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/test-fixtures" },
      { type: "quiz", questions: [
        {
          id: "fx1",
          question: "fixture 的核心价值？",
          options: ["替代断言","可组合的测试前置/资源注入","只用于截图","关闭并行"],
          answer: 1,
          explain: "隔离与复用 setup。",
        },
      ] },
    ],
  },
  "pw-auth": {
    objectives: ["能用自己的话解释「登录态与 storageState」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "登录态与 storageState：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/auth",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「登录态与 storageState」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：登录态与 storageState。\n\n一句话：global setup 登录一次，多测复用 cookie。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "别每个用例手点登录", body: "官方 Authentication 指南：setup 项目登录 → 保存 storageState → 依赖项目复用。\n或 API 登录拿 cookie 写入 context。\n敏感环境用独立测试账号。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「保存状态」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "保存状态", lang: "ts", code: `// setup
await page.goto('/login')
await page.getByLabel('Email').fill(process.env.USER!)
await page.getByLabel('Password').fill(process.env.PASS!)
await page.getByRole('button', { name: 'Sign in' }).click()
await page.context().storageState({ path: 'playwright/.auth/user.json' })

// playwright.config.ts
// projects: [{ name: 'setup', testMatch: /.*\\.setup\\.ts/ },
//   { name: 'chromium', dependencies: ['setup'], use: { storageState: '...' } }]` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「登录态与 storageState」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：登录态与 storageState：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/auth" },
      { type: "quiz", questions: [
        {
          id: "au1",
          question: "storageState 保存的是？",
          options: ["仅截图","cookies / localStorage 等会话","源码","覆盖率"],
          answer: 1,
          explain: "浏览器存储的会话状态。",
        },
      ] },
    ],
  },
  "pw-api-visual": {
    objectives: ["能用自己的话解释「API 测试与视觉对比」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "API 测试与视觉对比：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/api-testing",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「API 测试与视觉对比」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：API 测试与视觉对比。\n\n一句话：request fixture；toHaveScreenshot。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "不止 UI", body: "API testing：APIRequestContext（request fixture）发 HTTP，可与 UI 混合（先 API 造数再 UI 验证）。\n视觉：expect(page).toHaveScreenshot() / locator 截图；注意字体、动画、动态数据需屏蔽。\n\n文档：api-testing、test-snapshots。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「API + 截图」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "API + 截图", lang: "ts", code: `test('create via API', async ({ request, page }) => {
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
})` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「API 测试与视觉对比」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：API 测试与视觉对比：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/api-testing" },
      { type: "quiz", questions: [
        {
          id: "av1",
          question: "视觉测试需注意？",
          options: ["忽略字体与动态区域","固定动画/动态数据，控制环境","永远 0 阈值","只在本地看一眼"],
          answer: 1,
          explain: "稳定基线才能有意义。",
        },
      ] },
    ],
  },
  "pw-agents-mcp": {
    objectives: ["能用自己的话解释「Test Agents 与 MCP」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "Test Agents 与 MCP：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/test-agents",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Test Agents 与 MCP」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Test Agents 与 MCP。\n\n一句话：planner / generator / healer；Playwright MCP。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "面向 LLM 的测试工作流", body: "Playwright Test Agents（1.56+）：\n- planner：探索应用 → Markdown 测试计划\n- generator：计划 → 测试代码\n- healer：跑测并尝试修复失败\n\nnpx playwright init-agents --loop=vscode\n\nPlaywright MCP：通过 Model Context Protocol 让 LLM 用可访问性快照操作浏览器（非纯截图 vision）。\n\n文档：/docs/test-agents 、/docs/getting-started-mcp" },
      { type: "text", title: "怎么读这段代码", body: "下面是「初始化 agents」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "初始化 agents", lang: "bash", code: `npx playwright init-agents --loop=vscode
# 或 claude / other loops 见官方` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Test Agents 与 MCP」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Test Agents 与 MCP：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/test-agents" },
      { type: "tip", body: "Agent 生成的代码仍需人审：定位器是否稳健、是否测到实现细节、敏感操作是否安全。" },
      { type: "quiz", questions: [
        {
          id: "ag1",
          question: "healer agent 的职责？",
          options: ["只写 README","执行测试并尝试修复失败用例","部署生产","替换 fixture"],
          answer: 1,
          explain: "跑测 + 修复循环。",
        },
      ] },
    ],
  },
  "pw-best-practices": {
    objectives: ["能用自己的话解释「Playwright 最佳实践」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "Playwright 最佳实践：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/best-practices",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Playwright 最佳实践」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Playwright 最佳实践。\n\n一句话：官方 best-practices：隔离、定位、断言、测试独立性。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "高频准则", body: "1. 测试独立，可任意顺序并行\n2. 用 web-first 断言\n3. 优先用户可见定位\n4. 少用 page.waitForTimeout\n5. 软断言 toPass 谨慎\n6. 调试靠 trace 不是加 sleep\n\n完整列表：https://playwright.dev/docs/best-practices" },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Playwright 最佳实践」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Playwright 最佳实践：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/best-practices" },
      { type: "quiz", questions: [
        {
          id: "bp1",
          question: "官方反对的常见写法？",
          options: ["getByRole","固定 waitForTimeout 当同步手段","expect(locator).toBeVisible()","storageState"],
          answer: 1,
          explain: "固定等待导致慢与 flaky。",
        },
      ] },
    ],
  },
  "pw-codegen": {
    objectives: ["能用自己的话解释「Codegen 录制测试」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "Codegen 录制测试：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/codegen",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Codegen 录制测试」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Codegen 录制测试。\n\n一句话：官网 codegen：用生成器快速得到定位器草稿。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "做什么", body: "npx playwright codegen URL 打开录制器，操作生成脚本。输出是起点，需人工改为稳健 getByRole、去掉冗余等待。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "VS Code", body: "官方 Getting started with VS Code 可边录边跑。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「命令」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "命令", lang: "bash", code: `npx playwright codegen https://demo.playwright.dev/todomvc
npx playwright codegen --target=javascript
npx playwright codegen --viewport-size=390,844` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Codegen 录制测试」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Codegen 录制测试：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/codegen" },
      { type: "quiz", questions: [
        {
          id: "pw-codegen-0",
          question: "codegen 产物应？",
          options: ["原样永不改","审阅并改为语义定位/删冗余","当作生产密钥","删除 package.json"],
          answer: 1,
          explain: "人工审阅必须。",
        },
      ] },
    ],
  },
  "pw-pom": {
    objectives: ["能用自己的话解释「Page Object Model」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "class 注入 page → 字段存 Locator → 方法是用户动作；断言团队统一放测或 POM。",
    official: "https://playwright.dev/docs/pom",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Page Object Model」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "【痛点】\n选择器与点击步骤在 20 个文件里复制粘贴，文案一改炸一片。\n\n【为什么要管】\n页面对象把「怎么操作这个页面」收成一处 API，测试只叙述业务故事。\n\n【正确做法（概要）】\nclass 注入 page → 字段存 Locator → 方法是用户动作；断言团队统一放测或 POM。" },
      { type: "text", title: "动机", body: "大套件用 POM：选择器集中、操作复用、测试读起来像业务语言。每个重要页面/组件一块 API。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "要点", body: "构造注入 Page；字段存 Locator；方法返回 void 或其它 Page Object；断言可在 POM 或测试中（团队统一）。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「代码示例」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
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
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Page Object Model」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：class 注入 page → 字段存 Locator → 方法是用户动作；断言团队统一放测或 POM。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/pom" },
      { type: "quiz", questions: [
        {
          id: "pw-pom-0",
          question: "POM 主要收益？",
          options: ["加密流量","集中选择器与可复用页面 API","取消断言","强制 sleep"],
          answer: 1,
          explain: "可维护性。",
        },
      ] },
    ],
  },
  "pw-actionability": {
    objectives: ["能用自己的话解释「Actionability 自动等待检查」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "信任自动等待 + web-first 断言；force 仅调试，产品测试不要靠它假绿。",
    official: "https://playwright.dev/docs/actionability",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Actionability 自动等待检查」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "【痛点】\n到处 waitForTimeout，有时绿有时红，谁也说不清等够没有。\n\n【为什么要管】\nPlaywright 在 click/fill 前会做可见/稳定/可点等检查，条件满足才动手。\n\n【正确做法（概要）】\n信任自动等待 + web-first 断言；force 仅调试，产品测试不要靠它假绿。" },
      { type: "text", title: "自动检查", body: "locator.click 前：唯一匹配、Visible、Stable（动画结束）、Receives Events（未被遮挡）、Enabled。fill 还要求 Editable。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "Force", body: "force: true 跳过部分检查——仅排查用，产品测试应修页面或定位。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "启示", body: "少手写 waitForTimeout；让 actionability + web-first 断言工作。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Actionability 自动等待检查」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：信任自动等待 + web-first 断言；force 仅调试，产品测试不要靠它假绿。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/actionability" },
      { type: "quiz", questions: [
        {
          id: "pw-actionability-0",
          question: "click 前不会检查？",
          options: ["Visible","Stable","Git commit 哈希","Enabled"],
          answer: 2,
          explain: "与 DOM 可操作性相关。",
        },
      ] },
    ],
  },
  "pw-clock": {
    objectives: ["能用自己的话解释「Clock 控制时间」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "Clock 控制时间：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/clock",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Clock 控制时间」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Clock 控制时间。\n\n一句话：官网 clock：setFixedTime / install / fastForward。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "用途", body: "测倒计时、营业时间、动画调度，无需真等。page.clock 覆盖 Date、timer、rAF 等。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "推荐", body: "优先 setFixedTime；需要暂停/快进再用 install（且须在其它 clock 调用前）。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「代码示例」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "示例", lang: "ts", code: `test('offer expires', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-01-01T10:00:00'))
  await page.goto('/offer')
  await page.clock.fastForward('30:00')
  await expect(page.getByText('已过期')).toBeVisible()
})` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Clock 控制时间」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Clock 控制时间：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/clock" },
      { type: "quiz", questions: [
        {
          id: "pw-clock-0",
          question: "控制时间首选？",
          options: ["sleep 真实半小时","page.clock.setFixedTime / install","改系统 BIOS","忽略断言"],
          answer: 1,
          explain: "Clock API。",
        },
      ] },
    ],
  },
  "pw-parallel-shard": {
    objectives: ["能用自己的话解释「并行、分片与重试」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "并行、分片与重试：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/test-sharding",
    minutes: 11,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「并行、分片与重试」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：并行、分片与重试。\n\n一句话：官网 parallel + sharding + retries。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "并行", body: "默认文件级并行；workers 配置。测试必须独立。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "分片", body: "CI 多机：--shard=1/4 … 完整覆盖。配合 blob reporter 合并报告。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "重试", body: "retries 仅掩盖偶发？应先修 flaky。可用于收集 trace 再失败。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「CI」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "CI", lang: "bash", code: `npx playwright test --shard=$SHARD_INDEX/$SHARD_TOTAL
npx playwright test --retries=2
# playwright.config.ts: workers: process.env.CI ? 2 : undefined` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「并行、分片与重试」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：并行、分片与重试：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/test-sharding" },
      { type: "quiz", questions: [
        {
          id: "pw-parallel-shard-0",
          question: "shard 的作用？",
          options: ["加密截图","把全量测试拆到多机并行","删除失败","只跑 skipped"],
          answer: 1,
          explain: "水平扩展 CI。",
        },
      ] },
    ],
  },
  "pw-dialogs-downloads": {
    objectives: ["能用自己的话解释「对话框与下载」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "对话框与下载：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/dialogs",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「对话框与下载」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：对话框与下载。\n\n一句话：官网 dialogs + downloads。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "Dialog", body: "page.on('dialog') 或 page.waitForEvent('dialog') 处理 alert/confirm/prompt；需先监听再触发。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "Download", body: "建议等 download 事件再 assert path；用 suggestedFilename。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「代码示例」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
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
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「对话框与下载」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：对话框与下载：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/dialogs" },
      { type: "quiz", questions: [
        {
          id: "pw-dialogs-downloads-0",
          question: "处理 dialog 要点？",
          options: ["先点后监听即可","先注册监听再触发","忽略","只用 CSS"],
          answer: 1,
          explain: "先监听。",
        },
      ] },
    ],
  },
  "pw-frames-context": {
    objectives: ["能用自己的话解释「Frame 与 BrowserContext」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "Frame 与 BrowserContext：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/frames",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Frame 与 BrowserContext」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Frame 与 BrowserContext。\n\n一句话：官网 frames + browser-contexts。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "Frame", body: "iframe 用 frameLocator / frame。主 page 定位器进不去子 frame。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "Context", body: "独立 cookie/storage 的会话；多用户并行互不污染。storageState 按 context 加载。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「frameLocator」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "frameLocator", lang: "ts", code: `const frame = page.frameLocator('#stripe-frame')
await frame.getByLabel('Card').fill('4242')

const context = await browser.newContext({ storageState: 'admin.json' })
const page = await context.newPage()` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Frame 与 BrowserContext」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Frame 与 BrowserContext：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/frames" },
      { type: "quiz", questions: [
        {
          id: "pw-frames-context-0",
          question: "iframe 内元素应？",
          options: ["page.getBy 直接盲点","frameLocator/frame 进入","忽略 iframe","只截图"],
          answer: 1,
          explain: "进入 frame。",
        },
      ] },
    ],
  },
  "pw-parameterize-webserver": {
    objectives: ["能用自己的话解释「参数化与 webServer」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "参数化与 webServer：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/test-webserver",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「参数化与 webServer」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：参数化与 webServer。\n\n一句话：官网 test-parameterize + test-webserver。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "参数化", body: "for 循环 / test.describe 数据表生成多例；或项目级 projects 多浏览器。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "webServer", body: "config.webServer 在测前拉起 dev/preview，url 就绪再跑，CI 本地一致。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「webServer」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "webServer", lang: "ts", code: `export default defineConfig({
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
})` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「参数化与 webServer」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：参数化与 webServer：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/test-webserver" },
      { type: "quiz", questions: [
        {
          id: "pw-parameterize-webserver-0",
          question: "webServer 用途？",
          options: ["发邮件","测试前自动启动被测应用","编译内核","替代 git"],
          answer: 1,
          explain: "启动应用。",
        },
      ] },
    ],
  },
  "pw-emulation-media": {
    objectives: ["能用自己的话解释「设备模拟、截图与视频」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "设备模拟、截图与视频：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/emulation",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「设备模拟、截图与视频」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：设备模拟、截图与视频。\n\n一句话：官网 emulation + screenshots + videos。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "模拟", body: "devices['iPhone 13']、locale、timezoneId、colorScheme、geolocation、permissions。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "截图", body: "page.screenshot / locator.screenshot；全页 fullPage。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "视频", body: "use.video: 'on' | 'retain-on-failure'；失败保留最实用。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「设备」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "设备", lang: "ts", code: `import { devices } from '@playwright/test'
export default defineConfig({
  projects: [{
    name: 'Mobile Safari',
    use: { ...devices['iPhone 13'] },
  }],
  use: { video: 'retain-on-failure', screenshot: 'only-on-failure' },
})` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「设备模拟、截图与视频」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：设备模拟、截图与视频：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/emulation" },
      { type: "quiz", questions: [
        {
          id: "pw-emulation-media-0",
          question: "CI 视频策略常见？",
          options: ["永远全开占满磁盘","retain-on-failure","禁止任何证据","只录音频"],
          answer: 1,
          explain: "失败保留。",
        },
      ] },
    ],
  },
  "pw-a11y-axe": {
    objectives: ["能用自己的话解释「无障碍测试（axe）」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "无障碍测试（axe）：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/accessibility-testing",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「无障碍测试（axe）」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：无障碍测试（axe）。\n\n一句话：官网 accessibility-testing。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "做法", body: "@axe-core/playwright 扫描页面，断言无严重违规。与 getByRole 策略互补：一个防回归违规，一个日常定位。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "范围", body: "关键页/关键流扫；动态路由切换后重新 scan。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「概念」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "概念", lang: "ts", code: `import AxeBuilder from '@axe-core/playwright'

const results = await new AxeBuilder({ page }).analyze()
expect(results.violations).toEqual([])` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「无障碍测试（axe）」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：无障碍测试（axe）：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/accessibility-testing" },
      { type: "quiz", questions: [
        {
          id: "pw-a11y-axe-0",
          question: "axe 主要发现？",
          options: ["TypeScript 类型错误","a11y 规则违规","CSS 压缩率","npm 漏洞 CVE 列表（专门）"],
          answer: 1,
          explain: "无障碍违规。",
        },
      ] },
    ],
  },
  "pw-aria-snapshots": {
    objectives: ["能用自己的话解释「Playwright ARIA Snapshots」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "Playwright ARIA Snapshots：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/aria-snapshots",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Playwright ARIA Snapshots」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Playwright ARIA Snapshots。\n\n一句话：官网 aria-snapshots：可访问树快照断言。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "是什么", body: "toMatchAriaSnapshot 锁定角色树，抗 CSS 重构、敏于 a11y 倒退。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "更新", body: "变更需 Review，像视觉基线一样管理。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「代码示例」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "示例", lang: "ts", code: `await expect(page.getByRole('navigation')).toMatchAriaSnapshot(\`
  - navigation:
    - link "Docs"
    - link "API"
\`)` },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Playwright ARIA Snapshots」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Playwright ARIA Snapshots：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/aria-snapshots" },
      { type: "quiz", questions: [
        {
          id: "pw-aria-snapshots-0",
          question: "ARIA snapshot 怕的是？",
          options: ["换主题色","可访问结构/名称被改坏","换 CDN","改 README 错别字"],
          answer: 1,
          explain: "结构与名称。",
        },
      ] },
    ],
  },
  "pw-component-testing": {
    objectives: ["能用自己的话解释「Playwright 组件测试（实验）」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["waitForTimeout 当同步","脆弱 CSS/XPath","用例共享脏登录态","失败不留 trace"],
    takeaway: "Playwright 组件测试（实验）：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://playwright.dev/docs/test-components",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Playwright 组件测试（实验）」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Playwright 组件测试（实验）。\n\n一句话：官网 test-components：在 PW 中测组件。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "定位", body: "Playwright 提供组件测试实验能力；与 Vitest Browser Mode 组件测目标类似，选型看栈。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "原则", body: "仍用用户可见角色定位；隔离依赖；真浏览器事件。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "易错点（务必读）", body: "• waitForTimeout 当同步\n• 脆弱 CSS/XPath\n• 用例共享脏登录态\n• 失败不留 trace" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Playwright 组件测试（实验）」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Playwright 组件测试（实验）：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://playwright.dev/docs/test-components" },
      { type: "quiz", questions: [
        {
          id: "pw-component-testing-0",
          question: "组件测与 E2E 比？",
          options: ["更慢更整站","更小更快、隔离组件","无法点按钮","没有断言"],
          answer: 1,
          explain: "隔离更快。",
        },
      ] },
    ],
  },
  "puppeteer-intro": {
    objectives: ["能用自己的话解释「Puppeteer 基础」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["忘记 browser.close 泄漏","用硬 sleep 等导航","与 PW 场景选型混乱"],
    takeaway: "Puppeteer 基础：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://pptr.dev/guides/getting-started",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Puppeteer 基础」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Puppeteer 基础。\n\n一句话：Chrome DevTools Protocol 控制浏览器。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "Puppeteer 定位", body: "Google 的无头 Chrome 自动化库。强项：截图、PDF、爬虫脚本、DevTools 级控制。\nE2E 产品测试现在更常选 Playwright（多浏览器、断言、并行）。\n了解 Puppeteer 有助于读懂大量存量脚本与 SSR 截图管线。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「最小脚本」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "最小脚本", lang: "ts", code: `import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.goto('https://example.com', { waitUntil: 'networkidle2' })
await page.screenshot({ path: 'example.png' })
await browser.close()` },
      { type: "text", title: "动手 Demo", body: "下面的交互用来建立直觉。做完问自己：若这是真实 PR，我还缺哪条自动化检查？" },
      { type: "demo", kind: "puppeteer-nav", title: "动手：导航与截图流程", },
      { type: "text", title: "易错点（务必读）", body: "• 忘记 browser.close 泄漏\n• 用硬 sleep 等导航\n• 与 PW 场景选型混乱" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Puppeteer 基础」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Puppeteer 基础：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://pptr.dev/guides/getting-started" },
      { type: "quiz", questions: [
        {
          id: "pp1",
          question: "Puppeteer 主要驱动？",
          options: ["仅 Firefox","Chrome/Chromium (CDP)","仅 Safari","JVM"],
          answer: 1,
          explain: "基于 CDP 控制 Chromium。",
        },
      ] },
    ],
  },
  "puppeteer-vs-pw": {
    objectives: ["能用自己的话解释「Puppeteer vs Playwright」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["忘记 browser.close 泄漏","用硬 sleep 等导航","与 PW 场景选型混乱"],
    takeaway: "Puppeteer vs Playwright：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Puppeteer vs Playwright」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Puppeteer vs Playwright。\n\n一句话：选型对照：场景、生态、API。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "怎么选", body: "选 Playwright：产品 E2E、多浏览器、测试报告与 fixture。\n选 Puppeteer：Chrome 专用脚本、与现有 CDP 工具链集成、轻量爬取。\nAPI 相似：page.goto / click / type；Playwright 的 locator + web-first assert 更测试友好。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「对照」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "对照", lang: "ts", code: `// Puppeteer
await page.click('#submit')
const text = await page.$eval('.msg', (el) => el.textContent)

// Playwright
await page.getByRole('button', { name: '提交' }).click()
await expect(page.getByText('成功')).toBeVisible()` },
      { type: "text", title: "易错点（务必读）", body: "• 忘记 browser.close 泄漏\n• 用硬 sleep 等导航\n• 与 PW 场景选型混乱" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Puppeteer vs Playwright」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Puppeteer vs Playwright：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "quiz", questions: [
        {
          id: "pv1",
          question: "多浏览器产品 E2E 更倾向？",
          options: ["仅 Puppeteer","Playwright","仅 curl","仅单元测试"],
          answer: 1,
          explain: "Playwright 原生多引擎 + 测试工具链。",
        },
      ] },
    ],
  },
  "puppeteer-bidi-webmcp": {
    objectives: ["能用自己的话解释「BiDi 与 WebMCP」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["忘记 browser.close 泄漏","用硬 sleep 等导航","与 PW 场景选型混乱"],
    takeaway: "BiDi 与 WebMCP：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://pptr.dev/guides/webmcp",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「BiDi 与 WebMCP」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：BiDi 与 WebMCP。\n\n一句话：WebDriver BiDi；实验性 WebMCP 工具发现与调用。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "协议演进", body: "Puppeteer 可通过 CDP 或 WebDriver BiDi 控制 Chrome/Firefox。\nWebMCP（实验）：页面注册 tools，自动化/LLM 可 page.webmcp.tools() 发现并用 execute 调用——站点主动暴露能力，而非盲目点 DOM。\n\n文档：https://pptr.dev/guides/webmcp" },
      { type: "text", title: "怎么读这段代码", body: "下面是「WebMCP 概念」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "WebMCP 概念", lang: "ts", code: `// 页面侧（站点）注册 tool；Puppeteer 侧：
const tools = await page.webmcp.tools()
// 监听 toolsadded / toolsremoved
// tool.execute(args)` },
      { type: "text", title: "易错点（务必读）", body: "• 忘记 browser.close 泄漏\n• 用硬 sleep 等导航\n• 与 PW 场景选型混乱" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「BiDi 与 WebMCP」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：BiDi 与 WebMCP：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://pptr.dev/guides/webmcp" },
      { type: "quiz", questions: [
        {
          id: "wm1",
          question: "WebMCP 的方向是？",
          options: ["废弃所有测试","页面显式注册可被 agent 调用的 tools","只截图","仅 CSS"],
          answer: 1,
          explain: "结构化工具接口给 agent。",
        },
      ] },
    ],
  },
  "puppeteer-screenshots-pdf": {
    objectives: ["能用自己的话解释「截图、PDF 与页面评估」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["忘记 browser.close 泄漏","用硬 sleep 等导航","与 PW 场景选型混乱"],
    takeaway: "截图、PDF 与页面评估：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「截图、PDF 与页面评估」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：截图、PDF 与页面评估。\n\n一句话：pptr 经典能力：screenshot、pdf、$eval。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "渲染管线", body: "page.screenshot({ fullPage, type })；page.pdf 仅 Chromium 路径可靠。page.$eval / evaluate 在页面沙箱取数。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "等待", body: "waitForSelector / waitForFunction；新协议 BiDi 能力持续演进。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「代码示例」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "示例", lang: "ts", code: `const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('https://example.com', { waitUntil: 'networkidle2' })
await page.screenshot({ path: 'x.png', fullPage: true })
const title = await page.$eval('h1', (el) => el.textContent)
await page.pdf({ path: 'x.pdf', format: 'A4' })
await browser.close()` },
      { type: "text", title: "易错点（务必读）", body: "• 忘记 browser.close 泄漏\n• 用硬 sleep 等导航\n• 与 PW 场景选型混乱" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「截图、PDF 与页面评估」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：截图、PDF 与页面评估：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方：https://pptr.dev/guides/getting-started" },
      { type: "quiz", questions: [
        {
          id: "puppeteer-screenshots-pdf-0",
          question: "pdf() 更成熟于？",
          options: ["任意浏览器一律相同","Chromium 路径","仅 Safari","仅 IE"],
          answer: 1,
          explain: "Chromium。",
        },
      ] },
    ],
  },
  "defuddle": {
    objectives: ["能用自己的话解释「Defuddle 内容提取」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["未授权使用反检测","地理信号不一致","把整页当快照含噪声"],
    takeaway: "Defuddle 内容提取：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://github.com/kepano/defuddle",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Defuddle 内容提取」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Defuddle 内容提取。\n\n一句话：从杂乱 HTML 抽取可读正文，服务测试与数据管线。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "Defuddle 是什么", body: "Defuddle 一类「可读性提取」工具：去掉导航、广告、页脚，保留文章正文与结构。\n在测试中可用于：快照正文稳定性、监控关键文案、对比渲染内容；在自动化中用于清洗爬取结果。\n与「完整 DOM 断言」互补——关注语义内容而非布局噪声。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「概念用法」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "概念用法", lang: "ts", code: `import { defuddle } from 'defuddle' // 包名以实际为准

const html = await page.content()
const { title, content } = await defuddle(html)
expect(title).toMatch(/季度报告/)
expect(content).toContain('营收增长 12%')
// 不关心侧边栏广告节点是否变动` },
      { type: "text", title: "动手 Demo", body: "下面的交互用来建立直觉。做完问自己：若这是真实 PR，我还缺哪条自动化检查？" },
      { type: "demo", kind: "defuddle-extract", title: "动手：提取正文", },
      { type: "text", title: "易错点（务必读）", body: "• 未授权使用反检测\n• 地理信号不一致\n• 把整页当快照含噪声" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Defuddle 内容提取」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Defuddle 内容提取：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://github.com/kepano/defuddle" },
      { type: "tip", body: "内容提取测试适合「文案/合规关键句」；视觉布局请用截图对比或专用视觉回归工具。" },
      { type: "quiz", questions: [
        {
          id: "df1",
          question: "Defuddle 类工具擅长？",
          options: ["替换 Playwright","从 HTML 提取可读正文","编译 TypeScript","管理 npm 私服"],
          answer: 1,
          explain: "清洗噪声，保留内容。",
        },
      ] },
    ],
  },
  "camoufox": {
    objectives: ["能用自己的话解释「Camoufox 反检测浏览器」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["未授权使用反检测","地理信号不一致","把整页当快照含噪声"],
    takeaway: "Camoufox 反检测浏览器：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://camoufox.com/",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Camoufox 反检测浏览器」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Camoufox 反检测浏览器。\n\n一句话：指纹伪装与自动化隐身场景（合法用途）。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "Camoufox 是什么", body: "Camoufox 是侧重「反自动化检测」的 Firefox 定制方案：降低 webdriver 指纹、统一/伪装 navigator、字体、WebGL 等信号。\n合法用途：测试你自己的风控/反爬是否误伤真实用户；研究检测逻辑；公开数据合规采集。\n禁止：绕过他人服务条款的滥用、未授权攻击。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「概念启动」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "概念启动", lang: "ts", code: `// 概念示例：以项目文档 API 为准
import { Camoufox } from 'camoufox'

const browser = await Camoufox.launch({
  headless: true,
  // humanize, geoip, block_images 等选项见文档
})
const page = await browser.newPage()
await page.goto('https://your-app.example/bot-check')
// 断言你的站点对「类真人」自动化的策略
await browser.close()` },
      { type: "text", title: "动手 Demo", body: "下面的交互用来建立直觉。做完问自己：若这是真实 PR，我还缺哪条自动化检查？" },
      { type: "demo", kind: "camoufox-stealth", title: "动手：指纹信号对照", },
      { type: "text", title: "易错点（务必读）", body: "• 未授权使用反检测\n• 地理信号不一致\n• 把整页当快照含噪声" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Camoufox 反检测浏览器」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Camoufox 反检测浏览器：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://camoufox.com/" },
      { type: "tip", body: "自动化检测与隐私是双刃剑：在课程与工作中只用于防御性测试与授权场景。" },
      { type: "quiz", questions: [
        {
          id: "cf1",
          question: "Camoufox 主要解决？",
          options: ["单元测试速度","降低自动化浏览器被检测的指纹特征","CSS 覆盖率","TypeScript 类型生成"],
          answer: 1,
          explain: "反检测/指纹伪装向的浏览器方案。",
        },
        {
          id: "cf2",
          question: "合理用途包括？",
          options: ["未授权撞库","测试自有风控与合规采集","窃取账号","绕过支付"],
          answer: 1,
          explain: "仅限合法、授权场景。",
        },
      ] },
    ],
  },
  "stealth-ethics": {
    objectives: ["能用自己的话解释「自动化伦理与边界」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["未授权使用反检测","地理信号不一致","把整页当快照含噪声"],
    takeaway: "自动化伦理与边界：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://camoufox.com/legal.md",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「自动化伦理与边界」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：自动化伦理与边界。\n\n一句话：robots、授权、速率与数据合规。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "红线", body: "遵守服务条款与 robots.txt 精神；控制并发与频率；不采集敏感个人信息；密钥不进仓库。\n测试环境用 mock/stage，别拿生产当沙箱打满。\n反检测技术用于「验证防御」，不是「做坏事的加速器」。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "易错点（务必读）", body: "• 未授权使用反检测\n• 地理信号不一致\n• 把整页当快照含噪声" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「自动化伦理与边界」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：自动化伦理与边界：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://camoufox.com/legal.md" },
      { type: "quiz", questions: [
        {
          id: "et1",
          question: "对生产站点无授权高频爬取？",
          options: ["最佳实践","通常违规且不道德","能提高覆盖率","等于 E2E"],
          answer: 1,
          explain: "需授权与合规。",
        },
      ] },
    ],
  },
  "defuddle-api": {
    objectives: ["能用自己的话解释「Defuddle 官方 API」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["未授权使用反检测","地理信号不一致","把整页当快照含噪声"],
    takeaway: "Defuddle 提取主内容/Markdown 再断言；Browser/Node/CLI 三入口。",
    official: "https://github.com/kepano/defuddle",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Defuddle 官方 API」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "【痛点】\n整页 HTML 快照被侧栏广告文案带崩，测试天天红。\n\n【为什么要管】\n你要断言的是正文，不是壳。\n\n【正确做法（概要）】\nDefuddle 提取主内容/Markdown 再断言；Browser/Node/CLI 三入口。" },
      { type: "text", title: "权威来源：kepano/defuddle", body: "Defuddle = 去掉杂乱，提取主内容（HTML 或 Markdown）。源自 Obsidian Web Clipper，可替代 Mozilla Readability：更宽容、脚注/数学/代码块更一致、元数据更全（schema.org）。\n\nBrowser：new Defuddle(document).parse()\nNode：Defuddle(document, url, { markdown: true })（需 linkedom/jsdom）\nCLI：npx defuddle parse URL --markdown --json" },
      { type: "text", title: "怎么读这段代码", body: "下面是「Browser」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "Browser", lang: "ts", code: `import Defuddle from 'defuddle'

const defuddle = new Defuddle(document)
const result = defuddle.parse()
// result.content, title, author, description, published, ...` },
      { type: "text", title: "怎么读这段代码", body: "下面是「Node + CLI」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "Node + CLI", lang: "ts", code: `import { parseHTML } from 'linkedom'
import { Defuddle } from 'defuddle/node'

const { document } = parseHTML(html)
const result = await Defuddle(document, 'https://example.com/a', {
  markdown: true,
})

// CLI
// npx defuddle parse https://example.com/a --markdown --json
// npx defuddle parse page.html --property title` },
      { type: "text", title: "易错点（务必读）", body: "• 未授权使用反检测\n• 地理信号不一致\n• 把整页当快照含噪声" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Defuddle 官方 API」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Defuddle 提取主内容/Markdown 再断言；Browser/Node/CLI 三入口。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://github.com/kepano/defuddle" },
      { type: "tip", body: "在测试中：对「正文合规句」断言用提取结果，避免侧栏广告 DOM 抖动导致 flaky。" },
      { type: "quiz", questions: [
        {
          id: "dfapi1",
          question: "Node 端需要？",
          options: ["只能在浏览器","DOM 实现（linkedom/jsdom）+ defuddle/node","仅 Python","必须 Camoufox"],
          answer: 1,
          explain: "传入 Document 即可。",
        },
      ] },
    ],
  },
  "camoufox-python": {
    objectives: ["能用自己的话解释「Camoufox Python + Playwright」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["未授权使用反检测","地理信号不一致","把整页当快照含噪声"],
    takeaway: "Camoufox Python + Playwright：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://camoufox.com/python/usage.md",
    minutes: 12,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Camoufox Python + Playwright」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Camoufox Python + Playwright。\n\n一句话：官方库：指纹注入、GeoIP、与 Playwright 代码兼容。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "官网 llms.txt 结构", body: "Camoufox 提供 https://camoufox.com/llms.txt —— 含 Stealth、Features、Python Interface、Fingerprint 分章。\n\nPython 包包装 Playwright：改启动方式即可复用既有 page 代码。指纹在 C++ 层注入（非页面 JS 补丁），含 navigator、WebGL、字体、WebRTC IP、人机鼠标轨迹等。\n\n仅限伦理与授权场景（见 legal.md）。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「用法概念（以官方文档为准）」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "用法概念（以官方文档为准）", lang: "python", code: `# pip install camoufox[geoip]
# 概念示例 —— API 以 camoufox.com/python/usage 为准
from camoufox.sync_api import Camoufox

with Camoufox(headless=True, geoip=True) as browser:
    page = browser.new_page()
    page.goto("https://your-staging.example/bot-check")
    # 既有 Playwright 风格断言/操作
    page.screenshot(path="check.png")` },
      { type: "text", title: "怎么读这段代码", body: "下面是「指纹相关能力（摘要）」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "指纹相关能力（摘要）", lang: "txt", code: `Navigator / Screen / Window / Document
WebGL 参数与扩展
Fonts 列表
Geolocation + Intl + Timezone
WebRTC ICE/SDP 层 IP 伪装
Human-like cursor movement
BrowserForge 指纹分布
Virtual display 建议用于「类有头」无界面` },
      { type: "text", title: "易错点（务必读）", body: "• 未授权使用反检测\n• 地理信号不一致\n• 把整页当快照含噪声" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Camoufox Python + Playwright」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Camoufox Python + Playwright：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://camoufox.com/python/usage.md" },
      { type: "quiz", questions: [
        {
          id: "cfpy1",
          question: "Camoufox 指纹注入层次？",
          options: ["仅 document.title 改写","C++ 实现层拦截，JS 难探测","只改 User-Agent 字符串","只改 CSS"],
          answer: 1,
          explain: "官方强调 C++ 层注入。",
        },
        {
          id: "cfpy2",
          question: "与 Playwright 关系？",
          options: ["完全不兼容","Python 库兼容既有 Playwright 页面 API","只能 Puppeteer","只能 JUnit"],
          answer: 1,
          explain: "改初始化即可复用代码。",
        },
      ] },
    ],
  },
  "defuddle-cli-options": {
    objectives: ["能用自己的话解释「Defuddle CLI 与标准化」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["未授权使用反检测","地理信号不一致","把整页当快照含噪声"],
    takeaway: "Defuddle CLI 与标准化：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://github.com/kepano/defuddle",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Defuddle CLI 与标准化」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Defuddle CLI 与标准化。\n\n一句话：README：CLI 选项、frontmatter、元数据、标准化。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "CLI 全集", body: "parse 文件/URL/stdin；--markdown --json --frontmatter --property --debug --lang --user-agent --output。403 可换 UA。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "标准化", body: "标题层级、代码块语言、脚注、MathJax→MathML、GitHub/Obsidian callout 统一。比 Readability 更宽容、元数据更全。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "测试场景", body: "对合规正文断言；侧栏广告变化不进快照。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「CLI」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "CLI", lang: "bash", code: `npx defuddle parse https://example.com/a --markdown --json
npx defuddle parse page.html --frontmatter -o out.md
npx defuddle parse https://example.com/a --user-agent "Mozilla/5.0 ..."
curl -L URL | npx defuddle parse --markdown` },
      { type: "text", title: "易错点（务必读）", body: "• 未授权使用反检测\n• 地理信号不一致\n• 把整页当快照含噪声" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Defuddle CLI 与标准化」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Defuddle CLI 与标准化：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://github.com/kepano/defuddle" },
      { type: "quiz", questions: [
        {
          id: "defuddle-cli-options-0",
          question: "--frontmatter 作用？",
          options: ["删除内容","前置 YAML 元数据","开启 headless","编译 Rust"],
          answer: 1,
          explain: "YAML 头。",
        },
      ] },
    ],
  },
  "camoufox-geoip-proxy": {
    objectives: ["能用自己的话解释「GeoIP、代理与时区对齐」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["未授权使用反检测","地理信号不一致","把整页当快照含噪声"],
    takeaway: "geoip 与 proxy 对齐；只用于授权/自有系统。",
    official: "https://camoufox.com/python/geoip.md",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「GeoIP、代理与时区对齐」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "【痛点】\n代理在美国，时区仍是东京，WebRTC 再漏真 IP——风控直接标异常。\n\n【为什么要管】\n反检测常靠「信号一致」而不是单改 UA。\n\n【正确做法（概要）】\ngeoip 与 proxy 对齐；只用于授权/自有系统。" },
      { type: "text", title: "问题", body: "代理出口 IP 在纽约，但浏览器时区还是东京 → 风控直接标异常。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "做法", body: "geoip=True 或传入目标 IP，自动设 longitude/latitude/timezone/locale 并伪装 WebRTC IP。必须与代理一致。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "伦理", body: "只测自有/授权系统。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「概念」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "概念", lang: "python", code: `from camoufox.sync_api import Camoufox

with Camoufox(
    headless=True,
    geoip=True,
    proxy={"server": "http://proxy.example:8080"},
) as browser:
    page = browser.new_page()
    page.goto("https://your-staging.example/geo-check")` },
      { type: "text", title: "易错点（务必读）", body: "• 未授权使用反检测\n• 地理信号不一致\n• 把整页当快照含噪声" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「GeoIP、代理与时区对齐」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：geoip 与 proxy 对齐；只用于授权/自有系统。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://camoufox.com/python/geoip.md" },
      { type: "quiz", questions: [
        {
          id: "camoufox-geoip-proxy-0",
          question: "geoip 主要解决？",
          options: ["CSS 布局","IP/时区/locale/WebRTC 一致性","单元覆盖率","npm 安装速度"],
          answer: 1,
          explain: "地理信号一致。",
        },
      ] },
    ],
  },
  "camoufox-fingerprint-matrix": {
    objectives: ["能用自己的话解释「指纹矩阵：WebGL/字体/媒体/语音」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["未授权使用反检测","地理信号不一致","把整页当快照含噪声"],
    takeaway: "指纹矩阵：WebGL/字体/媒体/语音：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://camoufox.com/fingerprint/index.md",
    minutes: 12,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「指纹矩阵：WebGL/字体/媒体/语音」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：指纹矩阵：WebGL/字体/媒体/语音。\n\n一句话：官网 fingerprint/* 能力清单迁移。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "C++ 注入清单", body: "Navigator、Screen、Window、Document、WebGL（参数/扩展/shader）、Fonts、Geolocation & Intl、HTTP Headers、WebRTC ICE/SDP、Media 设备数、Speech voices、Addons、人机光标轨迹。" },
      { type: "text", title: "一致性", body: "BrowserForge 分布采样，避免 Windows UA + 苹果 GPU 等矛盾组合。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "光标", body: "Human-like 轨迹 C++ 重写，距离感知，比简单 JS 贝塞尔更难识别。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「对照」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "对照", lang: "txt", code: `检测点          普通自动化        Camoufox
webdriver        true             实现层处理
WebGL vendor     软件渲染特征      类真机画像
字体枚举         容器默认集        可注入列表
WebRTC           漏真实 IP         协议层改写
鼠标             瞬移点击          类人轨迹` },
      { type: "text", title: "易错点（务必读）", body: "• 未授权使用反检测\n• 地理信号不一致\n• 把整页当快照含噪声" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「指纹矩阵：WebGL/字体/媒体/语音」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：指纹矩阵：WebGL/字体/媒体/语音：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://camoufox.com/fingerprint/index.md" },
      { type: "quiz", questions: [
        {
          id: "camoufox-fingerprint-matrix-0",
          question: "Camoufox 强调的注入层？",
          options: ["仅 document.write","C++ 实现层","只改 favicon","Service Worker 仅"],
          answer: 1,
          explain: "C++。",
        },
      ] },
    ],
  },
  "camoufox-virtual-mainworld": {
    objectives: ["能用自己的话解释「虚拟显示、Main World、Remote」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["未授权使用反检测","地理信号不一致","把整页当快照含噪声"],
    takeaway: "虚拟显示、Main World、Remote：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://camoufox.com/python/virtual-display.md",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「虚拟显示、Main World、Remote」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：虚拟显示、Main World、Remote。\n\n一句话：官网 virtual-display、main-world-eval、remote-server。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "Virtual Display", body: "无界面环境建议用虚拟显示缓冲跑「有头」路径，降低未来 headless 指纹风险。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "Main World", body: "默认 JS 在隔离世界执行，页面不可见；需要与页面同世界时用官方 main-world 能力（谨慎）。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "Remote Server", body: "实验性；依赖未文档化 Playwright 方法，生产慎用。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "易错点（务必读）", body: "• 未授权使用反检测\n• 地理信号不一致\n• 把整页当快照含噪声" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「虚拟显示、Main World、Remote」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：虚拟显示、Main World、Remote：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://camoufox.com/python/virtual-display.md" },
      { type: "quiz", questions: [
        {
          id: "camoufox-virtual-mainworld-0",
          question: "默认 JS 执行世界？",
          options: ["一定与页面同世界可被探测","隔离世界（isolated）","只在服务端","无 JS"],
          answer: 1,
          explain: "隔离更安全。",
        },
      ] },
    ],
  },
  "camoufox-usage-sync-async": {
    objectives: ["能用自己的话解释「Camoufox Sync/Async 与参数」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["未授权使用反检测","地理信号不一致","把整页当快照含噪声"],
    takeaway: "Camoufox Sync/Async 与参数：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://camoufox.com/python/usage.md",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「Camoufox Sync/Async 与参数」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：Camoufox Sync/Async 与参数。\n\n一句话：官网 usage：Sync/Async API、browser 版本、与 Playwright 参数兼容。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "初始化", body: "from camoufox.sync_api import Camoufox / async_api.AsyncCamoufox。接受 Playwright Firefox launch 选项 + Camoufox 扩展参数。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "版本", body: "camoufox set official/stable && camoufox fetch；launch 时 browser= 覆盖单次版本。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "迁移成本", body: "原 Playwright 页面操作基本不动，只换 browser 启动。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「Sync」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "Sync", lang: "python", code: `from camoufox.sync_api import Camoufox

with Camoufox() as browser:
    page = browser.new_page()
    page.goto("https://example.com")

# async
# from camoufox.async_api import AsyncCamoufox
# async with AsyncCamoufox() as browser:
#     page = await browser.new_page()` },
      { type: "text", title: "易错点（务必读）", body: "• 未授权使用反检测\n• 地理信号不一致\n• 把整页当快照含噪声" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「Camoufox Sync/Async 与参数」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：Camoufox Sync/Async 与参数：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://camoufox.com/python/usage.md" },
      { type: "quiz", questions: [
        {
          id: "camoufox-usage-sync-async-0",
          question: "迁移既有 Playwright 脚本？",
          options: ["重写全部断言","通常只改 browser 初始化","不能迁移","必须改成 Selenium"],
          answer: 1,
          explain: "改启动即可。",
        },
      ] },
    ],
  },
  "flaky-tests": {
    objectives: ["能用自己的话解释「消灭 Flaky」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["门禁过慢无人修","flaky 用重试掩盖","无 artifact 无法复盘"],
    takeaway: "消灭 Flaky：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「消灭 Flaky」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：消灭 Flaky。\n\n一句话：偶发失败的根因与治理。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "常见根因", body: "固定 sleep、竞态、共享状态、依赖真实时间/网络、动画未等完、顺序依赖。\n治理：隔离数据、web-first 断言、重试要克制（先修再 retry）、quarantine 列表、记录 trace。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「从 sleep 到条件等待」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "从 sleep 到条件等待", lang: "ts", code: `// flaky
await page.waitForTimeout(3000)

// 稳健
await expect(page.getByRole('status')).toHaveText('已保存')` },
      { type: "text", title: "动手 Demo", body: "下面的交互用来建立直觉。做完问自己：若这是真实 PR，我还缺哪条自动化检查？" },
      { type: "demo", kind: "flaky", title: "动手：找出 flaky 写法", },
      { type: "text", title: "易错点（务必读）", body: "• 门禁过慢无人修\n• flaky 用重试掩盖\n• 无 artifact 无法复盘" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「消灭 Flaky」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：消灭 Flaky：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "quiz", questions: [
        {
          id: "fl1",
          question: "治理 flaky 的首选？",
          options: ["无限加大 timeout","修根因 + 条件等待","关闭失败用例","只在本地跑"],
          answer: 1,
          explain: "修根因，而非掩盖。",
        },
      ] },
    ],
  },
  "ci-testing": {
    objectives: ["能用自己的话解释「CI 中的测试」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["门禁过慢无人修","flaky 用重试掩盖","无 artifact 无法复盘"],
    takeaway: "CI 中的测试：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「CI 中的测试」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：CI 中的测试。\n\n一句话：GitHub Actions、并行、缓存、分片。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "流水线设计", body: "PR：lint + typecheck + unit（必跑）。\nE2E：可分片并行；用 preview URL 或 ephemeral env。\n缓存 node_modules / playwright browsers。\n失败上传 artifact（报告、trace）。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「简化 GitHub Actions」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "简化 GitHub Actions", lang: "yaml", code: `jobs:
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
          path: playwright-report/` },
      { type: "text", title: "动手 Demo", body: "下面的交互用来建立直觉。做完问自己：若这是真实 PR，我还缺哪条自动化检查？" },
      { type: "demo", kind: "ci-pipeline", title: "动手：流水线阶段", },
      { type: "text", title: "易错点（务必读）", body: "• 门禁过慢无人修\n• flaky 用重试掩盖\n• 无 artifact 无法复盘" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「CI 中的测试」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：CI 中的测试：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "quiz", questions: [
        {
          id: "ci1",
          question: "E2E 失败时建议？",
          options: ["不留证据","上传 trace/报告 artifact","删掉用例","只看绿灯"],
          answer: 1,
          explain: "可观测才能修。",
        },
      ] },
    ],
  },
  "test-strategy": {
    objectives: ["能用自己的话解释「团队测试策略」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["门禁过慢无人修","flaky 用重试掩盖","无 artifact 无法复盘"],
    takeaway: "团队测试策略：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「团队测试策略」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：团队测试策略。\n\n一句话：谁写测、何时写、Definition of Done。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "落地建议", body: "新功能：关键路径至少有单测或组件测 + 一条 E2E（若用户可见主流程）。\nBugfix：先补失败测试再修（回归锁）。\nCode Review 看测试是否描述行为。\nDoD：类型检查通过、相关测试绿、无新增 flaky。\n\n【展开说明】\n把上面这句话落到工程里：你应该能指出——输入是什么、输出/副作用是什么、在哪一层测试最划算。\n若暂时背不下所有 API，先记住「适用场景 + 最小例子 + 官方链接」。" },
      { type: "text", title: "易错点（务必读）", body: "• 门禁过慢无人修\n• flaky 用重试掩盖\n• 无 artifact 无法复盘" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「团队测试策略」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：团队测试策略：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "quiz", questions: [
        {
          id: "ts1",
          question: "修 bug 的推荐顺序？",
          options: ["先改代码再口头保证","先写/补失败测试再修","只加 console.log","提高覆盖率阈值了事"],
          answer: 1,
          explain: "回归锁，防止再犯。",
        },
      ] },
    ],
  },
  "interview-testing": {
    objectives: ["能用自己的话解释「测试面试串讲」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["门禁过慢无人修","flaky 用重试掩盖","无 artifact 无法复盘"],
    takeaway: "测试面试串讲：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    minutes: 10,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「测试面试串讲」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：测试面试串讲。\n\n一句话：高频问答：金字塔、mock、E2E、flaky。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "能讲清楚的点", body: "1) 金字塔与冰淇淋反模式\n2) 测行为不测实现\n3) mock 边界\n4) Playwright 自动等待\n5) flaky 根因\n6) 覆盖率误区\n7) CI 分片与 artifact\n\n用你真实项目里的例子（哪怕本站工坊任务）会更有说服力。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「一分钟电梯稿」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "一分钟电梯稿", lang: "txt", code: `我按金字塔组织测试：业务纯函数用 Vitest 单测；
组件用 Testing Library 从用户视角交互；
主路径用 Playwright E2E，少而稳。
Mock 只挡网络等外部边界。
CI 上 unit 必跑，E2E 并行分片，失败上传 trace。` },
      { type: "text", title: "易错点（务必读）", body: "• 门禁过慢无人修\n• flaky 用重试掩盖\n• 无 artifact 无法复盘" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「测试面试串讲」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：测试面试串讲：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "quiz", questions: [
        {
          id: "iv1",
          question: "面试中描述测试策略时应强调？",
          options: ["工具 logo 多少","分层目标、边界与可维护性","只谈 100% 覆盖","从不用 E2E"],
          answer: 1,
          explain: "讲清楚为什么这样分层。",
        },
      ] },
    ],
  },
  "llms-txt-for-testers": {
    objectives: ["能用自己的话解释「llms.txt 与测试文档」在解决什么问题","能看懂并改写本课的最小示例","能指出至少两个相关易错点"],
    pitfalls: ["门禁过慢无人修","flaky 用重试掩盖","无 artifact 无法复盘"],
    takeaway: "llms.txt 与测试文档：先理解适用场景与取舍，再记 API；对照官方文档查细节。",
    official: "https://llmstxt.org/",
    minutes: 9,
    blocks: [
      { type: "text", title: "本节你将学会", body: "• 能用自己的话解释「llms.txt 与测试文档」在解决什么问题\n• 能看懂并改写本课的最小示例\n• 能指出至少两个相关易错点" },
      { type: "text", title: "先把问题讲明白", body: "本课主题：llms.txt 与测试文档。\n\n一句话：如何用官方 llms.txt 喂给 AI；本站也提供索引。\n\n学习时请带着三个问题读下去：\n1. 它解决什么痛苦？\n2. 什么时候不该用？\n3. 失败了如何调试？" },
      { type: "text", title: "给 LLM 的文档地图", body: "llms.txt（https://llmstxt.org/）：站点根路径的 Markdown 索引，告诉模型「该读哪些权威页」。\nllms-full.txt：尽量全文拼接，适合一次性灌入。\n\n已发现：\n- Vitest：/llms.txt + /llms-full.txt\n- Vite：/llms.txt + /llms-full.txt\n- Camoufox：/llms.txt\n- Playwright / Testing Library / Puppeteer：暂无根路径 llms.txt → 用文档 URL + MCP/Agents\n\n本站：/llms.txt 与 /llms-full.txt，以及「官方文档」页汇总链接。" },
      { type: "text", title: "怎么读这段代码", body: "下面是「Cursor / Agent 用法」。请先读注释与命名，再想象：若断言失败，你会如何根据报错定位？建议自己敲一遍，而不是只看。" },
      { type: "code", title: "Cursor / Agent 用法", lang: "txt", code: `1. @https://vitest.dev/llms.txt 了解目录
2. 需要细节时再拉具体 /guide/*.md 或 llms-full 片段
3. Playwright 用官方 Test Agents / MCP 代替臆造 API
4. 生成测试后仍跑 vitest/playwright 验证` },
      { type: "text", title: "易错点（务必读）", body: "• 门禁过慢无人修\n• flaky 用重试掩盖\n• 无 artifact 无法复盘" },
      { type: "text", title: "怎样才算「学会了」", body: "合上文档后，你应能：\n1. 用两句话向同事讲清「llms.txt 与测试文档」\n2. 在项目里找到一个真实插入点（或说明为何暂不需要）\n3. 写出或指出最小失败用例长什么样\n\n做不到其中任一条，就还没讲明白——请重读「问题」与示例。" },
      { type: "tip", body: "一句话小结：llms.txt 与测试文档：先理解适用场景与取舍，再记 API；对照官方文档查细节。" },
      { type: "tip", body: "官方对照（建议打开对照读）：https://llmstxt.org/" },
      { type: "quiz", questions: [
        {
          id: "ll1",
          question: "llms.txt 的作用？",
          options: ["封锁所有爬虫","为 LLM 提供结构化文档入口","替代 package-lock","加密源码"],
          answer: 1,
          explain: "AI 可读的文档索引。",
        },
      ] },
    ],
  },
};

export function applyDeepContent(lesson: Lesson): Lesson {
  const d = DEEP_BY_SLUG[lesson.slug];
  if (!d) return lesson;
  return {
    ...lesson,
    minutes: d.minutes ?? lesson.minutes,
    blocks: d.blocks,
  };
}
