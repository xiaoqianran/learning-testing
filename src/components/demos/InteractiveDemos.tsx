import { useMemo, useState } from "react";
import type { DemoKind } from "@/data/lessons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, FlaskConical, X } from "lucide-react";

export function InteractiveDemo({
  kind,
  title,
  hint,
}: {
  kind: DemoKind;
  title: string;
  hint?: string;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-fg">{title}</h3>
        </div>
        {hint ? <p className="text-xs text-muted">{hint}</p> : null}
      </div>
      <div className="p-4 sm:p-5">
        <DemoBody kind={kind} />
      </div>
    </section>
  );
}

function DemoBody({ kind }: { kind: DemoKind }) {
  switch (kind) {
    case "pyramid":
      return <PyramidDemo />;
    case "aaa":
      return <AaaDemo />;
    case "vitest-expect":
      return <ExpectDemo />;
    case "vitest-mock":
      return <MockDemo />;
    case "rtl-query":
      return <RtlQueryDemo />;
    case "rtl-user":
      return <RtlUserDemo />;
    case "playwright-locator":
      return <LocatorDemo />;
    case "playwright-assert":
      return <AssertDemo />;
    case "puppeteer-nav":
      return <PuppeteerDemo />;
    case "defuddle-extract":
      return <DefuddleDemo />;
    case "camoufox-stealth":
      return <CamoufoxDemo />;
    case "coverage":
      return <CoverageDemo />;
    case "flaky":
      return <FlakyDemo />;
    case "ci-pipeline":
      return <CiDemo />;
    default:
      return <p className="text-sm text-muted">Demo 暂不可用</p>;
  }
}

function Result({ ok, text }: { ok: boolean | null; text: string }) {
  if (ok === null) return null;
  return (
    <p
      className={cn(
        "mt-3 flex items-center gap-1.5 text-sm",
        ok ? "text-pass" : "text-danger",
      )}
    >
      {ok ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
      {text}
    </p>
  );
}

function PyramidDemo() {
  const [unit, setUnit] = useState(60);
  const [integration, setIntegration] = useState(30);
  const e2e = Math.max(5, 100 - unit - integration);
  const speed = Math.round(unit * 0.9 + integration * 0.5 + e2e * 0.1);
  const confidence = Math.round(unit * 0.35 + integration * 0.35 + e2e * 0.9);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        调整单元 / 集成占比（E2E 自动补足），观察「执行速度」与「端到端信心」的权衡。
      </p>
      <label className="block text-xs text-muted">
        单元 {unit}%
        <input
          type="range"
          min={20}
          max={80}
          value={unit}
          onChange={(e) => setUnit(Number(e.target.value))}
          className="mt-1 w-full accent-[var(--color-primary)]"
        />
      </label>
      <label className="block text-xs text-muted">
        集成 {integration}%
        <input
          type="range"
          min={10}
          max={50}
          value={integration}
          onChange={(e) => setIntegration(Number(e.target.value))}
          className="mt-1 w-full accent-[var(--color-primary)]"
        />
      </label>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg bg-surface-2 px-2 py-3">
          <p className="font-mono text-lg text-primary">{unit}%</p>
          <p className="text-muted">单元</p>
        </div>
        <div className="rounded-lg bg-surface-2 px-2 py-3">
          <p className="font-mono text-lg text-primary">{integration}%</p>
          <p className="text-muted">集成</p>
        </div>
        <div className="rounded-lg bg-surface-2 px-2 py-3">
          <p className="font-mono text-lg text-warn">{e2e}%</p>
          <p className="text-muted">E2E</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <span className="text-muted">
          速度指数 <strong className="font-mono text-fg">{speed}</strong>
        </span>
        <span className="text-muted">
          路径信心 <strong className="font-mono text-fg">{confidence}</strong>
        </span>
      </div>
      {e2e > 40 ? (
        <p className="text-xs text-warn">E2E 偏多 → 易变慢、变脆（冰淇淋反模式）。</p>
      ) : unit < 40 ? (
        <p className="text-xs text-warn">单元偏少 → 反馈变慢，定位变难。</p>
      ) : (
        <p className="text-xs text-pass">接近经典金字塔：底层厚、顶层精。</p>
      )}
    </div>
  );
}

