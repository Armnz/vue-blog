import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailsView from '../views/DetailsView.vue'
import CreateView from '../views/CreateView.vue'


const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/posts/:id',
    name: 'DetailsView',
    component: DetailsView,
    props: true
  },
  {
    path: '/create',
    name: 'CreateView',
    component: CreateView
  },
  {
    path: '/posts/edit/:id',
    name: 'EditPost',
    component: CreateView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router