<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useNotifications } from '../stores/useNotifications';
import Footer from '../components/Footer.vue';
const authStore = useAuthStore();
const router = useRouter();
const { showSuccess, showError } = useNotifications();

const email = ref('');
const password = ref('');

const handleSubmit = async (e) => {
  e.preventDefault();
  const res = authStore.login(email.value, password.value);
  if (res.error) {
    await showError(res.error);
  } else {
    await showSuccess('Login successful!');
    router.push('/dashboard');
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <form
      @submit="handleSubmit"
      class="bg-white p-8 rounded-2xl shadow-md w-96"
    >
      <h2 class="text-2xl font-semibold mb-6 text-center">Log In</h2>
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
      <button
        type="submit"
        class="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800"
      >
        Log In
      </button>
      <p class="text-center text-sm mt-4">
        Don't have an account?
        <RouterLink to="/auth/signup" class="text-gray-600 hover:underline">
          Sign up
        </RouterLink>
      </p>
    </form>
  </div>
  <Footer/>
</template>