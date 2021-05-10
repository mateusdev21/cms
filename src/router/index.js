import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/",
  },
  {
    path: "/",
    name: "home",
    redirect: "/dashboard",
    component: () => import(/* webpackChunkName */ "../views/Home"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          text: "Dashboard",
          breadcrumbs: [{ name: "home", text: "Home" }],
        },
        component: () =>
          import(/* webpackChunkName */ "../views/Home/Dashboard"),
      },

      // MASTER DATA MENU

      {
        path: "/master-data/movies-list/:tab",
        name: "movies-list",
        meta: {
          text: "Movies List",
          breadcrumbs: [
            { name: "home", text: "Home" },
            { name: "master-data", text: "Master Data" },
          ],
        },
        component: () =>
          import(/* webpackChunkName */ "../views/Home/MasterData/MoviesList"),
      },

      // UI TESTING PAGE
      {
        path: "/test-components",
        name: "test-components",
        meta: {
          text: "Test Components",
          breadcrumbs: [{ name: "home", text: "Home" }],
        },
        component: () =>
          import(/*webpackChunkName */ "../views/Home/TestComponent"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
