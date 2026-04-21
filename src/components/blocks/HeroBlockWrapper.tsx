import { cms } from "@/lib/cms";
import type { Locale } from "@/lib/locale";
import { getHomePage } from "@/sanity/cache";
import { getSanityImageUrl } from "@/sanity/image";
import { HeroBlockClient, type HeroAudio, type HeroImage } from "./HeroBlockClient";

interface HeroBlockWrapperProps {
  locale: Locale;
  className?: string;
  /**
   * Optional audio track URL. The player UI always renders (per Figma);
   * when a src is provided, play and download become functional.
   */
  audioSrc?: string;
}

export async function HeroBlockWrapper({ locale, className, audioSrc }: HeroBlockWrapperProps) {
  const page = await getHomePage(locale);
  const sections = page?.homeSections;
  const eyebrows = sections?.heroEyebrows ?? [];

  const heroImageUrl = getSanityImageUrl(page?.hero?.backgroundImage, { width: 1200 });
  if (!heroImageUrl) {
    cms.text(undefined, "page.hero.backgroundImage", { locale });
  }
  const heroImage: HeroImage = {
    src: heroImageUrl ?? "",
    alt: cms.text(page?.hero?.heading, "page.hero.heading", { locale })
  };

  const audio: HeroAudio | undefined = audioSrc ? { src: audioSrc } : undefined;

  const translations = {
    tag1: cms.text(eyebrows[0], "page.homeSections.heroEyebrows[0]", { locale }),
    tag2: cms.text(eyebrows[1], "page.homeSections.heroEyebrows[1]", { locale }),
    title: cms.text(page?.hero?.heading, "page.hero.heading", { locale }),
    description: cms.text(page?.hero?.subheading, "page.hero.subheading", { locale }),
    ctaPrimary: cms.text(page?.hero?.cta?.label, "page.hero.cta.label", { locale }),
    ctaPrimaryHref: cms.text(page?.hero?.cta?.href, "page.hero.cta.href", { locale }),
    ctaSecondary: cms.text(
      sections?.heroSecondaryCta?.label,
      "page.homeSections.heroSecondaryCta.label",
      { locale }
    ),
    ctaSecondaryHref: cms.text(
      sections?.heroSecondaryCta?.href,
      "page.homeSections.heroSecondaryCta.href",
      { locale }
    ),
    audioTrackLabel: cms.text(
      sections?.heroAudioTrackLabel,
      "page.homeSections.heroAudioTrackLabel",
      { locale }
    )
  };

  return (
    <HeroBlockClient
      locale={locale}
      translations={translations}
      heroImage={heroImage}
      audio={audio}
      className={className}
    />
  );
}
