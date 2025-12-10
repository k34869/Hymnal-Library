<template>
  <div class="container">
    <mdui-list>
      <mdui-list-item @click="promptAdd">
        <div slot="custom" class="add">
          <mdui-icon name='add' class="icon"></mdui-icon>
          <div class="name">新建收藏夹</div>
        </div>
      </mdui-list-item>
      <mdui-list-item v-for="e in data" @click="addToFavorite(item, e.name)">{{ e.name }}</mdui-list-item>
    </mdui-list>
  </div>
</template>

<script setup>
import 'mdui/components/list.js';
import 'mdui/components/list-item.js';
import { dialogStore } from '~/stores/dialog';
import { useFavorites } from '~/stores/favorites';

defineProps({
  data: Array,
  item: Object
})

const favoritesStore = useFavorites()
const { addItem, promptAdd } = favoritesStore

const addToFavorite = (item, name) => {
  addItem(item, name)
  dialogStore.close()
}
</script>

<style scoped>
.container {
  .add {
    @apply flex justify-start items-center p-3;

    .icon {
      color: rgb(var(--mdui-color-primary));
    }

    .name {
      margin-left: 8px;
      transform: translateY(-1px);
      color: rgb(var(--mdui-color-on-surface-variant));
    }
  }
}
</style>