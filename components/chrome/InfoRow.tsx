import { infoRow } from "@/content/profile";

// Fixed status row, top-left. mix-blend-difference keeps it readable over light and dark sections.
// Mobile shows only the "Building at" item.
export function InfoRow() {
  return (
    <div className="pointer-events-none fixed inset-x-4 top-4 z-40 grid grid-cols-2 text-neutral-100 mix-blend-difference lg:inset-x-8 lg:top-6 lg:grid-cols-4">
      {infoRow.map((item, i) => (
        <dl key={item.label} className={`text-ui font-medium ${i === 1 ? "" : "hidden lg:block"}`}>
          <dt>{item.label}</dt>
          <dd className="text-neutral-400">{item.value}</dd>
        </dl>
      ))}
    </div>
  );
}
