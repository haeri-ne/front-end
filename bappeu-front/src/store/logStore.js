import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLogStore = defineStore('log', () => {
  const logs = ref([])

  const addLog = (log) => {
    logs.value.push(log)
    // console.log(logs.value)
  }

  const sendLogs = () => {
    if (logs.value.length === 0) return

    const logsToSend = [...logs.value]

    fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logsToSend)
    }).then(() => {
      logs.value = [] // 성공 시 로그 초기화
    }).catch((err) => {
      console.warn('로그 전송 실패:', err)
    })
    // try {
    //   console.log(logsToSend)
    // } catch (error) {
    //   console.warn('로그 전송 실패:', error)
    // }
  }

  return {
    logs, addLog, sendLogs
  }
})