<template>
  <div class="container mt-4">
    <div class="card p-4 shadow-sm">
      <!-- 제목 -->
      <h4 class="text-center mb-3">식단 입력</h4>

      <!-- 날짜 선택 -->
      <div class="mb-3">
        <label class="form-label">날짜 선택</label>
        <input type="date" class="form-control" v-model="date" />
      </div>

      <!-- 메뉴 입력 폼 (2개 메뉴) -->
      <div class="row">
        <!-- 메뉴 1 -->
        <div class="col-md-6">
          <div class="card p-3">
            <h5 class="text-center">메뉴 1</h5>
            <div
              v-for="(value, index) in inputs1"
              :key="index"
              class="mb-2"
            >
              <input
                type="text"
                class="form-control"
                v-model="inputs1[index]"
                placeholder="메뉴 입력"
              />
            </div>
          </div>
        </div>

        <!-- 메뉴 2 -->
        <div class="col-md-6">
          <div class="card p-3">
            <h5 class="text-center">메뉴 2</h5>
            <div
              v-for="(value, index) in inputs2"
              :key="index"
              class="mb-2"
            >
              <input
                type="text"
                class="form-control"
                v-model="inputs2[index]"
                placeholder="메뉴 입력"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 제출 버튼 -->
      <div class="text-center mt-3">
        <button class="btn btn-primary px-4" @click="submitData">제출</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

// 날짜 및 메뉴 입력값
const date = ref('')
const inputs1 = ref(Array(6).fill(''))
const inputs2 = ref(Array(6).fill(''))

// 빈 값 제외한 실질적인 메뉴 리스트
const foods1 = computed(() => inputs1.value.filter(value => value.trim() !== ''))
const foods2 = computed(() => inputs2.value.filter(value => value.trim() !== ''))

// 데이터 제출 함수
const submitData = async () => {
  // 날짜 선택 확인
  if (!date.value) {
    alert('날짜를 선택해주세요.')
    return
  }

  // 입력되지 않은 항목이 있는 경우 확인
  const hasEmpty = inputs1.value.includes('') || inputs2.value.includes('')
  if (hasEmpty && !confirm('메뉴를 모두 입력하지 않았습니다. 그래도 제출하시겠습니까?')) {
    return
  }

  try {
    const API_URL = 'http://127.0.0.1:8000/api/v1/menus/'

    // POST 요청 (2번: 메뉴1, 메뉴2 따로 전송)
    const response1 = await axios.post(API_URL, {
      foods: foods1.value,
      date: date.value
    })
    console.log('식단표1 POST 성공:', response1.data)

    const response2 = await axios.post(API_URL, {
      foods: foods2.value,
      date: date.value
    })
    console.log('식단표2 POST 성공:', response2.data)

    // 입력 초기화
    date.value = ''
    inputs1.value = Array(6).fill('')
    inputs2.value = Array(6).fill('')

  } catch (error) {
    console.error('식단표 POST 실패:', error)
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}

.card {
  border-radius: 12px;
}
</style>
