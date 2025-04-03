<template>
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useLogStore } from './store/logStore'

const logStore = useLogStore()
const intervalId = ref(null)

const handleBeforeUnload = () => {
  if (logStore.logs.length > 0) {
    navigator.sendBeacon(
      'http://localhost:8000/api/v1/logs/front',
      JSON.stringify(logStore.logs)
    )
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
  intervalId.value = setInterval(logStore.sendLogs, 10000)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
  clearInterval(intervalId.value)
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