import { createI18n } from "vue-i18n";
import en from "./messages/en/";
import pl from "./messages/pl/";
import { I18nMessages, Language } from "./types";

export const languages = ["en", "pl"] as const;

const messages: I18nMessages = {
  en,
  pl,
};

export const i18n = createI18n({
  locale: "en" as Language,
  fallback: "en" as Language,
  messages,
});
