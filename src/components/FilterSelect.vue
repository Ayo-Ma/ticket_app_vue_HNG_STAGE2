<script setup>
import { Filter } from 'lucide-vue-next';

const model = defineModel();
</script>

<template>
  <div class="flex items-center gap-2">
    <Filter class="w-5 h-5 text-gray-500" />
    <select
      v-model="model"
      class="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
    >
      <option value="all">All Status</option>
      <option value="open">Open</option>
      <option value="in_progress">In Progress</option>
      <option value="closed">Closed</option>
    </select>
  </div>
</template>