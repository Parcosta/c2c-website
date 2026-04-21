import { BlockFrame, BlockHeader } from "@/components/blocks/BlockFrame";
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
    <BlockFrame className={className} aria-labelledby="projects-title">
      <BlockHeader
        eyebrow={sectionLabel}
        title={title}
        rightLinkLabel={visitStoreLabel}
        rightLinkHref="/store"
        titleId="projects-title"
      />
      <ProjectsFilterableGrid projects={projects} filters={filters} />
    </BlockFrame>
  );
}
