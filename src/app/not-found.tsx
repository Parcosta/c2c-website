import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function NotFound() {
  return (
    <main data-testid="not-found">
      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="max-w-2xl space-y-4">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Page not found
            </h1>
            <p className="text-slate-300">That route doesn’t exist.</p>
            <Link
              href="/en"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              data-testid="not-found-home"
            >
              Back to home
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
