<template>
  <div class="wrapper d-flex justify-content-center align-items-center text-center">
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
import { onMounted, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { useDateStore } from '../store/dateStore'
import { formatKSTDate } from '../utils/KSTDate'

const router = useRouter()
const dateStore = useDateStore()

onMounted(() => {  
  const uuid = localStorage.getItem('uuid') || (() => {
      const newId = crypto.randomUUID()
      localStorage.setItem('uuid', newId)
      return newId
  })()

  logStore.addLog({
    user_id: uuid,
    event_name: 'view_review_completed_screen',
    event_value: null,
    page_name: 'review_completed_view',
    event_time: getKSTDateTimeStringWithMs(new Date()),
  })
})

onActivated(() => { // 뒤로 가기 등으로 다시 진입할 때 실행
  const uuid = localStorage.getItem('uuid') || (() => {
      const newId = crypto.randomUUID()
      localStorage.setItem('uuid', newId)
      return newId
  })()

  logStore.addLog({
    user_id: uuid,
    event_name: 'view_review_completed_screen',
    event_value: null,
    page_name: 'review_completed_view',
    event_time: getKSTDateTimeStringWithMs(new Date()),
  })
})

const goToHome = () => {
  const today = formatKSTDate(new Date())
  dateStore.setDate(today)

  const uuid = localStorage.getItem('uuid') || (() => {
      const newId = crypto.randomUUID()
      localStorage.setItem('uuid', newId)
      return newId
  })()

  logStore.addLog({
    user_id: uuid,
    event_name: 'click_home_button',
    event_value: null,
    page_name: 'review_completed_view',
    event_time: getKSTDateTimeStringWithMs(new Date()),
  })

  router.push({ name: 'menus', params: { date: dateStore.date } })
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.card {
  max-width: 500px;
  width: 100%;
  border-radius: 12px;
  background-color: #f8f9fa;
}
</style>
