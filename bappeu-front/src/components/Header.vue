<template>
  <div class="container-fluid bg-primary text-white sticky-top shadow-sm">
    <div class="d-flex justify-content-between align-items-center p-3">
      <!-- 홈 아이콘 -->
      <img src="../assets/home.png" alt="home" class="icon" @click="goToHome" />

      <!-- 제목 + 날짜 -->
      <div class="d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <h3 class="mb-1 fw-bold" style="font-family: 'GmarketSansBold';">SSAFY 대전캠퍼스 식단표</h3>
        <p class="text-white-50 mb-0" style="font-family: 'GmarketSansBold';">{{ dateStore.date }}</p>
      </div>

      <!-- 달력 아이콘 + 숨겨진 input -->
      <div class="calendar-wrapper" @click="openDatePicker">
        <img src="../assets/calendar.png" alt="calendar" class="icon" />
        <input
          type="date"
          ref="dateInput"
          class="hidden-date-input"
          @change="onDateChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// 외부 모듈 및 상태 관리 스토어 임포트
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDateStore } from '../store/dateStore'
import { formatKSTDate } from '../utils/KSTDate'

const router = useRouter()
const dateStore = useDateStore()

const dateInput = ref(null)
const lastSelectedDate = ref(dateStore.date)

// 홈 아이콘 클릭 시 오늘 날짜로 이동
const goToHome = () => {
  const today = formatKSTDate(new Date())
  dateStore.setDate(today)
  router.push({ name: 'menus', params: { date: today } })
}

// 날짜 선택 시 라우팅 및 상태 업데이트
const onDateChange = (e) => {
  const selectedDate = e.target.value
  if (selectedDate && selectedDate !== lastSelectedDate.value) {
    lastSelectedDate.value = selectedDate
    dateStore.setDate(selectedDate)
    router.push({ name: 'menus', params: { date: selectedDate } })
  }
}

// 달력 아이콘 클릭 시 date picker 열기
const openDatePicker = () => {
  dateInput.value?.showPicker?.() || dateInput.value?.click()
}
</script>

<style scoped>
.icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.calendar-wrapper {
  width: 40px;
  height: 40px;
  position: relative;
  cursor: pointer;
}

.hidden-date-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}
</style>