<script setup lang="ts">
import { darkTheme } from 'naive-ui'
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
import { isDark, preferredDark } from '~/composables'

useHead({
  title: 'SDGO Data',
  meta: [
    { name: 'description', content: 'SDGO Data' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})

const theme = computed(() => isDark.value ? darkTheme : null)
</script>

<template>
  <n-config-provider :theme="theme">
    <n-loading-bar-provider>
      <RouterView />
    </n-loading-bar-provider>
  </n-config-provider>
</template>
