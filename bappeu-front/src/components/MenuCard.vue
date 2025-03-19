<template>
  <div class="menu-card" @click="goToReview">
    <ul>
      <li v-for="food in menu.foods" :key="food.id">
        {{ food.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useMenuStore } from '../store/menuStore'
import { useRouter } from 'vue-router'

const props = defineProps({
  menu: Object,
  menuIndex: Number
})

const menuStore = useMenuStore()
const router = useRouter()

const goToReview = () => {
  menuStore.selectedMenu = props.menu
  router.push({
    name: 'review',
    params: {
      date: props.menu.date.split('T')[0],
      menuIndex: props.menuIndex
    }
  })
}
</script>

<style scoped>
.menu-card {
  background-color: #60C9EF;
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s
}

.menu-card:hover {
  transform: scale(1.05)
}

.menu-card ul {
  padding: 0;
  list-style-type: none
}

.menu-card li {
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0
}
</style>
