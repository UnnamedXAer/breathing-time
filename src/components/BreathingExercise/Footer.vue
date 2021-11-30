<template>
  <section class="footer">
    <slot name="additional" />
    <p class="tip" data-test="ex-footer-tip">
      <slot />
    </p>
  </section>
</template>

<style scoped>
.footer {
  color: rgba(var(--dark-rgb), 0.7);
}

.footer .tip {
  text-align: center;
}
</style>
