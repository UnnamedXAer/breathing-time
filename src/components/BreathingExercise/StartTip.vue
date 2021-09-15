<template>
  <section class="start_tip">
    <p><slot /></p>
  </section>
</template>

<style scoped>
.start_tip {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(var(--light-rgb), 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.start_tip p {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
}
</style>
