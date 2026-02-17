import type { Locale } from "@/lib/i18n";
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

  return (
    <main data-testid="booking-page">
      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="space-y-2">
            <h1 className="font-display text-header text-gray-100">
              {locale === "es" ? "Contratación" : "Booking"}
            </h1>
            <p className="max-w-2xl text-body text-gray-300">
              {locale === "es"
                ? "Solicita una contratación para tu evento."
                : "Request a booking for your event."}
            </p>
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
