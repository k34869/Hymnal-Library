<template>
  <div class="container">
    <h1 class="title font-bold-400">{{ inCategory }}{{ isAdditional ? '(附)' : '' }} {{ toNumber }} 首</h1>
    <div class="navigation">
      <div class="item" v-for="item in gridOptions" @click="action(item)">
        <mdui-card variant="filled" clickable class="card font-bold-400" :type="item.type">{{ item.content
        }}</mdui-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'mdui/components/card.js';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useSearch } from '~/hooks/useSearch';
import { useRecent } from '~/stores/recent';
import { snackbar } from "mdui/functions/snackbar.js";
import { currentOpen } from '~/stores/currentOpen';

const router = useRouter()
const recentStore = useRecent()
const { search } = useSearch()
const toNumber = ref('0')
const inCategory = ref('大本诗歌')
const isAdditional = ref(false)
let inPrefix = 'D'

const gridOptions = [
  {
    content: '大本诗歌',
    type: 'navigation',
    prefix: 'D'
  },
  {
    content: '补充本诗歌',
    type: 'navigation',
    prefix: 'B'
  },
  {
    content: '青年诗歌',
    type: 'navigation',
    prefix: 'Q'
  },
  {
    content: '唱诗人',
    type: 'navigation',
    prefix: 'S'
  },
  {
    content: '1',
    type: 'number'
  },
  {
    content: '2',
    type: 'number'
  },
  {
    content: '3',
    type: 'number'
  },
  {
    content: '新歌颂咏',
    type: 'navigation',
    prefix: 'X'
  },
  {
    content: '4',
    type: 'number'
  },
  {
    content: '5',
    type: 'number'
  },
  {
    content: '6',
    type: 'number'
  },
  {
    content: '儿童诗歌',
    type: 'navigation',
    prefix: 'C'
  },
  {
    content: '7',
    type: 'number'
  },
  {
    content: '8',
    type: 'number'
  },
  {
    content: '9',
    type: 'number'
  },
  {
    content: '附',
    type: 'additional'
  },
  {
    content: 'x',
    type: 'clear'
  },
  {
    content: '0',
    type: 'number'
  },
  {
    content: '<',
    type: 'backspace'
  },
  {
    content: '确认',
    type: 'submit'
  },
]

const repairSN = () => {
  const t = ['唱诗人']

  if (t.includes(inCategory.value)) {
    return toNumber.value.padStart(3, '0')
  }
  return toNumber.value
}

const openMarkdown = (options) => {
  const { path, type, name, description } = options

  recentStore.add({
    path,
    type,
    name,
    description
  })
  currentOpen.data = {
    path,
    name,
    description
  }
  router.push(`/markdown-view?path=${path}`)
}

const action = (option) => {
  const { content, type, prefix } = option

  if (type === 'number') {
    toNumber.value = String(parseInt(toNumber.value + content))
  } else if (type === 'backspace') {
    const length = toNumber.value.length
    toNumber.value = length === 1 ? '0' : toNumber.value.slice(0, length - 1)
  } else if (type === 'clear') {
    toNumber.value = '0'
  } else if (type === 'navigation') {
    inCategory.value = content
    inPrefix = prefix
    isAdditional.value = false
  } else if (type === 'additional') {
    isAdditional.value = true
    inPrefix = content
  } else if (type === 'submit') {
    const res = search(`${inPrefix}${repairSN()}`, ['name'], false)
    const results = res.filter(item => item.category === inCategory.value)

    if (results.length === 0 || toNumber.value == '0') {
      snackbar({
        message: `⚠️没有查询到结果`,
        autoCloseDelay: 3000
      })
    } else if (results.length > 0) {
      openMarkdown(results[0])
    }
  }
}
</script>

<style scoped>
.container {
  @apply flex justify-center items-center flex-wrap;
  height: 80%;
}

.title {
  text-align: center;
  font-weight: normal;
  margin-bottom: 25px;
  color: rgb(var(--mdui-color-on-surface-variant));
}

.navigation {
  @apply grid w-full justify-center;
  padding-bottom: var(--safe-area-inset-bottom);
  grid-template-columns: repeat(4, 80px);
  gap: 5px;

  .item {
    width: 80px;
    height: 80px;

    .card {
      @apply w-full h-full text-center;
      border-radius: 50%;
      line-height: 80px;
      font-size: 28px;
      color: rgb(var(--mdui-color-on-surface-variant));

      &[type=clear],
      &[type=backspace] {
        background-color: #533550;
        color: #f2f2f2;
      }

      &[type=submit] {
        background-color: #6577c0;
        color: #f2f2f2;
      }

      &[type=navigation],
      &[type=link],
      &[type=additional] {
        background-color: #717389;
        color: #f2f2f2;
      }

      &[type=empty] {
        visibility: hidden;
      }
    }
  }
}
</style>
