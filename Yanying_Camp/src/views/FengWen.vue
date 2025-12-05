<template>
  <div class="adventure-game">
    <header class="header">
      <h1>《宿命之巅》 · 修仙文字冒险</h1>
    </header>

    <main v-if="!loading && !error" class="main-content">
      <!-- 剧情章节 -->
      <section v-if="!currentEnding" class="chapter-section">
        <h2 class="chapter-title">{{ currentChapter?.title }}</h2>
        <article class="chapter-body">
          <p v-for="(para, idx) in paragraphs" :key="idx">{{ para }}</p>
        </article>

        <ul class="choices" v-if="currentChapter?.choices?.length">
          <li
            v-for="(c, i) in currentChapter!.choices"
            :key="i"
            class="choice-item"
            @click="choose(c)"
          >
            {{ c.text }}
          </li>
        </ul>

        <div v-else class="end-placeholder">
          <p>暂无可选路径</p>
          <button class="btn-restart" @click="restart">重新开始</button>
        </div>
      </section>

      <!-- 结局显示 -->
      <section v-else class="ending-section">
        <h2 class="ending-title">结局 · {{ currentEnding.title }}</h2>
        <p class="ending-desc">{{ currentEnding.desc }}</p>
        <button class="btn-restart" @click="restart">重新开始</button>
      </section>
    </main>

    <div v-if="loading" class="loading">加载剧情中...</div>
    <div v-if="error" class="error">加载失败：{{ error }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import type { Chapter, Ending, Choice } from '@/story/types';
import { loadChapters, loadEndings } from '@/story/storyLoader';
import { StoryEngine } from '@/story/storyEngine';

const loading = ref(true);
const error = ref<string | null>(null);
const engine = ref<StoryEngine | null>(null);
const currentEnding = ref<Ending | null>(null);

const currentChapter = computed<Chapter | null>(() => engine.value?.current ?? null);

const paragraphs = computed(() => {
  if (!currentChapter.value) return [];
  return currentChapter.value.body.trim().split(/\r?\n+/).map(s => s.trim());
});

async function init() {
  loading.value = true;
  error.value = null;
  try {
    const [chapters, endings] = await Promise.all([loadChapters(), loadEndings()]);
    engine.value = new StoryEngine(chapters, endings, 'start');
    currentEnding.value = null;
  } catch (err: any) {
    console.error(err);
    error.value = err?.message ?? String(err);
  } finally {
    loading.value = false;
  }
}

function choose(choice: Choice) {
  if (!engine.value) return;
  const res = engine.value.next(choice.to);
  if (!res) {
    error.value = `无法跳转到 ${choice.to}`;
    return;
  }
  if ((res as Ending).desc !== undefined && (res as Chapter).body === undefined) {
    currentEnding.value = res as Ending;
  } else {
    currentEnding.value = null;
  }
}

function restart() {
  init();
}

onMounted(() => {
  init();
});
</script>

<style scoped>
  /* 整体布局 */
.adventure-game {
  max-width: 800px;
  margin: 24px auto;
  font-family: 'Helvetica Neue', Arial, 'Microsoft YaHei', sans-serif;
  color: #fff;
  padding: 0 16px;
  background: url('../../public/bg.png') no-repeat center/cover; /* 可以放背景图 */
  min-height: 95vh;
}

/* 头部 */
.header {
  text-align: center;
  margin-bottom: 24px;
  text-shadow: 0 2px 6px rgba(0,0,0,0.5);
}
.header h1 {
  font-size: 2rem;
  font-weight: bold;
}

/* 主体 */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 剧情章节与结局卡片 */
.chapter-section, .ending-section {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.chapter-section:hover, .ending-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.35);
}

/* 标题 */
.chapter-title, .ending-title {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

/* 正文 */
.chapter-body p, .ending-desc {
  line-height: 1.8;
  margin-bottom: 12px;
  font-size: 1rem;
  color: #f0f0f0;
}

/* 选项列表 */
.choices {
  list-style: none;
  padding: 0;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.choice-item {
  cursor: pointer;
  background: rgba(255,255,255,0.25);
  color: #fff;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 500;
  text-align: center;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.2s ease, transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.choice-item:hover {
  background: rgba(255,255,255,0.35);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.25);
}

/* 按钮 */
.btn-restart {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: rgba(255,255,255,0.25);
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: all 0.2s ease, transform 0.2s ease;
}
.btn-restart:hover {
  background: rgba(255,255,255,0.35);
  transform: translateY(-2px);
}

/* 加载和错误 */
.loading, .error {
  text-align: center;
  margin: 20px 0;
  font-size: 1rem;
}
.error {
  color: #ff6666;
  font-weight: 500;
}
</style>

