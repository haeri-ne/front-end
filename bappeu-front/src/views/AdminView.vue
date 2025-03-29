<template>
  <div class="container mt-4">
    <div class="card p-4 shadow-sm">

      <!-- ✅ 로그인 폼 -->
      <template v-if="!isLoggedIn">
        <h4 class="text-center mb-3">관리자 로그인</h4>
        <div class="mb-3">
          <label class="form-label">아이디</label>
          <input type="text" class="form-control" v-model="username" />
        </div>
        <div class="mb-3">
          <label class="form-label">비밀번호</label>
          <input type="password" class="form-control" v-model="password" />
        </div>
        <div class="text-center mt-3">
          <button class="btn btn-primary px-4" @click="login">로그인</button>
        </div>
      </template>

      <!-- ✅ 로그인 후: 식단 입력 폼 -->
      <template v-else>
        <h4 class="text-center mb-3">식단 입력</h4>

        <!-- 날짜 선택 -->
        <div class="mb-3">
          <label class="form-label">날짜 선택</label>
          <input type="date" class="form-control" v-model="date" />
        </div>

        <!-- 메뉴 입력 (2개) -->
        <div class="row">
          <div class="col-md-6">
            <div class="card p-3">
              <h5 class="text-center">메뉴 1</h5>
              <div v-for="(value, index) in inputs1" :key="index" class="mb-2">
                <input type="text" class="form-control" v-model="inputs1[index]" placeholder="메뉴 입력" />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card p-3">
              <h5 class="text-center">메뉴 2</h5>
              <div v-for="(value, index) in inputs2" :key="index" class="mb-2">
                <input type="text" class="form-control" v-model="inputs2[index]" placeholder="메뉴 입력" />
              </div>
            </div>
          </div>
        </div>

        <!-- 제출/로그아웃 버튼 -->
        <div class="text-center mt-3">
          <button class="btn btn-primary px-4 me-2" @click="submitData">제출</button>
          <button class="btn btn-secondary px-4" @click="logout">로그아웃</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// 로그인 관련 상태
const isLoggedIn = ref(false)
const username = ref('')
const password = ref('')
const token = ref('')

// 로그인 요청
const login = async () => {
  try {
    const res = await axios.post('http://127.0.0.1:8000/login', {
      username: username.value,
      password: password.value
    })

    token.value = res.data.access_token
    localStorage.setItem('token', token.value)
    isLoggedIn.value = true
    username.value = ''
    password.value = ''
  } catch (err) {
    console.error('로그인 실패:', err)
    alert('아이디 또는 비밀번호가 틀렸습니다.')
  }
}

// 로그아웃
const logout = () => {
  isLoggedIn.value = false
  token.value = ''
  localStorage.removeItem('token')
}

// 로그인 유지
onMounted(() => {
  const saved = localStorage.getItem('token')
  if (saved) {
    token.value = saved
    isLoggedIn.value = true
  }
})

// 식단 입력 관련 상태
const date = ref('')
const inputs1 = ref(Array(6).fill(''))
const inputs2 = ref(Array(6).fill(''))

const foods1 = computed(() => inputs1.value.filter(v => v.trim() !== ''))
const foods2 = computed(() => inputs2.value.filter(v => v.trim() !== ''))

// 식단 제출
const submitData = async () => {
  if (!date.value) {
    alert('날짜를 선택해주세요.')
    return
  }

  const hasEmpty = inputs1.value.includes('') || inputs2.value.includes('')
  if (hasEmpty && !confirm('메뉴를 모두 입력하지 않았습니다. 그래도 제출하시겠습니까?')) {
    return
  }

  try {
    const API_URL = 'http://127.0.0.1:8000/api/v1/menus/'

    await axios.post(API_URL, {
      foods: foods1.value,
      date: date.value
    }, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    await axios.post(API_URL, {
      foods: foods2.value,
      date: date.value
    }, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    alert('제출 성공!')
    date.value = ''
    inputs1.value = Array(6).fill('')
    inputs2.value = Array(6).fill('')
  } catch (error) {
    console.error('제출 실패:', error)
    alert('제출 실패! 인증 정보를 확인하세요.')
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
