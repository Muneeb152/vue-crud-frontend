<template>
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1>User List</h1>
        <router-link to="/add-user">
          <button class="btn btn-success">Add User</button>
        </router-link>
      </div>
  
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userStore.users" :key="user.id">
            <td>{{ user.name || 'N/A' }}</td>
            <td>{{ user.email || 'N/A' }}</td>
            <td>{{ user.phone || 'N/A' }}</td>
            <td>
              <router-link :to="`/edit/${user.id}`">
                <button class="btn btn-primary me-2">Edit</button>
              </router-link>
              <button class="btn btn-danger" @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useUserStore } from '../store/userStore';
  
  const userStore = useUserStore();
  
  onMounted(() => {
    userStore.fetchUsers();
  });

  const deleteUser = async (userId) => {
  if (confirm('Are you sure you want to delete this user?')) {
    await userStore.deleteUser(userId);
  }
};
  </script>
  