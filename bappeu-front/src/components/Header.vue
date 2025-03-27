<template>
  <div class="container-fluid bg-primary text-white sticky-top shadow-sm">
    <div class="d-flex justify-content-between align-items-center p-3">
      <!-- 홈 아이콘 -->
      <img src="../assets/home.png" alt="home" class="icon" @click="goToHome" />

      <!-- 제목 + 날짜 -->
      <div class="d-flex flex-column align-items-center justify-content-center flex-grow-1 text-center">
        <h3 class="mb-1 fw-bold title-text">
          SSAFY 대전캠퍼스 식단표
        </h3>
        <p class="text-white-50 mb-0" style="font-family: 'GmarketSansBold';">
          {{ dateStore.date }}
        </p>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDateStore } from '../store/dateStore'
import { formatKSTDate, getKSTDateTimeStringWithMs } from '../utils/KSTDate'
import { useLogStore } from '../store/logStore'

const router = useRouter()
const dateStore = useDateStore()
const logStore = useLogStore()

const dateInput = ref(null)
const lastSelectedDate = ref(dateStore.date)

// 홈 버튼 클릭
const goToHome = () => {
  const today = formatKSTDate(new Date())
  dateStore.setDate(today)

  const uuid = localStorage.getItem('uuid') || (() => {
      const newId = crypto.randomUUID()
      localStorage.setItem('uuid', newId)
      return newId
  })()

  const url = window.location.href
  const page_name = ref('')

  if (url.includes('menus')) {
    page_name.value = 'menus_view'
  }
  else if (url.includes('review')) {
    page_name.value = 'review_view'
  }

  logStore.addLog({
    user_id: uuid,
    event_name: 'click_home_button',
    event_value: null,
    page_name: page_name.value,
    event_time: getKSTDateTimeStringWithMs(new Date()),
  })

  router.push({ name: 'menus', params: { date: today } })
}

// 캘린더에서 날짜 선택
const onDateChange = (e) => {
  const selectedDate = e.target.value
  if (selectedDate && selectedDate !== lastSelectedDate.value) {
    lastSelectedDate.value = selectedDate
    dateStore.setDate(selectedDate)

    const uuid = localStorage.getItem('uuid') || (() => {
      const newId = crypto.randomUUID()
      localStorage.setItem('uuid', newId)
      return newId
    })()

    logStore.addLog({
      user_id: uuid,
      event_name: 'click_calendar',
      event_value: selectedDate,
      page_name: page_name.value,
      event_time: getKSTDateTimeStringWithMs(new Date()),
    })

    router.push({ name: 'menus', params: { date: selectedDate } })
  }
}

const openDatePicker = () => {
  dateInput.value?.click()
}
</script>

<style scoped>
.icon {
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.calendar-wrapper {
  width: 35px;
  height: 35px;
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

/* 제목 텍스트 스타일 */
.title-text {
  font-family: 'GmarketSansBold';
  white-space: nowrap;
  font-size: 1.5rem;
}

/* 모바일 화면에서 폰트 크기 줄이기 */
@media (max-width: 576px) {
  .title-text {
    font-size: 1.1rem;
  }
}
</style>
