<template>
  <div class="top-bar">
    <div class="app-logo">
      <img :src="'./resources/logo/logo.png'" />
    </div>
    <div class="app-name font-bolder">{{ appInfo.name }}</div>
    <div class="icons">
      <mdui-button-icon icon="settings" @click="$router.push('/settings')"></mdui-button-icon>
    </div>
  </div>
</template>

<script setup>
import 'mdui/components/button-icon.js';
import { appInfo } from '~/stores/appInfo.js';
</script>

<style scoped>
.top-bar {
  @apply flex justify-between items-center overflow-hidden;
  height: 60px;
  padding: 0 10px;
  transition: all 0.1s ease-in;

  .app-logo {
    width: 40px;
    height: 40px;

    img {
      @apply w-full h-full;
      border-radius: 50%;
    }
  }

  .app-name {
    color: rgb(var(--mdui-color-on-surface-variant));
  }
}
</style>