function AaaDemo() {
  const parts = [
    { id: "ar", label: "const price = 100; const vip = true", role: "Arrange" },
    { id: "ac", label: "const result = discount(price, vip)", role: "Act" },
    { id: "as", label: "expect(result).toBe(80)", role: "Assert" },
  ];
  const [map, setMap] = useState<Record<string, string>>({});
  const ok =
    map.ar === "Arrange" && map.ac === "Act" && map.as === "Assert"
      ? true
      : Object.keys(map).length === 3
        ? false
        : null;

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">把每行代码拖到对应的 AAA 阶段（点选匹配）。</p>
      {parts.map((p) => (
        <div
          key={p.id}
          className="flex flex-col gap-2 rounded-lg border border-border bg-surface-2 p-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <code className="font-mono text-xs text-code-fg">{p.label}</code>
          <div className="flex flex-wrap gap-1.5">
            {["Arrange", "Act", "Assert"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setMap((m) => ({ ...m, [p.id]: r }))}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs",
                  map[p.id] === r
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border text-muted hover:text-fg",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      ))}
      <Result
        ok={ok}
        text={ok ? "完美，AAA 结构清晰。" : "再检查：准备 → 执行 → 断言。"}
      />
    </div>
  );
}

function ExpectDemo() {
  const cases = [
    {
      q: "expect(1).?(1) 原始值严格相等",
      options: ["toEqual", "toBe", "toMatchObject"],
      answer: 1,
    },
    {
      q: "expect({a:1,b:2}).?({a:1}) 子集",
      options: ["toBe", "toContain", "toMatchObject"],
      answer: 2,
    },
  ];
  const [i, setI] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const c = cases[i];
  const ok = choice === null ? null : choice === c.answer;

  return (
    <div>
      <p className="text-sm font-medium text-fg">{c.q}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {c.options.map((o, oi) => (
          <button
            key={o}
            type="button"
            onClick={() => setChoice(oi)}
            className={cn(
              "rounded-md border px-3 py-2 font-mono text-xs",
              choice === oi
                ? "border-primary bg-primary-soft text-primary"
                : "border-border bg-surface-2 text-muted",
            )}
          >
            {o}
          </button>
        ))}
      </div>
      <Result
        ok={ok}
        text={ok ? "匹配器正确。" : choice === null ? "" : "再想想深比较 vs 引用。"}
      />
      <Button
        className="mt-3"
        size="sm"
        variant="secondary"
        onClick={() => {
          setI((x) => (x + 1) % cases.length);
          setChoice(null);
        }}
      >
        下一题
      </Button>
    </div>
  );
}

function MockDemo() {
  const [calls, setCalls] = useState(0);
  const [asserted, setAsserted] = useState(false);
  const pass = asserted && calls === 1;

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        模拟 <code className="text-primary">api.getUser</code>：点「调用业务」会触发
        mock；断言应 toHaveBeenCalledTimes(1)。
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => setCalls((c) => c + 1)}
        >
          调用业务 loadProfile
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setAsserted(true)}
        >
          运行 expect(spy).toHaveBeenCalledTimes(1)
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setCalls(0);
            setAsserted(false);
          }}
        >
          重置
        </Button>
      </div>
      <p className="font-mono text-xs text-muted">mock.calls.length = {calls}</p>
      {asserted ? (
        <Result
          ok={pass}
          text={pass ? "PASS" : `FAIL: expected 1, received ${calls}`}
        />
      ) : null}
    </div>
  );
}

function RtlQueryDemo() {
  const scenarios = [
    {
      need: "按钮必须存在，否则测试失败",
      answer: "getByRole",
      options: ["getByRole", "queryByRole", "findByRole"],
    },
    {
      need: "断言「错误提示」不在页面上",
      answer: "queryByText",
      options: ["getByText", "queryByText", "findByText"],
    },
    {
      need: "等待请求后标题出现",
      answer: "findByRole",
      options: ["getByRole", "queryByRole", "findByRole"],
    },
  ];
  const [i, setI] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const s = scenarios[i];
  const ok = choice === null ? null : choice === s.answer;

  return (
    <div>
      <p className="text-sm text-fg">{s.need}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {s.options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => setChoice(o)}
            className={cn(
              "rounded-md border px-3 py-2 font-mono text-xs",
              choice === o
                ? "border-primary bg-primary-soft text-primary"
                : "border-border bg-surface-2",
            )}
          >
            {o}
          </button>
        ))}
      </div>
      <Result ok={ok} text={ok ? "正确。" : choice ? "再对照 get/query/find。" : ""} />
      <Button
        className="mt-3"
        size="sm"
        variant="secondary"
        onClick={() => {
          setI((x) => (x + 1) % scenarios.length);
          setChoice(null);
        }}
      >
        下一场景
      </Button>
    </div>
  );
}

