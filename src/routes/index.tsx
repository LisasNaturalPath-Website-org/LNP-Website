import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — Acme" },
      {
        name: "description",
        content: "A clean, simple homepage with everything you need to get started.",
      },
      { property: "og:title", content: "Home — Acme" },
      {
        property: "og:description",
        content: "A clean, simple homepage with everything you need to get started.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  {
    title: "Simple by design",
    description: "Everything you need, nothing you don't. Get up and running in minutes.",
  },
  {
    title: "Built to last",
    description: "Reliable and dependable, so you can focus on what matters most.",
  },
  {
    title: "Easy to grow",
    description: "Start small and scale up whenever you're ready — no rework required.",
  },
];

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold tracking-tight">Acme</span>
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-5xl px-6 py-24 text-center sm:py-32">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome to Acme
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            A clean, simple starting point for everything you want to build.
          </p>
          <div className="mt-8">
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get started
            </a>
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-5xl px-6 pb-24">
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h2 className="text-base font-semibold">{feature.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-5xl px-6 py-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Acme. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
