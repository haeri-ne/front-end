<template>
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useLogStore } from './store/logStore'

const logStore = useLogStore()

const handleBeforeUnload = () => {
  if (logStore.logs.length > 0) {
    navigator.sendBeacon(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/logs/front`,
      JSON.stringify(logStore.logs)
    )
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<style scoped>
@font-face {
  font-family: 'GmarketSansBold';
  src: url('./assets/GmarketSansTTFBold.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'GmarketSansLight';
  src: url('./assets/GmarketSansTTFLight.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'GmarketSansMedium';
  src: url('./assets/GmarketSansTTFMedium.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
</style>