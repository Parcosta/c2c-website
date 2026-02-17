import type { ReactElement } from "react";

import { serializeJsonLd, type JsonLd } from "@/lib/seo";

export function JsonLdScript({ data }: { data: JsonLd | JsonLd[] }): ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
