<template>
  <div class="container">
    <Calendar />
    <button class="go-to-menus" @click="goToMenus" :disabled="!menuStore.date">
      평가하러 가기
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMenuStore } from '../store/menuStore'
import Calendar from '../components/Calendar.vue'

const router = useRouter()
const menuStore = useMenuStore()

const goToMenus = () => {
  menuStore.menus = []
  if (menuStore.date) {
    router.push({ name: 'menus', params: { date: menuStore.date } })
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px
}

.go-to-menus {
  width: 100%;
  max-width: 200px;
  margin-top: 20px;
  padding: 10px;
  background-color: #60C9EF;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer
}

.go-to-menus:disabled {
  background-color: #ccc;
  cursor: not-allowed
}
</style>
