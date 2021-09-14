<template>
  <div class="counter__lungs_animated one" title="Breathing Time">
    <div class="two">
      <div class="three">
        <div class="four"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.counter__lungs_animated {
  width: 3rem;
  height: 3rem;
}

.counter__lungs_animated * {
  width: calc(100% - 0.7rem);
  height: calc(100% - 0.7rem);
}

.counter__lungs_animated,
.counter__lungs_animated * {
  border-radius: 30% 30% 60% 60% / 60% 60% 30% 30%;
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
</style>
