<template>
  <div class="calendar">
    <h2>{{ currentYear }}.{{ currentMonth }}</h2>
    <div class="weekdays">
      <span v-for="day in daysOfWeek" :key="day">{{ day }}</span>
    </div>
    <div class="days">
      <span
        v-for="day in daysInMonth"
        :key="day"
        @click="selectDate(day)"
        :class="{ selected: menuStore.date === formatDate(day) }"
      >
        {{ day }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMenuStore } from '../store/menuStore'

const menuStore = useMenuStore()
const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = String(today.getMonth() + 1).padStart(2, '0')

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']
const daysInMonth = computed(() => new Date(currentYear, today.getMonth() + 1, 0).getDate())

const formatDate = day => `${currentYear}-${currentMonth}-${String(day).padStart(2, '0')}`

const selectDate = day => {
  menuStore.date = formatDate(day)
}
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  align-items: center
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px
}

.days span {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  cursor: pointer
}

.days span.selected {
  background-color: #60C9EF;
  color: white;
  font-weight: bold
}
</style>
