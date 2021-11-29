import { LanguageMessages } from "../../types";
import instructions from "./instructions";

const pl: LanguageMessages = {
  common: {
    yes: "Tak",
    no: "Nie",
    ok: "Ok",
  },
  home: {
    welcome: "Witaj w {0}",
    start_exercise: "Zacznij Oddychać",
    exercise_instructions: "Informacje o Ćwiczeniu Oddechowym",
    exercise_preferences: "Preferencje Oddechowe",
    download: "Pobierz",
  },
  header: {
    home: "Strona Główna",
    about: "O Aplikacji",
  },
  preferences: {
    title: "Preferencje Ćwiczenia Oddechowego",
    num_of_rounds: "Liczba rund:",
    breaths_per_round: "Oddechy na runde:",
    breathing_pace: "Tempo oddechów:",
    breathing_pace_fast: "szybko",
    breathing_pace_moderate: "umiarkowany",
    breathing_pace_slow: "wolno",
    recovery_time: "Czas regeneracji:",
    disable_animation: "Wyłącz animacje",
    disable_start_tips: "Wyłącz początkowe podpowiedzi",
    restore_default: "Przywróć Domyślne",
  },
  ex: {
    title: "Ćwiczenia Oddechowe",
    start: {
      start: "START",
      get_ready: "Przygotuj się!",
      go: "Zaczynamy",
      see_instructions: "Zobacz Instrukcje",
    },
    breathing: {
      title: "Oddychanie",
      skip_to_next: "Przejdź do następnego etapu",
      start_tip: "Oddychaj głeboko zgodnie z licznikiem.",
      footer_tip:
        "Wdychaj głęboko i wypuszczaj powietrze zgodnie z licznikiem.",
      disable_animation: "Wyłącz animacje",
      enable_animation: "Włącz animacje",
    },
    hold: {
      title: "Wstrzymaj oddech",
      are_you_still_there: "Jesteś tam jeszcze?",
      skip_to_next: "Następny Etap",
      start_tip:
        "Weź ostatni głęboki wdech, a następnie wypuść powietrze i przestań oddychać.",
      footer_tip: "Wstrzymaj oddech aż poczujesz potrzebę wzięcia wdechu.",
      last_round_tip:
        "To jest ostatnia runda, nie zapomnij o etapie regeneracji.",
    },
    recovery: {
      title: "Regeneracja",
      start_tip: "Weź głęboki wdech i przestań oddychać.",
      skip_to_next: "Przejdź do następnego etapu",
      skip_to_summary: "Przejdź do ekranu Podsumowanie",
      footer_tip: "Wstrzymaj oddecha na {0} sekund.",
    },
    summary: {
      congrats_finished: "Gratulacjee, ukończyleś swoje oddychanie!",
      no_rounds_finished: "Nie ukończyłeś żadnej rundy.",
      breathing_finished: "Oddychanie zakończone.",
      go_to: "Idź do",
      and_start_breathing: "i zacznij swoje oddychanie.",
      round_with_num: "Runda {0}",
      num_of_seconds: "<strong>{0}</strong> sekundy",
      averageTime: "Średni czas: @:ex.summary.num_of_seconds",
      share_results: "Udostępnij swój wynik",
    },
    warning: {
      title: "Uwaga",
      text: "Te ćwiczenia oddechowe mogą wpływać na kontrolę motoryczną, powodować przejściowe zawroty głowy, a nawet powodować omdlenia - NIE wykonuj ich podczas jazdy lub w niebezpiecznych miejscach oraz w wodzie. Znajdź bezpieczne miejsce, takie jak kanapa lub łóżko.",
    },
    phases: {
      title: "Etapy rundy",
      breathing: "Oddychanie - weź {breathsPerRound} głębokich oddechów.",
      hold: "Wstrzymaj oddech - wypuść powietrze i wstrzymaj oddech aż poczujesz potrzebę wzięcia wdechu.",
      recovery:
        "Regeneracja - weź głęboki wdech i wstrzymaj oddech na {recoveryTime} sekundy.",
    },
    leave: {
      title: "Uwaga!",
      content: "Przerwać ćwiczenie? Progres zostanie utracony.",
    },
  },
  about: {
    title: "@:header.about",
    text: "{0} jest to aplikacja webowa zaprojektowana aby pomóc Ci w ćwiczeniach oddechowych na podstawie Metody Wima Hoffa.{1}W applikacji możesz w łatwy sposób dostosować tempo ćwiczenia oddechowego na podstawie swoich {2}. Te ćwiczenia oddechowe są pierwszym z trzech filarów w Metodzie Wima Hofa. Więcej informacji znajdzie na oficjalnej stronie: {3}.",
    preferences: "preferencje",
    whm_link_title: "Otwórz oficjaną stronę Metody Wima Hofa",
    app_version: "Wersja applikacji: {0}",
  },
  modal: {
    default_title: "Wiadomość",
    label_close: "zakmnij dialog",
  },
  instructions,
};

export default pl;
