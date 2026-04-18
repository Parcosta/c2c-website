import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import {
  ProjectsFilterableGrid,
  type ProjectItem,
  type ProjectsFilter
} from "./ProjectsFilterableGrid";

export type { ProjectItem, ProjectsFilter } from "./ProjectsFilterableGrid";

export interface ProjectsBlockProps {
  projects: ProjectItem[];
  sectionLabel: string;
  title: string;
  visitStoreLabel: string;
  filters: ProjectsFilter[];
  className?: string;
}

/**
 * Server component. Renders the static header + layout; the interactive
 * filter tabs and grid live in `ProjectsFilterableGrid` (client).
 *
 * The "visit store" link points at `/store` (not locale-prefixed) — the
 * store is a shared surface that will eventually redirect to an external
 * destination; see `src/app/store/page.tsx`.
 */
export function ProjectsBlock({
  projects,
  sectionLabel,
  title,
  visitStoreLabel,
  filters,
  className
}: ProjectsBlockProps) {
  if (projects.length === 0) return null;

  return (
    <section className={cn("w-full", className)}>
      <Container>
        <div className="flex flex-col gap-8 py-10 px-6">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-gray-500">{sectionLabel}</p>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-50 tracking-tight">{title}</h2>
              <Link
                href="/store"
                className="text-lg text-gray-500 hover:text-gray-300 transition-colors"
              >
                {visitStoreLabel}
              </Link>
            </div>
          </div>

          <ProjectsFilterableGrid projects={projects} filters={filters} />
        </div>
      </Container>
    </section>
  );
}
