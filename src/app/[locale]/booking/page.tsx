import type { Locale } from "@/lib/i18n";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BookingForm } from "@/components/site/BookingForm";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getSiteLabels } from "@/sanity/cache";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const labels = await getSiteLabels(locale);
  return buildMetadata({
    title: labels?.bookingPage?.seoTitle ?? "",
    description: labels?.bookingPage?.seoDescription ?? "",
    pathname: `/${locale}/booking`
  });
}

export default async function BookingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const labels = await getSiteLabels(locale);

  return (
    <main data-testid="booking-page">
      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="space-y-2">
            <h1 className="font-display text-header text-gray-100">{labels?.bookingPage?.title}</h1>
            <p className="max-w-2xl text-body text-gray-300">{labels?.bookingPage?.subtitle}</p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="max-w-xl">
            <BookingForm
              locale={locale}
              content={labels?.bookingPage?.form}
              eventTypesContent={labels?.bookingPage?.eventTypes}
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
