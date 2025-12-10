<template>
  <div class="favorite-detail">
    <div class="favorite-header">
      <mdui-button-icon icon="arrow_back" class="icon" @click="$router.back"></mdui-button-icon>
      <div class="title font-bold-200">收藏夹 - {{ $route.params.name }}({{ fsList.list.length }})</div>
    </div>
    <fs-list :data="fsList" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import 'mdui/components/button-icon.js';
import FsList from '~/components/FsList.vue';
import { useFavorites } from '~/stores/favorites';
import { useSaveScrollPosition } from '~/hooks/useSaveScrollPosition';

defineOptions({
  name: '收藏夹详情'
})

const route = useRoute()
const favoritesStore = useFavorites()
const { find } = favoritesStore
const { favorites, inFavoriteName } = storeToRefs(favoritesStore)

const fsList = reactive({
  type: 'map-favorite-item',
  list: []
})

const index = find(route.params.name)
inFavoriteName.value = route.params.name
fsList.list = favorites.value.list[index].list

useSaveScrollPosition()
</script>

<style scoped>
.favorite-detail {
  @apply relative left-0 right-0 m-auto;
  max-width: 760px;

  .favorite-header {
    @apply flex justify-start items-center;
    padding: 5px 10px;
    color: rgb(var(--mdui-color-on-surface-variant));

    .title {
      transform: translateY(-1px);
      margin-left: 10px;
      font-size: 20px;
    }
  }
}
</style>