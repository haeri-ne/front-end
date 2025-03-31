import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useDateStore } from '../store/dateStore'
import { useLogStore } from './logStore'
import axios from 'axios'

export const useMenuStore = defineStore('menu', () => {
  const API_URL = 'http://127.0.0.1:8000'
  const menus = ref([])
  const selectedMenu = ref([])
  const dateStore = useDateStore()

  const date = computed(() => dateStore.date)

  const getMenusByDate = async () => {
    try {
      const uuid = localStorage.getItem('uuid') || (() => {
        const newId = crypto.randomUUID()
        localStorage.setItem('uuid', newId)
        return newId
      })()

      const response = await axios.get(`${API_URL}/api/v1/menus/${date.value}`,
        {
          headers: {
            'user-id': uuid
          }
        }
      )
      menus.value = response.data
    } catch (error) {
      menus.value = []
    }
  }

  return { 
    menus, selectedMenu, 
    getMenusByDate
  }
})
