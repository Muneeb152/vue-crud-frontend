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
          <tr v-for="user in paginatedUsers" :key="user.id">
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
  
      <!-- Pagination Controls -->
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="prevPage">Previous</button>
          </li>
          <li 
            v-for="page in totalPages" 
            :key="page" 
            class="page-item" 
            :class="{ active: page === currentPage }"
          >
            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="nextPage">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useUserStore } from '../store/userStore';
  
  const userStore = useUserStore();
  const currentPage = ref(1);
  const itemsPerPage = 5; 
  
  onMounted(() => {
    userStore.fetchUsers();
  });
  
  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return userStore.users.slice(start, start + itemsPerPage);
  });
  
  const totalPages = computed(() => {
    return Math.ceil(userStore.users.length / itemsPerPage);
  });
  
  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };
  
  const goToPage = (page) => {
    currentPage.value = page;
  };
  
  const deleteUser = async (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await userStore.deleteUser(userId);
    }
  };
  </script>
  