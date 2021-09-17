<template>
  <section class="preferences">
    <h1>{{ $t("preferences.title") }}</h1>
    <div class="preferences__fields_container">
      <app-range
        id="num-of-rounds"
        name="numberOfRounds"
        :min="1"
        :max="10"
        :value="numberOfRounds"
        @modify="changeHandler"
      >
        {{ $t("preferences.num_of_rounds") }}
      </app-range>

      <app-range
        id="breaths-per-round"
        name="breathsPerRound"
        :min="10"
        :max="60"
        :value="breathsPerRound"
        @modify="changeHandler"
      >
        {{ $t("preferences.breaths_per_round") }}
      </app-range>

      <app-range
        id="breath-time"
        name="breathTime"
        :min="1400"
        :max="2600"
        :step="600"
        :value="breathTime"
        @modify="changeHandler"
        :valueTranslation="{
          1400: $t('preferences.breathing_pace_fast'),
          2000: $t('preferences.breathing_pace_moderate'),
          2600: $t('preferences.breathing_pace_slow'),
        }"
      >
        {{ $t("preferences.breathing_pace") }}
      </app-range>

      <app-range
        id="recovery-time"
        name="recoveryTime"
        :min="5"
        :max="30"
        :value="recoveryTime"
        @modify="changeHandler"
      >
        {{ $t("preferences.recovery_time") }}
      </app-range>

      <app-checkbox
        id="disable-animation"
        name="disableAnimation"
        :value="disableAnimation"
        @modify="changeHandler"
      >
        {{ $t("preferences.disable_animation") }}
      </app-checkbox>

      <app-checkbox
        id="disable-start-tips"
        name="disableStartTips"
        :value="disableStartTips"
        @modify="changeHandler"
      >
        {{ $t("preferences.disable_start_tips") }}
      </app-checkbox>
    </div>
	
    <div>
      <app-button @click="restoreDefault">
        {{ $t("preferences.restore_default") }}
      </app-button>
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
  UpdatePreferencesPayload,
} from "@/store/modules/exercise/types";
import { defineComponent } from "vue";
import { mapState } from "vuex";

type ComputedTypes = ExerciseModuleMap<typeof customizableExerciseStateProps>;

export default defineComponent({
  name: "Preferences",
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
      propName: UpdatePreferencesPayload["propName"],
      value: UpdatePreferencesPayload["value"]
    ) {
      this.$store.dispatch(
        namespaceName("exercise", ExerciseActions.UpdatePreferences),
        {
          propName: propName,
          value: value,
        } as UpdatePreferencesPayload
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
.preferences {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.preferences__fields_container {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 540px;
  margin-bottom: 2rem;
}
</style>
