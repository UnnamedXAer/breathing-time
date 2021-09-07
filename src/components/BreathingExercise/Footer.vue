<template>
  <section class="footer">
    <slot name="additional" />
    <p class="tip">
      <slot />
    </p>
  </section>
</template>

<style scoped>
.footer {
  /* justify-self: flex-end; */
  color: rgba(var(--dark-rgb), 0.7);
}

.footer .tip {
  text-align: center;
}
</style>
