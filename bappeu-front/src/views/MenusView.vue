<template>
  <div>
    <Header />

    <!-- 메뉴 카드 영역 -->
    <div class="main-content container d-flex flex-column justify-content-center align-items-center text-center">
      <div class="row gx-4 gy-3 w-100 justify-content-center">
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
      <p class="mt-3" style="font-family: 'GmarketSansMedium';">
        별점을 남길 식단표를 눌러주세요
      </p>
    </div>
  </div>
</template>

<script setup>

import { useMenuStore } from '../store/menuStore'
import { useDateStore } from '../store/dateStore'
import { useLogStore } from '../store/logStore'
import { formatKSTDate, getKSTDateTimeStringWithMs } from '../utils/KSTDate'
import Header from '../components/Header.vue'
import MenuCard from '../components/MenuCard.vue'

const menuStore = useMenuStore()
const dateStore = useDateStore()
const logStore = useLogStore()

onMounted(() => {
  menuStore.getMenusByDate()

  const uuid = localStorage.getItem('uuid') || (() => {
      const newId = crypto.randomUUID()
      localStorage.setItem('uuid', newId)
      return newId
  })()

  logStore.addLog({
    user_id: uuid,
    event_name: 'view_menus_screen',
    event_value: null,
    page_name: 'menus_view',
    event_time: getKSTDateTimeStringWithMs(new Date()),
  })
})

onActivated(() => { // 뒤로 가기 등으로 다시 진입할 때 실행
  const uuid = localStorage.getItem('uuid') || (() => {
      const newId = crypto.randomUUID()
      localStorage.setItem('uuid', newId)
      return newId
  })()

  logStore.addLog({
    user_id: uuid,
    event_name: 'view_menus_screen',
    event_value: null,
    page_name: 'menus_view',
    event_time: getKSTDateTimeStringWithMs(new Date()),
  })
})

watch(
  () => dateStore.date,
  async () => {
    await menuStore.getMenusByDate()
  }
)
</script>

<style scoped>
.container {
  max-width: 960px;
}

/* 중앙 정렬을 위한 main-content 스타일 */
.main-content {
  min-height: calc(100vh - 120px); /* 헤더 높이에 맞춰 조정 (예: 120px) */
  padding: 20px;
}

/* 여유 있는 위쪽 마진 */
.row {
  margin-top: 20px;
}
</style>
