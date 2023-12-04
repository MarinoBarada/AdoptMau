import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import AddEditCatView from "@/views/AddEditCatView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/add-cat",
    name: "add-cat",
    component: AddEditCatView
  },
  {
    path: "/edit-cat/:id",
    name: "edit-cat",
    component: AddEditCatView
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  }
});

export default router;
