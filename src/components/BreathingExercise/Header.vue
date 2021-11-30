<template>
  <section class="header">
    <h2 data-test="ex-header-title"><slot /></h2>
    <slot name="additional" />
  </section>
</template>

<style scoped>
.header h2 {
  font-size: 2.2em;
  font-variant: small-caps;
}

.header h2 {
  margin-block-end: 0;
  margin-block-start: 0;
}

@media screen and (min-height: 800px) {
  .header h2 {
    margin-block-end: revert;
    margin-block-start: revert;
  }
}
</style>
