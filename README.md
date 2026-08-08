# Learning Testing · 前端测试实战

交互式中文测试教程：课程 + 测验 + 进度 + 断言沙盒 + 测试工坊。

姊妹项目：[learning-vue3](https://github.com/xiaoqianran/learning-vue3)

---

## 这是什么

面向想系统学习 **前端测试** 的同学。内容以「读一点、动手一点、测一点」组织。

你可以：

- 按路径学完 **24+ 节** 课程（讲解 + 源码 + 交互 Demo + 小测验）
- 在 **断言沙盒** 里即时验证 `expect` 直觉
- 在 **测试工坊** 里闯关（定位器 / 断言 / mock / flaky / 合规）
- 用 **速查表** 复习，用 **学习中心 / 错题本 / 结业证明** 跟进度

### 工具覆盖

| 工具 | 内容 |
|------|------|
| **Vitest** | 配置、断言、mock、异步、覆盖率 |
| **Testing Library** | 查询优先级、user-event、异步 UI |
| **Playwright** | Locator、Web-first 断言、网络、调试 |
| **Puppeteer** | CDP 自动化、与 PW 选型 |
| **Defuddle** | 可读正文提取与内容断言 |
| **Camoufox** | 反检测浏览器（合法防御场景） |

> 本站本身用 React + TanStack Start 承载教学内容；进度存在浏览器 `localStorage`。

---

## 功能一览

| 模块 | 路径 | 说明 |
|------|------|------|
| 课程 | `/lesson/:slug` | 正文、源码、Demo、测验、笔记 |
| 首页大纲 | `/` | 搜索、路径筛选、进度条 |
| 测试工坊 | `/studio` | 6 关实战选择题 |
| 断言沙盒 | `/playground` | 即时 expect 模拟 |
| 速查表 | `/cheatsheet` | 一页核心 API |
| 学习中心 | `/hub` | 打卡、收藏、路径进度 |
| 练习场 | `/lab` | 综合抽题 |
| 错题本 | `/mistakes` | 测验错题回顾 |
| 结业证明 | `/certificate` | 全部完成后解锁 |

---

## 学习路径

| 路径 | 你学到什么 |
|------|------------|
| **基础概念** | 为何测、金字塔、AAA、好测试原则 |
| **Vitest** | 运行器、断言、mock、异步、覆盖率 |
| **Testing Library** | 用户视角查询与交互 |
| **Playwright** | E2E 定位、断言、网络、调试 |
| **Puppeteer** | Chrome 自动化与选型 |
| **高级工具** | Defuddle、Camoufox、伦理边界 |
| **工程化** | Flaky、CI、团队策略、面试串讲 |

建议顺序：

```text
基础概念 → Vitest → Testing Library → Playwright → Puppeteer → 高级工具 → 工程化 → 工坊闯关
```

---

## 本地运行

环境：Node 22+ 推荐。

```bash
git clone https://github.com/xiaoqianran/learning-testing.git
cd learning-testing
npm install
npm run dev
```

开发服务默认绑定 `0.0.0.0:8080`。

```bash
npm run build
npm run typecheck
```

---

## 隐私

进度、笔记、错题、打卡均存储在本机 `localStorage`，不上传服务器。

---

## License

MIT
