import { cn } from "@/lib/utils";

/** 轻量排版：段落、列表、【小标题】行 */
export function RichText({
  body,
  className,
}: {
  body: string;
  className?: string;
}) {
  const blocks = body.split(/\n\n+/).filter(Boolean);

  return (
    <div className={cn("space-y-3 text-[15px] leading-relaxed text-muted", className)}>
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter((l) => l.length > 0);
        const isList = lines.every(
          (l) =>
            /^[•\-\*]\s/.test(l) ||
            /^\d+[\.\、\)]\s/.test(l) ||
            /^【.+】/.test(l),
        );

        if (isList && lines.length > 1) {
          return (
            <ul key={i} className="space-y-1.5 pl-0">
              {lines.map((line, j) => {
                const m = line.match(/^【(.+?)】\s*(.*)$/);
                if (m) {
                  return (
                    <li key={j} className="list-none">
                      <span className="font-medium text-fg">{m[1]}</span>
                      {m[2] ? (
                        <span className="mt-0.5 block text-muted">{m[2]}</span>
                      ) : null}
                    </li>
                  );
                }
                const text = line.replace(/^[•\-\*]\s/, "").replace(/^\d+[\.\、\)]\s/, "");
                return (
                  <li key={j} className="flex gap-2 list-none">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // single 【label】 opener
        if (lines.length === 1 && /^【.+】/.test(lines[0])) {
          const m = lines[0].match(/^【(.+?)】\s*(.*)$/);
          if (m) {
            return (
              <p key={i}>
                <span className="font-medium text-primary">{m[1]}</span>
                {m[2] ? ` ${m[2]}` : null}
              </p>
            );
          }
        }

        // mixed: render with soft breaks
        return (
          <p key={i} className="whitespace-pre-line">
            {lines.map((line, j) => {
              const m = line.match(/^【(.+?)】\s*(.*)$/);
              if (m) {
                return (
                  <span key={j}>
                    {j > 0 ? "\n" : null}
                    <span className="font-medium text-fg">{m[1]}</span>
                    {m[2] ? ` ${m[2]}` : null}
                  </span>
                );
              }
              return (
                <span key={j}>
                  {j > 0 ? "\n" : null}
                  {line}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
