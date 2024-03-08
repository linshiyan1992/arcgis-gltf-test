<script setup>
import { onMounted } from 'vue'
import Layout from '@/layouts/Layout.vue'
import esriConfig from '@arcgis/core/config'

onMounted(() => {
  esriConfig.assetsPath = './assets'
})
</script>

<template>
  <Layout />
</template>

<style scoped></style>
