<template>
  <button class="btn"><slot></slot></button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.btn {
  padding: 1rem;
}
</style>
