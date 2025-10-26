<script setup>
defineProps({
  label: String,
  value: String,
  placeholder: String,
});

const emit = defineEmits(['update:value']);
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>
    <input
      :value="value"
      @input="emit('update:value', $event.target.value)"
      :placeholder="placeholder"
      class="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
    />
  </div>
</template>