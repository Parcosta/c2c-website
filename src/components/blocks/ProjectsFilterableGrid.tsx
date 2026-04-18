"use client";

import { useState } from "react";

import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  /**
   * Sanity `portfolioItem.filterCategory` value. Used to match against the
   * active filter key. Undefined means the project won't match any filter
   * except `all`.
   */
  category?: string;
}

export interface ProjectsFilter {
  /** Internal key. `all` is reserved for the unfiltered view. */
  key: string;
  label: string;
}

export interface ProjectsFilterableGridProps {
  projects: ProjectItem[];
  filters: ProjectsFilter[];
}

export function ProjectsFilterableGrid({ projects, filters }: ProjectsFilterableGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {filters.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              aria-pressed={activeFilter === filter.key}
              className={cn(
                "h-9 px-3 text-xs tracking-wide transition-colors",
                activeFilter === filter.key
                  ? "border border-gray-400 text-white"
                  : "border border-gray-800 text-white hover:border-gray-600"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            category={project.category ?? ""}
          />
        ))}
      </div>
    </>
  );
}
