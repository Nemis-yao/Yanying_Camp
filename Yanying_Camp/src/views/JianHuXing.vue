<template>
  <div class="page">
    <h1 class="page-title">文案列表</h1>
    <RecycleScroller
      :items="items"
      key-field="id"
      class="list"
      :item-size="80"
      v-slot="{ item }"
    >
      <div class="item">
        <p class="text">{{ item.text }}</p>
        <button class="copy-btn" @click="copyText(item.text)">复制</button>
      </div>
    </RecycleScroller>

    <div ref="loadTrigger" class="load-trigger">正在加载更多...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'
import texts from '@/data/texts.json'

interface TextItem {
  id: number
  text: string
}

const items: Ref<TextItem[]> = ref([])
let page = 1
const loadTrigger = ref<HTMLDivElement | null>(null)

function loadMore() {
  const size = 50
  const start = (page - 1) * size
  const end = page * size

  const slice = texts.list.slice(start, end)
  if (slice.length > 0) {
    items.value.push(...slice)
    page++
  }
}

function copyText(text: string) {
  navigator.clipboard.writeText(text)
}

onMounted(() => {
  loadMore()

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore()
    }
  })

  if (loadTrigger.value) observer.observe(loadTrigger.value)
})
</script>

<style scoped>
.page {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f7f5ff; /* 柔和背景紫 */
  min-height: 100vh;
}

.page-title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #6a4cff; /* 主标题紫色 */
}

.list {
  height: calc(100vh - 120px);
  overflow-y: auto;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  padding: 8px 0;
}

.item {
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;
}

.item:hover {
  background-color: #f0f0ff; /* 悬浮紫色淡背景 */
}

.text {
  max-width: 75%;
  word-break: break-word;
  font-size: 16px;
  color: #4b3cc4; /* 文案文字紫色 */
}

.copy-btn {
  padding: 6px 14px;
  border: none;
  background-color: #836FFF; /* 主按钮紫色 */
  color: #fff;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.copy-btn:hover {
  background-color: #6b5edb; /* 悬浮按钮紫 */
}

.load-trigger {
  padding: 20px;
  text-align: center;
  color: #888;
  font-size: 14px;
}

</style>
