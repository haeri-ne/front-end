<template>
  <div>
    <Header />

    <br><br><br>

    <!-- 선택된 메뉴에 대한 리뷰 카드 -->
    <ReviewCard :menu="menuStore.selectedMenu" />
  </div>
</template>

<script setup>
import { useMenuStore } from '../store/menuStore'
import Header from '../components/Header.vue'
import ReviewCard from '../components/ReviewCard.vue'

const menuStore = useMenuStore()
</script>
