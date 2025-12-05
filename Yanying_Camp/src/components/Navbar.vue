<template>
  <nav class="navbar">
    <ul>
      <li
        v-for="item in menuItems"
        :key="item.path"
        @click="$emit('nav-click', item.path)"
        :class="{ active: currentPath === item.path }"
      >
        {{ item.name }}
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { MenuItem } from '@/types/index.ts'

const route = useRoute()

const menuItems = ref<MenuItem[]>([
  { name:'首页', path:'/' },
  { name:'江湖行', path:'/jhx' },
  { name:'风闻', path:'/fw' },
  { name:'我的', path:'/my' },
  { name:'加入我们', path:'/join' }
])

// 监听当前路径
const currentPath = computed(() => route.path)
</script>


<style scoped>
.navbar {
  position: fixed;
  font-size: 2.2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,0.1);
  color: white;
  z-index: 1000;
}

.navbar ul {
  width: 100%;
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar ul li {
  cursor: pointer;
  transition: color 0.3s;
  font-size: 1rem;
}

.navbar ul li:hover {
  color: #836fff;
}

.navbar ul li.active {
  position: relative;
  color: #836fff;
}

.navbar ul li.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.2rem; /* 下划线位置 */
  width: 100%;
  height: 2px;
  background-color: #ff69b4; /* 粉红色下划线 */
  border-radius: 1px;
}



/* 手机端适配 */
@media (max-width: 768px) {
  .navbar { font-size: 1rem; height: 3rem; }
}

</style>
