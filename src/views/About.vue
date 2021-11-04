<template>
  <div class="about">
    <h1 data-test="about-title">{{ $t("about.title") }}</h1>
    <article class="about__contetn" data-test="about-content">
      <i18n-t keypath="about.text" tag="p" for="title">
        <strong>Breathing Time</strong>
        <br />
        <router-link :to="{ name: 'BreathingExercisePreferences' }">{{
          $t("about.preferences")
        }}</router-link>
        <a
          href="https://www.wimhofmethod.com/"
          target="_blank"
          title='Open oficial "Wim Hof Method" website'
          >Wim Hof Method</a
        >
      </i18n-t>
    </article>
    <p class="about__app_version" data-test="about-version">
      {{ $t("about.app_version", [version]) }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    console.log("--->>> v: ", process.env.APP_VERSION as string);
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
