<template>
  <div class="modal">
    <div class="gufeng-box">
      <div class="decor-top"></div>
      <h2 class="title">{{ title }}</h2>
      <p class="content">{{ content }}</p>
      <button class="next-btn" @click="$emit('next')">{{ buttonText }}</button>
      <div class="decor-bottom"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  title: string
  content: string
  buttonText: string
}>()
</script>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.gufeng-box {
  width: 90%;
  max-width: 22rem;
  padding: 1rem 1.5rem;
  background: rgba(30, 30, 30, 0.85);
  border: 0.125rem solid rgba(200, 180, 140, 0.8);
  border-radius: 0.625rem;
  color: #e8dfc8;
  text-align: center;
  position: relative;
  box-shadow: 0 0 1.5rem rgba(0,0,0,0.5);
  animation: popup 0.25s ease;
}

.decor-top,
.decor-bottom {
  width: 100%;
  height: 1rem;
  background: url('/decor/scroll_bar.png') center/contain no-repeat;
  margin-bottom: 0.625rem;
}

.title {
  font-size: 1.5rem;
  margin: 0.625rem 0;
  color: #f0e7d8;
  font-weight: bold;
  letter-spacing: 0.125rem;
}

.content {
  color: #e6dcc6;
  font-size: 1rem;
  margin: 0.625rem 0 1.25rem;
}

.next-btn {
  background: linear-gradient(#d1c097, #a8946a);
  color: #3c2e1f;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: transform .2s;
}
.next-btn:hover { transform: scale(1.06); }

/* 弹出动画 */
@keyframes popup {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* 手机端适配 */
@media (max-width: 768px) {
  .gufeng-box { max-width: 95%; width: 95%; }
}

</style>
