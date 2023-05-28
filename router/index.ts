import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  },
  {
    path: "/recipes",
    name: "recipes",
    component: () =>
      import(/* webpackChunkName: "recipes" */ "../views/RecipesView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.name !== "home" && !token) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
