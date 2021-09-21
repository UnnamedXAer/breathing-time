<template>
  <app-warning-note />

  <article class="instructions">
    <h1>{{ $t("instructions.title") }}</h1>
    <ol>
      <li
        v-for="(point, idx) in $i18n.getLocaleMessage($i18n.locale).instructions
          .paragraphs"
        :key="idx"
      >
        <p v-for="(p, pIdx) in point" :key="pIdx">{{ p }}</p>
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
