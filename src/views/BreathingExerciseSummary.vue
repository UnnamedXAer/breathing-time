<template>
  <article class="summary">
    <h2 v-if="holdTimes.length === rounds">
      Congrats you finished your breathing!
    </h2>
    <h2 v-else-if="holdTimes.length === 0">You did not finish any rounds.</h2>
    <h2 v-else>Breathing finished.</h2>
    <table>
      <tr v-for="(time, idx) in holdTimes" :key="idx">
        <th>Round {{ idx + 1 }}</th>
        <td>{{ time }} s</td>
      </tr>
    </table>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {},
  computed: {
    holdTimes() {
      return [123.22];
    },
  },
});
</script>