function RtlUserDemo() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const valid = email.includes("@") && pwd.length >= 6;

  return (
    <div className="max-w-sm space-y-3">
      <p className="text-sm text-muted">像 user-event 一样填写并提交（演示被测表单）。</p>
      <label className="block text-xs text-muted">
        邮箱
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg"
          placeholder="a@b.com"
        />
      </label>
      <label className="block text-xs text-muted">
        密码（≥6）
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg"
        />
      </label>
      <Button
        size="sm"
        disabled={!valid}
        onClick={() => setSubmitted(true)}
      >
        登录
      </Button>
      {submitted ? (
        <p className="text-sm text-pass">
          expect(onSubmit).toHaveBeenCalled() — 测试通过
        </p>
      ) : (
        <p className="text-xs text-subtle">
          测试里：await user.type(...); await user.click(...)
        </p>
      )}
    </div>
  );
}

function LocatorDemo() {
  const options = [
    { id: "css", label: "page.locator('div.nav > a:nth-child(2)')", good: false },
    { id: "role", label: "page.getByRole('link', { name: '设置' })", good: true },
    { id: "xpath", label: "page.locator('xpath=//html/body/div[3]/a')", good: false },
  ];
  const [pick, setPick] = useState<string | null>(null);
  const ok = pick === null ? null : options.find((o) => o.id === pick)?.good === true;

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted">为「设置」导航链接选择最稳健的定位器。</p>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => setPick(o.id)}
          className={cn(
            "block w-full rounded-md border px-3 py-2.5 text-left font-mono text-xs",
            pick === o.id
              ? "border-primary bg-primary-soft"
              : "border-border bg-surface-2",
          )}
        >
          {o.label}
        </button>
      ))}
      <Result
        ok={ok}
        text={ok ? "语义定位抗重构。" : pick ? "避免脆弱 CSS/XPath。" : ""}
      />
    </div>
  );
}

function AssertDemo() {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted">哪段断言是 Web-first（自动重试）？</p>
      {[
        "const t = await page.locator('.msg').textContent(); expect(t).toBe('成功')",
        "await expect(page.getByText('成功')).toBeVisible()",
      ].map((code, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setPick(i)}
          className={cn(
            "block w-full rounded-md border px-3 py-2.5 text-left font-mono text-[11px] leading-relaxed",
            pick === i
              ? "border-primary bg-primary-soft"
              : "border-border bg-surface-2",
          )}
        >
          {code}
        </button>
      ))}
      <Result
        ok={pick === null ? null : pick === 1}
        text={pick === 1 ? "正确：expect(locator) 会重试。" : pick === 0 ? "一次性取值易 flaky。" : ""}
      />
    </div>
  );
}

function PuppeteerDemo() {
  const steps = ["launch", "newPage", "goto", "screenshot", "close"];
  const [done, setDone] = useState<string[]>([]);
  const next = steps[done.length];
  const complete = done.length === steps.length;

  return (
    <div>
      <p className="text-sm text-muted">按正确顺序点击 API（模拟脚本流程）。</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {[...steps].reverse().map((s) => (
          <Button
            key={s}
            size="sm"
            variant={done.includes(s) ? "secondary" : "outline"}
            disabled={complete || (next !== s && !done.includes(s))}
            onClick={() => {
              if (s === next) setDone((d) => [...d, s]);
            }}
          >
            {s}()
          </Button>
        ))}
      </div>
      <ol className="mt-3 list-decimal space-y-1 pl-5 font-mono text-xs text-muted">
        {done.map((s) => (
          <li key={s} className="text-pass">
            {s} ✓
          </li>
        ))}
      </ol>
      {complete ? (
        <p className="mt-2 text-sm text-pass">脚本跑通：浏览器启动 → 截图 → 关闭。</p>
      ) : (
        <Button
          className="mt-2"
          size="sm"
          variant="ghost"
          onClick={() => setDone([])}
        >
          重置
        </Button>
      )}
    </div>
  );
}

function DefuddleDemo() {
  const raw = useMemo(
    () =>
      `<nav>广告 | 登录</nav><article><h1>Q2 报告</h1><p>营收增长 12%。</p></article><footer>Cookie 同意</footer>`,
    [],
  );
  const [extracted, setExtracted] = useState(false);
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">模拟从嘈杂 HTML 提取正文。</p>
      <pre className="scrollbar-thin overflow-x-auto rounded-md bg-code-bg p-3 font-mono text-[11px] text-code-fg">
        {raw}
      </pre>
      <Button size="sm" onClick={() => setExtracted(true)}>
        运行 defuddle(html)
      </Button>
      {extracted ? (
        <div className="rounded-md border border-primary/30 bg-primary-soft p-3 text-sm">
          <p className="font-medium text-primary">title: Q2 报告</p>
          <p className="mt-1 text-fg">content: 营收增长 12%。</p>
          <p className="mt-2 text-xs text-muted">导航与页脚噪声已剥离</p>
        </div>
      ) : null}
    </div>
  );
}

