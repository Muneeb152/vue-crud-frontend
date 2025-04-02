<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../store/userStore';
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const user = ref({ name: '', email: '', phone: '' });

onMounted(async () => {
  if (route.params.id) {
    const existingUser = userStore.users.find(u => u.id == route.params.id);
    if (existingUser) {
      user.value = { ...existingUser };
    } else {
      await userStore.fetchUsers();
      const updatedUser = userStore.users.find(u => u.id == route.params.id);
      if (updatedUser) 
      {
        user.value = { ...updatedUser };
    }
    else {
        router.push('/');

    }
    }
  }
});

const handleSubmit = async () => {
  if (route.params.id) {
    await userStore.updateUser(route.params.id, user.value);
  } else {
    await userStore.addUser(user.value);
  }
  router.push('/');
};
</script>

<template>
  <div class="container mt-4">
    <h2>{{ route.params.id ? 'Edit' : 'Add' }} User</h2>
    <form @submit.prevent="handleSubmit" class="border p-3 bg-light rounded">
      <div class="mb-3">
        <label class="form-label">Name:</label>
        <input v-model="user.name" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Email:</label>
        <input v-model="user.email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Phone:</label>
        <input v-model="user.phone" type="text" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ route.params.id ? 'Update' : 'Create' }} User
      </button>
    </form>
  </div>
</template>
