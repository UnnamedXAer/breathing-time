<template>
  <label :for="id">
    <div style="display: flex; justify-content: space-between">
      <span data-test="label"><slot /></span>
      <span style="font-size: 1.2em" data-test="value">{{ displayValue }}</span>
    </div>
    <input
      type="range"
      :name="name"
      :id="id"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      @input="$emit('modify', name, +$event.target.value)"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  emits: ["modify"],
  props: {
    name: String,
    value: { type: Number, required: true },
    disabled: Boolean,
    min: Number,
    max: Number,
    step: Number,
    id: String,
    valueTranslation: Object as PropType<{ [key: number]: string | number }>,
  },

  computed: {
    displayValue() {
      if (this.valueTranslation) {
        return this.valueTranslation[this.value];
      }
      return this.value;
    },
  },
});
</script>
