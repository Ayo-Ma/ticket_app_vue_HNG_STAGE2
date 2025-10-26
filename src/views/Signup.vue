<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useNotifications } from '../stores/useNotifications';

const authStore = useAuthStore();
const router = useRouter();
const { showAlert, showSuccess, showError } = useNotifications();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email.value || !password.value) {
    await showError('All fields are required!');
    return;
  }

  if (password.value !== confirmPassword.value) {
    await showError('Passwords do not match!');
    return;
  }

  const res = authStore.signup(email.value, password.value);
  if (res.error) {
    await showError(res.error);
  } else {
    await showSuccess('Signup successful!');
    router.push('/auth/login');
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <form
      @submit="handleSubmit"
      class="bg-white p-8 rounded-2xl shadow-md w-96"
    >
      <h2 class="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

      <input
        v-model="email"
        class="w-full border p-2 mb-3 rounded"
        placeholder="Email"
      />

      <input
        v-model="password"
        type="password"
        class="w-full border p-2 mb-3 rounded"
        placeholder="Password"
      />

      <input
        v-model="confirmPassword"
        type="password"
        class="w-full border p-2 mb-3 rounded"
        placeholder="Confirm Password"
      />

      <button
        type="submit"
        class="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-800"
      >
        Sign Up
      </button>

      <p class="text-center text-sm mt-4">
        Already have an account?
        <RouterLink to="/auth/login" class="text-gray-600 hover:underline">
          Login
        </RouterLink>
      </p>
    </form>
  </div>
</template>