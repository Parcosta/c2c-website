import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Loading" className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(59,130,246,0.12),transparent_55%),radial-gradient(700px_circle_at_85%_35%,rgba(59,130,246,0.08),transparent_55%)]"
      />
      <Section>
        <Container>
          <div className="space-y-10">
            <header className="space-y-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-[min(520px,90%)]" />
              <Skeleton className="h-5 w-[min(680px,100%)]" />
            </header>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <Skeleton className="h-4 w-32" />
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-6 w-44" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <Skeleton className="h-4 w-24" />
                <div className="mt-4 flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-4 w-44" />
                </div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <Skeleton className="h-4 w-28" />
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-56" />
                  <Skeleton className="h-4 w-52" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
