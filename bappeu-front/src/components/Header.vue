<template>
  <div class="header">
    <img src="../assets/homepage.png" alt="home" class="icon" @click="goToHome" />

    <div class="title" @click="goToHome">
      <h3>대전캠퍼스 식단</h3>
      <p>{{ today }}</p>
    </div>

    <img src="../assets/calendar.png" alt="calendar" class="icon" @click="goToCalendar" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { formatKSTDate } from '../utils/date'

const today = formatKSTDate(new Date())
const router = useRouter()

const goToHome = () => router.push({ name: 'home' })

const goToCalendar = () => router.push({ 
  name: 'calendar',
  params: { date: today.substring(0, 7) }
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #60C9EF;
  padding: 10px 20px
}

.icon {
  width: 30px;
  height: 30px;
  cursor: pointer
}

.title {
  text-align: center;
  cursor: pointer
}

h2 {
  margin: 0;
  font-size: 18px
}

p {
  margin: 0;
  font-size: 16px;
  font-weight: bold
}
</style>
