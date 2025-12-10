<template>
  <div class="side-bar">
    <div class="app">
      <div class="app-logo">
        <img :src="'./resources/logo/logo.png'" />
      </div>
      <div class="app-name font-bolder">{{ appInfo.name }}</div>
    </div>
    <mdui-list>
      <mdui-list-item :icon="item.icon" v-for="item in menus" :active="item.name === $route.name"
        @click="navigationTo({ name: item.name, path: item.path })">{{ item.name }}</mdui-list-item>
      <mdui-list-item icon="settings" :active="$route.name === '设置'"
        @click="$router.push('/settings')">设置</mdui-list-item>
    </mdui-list>
  </div>
</template>

<script setup>
import 'mdui/components/list.js';
import 'mdui/components/list-item.js';
import menus from '~/assets/json/menus.json'
import { appInfo } from '~/stores/appInfo.js';
import { useNavigationTo } from '~/hooks/useNavigationTo';

const { navigationTo } = useNavigationTo()
</script>

<style scoped>
.side-bar {
  .app {
    @apply flex items-center justify-center;

    .app-logo {
      width: 60px;
      height: 60px;
      padding: 10px;

      img {
        @apply w-full h-full;
        border-radius: 50%;
      }
    }

    .app-name {
      color: rgb(var(--mdui-color-on-surface-variant));
    }
  }
}
</style>