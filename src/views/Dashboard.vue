<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { getTickets } from '../utils/ticketUtils';
import {
  Ticket,
  CheckCircle2,
  Clock,
  AlertCircle,
  LogOut,
  Plus,
  ArrowRight,
  Activity,
} from 'lucide-vue-next';

const authStore = useAuthStore();
const tickets = ref([]);

onMounted(() => {
  tickets.value = getTickets();
});


const total = computed(() => tickets.value.length);
const open = computed(() => tickets.value.filter((t) => t.status === 'open').length);
const resolved = computed(() => tickets.value.filter((t) => t.status === 'closed').length);
const inProgress = computed(() => tickets.value.filter((t) => t.status === 'in-progress').length);
const recentTickets = computed(() => tickets.value.slice(0, 5));
const resolutionRate = computed(() => 
  total.value > 0 ? ((resolved.value / total.value) * 100).toFixed(1) : 0
);
const activeTicketsPercentage = computed(() =>
  total.value > 0 ? ((open.value / total.value) * 100).toFixed(0) : 0
);

const getStatusClass = (status) => {
  const classes = {
    'open': 'bg-orange-500',
    'in-progress': 'bg-yellow-500',
    'closed': 'bg-green-500'
  };
  return classes[status] || 'bg-gray-500';
};

const getStatusBadgeClass = (status) => {
  const classes = {
    'open': 'bg-orange-100 text-orange-700',
    'in-progress': 'bg-yellow-100 text-yellow-700',
    'closed': 'bg-green-100 text-green-700'
  };
  return classes[status] || 'bg-gray-100 text-gray-700';
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <nav class="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-8">
            <h1 class="text-2xl font-bold bg-linear-to-r from-gray-600 to-gray-600 bg-clip-text text-transparent">
              TicketApp
            </h1>
          </div>

          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-semibold text-gray-700">
                  {{ authStore.user.email }}
                </p>
                <p class="text-xs text-gray-500">Administrator</p>
              </div>
              <div class="w-10 h-10 bg-linear-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
                {{ authStore.user.email.charAt(0) }}
              </div>
            </div>
            <button
              @click="authStore.logout"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-6 py-8">
  
      <div class="mb-8">
        <h2 class="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {{ authStore.user.email.split(' ')[0] }} 👋
        </h2>
        <p class="text-gray-600">
          Here's what's happening with your tickets today.
        </p>
      </div>

  
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div class="bg-white rounded-2xl p-6 border border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 bg-gray-100 rounded-xl">
              <Ticket class="w-6 h-6 text-gray-600" />
            </div>
            <span class="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +12%
            </span>
          </div>
          <h3 class="text-gray-600 text-sm font-medium mb-1">
            Total Tickets
          </h3>
          <p class="text-3xl font-bold text-gray-900">{{ total }}</p>
        </div>

   
        <div class="bg-white rounded-2xl p-6 border border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 bg-orange-100 rounded-xl">
              <AlertCircle class="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h3 class="text-gray-600 text-sm font-medium mb-1">
            Open Tickets
          </h3>
          <p class="text-3xl font-bold text-gray-900">{{ open }}</p>
        </div>

  
        <div class="bg-white rounded-2xl p-6 border border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 bg-yellow-100 rounded-xl">
              <Clock class="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <h3 class="text-gray-600 text-sm font-medium mb-1">
            In Progress
          </h3>
          <p class="text-3xl font-bold text-gray-900">{{ inProgress }}</p>
        </div>


        <div class="bg-white rounded-2xl p-6 border border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 bg-green-100 rounded-xl">
              <CheckCircle2 class="w-6 h-6 text-green-600" />
            </div>
            <span class="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              {{ resolutionRate }}%
            </span>
          </div>
          <h3 class="text-gray-600 text-sm font-medium mb-1">Resolved</h3>
          <p class="text-3xl font-bold text-gray-900">{{ resolved }}</p>
        </div>
      </div>

   
      <div class="grid lg:grid-cols-3 gap-6">

        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="p-6 border-b border-gray-100">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-bold text-gray-900">
                  Recent Tickets
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                  Latest support requests
                </p>
              </div>
              <RouterLink
                to="/tickets"
                class="text-gray-600 hover:text-gray-700 font-medium text-sm flex items-center space-x-1"
              >
                <span>View all</span>
                <ArrowRight class="w-4 h-4" />
              </RouterLink>
            </div>
          </div>
          <div class="p-6">
            <div v-if="recentTickets.length > 0" class="space-y-4">
              <div
                v-for="(ticket, index) in recentTickets"
                :key="ticket.id || index"
                class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div class="flex items-center space-x-4">
                  <div
                    class="w-2 h-2 rounded-full"
                    :class="getStatusClass(ticket.status)"
                  ></div>
                  <div>
                    <p class="font-semibold text-gray-900">
                      {{ ticket.title || 'Untitled Ticket' }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ ticket.description?.substring(0, 50) }}...
                    </p>
                  </div>
                </div>
                <span
                  class="text-xs font-semibold px-3 py-1 rounded-full"
                  :class="getStatusBadgeClass(ticket.status)"
                >
                  {{ ticket.status || 'unknown' }}
                </span>
              </div>
            </div>
            <div v-else class="text-center py-12">
              <Ticket class="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p class="text-gray-500">No tickets yet</p>
            </div>
          </div>
        </div>

 
        <div class="space-y-6">
    
          <div class="bg-gray-800 rounded-2xl p-6 text-white shadow-lg">
            <h3 class="text-lg font-bold mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <RouterLink
                to="/tickets"
                class="flex items-center justify-between p-4 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-colors"
              >
                <span class="font-medium">Manage Tickets</span>
                <ArrowRight class="w-5 h-5" />
              </RouterLink>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div class="flex items-center space-x-3 mb-4">
              <div class="p-2 bg-slate-100 rounded-lg">
                <Activity class="w-5 h-5 text-slate-600" />
              </div>
              <h3 class="font-bold text-gray-900">Performance</h3>
            </div>
            <div class="space-y-4">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-600">
                    Resolution Rate
                  </span>
                  <span class="text-sm font-bold text-gray-900">
                    {{ resolutionRate }}%
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-linear-to-r from-slate-600 to-slate-800 h-2 rounded-full transition-all duration-500"
                    :style="{ width: `${resolutionRate}%` }"
                  ></div>
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-600">
                    Active Tickets
                  </span>
                  <span class="text-sm font-bold text-gray-900">
                    {{ activeTicketsPercentage }}%
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-linear-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-500"
                    :style="{ width: `${activeTicketsPercentage}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>