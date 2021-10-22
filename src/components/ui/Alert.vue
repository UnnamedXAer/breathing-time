<template>
  <div
    data-test="alert"
    role="alert"
    class="alert"
    :class="{
      [mode]: true,
      [variant]: true,
      dismissable: !!dismiss,
      with_icon: icon,
    }"
  >
    <component :is="icon" :aria-label="mode + ' icon'" class="alert_icon" />
    <span style="flex: 1" data-test="slotwrapper"><slot></slot></span>
    <div v-if="!!dismiss" class="close_btn__wrapper">
      <button
        class="close_btn"
        aria-label="close warning"
        @click="dismiss"
        data-test="alert-dismiss-btn"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import InfoIconSvgVue from "../svg/InfoIconSvg.vue";
import WarningIconSvgVue from "../svg/WarningIconSvg.vue";
import DangerIconSvgVue from "../svg/DangerIconSvg.vue";

export default defineComponent({
  components: {
    appWarningIcon: WarningIconSvgVue,
    appInfoIcon: InfoIconSvgVue,
    appDangerIcon: DangerIconSvgVue,
  },
  props: {
    dismiss: Function,
    mode: {
      type: String as PropType<
        "normal" | "info" | "warning" | "danger" | "success"
      >,
      default: "normal",
    },
    variant: {
      type: String as PropType<"contained" | "outlined">,
      default: "contained",
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    icon() {
      if (!this.showIcon) {
        return null;
      }
      let icon: string | null = null;

      switch (this.mode) {
        case "normal":
          // no icon
          break;
        case "info":
          icon = "app-info-icon";
          break;
        case "warning":
          icon = "app-warning-icon";
          break;
        case "danger":
          icon = "app-danger-icon";
          break;
      }

      return icon;
    },
  },
});
</script>

<style scoped>
.alert {
  text-align: start;
  position: relative;
  padding: 1rem 1.1rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: rgb(0, 145, 230);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  min-width: 300px;
  width: 100% !important;
  max-width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (min-width: 540px) {
  .alert {
    min-width: 200px;
  }
}

.alert.dismissable {
  padding-right: 0.3rem;
}

.alert.with_icon {
  padding-left: 0.3rem;
}

.alert.outlined {
  border: 1pt solid rgb(0, 145, 230);
  padding: calc(1rem - 1pt) calc(1.1rem - 1pt);
  color: rgb(0, 145, 230);
  background: var(--light);
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

.alert .close_btn__wrapper {
  display: flex;
}

.alert .close_btn {
  background-color: inherit;
  border: none;
  font-size: 2rem;
  color: rgb(255, 235, 170);
  cursor: pointer;
}

.alert .close_btn:hover {
  background-color: rgba(0, 0, 0, 0.15);
  color: inherit;
}
</style>
