<template>
  <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
    <div class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h2 class="mt-3">잠시만 기다려 주세요...</h2>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useDateStore } from '../store/dateStore'
import { formatKSTDate } from '../utils/KSTDate'

const router = useRouter()
const dateStore = useDateStore()

onMounted(() => {
  setTimeout(() => {
    const today = formatKSTDate(new Date())
    dateStore.setDate(today)
    router.replace(`/menus/${today}`)
  }, 500)
})
</script>


<style scoped>
.spinner-border {
  width: 4rem;
  height: 4rem;
}
</style>
