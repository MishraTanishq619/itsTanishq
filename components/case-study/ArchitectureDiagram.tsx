import type { ArchNode, CaseStudy } from "@/content/case-studies";

// Service diagram in plain HTML: client → gateway, which splits into REST (auth) and WebSocket (realtime);
// realtime writes to persistence. Stacks vertically on mobile.
export function ArchitectureDiagram({ arch }: { arch: CaseStudy["architecture"] }) {
  return (
    <figure aria-label="Architecture diagram" className="mx-auto flex max-w-4xl flex-col items-center">
      <Node node={arch.client} accent />
      <Arrow />
      <Node node={arch.gateway} />
      <div className="grid w-full grid-cols-1 gap-x-8 md:grid-cols-2">
        <div className="flex flex-col items-center">
          <Arrow label="REST" />
          <Node node={arch.auth} />
        </div>
        <div className="flex flex-col items-center">
          <Arrow label="WebSocket" />
          <Node node={arch.realtime} />
          <Arrow label="Snapshots + updates" />
          <Node node={arch.persistence} />
        </div>
      </div>
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
