import { createRouter, createWebHistory } from "vue-router";

const routes = [

  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/signup.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },



];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;