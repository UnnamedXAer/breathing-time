<template>
  <div class="counter__lungs">
    <div
      class="counter__lungs_animated"
      :class="{ animate }"
      :style="{ animationDuration: animationDuration / 2 + 'ms' }"
    >
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <span class="counter__lungs_animated__center"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    breathNum: { type: Number, required: true },
    animate: { type: Boolean, required: true },
    animationDuration: { type: Number, required: true },
  },
};
</script>

<style scoped>
.counter__lungs {
  width: 300px;
  height: 300px;
  border: 1px solid rgb(236, 236, 236);
  padding: 1rem;
}

.counter__lungs div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.counter__lungs_animated {
  width: 98%;
  height: 98%;
  border-radius: 45%;
  border: 1rem rgb(1, 90, 83) solid;
}

.counter__lungs_animated div {
  width: 80%;
  height: 80%;
  border-radius: 25%;
  border: 0.3rem rgb(1, 90, 83) solid;
}

.counter__lungs_animated.animate {
  animation: breath infinite ease-out both alternate-reverse;
}

.counter__lungs_animated__center {
  width: 60%;
  height: 60%;
  border-radius: 25%;
  background-color: rgb(1, 90, 83);
}

@keyframes breath {
  0% {
    background-color: teal;
    transform: scale(1);
  }
  5% {
    transform: scale(1);
  }
  95% {
    transform: scale(0.2);
  }
  100% {
    background-color: rgba(0, 128, 128, 0.3);
    transform: scale(0.2);
  }
}
</style>
