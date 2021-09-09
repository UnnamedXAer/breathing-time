<template>
  <article class="warning_note">
    <h2>
      <app-warning-icon-svg
        class="warning_note__icon"
        fill="rgba(220, 165, 0, 0.3)"
      />
      Attention
    </h2>
    <p>
      This breathing exercises can affect your motor control, cause temporary
      dizziness or even make you faint - do NOT do it while driving or in kind
      of dangerous places. Find safe place like sofa or bed.
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
