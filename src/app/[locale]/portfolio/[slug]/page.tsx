import Image from "next/image";
import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { getSanityImageUrl } from "@/sanity/image";
import { client } from "@/sanity/client";
import { buildPortfolioItemBySlugQuery, type PortfolioItemValue } from "@/sanity/queries";

type PageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

function coerceLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export default async function PortfolioItemPage({ params }: PageProps) {
  const locale = coerceLocale(params.locale);
  const def = buildPortfolioItemBySlugQuery(locale, params.slug);

  const item = await client.fetch<PortfolioItemValue | null>(def.query, def.params);
  if (!item?.slug) notFound();

  const images = (item.images ?? [])
    .map((image) => getSanityImageUrl(image))
    .filter((url): url is string => Boolean(url));

  return (
    <main>
      <Section>
        <Container>
          <div className="space-y-8">
            <SectionHeading
              title={item.title?.trim() || "Untitled"}
              subtitle={item.category?.trim() || undefined}
              as="h1"
            />

            {images.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {images.map((url) => (
                  <div key={url} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-800">
                    <Image src={url} alt={item.title?.trim() || "Portfolio image"} fill className="object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No images available yet.</p>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}

