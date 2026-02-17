"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface LazyMountProps {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
  className?: string;
}

export function LazyMount({
  children,
  placeholder = null,
  rootMargin = "200px 0px",
  className
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isMounted, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {isMounted ? children : placeholder}
    </div>
  );
}

