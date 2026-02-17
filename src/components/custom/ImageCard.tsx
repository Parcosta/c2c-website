import * as React from "react";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string | StaticImageData;
  alt: string;
  title: string;
  description?: string;
  href?: string;
  ariaLabel?: string;
  aspectClassName?: string;
  imageClassName?: string;
}

export function ImageCard({
  src,
  alt,
  title,
  description,
  href,
  ariaLabel,
  className,
  aspectClassName,
  imageClassName,
  ...props
}: ImageCardProps) {
  const content = (
    <Card className={cn("overflow-hidden", className)} {...props}>
      <div className={cn("relative w-full overflow-hidden", aspectClassName ?? "aspect-[16/9]")}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className={cn(
            "object-cover transition-transform duration-300 hover:scale-[1.02]",
            imageClassName
          )}
        />
      </div>
      <CardHeader className="space-y-1">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      {description ? (
        <CardContent className="pt-0 text-sm text-muted-foreground">{description}</CardContent>
      ) : null}
    </Card>
  );

  return href ? (
    <Link href={href} aria-label={ariaLabel ?? title} className="block focus-visible:outline-none">
      {content}
    </Link>
  ) : (
    content
  );
}
