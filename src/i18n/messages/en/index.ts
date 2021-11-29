import instructions from "./instructions";

export default {
  common: {
    yes: "Yes",
    no: "No",
    ok: "Ok",
  },
  header: {
    home: "Home",
    about: "About",
  },
  home: {
    welcome: "Welcome to {0}",
    start_exercise: "Start Your Breathing",
    exercise_instructions: "Breathing Instructions",
    exercise_preferences: "Breathing Preferences",
    download: "Download",
  },
  preferences: {
    title: "Breathing Exercise Preferences",
    num_of_rounds: "Number of rounds:",
    breaths_per_round: "Breaths per round:",
    breathing_pace: "Breathing pace:",
    breathing_pace_fast: "fast",
    breathing_pace_moderate: "moderate",
    breathing_pace_slow: "slow",
    recovery_time: "Recovery time:",
    disable_animation: "Disable animation",
    disable_start_tips: "Disable start tips shown before exercise phases",
    restore_default: "Restore Default",
  },
  ex: {
    title: "Breathing Exercise",
    start: {
      start: "START",
      get_ready: "Get Ready!",
      go: "Go",
      see_instructions: "See instructions",
    },
    breathing: {
      title: "Breathing",
      start_tip: "Breath deeply with counter.",
      skip_to_next: "Skip to the next phase",
      footer_tip: "Inhale deeply and exhale as counter changes.",
      disable_animation: "Disable animation",
      enable_animation: "Enable animation",
    },
    hold: {
      title: "Breath Hold",
      start_tip: "Take final deep breath, then let go and stop breathing.",
      skip_to_next: "Next Phase",
      footer_tip: "Stop breathing until you feel urge to inhale.",
      last_round_tip: "This is last round. Don't forget about recover phase.",
      are_you_still_there: "Are you still there?",
    },
    recovery: {
      title: "Recovery",
      start_tip: "Inhale deeply and stop breathing.",
      skip_to_next: "Skip to the next phase",
      skip_to_summary: "Skip to the Summary screen",
      footer_tip: "Stop breathing for {0} seconds.",
    },
    summary: {
      congrats_finished: "Congrats you finished your breathing!",
      no_rounds_finished: "You did not finish any rounds.",
      breathing_finished: "Breathing finished.",
      go_to: "Go to",
      and_start_breathing: "and start your breathing.",
      round_with_num: "Round {0}",
      num_of_seconds: "<strong>{0}</strong> seconds",
      averageTime: "Average Time: @:ex.summary.num_of_seconds",
      share_results: "Share your results",
    },
    warning: {
      title: "Attention",
      text: "These breathing exercises can affect your motor control, cause temporary dizziness or even make you faint - do NOT do it while driving or in kind of dangerous places. Find safe place like couch or bed.",
    },
    phases: {
      title: "Round's phases",
      breathing: "Breathing - take {breathsPerRound} deep breaths.",
      hold: "Breath hold - exhale then stop breathing until you feel urge to inhale.",
      recovery:
        "Recovery - inhale deeply and hold breath for {recoveryTime} seconds.",
    },
    leave: {
      title: "Warning!",
      content: "Leave exercise? Progress will be lost.",
    },
  },
  about: {
    title: "@:header.about",
    text: "{0} is a simple web application designed to help you with breathing exercises based on the Wim Hof method.{1}It allows you to easily adjust tempo of exercise based on your {2}. The breathing exercises are the first of the three pillars in the Wim Hof Method. You can find more information on the {3} official website.",
    preferences: "preferences",
    whm_link_title: 'Open official "Wim Hof Method" website',
    app_version: "App version: {0}",
  },
  modal: {
    default_title: "Message",
    label_close: "close dialog",
  },
  instructions,
};
