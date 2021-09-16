<template>
  <app-warning-note />

  <article class="instructions">
    <h1>Exercise instructions</h1>
    <ol>
      <li>
        <p>
          Get comfortable - lie down or sit depending what is the most
          comfortable for you, make sure you can breath freely - your lungs can
          expand without any constriction. Any additional muscle contraction
          will hinder the exercise and shorten the duration of your breath
          holding.
        </p>
      </li>
      <li>
        <p>
          Take 30 - 50 deep breaths - inhale deeply through nose or mouth and
          exhale through mouth. Try to inhale deeply to the belly. Do not force
          exhale, just let the air go.
        </p>
        <p>
          You may experience dizziness, tingling and numbness in fingers and legs
          - these are normal, harmless side effects of lowering the level of
          carbon dioxide in the blood stream.
        </p>
      </li>
      <li>
        <p>
          Hold breath - after the last breath take deep breath - fill whole
          lungs and let the air go - stop breathing. Hold breath until you feel
          urge to inhale.
        </p>
        <p>
          Stop breathing may cause fainting if you force it to much. It is not
          dangerous but better avoided. Holding breath until the feel of
          moderate or strong need to inhale is enough.
        </p>
      </li>
      <li>
        <p>
          Recovery - once you feel urge to breath inhale at full capacity of
          your lungs and stop breathing for about 15 seconds. One round is
          completed.
        </p>
        <p>
          The next round starts from the breathing phase. Repeat this cycle 3-5
          times with not break in between.
        </p>
      </li>
    </ol>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WarningNoteVue from "../components/BreathingExercise/WarningNote.vue";
export default defineComponent({
  components: {
    appWarningNote: WarningNoteVue,
  },
});
</script>
