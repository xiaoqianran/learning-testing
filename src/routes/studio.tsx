import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/store/progress";
import { cn } from "@/lib/utils";
import { Check, Flag, RotateCcw, Terminal } from "lucide-react";

export const Route = createFileRoute("/studio")({
  component: StudioPage,
});

type Quest = {
  id: string;
  title: string;
  prompt: string;
  options: string[];
  answer: number;
  explain: string;
};

const QUESTS: Quest[] = [
  {
    id: "q-locator",
    title: "任务 1 · 定位器",
    prompt: "点击「提交订单」按钮，最稳健的 Playwright 写法？",
    options: [
      "page.locator('#btn-3').click()",
      "page.getByRole('button', { name: '提交订单' }).click()",
      "page.mouse.click(120, 400)",
      "document.querySelector('button').click()",
    ],
    answer: 1,
    explain: "getByRole + 可访问名抗重构。",
  },
  {
    id: "q-assert",
    title: "任务 2 · 断言",
    prompt: "等待成功提示出现，应写？",
    options: [
      "await page.waitForTimeout(5000)",
      "await expect(page.getByText('下单成功')).toBeVisible()",
      "const t = await page.textContent('body'); expect(t).toContain('成功')",
      "while(true) { /* poll */ }",
    ],
    answer: 1,
    explain: "Web-first 断言自动重试。",
  },
  {
    id: "q-mock",
    title: "任务 3 · Mock 边界",
    prompt: "单测购物车计价时，合理 mock 的是？",
    options: [
      "计价纯函数本身",
      "外部汇率 HTTP API",
      "所有内部 helper",
      "测试框架 expect",
    ],
    answer: 1,
    explain: "只挡外部 I/O，真实测业务规则。",
  },
  {
    id: "q-rtl",
    title: "任务 4 · RTL 查询",
    prompt: "断言错误提示「不存在」用？",
    options: [
      "getByText('错误')",
      "queryByText('错误') 再 not.toBeInTheDocument()",
      "findByText('错误')",
      "getAllByText 必抛",
    ],
    answer: 1,
    explain: "query* 找不到返回 null。",
  },
  {
    id: "q-flaky",
    title: "任务 5 · Flaky",
    prompt: "最容易导致偶发失败的是？",
    options: [
      "await expect(locator).toBeVisible()",
      "固定 sleep 后立刻断言 DOM",
      "每个测试独立 fixture 数据",
      "fake timers 测 debounce",
    ],
    answer: 1,
    explain: "固定 sleep 与竞态是 flaky 温床。",
  },
  {
    id: "q-camoufox",
    title: "任务 6 · 高级工具",
    prompt: "Camoufox 合理用途？",
    options: [
      "未授权刷单",
      "测试自有站点风控是否误伤自动化",
      "绕过支付验证",
      "删除别人的数据",
    ],
    answer: 1,
    explain: "合法防御与授权场景。",
  },
];

function StudioPage() {
  const studioQuests = useProgress((s) => s.studioQuests);
  const markQuest = useProgress((s) => s.markQuest);
  const resetQuests = useProgress((s) => s.resetQuests);
  const checkInToday = useProgress((s) => s.checkInToday);

  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const quest = QUESTS[idx];
  const doneSet = useMemo(() => new Set(studioQuests), [studioQuests]);
  const progress = {
    done: studioQuests.filter((id) => QUESTS.some((q) => q.id === id)).length,
    total: QUESTS.length,
  };
  const pct = Math.round((progress.done / progress.total) * 100);

  function submit() {
    if (choice === null) return;
    setRevealed(true);
    if (choice === quest.answer) {
      markQuest(quest.id);
      checkInToday();
    }
  }

  function next() {
    setChoice(null);
    setRevealed(false);
    setIdx((i) => Math.min(i + 1, QUESTS.length - 1));
  }

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Terminal className="h-3.5 w-3.5" />
          测试工坊
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg">
          闯关：像 QA 一样思考
        </h1>
        <p className="mt-1 text-sm text-muted">
          6 个实战选择题，覆盖定位、断言、mock、RTL、flaky 与合规
        </p>
      </header>

      <section className="mb-6 rounded-xl border border-border bg-surface p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-fg">
              进度 {progress.done}/{progress.total}
            </p>
            <div className="mt-2 h-2 w-48 overflow-hidden rounded-full bg-surface-3">
              <div
                className="h-full rounded-full bg-primary transition-[width]"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              resetQuests();
              setIdx(0);
              setChoice(null);
              setRevealed(false);
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            重置闯关
          </Button>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {QUESTS.map((q, i) => (
            <button
              key={q.id}
              type="button"
              onClick={() => {
                setIdx(i);
                setChoice(null);
                setRevealed(false);
              }}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs",
                i === idx
                  ? "border-primary bg-primary-soft text-primary"
                  : doneSet.has(q.id)
                    ? "border-pass/40 text-pass"
                    : "border-border text-muted",
              )}
            >
              {doneSet.has(q.id) ? <Check className="h-3 w-3" /> : <Flag className="h-3 w-3" />}
              {i + 1}
            </button>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-surface p-5 shadow-soft">
        <p className="text-xs font-medium text-primary">{quest.title}</p>
        <h2 className="mt-2 text-base font-semibold text-fg">{quest.prompt}</h2>
        <div className="mt-4 grid gap-2">
          {quest.options.map((opt, oi) => {
            let cls = "border-border bg-surface-2 hover:border-border-strong";
            if (revealed) {
              if (oi === quest.answer) cls = "border-primary/50 bg-primary-soft";
              else if (oi === choice) cls = "border-danger/40 bg-danger/10";
              else cls = "border-border opacity-70";
            } else if (choice === oi) {
              cls = "border-primary bg-primary-soft";
            }
            return (
              <button
                key={oi}
                type="button"
                disabled={revealed}
                onClick={() => setChoice(oi)}
                className={cn(
                  "rounded-md border px-3 py-2.5 text-left text-sm transition-colors",
                  cls,
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {revealed ? (
          <p className="mt-3 text-sm text-muted">{quest.explain}</p>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-2">
          {!revealed ? (
            <Button onClick={submit} disabled={choice === null}>
              提交
            </Button>
          ) : (
            <>
              {idx < QUESTS.length - 1 ? (
                <Button onClick={next}>下一任务</Button>
              ) : progress.done === progress.total ? (
                <p className="text-sm text-pass">全部通关，去结业页看看进度吧</p>
              ) : (
                <p className="text-sm text-muted">还有未通过任务，点上方圆点重试</p>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
