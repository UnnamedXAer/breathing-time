<template>
  <div class="counter__lungs">
    <div
      data-test="animation-wrapper"
      class="counter__lungs_wrapper"
      @click="toggleAnimation"
      :title="
        $t(`ex.breathing.${disableAnimation ? 'enable' : 'disable'}_animation`)
      "
    >
      <div
        v-if="!disableAnimation"
        data-test="animation"
        class="counter__lungs_animated one"
        :class="{
          animate: !disableAnimation,
          [counter % 2 ? 'odd' : 'even']: true,
        }"
        :style="{ animationDuration: animationDuration + 'ms' }"
      >
        <div class="two">
          <div class="three">
            <div class="four"></div>
          </div>
        </div>
      </div>
      <div v-else data-test="animation-disabled">
        <p class="enable_animation_text">
          {{ $t("ex.breathing.enable_animation") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { namespaceName } from "@/store/createStore";
import {
  ExerciseActions,
  UpdatePreferencesPayload,
} from "@/store/modules/exercise/types";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    animationDuration: { type: Number, required: true },
    disableAnimation: Boolean,
    counter: { type: Number, required: true },
  },

  methods: {
    toggleAnimation() {
      this.$store.dispatch(
        namespaceName("exercise", ExerciseActions.UpdatePreferences),
        {
          propName: "disableAnimation",
          value: !this.disableAnimation,
        } as UpdatePreferencesPayload
      );
    },
  },
});
</script>

<style scoped>
.counter__lungs {
  width: 100%;
}

.enable_animation_text {
  color: rgba(var(--dark-rgb), 0.3);
  user-select: none;
}

.counter__lungs_wrapper {
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 300px;
  max-height: 30vh;
  max-width: 30vh;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.counter__lungs_wrapper div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.counter__lungs_animated {
  animation-duration: 1401ms;
  opacity: 0.7;
  width: 100px;
  height: 100px;
}

.counter__lungs_animated * {
  animation-duration: inherit !important;
  width: calc(100% - 30px);
  height: calc(100% - 30px);
}

.counter__lungs_animated,
.counter__lungs_animated * {
  border-radius: 30% 30% 60% 60% / 60% 60% 30% 30%;
}

.counter__lungs_animated.animate.even {
  animation: breath ease-out both alternate;
}

.counter__lungs_animated.animate.even * {
  animation: breath-div ease-out forwards alternate;
}

.counter__lungs_animated.animate.odd {
  animation: breath-odd ease-out forwards alternate;
}

.counter__lungs_animated.animate.odd * {
  animation: breath-div-odd ease-out forwards alternate;
}

.one {
  background: rgb(106, 170, 170);
  background: radial-gradient(
    circle,
    rgba(106, 170, 170, 1) 38%,
    rgba(194, 224, 224, 1) 100%
  );
}

.two {
  background: rgb(246, 102, 78);
  background: radial-gradient(
    circle,
    rgba(246, 102, 78, 1) 38%,
    rgba(255, 181, 169, 1) 100%
  );
}

.three {
  background: rgb(194, 233, 135);
  background: radial-gradient(
    circle,
    rgba(194, 233, 135, 1) 38%,
    rgba(218, 228, 202, 1) 100%
  );
}

.four {
  background: rgb(171, 223, 247);
  background: radial-gradient(
    circle,
    rgba(171, 223, 247, 1) 38%,
    rgba(204, 229, 241, 1) 100%
  );
}

@keyframes breath {
  0%,
  2.5% {
    opacity: 0.7;
    width: 100px;
    height: 100px;
  }
  48%,
  53% {
    opacity: 1;
    width: 98%;
    height: 98%;
  }
  97.5%,
  100% {
    opacity: 0.7;
    width: 100px;
    height: 100px;
  }
}

@keyframes breath-div {
  0%,
  2.5% {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
  }
  48%,
  53% {
    width: calc(100% - 8px);
    height: calc(100% - 8px);
  }
  97.5%,
  100% {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
  }
}

@keyframes breath-odd {
  0%,
  2.5% {
    opacity: 0.7;
    width: 100px;
    height: 100px;
  }
  48%,
  53% {
    opacity: 1;
    width: 98%;
    height: 98%;
  }
  97.5%,
  100% {
    opacity: 0.7;
    width: 100px;
    height: 100px;
  }
}

@keyframes breath-div-odd {
  0%,
  2.5% {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
  }
  48%,
  53% {
    width: calc(100% - 8px);
    height: calc(100% - 8px);
  }
  97.5%,
  100% {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
  }
}
</style>
