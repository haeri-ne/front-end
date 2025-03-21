<template>
  <div class="container text-center mt-5">
    <div class="card p-5 shadow-lg">
      <h1 class="text-primary mb-3">별점 제출 완료!</h1>
      <p class="fs-5">소중한 평가를 해주셔서 감사합니다. 😊</p>
      <button class="btn btn-primary mt-3" @click="goToHome">홈으로 이동</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useDateStore } from '../store/dateStore'
import { formatKSTDate } from '../utils/KSTDate'

const router = useRouter()
const dateStore = useDateStore()

const goToHome = () => {
  const today = formatKSTDate(new Date())
  dateStore.setDate(today)
  router.push({ name: 'menus', params: { date: dateStore.date } })
}
</script>

<style scoped>
.container {
  max-width: 500px;
}
.card {
  border-radius: 12px;
  background-color: #f8f9fa;
}
</style>