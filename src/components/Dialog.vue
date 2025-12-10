<template>
  <teleport to="body">
    <mdui-dialog @close="dialogStore.close" :open="dialogStore.isOpen" close-on-esc close-on-overlay-click
      v-bind="$attrs" class="dialog">
      <slot />
      <p slot="headline" v-html="dialogStore.title"></p>
      <p slot="description" v-html="dialogStore.description"></p>
      <mdui-button class="button" slot="action" variant="tonal" @click="dialogStore.close"
        v-if="dialogStore.showButtons">取消</mdui-button>
      <mdui-button class="button" slot="action" variant="tonal" @click="dialogStore.onSubmit"
        v-if="dialogStore.showButtons">确认</mdui-button>
    </mdui-dialog>
  </teleport>
</template>

<script setup>
import 'mdui/components/dialog.js';
import 'mdui/components/button.js';
import { dialogStore } from '~/stores/dialog';

defineOptions({
  inheritAttrs: false
})
</script>

<style scoped>
.dialog {
  user-select: text;

  .button {
    margin-left: 15px;
  }
}
</style>