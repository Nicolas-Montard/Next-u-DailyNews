import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddFeedView from '@/views/AddFeedView.vue'
import ShowFeedView from '@/views/ShowFeedView.vue'
import EditFeedViews from '@/views/EditFeedViews.vue'
import PreferenceView from '@/views/PreferenceView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/addfeed',
      name: 'addFeed',
      component: AddFeedView,
    },
    {
      path: '/feed/:id',
      name: 'showFeed',
      component: ShowFeedView,
    },
    {
      path: '/editfeed/:id',
      name: 'editFeed',
      component: EditFeedViews,
    },
    {
      path: '/preferences',
      name: 'preferences',
      component: PreferenceView,
    },
    {
      path: '/notfound',
      name: 'notFound',
      component: NotFoundView,
    }
  ],
})

export default router
