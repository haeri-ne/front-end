import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useLogStore = defineStore('log', () => {
  const logs = ref([])

  const addLog = (log) => {
    logs.value.push(log)
    // console.log(logs.value)
  }

  const sendLogs = async () => {
    if (logs.value.length === 0) return
  
    const logsToSend = [...logs.value]
    const userId = logsToSend[0]?.user_id || ''
  
    try {
      await axios.post('http://127.0.0.1:8000/api/v1/logs/front', logsToSend, {
        headers: {
          'Content-Type': 'application/json',
          'user_id': userId
        }
      })
      logs.value = [] // 성공 시 로그 초기화
    } catch (error) {
      console.error('로그 전송 실패:', error)
    }
  }

  return {
    logs, 
    addLog, sendLogs
  }
})