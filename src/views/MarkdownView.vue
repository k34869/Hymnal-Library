<template>
  <div class="container">
    <div class="header">
      <mdui-button-icon icon='arrow_back' @click="$router.back"></mdui-button-icon>
      <span class="title">{{ directory }}</span>
      <mdui-dropdown>
        <mdui-button-icon slot="trigger" icon="more_vert" class="more"></mdui-button-icon>
        <mdui-menu>
          <mdui-menu-item @click="share">分享</mdui-menu-item>
          <mdui-menu-item @click="promptAddItem(currentOpen.data)">添加到收藏夹</mdui-menu-item>
        </mdui-menu>
      </mdui-dropdown>
    </div>
    <div class="markdown-content" v-show="isLoading"></div>
    <div class="loading" v-if="!isLoading">
      <mdui-circular-progress></mdui-circular-progress>
    </div>
  </div>
</template>

<script setup>
import '~/assets/css/marked.css'
import 'mdui/components/button-icon.js';
import { Share } from '@capacitor/share'
import { useRenderMarkdown } from '~/hooks/useRenderMarkdown'
import { useFavorites } from '~/stores/favorites';
import { currentOpen } from '~/stores/currentOpen';

defineOptions({
  name: 'markdown视图'
})

const favoritesStore = useFavorites()
const { promptAddItem } = favoritesStore
const { isLoading, directory, title, pathString } = useRenderMarkdown('.container .markdown-content')

const share = () => {
  Share.share({
    title: title.value,
    text: title.value,
    url: `https://hymnal.timeic.top/#/${encodeURI(pathString.value)}`
  })
}
</script>

<style scoped>
.header {
  @apply w-screen fixed flex justify-between items-center;
  top: 0;
  padding: calc(var(--safe-area-inset-top) + 5px) 8px 5px 8px;
  box-shadow: var(--mdui-elevation-level2);
  background-color: rgb(var(--mdui-color-surface));
  z-index: 1;
}

.markdown-content {
  @apply relative left-0 right-0 m-auto;
  padding: calc(var(--safe-area-inset-top) + 30px) 8px var(--safe-area-inset-bottom) 8px;
  max-width: 760px;
  user-select: text;
}

.loading {
  padding: 120px 0;
  text-align: center;
}
</style>