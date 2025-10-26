<script setup>
import { Search } from 'lucide-vue-next';

const model = defineModel();
</script>

<template>
  <div class="flex-1 relative">
    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      v-model="model"
      type="text"
      placeholder="Search tickets..."
      class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
    />
  </div>
</template>