<template>
  <app-modal
    :title="$t('ex.leave.title')"
    :content="$t('ex.leave.content')"
    :dismiss="onCancel"
    :actions="[
      {
        label: $t('common.yes'),
        handler: onConfirm,
      },
      {
        label: $t('common.no'),
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
