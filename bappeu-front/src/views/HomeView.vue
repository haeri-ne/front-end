<template>
  <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
    <img
      src="../assets/bapp.png"
      class="fade-image"
      :class="{ 'fade-out': isFading }"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useDateStore } from '../store/dateStore'
import { formatKSTDate } from '../utils/KSTDate'

const router = useRouter()
const dateStore = useDateStore()

const isFading = ref(false)

onMounted(() => {
  // 0.5초 후 이미지 페이드 아웃 시작
  setTimeout(() => {
    isFading.value = true
  }, 500)

  // 1초 후 날짜 저장 및 메뉴 페이지로 이동
  setTimeout(() => {
    const today = formatKSTDate(new Date())
    dateStore.setDate(today)
    router.replace(`/menus/${today}`)
  }, 1000)
})
</script>

<style scoped>
.fade-image {
  width: 500px;
  height: auto;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.fade-out {
  opacity: 0;
}
</style>
