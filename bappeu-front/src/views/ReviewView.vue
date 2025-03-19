<template>
  <div>
    <br><br>
    <ReviewCard :menu="menuStore.selectedMenu" />
  </div>
</template>

<script setup>
import { useMenuStore } from '../store/menuStore'
import ReviewCard from '../components/ReviewCard.vue'

const menuStore = useMenuStore()
</script>
