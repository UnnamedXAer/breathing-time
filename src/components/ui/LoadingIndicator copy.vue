<template>
  <span class="loading"></span>
</template>

<style scoped>
.loading {
  position: relative;
  display: inline-block;
  width: 2.9rem;
  height: 1rem;
}

.loading::before,
.loading::after {
  content: "";
  display: block;
  position: absolute;

  width: 1.4rem;
  height: 2rem;
  background-color: rgb(24, 182, 255);

  animation: loading 1000ms infinite ease-out both alternate-reverse;
}

.loading::before {
  left: 0;
  border-radius: 50% 60% 80% 90% / 30% 60% 30% 100%;
}

.loading::after {
  right: 0;
  border-radius: 60% 50% 90% 80% / 60% 30% 100% 30%;
}

.danger .loading::before,
.danger .loading::after {
  background-color: rgb(255, 213, 24);
}

@keyframes loading {
  from {
    opacity: 0.2;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
