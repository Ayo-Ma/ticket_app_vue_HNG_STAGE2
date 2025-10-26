<script setup>
import { AlertCircle, PlusCircle } from 'lucide-vue-next';

defineProps({
  showForm: Boolean,
});

const emit = defineEmits(['create']);
</script>

<template>
  <div class="col-span-full text-center py-16">
    <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
      <AlertCircle class="w-8 h-8 text-gray-400" />
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mb-2">
      {{ showForm ? 'No tickets found' : 'No tickets yet' }}
    </h3>
    <p class="text-gray-600 mb-6">
      {{ showForm
        ? 'Try adjusting your search or filter criteria'
        : 'Create your first ticket to get started' }}
    </p>
    <button
      v-if="!showForm"
      @click="emit('create')"
      class="inline-flex items-center gap-2 bg-linear-to-r from-gray-600 to-gray-600 hover:from-gray-700 hover:to-gray-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
    >
      <PlusCircle class="w-5 h-5" />
      Create New Ticket
    </button>
  </div>
</template>