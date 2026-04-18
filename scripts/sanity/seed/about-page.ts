import { CONFIRMED, client, dryLog, paragraphsToBlocks } from "../shared";

const SHORT_BIO_EN = `Coast2c is a Mexico City–based modular synthesist and DJ performing immersive live techno rooted in experimental sound design and analog hardware. She has appeared at MutekMX, Kontaktor and Superbooth Berlin, with releases on labels including DURO, Ransom Note, White Owl Records, Fauna Reve and her own label Gestef Records. Her performances merge atmospheric depth with driving dancefloor energy.`;

const SHORT_BIO_ES = `Coast2c es artista de techno modular en vivo, DJ y diseñadora sonora con base en Ciudad de México. Se ha presentado en Superbooth (Berlín), Synth Library (Praga) y MutekMX, con lanzamientos en sellos como White Owl Records, Fauna Reve, DURO, TUTU Records, Ransom Note, Blankstairs y Krater Music. Sus sets en vivo fusionan techno, electrónica experimental y diseño sonoro espacial.`;

const LONG_BIO_EN = `Coast2c is a Mexico City–based live modular techno artist, DJ, and sound designer creating immersive performances for club stages, festivals, and interdisciplinary collaborations. Working with a fully hardware modular system, drum-machines and synths, her improvisation-driven live sets merge techno, experimental electronics, and spatial sound design into high-impact performances built for both dancefloor energy and exploratory listening.

She has performed across Europe and Latin America, with appearances and workshops at Superbooth (Berlin), Synth Library (Prague), and MutekMX (Mexico City). Her recorded work has been released on labels including White Owl Records, Fauna Reve, DURO, TUTU Records, Ransom Note, Blankstairs, and Krater Music.

Recognized as part of Mexico's evolving live electronic music and modular synthesis scene, Coast2c bridges club culture and experimental performance, delivering sets that balance technical precision, physical interaction, and immersive sonic depth.`;

const LONG_BIO_ES = `Coast2c es una artista de techno modular en vivo, DJ y diseñadora sonora con base en Ciudad de México, creadora de performances inmersivas para clubes, festivales y colaboraciones interdisciplinarias. Trabajando con un sistema modular completamente hardware, cajas de ritmo y sintetizadores, sus sets en vivo, impulsados por la improvisación, fusionan techno, electrónica experimental y diseño sonoro espacial en presentaciones de alto impacto pensadas tanto para la energía de la pista de baile como para la escucha exploratoria.

Se ha presentado en Europa y Latinoamérica, con apariciones y talleres en Superbooth (Berlín), Synth Library (Praga) y MutekMX (Ciudad de México). Su música ha sido publicada en sellos como White Owl Records, Fauna Reve, DURO, TUTU Records, Ransom Note, Blankstairs y Krater Music.

Reconocida como parte de la escena emergente de música electrónica en vivo y síntesis modular en México, Coast2c conecta la cultura de club con la performance experimental, ofreciendo sets que equilibran precisión técnica, interacción física e inmersión sonora.`;

export async function upsertAboutPage(): Promise<void> {
  const existing = await client.fetch<{ _id: string; bio?: unknown } | null>(
    `*[_type == "aboutPage"][0]{_id, bio}`
  );

  const id = existing?._id ?? "aboutPage";
  const patch = {
    _id: id,
    _type: "aboutPage" as const,
    title: { _type: "localeString" as const, en: "About", es: "Acerca" },
    intro: { _type: "localeString" as const, en: SHORT_BIO_EN, es: SHORT_BIO_ES },
    bio: {
      _type: "localeBlockContent" as const,
      en: paragraphsToBlocks(LONG_BIO_EN),
      es: paragraphsToBlocks(LONG_BIO_ES)
    },
    seo: {
      _type: "seo" as const,
      title: {
        _type: "localeString" as const,
        en: "About Coast2c",
        es: "Acerca de Coast2c"
      },
      description: {
        _type: "localeString" as const,
        en: "Mexico City-based modular synthesist and DJ. Live techno, sound design, and interdisciplinary collaborations.",
        es: "Sintetista modular y DJ con base en Ciudad de México. Techno en vivo, diseño sonoro y colaboraciones interdisciplinarias."
      }
    }
  };

  dryLog("upsert aboutPage (intro + long bio EN/ES, leaves releases/equipment/influences alone)", {
    _id: id
  });
  if (!CONFIRMED) return;
  if (existing) {
    await client
      .patch(existing._id)
      .set({ title: patch.title, intro: patch.intro, bio: patch.bio, seo: patch.seo })
      .commit();
  } else {
    await client.createOrReplace(patch);
  }
}
