import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenusView from '../views/MenusView.vue'
import ReviewView from '../views/ReviewView.vue'
import ReviewCompletedView from '../views/ReviewCompletedView.vue'
import AdminView from '../views/AdminView.vue'
import { useDateStore } from '../store/dateStore'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { 
    path: '/menus/:date', 
    name: 'menus', 
    component: MenusView,
    beforeEnter: (to, from, next) => {
      const dateStore = useDateStore()
      const expectedDate = dateStore.date
      const currentParam = to.params.date

      if (currentParam !== expectedDate) {
        next({ name: 'menus', params: { date: expectedDate }})
      } else {
        next()
      }
    }
  },
  { path: '/review/:date/:menuIndex', name: 'review', component: ReviewView },
  { path: '/review-completed', name: 'review-completed', component: ReviewCompletedView },
  { path: '/admin', name: 'admin', component: AdminView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(), // ✅ Use root path
  routes
})

export default router
