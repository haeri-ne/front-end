<template>
  <div>
    <Header />
    <div class="row justify-content-center">
      <div class="col-md-6 col-12 mb-3">
        <MenuCard v-if="menuStore.menus.length > 0" :menu="menuStore.menus[0]" :menuIndex="0" />
      </div>
      <div class="col-md-6 col-12 mb-3">
        <MenuCard v-if="menuStore.menus.length > 1" :menu="menuStore.menus[1]" :menuIndex="1" />
      </div>
      <p class="text-center">별점을 남길 식단표를 눌러주세요</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMenuStore } from '../store/menuStore'
import Header from '../components/Header.vue'
import MenuCard from '../components/MenuCard.vue'

const menuStore = useMenuStore()

onMounted(async () => {
  await menuStore.getMenusByDate()
})
</script>