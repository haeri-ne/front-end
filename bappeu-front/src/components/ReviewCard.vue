<template>
  <div class="review-card">
    <ul>
      <li v-for="(item, index) in reviewData" :key="item.food_id">
        <span class="food-name">{{ item.food_name }}</span>
        <button class="minus-btn" @click="decreaseScore(index)">-</button>
        <span class="score">{{ item.score.toFixed(1) }}</span>
        <button class="plus-btn" @click="increaseScore(index)">+</button>
      </li>
    </ul>
  </div>
  <div class="review-container">
    <button class="submit-btn" @click="submitReview">제출</button>
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
  if (reviewData.value[index].score < 5) reviewData.value[index].score += 0.5
}

const decreaseScore = index => {
  if (reviewData.value[index].score > 0) reviewData.value[index].score -= 0.5
}

const submitReview = async () => {
  const unReviewedItems = reviewData.value.filter(item => item.score === 0)

  if (unReviewedItems.length > 0) {
    const confirmSubmit = window.confirm(
      "아직 평가하지 않은 음식이 있습니다.\n" +
      "이어서 평가하려면 취소 버튼을 눌러주시고,\n" +
      "모든 음식을 평가했다면 확인 버튼을 눌러주세요."
    )
    if (!confirmSubmit) return
  }

  try {
    await Promise.all(reviewData.value.map(item =>
      axios.post('http://127.0.0.1:8000/api/v1/foods/score', {
        score: item.score,
        food_id: item.food_id
      })
    ))

    alert('제출 완료!')
    router.push({ name: 'review-completed' })
  } catch (error) {
    console.error("요청 실패:", error)
    alert('요청 실패. 콘솔을 확인하세요.')
  }
}
</script>

<style scoped>
.review-card {
  background-color: #60C9EF;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  width: 90%;
  max-width: 400px;
  margin: 0 auto
}

ul {
  padding: 0;
  list-style: none
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0
}

.food-name {
  flex: 2;
  text-align: center;
  font-weight: bold
}

.score {
  flex: 1;
  text-align: center;
  font-weight: bold
}

.minus-btn, .plus-btn {
  width: 40px;
  height: 40px;
  background-color: white;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 50%
}

.review-container {
  display: flex;
  justify-content: center;
  margin-top: 20px
}

.submit-btn {
  width: 90%;
  max-width: 400px;
  padding: 20px;
  background-color: #60C9EF;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  text-align: center
}

.submit-btn:hover {
  background-color: #4099E1
}
</style>
