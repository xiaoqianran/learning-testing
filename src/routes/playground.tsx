import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Code2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/playground")({
  component: PlaygroundPage,
});

type Case = {
  id: string;
  title: string;
  setup: string;
  expression: string;
  expected: string;
  run: () => { pass: boolean; actual: string };
};

const CASES: Case[] = [
  {
    id: "tobe",
    title: "toBe 数字",
    setup: "const sum = (a: number, b: number) => a + b",
    expression: "expect(sum(2, 3)).toBe(5)",
    expected: "PASS",
    run: () => {
      const actual = 2 + 3;
      return { pass: actual === 5, actual: String(actual) };
    },
  },
  {
    id: "deep",
    title: "toEqual 对象",
    setup: "const user = { id: 1, name: 'Ada' }",
    expression: "expect(user).toEqual({ id: 1, name: 'Ada' })",
    expected: "PASS",
    run: () => {
      const user = { id: 1, name: "Ada" };
      const exp = { id: 1, name: "Ada" };
      const pass = JSON.stringify(user) === JSON.stringify(exp);
      return { pass, actual: JSON.stringify(user) };
    },
  },
  {
    id: "subset",
    title: "toMatchObject 子集",
    setup: "const res = { id: 1, name: 'Ada', role: 'admin' }",
    expression: "expect(res).toMatchObject({ name: 'Ada' })",
    expected: "PASS",
    run: () => {
      const res = { id: 1, name: "Ada", role: "admin" };
      const pass = res.name === "Ada";
      return { pass, actual: JSON.stringify(res) };
    },
  },
  {
    id: "array",
    title: "toContain",
    setup: "const tags = ['unit', 'e2e', 'a11y']",
    expression: "expect(tags).toContain('e2e')",
    expected: "PASS",
    run: () => {
      const tags = ["unit", "e2e", "a11y"];
      return { pass: tags.includes("e2e"), actual: tags.join(", ") };
    },
  },
  {
    id: "throw",
    title: "toThrow",
    setup: "const boom = () => { throw new Error('invalid') }",
    expression: "expect(boom).toThrow(/invalid/)",
    expected: "PASS",
    run: () => {
      try {
        throw new Error("invalid");
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { pass: /invalid/.test(msg), actual: msg };
      }
    },
  },
];

function PlaygroundPage() {
  const [active, setActive] = useState(CASES[0].id);
  const [log, setLog] = useState<string | null>(null);
  const [pass, setPass] = useState<boolean | null>(null);
  const current = useMemo(
    () => CASES.find((c) => c.id === active) ?? CASES[0],
    [active],
  );

  function run() {
    const r = current.run();
    setPass(r.pass);
    setLog(
      r.pass
        ? `✓ ${current.expression}\n  actual: ${r.actual}`
        : `✗ ${current.expression}\n  actual: ${r.actual}\n  expected behavior failed`,
    );
  }

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Code2 className="h-3.5 w-3.5" />
          断言沙盒
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg">
          即时验证 expect 直觉
        </h1>
        <p className="mt-1 text-sm text-muted">
          浏览器内模拟常见断言（教学用，非完整 Vitest 运行时）
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {CASES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setActive(c.id);
              setLog(null);
              setPass(null);
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs",
              active === c.id
                ? "border-primary bg-primary-soft text-primary"
                : "border-border bg-surface text-muted",
            )}
          >
            {c.title}
          </button>
        ))}
      </div>

      <section className="mt-4 overflow-hidden rounded-xl border border-border bg-code-bg shadow-soft">
        <div className="border-b border-border px-4 py-2 text-xs text-muted">
          sandbox.spec.ts
        </div>
        <pre className="p-4 font-mono text-[13px] leading-relaxed text-code-fg">
          <span className="text-subtle">// setup</span>
          {"\n"}
          {current.setup}
          {"\n\n"}
          <span className="text-subtle">// test</span>
          {"\n"}
          <span className="text-pass">it</span>
          {"('case', () => {\n  "}
          {current.expression}
          {"\n})"}
        </pre>
      </section>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={run}>
          <Play className="h-4 w-4" />
          运行断言
        </Button>
      </div>

      {log ? (
        <pre
          className={cn(
            "mt-4 rounded-xl border p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap",
            pass
              ? "border-pass/30 bg-pass/10 text-pass"
              : "border-danger/30 bg-danger/10 text-danger",
          )}
        >
          {log}
        </pre>
      ) : (
        <p className="mt-4 text-sm text-subtle">点击运行查看 PASS / FAIL</p>
      )}
    </div>
  );
}
