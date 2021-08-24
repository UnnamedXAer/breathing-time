<template>
  <section class="breathing_exercise__summary">
    <app-button @click="$emit('start')">START</app-button>
    <app-button @click="$emit('next')">Next Round</app-button>
    <app-button @click="$emit('stop')">Finish</app-button>
  </section>
</template>

<script lang="ts">
import { RoundState } from "@/types/breath";
import { defineComponent, PropType } from "vue";
import ButtonVue from "../ui/Button.vue";

export default defineComponent({
  components: {
    appButton: ButtonVue,
  },

  props: {
    roundState: {
      type: String as PropType<RoundState>,
      required: true,
    },
  },

  emits: ["start", "next", "stop"],
});
</script>

<style scoped>
</style>
