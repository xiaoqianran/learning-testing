import { createFileRoute, Link } from "@tanstack/react-router";
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
            <h1 className="font-display text-lg font-semibold text-fg">学习进度本地保存</h1>
            <p className="text-xs text-muted">Learning Testing · v3</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted">
          本站为纯前端学习产品，进度保存在浏览器本地，无需登录。
        </p>
        <Link
          to="/"
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg no-underline"
        >
          返回首页继续学习
        </Link>
      </div>
    </main>
  );
}
