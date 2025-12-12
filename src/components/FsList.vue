<template>
  <mdui-list v-if="loading">
    <div class="empty" v-if="data.list.length === 0">
      <mdui-icon name='inbox'></mdui-icon>
      <p>什么都没有?</p>
    </div>
    <template v-else>
      <mdui-list-item v-for="(item, index) in data.list">
        <div class="fs-list-item" slot="custom" @click="open(item)">
          <mdui-icon :name="item.type ? iconMap[item.type] : iconMap[data.type]"></mdui-icon>
          <div class="fs-list-content">
            <div class="headline line-hide-1" v-html="item.name"></div>
            <div class="description path line-hide-1" v-if="item.path">{{ item.path }}</div>
            <div class="description line-hide-1"
              v-html="data.type === 'map-favorite' ? `${item.list.length} 项` : item.description"></div>
          </div>
          <mdui-dropdown v-if="item.type ?? data.type !== 'map-folder'" @click.stop>
            <mdui-button-icon slot="trigger" icon="more_vert"></mdui-button-icon>
            <mdui-menu>
              <mdui-menu-item @click="open(item)">打开</mdui-menu-item>
              <mdui-menu-item v-if="auth(['map-favorite'])" @click="share(item)">分享</mdui-menu-item>
              <mdui-menu-item v-if="auth(['map-favorite'])" @click="addToFavorite(item)">添加到收藏夹</mdui-menu-item>
              <mdui-menu-item v-if="auth(['map-markdown', 'map-folder'], item.type ?? data.type)"
                @click="deleteAction(item.name, index)">删除</mdui-menu-item>
              <mdui-menu-item v-if="auth(['map-favorite'])" @click="openDetail(item)">详细信息</mdui-menu-item>
            </mdui-menu>
          </mdui-dropdown>
        </div>
      </mdui-list-item>
    </template>
  </mdui-list>
  <div class="loading" v-else>
    <mdui-circular-progress></mdui-circular-progress>
  </div>
</template>

<script setup>
import 'mdui/components/list.js';
import 'mdui/components/list-item.js';
import 'mdui/components/button-icon.js';
import 'mdui/components/dropdown.js';
import 'mdui/components/menu.js';
import 'mdui/components/menu-item.js';
import { useRouter, useRoute, } from 'vue-router';
import { Share } from '@capacitor/share'
import { dialogStore } from '~/stores/dialog';
import { useRecent } from '~/stores/recent';
import { filterMark } from '~/utils/library';
import { stackHistory } from '~/stores/stackLibrary';
import { useFavorites } from '~/stores/favorites';
import { currentOpen } from '~/stores/currentOpen';

const props = defineProps({
  data: Object,
  loading: {
    type: Boolean,
    default: true
  }
})

const router = useRouter()
const route = useRoute()
const recentStore = useRecent()
const favoritesStore = useFavorites()
const { confirmRemove, promptAddItem, removeItem } = favoritesStore

const iconMap = {
  'map-folder': 'folder',
  'map-markdown': 'description',
  'map-favorite': 'star_outline',
  'map-favorite-item': 'description',
}

const getPath = (path, name) => {
  let pathString = ''
  if (path) {
    pathString = path
  } else {
    const pathArray = route.params.pathMatch
    pathString = `${pathArray ? pathArray.join('/') + '/' : ''}${name}`
  }
  return pathString
}

const openFolder = (name) => {
  stackHistory.unshift({
    scrollTop: document.getElementById('main').scrollTop,
    list: props.data,
    path: (route.params.pathMatch ? route.params.pathMatch : []).join('/')
  })
  const pathArray = route.params.pathMatch
  const pathString = `${pathArray ? pathArray.join('/') + '/' : ''}${name}`
  router.push(`/library/${pathString}`)
}

const openMarkdown = (options = {}) => {
  setTimeout(() => {
    const pathString = getPath(options.path, options.name)
    recentStore.add({
      path: pathString,
      type: options.type ?? props.data.type,
      name: filterMark(options.name),
      description: filterMark(options.description)
    })
    currentOpen.data = {
      path: pathString,
      name: filterMark(options.name),
      description: filterMark(options.description)
    }
    router.push(`/markdown-view?path=${pathString}`)
  }, 0);
}

const open = (options = {}) => {
  const type = options.type ?? props.data.type

  if (type === 'map-folder') {
    openFolder(options.name)
  } else if (type === 'map-markdown' || type === 'map-favorite-item') {
    openMarkdown(options)
  } else if (type === 'map-favorite') {
    router.push(`/favorite-detail/${options.name}`)
  }
}

const openDetail = (options = {}) => {
  dialogStore.title = options.name
  dialogStore.description = `${options.path ? '<span class="path">' + options.path + '</span><br>' : ''}${options.description}`
  dialogStore.open()
}

const addToFavorite = (options = {}) => {
  const { name, description, path } = options
  const pathString = getPath(path, name)
  promptAddItem({
    name: filterMark(name),
    description: filterMark(description),
    path: pathString
  })
}

const deleteAction = (name, index) => {
  if (props.data.type === 'map-favorite') {
    confirmRemove(name)
  } else if (props.data.type === 'map-favorite-item') {
    removeItem(index)
  }
}

const share = (options = {}) => {
  const name = filterMark(options.name)
  const pathString = getPath(options.path, name)
  Share.share({
    title: name,
    text: name,
    url: `https://hymnal.timeic.top/#/${encodeURI(pathString)}`
  })
}

const auth = (auths, type = props.data.type) => !auths.includes(type)
</script>

<style scoped>
.fs-list-item {
  @apply flex items-center justify-between;

  mdui-icon {
    font-size: 38px;
    margin: 0 15px;

    &[name=folder] {
      color: #43B9F6;
    }

    &[name=star_outline] {
      color: rgb(var(--mdui-color-error));
    }

    &[name=description],
    &[name=insert_drive_file] {
      color: rgb(var(--mdui-color-on-surface-variant));
    }
  }

  mdui-button-icon[icon=more_vert] {
    margin: 0 15px;
  }

  .fs-list-content {
    padding: 8px 0;
    flex: 1;

    .headline {
      color: rgb(var(--mdui-color-on-surface));
      font-size: 17.2px;
    }

    .description {
      color: rgb(var(--mdui-color-on-surface-variant));
      font-size: 14px;
    }
  }
}

.empty {
  text-align: center;
  padding: 28px 0;
  color: rgb(var(--mdui-color-on-surface-variant));

  mdui-icon[name=inbox] {
    font-size: 46px;
  }
}

.loading {
  padding: 20px 0;
  text-align: center;
}

.bottom-loading {
  text-align: center;
}
</style>