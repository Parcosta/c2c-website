import { describe, expect, it, vi } from "vitest";
import path from "node:path";
import { pathToFileURL } from "node:url";

type HeaderEntry = { key: string; value: string };

function getHeaderValue(headers: HeaderEntry[], key: string) {
  return headers.find((h) => h.key.toLowerCase() === key.toLowerCase())?.value;
}

async function loadNextConfig() {
  const mod = await import(pathToFileURL(path.resolve(process.cwd(), "next.config.js")).href);
  return mod.default as {
    headers?: () => Promise<Array<{ source: string; headers: HeaderEntry[] }>>;
  };
}

describe("next.config security headers", () => {
  it("sets required security headers for all routes", async () => {
    const nextConfig = await loadNextConfig();
    expect(nextConfig.headers).toBeTypeOf("function");

    const rules = await nextConfig.headers!();
    const globalRule = rules.find((r) => r.source === "/(.*)");
    expect(globalRule).toBeTruthy();

    const headers = globalRule!.headers;
    expect(getHeaderValue(headers, "X-Frame-Options")).toBe("DENY");
    expect(getHeaderValue(headers, "X-Content-Type-Options")).toBe("nosniff");
    expect(getHeaderValue(headers, "Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(getHeaderValue(headers, "Strict-Transport-Security")).toBe(
      "max-age=63072000; includeSubDomains; preload"
    );

    const permissionsPolicy = getHeaderValue(headers, "Permissions-Policy");
    expect(permissionsPolicy).toContain("camera=()");
    expect(permissionsPolicy).toContain("microphone=()");

    const csp = getHeaderValue(headers, "Content-Security-Policy");
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
  });

  it("does not allow unsafe-eval in production CSP", async () => {
    const previousNodeEnv = process.env.NODE_ENV;
    try {
      process.env.NODE_ENV = "production";
      vi.resetModules();

      const nextConfig = await loadNextConfig();
      const rules = await nextConfig.headers!();
      const globalRule = rules.find((r) => r.source === "/(.*)");
      const csp = getHeaderValue(globalRule!.headers, "Content-Security-Policy") ?? "";
      expect(csp).not.toContain("'unsafe-eval'");
    } finally {
      process.env.NODE_ENV = previousNodeEnv;
      vi.resetModules();
    }
  });
});
