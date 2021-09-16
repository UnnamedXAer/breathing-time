<template>
  <div class="home">
    <h1>{{ $t("home.welcome", ["Breathing Time"]) }}</h1>
    <section class="dashboard">
      <router-link :to="{ name: 'BreathingExercise-Start' }" class="card">
        <div class="image">
          <app-couthing-alt-svg></app-couthing-alt-svg>
        </div>
        <p class="text" style="font-weight: bold">
          {{ $t("home.start_exercise") }}
        </p>
      </router-link>
      <section class="cards">
        <router-link
          :to="{ name: 'BreathingExerciseInstructions' }"
          class="card"
        >
          <div class="image">
            <app-instruction-svg></app-instruction-svg>
          </div>
          <p class="text">{{ $t("home.exercise_instructions") }}</p>
        </router-link>

        <router-link
          :to="{ name: 'BreathingExercisePreferences' }"
          class="card"
        >
          <div class="image">
            <app-preferences-svg></app-preferences-svg>
          </div>
          <p class="text">{{ $t("home.exercise_preferences") }}</p>
        </router-link>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import CoughingAltSvgVue from "../components/svg/CoughingAltSvg.vue";
import PreferencesSvgVue from "../components/svg/PreferencesSvg.vue";
import InstructionSvgVue from "../components/svg/InstructionSvg.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    appCouthingAltSvg: CoughingAltSvgVue,
    appPreferencesSvg: PreferencesSvgVue,
    appInstructionSvg: InstructionSvgVue,
  },
});
</script>

<style scoped>
.home > h1 {
  text-align: center;
}

.dashboard {
  width: 100%;

  margin-left: auto;
  margin-right: auto;
}

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
  align-items: center;

  padding: 1rem;
  margin: 1rem;

  font-size: 1.5rem;
  text-decoration: none;

  color: var(--primary);
  box-shadow: 0px 3px 8px var(--dark);
  cursor: pointer;
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
  .dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cards {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .dashboard .card {
    width: calc(660px + 2rem);
  }

  .cards .card {
    width: 330px;
  }
}
</style>
