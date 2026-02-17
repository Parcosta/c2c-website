import type { Metadata } from "next";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

const LAST_UPDATED = "2026-02-17";

type PolicyCopy = {
  title: string;
  subtitle: string;
  lastUpdatedLabel: string;
  sections: Array<{
    heading: string;
    body: Array<
      | { type: "p"; text: string }
      | { type: "ul"; items: string[] }
      | { type: "ol"; items: string[] }
    >;
  }>;
};

function getCopy(locale: Locale): PolicyCopy {
  if (locale === "es") {
    return {
      title: "Política de privacidad",
      subtitle: "Cómo recopilamos, usamos y protegemos tus datos personales (RGPD).",
      lastUpdatedLabel: "Última actualización",
      sections: [
        {
          heading: "Quiénes somos",
          body: [
            {
              type: "p",
              text:
                "Este sitio web pertenece a Coast2Coast (C2C) (en adelante, “C2C”, “nosotros”). Esta política explica qué datos personales tratamos cuando visitas el sitio o te pones en contacto con nosotros."
            }
          ]
        },
        {
          heading: "Datos personales que recopilamos",
          body: [
            {
              type: "ul",
              items: [
                "Datos de contacto: nombre, correo electrónico y cualquier información que incluyas al escribirnos.",
                "Datos técnicos: dirección IP, identificadores del dispositivo, tipo de navegador, páginas visitadas y eventos de uso (cuando están habilitadas cookies de analítica).",
                "Cookies y tecnologías similares: esenciales para el funcionamiento del sitio y, si lo aceptas, cookies de analítica.",
                "Comunicaciones: contenido de mensajes que nos envíes y nuestra respuesta."
              ]
            }
          ]
        },
        {
          heading: "Finalidades y bases legales (RGPD)",
          body: [
            {
              type: "p",
              text:
                "Tratamos tus datos personales únicamente cuando existe una base legal para ello. Dependiendo del caso, las bases legales pueden ser:"
            },
            {
              type: "ul",
              items: [
                "Consentimiento: por ejemplo, para cookies de analítica o para responder a una solicitud que nos envías voluntariamente.",
                "Ejecución de un contrato o medidas precontractuales: por ejemplo, si gestionamos una contratación o actuación.",
                "Interés legítimo: para mantener la seguridad del sitio, prevenir fraude y mejorar el servicio de forma proporcionada.",
                "Obligación legal: cuando sea necesario para cumplir la normativa aplicable."
              ]
            }
          ]
        },
        {
          heading: "Cómo usamos cookies",
          body: [
            {
              type: "p",
              text:
                "Utilizamos cookies esenciales para que el sitio funcione correctamente. Si lo aceptas, también utilizamos cookies de analítica para medir el uso del sitio y mejorar su rendimiento."
            },
            {
              type: "p",
              text:
                "Puedes gestionar tu consentimiento desde el banner de cookies. También puedes eliminar o bloquear cookies desde la configuración de tu navegador."
            }
          ]
        },
        {
          heading: "Con quién compartimos datos",
          body: [
            {
              type: "p",
              text:
                "Podemos compartir datos con proveedores que nos ayudan a operar el sitio (encargados del tratamiento), por ejemplo hosting, entrega de contenidos, CMS o envío de emails. Solo comparten los datos necesarios y bajo obligaciones de confidencialidad."
            },
            {
              type: "p",
              text:
                "También podemos divulgar información cuando sea necesario para cumplir la ley, hacer valer nuestros derechos o proteger la seguridad de usuarios y del sitio."
            }
          ]
        },
        {
          heading: "Transferencias internacionales",
          body: [
            {
              type: "p",
              text:
                "Algunos proveedores pueden estar ubicados fuera del EEE. Cuando ocurre, aplicamos salvaguardas adecuadas (por ejemplo, cláusulas contractuales tipo) según sea necesario."
            }
          ]
        },
        {
          heading: "Conservación",
          body: [
            {
              type: "p",
              text:
                "Conservamos los datos solo durante el tiempo necesario para las finalidades descritas y para cumplir obligaciones legales. Los plazos exactos pueden variar según el tipo de dato y el contexto."
            }
          ]
        },
        {
          heading: "Seguridad",
          body: [
            {
              type: "p",
              text:
                "Aplicamos medidas técnicas y organizativas razonables para proteger los datos personales. Aun así, ningún sistema es 100% seguro."
            }
          ]
        },
        {
          heading: "Tus derechos",
          body: [
            {
              type: "p",
              text:
                "Según tu ubicación, puedes tener derechos sobre tus datos personales, incluyendo:"
            },
            {
              type: "ul",
              items: [
                "Acceso, rectificación y supresión.",
                "Limitación u oposición al tratamiento.",
                "Portabilidad de datos.",
                "Retirar el consentimiento en cualquier momento (sin afectar la licitud del tratamiento previo).",
                "Presentar una reclamación ante una autoridad de control."
              ]
            },
            {
              type: "p",
              text:
                "Para ejercer tus derechos, ponte en contacto con nosotros a través de los canales publicados en el sitio."
            }
          ]
        },
        {
          heading: "Menores",
          body: [
            {
              type: "p",
              text:
                "Este sitio no está dirigido a menores. Si crees que un menor nos ha proporcionado datos personales, contáctanos para que podamos eliminarlos."
            }
          ]
        },
        {
          heading: "Cambios en esta política",
          body: [
            {
              type: "p",
              text:
                "Podemos actualizar esta Política de Privacidad. Publicaremos cualquier cambio en esta página e indicaremos la fecha de última actualización."
            }
          ]
        }
      ]
    };
  }

  return {
    title: "Privacy Policy",
    subtitle: "How we collect, use, and protect your personal data (GDPR).",
    lastUpdatedLabel: "Last updated",
    sections: [
      {
        heading: "Who we are",
        body: [
          {
            type: "p",
            text:
              "This website is operated by Coast2Coast (C2C) (“C2C”, “we”, “us”). This policy explains what personal data we process when you visit the site or contact us."
          }
        ]
      },
      {
        heading: "Personal data we collect",
        body: [
          {
            type: "ul",
            items: [
              "Contact data: name, email address, and any information you provide when reaching out.",
              "Technical data: IP address, device identifiers, browser type, pages viewed, and usage events (when analytics cookies are enabled).",
              "Cookies and similar technologies: essential cookies required for the site to work and, if you opt in, analytics cookies.",
              "Communications: messages you send us and our replies."
            ]
          }
        ]
      },
      {
        heading: "Purposes and legal bases (GDPR)",
        body: [
          {
            type: "p",
            text:
              "We only process personal data when we have a legal basis. Depending on the context, that basis may be:"
          },
          {
            type: "ul",
            items: [
              "Consent: for example, for analytics cookies or when you voluntarily contact us.",
              "Contract performance / pre-contract steps: for example, if we arrange a booking or performance.",
              "Legitimate interests: to keep the site secure, prevent fraud, and improve the service in a proportionate way.",
              "Legal obligation: where processing is required to comply with applicable law."
            ]
          }
        ]
      },
      {
        heading: "How we use cookies",
        body: [
          {
            type: "p",
            text:
              "We use essential cookies to ensure the website functions properly. If you accept, we also use analytics cookies to measure site usage and improve performance."
          },
          {
            type: "p",
            text:
              "You can manage your consent from the cookie banner. You can also delete or block cookies using your browser settings."
          }
        ]
      },
      {
        heading: "Who we share data with",
        body: [
          {
            type: "p",
            text:
              "We may share data with service providers that help us operate the site (processors), such as hosting, content delivery, a CMS, or email delivery. They only process data as needed and under confidentiality obligations."
          },
          {
            type: "p",
            text:
              "We may also disclose information where necessary to comply with the law, enforce our rights, or protect the security of users and the website."
          }
        ]
      },
      {
        heading: "International transfers",
        body: [
          {
            type: "p",
            text:
              "Some providers may be located outside the EEA. Where applicable, we use appropriate safeguards (such as Standard Contractual Clauses) to protect your data."
          }
        ]
      },
      {
        heading: "Retention",
        body: [
          {
            type: "p",
            text:
              "We keep personal data only as long as needed for the purposes described and to meet legal obligations. Exact retention periods vary by data type and context."
          }
        ]
      },
      {
        heading: "Security",
        body: [
          {
            type: "p",
            text:
              "We apply reasonable technical and organizational measures to protect personal data. However, no system is 100% secure."
          }
        ]
      },
      {
        heading: "Your rights",
        body: [
          {
            type: "p",
            text:
              "Depending on your location, you may have rights regarding your personal data, including:"
          },
          {
            type: "ul",
            items: [
              "Access, rectification, and erasure.",
              "Restriction of processing or objection.",
              "Data portability.",
              "Withdraw consent at any time (without affecting prior lawful processing).",
              "Lodge a complaint with a supervisory authority."
            ]
          },
          {
            type: "p",
            text: "To exercise your rights, contact us using the channels published on this website."
          }
        ]
      },
      {
        heading: "Children",
        body: [
          {
            type: "p",
            text:
              "This website is not directed to children. If you believe a child has provided us with personal data, contact us so we can delete it."
          }
        ]
      },
      {
        heading: "Changes to this policy",
        body: [
          {
            type: "p",
            text:
              "We may update this Privacy Policy. We will post changes on this page and update the “Last updated” date."
          }
        ]
      }
    ]
  };
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const copy = getCopy(locale);
  return {
    title: copy.title
  };
}

export default function PrivacyPolicyPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const copy = getCopy(locale);

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

            <div className="space-y-10">
              {copy.sections.map((section) => (
                <section key={section.heading} className="space-y-3">
                  <h2 className="font-display text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
                    {section.heading}
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                    {section.body.map((block, index) => {
                      if (block.type === "p") {
                        return <p key={index}>{block.text}</p>;
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

