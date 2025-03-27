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
import { onMounted, onActivated, ref } from 'vue'
import { useDateStore } from '../store/dateStore'
import { useLogStore } from '../store/logStore'
import { formatKSTDate, getKSTDateTimeStringWithMs } from '../utils/KSTDate'

const router = useRouter()
const dateStore = useDateStore()
const logStore = useLogStore()

const isFading = ref(false)

onMounted(() => {
  const uuid = localStorage.getItem('uuid') || (() => {
      const newId = crypto.randomUUID()
      localStorage.setItem('uuid', newId)
      return newId
  })()

  logStore.addLog({
    user_id: uuid,
    event_name: 'view_home_screen',
    event_value: null,
    page_name: 'home_view',
    event_time: getKSTDateTimeStringWithMs(new Date()),
  })

  // 1초 후 이미지 페이드 아웃 시작
  setTimeout(() => {
    isFading.value = true
  }, 1000)

  // 1.5초 후 날짜 저장 및 메뉴 페이지로 이동
  setTimeout(() => {
    const today = formatKSTDate(new Date())
    dateStore.setDate(today)
    router.replace(`/menus/${today}`)
  }, 1500)
})

onActivated(() => { // 뒤로 가기 등으로 다시 진입할 때 실행
  const uuid = localStorage.getItem('uuid') || (() => {
      const newId = crypto.randomUUID()
      localStorage.setItem('uuid', newId)
      return newId
  })()

  logStore.addLog({
    user_id: uuid,
    event_name: 'view_home_screen',
    event_value: null,
    page_name: 'home_view',
    event_time: getKSTDateTimeStringWithMs(new Date()),
  })
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
