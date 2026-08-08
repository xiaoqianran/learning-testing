import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public");
const bundle = path.join(root, "node_modules/.cache/lessons-llms.mjs");
fs.mkdirSync(path.dirname(bundle), { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

execSync(
  `npx esbuild ${path.join(root, "src/data/lessons.ts")} --bundle --format=esm --platform=node --outfile=${bundle}`,
  { stdio: "inherit", cwd: root },
);

const { LESSONS } = await import(pathToFileURL(bundle).href + `?t=${Date.now()}`);
const SITE = "https://xiaoqianran.github.io/learning-testing";

function blockMd(b) {
  if (b.type === "text") {
    const head = b.title ? `### ${b.title}\n\n` : "";
    return `${head}${b.body || ""}\n`;
  }
  if (b.type === "tip") return `> **提示：** ${b.body || ""}\n`;
  if (b.type === "code") {
    const head = b.title ? `### ${b.title}\n\n` : "";
    return `${head}\`\`\`${b.lang || "ts"}\n${b.code || ""}\n\`\`\`\n`;
  }
  if (b.type === "demo") {
    return `**交互 Demo：** ${b.title || ""}（kind: \`${b.kind}\`）\n`;
  }
  if (b.type === "quiz") {
    const lines = ["**测验：**"];
    for (const q of b.questions || []) {
      lines.push(`- Q: ${q.question}`);
      (q.options || []).forEach((o, i) => {
        lines.push(`  - [${i === q.answer ? "✓" : " "}] ${o}`);
      });
      lines.push(`  - 解析: ${q.explain}`);
    }
    return lines.join("\n") + "\n";
  }
  return "";
}

const byTrack = new Map();
for (const l of LESSONS) {
  const t = l.track || "其他";
  if (!byTrack.has(t)) byTrack.set(t, []);
  byTrack.get(t).push(l);
}
const order = ["基础概念", "Vitest", "Testing Library", "Playwright", "Puppeteer", "高级工具", "工程化"];
const tracks = [
  ...order.filter((t) => byTrack.has(t)),
  ...[...byTrack.keys()].filter((t) => !order.includes(t)),
];

const index = [
  "# learning-testing",
  "",
  "> 交互式中文前端测试教程：Vitest · Testing Library · Playwright · Puppeteer · CI。",
  "> Vitest 官方有 [llms.txt](https://vitest.dev/llms.txt)；Playwright / RTL 暂无。权威以各官网文档为准。",
  "",
  `完整上下文（全文）：[${SITE}/llms-full.txt](${SITE}/llms-full.txt)`,
  "",
  "## 官方权威（务必优先）",
  "",
  "- [vitest.dev/llms.txt](https://vitest.dev/llms.txt) — **有**",
  "- [Vitest Docs](https://vitest.dev/)",
  "- [Playwright Docs](https://playwright.dev/docs/intro) — 暂无 llms.txt",
  "- [Testing Library](https://testing-library.com/docs/) — 暂无 llms.txt",
  "- [Puppeteer](https://pptr.dev/) — 暂无 llms.txt",
  "",
  "## 站点入口",
  "",
  `- [首页大纲](${SITE}/)`,
  `- [文档地图](${SITE}/docs)`,
  `- [Playground](${SITE}/playground)`,
  `- [工坊](${SITE}/studio)`,
  `- [速查表](${SITE}/cheatsheet)`,
  `- [学习中心](${SITE}/hub)`,
  `- [结业证明](${SITE}/certificate)`,
  "",
];

for (const tr of tracks) {
  index.push(`## 课程 · ${tr}`, "");
  for (const l of byTrack.get(tr)) {
    index.push(
      `- [${l.title}](${SITE}/lesson/${l.slug}): ${l.summary}（${l.level} · ${l.minutes} 分钟）`,
    );
  }
  index.push("");
}

const full = [
  "# learning-testing — full curriculum",
  "",
  `生成自本站 ${LESSONS.length} 课。API 语义以各官方文档为准。`,
  "",
];

for (const l of LESSONS) {
  full.push(
    `---`,
    "",
    `# ${l.title}`,
    "",
    `- slug: \`${l.slug}\``,
    `- track: ${l.track}`,
    `- level: ${l.level}`,
    `- minutes: ${l.minutes}`,
    "",
  );
  for (const b of l.blocks || []) full.push(blockMd(b), "");
}

fs.writeFileSync(path.join(outDir, "llms.txt"), index.join("\n"));
fs.writeFileSync(path.join(outDir, "llms-full.txt"), full.join("\n"));
console.log("lessons", LESSONS.length);
console.log("llms.txt", fs.statSync(path.join(outDir, "llms.txt")).size);
console.log("llms-full.txt", fs.statSync(path.join(outDir, "llms-full.txt")).size);
