<template>
  <div class="about">
    <h1>About</h1>
    <article class="about__contetn">
      <p>
        <strong>Breathing Timer</strong> is a simple web application designed to
        help you with breathing exercises based on the Wim Hof method.<br />It
        allows you to easily adjust tempo of exercise based on your
        <router-link :to="{ name: 'BreathingExercisePreferences' }"
          >preferences</router-link
        >. The breathing exercise is first of the three pillars in the Wim Hof
        Method. You can find more information on the
        <a
          href="https://www.wimhofmethod.com/"
          target="_blank"
          title='Open oficial "Wim Hof Method" website'
          >Wim Hof Method</a
        >
        official website.
      </p>
    </article>
  </div>
</template>

<style scoped>
.about__contetn {
  max-width: 760px;
  margin: auto auto;
  line-height: 1.5rem;
}
</style>