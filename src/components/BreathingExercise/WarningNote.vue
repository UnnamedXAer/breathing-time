<template>
  <article class="warning_note">
    <h2 data-test="warning-note-title">
      <app-warning-icon-svg
        class="warning_note__icon"
        fill="rgba(220, 165, 0, 0.3)"
      />
      {{ $t("ex.warning.title") }}
    </h2>
    <p data-test="warning-note-content">
      {{ $t("ex.warning.text") }}
    </p>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WarningIconSvgVue from "../svg/WarningIconSvg.vue";
export default defineComponent({
  components: {
    appWarningIconSvg: WarningIconSvgVue,
  },
});
</script>

<style scoped>
.warning_note__icon {
  margin-bottom: -0.5em;
}
</style>
