<template>
  <div class="container mt-4">
    <div class="card shadow-sm p-3" @click="goToReview">
      <h5 class="card-title text-center text-primary">Menu</h5>
      <ul class="list-group list-group-flush">
        <li
          v-for="(food, index) in [...menu.foods, ...Array(6 - menu.foods.length).fill({ name: ' ' })].slice(0, 6)"
          :key="index"
          class="list-group-item text-center fixed-height"
        >
          {{ food.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMenuStore } from '../store/menuStore'
import { useDateStore } from '../store/dateStore'

const props = defineProps({
  menu: Object,
  menuIndex: Number
})

const router = useRouter()
const menuStore = useMenuStore()
const dateStore = useDateStore()

const goToReview = () => {
  menuStore.selectedMenu = props.menu
  router.push({
    name: 'review',
    params: {
      date: dateStore.date,
      menuIndex: props.menuIndex
    }
  })
}
</script>

<style scoped>
.card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

.list-group-item {
  min-height: 40px; /* 고정된 높이 설정 */
  white-space: pre; /* 빈 항목도 일정한 높이 유지 */
}
</style>
