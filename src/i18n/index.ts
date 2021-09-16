import { createI18n } from "vue-i18n";

export const languages = ["en", "pl"] as const;

type Language = typeof languages[number];

const englishMessages = {
  header: {
    home: "Home",
    about: "About",
  },
  home: {
    welcome: "Welcome to {0}",
    start_exercise: "Start Your Breathing",
    exercise_instructions: "Breathing Instructions",
    exercise_preferences: "Breathing Preferences",
  },
};

type I18nMessages = {
  [key in typeof languages[number]]: typeof englishMessages;
};

const messages: I18nMessages = {
  en: englishMessages,
  pl: {
    home: {
      welcome: "Witaj w {0}",
      start_exercise: "Zacznij Oddychać",
      exercise_instructions: "Informacje o Ćwiczeniu Oddechowym",
      exercise_preferences: "Preferencje Oddechowe",
    },
    header: {
      home: "Strona Główna",
      about: "O Aplikacji",
    },
  },
};

export const i18n = createI18n({
  locale: "en" as Language,
  fallback: "en" as Language,
  messages,
});
