import { createRouter, createWebHistory } from "vue-router";
import Auth from "../components/Auth.vue";
import Signup from "../components/Signup.vue";
import Main from "../components/Main.vue";
import EditCategory from "../components/category/EditCategory.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: "/",
      name: "main",
      component: Main
    },
    {
        path: "/category/edit-category/:id",
        name: "edit-category",
        component: EditCategory
    }
  ]
})

export default router
