<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Menu, X } from 'lucide-vue-next';

const isMenuOpen = ref(false);

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <nav class="flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-md fixed w-full top-0 z-50 shadow-sm mb-20">
    <h1 class="text-2xl font-bold text-gray-800 tracking-tight">
      Ticket<span class="text-gray-800">App</span>
    </h1>

    <!-- Desktop Menu -->
    <div class="space-x-6 hidden md:flex">
      <RouterLink to="/" class="text-gray-700 hover:text-gray-600 transition-colors">Home</RouterLink>
      <a href="#features" @click="closeMenu" class="text-gray-700 hover:text-gray-600 transition-colors">Features</a>
      <a href="#pricing" @click="closeMenu" class="text-gray-700 hover:text-gray-600 transition-colors">Pricing</a>
      <a href="#contact" @click="closeMenu" class="text-gray-700 hover:text-gray-600 transition-colors">Contact</a>
    </div>

    <!-- Desktop Auth Buttons -->
    <div class="space-x-3 hidden md:flex items-center">
      <RouterLink to="/auth/login" class="text-gray-700 hover:text-gray-600 font-medium transition-colors">Login</RouterLink>
      <RouterLink
        to="/auth/signup"
        class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition-colors"
      >
        Get Started
      </RouterLink>
    </div>

    <!-- Mobile Menu Toggle -->
    <button 
      class="md:hidden text-gray-700"
      @click="isMenuOpen = !isMenuOpen"
      aria-label="Toggle menu"
    >
      <X v-if="isMenuOpen" :size="24" />
      <Menu v-else :size="24" />
    </button>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
      <div class="flex flex-col p-6 space-y-4">
        <RouterLink to="/" @click="closeMenu" class="text-gray-700 hover:text-gray-600 transition-colors">Home</RouterLink>
        <a href="#features" @click="closeMenu" class="text-gray-700 hover:text-gray-600 transition-colors">Features</a>
        <a href="#pricing" @click="closeMenu" class="text-gray-700 hover:text-gray-600 transition-colors">Pricing</a>
        <a href="#contact" @click="closeMenu" class="text-gray-700 hover:text-gray-600 transition-colors">Contact</a>
        <div class="border-t pt-4 space-y-3">
          <RouterLink to="/auth/login" @click="closeMenu" class="block text-gray-700 hover:text-gray-600 font-medium transition-colors">Login</RouterLink>
          <RouterLink
            to="/auth/signup"
            @click="closeMenu"
            class="block bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold shadow text-center transition-colors"
          >
            Get Started
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>