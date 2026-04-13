"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/Container";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

import type { Locale } from "@/lib/i18n";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: "all" | "musica" | "sonoro" | "video" | "mixes" | "dev";
}

const projects: Project[] = [
  {
    id: "1",
    title: "Fauna Reve",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes",
    imageUrl: "/images/project-1.jpg",
    category: "musica",
  },
  {
    id: "2",
    title: "Modular Sessions",
    description: "Live modular synthesis performances exploring the boundaries of electronic music and improvisation.",
    imageUrl: "/images/project-2.jpg",
    category: "sonoro",
  },
  {
    id: "3",
    title: "Visual Landscapes",
    description: "Audio-reactive visual installations combining generative art with live electronic music.",
    imageUrl: "/images/project-3.jpg",
    category: "video",
  },
  {
    id: "4",
    title: "Underground Mix",
    description: "A curated selection of deep techno and ambient tracks for late night listening sessions.",
    imageUrl: "/images/project-4.jpg",
    category: "mixes",
  },
  {
    id: "5",
    title: "Synth Toolkit",
    description: "Open-source Max/MSP patches and Ableton Live devices for electronic music production.",
    imageUrl: "/images/project-5.jpg",
    category: "dev",
  },
  {
    id: "6",
    title: "Echoes of Berlin",
    description: "Field recordings and sonic explorations from the streets and clubs of Berlin.",
    imageUrl: "/images/project-6.jpg",
    category: "musica",
  },
  {
    id: "7",
    title: "Spatial Audio",
    description: "Immersive 8-channel sound design for installations and live performances.",
    imageUrl: "/images/project-7.jpg",
    category: "sonoro",
  },
  {
    id: "8",
    title: "Code & Sound",
    description: "Interactive web-based audio experiments using Web Audio API and React.",
    imageUrl: "/images/project-8.jpg",
    category: "dev",
  },
];

const filters = [
  { key: "all", label: "TODOS" },
  { key: "musica", label: "MUSICA" },
  { key: "sonoro", label: "SONORO" },
  { key: "video", label: "VIDEO" },
  { key: "mixes", label: "MIXES" },
  { key: "dev", label: "DEV" },
] as const;

export interface ProjectsBlockProps {
  locale: Locale;
  className?: string;
}

export function ProjectsBlock({ locale, className }: ProjectsBlockProps) {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className={cn("w-full", className)}>
      <Container>
        <div className="flex flex-col gap-8 py-10 px-6">
          {/* Header */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-gray-500">
              MÚSICA ELECTRÓNICA EXPERIMENTAL Y SÍNTESIS MODULAR
            </p>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-50 tracking-tight">
                PROYECTOS Y LANZAMIENTOS
              </h2>
              <a
                href={`/${locale}/store`}
                className="text-lg text-gray-500 hover:text-gray-300 transition-colors"
              >
                VISITA LA TIENDA
              </a>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                category={project.category}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
