import type { ArchNode, ArchRow } from "@/content/case-studies";

// Service diagram in plain HTML: top-down rows with arrows between them. Single-node rows are centred;
// multi-node rows become columns (null keeps a column empty). Stacks vertically on mobile.
export function ArchitectureDiagram({ rows }: { rows: ArchRow[] }) {
  return (
    <figure aria-label="Architecture diagram" className="mx-auto flex max-w-4xl flex-col items-center">
      {rows.map((row, i) => {
        const multi = row.nodes.length > 1;
        return (
          <div key={i} className="flex w-full flex-col items-center">
            {i > 0 && <Arrow label={row.label} />}
            <div className={`grid w-full gap-x-8 gap-y-3 ${multi ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
              {row.nodes.map((node, j) =>
                node ? (
                  <div key={j} className="flex justify-center">
                    <Node node={node} accent={i === 0} />
                  </div>
                ) : (
                  <div key={j} aria-hidden="true" className="hidden md:block" />
                ),
              )}
            </div>
          </div>
        );
      })}
    </figure>
  );
}

function Node({ node, accent = false }: { node: ArchNode; accent?: boolean }) {
  return (
    <div
      className={`w-full max-w-sm rounded-2xl px-5 py-4 ring-1 ${
        accent ? "bg-accent text-ink ring-transparent" : "bg-ink text-neutral-100 ring-white/10"
      }`}
    >
      <p className="text-ui font-semibold">{node.name}</p>
      <p className={`mt-1 font-dot text-[11px] uppercase tracking-[0.1em] ${accent ? "text-ink/70" : "text-neutral-400"}`}>
        {node.tech}
      </p>
      <p className={`mt-2 text-ui-sm ${accent ? "text-ink/80" : "text-neutral-300"}`}>{node.does}</p>
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div aria-hidden="true" className="flex flex-col items-center py-2 text-muted">
      <span className="h-6 w-px bg-neutral-400" />
      {label && <span className="py-1 font-dot text-[11px] uppercase tracking-[0.1em]">{label}</span>}
      <span className="-mt-1 text-sm leading-none">▼</span>
    </div>
  );
}
