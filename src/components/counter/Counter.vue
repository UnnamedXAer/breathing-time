<template>
  <section class="counter">
    <div class="counter__lungs">
      <div class="counter__lungs_animation">
        <div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="counter__time">
      <time>{{ currentTime }}s</time>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
let x = 0;
export default defineComponent({
  data() {
    return {
      currentTime: 12,
    };
  },

  methods: {
    animate() {
      window.requestAnimationFrame((time) => {
        console.log(x, time);
        x++;
        if (x < 10) {
          this.animate();
        }
      });
    },
  },

  mounted() {
    this.animate();
  },
});
</script>
<style scoped>
.counter {
  height: 100%;
  width: 100%;
}

.counter__lungs {
  width: 300px;
  height: 300px;
  background-color: rgb(236, 236, 236);
  padding: 1rem;
}

.counter__lungs div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.counter__lungs_animation {
  width: 98%;
  height: 98%;
  border-radius: 25%;
  border: 3rem salmon solid;
  animation: breath 2s infinite ease-out both alternate-reverse;
}

.counter__lungs_animation div {
  width: 80%;
  height: 80%;
  border-radius: 25%;
  border: 1px salmon solid;
}

.counter__time {
  margin: 3rem auto;
}

@keyframes breath {
  0% {
    background-color: green;
    transform: scale(1);
  }
  10% {
    transform: scale(1);
  }
  90% {
    transform: scale(0.2);
  }
  100% {
    background-color: aquamarine;
    transform: scale(0.2);
  }
}
</style>
