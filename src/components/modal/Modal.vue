<template>
  <div
    class="modal"
    role="dialog"
    aria-labelledby="modal-title"
    aria-describedby="modal-body"
  >
    <div class="modal__content">
      <div id="modal-title" class="modal__title">
        <p role="heading">{{ title || "Message" }}</p>
      </div>
      <div id="moda-body" class="modal__body">
        <p v-if="content">{{ content }}</p>
        <slot />
      </div>
      <div class="modal__actions">
        <app-button
          v-for="action in actions"
          :key="action.label"
          @click="action.handler"
        >
          {{ action.label }}
        </app-button>

        <app-button aria-label="close dialog" v-if="!actions" @click="dismiss">
          Ok
        </app-button>
      </div>
    </div>
    <div class="modal__backdrop" @click="dismiss"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ButtonVue from "../ui/Button.vue";

export default defineComponent({
  name: "Modal",
  components: { appButton: ButtonVue },
  props: {
    title: String,
    content: String,
    dismiss: {
      type: Function as PropType<(ev: Event) => void>,
      required: true,
    },
    actions: Object as PropType<{
      label: string;
      handler: (ev: MouseEvent) => void;
    }>,
  },

  mounted() {
    const focusable = (
      this.$el as HTMLDivElement
    ).querySelectorAll<HTMLElement>(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
    );

    this.focusable = focusable;
    focusable[0].focus();
  },
});
</script>
<style scoped>
.modal {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__content {
  background-color: whitesmoke;
  padding: 1rem;
  margin: 1rem;

  z-index: 200;
  width: 100%;
  max-width: 760px;
  max-height: 100%;

  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
}

.modal__title {
  font-size: 1.3rem;
  font-weight: 600;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}

.modal__body {
  font-size: 1.2em;
}

.modal__actions {
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
}

.modal__actions button {
  margin-inline-start: 2rem;
  min-width: 64px;
}

.modal__actions button:first-of-type {
  margin-inline-start: initial;
}

.modal__backdrop {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
}
</style>
