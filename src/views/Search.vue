<template>
  <div class="container">
    <div class="search-from">
      <Input v-model="queryKey" @submit="updateDatabase" :disabled="!isInit" />
    </div>
    <div class="search-main">
      <div class="init" v-if="!isInit">
        <div class="loading">
          <mdui-circular-progress></mdui-circular-progress>
        </div>
        索引初始化中...
      </div>
      <template v-else>
        <FsList :data="fsList" :loading="isLoading" v-if="queryKey" />
        <div class="random-rec" v-else>
          <mdui-chip v-for="e in randomRec" @click="openMarkdown(database[e])">{{
            database[e].name }}</mdui-chip>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import 'mdui/components/chip.js';
import 'mdui/components/tooltip.js';
import Input from '~/components/Input.vue';
import FsList from '~/components/FsList.vue';
import { ref, watch, onActivated, onDeactivated } from 'vue'
import { useRouter } from 'vue-router';
import { useSearch, database } from '~/hooks/useSearch';
import { uniqueRandoms } from '~/utils/utils';
import { useSaveScrollPosition } from '~/hooks/useSaveScrollPosition';
import { useRecent } from '~/stores/recent';
import { currentOpen } from '~/stores/currentOpen';

const router = useRouter()
const { search, isInit, updateDatabase, fristInitPromise } = useSearch()
const recentStore = useRecent()
let randomRec = ref([])
fristInitPromise.then((data) => {
  randomRec.value = uniqueRandoms(0, data.length, 15)
})

const openMarkdown = (item) => {
  recentStore.add({
    path: item.path,
    type: item.type,
    name: item.name,
    description: item.description
  })
  currentOpen.data = {
    path: item.path,
    name: item.name,
    description: item.description
  }
  router.push(`/markdown-view?path=${item.path}`)
}

const queryKey = ref('')
const isLoading = ref(false)
const fsList = ref({
  type: 'map-default',
  list: null
})

useSaveScrollPosition()

let stop
onActivated(() => {
  stop = watch(() => queryKey.value, (value) => {
    isLoading.value = false
    setTimeout(() => {
      const results = search(value)
      fsList.value.list = results
      isLoading.value = true
    }, 0);
  })
})

onDeactivated(() => {
  stop()
})
</script>

<style scoped>
.container {
  @apply relative left-0 right-0 m-auto;
  max-width: 760px;

  .search-from {
    @apply w-full;
    position: sticky;
    top: var(--safe-area-inset-top);
    background-color: rgb(var(--mdui-color-surface));
    transform: translateY(calc(0px - var(--safe-area-inset-top)));
    padding: calc(var(--safe-area-inset-top) + 10px) 0 5px 0;
    z-index: 1;
  }

  .search-main {
    position: relative;
    top: calc(0px - var(--safe-area-inset-top));

    .init {
      padding: 48px 0;
      text-align: center;
      color: rgb(var(--mdui-color-on-surface-variant));

      .loading {
        padding: 10px 0;
      }
    }

    .random-rec {
      @apply flex justify-center items-center;
      flex-wrap: wrap;
      margin-top: 25px;

      mdui-chip {
        margin: 5px;
        font-weight: bold !important;
        border-width: 2px;
      }
    }
  }
}
</style>