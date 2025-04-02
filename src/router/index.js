import { createRouter, createWebHashHistory } from 'vue-router'
import UserEditView from '../views/UserEditView.vue';
import UserTable from '../components/UserTable.vue';

const routes = [
  { path: '/', component: UserTable },
  { path: '/add-user', component: UserEditView },
  { path: '/edit/:id', component: UserEditView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
