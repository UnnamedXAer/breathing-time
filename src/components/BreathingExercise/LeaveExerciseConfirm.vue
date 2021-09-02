<template>
  <app-modal
    title="Warning!"
    content="Leave exercise? Progress will be lost."
    :dismiss="onCancel"
    :actions="[
      {
        label: 'Yes',
        handler: onConfirm,
      },
      {
        label: 'No',
        handler: onCancel,
      },
    ]"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ModalVue from "../modal/Modal.vue";

export default defineComponent({
  components: {
    appModal: ModalVue,
  },

  props: {
    onCancel: Function,
    onConfirm: Function,
  },
});
</script>
