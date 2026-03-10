import { redirect } from "next/navigation";

// This page is never rendered because middleware redirects to /[locale]
// But we keep it as a fallback
export default function RootPage() {
  redirect("/en");
}
