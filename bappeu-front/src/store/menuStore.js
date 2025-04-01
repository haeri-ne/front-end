import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useDateStore } from '../store/dateStore'
import { useLogStore } from './logStore'
import axios from 'axios'

export const useMenuStore = defineStore('menu', () => {
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

      const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/menus/${date.value}`

      const response = await axios.get(API_URL,
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
