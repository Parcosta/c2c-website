import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

const LAST_UPDATED = "2026-02-17";

type TermsCopy = {
  title: string;
  subtitle: string;
  lastUpdatedLabel: string;
  intro: string;
  sections: Array<{
    heading: string;
    body: Array<
      | { type: "p"; text: string }
      | { type: "ul"; items: string[] }
      | { type: "ol"; items: string[] }
      | { type: "pWithLinks"; parts: Array<{ text: string; href?: string }> }
    >;
  }>;
};

function getCopy(locale: Locale): TermsCopy {
  if (locale === "es") {
    return {
      title: "Términos del servicio",
      subtitle: "Condiciones de uso de este sitio web.",
      lastUpdatedLabel: "Última actualización",
      intro:
        "Al acceder o usar este sitio, aceptas estos términos. Si no estás de acuerdo, no uses el sitio.",
      sections: [
        {
          heading: "Uso del sitio",
          body: [
            {
              type: "ul",
              items: [
                "Debes usar el sitio de forma legal y respetuosa.",
                "No intentes interrumpir, dañar o acceder sin autorización a sistemas o datos.",
                "Podemos suspender o restringir el acceso si detectamos abuso o riesgo de seguridad."
              ]
            }
          ]
        },
        {
          heading: "Contenido y propiedad intelectual",
          body: [
            {
              type: "p",
              text: "Salvo que se indique lo contrario, el contenido del sitio (textos, imágenes, audio, vídeo y diseño) pertenece a C2C o se usa con permiso. No puedes copiar, modificar o redistribuir contenido sin autorización."
            }
          ]
        },
        {
          heading: "Enlaces a terceros",
          body: [
            {
              type: "p",
              text: "El sitio puede incluir enlaces a servicios de terceros. No controlamos esos sitios y no somos responsables de su contenido o prácticas."
            }
          ]
        },
        {
          heading: "Exclusión de garantías",
          body: [
            {
              type: "p",
              text: "El sitio se proporciona “tal cual” y “según disponibilidad”. No garantizamos que el sitio sea ininterrumpido, seguro o libre de errores."
            }
          ]
        },
        {
          heading: "Limitación de responsabilidad",
          body: [
            {
              type: "p",
              text: "En la medida permitida por la ley, C2C no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos derivados del uso del sitio."
            }
          ]
        },
        {
          heading: "Privacidad y cookies",
          body: [
            {
              type: "pWithLinks",
              parts: [
                { text: "Consulta nuestra " },
                { text: "Política de privacidad", href: "/privacy-policy" },
                { text: " para saber cómo tratamos datos y cómo gestionamos cookies." }
              ]
            }
          ]
        },
        {
          heading: "Cambios",
          body: [
            {
              type: "p",
              text: "Podemos actualizar estos Términos. Publicaremos la versión actualizada en esta página e indicaremos la fecha de última actualización."
            }
          ]
        }
      ]
    };
  }

  return {
    title: "Terms of Service",
    subtitle: "Rules and conditions for using this website.",
    lastUpdatedLabel: "Last updated",
    intro:
      "By accessing or using this website, you agree to these terms. If you do not agree, do not use the site.",
    sections: [
      {
        heading: "Use of the site",
        body: [
          {
            type: "ul",
            items: [
              "You must use the site lawfully and respectfully.",
              "Do not attempt to disrupt, damage, or gain unauthorized access to systems or data.",
              "We may suspend or restrict access if we detect abuse or security risk."
            ]
          }
        ]
      },
      {
        heading: "Content and intellectual property",
        body: [
          {
            type: "p",
            text: "Unless stated otherwise, the site content (text, images, audio, video, and design) is owned by C2C or used with permission. You may not copy, modify, or redistribute content without authorization."
          }
        ]
      },
      {
        heading: "Third-party links",
        body: [
          {
            type: "p",
            text: "The site may include links to third-party services. We do not control those sites and are not responsible for their content or practices."
          }
        ]
      },
      {
        heading: "Disclaimer of warranties",
        body: [
          {
            type: "p",
            text: "The site is provided “as is” and “as available”. We do not warrant that the site will be uninterrupted, secure, or error-free."
          }
        ]
      },
      {
        heading: "Limitation of liability",
        body: [
          {
            type: "p",
            text: "To the maximum extent permitted by law, C2C will not be liable for indirect, incidental, special, consequential, or punitive damages arising out of your use of the site."
          }
        ]
      },
      {
        heading: "Privacy and cookies",
        body: [
          {
            type: "pWithLinks",
            parts: [
              { text: "See our " },
              { text: "Privacy Policy", href: "/privacy-policy" },
              { text: " to learn how we handle personal data and manage cookies." }
            ]
          }
        ]
      },
      {
        heading: "Changes",
        body: [
          {
            type: "p",
            text: "We may update these Terms. We will post the updated version on this page and update the “Last updated” date."
          }
        ]
      }
    ]
  };
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const copy = getCopy(locale);
  return {
    title: copy.title
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const copy = getCopy(locale);

  const prefix = `/${locale}`;
  const resolveHref = (href: string) => (href.startsWith("/") ? `${prefix}${href}` : href);

  return (
    <main>
      <Section>
        <Container>
          <div className="space-y-10">
            <div className="space-y-3">
              <SectionHeading title={copy.title} subtitle={copy.subtitle} as="h1" />
              <div className="text-sm text-slate-300">
                {copy.lastUpdatedLabel}:{" "}
                <time dateTime={LAST_UPDATED} className="text-slate-200">
                  {LAST_UPDATED}
                </time>
              </div>
            </div>

            <p className="max-w-prose text-sm leading-relaxed text-slate-300 sm:text-base">
              {copy.intro}
            </p>

            <div className="space-y-10">
              {copy.sections.map((section) => (
                <section key={section.heading} className="space-y-3">
                  <h2 className="font-display text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
                    {section.heading}
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                    {section.body.map((block, index) => {
                      if (block.type === "p") return <p key={index}>{block.text}</p>;
                      if (block.type === "pWithLinks") {
                        return (
                          <p key={index}>
                            {block.parts.map((part, partIndex) =>
                              part.href ? (
                                <Link
                                  key={`${part.href}-${partIndex}`}
                                  href={resolveHref(part.href)}
                                  className="text-slate-200 underline-offset-4 hover:underline"
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
                      if (block.type === "ul") {
                        return (
                          <ul key={index} className="list-disc space-y-1 pl-5">
                            {block.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <ol key={index} className="list-decimal space-y-1 pl-5">
                          {block.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ol>
                      );
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
