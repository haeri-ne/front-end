<template>
  <div class="container text-center mt-5">
    <div class="card p-5 shadow-lg">
      <!-- 완료 메시지 -->
      <h1 class="text-primary mb-3 fw-bold" style="font-family: 'GmarketSansMedium';">
        별점 제출 완료!
      </h1>
      <p class="fw-bold" style="font-family: 'GmarketSansLight';">
        소중한 평가를 해주셔서 감사합니다. 😊
      </p>

      <!-- 홈으로 이동 버튼 -->
      <button
        class="btn btn-primary mt-3 fw-bold"
        style="font-family: 'GmarketSansLight';"
        @click="goToHome"
      >
        홈으로 이동
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useDateStore } from '../store/dateStore'
import { formatKSTDate } from '../utils/KSTDate'

const router = useRouter()
const dateStore = useDateStore()

// 오늘 날짜로 홈(메뉴 화면)으로 이동
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
