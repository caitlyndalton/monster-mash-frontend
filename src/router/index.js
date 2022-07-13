import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CampaignsIndex from "../views/CampaignsIndex.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import CreatureView from "../views/CreatureView";
import ItemView from "../views/ItemView";
import NpcView from "../views/NpcView";
import LogoutView from "../views/LogoutView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/campaigns",
    name: "campaigns-index",
    component: CampaignsIndex,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/creatures",
    name: "creature-view",
    component: CreatureView,
  },
  {
    path: "/items",
    name: "item-view",
    component: ItemView,
  },
  {
    path: "/npcs",
    name: "npc-view",
    component: NpcView,
  },
  {
    path: "/logout",
    name: "logout-view",
    component: LogoutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
