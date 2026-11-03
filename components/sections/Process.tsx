import { processSteps } from "@/content/craft";
import { Reveal } from "@/components/ui/Reveal";

// "How I work": the client process in four numbered steps, hairline-topped like the About facts.
export function Process() {
  return (
    <section aria-labelledby="process-title" className="grid grid-cols-12 gap-x-4 gap-y-10 px-4 pb-8 pt-28 lg:gap-x-8 lg:px-8 lg:pt-40">
      <h2 id="process-title" className="col-span-12 text-ui-sm font-semibold uppercase text-muted lg:col-span-3">
        How I work
      </h2>
      <Reveal className="col-span-12 grid gap-x-4 gap-y-8 md:grid-cols-2 lg:col-span-9 lg:grid-cols-4 lg:gap-x-8">
        {processSteps.map((step, i) => (
          <div key={step.title} className="border-t border-neutral-300 pt-4">
            <span className="font-dot text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-ui-lg font-medium">{step.title}</h3>
            <p className="mt-2 text-ui text-muted">{step.body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
