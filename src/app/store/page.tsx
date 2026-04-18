// import { redirect } from "next/navigation";

/**
 * /store — placeholder page.
 *
 * When the external store goes live, uncomment the redirect and set
 * `NEXT_PUBLIC_STORE_URL` in the environment to the destination (e.g. a
 * Bandcamp / Shopify / Big Cartel URL). This page then becomes a
 * server-side 307 to that URL.
 *
 * This route lives outside the `[locale]/` segment intentionally — the
 * store is a single shared surface, not a locale-scoped page.
 */
export default function StorePage() {
  // const destination = process.env.NEXT_PUBLIC_STORE_URL;
  // if (destination) {
  //   redirect(destination);
  // }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-gray-950 px-6 text-center">
      <div className="flex max-w-lg flex-col gap-4">
        <p className="font-display text-xs font-medium uppercase tracking-widest text-gray-500">
          Store
        </p>
        <h1 className="font-display text-header text-gray-50">Coming soon</h1>
      </div>
    </main>
  );
}

export const metadata = {
  title: "Store · Coming soon",
  robots: { index: false, follow: false }
};
