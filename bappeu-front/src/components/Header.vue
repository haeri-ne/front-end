<template>
  <div>
    <div class="container-fluid bg-primary text-white sticky-top shadow-sm">
      <div class="d-flex justify-content-between align-items-center p-3">
        <img src="../assets/homepage.png" alt="home" class="icon" @click="goToHome" />
        <div class="text-center flex-grow-1">
          <h3 class="mb-1 fw-bold">대전캠퍼스 식단</h3>
          <p class="text-white-50">{{ dateStore.date }}</p>
        </div>
        <img src="../assets/calendar.png" alt="calendar" class="icon" />
      </div>
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
.icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.container-fluid {
  width: 100%;
}

.container {
  padding-top: 20px;
}

.shadow-sm {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
