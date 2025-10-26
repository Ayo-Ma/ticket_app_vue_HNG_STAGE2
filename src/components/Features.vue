<script setup>
import { Shield, CreditCard, BarChart3 } from 'lucide-vue-next';

const features = [
  {
    icon: Shield,
    title: "Secure Access",
    desc: "Your data and tickets are protected with top-tier encryption and authentication.",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    desc: "Seamless payment integration lets users pay instantly with confidence.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Track event sales, revenue, and attendance in a beautiful dashboard.",
  },
];
</script>

<template>
  <section id="features" class="py-20 px-6 bg-white text-center">
    <h2 class="text-4xl font-bold text-gray-800 mb-4">
      Why People Love <span class="text-gray-600">TicketApp</span>
    </h2>
    <p class="text-gray-600 mb-12">
      We combine beautiful design, performance, and functionality to create something special.
    </p>

    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div
        v-for="(f, i) in features"
        :key="i"
        class="p-8 rounded-2xl bg-white border transition-all hover:scale-105"
      >
        <div class="flex justify-center mb-4">
          <component :is="f.icon" class="w-10 h-10 text-gray-600" />
        </div>
        <h3 class="text-xl font-semibold mb-2">{{ f.title }}</h3>
        <p class="text-gray-600">{{ f.desc }}</p>
      </div>
    </div>
  </section>
</template>