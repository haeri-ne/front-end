<template>
  <div>
    <Header />

    <br><br><br>

    <!-- 메뉴 카드 영역 -->
    <div class="container d-flex flex-column align-items-center">
      <div class="row gx-4 gy-3 w-100 justify-content-center text-center">
        <!-- 메뉴 카드 1 -->
        <div class="col-md-5 col-10">
          <MenuCard
            v-if="menuStore.menus.length > 0"
            :menu="menuStore.menus[0]"
            :menuIndex="0"
          />
        </div>

        <!-- 메뉴 카드 2 -->
        <div class="col-md-5 col-10">
          <MenuCard
            v-if="menuStore.menus.length > 1"
            :menu="menuStore.menus[1]"
            :menuIndex="1"
          />
        </div>
      </div>

      <!-- 안내 문구 -->
      <p class="text-center mt-3" style="font-family: 'GmarketSansMedium';">
        별점을 남길 식단표를 눌러주세요
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useMenuStore } from '../store/menuStore'
import { useDateStore } from '../store/dateStore'
import Header from '../components/Header.vue'
import MenuCard from '../components/MenuCard.vue'

const menuStore = useMenuStore()
const dateStore = useDateStore()

// 페이지 로딩 시 및 날짜 변경 시 메뉴 데이터 가져오기
onMounted(() => {
  menuStore.getMenusByDate()
})

// 달력에서 날짜 선택으로 인해 해당 날짜의 메뉴를 가져와야 하는 경우 처리
watch(
  () => dateStore.date,
  () => {
    menuStore.getMenusByDate()
  }
)
</script>

<style scoped>
.container {
  max-width: 960px;
}

.row {
  margin-top: 20px;
}
</style>
