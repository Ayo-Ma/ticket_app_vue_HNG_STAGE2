<script setup>
defineProps({
  label: String,
  value: String,
});

const emit = defineEmits(['update:value']);
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>
    <select
      :value="value"
      @change="emit('update:value', $event.target.value)"
      class="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
    >
      <option value="open">Open</option>
      <option value="in_progress">In Progress</option>
      <option value="closed">Closed</option>
    </select>
  </div>
</template>