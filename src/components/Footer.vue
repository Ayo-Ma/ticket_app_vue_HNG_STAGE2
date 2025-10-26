<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-gray-900 text-gray-300 py-10 text-center">
    <p class="text-lg font-medium">
      © {{ currentYear }} TicketApp. All rights reserved.
    </p>
    <p class="text-sm text-gray-500 mt-2">
      Built with ❤️ by Asimiyu Abdulmaleek.
    </p>
  </footer>
</template>