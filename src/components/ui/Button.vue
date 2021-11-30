<template>
  <button
    data-test="btn"
    class="btn"
    :class="{ [mode]: true, disabled, loading, [variant]: true }"
    :disabled="disabled || loading"
  >
    <app-loading v-if="loading" data-test="btn-loading" />
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import LoadingIndicatorVue from "./Spinner.vue";

export default defineComponent({
  components: {
    appLoading: LoadingIndicatorVue,
  },
  props: {
    loading: Boolean,
    disabled: Boolean,
    mode: {
      type: String as PropType<
        "normal" | "info" | "warning" | "danger" | "success"
      >,
      default: "normal",
    },
    variant: {
      type: String as PropType<"contained" | "outlined" | "link">,
      default: "contained",
    },
  },
});
</script>

<style scoped>
.btn {
  box-sizing: border-box;
  padding: 1rem 1.1rem;
  font-size: 1rem;
  border: none;
  font-weight: 600;
  color: var(--light);
  background-color: rgb(0, 145, 230);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
}

.btn.outlined {
  border: 1pt solid rgb(0, 145, 230);
  padding: calc(1rem - 1pt) calc(1.1rem - 1pt);
  color: rgb(0, 145, 230);
  background: white;
}

.btn.link {
  color: rgb(0, 145, 230);
  background: inherit;
  box-shadow: none;
}

.btn.disabled {
  background-color: rgba(85, 85, 85, 0.5);
  color: rgb(250, 250, 250);
}

.btn.disabled:hover {
  background-color: rgba(85, 85, 85, 0.5);
  color: rgb(250, 250, 250);
  cursor: default;
}

.btn.loading {
  cursor: progress !important;
}

.normal:hover {
  background-color: rgb(0, 120, 205);
  color: rgb(250, 250, 250);
}

.danger {
  background-color: rgb(220, 0, 35);
}
.danger:hover {
  background-color: rgb(180, 0, 30);
}

.success {
  background-color: rgb(0, 160, 20);
}
.success:hover {
  background-color: rgb(0, 130, 25);
}

.warning {
  background-color: rgb(220, 165, 0);
}
.warning:hover {
  background-color: rgb(200, 150, 0);
}

.link:hover {
  background-color: inherit;
  text-decoration: underline;
  color: rgb(0, 145, 230);
}

.btn > .spinner {
  margin-left: -0.9rem;
  margin-right: 0.3rem;
}
</style>
