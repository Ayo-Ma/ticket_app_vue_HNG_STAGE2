<script setup>
import { RouterLink } from 'vue-router';
import wave from '../assets/wave.svg';
import logo from '../assets/logo.svg';
</script>

<template>
  <section class="h-screen flex flex-col items-center justify-center text-center px-6 bg-linear-to-b from-white to-blue-50">
    <h1 class="text-5xl md:text-6xl font-bold text-gray-800 leading-tight animate-fade-in">
      Simplify Event Ticketing <br />
      <span class="text-gray-600">With Ease</span>
    </h1>

    <p class="text-lg text-gray-600 mt-4 max-w-xl animate-fade-in-delay-1">
      Manage, sell, and verify tickets all in one modern web app — built for speed,
      simplicity, and growth.
    </p>

    <img :src="wave" class="st w-full left-0 right-0" alt="wave background logo" />

    <div class="mt-8 flex gap-4 animate-fade-in-delay-2">
      <RouterLink
        to="/auth/signup"
        class="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-colors"
      >
        Get Started Free
      </RouterLink>
      <RouterLink
        to="/auth/login"
        class="border border-gray-800 text-gray-600 hover:border-gray-500 hover:text-gray-800 px-6 py-3 rounded-xl font-semibold transition-all"
      >
        Login
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-fade-in-delay-1 {
  opacity: 0;
  animation: fadeIn 0.6s ease-out 0.3s forwards;
}

.animate-fade-in-delay-2 {
  opacity: 0;
  animation: fadeIn 0.6s ease-out 0.5s forwards;
}
</style>