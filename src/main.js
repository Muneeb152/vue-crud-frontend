import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'; // Import Pinia
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap 

const pinia = createPinia(); // Create Pinia instance

// createApp(App).use(router).mount('#app')

const app = createApp(App);
app.use(pinia); // Use Pinia BEFORE calling the store
app.use(router);
app.mount('#app');