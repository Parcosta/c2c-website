import type { Locale } from "@/lib/i18n";
import { getCopy } from "@/lib/copy";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BookingForm } from "@/components/site/BookingForm";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

function getBookingSeo(locale: Locale): { title: string; description: string } {
  switch (locale) {
    case "es":
      return {
        title: "Reservar",
        description: "Solicita una reserva para tu evento, club o festival."
      };
    case "en":
    default:
      return {
        title: "Book a Show",
        description: "Request a booking for your event, club, or festival."
      };
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = getBookingSeo(locale);
  return buildMetadata({
    ...seo,
    pathname: `/${locale}/booking`
  });
}

export default async function BookingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const copy = getCopy(locale);

  return (
    <main data-testid="booking-page">
      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              {copy.booking.title}
            </h1>
            <p className="max-w-2xl text-base text-slate-300">{copy.booking.subtitle}</p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="max-w-xl">
            <BookingForm locale={locale} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
