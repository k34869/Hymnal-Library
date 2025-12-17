<template>
  <div class="layout" :class="{ hide: isHide, hideBottomBar: isHideBottomBar }">
    <div class="container">
      <div class="side-app-bar">
        <SideBar />
      </div>

      <main id="main">
        <div class="top-app-bar">
          <TopBar />
        </div>
        <router-view v-slot="{ Component }">
          <transition :name="$route.meta.transition || 'fade'" mode="out-in">
            <KeepAlive :exclude="['收藏夹详情', 'markdown视图', '设置']">
              <component :is="Component"></component>
            </KeepAlive>
          </transition>
        </router-view>
      </main>
    </div>

    <div class="bottom-app-bar">
      <BottomBar />
    </div>
  </div>
  <Dialog>
    <component :is="dialogStore.component" v-bind="dialogStore.props"></component>
  </Dialog>
</template>

<script setup>
import TopBar from './components/TopBar.vue';
import BottomBar from './components/BottomBar.vue';
import SideBar from './components/SideBar.vue';
import Dialog from './components/Dialog.vue';
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import { dialogStore } from '~/stores/dialog';

const route = useRoute()
const isHideBottomBar = ref(false)
const isHide = ref(false)

watch(() => route.name, (value) => {
  if (/(markdown视图)/.test(value)) {
    isHide.value = true
    isHideBottomBar.value = false
  } else if (/(收藏夹详情|设置)/.test(value)) {
    isHide.value = false
    isHideBottomBar.value = true
  } else {
    isHide.value = false
    isHideBottomBar.value = false
  }
})

// 安卓设备输入法弹出布局适配
let originHeight = document.documentElement.clientHeight || document.body.clientHeight;
let orientation = window.matchMedia("(orientation: landscape)").matches
window.addEventListener('resize', () => {
  const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
  // 屏幕方向改变时不判断
  if (window.matchMedia("(orientation: landscape)").matches !== orientation) {
    orientation = window.matchMedia("(orientation: landscape)").matches
    return
  };
  if (originHeight <= resizeHeight) {
    // Android 键盘收起后操作
    isHideBottomBar.value = false
  } else {
    // Android 键盘弹起后操作
    isHideBottomBar.value = true
  }
  originHeight = resizeHeight;
}, false);
</script>

<style scoped>
.layout {
  height: calc(100vh + 1px);

  .container {
    .side-app-bar {
      @apply h-screen overflow-y-auto;
      padding-top: var(--safe-area-inset-top);
      padding-bottom: var(--safe-area-inset-bottom);
      display: none;
      transition: all 0.1s ease-in;
    }

    main {
      @apply overflow-y-auto;
      height: calc(100vh - (var(--safe-area-inset-bottom) + 5rem));

      .top-app-bar {
        @apply relative w-full;
        z-index: 2;
        padding-top: var(--safe-area-inset-top);
        background-color: rgb(var(--mdui-color-surface));
      }
    }
  }

  .bottom-app-bar {
    @apply fixed w-full bottom-0;
    padding-bottom: var(--safe-area-inset-bottom);
    background-color: rgb(var(--mdui-color-surface-container));
    box-shadow: var(--mdui-elevation-level2);
  }

  &.hide {
    .bottom-app-bar {
      transform: translateY(calc(var(--safe-area-inset-bottom) + 5rem));
    }

    .side-app-bar {
      flex-basis: 0px !important;
      flex: 0;
      transform: translateX(-240px);
    }

    .top-app-bar {
      &:deep(.top-bar) {
        height: 0px;
      }
    }

    .container {
      main {
        height: 100vh !important;
      }
    }
  }

  &.hideBottomBar {
    .bottom-app-bar {
      display: none;
    }

    .side-app-bar {
      flex-basis: 0px !important;
      flex: 0;
      transform: translateX(-240px);
    }

    .container {
      main {
        height: 100vh;
        padding-bottom: var(--safe-area-inset-bottom);
      }
    }
  }
}

@media only screen and (min-width: 577px) {
  .layout>.container {
    display: flex;

    .side-app-bar {
      display: block;
      flex-basis: 180px;
    }

    main {
      flex: 1;
      height: 100vh !important;
      padding-bottom: var(--safe-area-inset-bottom);

      .top-app-bar {
        &:deep(.top-bar) {
          display: none;
        }
      }
    }
  }

  .bottom-app-bar {
    display: none;
  }
}

@media only screen and (min-width: 769px) {
  .layout>.container {
    display: flex;

    .side-app-bar {
      display: block;
      flex-basis: 245px;
    }

    main {
      flex: 1;
      height: 100vh !important;
      padding-bottom: var(--safe-area-inset-bottom);

      .top-app-bar {
        &:deep(.top-bar) {
          display: none;
        }
      }
    }
  }

  .bottom-app-bar {
    display: none;
  }
}
</style>