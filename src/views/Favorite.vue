<template>
  <div class="favorite">
    <div class="favorite-header">
      <div class="title font-bold-200">收藏夹</div>
      <div class="toolbar">
        <mdui-button-icon icon="queue" class="icon" @click="promptAdd"></mdui-button-icon>
      </div>
    </div>
    <fs-list :data="favorites" />
  </div>
</template>

<script setup>
import FsList from '~/components/FsList.vue';
import { storeToRefs } from 'pinia';
import { useFavorites } from '~/stores/favorites';
import { useSaveScrollPosition } from '~/hooks/useSaveScrollPosition';

const favoritesStore = useFavorites()
const { promptAdd } = favoritesStore
const { favorites } = storeToRefs(favoritesStore)

useSaveScrollPosition()
</script>

<style scoped>
.favorite {
  @apply relative left-0 right-0 m-auto;
  max-width: 760px;

  .favorite-header {
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
        margin-left: 10px;
      }
    }
  }
}
</style>