<template>
  <div class="right-card">
    <h1 style="color: aquamarine">听说你是 我画你猜 的高手</h1>
    <img :src="currentItem?.url" alt="展示图片" class="card-image" />
    <p class="tips">{{ currentItem?.tips }}</p>
    <div class="switch-buttons">
      <button @click="$emit('prev-image')">上一张</button>
      <button @click="$emit('next-image')">下一张</button>
    </div>
    <input type="text" v-model="inputValue" placeholder="请输入答案" class="card-input" />
    <button class="card-button" @click="$emit('submit', inputValue)">提交</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps } from 'vue'
import type { ImageItem } from '../types'

const props = defineProps<{ currentItem: ImageItem | null }>()

const inputValue = ref('')
watch(() => props.currentItem, () => inputValue.value = '')
</script>

<style scoped>
.right-card {
  position: fixed;
  right: 15rem;
  top: calc(50% + 1.75rem);
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1rem;
  width: 25rem;
  color: white;
  box-shadow: 0 0.4rem 2rem rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
}

.card-image {
  width: 100%;
  max-height: 15rem;
  object-fit: contain;
  border-radius: 0.5rem;
}

.card-input {
  width: 95%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
}

.card-button {
  width: 100%;
  padding: 0.5rem 0;
  border: none;
  border-radius: 0.5rem;
  background: #836fff;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.card-button:hover {
  background: #a18fff;
}

.switch-buttons {
  width: 100%;
  display: flex;
  gap: 0.5rem;
}

.switch-buttons button {
  flex: 1;
  padding: 0.4rem 0;
  border: none;
  border-radius: 0.5rem;
  background: #555;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

.switch-buttons button:hover {
  background: #777;
}

/* 手机端适配 */
@media (max-width: 768px) {
  .right-card {
    position: relative !important;
    top: auto !important;
    right: auto !important;
    transform: none !important;
    width: 90%;
    margin: 1rem auto;
    padding-top: 4rem;
  }

  .switch-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }

  .card-image { max-height: 12rem; }
}

</style>
