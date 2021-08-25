<template>
  <span class="spinner"></span>
</template>

<style scoped>
.spinner {
  display: inline-block !important;
  width: 2rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: none;
}

.spinner span {
  display: inline-block;
  width: 100%;
  height: 100%;

  border: 0.5rem solid var(--primary);

  animation: loading 1200ms infinite ease-in both alternate-reverse;
}

.btn .spinner {
  width: 0.9rem;
  height: 0.9rem;
}

.btn.lg .spinner {
  width: 1.2rem;
  height: 1.2rem;
}
.btn.lg .spinner span {
  border-width: 0.4rem;
}

.btn .spinner span {
  border-color: white;
  border-width: 0.3rem;
}

@keyframes loading {
  from {
    transform: rotate(0);
    border-radius: 5%;
  }
  to {
    transform: rotate(360deg);
    border-radius: 50%;
    opacity: 0.2;
  }
}
</style>
