<template>
  <div class="container">
    <path-navigation :path-array="pathArray" />
    <div class="library">
      <fs-list :data="paginationFslist" :loading="isLoading" />
    </div>
    <div class="fs-list-bottom-loading" v-show="isShowBottomLoading">
      <mdui-circular-progress></mdui-circular-progress>
    </div>
  </div>
</template>

<script setup>
import FsList from '~/components/FsList.vue';
import PathNavigation from '~/components/PathNavigation.vue';
import { useRouter } from 'vue-router';
import { useLoadFsList } from '~/hooks/useLoadFsList';
import { useSettings } from "~/stores/settings";
import { useSaveScrollPosition } from '~/hooks/useSaveScrollPosition';

const router = useRouter()
const { paginationFslist, isLoading, isShowBottomLoading, pathArray } = useLoadFsList()
const settingsStore = useSettings()

if (settingsStore.setupPageName !== '资料库') {
  router.push({
    name: settingsStore.setupPageName
  })
}

useSaveScrollPosition()
</script>

<style scoped>
.library {
  @apply relative left-0 right-0 m-auto;
  top: calc(0px - var(--safe-area-inset-top));
  max-width: 760px;
}

.fs-list-bottom-loading {
  text-align: center;
}
</style>