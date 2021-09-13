<template>
  <div class="counter__lungs">
    <div class="counter__lungs_wrapper">
      <div
        class="counter__lungs_animated one"
        :class="{ animate: animate && !disableAnimation }"
        :style="{ animationDuration: animationDuration / 2 + 'ms' }"
      >
        <div
          class="two"
          :style="{ animationDuration: animationDuration / 2 + 'ms' }"
        >
          <div
            class="three"
            :style="{ animationDuration: animationDuration / 2 + 'ms' }"
          >
            <div
              class="four"
              :style="{ animationDuration: animationDuration / 2 + 'ms' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    animate: { type: Boolean, required: true },
    animationDuration: { type: Number, required: true },
    disableAnimation: Boolean,
  },
};
</script>

<style scoped>
.counter__lungs {
  width: 100%;
}

.counter__lungs_wrapper {
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 300px;
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

.counter__lungs_animated,
.counter__lungs_animated * {
  border-radius: 30% 30% 60% 60% / 60% 60% 30% 30%;
}

.counter__lungs_animated.animate {
  animation: breath infinite ease-out both alternate-reverse;
}

.counter__lungs_animated * {
  animation: breath-div infinite ease-out both alternate-reverse;
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
  0% {
    width: 98%;
    height: 98%;
  }
  5% {
    width: 98%;
    height: 98%;
  }
  95% {
    width: 100px;
    height: 100px;
  }
  100% {
    width: 100px;
    height: 100px;
  }
}

@keyframes breath-div {
  0% {
    width: calc(100% - 8px);
    height: calc(100% - 8px);
  }
  5% {
    width: calc(100% - 8px);
    height: calc(100% - 8px);
  }
  95% {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
  }
  100% {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
  }
}
</style>
