<template>
  <router-view v-slot="{ Component }">
    <transition :name="$route.meta.transition || 'fade'" mode="out-in">
      <KeepAlive :exclude="['收藏夹详情', 'markdown视图', '设置']">
        <component :is="Component"></component>
      </KeepAlive>
    </transition>
  </router-view>
</template>

<script setup>

</script>
