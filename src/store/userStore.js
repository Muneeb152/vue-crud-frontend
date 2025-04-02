import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      try {
        // const response = await axios.get('https://mdn-dev.hitek.ai/api/users/list', {
        //     headers: {
        //       'Authorization': 'Bearer 19|CfHkbbYD0Bsgd5NRSZAiWAfKy3h5dozHOEYCcM4d08196276' // Ensure 'Bearer' prefix if needed
        //     }
        //   });
        const response = await axios.get('http://127.0.0.1:8000/api/users/');
        this.users = response.data.Users;    
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async addUser(userData) {
      try {
        const response = await axios.post('http://localhost:8000/api/users-create', userData);
        this.users.push(response.data);
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    async updateUser(userId, userData) {
      try {
        const response = await axios.put(`http://localhost:8000/api/users/${userId}`, userData);
        const index = this.users.findIndex(user => user.id === userId);
        if (index !== -1) {
          this.users[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    async deleteUser(userId) {
        try {
          await axios.delete(`http://localhost:8000/api/users/${userId}`);
          this.users = this.users.filter(user => user.id !== userId);
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
  }
});
