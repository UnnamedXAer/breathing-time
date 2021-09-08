<template>
  <section class="settings">
    <h1>Settings</h1>
    <div>
      <app-range
        id="num-of-rounds"
        name="numberOfRounds"
        :min="1"
        :max="10"
        :value="numberOfRounds"
        @modify="changeHandler"
        >Number of rounds:</app-range
      >

      <app-range
        id="breaths-per-round"
        name="breathsPerRound"
        :min="10"
        :max="60"
        :value="breathsPerRound"
        @modify="changeHandler"
        >Breaths per round:</app-range
      >

      <app-range
        id="breath-time"
        name="breathTime"
        :min="1400"
        :max="2600"
        :step="600"
        :value="breathTime"
        @modify="changeHandler"
        :valueTranslation="{
          1400: 'fast',
          2000: 'moderate',
          2600: 'slow',
        }"
        >Breathing pace</app-range
      >

      <app-range
        id="recovery-time"
        name="recoveryTime"
        :min="5"
        :max="30"
        :value="recoveryTime"
        @modify="changeHandler"
        >Recovery time:</app-range
      >

      <app-checkbox
        id="disable-animation"
        name="disableAnimation"
        :value="disableAnimation"
        @modify="changeHandler"
        >Disable animation</app-checkbox
      >
    </div>
    <div>
      <app-button @click="restoreDefault">Restore Default</app-button>
    </div>
  </section>
</template>

<script lang="ts">
import ButtonVue from "@/components/ui/Button.vue";
import CheckboxVue from "@/components/ui/Checkbox.vue";
import RangeVue from "@/components/ui/Range.vue";
import { namespaceName, StoreState } from "@/store";
import { customizableExerciseStateProps } from "@/store/modules/exercise";
import {
  ExerciseActions,
  ExerciseModuleMap,
  ExerciseMutations,
  UpdateSettingsPayload,
} from "@/store/modules/exercise/types";
import { defineComponent } from "vue";
import { mapState } from "vuex";

type ComputedTypes = ExerciseModuleMap<typeof customizableExerciseStateProps>;

export default defineComponent({
  name: "Settings",
  components: {
    appCheckbox: CheckboxVue,
    appRange: RangeVue,
    appButton: ButtonVue,
  },

  computed: {
    ...(mapState<StoreState>(
      "exercise",
      customizableExerciseStateProps
    ) as ComputedTypes),
  },

  methods: {
    changeHandler(
      propName: UpdateSettingsPayload["propName"],
      value: UpdateSettingsPayload["value"]
    ) {
      this.$store.commit(
        namespaceName("exercise", ExerciseMutations.UpdateSettings),
        {
          propName: propName,
          value: value,
        } as UpdateSettingsPayload
      );
    },

    restoreDefault() {
      this.$store.dispatch(
        namespaceName("exercise", ExerciseActions.RestoreDefault)
      );
    },
  },
});
</script>

<style scoped>
.settings {
  flex: 1;

  display: flex;
  flex-direction: column;
}
</style>
