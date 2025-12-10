<template>
  <div class="recent">
    <div class="recent-header">
      <div class="title font-bold-200">最近浏览({{ list.length }})</div>
      <div class="toolbar">
        <mdui-button-icon icon="delete_forever" class="icon" @click="clear"></mdui-button-icon>
      </div>
    </div>
    <fs-list :data="data" />
  </div>
</template>

<script setup>
import 'mdui/components/button-icon.js';
import FsList from '~/components/FsList.vue';
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRecent } from '~/stores/recent';
import { useSaveScrollPosition } from '~/hooks/useSaveScrollPosition';

const recentStore = useRecent()
const { list } = storeToRefs(recentStore)
const data = ref({
  list
})

const clear = () => {
  if (list.value.length > 0) {
    const isClear = confirm("是否删除所有浏览历史?")
    if (isClear) {
      recentStore.clear()
    }
  }
}

useSaveScrollPosition()
</script>

<style scoped>
.recent {
  @apply relative left-0 right-0 m-auto;
  max-width: 760px;

  .recent-header {
    @apply flex justify-between items-center;
    padding: 5px 15px;
    color: rgb(var(--mdui-color-on-surface-variant));

    .title {
      font-size: 20px;
    }

    .toolbar {
      @apply flex items-center;

      .icon {
        font-size: 26px;
      }
    }
  }
}
</style>