import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { formatKSTDate } from '../utils/date'

export const useMenuStore = defineStore('menu', () => {
  const menus = ref([])
  const currentDate = ref(formatKSTDate(new Date()))
  const selectedDate = ref(null)
  const selectedMenu = ref([])
  const API_URL = 'http://127.0.0.1:8000'

  const getMenus = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/menus/${currentDate.value}`)
      menus.value = response.data
    } catch (error) {
      console.error('메뉴 데이터 요청 실패:', error)
    }
  }

  const getMenusByDate = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/menus/${selectedDate.value}`)
      menus.value = response.data
    } catch (error) {
      console.error('메뉴 데이터 요청 실패:', error)
    }
  }

  return { menus, selectedMenu, getMenus, getMenusByDate }
})
