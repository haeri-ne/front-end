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
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '../store/menuStore'
import { useLogStore } from '../store/logStore'
import { getKSTDateTimeStringWithMs } from '../utils/KSTDate'
import Header from '../components/Header.vue'
import ReviewCard from '../components/ReviewCard.vue'

const menuStore = useMenuStore()
const logStore = useLogStore()
const route = useRoute()

const logReviewView = () => {
  const uuid = localStorage.getItem('uuid') || (() => {
    const newId = crypto.randomUUID()
    localStorage.setItem('uuid', newId)
    return newId
  })()

  logStore.addLog({
    user_id: uuid,
    event_name: 'view_review_screen',
    event_value: {},
    page_name: 'review_view',
    event_time: getKSTDateTimeStringWithMs(new Date()),
  })
}

onMounted(() => {
  logReviewView()
})

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    if (newPath.startsWith('/review') && oldPath !== newPath) {
      logReviewView()
    }
  }
)
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
