import Vue from "vue";
import VueRouter, { RouteConfig, Route, NavigationGuardNext } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import PageNotFound from "../views/PageNotFound.vue";
import MapViewer from "../views/MapViewer.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/view-map",
    name: "Map Viewer",
    component: MapViewer,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Not Found",
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  const title = to.name as string;
  if (title) {
    document.title = `Releaf Visor | ${title}`;
  }

  if (to.meta?.guest || !to.meta?.requiresAuth) {
    next();
    return;
  }

  const tokenName = process.env.VUE_APP_TOKEN_NAME;
  if (!localStorage.getItem(tokenName)) {
    next({
      path: "/login",
      query: { nextUrl: to.fullPath },
    });
    return;
  }

  next();
  return;
});

export default router;
