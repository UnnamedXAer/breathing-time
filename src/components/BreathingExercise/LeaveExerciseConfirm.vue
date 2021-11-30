<template>
  <teleport to="body">
    <app-modal
      :title="$t('ex.leave.title')"
      :content="$t('ex.leave.content')"
      :dismiss="cancelHandler"
      :actions="[
        {
          label: $t('common.yes'),
          handler: confirmHandler,
        },
        {
          label: $t('common.no'),
          handler: cancelHandler,
        },
      ]"
    />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ModalVue from "../modal/Modal.vue";

export default defineComponent({
  name: "LeaveExerciseConfirm",
  components: {
    appModal: ModalVue,
  },

  props: {
    cancelHandler: { type: Function as PropType<() => void> },
    confirmHandler: { type: Function as PropType<() => void> },
  },
});
</script>
