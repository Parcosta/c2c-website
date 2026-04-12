// Migration script for Coast2Coast
import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import { basename, join } from "path";

const client = createClient({
  projectId: "u2aaya1a",
  dataset: "production",
  apiVersion: "2026-02-17",
  token:
    "sko6ysdNFtqeXOa4ls5JNkeUi9eVTuMoZk6QKODQmispjOq3vUEfOMKksCLmmwcM8whStOFvQZLeOcMO5B345HWa2rGj5sWekRrkCILPICARCdr6wXcRDtcPTMox1WJ2rtaEbqrReDSGzmF3ggngd7e5O6yjsL7aFQ5XS89njFL8o9VZYBYo",
  useCdn: false
});

const CONTENT_BASE = "/Users/george-openclaw/Downloads/COAST2C WEBSITE 26";

function textToBlockContent(text) {
  if (!text || text.trim() === "") return [];
  return [
    {
      _type: "block",
      _key: Math.random().toString(36).substring(2, 11),
      style: "normal",
      children: [
        {
          _type: "span",
          _key: Math.random().toString(36).substring(2, 11),
          text: text.trim(),
          marks: []
        }
      ],
      markDefs: []
    }
  ];
}

async function uploadImage(imagePath, filename) {
  try {
    const fullPath = join(CONTENT_BASE, imagePath);
    const fileStream = createReadStream(fullPath);
    const asset = await client.assets.upload("image", fileStream, {
      filename: filename || basename(fullPath),
      contentType: getContentType(fullPath)
    });
    console.log(`Uploaded: ${filename}`);
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (error) {
    console.error(`Failed: ${imagePath}`, error.message);
    return null;
  }
}

function getContentType(path) {
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

function L(en, es) {
  return { en, es };
}

const IMAGES = [
  { path: "FILES/PHOTO HI-RES/Perfil/Coast2c.jpg", key: "profile_coast2c" },
  { path: "FILES/PHOTO HI-RES/Perfil/IMG_5248.JPG", key: "profile_img5248" },
  { path: "FILES/PHOTO HI-RES/Perfil/Coast2c_107 1.jpg", key: "profile_coast2c107" },
  { path: "FILES/PHOTO HI-RES/STUDIO/coast2c2-AlexanderPomper.png", key: "studio_coast2c2" },
  {
    path: "FILES/PHOTO HI-RES/Performance/SofiaAcosta_026LRcredit_CarlyDiaz.jpg",
    key: "performance_sofia"
  },
  { path: "FILES/PHOTO HI-RES/Performance/studio-july-2025.png", key: "performance_studio_july" },
  {
    path: "FILES/PHOTO HI-RES/Performance/08 Live Ephemeral [Coast2C + Julieta Gil]-2960-Diego Figueroa.JPG",
    key: "performance_live_ephemeral_2960"
  },
  {
    path: "FILES/PHOTO HI-RES/MODULAR/08 Live Ephemeral [Coast2C + Julieta Gil]-2944-Diego Figueroa.JPG",
    key: "modular_2944"
  },
  {
    path: "FILES/PHOTO HI-RES/MODULAR/coast2c-julietaGil-credito-Carlos-Mendoza (1).JPG",
    key: "modular_julieta1"
  },
  {
    path: "FILES/PHOTO HI-RES/MODULAR/08 Live Ephemeral [Coast2C + Julieta Gil]-2821-Diego Figueroa.JPG",
    key: "modular_2821"
  },
  {
    path: "FILES/PHOTO HI-RES/MODULAR/coast2c-julieta-gil-credito-Carlos-Mendoza.JPG",
    key: "modular_julieta2"
  },
  {
    path: "FILES/PROYECTOS/Radical Devotion/WHITEOWL013_Cover_Artwork_web.jpg",
    key: "project_radical_cover"
  },
  { path: "FILES/PROYECTOS/Mix 192/modules8.png", key: "project_mix192_modules" },
  {
    path: "FILES/PROYECTOS/Machine Music, Human Dance/machine-music-human-dance.jpg",
    key: "project_machine_music"
  },
  { path: "FILES/PROYECTOS/MIXMAG /coast2c1.jpg", key: "project_mixmag" },
  { path: "FILES/PROYECTOS/Obsidian Pulse/obdidian-pulse-1.png", key: "project_obsidian" },
  { path: "FILES/PROYECTOS/MutekMX/Mutek19_1000.jpg", key: "project_mutek19" },
  {
    path: "FILES/PROYECTOS/MutekMX/Carrusel/08 Live Ephemeral [Coast2C + Julieta Gil]-2907-Diego Figueroa.JPG",
    key: "project_mutek_carousel1"
  },
  {
    path: "FILES/PROYECTOS/MutekMX/Carrusel/08 Live Ephemeral [Coast2C + Julieta Gil]-2953-Diego Figueroa.JPG",
    key: "project_mutek_carousel2"
  },
  { path: "FILES/PROYECTOS/Proximity/Coast2c_122.jpg", key: "project_proximity" },
  {
    path: "FILES/PROYECTOS/Landscape/LANDSCAPE-COUNTERCLOCKWISE-SAMPLE-CASSETTE.webp",
    key: "project_landscape"
  }
];

async function uploadAllImages() {
  console.log("Uploading images...");
  const images = {};
  for (const img of IMAGES) {
    const result = await uploadImage(img.path, img.key);
    if (result) images[img.key] = result;
  }
  console.log(`Uploaded ${Object.keys(images).length}/${IMAGES.length} images`);
  return images;
}

async function createSiteSettings() {
  const doc = {
    _type: "siteSettings",
    _id: "siteSettings",
    siteName: L("Coast2Coast", "Coast2Coast"),
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com/coast2c" },
      { platform: "soundcloud", url: "https://soundcloud.com/coast2c" },
      { platform: "bandcamp", url: "https://coast2c.bandcamp.com" },
      { platform: "spotify", url: "https://open.spotify.com/artist/coast2c" }
    ],
    contactEmail: "bookings@coast2c.com"
  };
  await client.createOrReplace(doc);
  console.log("Created siteSettings");
}

async function createAboutPage(images) {
  const bioEn = `Coast2c is a Mexico City-based live modular techno artist, DJ, and sound designer creating immersive performances for club stages, festivals, and interdisciplinary collaborations. Working with a fully hardware modular system, drum-machines and synths, her improvisation-driven live sets merge techno, experimental electronics, and spatial sound design into high-impact performances built for both dancefloor energy and exploratory listening.

She has performed across Europe and Latin America, with appearances and workshops at Superbooth (Berlin), Synth Library (Prague), and MutekMX (Mexico City). Her recorded work has been released on labels including White Owl Records, Fauna Reve, DURO, TUTU Records, Ransom Note, Blankstairs, and Krater Music.`;

  const bioEs = `Coast2c es una artista de techno modular en vivo, DJ y diseñadora sonora con base en Ciudad de México, creadora de performances inmersivas para clubes, festivales y colaboraciones interdisciplinarias. Trabajando con un sistema modular completamente hardware, cajas de ritmo y sintetizadores, sus sets en vivo fusionan techno, electrónica experimental y diseño sonoro espacial.

Se ha presentado en Europa y Latinoamérica, con apariciones y talleres en Superbooth (Berlín), Synth Library (Praga) y Mutek MX (Ciudad de México). Su música ha sido publicada en sellos como White Owl Records, Fauna Reve, DURO, TUTU Records, Ransom Note, Blankstairs y Krater Music.`;

  const doc = {
    _type: "aboutPage",
    _id: "aboutPage",
    title: L("About", "Acerca de"),
    intro: L(
      "Coast2c is a Mexico City-based modular synthesist and DJ performing immersive live techno rooted in experimental sound design and analog hardware.",
      "Coast2c es una artista de techno modular en vivo, DJ y diseñadora sonora con base en Ciudad de México."
    ),
    photo: images.profile_coast2c || images.profile_img5248,
    photoAlt: L(
      "Coast2c performing live with modular synthesizers",
      "Coast2c presentándose en vivo con sintetizadores modulares"
    ),
    bio: {
      _type: "localeBlockContent",
      en: textToBlockContent(bioEn),
      es: textToBlockContent(bioEs)
    },
    releases: [
      {
        title: L("Radical Devotion", "Radical Devotion"),
        year: 2024,
        label: L("White Owl Records", "White Owl Records"),
        url: "https://whiteowlrecords.xyz"
      },
      {
        title: L("Proximity", "Proximity"),
        year: 2023,
        label: L("Self-Released", "Auto-Publicado"),
        url: "https://coast2c.bandcamp.com/track/proximity"
      },
      {
        title: L("Machine Music, Human Dance", "Machine Music, Human Dance"),
        year: 2023,
        label: L("Self-Released", "Auto-Publicado")
      },
      {
        title: L("Entropy Management", "Entropy Management"),
        year: 2025,
        label: L("White Owl Records", "White Owl Records")
      }
    ],
    equipmentGroups: [
      {
        title: L("Modular Synthesis", "Síntesis Modular"),
        items: [
          L("Eurorack modular system", "Sistema Eurorack modular"),
          L("Analog oscillators and filters", "Osciladores y filtros analógicos")
        ]
      },
      {
        title: L("Drum Machines", "Cajas de Ritmo"),
        items: [L("Elektron Analog Rytm MKII", "Elektron Analog Rytm MKII")]
      },
      {
        title: L("Effects & Processing", "Efectos y Procesamiento"),
        items: [
          L("Spatial reverbs", "Reverberaciones espaciales"),
          L("Analog delays", "Delays analógicos")
        ]
      }
    ],
    influences: [
      L("IDM and experimental techno", "IDM y techno experimental"),
      L("Spatial sound design", "Diseño sonoro espacial")
    ]
  };
  await client.createOrReplace(doc);
  console.log("Created aboutPage");
}

async function createPortfolioItems(images) {
  const items = [
    {
      _type: "portfolioItem",
      _id: "portfolio-radical-devotion",
      title: L("Radical Devotion", "Radical Devotion"),
      slug: {
        _type: "localeSlug",
        en: { current: "radical-devotion" },
        es: { current: "radical-devotion" }
      },
      category: L("Music Release", "Lanzamiento Musical"),
      images: [images.project_radical_cover],
      description: {
        _type: "localeBlockContent",
        en: textToBlockContent(
          "Radical Devotion marks Coast2c third EP release, and her debut on White Owl Records. Developed in the wake of her audiovisual presentation at MutekMX alongside visual artist Julieta Gil."
        ),
        es: textToBlockContent(
          "Radical Devotion marca el tercer lanzamiento en formato EP de Coast2c y su debut en White Owl Records."
        )
      },
      date: "2024-01-01T00:00:00Z",
      tags: ["EP", "White Owl Records", "Modular"]
    },
    {
      _type: "portfolioItem",
      _id: "portfolio-proximity",
      title: L("Proximity", "Proximity"),
      slug: { _type: "localeSlug", en: { current: "proximity" }, es: { current: "proximity" } },
      category: L("Music Release", "Lanzamiento Musical"),
      images: [images.project_proximity],
      description: {
        _type: "localeBlockContent",
        en: textToBlockContent(
          "A melting analog acid ride. Produced and Mixed by Coast2c. Released January 6, 2023."
        ),
        es: textToBlockContent(
          "Un viaje de ácido analógico. Producido por Coast2c. Lanzado el 6 de Enero, 2023."
        )
      },
      date: "2023-01-06T00:00:00Z",
      tags: ["Single", "Acid", "Techno"]
    },
    {
      _type: "portfolioItem",
      _id: "portfolio-machine-music",
      title: L("Machine Music, Human Dance", "Machine Music, Human Dance"),
      slug: {
        _type: "localeSlug",
        en: { current: "machine-music-human-dance" },
        es: { current: "machine-music-human-dance" }
      },
      category: L("Music Release", "Lanzamiento Musical"),
      images: [images.project_machine_music],
      description: {
        _type: "localeBlockContent",
        en: textToBlockContent(
          "A conceptual EP created for Takahiro Yamamoto performance NOTHINGBEING, premiered September 9, 2022 at T:BA."
        ),
        es: textToBlockContent(
          "Un EP conceptual creado para la performance NOTHINGBEING de Takahiro Yamamoto, estrenado el 9 de septiembre de 2022 en T:BA."
        )
      },
      date: "2023-03-10T00:00:00Z",
      tags: ["EP", "Conceptual", "T:BA"]
    },
    {
      _type: "portfolioItem",
      _id: "portfolio-mutekmx",
      title: L("Live Ephemeral at MUTEK MX", "Live Ephemeral en MUTEK MX"),
      slug: {
        _type: "localeSlug",
        en: { current: "live-ephemeral-mutek-mx" },
        es: { current: "live-ephemeral-mutek-mx" }
      },
      category: L("Performance", "Performance"),
      images: [
        images.project_mutek19,
        images.project_mutek_carousel1,
        images.project_mutek_carousel2
      ],
      description: {
        _type: "localeBlockContent",
        en: textToBlockContent(
          "Live Ephemeral is a space for encounter and exploration between Coast2c and Julieta Gil. A collaborative audiovisual performance at MUTEK MX."
        ),
        es: textToBlockContent(
          "Live Ephemeral es el espacio de encuentro entre Coast2c y Julieta Gil. Una performance audiovisual colaborativa en MUTEK MX."
        )
      },
      date: "2023-01-01T00:00:00Z",
      tags: ["MUTEK", "Live Performance", "Audiovisual"]
    },
    {
      _type: "portfolioItem",
      _id: "portfolio-mixmag",
      title: L("Mixmag Interview", "Entrevista Mixmag"),
      slug: {
        _type: "localeSlug",
        en: { current: "mixmag-interview" },
        es: { current: "entrevista-mixmag" }
      },
      category: L("Press", "Prensa"),
      images: [images.project_mixmag],
      description: {
        _type: "localeBlockContent",
        en: textToBlockContent(
          "Exclusive interview for Mixmag LATM explaining beginnings, processes and equipment used in electronic music production."
        ),
        es: textToBlockContent(
          "Entrevista exclusiva para Mixmag LATM explicando inicios, procesos y equipo utilizado en producción de música electrónica."
        )
      },
      date: "2022-09-01T00:00:00Z",
      tags: ["Interview", "Mixmag", "Press"]
    },
    {
      _type: "portfolioItem",
      _id: "portfolio-revista192",
      title: L("Revista 192 Feature", "Revista 192"),
      slug: { _type: "localeSlug", en: { current: "revista-192" }, es: { current: "revista-192" } },
      category: L("Press", "Prensa"),
      images: [images.project_mix192_modules],
      description: {
        _type: "localeBlockContent",
        en: textToBlockContent(
          "Intimate, Noisy, and Sincere - After her participation in MUTEK 2023, Coast2c returned to the studio to explore connections between body, emotion, and machine."
        ),
        es: textToBlockContent(
          "Íntimas, ruidosas y sinceras - Tras su participación en MUTEK 2023, Coast2c volvió al estudio para explorar conexiones entre cuerpo, emoción y máquina."
        )
      },
      date: "2023-01-01T00:00:00Z",
      tags: ["Revista 192", "Press", "Feature"]
    },
    {
      _type: "portfolioItem",
      _id: "portfolio-obsidian-pulse",
      title: L("Obsidian Pulse", "Obsidian Pulse"),
      slug: {
        _type: "localeSlug",
        en: { current: "obsidian-pulse" },
        es: { current: "obsidian-pulse" }
      },
      category: L("Collaboration", "Colaboración"),
      images: [images.project_obsidian],
      description: {
        _type: "localeBlockContent",
        en: textToBlockContent(
          "Sound design for a collaborative piece with visual artist Julieta Gil. Video, film, and animation project."
        ),
        es: textToBlockContent(
          "Diseño sonoro para una pieza colaborativa con la artista visual Julieta Gil. Proyecto de video, cine y animación."
        )
      },
      date: "2019-01-01T00:00:00Z",
      tags: ["Sound Design", "Collaboration", "Julieta Gil"]
    },
    {
      _type: "portfolioItem",
      _id: "portfolio-landscape",
      title: L("Landscape Counterclockwise", "Landscape Counterclockwise"),
      slug: {
        _type: "localeSlug",
        en: { current: "landscape-counterclockwise" },
        es: { current: "landscape-counterclockwise" }
      },
      category: L("Collaboration", "Colaboración"),
      images: [images.project_landscape],
      description: {
        _type: "localeBlockContent",
        en: textToBlockContent(
          "Created samples for Landscape Counterclockwise sample cassette companion to the HC-TT. Open source samples."
        ),
        es: textToBlockContent(
          "Creé muestras para la cassette de samples Counterclockwise de Landscape. Samples de código abierto."
        )
      },
      date: "2021-01-01T00:00:00Z",
      tags: ["Samples", "Landscape", "Open Source"]
    }
  ];

  for (const item of items) {
    await client.createOrReplace(item);
    console.log(`Created portfolio: ${item._id}`);
  }
}

async function createPressPage(images) {
  const doc = {
    _type: "pressPage",
    _id: "pressPage",
    title: L("Press / EPK", "Prensa / EPK"),
    bio: {
      _type: "localeBlockContent",
      en: textToBlockContent(
        "Coast2c is a Mexico City-based live modular techno artist, DJ, and sound designer."
      ),
      es: textToBlockContent(
        "Coast2c es una artista de techno modular en vivo, DJ y diseñadora sonora con base en Ciudad de México."
      )
    },
    pressPhotos: [
      { title: L("Coast2c Profile", "Perfil Coast2c"), image: images.profile_coast2c },
      { title: L("Live Performance", "Performance en Vivo"), image: images.performance_sofia },
      { title: L("Studio", "Estudio"), image: images.studio_coast2c2 },
      { title: L("Modular System", "Sistema Modular"), image: images.modular_2944 }
    ].filter((p) => p.image),
    bookingsEmail: "bookings@coast2c.com"
  };
  await client.createOrReplace(doc);
  console.log("Created pressPage");
}

async function createPressItems() {
  const items = [
    {
      _type: "pressItem",
      _id: "press-2025-nft",
      title: L("In Conversation with Avant Dev", "En Conversación con Avant Dev"),
      publication: L("NFT Magazine", "NFT Magazine"),
      date: "2025-01-01T00:00:00Z"
    },
    {
      _type: "pressItem",
      _id: "press-2025-fifteen",
      title: L("Coast2c Interview", "Entrevista Coast2c"),
      publication: L("Fifteen Questions", "Fifteen Questions"),
      date: "2025-01-01T00:00:00Z",
      quote: L(
        "The modular synth compositions have one foot on the dancefloor",
        "Las composiciones de sintetizador modular tienen un pie en la pista"
      )
    },
    {
      _type: "pressItem",
      _id: "press-2025-revista192",
      title: L("Íntimas, ruidosas y sinceras", "Íntimas, ruidosas y sinceras"),
      publication: L("Revista 192", "Revista 192"),
      date: "2025-01-01T00:00:00Z"
    },
    {
      _type: "pressItem",
      _id: "press-2025-entropy",
      title: L("Entropy Management", "Entropy Management"),
      publication: L("White Owl Records", "White Owl Records"),
      date: "2025-01-01T00:00:00Z"
    },
    {
      _type: "pressItem",
      _id: "press-2023-warp",
      title: L("Live Ephemeral at MUTEK MX", "Live Ephemeral en MUTEK MX"),
      publication: L("Warp Magazine", "Warp Magazine"),
      date: "2023-01-01T00:00:00Z",
      quote: L(
        "Another highlight came thanks to Live Ephemeral",
        "Otro de los highlights lo vivimos gracias a Live Ephemeral"
      )
    },
    {
      _type: "pressItem",
      _id: "press-2023-djmag",
      title: L(
        "12 Emerging Artists You Need to Hear",
        "12 Artistas Emergentes que Necesitas Escuchar"
      ),
      publication: L("DJ Mag", "DJ Mag"),
      date: "2023-01-01T00:00:00Z"
    },
    {
      _type: "pressItem",
      _id: "press-2023-mixmag",
      title: L(
        "Techno, Drone y Electrónica Modular Mexicana",
        "Techno, Drone y Electrónica Modular Mexicana"
      ),
      publication: L("Mixmag", "Mixmag"),
      date: "2023-01-01T00:00:00Z"
    },
    {
      _type: "pressItem",
      _id: "press-2022-holawave",
      title: L("El ánima en la síntesis #1", "El ánima en la síntesis #1"),
      publication: L("HolaWave", "HolaWave"),
      date: "2022-01-01T00:00:00Z"
    },
    {
      _type: "pressItem",
      _id: "press-2021-bandcamp",
      title: L(
        "Meet the Latin Artists Bridging Scenes",
        "Conoce a los Artistas Latinos Conectando Escenas"
      ),
      publication: L("Bandcamp Daily", "Bandcamp Daily"),
      date: "2021-01-01T00:00:00Z"
    },
    {
      _type: "pressItem",
      _id: "press-2021-ra",
      title: L("Stand Out Electronic Music", "Música Electrónica Destacada"),
      publication: L("Resident Advisor", "Resident Advisor"),
      date: "2021-01-01T00:00:00Z"
    },
    {
      _type: "pressItem",
      _id: "press-2021-filter",
      title: L("Coast2c explora el minimalismo", "Coast2c explora el minimalismo"),
      publication: L("Filter Mexico", "Filter Mexico"),
      date: "2021-01-01T00:00:00Z"
    },
    {
      _type: "pressItem",
      _id: "press-2018-tomtom",
      title: L("Women Beat League", "Women Beat League"),
      publication: L("Tom Tom Mag", "Tom Tom Mag"),
      date: "2018-01-01T00:00:00Z"
    }
  ];

  for (const item of items) {
    await client.createOrReplace(item);
    console.log(`Created pressItem: ${item._id}`);
  }
}

async function createServices() {
  const services = [
    {
      _type: "service",
      _id: "service-live-modular",
      title: L("Live Modular Performance", "Performance Modular en Vivo"),
      description: L(
        "Immersive live techno performances using fully hardware modular systems, drum machines, and synthesizers. Custom sets for clubs, festivals, and events.",
        "Performances de techno inmersivas usando sistemas modulares completamente hardware, cajas de ritmo y sintetizadores. Sets personalizados para clubes, festivales y eventos."
      ),
      icon: "music",
      features: [
        L("Fully improvised live sets", "Sets en vivo completamente improvisados"),
        L("Custom sound design", "Diseño sonoro personalizado"),
        L("Adaptable to venue acoustics", "Adaptable a la acústica del lugar")
      ]
    },
    {
      _type: "service",
      _id: "service-dj-sets",
      title: L("DJ Sets", "Sets de DJ"),
      description: L(
        "Curated DJ sets blending techno, experimental electronics, and spatial sound design for dancefloor energy.",
        "Sets de DJ curados fusionando techno, electrónica experimental y diseño sonoro espacial para la energía de la pista."
      ),
      icon: "disc",
      features: [
        L("All-vinyl or digital options", "Opciones de vinilo o digital"),
        L("Genre-flexible programming", "Programación flexible por género"),
        L("Club and festival ready", "Listo para clubes y festivales")
      ]
    },
    {
      _type: "service",
      _id: "service-sound-design",
      title: L("Sound Design", "Diseño Sonoro"),
      description: L(
        "Custom sound design for installations, performances, film, and interdisciplinary collaborations.",
        "Diseño sonoro personalizado para instalaciones, performances, cine y colaboraciones interdisciplinarias."
      ),
      icon: "audio-waveform",
      features: [
        L("Spatial audio composition", "Composición de audio espacial"),
        L("Modular synthesis expertise", "Experiencia en síntesis modular"),
        L("Collaborative development", "Desarrollo colaborativo")
      ]
    },
    {
      _type: "service",
      _id: "service-workshops",
      title: L("Workshops", "Talleres"),
      description: L(
        "Educational workshops on modular synthesis, live performance techniques, and electronic music production.",
        "Talleres educativos sobre síntesis modular, técnicas de performance en vivo y producción de música electrónica."
      ),
      icon: "graduation-cap",
      features: [
        L("Beginner to advanced levels", "Niveles principiante a avanzado"),
        L("Hands-on modular exploration", "Exploración práctica de modular"),
        L("Performance coaching", "Coaching de performance")
      ]
    }
  ];

  for (const svc of services) {
    await client.createOrReplace(svc);
    console.log(`Created service: ${svc._id}`);
  }
}

async function main() {
  console.log("Starting Coast2Coast content migration...\n");

  const images = await uploadAllImages();
  await createSiteSettings();
  await createAboutPage(images);
  await createPortfolioItems(images);
  await createPressPage(images);
  await createPressItems();
  await createServices();

  console.log("\nMigration complete!");
}

main().catch(console.error);
