<template>
  <div class="container">
    <div class="markdown-content" v-show="isLoading" ref="markdown-content"></div>
    <div class="loading" v-if="!isLoading">
      <mdui-circular-progress></mdui-circular-progress>
    </div>
  </div>
</template>

<script setup>
import '~/assets/css/marked-web.css'
import { useRenderMarkdown } from '~/hooks/useRenderMarkdownWeb'

const { isLoading } = useRenderMarkdown('.container .markdown-content')
</script>

<style scoped>
.container {
  padding: 5px;

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
}
</style>