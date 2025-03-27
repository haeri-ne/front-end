<template>
  <div>
    <Header />

    <!-- 리뷰 카드 영역 -->
    <div class="review-wrapper d-flex justify-content-center align-items-center">
      <ReviewCard :menu="menuStore.selectedMenu" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onActivated } from 'vue'
import { useMenuStore } from '../store/menuStore'
import Header from '../components/Header.vue'
import ReviewCard from '../components/ReviewCard.vue'

const menuStore = useMenuStore()

onMounted(() => {  
  const uuid = localStorage.getItem('uuid') || (() => {
      const newId = crypto.randomUUID()
      localStorage.setItem('uuid', newId)
      return newId
  })()

  logStore.addLog({
    user_id: uuid,
    event_name: 'view_review_screen',
    event_value: null,
    page_name: 'review_view',
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
    event_name: 'view_review_screen',
    event_value: null,
    page_name: 'review_view',
    event_time: getKSTDateTimeStringWithMs(new Date()),
  })
})
</script>

<style scoped>
.review-wrapper {
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
