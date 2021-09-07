<template>
  <section class="header">
    <h2><slot /></h2>
    <slot name="additional" />
  </section>
</template>

<style scoped>
.breathing_exercise .header h2 {
  font-size: 2.2em;
  font-variant: small-caps;
}
</style>
