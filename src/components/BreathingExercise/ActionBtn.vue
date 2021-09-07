<template>
  <app-button @click="$emit('click')" class="exercise__action_btn"
    ><slot
  /></app-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonVue from "../ui/Button.vue";

export default defineComponent({
  components: {
    appButton: ButtonVue,
  },
});
</script>


<style scoped>
.exercise__action_btn {
  background-color: black !important;
  padding-left: 2rem;
  padding-right: 2rem;
  color: var(--light);
  font-size: 3rem;
  font-variant: small-caps;
}
</style>
