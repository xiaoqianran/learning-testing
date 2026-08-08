import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { FlaskConical } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[70dvh] max-w-sm place-items-center px-4 py-12">
      <div className="w-full space-y-4 rounded-xl border border-border bg-surface p-6 shadow-soft">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-soft text-primary">
            <FlaskConical className="h-4 w-4" />
          </span>
          <div>
            <h1 className="font-display text-lg font-semibold text-fg">登录</h1>
            <p className="text-xs text-muted">Learning Testing</p>
          </div>
        </div>
        {authEnabled ? (
          <div className="space-y-2">
            {GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                className="w-full"
                variant="secondary"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                使用 {p.label} 继续
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">登录已关闭（开发模式）。</p>
        )}
        <Link
          to="/"
          className="block text-center text-xs text-muted no-underline hover:text-primary"
        >
          返回课程
        </Link>
      </div>
    </main>
  );
}
