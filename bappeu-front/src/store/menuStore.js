import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useDateStore } from '../store/dateStore'
import axios from 'axios'

export const useMenuStore = defineStore('menu', () => {
  const API_URL = 'http://127.0.0.1:8000'
  const menus = ref([])
  const selectedMenu = ref([])
  const dateStore = useDateStore()

  const date = computed(() => dateStore.date)

  const getMenusByDate = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/menus/${date.value}`)
      menus.value = response.data
    } catch (error) {
      console.error('메뉴 데이터 요청 실패:', error)
    }
  }

  return { 
    menus, selectedMenu, 
    getMenusByDate 
  }
})
