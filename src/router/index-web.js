import { createRouter, createWebHashHistory } from "vue-router";
import ViewWeb from "~/views/MarkdownViewWeb.vue";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "view",
    component: ViewWeb,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
