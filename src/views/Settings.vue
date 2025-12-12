<template>
  <div class="container">
    <div class="settings-header">
      <mdui-button-icon icon="arrow_back" class="icon" @click="$router.back"></mdui-button-icon>
      <div class="title font-bold-200">设置</div>
    </div>

    <mdui-list>
      <mdui-list-item>
        <div slot="custom" class="item">
          <div class="start">
            <mdui-icon name='dark_mode' class="icon"></mdui-icon>
            <div class="name font-bold-200">夜间模式</div>
          </div>
          <mdui-switch @change="setDark($event, 'isDark')" :checked="isDark"></mdui-switch>
        </div>
      </mdui-list-item>

      <mdui-list-item>
        <div slot="custom" class="item">
          <div class="start">
            <mdui-icon name='dark_mode' class="icon"></mdui-icon>
            <div class="name font-bold-200">夜间模式跟随系统</div>
          </div>
          <mdui-switch @change="setDark($event, 'isDarkWithSystem')" :checked="isDarkWithSystem"></mdui-switch>
        </div>
      </mdui-list-item>

      <mdui-list-item>
        <div slot="custom" class="item">
          <div class="start">
            <mdui-icon name='smartphone' class="icon"></mdui-icon>
            <div class="name font-bold-200">屏幕常亮</div>
          </div>
          <mdui-switch @change="toggleScreenAlways" :checked="isScreenAlways"></mdui-switch>
        </div>
      </mdui-list-item>

      <mdui-list-item @click="openSelectSetupPage">
        <div slot="custom" class="item">
          <div class="start">
            <mdui-icon name='phonelink_setup' class="icon"></mdui-icon>
            <div class="name font-bold-200">启动页</div>
          </div>
          <div class="text">{{ setupPageName }}</div>
        </div>
      </mdui-list-item>

      <a href="https://t.me/+Jpqt5_HZNSNkZDY1">
        <mdui-list-item>
          <div slot="custom" class="item">
            <div class="start">
              <mdui-icon name='group_add' class="icon"></mdui-icon>
              <div class="name font-bold-200">TG交流群</div>
            </div>
          </div>
        </mdui-list-item>
      </a>

      <mdui-list-item @click="showAboutDialog">
        <div slot="custom" class="item">
          <div class="start">
            <mdui-icon name='account_box' class="icon"></mdui-icon>
            <div class="name font-bold-200">关于</div>
          </div>
        </div>
      </mdui-list-item>
    </mdui-list>
  </div>
</template>

<script setup>
import 'mdui/components/list.js';
import 'mdui/components/list-item.js';
import 'mdui/components/switch.js';
import AboutDialog from '~/components/AboutDialog.vue';
import SelectSetupPageDialog from '~/components/SelectSetupPageDialog.vue';
import { storeToRefs } from 'pinia'
import { useSettings } from '~/stores/settings';
import { dialogStore } from '~/stores/dialog';

defineOptions({
  name: '设置'
})

const settingsStore = useSettings()
const { isDark, isDarkWithSystem, isScreenAlways, setupPageName } = storeToRefs(settingsStore)

const setDark = (event, type) => {
  settingsStore[type] = event.target.checked
  settingsStore.setTheme()
}

const toggleScreenAlways = (event) => {
  isScreenAlways.value = event.target.checked
  settingsStore.setScreenAlways()
}

const openSelectSetupPage = () => {
  dialogStore.title = '选择启动页面?'
  dialogStore.open(SelectSetupPageDialog)
}

const showAboutDialog = () => {
  dialogStore.title = '关于诗歌库'
  dialogStore.open(AboutDialog)
}
</script>

<style scoped>
.container {
  @apply relative left-0 right-0 m-auto;
  max-width: 760px;

  .item {
    @apply flex justify-between items-center;
    height: 60px;
    padding: 10px 15px;
    color: rgb(var(--mdui-color-on-surface-variant));

    .start {
      @apply flex justify-start items-center;

      .icon {
        color: rgb(var(--mdui-color-primary));
      }

      .name {
        transform: translateY(-1px);
        margin-left: 10px;
      }
    }

    .text {
      margin-right: 5px;
      font-size: 15px;
    }
  }

  .settings-header {
    @apply flex justify-start items-center;
    padding: 8px 15px;
    color: rgb(var(--mdui-color-on-surface-variant));

    .title {
      transform: translateY(-1px);
      margin-left: 10px;
      font-size: 20px;
    }
  }

  a {
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
}
</style>