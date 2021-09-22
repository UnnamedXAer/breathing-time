import { languages } from ".";
import baseMessages from "./messages/en";

export type Language = typeof languages[number];

export type LanguageMessages = typeof baseMessages;

export type I18nMessages = {
  [key in typeof languages[number]]: LanguageMessages;
};
