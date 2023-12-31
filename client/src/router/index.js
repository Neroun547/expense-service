import { createRouter, createWebHistory } from "vue-router";
import Auth from "../components/auth/Auth.vue";
import Signup from "../components/signup/Signup.vue";
import Main from "../components/Main.vue";
import Category from "../components/category/Category.vue";
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
        path: "/category/:id",
        name: "category",
        component: Category
    },
    {
      path: "/category/settings/:id",
      name: "category-settings",
      component: EditCategory
    }
  ]
})

export default router
