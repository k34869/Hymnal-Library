import { createRouter, createWebHashHistory } from "vue-router";
import Library from "~/views/Library.vue";
import Recent from "~/views/Recent.vue";
import Favorite from "~/views/Favorite.vue";
import FavoriteDetail from "~/views/FavoriteDetail.vue";
import Search from "~/views/Search.vue";
import Navigation from "~/views/Navigation.vue";
import MarkdownView from "~/views/MarkdownView.vue";
import Settings from "~/views/Settings.vue";
import { App as NativeApp } from "@capacitor/app";
import { dialogStore } from "~/stores/dialog";

const routes = [
  {
    path: "/",
    redirect: "/library",
  },
  {
    path: "/library/:pathMatch(.*)*",
    name: "资料库",
    component: Library,
    meta: {
      transition: "fade2",
    },
  },
  {
    path: "/recent",
    name: "最近",
    component: Recent,
    meta: {
      transition: "fade2",
    },
  },
  {
    path: "/search",
    name: "搜索",
    component: Search,
    meta: {
      transition: "fade2",
    },
  },
  {
    path: "/navigation",
    name: "导航",
    component: Navigation,
    meta: {
      transition: "fade2",
    },
  },
  {
    path: "/favorite",
    name: "收藏",
    component: Favorite,
    meta: {
      transition: "fade2",
    },
  },
  {
    path: "/favorite-detail/:name",
    name: "收藏夹详情",
    component: FavoriteDetail,
    meta: {
      transition: "fade2",
    },
  },
  {
    path: "/markdown-view",
    name: "markdown视图",
    component: MarkdownView,
  },
  {
    path: "/settings",
    name: "设置",
    component: Settings,
    meta: {
      transition: "fade2",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }; // 清除页面切换时浏览器的默认滚动行为
  },
});

// 开启设备硬件返回功能
NativeApp.addListener("backButton", ({ canGoBack }) => {
  if (canGoBack) {
    if (dialogStore.isOpen) {
      dialogStore.close();
    } else {
      router.back();
    }
  } else {
    NativeApp.minimizeApp();
  }
});

export default router;
