<template>
  <div class="about">
    <h1>About</h1>
    <article class="about__contetn">
      <p>
        <strong>Breathing Time</strong> is a simple web application designed to
        help you with breathing exercises based on the Wim Hof method.<br />It
        allows you to easily adjust tempo of exercise based on your
        <router-link :to="{ name: 'BreathingExercisePreferences' }"
          >preferences</router-link
        >. The breathing exercises are the first of the three pillars in the Wim
        Hof Method. You can find more information on the
        <a
          href="https://www.wimhofmethod.com/"
          target="_blank"
          title='Open oficial "Wim Hof Method" website'
          >Wim Hof Method</a
        >
        official website.
      </p>
    </article>
    <p class="about__app_version">App Version: {{ version }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      version: process.env.APP_VERSION as string,
    };
  },
});
</script>

<style scoped>
.about {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.about__contetn {
  flex: 1;
  max-width: 760px;
  margin: auto auto;
  line-height: 1.5rem;
}

.about__app_version {
  text-align: right;
  color: rgba(var(--dark-rgb), 0.7);
}
</style>