function CamoufoxDemo() {
  const signals = [
    { k: "navigator.webdriver", stock: "true", stealth: "false" },
    { k: "User-Agent", stock: "HeadlessChrome", stealth: "真实桌面 UA" },
    { k: "WebGL vendor", stock: "Google SwiftShader", stealth: "类真机 GPU" },
  ];
  const [mode, setMode] = useState<"stock" | "stealth">("stock");

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        对比普通自动化浏览器与 Camoufox 类方案的指纹信号（示意）。
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={mode === "stock" ? "default" : "secondary"}
          onClick={() => setMode("stock")}
        >
          普通 Headless
        </Button>
        <Button
          size="sm"
          variant={mode === "stealth" ? "default" : "secondary"}
          onClick={() => setMode("stealth")}
        >
          Camoufox 向
        </Button>
      </div>
      <ul className="divide-y divide-border rounded-lg border border-border">
        {signals.map((s) => (
          <li
            key={s.k}
            className="grid gap-1 px-3 py-2 text-xs sm:grid-cols-[10rem_1fr]"
          >
            <code className="font-mono text-primary">{s.k}</code>
            <span className="text-muted">
              {mode === "stock" ? s.stock : s.stealth}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-subtle">
        仅用于测试自有风控与授权场景，勿滥用。
      </p>
    </div>
  );
}

function CoverageDemo() {
  const files = [
    { name: "discount.ts", lines: 100, branches: 100 },
    { name: "Cart.tsx", lines: 72, branches: 40 },
    { name: "legacy.ts", lines: 12, branches: 5 },
  ];
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted">
        高行覆盖 + 低分支覆盖 = 条件分支可能没测到。优先补 branches。
      </p>
      {files.map((f) => (
        <div key={f.name} className="rounded-lg border border-border bg-surface-2 p-3">
          <div className="flex justify-between text-xs">
            <span className="font-mono text-fg">{f.name}</span>
            <span className="text-muted">
              lines {f.lines}% · branches {f.branches}%
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-3">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${f.branches}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function FlakyDemo() {
  const items = [
    { id: "sleep", text: "await page.waitForTimeout(3000)", bad: true },
    { id: "expect", text: "await expect(page.getByText('已保存')).toBeVisible()", bad: false },
    { id: "shared", text: "测试共用同一个可写全局 DB 行且不清理", bad: true },
  ];
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const all = items.every((i) => marked[i.id] === i.bad);

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted">点选「容易 flaky」的写法（可多选）。</p>
      {items.map((i) => (
        <button
          key={i.id}
          type="button"
          onClick={() => setMarked((m) => ({ ...m, [i.id]: !m[i.id] }))}
          className={cn(
            "block w-full rounded-md border px-3 py-2.5 text-left font-mono text-[11px]",
            marked[i.id]
              ? "border-warn/50 bg-warn/10"
              : "border-border bg-surface-2",
          )}
        >
          {i.text}
        </button>
      ))}
      <Result
        ok={Object.keys(marked).length === 0 ? null : all}
        text={
          all
            ? "找对了：固定 sleep 与共享脏数据是重灾区。"
            : "继续：条件等待才稳健；共享状态要隔离。"
        }
      />
    </div>
  );
}

function CiDemo() {
  const stages = ["lint", "typecheck", "unit", "e2e", "artifact"];
  const [on, setOn] = useState<string[]>(["lint", "unit"]);
  return (
    <div>
      <p className="text-sm text-muted">勾选 PR 流水线建议包含的阶段。</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {stages.map((s) => {
          const active = on.includes(s);
          return (
            <button
              key={s}
              type="button"
              onClick={() =>
                setOn((list) =>
                  active ? list.filter((x) => x !== s) : [...list, s],
                )
              }
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-xs",
                active
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border text-muted",
              )}
            >
              {s}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted">
        推荐：lint + typecheck + unit 必跑；e2e 可分片；失败上传 artifact。
      </p>
      {["lint", "typecheck", "unit"].every((s) => on.includes(s)) ? (
        <p className="mt-2 text-sm text-pass">基础质量门禁已齐全。</p>
      ) : (
        <p className="mt-2 text-sm text-warn">至少启用 lint / typecheck / unit。</p>
      )}
    </div>
  );
}
