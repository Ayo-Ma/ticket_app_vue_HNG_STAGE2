<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import {
  Edit,
  Trash2,
  PlusCircle,
  ChevronLeft,
  Search,
  Filter,
  AlertCircle,
  Clock,
  CheckCircle2,
  X,
} from 'lucide-vue-next';
import { getTickets, saveTickets } from '../utils/ticketUtils';
import { useNotifications } from '../stores/useNotifications';

import InputField from '../components/InputField.vue';
import SelectField from '../components/SelectField.vue';
import SearchBar from '../components/SearchBar.vue';
import FilterSelect from '../components/FilterSelect.vue';
import EmptyState from '../components/EmptyState.vue';

const { showAlert, showConfirm, showSuccess, showError, showWarning } = useNotifications();

const tickets = ref([]);
const form = ref({ title: '', description: '', status: 'open' });
const editing = ref(null);
const searchQuery = ref('');
const filterStatus = ref('all');
const showForm = ref(false);

onMounted(() => {
  tickets.value = getTickets();
});

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validation
  if (!form.value.title.trim()) {
    await showError('Validation Error', 'Title is required');
    return;
  }

  if (!['open', 'in_progress', 'closed'].includes(form.value.status)) {
    await showError('Validation Error', 'Invalid status');
    return;
  }

  try {
    const updated = [...tickets.value];
    
    if (editing.value) {
      const idx = updated.findIndex((t) => t.id === editing.value);
      updated[idx] = { ...updated[idx], ...form.value };
      await showSuccess('Success!', 'Ticket updated successfully!');
    } else {
      updated.push({ id: Date.now(), ...form.value });
      await showSuccess('Success!', 'Ticket created successfully!');
    }

    saveTickets(updated);
    tickets.value = updated;
    resetForm();
  } catch (error) {
    await showError('Error', 'Something went wrong. Please try again.');
  }
};

const handleDelete = async (id) => {
  const ticketToDelete = tickets.value.find(t => t.id === id);
  
  const result = await showConfirm(
    'Delete Ticket?',
    `Are you sure you want to delete "${ticketToDelete.title}"? This action cannot be undone.`,
    'Yes, Delete It'
  );

  if (result.isConfirmed) {
    try {
      const updated = tickets.value.filter((t) => t.id !== id);
      saveTickets(updated);
      tickets.value = updated;
      await showSuccess('Deleted!', 'Ticket has been deleted successfully.');
    } catch (error) {
      await showError('Error', 'Failed to delete ticket. Please try again.');
    }
  }
};

const handleEdit = (ticket) => {
  form.value = { ...ticket };
  editing.value = ticket.id;
  showForm.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const resetForm = () => {
  form.value = { title: '', description: '', status: 'open' };
  editing.value = null;
  showForm.value = false;
};

const filteredTickets = computed(() => {
  return tickets.value.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesFilter =
      filterStatus.value === 'all' || ticket.status === filterStatus.value;
    return matchesSearch && matchesFilter;
  });
});

const getStatusIcon = (status) => {
  const icons = {
    open: AlertCircle,
    in_progress: Clock,
    closed: CheckCircle2,
  };
  return icons[status] || null;
};

const getStatusColor = (status) => {
  const colors = {
    open: 'bg-orange-50 text-orange-700 border-orange-100',
    in_progress: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    closed: 'bg-green-50 text-green-700 border-green-100',
  };
  return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
};
</script>

<template>
  <section class="max-w-5xl mx-auto px-6 py-8 mt-20 bg-whit rounded-3xl border border-gray-200 shadow-sm my-12">
    <!-- Header -->
    <div class="mb-8">
      <RouterLink
        to="/dashboard"
        class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-12 font-medium"
      >
        <ChevronLeft class="w-5 h-5" />
        Back to Dashboard
      </RouterLink>

      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">
            Ticket Management
          </h1>
          <p class="text-gray-600">
            Manage and track all your support tickets in one place
          </p>
        </div>

        <button
          @click="showForm = !showForm"
          class="mt-4 md:mt-0 inline-flex items-center gap-2 bg-gray-800 cursor-pointer hover:from-gray-700 hover:to-gray-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <PlusCircle class="w-5 h-5" />
          Create New Ticket
        </button>
      </div>
    </div>

    <!-- Form -->
    <div
      v-if="showForm"
      class="bg-white rounded-2xl p-6 mb-8 border border-gray-200 animate-slide-down"
    >
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
          <PlusCircle class="w-6 h-6 text-gray-700" />
          {{ editing ? 'Edit Ticket' : 'Create New Ticket' }}
        </h2>
        <button
          @click="resetForm"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X class="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <form @submit="handleSubmit" class="space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
          <InputField
            label="Title *"
            :value="form.title"
            @update:value="form.title = $event"
            placeholder="Enter ticket title"
          />
          <SelectField
            label="Status"
            :value="form.status"
            @update:value="form.status = $event"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            v-model="form.description"
            class="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            placeholder="Describe the ticket details..."
          />
        </div>

        <div class="flex gap-3">
          <button
            type="submit"
            class="flex-1 bg-linear-to-r from-gray-700 to-gray-600 hover:from-gray-700 hover:to-gray-700 text-white font-semibold rounded-lg px-6 py-3 transition-all shadow-md hover:shadow-lg"
          >
            {{ editing ? 'Update Ticket' : 'Create Ticket' }}
          </button>
          <button
            v-if="editing"
            type="button"
            @click="resetForm"
            class="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- Search and Filter -->
    <div class="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <SearchBar v-model="searchQuery" />
        <FilterSelect v-model="filterStatus" />
      </div>
    </div>

    <!-- Tickets Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <template v-if="filteredTickets.length > 0">
        <div
          v-for="(t, i) in filteredTickets"
          :key="t.id"
          class="bg-white rounded-2xl border border-gray-200 transition-all p-6 group animate-fade-in"
          :style="{ animationDelay: `${i * 0.05}s` }"
        >
          <div
            class="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-3"
            :class="getStatusColor(t.status)"
          >
            <component :is="getStatusIcon(t.status)" class="w-4 h-4" />
            {{ t.status.replace('_', ' ').toUpperCase() }}
          </div>

          <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {{ t.title }}
          </h3>
          <p class="text-sm text-gray-600 mb-4 line-clamp-3">
            {{ t.description || 'No description provided' }}
          </p>

          <div class="flex gap-3 pt-4 border-t border-gray-200">
            <button
              @click="handleEdit(t)"
              class="flex-1 flex items-center justify-center gap-2 text-gray-600 cursor-pointer px-4 py-2 rounded-lg transition-colors font-medium"
            >
              <Edit class="w-4 h-4" />
              Edit
            </button>
            <button
              @click="handleDelete(t.id)"
              class="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white cursor-pointer hover:text-red-400 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              <Trash2 class="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </template>
      <EmptyState v-else :show-form="showForm" @create="showForm = true" />
    </div>
  </section>
</template>

<style scoped>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-down {
  animation: slideDown 0.3s ease-out;
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>