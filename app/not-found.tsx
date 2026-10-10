import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="flex min-h-svh flex-col justify-end px-4 pb-36 lg:px-8">
      <p className="text-ui font-semibold uppercase">Page not found</p>
      <h1 className="text-[clamp(96px,30vw,520px)] font-bold leading-[0.8] tracking-[-0.04em]">404</h1>
      <p className="mt-8 text-ui-lg font-medium">
        That page doesn&apos;t exist.{" "}
        <Link href="/" className="underline underline-offset-4 hover:text-muted">
          Back home
        </Link>{" "}
        or{" "}
        <Link href="/work" className="underline underline-offset-4 hover:text-muted">
          see the work
        </Link>
        .
      </p>
    </main>
  );
}
