<template>
  <div role="alert" class="alert" :class="{ [mode]: true, [variant]: true }">
    <slot></slot>
    <button v-if="!!dismiss" aria-label="close warning" @click="dismiss">
      &times;
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    dismiss: Function,
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
.alert {
  box-sizing: border-box;
  padding: 1rem 1.1rem;
  font-size: 1rem;
  border: none;
  font-weight: 600;
  color: white;
  background-color: rgb(0, 145, 230);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.alert.outlined {
  border: 1pt solid rgb(0, 145, 230);
  padding: calc(1rem - 1pt) calc(1.1rem - 1pt);
  color: rgb(0, 145, 230);
  background: white;
}

.alert.link {
  color: rgb(0, 145, 230);
  background: inherit;
  box-shadow: none;
}

.alert.loading {
  cursor: progress !important;
}

.normal:hover {
  background-color: rgb(0, 120, 205);
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
/* .success:hover {
  background-color: rgb(0, 130, 25);
} */

.warning {
  background-color: rgb(220, 165, 0);
}
/* .warning:hover {
  background-color: rgb(200, 150, 0);
} */

.alert > .spinner {
  margin-left: -0.9rem;
  margin-right: 0.3rem;
}
</style>
