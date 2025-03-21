<template>
  <div>
    <Header />
    <ReviewCard :menu="menuStore.selectedMenu" />
  </div>
</template>

<script setup>
import { useMenuStore } from '../store/menuStore'
import Header from '../components/Header.vue'
import ReviewCard from '../components/ReviewCard.vue'

const menuStore = useMenuStore()
</script>
