import type { Plugin } from "vite";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
// @ts-expect-error JS plugin alongside the TS vite config
import { grokPwaPlugin } from "./scripts/grok-pwa-plugin.mjs";

const isGitHubPages =
  process.env.GITHUB_PAGES === "true" ||
  process.env.NITRO_PRESET === "github_pages";

/** Project Pages site: https://xiaoqianran.github.io/learning-testing/ */
const base = isGitHubPages ? "/learning-testing/" : "/";

const lessonSlugs = [
  "why-test",
  "test-pyramid",
  "aaa-pattern",
  "first-principles",
  "vitest-intro",
  "vitest-expect",
  "vitest-mock",
  "vitest-async",
  "vitest-coverage",
  "rtl-intro",
  "rtl-queries",
  "rtl-user-event",
  "rtl-async",
  "pw-intro",
  "pw-locators",
  "pw-assertions",
  "pw-network",
  "pw-debug",
  "puppeteer-intro",
  "puppeteer-vs-pw",
  "defuddle",
  "camoufox",
  "stealth-ethics",
  "flaky-tests",
  "ci-testing",
  "test-strategy",
  "interview-testing",
  "vitest-config",
  "vitest-setup-hooks",
  "vitest-snapshot",
  "vitest-browser-mode",
  "vitest-projects-types",
  "vitest-mocking-matrix",
  "rtl-which-query",
  "rtl-a11y",
  "rtl-frameworks",
  "pw-fixtures",
  "pw-auth",
  "pw-api-visual",
  "pw-agents-mcp",
  "pw-best-practices",
  "puppeteer-bidi-webmcp",
  "defuddle-api",
  "camoufox-python",
  "llms-txt-for-testers",
  "vitest-filtering",
  "vitest-tags",
  "vitest-parallelism",
  "vitest-ui-reporters",
  "vitest-in-source",
  "vitest-extend-matchers",
  "vitest-common-errors",
  "vitest-browser-component",
  "vitest-visual-aria",
  "vitest-mock-requests-fs",
  "rtl-within-debug",
  "rtl-disappearance",
  "rtl-custom-queries",
  "rtl-accessibility-api",
  "pw-codegen",
  "pw-pom",
  "pw-actionability",
  "pw-clock",
  "pw-parallel-shard",
  "pw-dialogs-downloads",
  "pw-frames-context",
  "pw-parameterize-webserver",
  "pw-emulation-media",
  "pw-a11y-axe",
  "pw-aria-snapshots",
  "puppeteer-screenshots-pdf",
  "defuddle-cli-options",
  "camoufox-geoip-proxy",
  "camoufox-fingerprint-matrix",
  "camoufox-virtual-mainworld",
  "camoufox-usage-sync-async",
  "pw-component-testing",
  "vitest-test-context",
  "vitest-environment",
];

const staticPages = [
  { path: "/" },
  { path: "/hub" },
  { path: "/lab" },
  { path: "/mistakes" },
  { path: "/certificate" },
  { path: "/playground" },
  { path: "/studio" },
  { path: "/cheatsheet" },
  { path: "/login" },
  { path: "/docs" },
  ...lessonSlugs.map((slug) => ({ path: `/lesson/${slug}` })),
];

/**
 * Finish PGLite bootstrap during dev-server setup (before traffic).
 */
function pgliteBootstrapPlugin(): Plugin {
  return {
    name: "app-builder:pglite-bootstrap",
    apply: "serve",
    async configureServer(server) {
      try {
        const mod = (await server.ssrLoadModule("/src/lib/db.ts")) as {
          ensureDbReady?: () => Promise<void>;
        };
        if (typeof mod.ensureDbReady === "function") {
          await mod.ensureDbReady();
        }
      } catch (err) {
        console.error("[app-builder] DB bootstrap failed:", err);
        throw err;
      }
    },
  };
}

function authPopupPlugin(): Plugin {
  return {
    name: "app-builder:auth-popup",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const rawUrl = req.url ?? "";
          const pathOnly = rawUrl.split("?", 1)[0] ?? "";
          if (pathOnly !== "/auth/popup") {
            next();
            return;
          }
          if ((req.method ?? "GET").toUpperCase() !== "GET") {
            res.statusCode = 405;
            res.setHeader("content-type", "text/plain; charset=utf-8");
            res.end("Method Not Allowed");
            return;
          }

          const host = String(
            req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost:8080",
          );
          const proto = String(
            req.headers["x-forwarded-proto"] ??
              ((req.socket as { encrypted?: boolean } | undefined)?.encrypted
                ? "https"
                : "http"),
          );
          const requestHeaders = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
              for (const v of value) requestHeaders.append(key, v);
            } else {
              requestHeaders.set(key, value);
            }
          }
          if (!requestHeaders.has("host")) requestHeaders.set("host", host);

          const request = new Request(`${proto}://${host}${rawUrl}`, {
            method: "GET",
            headers: requestHeaders,
          });

          const mod = (await server.ssrLoadModule(
            "/src/lib/auth/popup.server.ts",
          )) as {
            handleAuthPopupRequest: (req: Request) => Promise<Response>;
          };
          const response = await mod.handleAuthPopupRequest(request);

          res.statusCode = response.status;
          const setCookies =
            typeof response.headers.getSetCookie === "function"
              ? response.headers.getSetCookie()
              : [];
          response.headers.forEach((value, key) => {
            if (key.toLowerCase() === "set-cookie") return;
            res.setHeader(key, value);
          });
          for (const cookie of setCookies) {
            res.appendHeader("set-cookie", cookie);
          }
          const body = Buffer.from(await response.arrayBuffer());
          res.end(body);
        } catch (err) {
          console.error("[app-builder] /auth/popup handler failed:", err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("content-type", "text/plain; charset=utf-8");
            res.end("auth popup failed");
          }
        }
      });
    },
  };
}

// GitHub Pages: SPA + prerender, no Nitro.
// Vercel deploy: Nitro vercel preset (only when not building for Pages).
export default defineConfig(({ command }) => ({
  base,
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    pgliteBootstrapPlugin(),
    authPopupPlugin(),
    grokPwaPlugin(),
    tailwindcss(),
    tanstackStart(
      isGitHubPages
        ? {
            spa: { enabled: true },
            prerender: {
              enabled: true,
              crawlLinks: true,
              autoStaticPathsDiscovery: true,
              failOnError: false,
            },
            pages: staticPages,
          }
        : undefined,
    ),
    ...(command === "build" && !isGitHubPages
      ? [
          nitro({
            preset: "vercel",
            serverDir: "./server",
          }),
        ]
      : []),
    viteReact(),
  ],
}));
