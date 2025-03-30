<template>
  <div class="container mt-4">
    <div class="card shadow-sm p-3" @click="goToReview">
      <!-- 메뉴 제목 -->
      <h5 class="card-title text-center text-primary">Menu</h5>

      <!-- 메뉴 리스트 (항목 6개 고정) -->
      <ul class="list-group list-group-flush">
        <li
          v-for="(food, index) in paddedFoods"
          :key="index"
          class="list-group-item text-center"
          style="font-family: 'GmarketSansMedium';"
        >
          {{ food.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMenuStore } from '../store/menuStore'
import { useDateStore } from '../store/dateStore'
import { useLogStore } from '../store/logStore'

// props: 메뉴 정보 및 인덱스
const props = defineProps({
  menu: Object,
  menuIndex: Number
})

const router = useRouter()
const menuStore = useMenuStore()
const dateStore = useDateStore()
const logStore = useLogStore()

// 메뉴 항목이 6개보다 적을 경우 빈 항목으로 채움
const paddedFoods = [...props.menu.foods, ...Array(6 - props.menu.foods.length).fill({ name: ' ' })].slice(0, 6)

// 메뉴 클릭 시 리뷰 페이지로 이동
const goToReview = () => {
  menuStore.selectedMenu = props.menu

  const uuid = localStorage.getItem('uuid') || (() => {
      const newId = crypto.randomUUID()
      localStorage.setItem('uuid', newId)
      return newId
    })()

    logStore.addLog({
      user_id: uuid,
      event_name: 'click_menu',
      event_value: { menu_id: props.menu.id },
      page_name: 'menus_view',
      event_time: getKSTDateTimeStringWithMs(new Date()),
    })

  router.push({
    name: 'review',
    params: {
      date: dateStore.date,
      menuIndex: props.menuIndex
    }
  })
}
</script>

<style scoped>
.card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

.list-group-item {
  min-height: 40px;
  white-space: pre;
}
</style>