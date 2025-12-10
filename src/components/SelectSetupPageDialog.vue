<template>
  <div class="container">
    <mdui-menu selects="single" :value="setupPageName" class="select-setup-page-dialog-menu" v-once>
      <mdui-menu-item :value="pageName" v-for="pageName in pages" @click="changeSetupPage(pageName)">
        {{ pageName }}
      </mdui-menu-item>
    </mdui-menu>
  </div>
</template>

<script setup>
import 'mdui/components/menu.js';
import 'mdui/components/menu-item.js';
import { storeToRefs } from 'pinia'
import { dialogStore } from '~/stores/dialog';
import { useSettings } from '~/stores/settings';

const pages = [
  '资料库',
  '最近',
  '搜索',
  '导航',
  '收藏'
]

const { setupPageName } = storeToRefs(useSettings())

const changeSetupPage = (pageName) => {
  setupPageName.value = pageName
  dialogStore.close()
}
</script>
