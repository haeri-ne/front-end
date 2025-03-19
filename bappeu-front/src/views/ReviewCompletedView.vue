<template>
  <div class="container text-center mt-5">
    <div class="card p-5 shadow-lg">
      <h1 class="text-primary mb-3">리뷰 제출 완료!</h1>
      <p class="fs-5">소중한 평가를 해주셔서 감사합니다. 😊</p>
      <button class="btn btn-primary mt-3" @click="$router.push('/')">홈으로 이동</button>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container {
  max-width: 500px;
}
.card {
  border-radius: 12px;
  background-color: #f8f9fa;
}
</style>