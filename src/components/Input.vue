<template>
  <mdui-text-field ref="input" variant="outlined" :value="modelValue" :label="label" clearable
    @input="$emit('update:modelValue', $event.target.value)">
    <mdui-button-icon slot="end-icon" icon="search" @click="$emit('submit')"></mdui-button-icon>
  </mdui-text-field>
</template>

<script setup>
import 'mdui/components/text-field.js';
import { onActivated, onDeactivated, useTemplateRef } from 'vue'

defineProps({
  label: {
    type: String,
    default: '搜索'
  },
  modelValue: String
})

const emit = defineEmits([
  'update:modelValue',
  'submit'
])

const $input = useTemplateRef('input')

const handleKeyup = (event) => {
  if (event.keyCode === 13) emit('submit')
}

const handleFocus = () => $input.value.addEventListener('keyup', handleKeyup)

onActivated(() => $input.value.addEventListener('focus', handleFocus))

onDeactivated(() => {
  $input.value.removeEventListener('focus', handleFocus)
  $input.value.removeEventListener('keyup', handleKeyup)
})
</script>

<style scoped>
mdui-text-field {
  &::part(container) {
    border-radius: 50px;
    height: 54px;
    box-shadow: none;
    background-color: rgb(var(--mdui-color-surface-container-highest));
    margin: 0 8px;
  }
}
</style>