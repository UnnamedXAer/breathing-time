<template>
  <div class="home">
    <h1>Welcome to Breathing Timer</h1>
    <br />
    <section class="cards">
      <router-link :to="{ name: 'BreathingExercise-Start' }" class="card">
        <div class="image">
          <app-couthing-alt-svg></app-couthing-alt-svg>
        </div>
        <p class="text">Start Your breathing</p>
      </router-link>

      <router-link :to="{ name: 'Settings' }" class="card">
        <div class="image">
          <app-couthing-alt-svg></app-couthing-alt-svg>
        </div>
        <p class="text">Adjust Breathing Settings</p>
      </router-link>
    </section>
  </div>
</template>

<script lang="ts">
import CoughingAltSvgVue from "../components/svg/CoughingAltSvg.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    appCouthingAltSvg: CoughingAltSvgVue,
  },
});
</script>

<style scoped>
.cards {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
}

.card {
  height: 135px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;

  color: teal;
  box-shadow: 0px 3px 8px teal;
  margin: 1rem;
  cursor: pointer;

  font-size: 1.5rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  text-decoration: none;
}

.card .text {
  flex: 1;
  text-align: center;
}

.card:hover {
  transition: 200ms;
  transform: scale(1.02);
}

.image {
  width: 100px;
  height: 100px;
}

.image svg {
  height: 100%;
}

@media screen and (min-width: 760px) {
  .cards {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .card {
    width: 330px;
  }
}
</style>
