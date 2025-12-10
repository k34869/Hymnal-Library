<template>
  <div class="path-navigation" ref="path-navigation">
    <mdui-chip @click="navigationTo(0)">🚩</mdui-chip>
    <template v-for="(path, index) in pathArray">
      <mdui-icon name='arrow_forward_ios' class="path-sep"></mdui-icon>
      <mdui-chip @click="navigationTo(index + 1)">
        {{ path }}
      </mdui-chip>
    </template>
  </div>
</template>

<script setup>
import 'mdui/components/chip.js'
import { toRefs, onActivated, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import { stackHistory } from '~/stores/stackLibrary'

const props = defineProps({
  pathArray: {
    type: Array,
    default: []
  }
})

const router = useRouter()
const { pathArray } = toRefs(props)
const $pageNavigation = useTemplateRef('path-navigation')

const navigationTo = (navNum) => {
  if (pathArray.value.length !== navNum) {
    const backNum = (pathArray.value.length) - navNum
    stackHistory.splice(0, backNum - 1)
    router.go(-backNum)
  }
}

onActivated(() => {
  $pageNavigation.value.scrollTo({ left: $pageNavigation.value.scrollWidth })
})
</script>

<style scoped>
.path-navigation {
  @apply flex items-center overflow-x-scroll font-bold w-full;
  position: sticky;
  top: var(--safe-area-inset-top);
  background-color: rgb(var(--mdui-color-surface));
  font-size: 22px;
  transform: translateY(calc(0px - var(--safe-area-inset-top)));
  padding: calc(var(--safe-area-inset-top) + 5px) 8px 5px 8px;
  z-index: 1;

  mdui-chip {
    font-weight: bold !important;
    border-width: 2px;
  }

  mdui-chip:last-of-type {
    color: rgb(var(--mdui-color-primary));
    border-color: rgb(var(--mdui-color-primary));
  }

  .path-sep {
    font-size: 17px;
    font-weight: bold;
    margin: 2px 5px;
    opacity: 0.6;
  }
}
</style>