<template>
  <p>메뉴1</p>
  <div v-for="(food, index) in foods1" :key="'food1-' + index">
    <input type="text" v-model="foods1[index]" :placeholder="`음식${index + 1}`" />
  </div>

  <p>메뉴2</p>
  <div v-for="(food, index) in foods2" :key="'food2-' + index">
    <input type="text" v-model="foods2[index]" :placeholder="`음식${index + 1}`" />
  </div>

  <br>

  <button @click="handleSubmit">제출</button>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { formatKSTDate } from '../utils/date'

const foods1 = ref(new Array(6).fill(''))
const foods2 = ref(new Array(6).fill(''))

const handleSubmit = async () => {
const currentDate = formatKSTDate(new Date())

try {
  await Promise.all([
    axios.post('http://127.0.0.1:8000/api/v1/menus', { foods: foods1.value, date: currentDate }),
    axios.post('http://127.0.0.1:8000/api/v1/menus', { foods: foods2.value, date: currentDate })
  ])

  alert('제출 완료!')
} catch (error) {
  console.error('요청 실패:', error)
  alert('요청 실패. 콘솔을 확인하세요.')
}
}
</script>
