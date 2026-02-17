export function portableTextToPlainText(value: unknown[] | null | undefined): string {
  if (!Array.isArray(value)) return "";

  const chunks: string[] = [];

  for (const block of value) {
    if (!block || typeof block !== "object") continue;
    const maybeBlock = block as { _type?: unknown; children?: unknown[] };
    if (maybeBlock._type !== "block") continue;
    if (!Array.isArray(maybeBlock.children)) continue;

    const childTexts = maybeBlock.children
      .map((child) => {
        if (!child || typeof child !== "object") return null;
        const maybeChild = child as { text?: unknown };
        return typeof maybeChild.text === "string" ? maybeChild.text : null;
      })
      .filter((text): text is string => Boolean(text))
      .join("");

    if (childTexts.trim()) chunks.push(childTexts.trim());
  }

  return chunks.join("\n\n").trim();
}

