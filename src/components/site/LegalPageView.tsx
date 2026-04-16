"use client";

import Link from "next/link";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { LegalPageValue } from "@/sanity/queries";

export function LegalPageView({ locale, page }: { locale: string; page: LegalPageValue | null }) {
  const prefix = `/${locale}`;
  const resolveHref = (href: string) => (href.startsWith("/") ? `${prefix}${href}` : href);

  return (
    <main>
      <Section>
        <Container>
          <div className="space-y-10">
            <div className="space-y-3">
              <SectionHeading title={page?.title ?? ""} subtitle={page?.subtitle} as="h1" />
              <div className="text-sm text-gray-400">
                {page?.lastUpdatedLabel}:{" "}
                <time dateTime={page?.lastUpdated} className="text-gray-200">
                  {page?.lastUpdated}
                </time>
              </div>
            </div>

            {page?.intro ? (
              <p className="max-w-prose text-sm leading-relaxed text-gray-400 sm:text-base">
                {page.intro}
              </p>
            ) : null}

            <div className="space-y-10">
              {(page?.sections ?? []).map((section) => (
                <section key={section._key ?? section.heading} className="space-y-3">
                  <h2 className="font-display text-lg font-semibold tracking-tight text-gray-100 sm:text-xl">
                    {section.heading}
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed text-gray-400 sm:text-base">
                    {(section.body ?? []).map((block, index) => {
                      if (block.type === "p") return <p key={block._key ?? index}>{block.text}</p>;
                      if (block.type === "ul") {
                        return (
                          <ul key={block._key ?? index} className="list-disc space-y-2 pl-5">
                            {(block.items ?? []).map((item, itemIndex) => (
                              <li key={`${block._key ?? index}-${itemIndex}`}>{item}</li>
                            ))}
                          </ul>
                        );
                      }
                      if (block.type === "ol") {
                        return (
                          <ol key={block._key ?? index} className="list-decimal space-y-2 pl-5">
                            {(block.items ?? []).map((item, itemIndex) => (
                              <li key={`${block._key ?? index}-${itemIndex}`}>{item}</li>
                            ))}
                          </ol>
                        );
                      }
                      if (block.type === "pWithLinks") {
                        return (
                          <p key={block._key ?? index}>
                            {(block.parts ?? []).map((part, partIndex) =>
                              part.href ? (
                                <Link
                                  key={`${part.href}-${partIndex}`}
                                  href={resolveHref(part.href)}
                                  className="text-gray-200 underline-offset-4 hover:underline"
                                >
                                  {part.text}
                                </Link>
                              ) : (
                                <span key={`${part.text}-${partIndex}`}>{part.text}</span>
                              )
                            )}
                          </p>
                        );
                      }

                      return null;
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
