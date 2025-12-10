<template>
  <mdui-navigation-bar :value="$route.name">
    <mdui-navigation-bar-item :value="item.name" :icon="item.icon" v-for="item in menus"
      @click="navigationTo({ name: item.name, path: item.path })" class="item">
      {{ item.name }}
    </mdui-navigation-bar-item>
  </mdui-navigation-bar>
</template>

<script setup>
import 'mdui/components/navigation-bar.js';
import 'mdui/components/navigation-bar-item.js';
import menus from '~/assets/json/menus.json'
import { useNavigationTo } from '~/hooks/useNavigationTo';

const { navigationTo } = useNavigationTo()
</script>

<style scoped>
mdui-navigation-bar {
  @apply relative overflow-hidden shadow-none;
  height: 5rem;
  background-color: rgb(var(--mdui-color-surface-container));

  .item::part(label) {
    color: rgb(var(--mdui-color-primary));
    font-weight: normal;
    -webkit-text-stroke: 0.02em currentColor;
  }
}
</style>