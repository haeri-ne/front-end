<template>
  <div class="container">    
    <br><br><br><br><br>
    <div class="menu-container">
      <MenuCard v-if="menuStore.menus.length > 0" :menu="menuStore.menus[0]" :menuIndex="0" />
      <MenuCard v-if="menuStore.menus.length > 1" :menu="menuStore.menus[1]" :menuIndex="1" />
    </div>
    <br>
    <p class="info-text">오늘 드신 식단을 눌러주세요</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import MenuCard from '../components/MenuCard.vue'
import { useMenuStore } from '../store/menuStore'

const menuStore = useMenuStore()

onMounted(async () => {
  await menuStore.getMenus()
})
</script>

<style scoped>
.menu-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto
}

/* 모바일 화면 (768px 이하) */
@media (max-width: 768px) {
  .menu-container {
    grid-template-columns: 1fr /* 한 줄에 하나씩 배치 */
  }
}

.info-text {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  margin-top: 20px
}
</style>
