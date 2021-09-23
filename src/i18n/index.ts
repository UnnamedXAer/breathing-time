import { createI18n as createI18nBase } from "vue-i18n";
import en from "./messages/en/";
import pl from "./messages/pl/";
import { I18nMessages, Language } from "./types";

export const languages = ["en", "pl"] as const;

const messages: I18nMessages = {
  en,
  pl,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createI18n = () => {
  let locale = <Language>"en";
  const savedLocale = localStorage.getItem("locale");
  if (savedLocale && languages.includes(<Language>savedLocale)) {
    locale = <Language>savedLocale;
  } else {
    const browserLang = navigator.language.split("-")[0];
    if (languages.includes(<Language>browserLang)) {
      locale = <Language>browserLang;
    } else {
      for (const lang in navigator.languages) {
        if (languages.includes(<Language>lang)) {
          locale = <Language>lang;
          break;
        }
      }
    }
  }

  return createI18nBase({
    locale,
    fallback: "en" as Language,
    messages,
  });
};
