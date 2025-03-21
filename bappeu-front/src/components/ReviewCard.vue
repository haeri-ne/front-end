<template>
  <div class="container mt-4">
    <div class="card p-4 shadow-sm">
      <h4 class="text-center mb-3">별점을 매겨주세요</h4>
      
      <ul class="list-group">
        <li v-for="(item, index) in reviewData" :key="item.food_id" class="list-group-item d-flex justify-content-between align-items-center">
          <span class="fw-bold">{{ item.food_name }}</span>
          <div>
            <button class="btn btn-outline-danger btn-sm me-2" @click="decreaseScore(index)">-</button>
            <span class="fs-5">{{ item.score.toFixed(1) }}</span>
            <button class="btn btn-outline-success btn-sm ms-2" @click="increaseScore(index)">+</button>
          </div>
        </li>
      </ul>
      
      <div class="text-center mt-3">
        <button class="btn btn-primary px-4" @click="submitReview">제출</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const props = defineProps({
  menu: Object
})

const router = useRouter()

const reviewData = ref(props.menu.foods.map(food => ({
  score: 0.0,
  food_id: food.id,
  food_name: food.name
})))

const increaseScore = index => {
  if (reviewData.value[index].score == 5) reviewData.value[index].score = 0
  else if (reviewData.value[index].score < 5) reviewData.value[index].score += 0.5
}

const decreaseScore = index => {
  if (reviewData.value[index].score == 0) reviewData.value[index].score = 5
  else if (reviewData.value[index].score > 0) reviewData.value[index].score -= 0.5
}

const submitReview = async () => {
  const unReviewedItems = reviewData.value.filter(item => item.score === 0)

  if (unReviewedItems.length > 0) {
    if (!confirm('평가가 완료되지 않았습니다. 그래도 제출하시겠습니까?')) {
      return
    }
  }

  const API_URL = 'http://127.0.0.1:8000/api/v1/foods/score'

  try {
    for (const item of reviewData.value) {
      const response = await axios.post(API_URL, { score: item.score, food_id: item.food_id })
      console.log("리뷰 POST 성공:", response.data)
    }
  } catch (error) {
    console.error("리뷰 POST 실패:", error);
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
  justify-content: space-between;
  align-items: center;
}
</style>
