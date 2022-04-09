import { useRouter } from "next/router";
import { en } from "../locales";

// Allows support for multiple languages but only currently supports English

export default function useLocale() {
  const { locale } = useRouter();
  const t = locale === "en" ? en : en;

  return t;
}
