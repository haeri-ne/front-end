<template>
  <div class="container mt-4">
    <div class="card p-4 shadow-sm">
      <!-- 제목 -->
      <h4 class="text-center mb-3" style="font-family: 'GmarketSansMedium';">
        별점을 매겨주세요
      </h4>

      <!-- 음식 별점 리스트 -->
      <ul class="list-group">
        <li
          v-for="(item, index) in reviewData"
          :key="item.food_id"
          class="list-group-item"
        >
          <!-- 음식 이름 -->
          <div class="food-name">
            {{ item.food_name }}
          </div>

          <!-- 별점 표시 -->
          <div class="star-group-wrapper">
            <div class="star-group">
              <span
                v-for="n in 5"
                :key="n"
                class="star"
              >
                {{ renderStar(item.score, n) }}
              </span>
            </div>
          </div>

          <!-- 점수 조절 버튼 -->
          <div class="score-control">
            <button
              class="btn btn-outline-danger btn-sm"
              @click="decreaseScore(index)"
            >-</button>
            <span class="score">{{ item.score.toFixed(1) }}</span>
            <button
              class="btn btn-outline-success btn-sm"
              @click="increaseScore(index)"
            >+</button>
          </div>
        </li>
      </ul>

      <!-- 제출 버튼 -->
      <div class="text-center mt-3">
        <button
          class="btn btn-primary px-4"
          style="font-family: 'GmarketSansMedium';"
          @click="submitReview"
        >
          제출
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useLogStore } from '../store/logStore'
import { getKSTDateTimeStringWithMs } from '../utils/KSTDate'

const props = defineProps({
  menu: Object
})

const router = useRouter()
const logStore = useLogStore()

// 별점 평가를 위한 데이터 초기화
const reviewData = ref(
  props.menu.foods.map((food) => ({
    food_id: food.id,
    food_name: food.name,
    score: 0.0
  }))
)

// 점수 증가 (0.5 단위, 5점이면 0으로 초기화)
const increaseScore = (index) => {
  const score = reviewData.value[index].score
  reviewData.value[index].score = score === 5 ? 0 : score + 0.5
  
  const uuid = localStorage.getItem('uuid') || (() => {
      const newId = crypto.randomUUID()
      localStorage.setItem('uuid', newId)
      return newId
  })()

  logStore.addLog({
    user_id: uuid,
    event_name: 'increase_food_score',
    event_value: { food_id: reviewData.value[index].food_id, now_score: reviewData.value[index].score },
    page_name: 'review_view',
    event_time: getKSTDateTimeStringWithMs(new Date()),
  })
}

// 점수 감소 (0.5 단위, 0점이면 5점으로 초기화)
const decreaseScore = (index) => {
  const score = reviewData.value[index].score
  reviewData.value[index].score = score === 0 ? 5 : score - 0.5

  const uuid = localStorage.getItem('uuid') || (() => {
      const newId = crypto.randomUUID()
      localStorage.setItem('uuid', newId)
      return newId
  })()

  logStore.addLog({
    user_id: uuid,
    event_name: 'decrease_food_score',
    event_value: { food_id: reviewData.value[index].food_id, now_score: reviewData.value[index].score },
    page_name: 'review_view',
    event_time: getKSTDateTimeStringWithMs(new Date()),
  })
}

// 별 렌더링 함수: ★(1점), ⯪(0.5점), ☆(0점)
const renderStar = (score, index) => {
  const realIndex = index - 1
  if (score >= realIndex + 1) return '★'
  else if (score >= realIndex + 0.5) return '⯪'
  else return '☆'
}

// 리뷰 제출
const submitReview = async () => {
  // 로그 백엔드로 넘기기
  await logStore.sendLogs()

  const uuid = localStorage.getItem('uuid') || (() => {
    const newId = crypto.randomUUID()
    localStorage.setItem('uuid', newId)
    return newId
  })()

  const unReviewedItems = reviewData.value.filter((item) => item.score === 0)

  if (unReviewedItems.length > 0) {
    const confirmSubmit = confirm('평가가 완료되지 않았습니다. 그래도 제출하시겠습니까?')
    if (!confirmSubmit) return
  }

  const API_URL = `${import.meta.env.API_BASE_URL}/api/v1/foods/score`

  try {
    for (const item of reviewData.value) {
      const response = await axios.post(API_URL, {
        food_id: item.food_id,
        score: item.score
      },{
        headers: {
          'user-id': uuid
        }
      })
      console.log('리뷰 POST 성공:', response.data)
    }
  } catch (error) {
    console.error('리뷰 POST 실패:', error)
  }

  router.push({ name: 'review-completed' })
}
</script>

<style scoped>
.container {
  max-width: 600px;
}

.card {
  border-radius: 12px;
}

.list-group-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
}

.food-name {
  width: 100px;
  font-weight: bold;
  font-family: 'GmarketSansLight';
  text-align: left;
}

.star-group-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
}

.star-group {
  display: flex;
  gap: 4px;
  font-size: 20px;
  color: gold;
}

.star {
  width: 20px;
  text-align: center;
  font-family: monospace;
  user-select: none;
}

.score-control {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
}

.score {
  width: 32px;
  text-align: center;
  font-weight: bold;
  font-family: 'GmarketSansLight';
}
</style>
