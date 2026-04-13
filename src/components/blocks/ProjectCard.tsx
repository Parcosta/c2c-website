"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  imageUrl,
  category,
  className,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-1",
        className
      )}
      data-category={category}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="flex gap-2 items-start">
        <h3 className="flex-1 font-semibold text-lg leading-7 text-gray-100">
          {title}
        </h3>
      </div>
      <p className="text-sm leading-6 text-gray-100 line-clamp-3">
        {description}
      </p>
    </article>
  );
}
