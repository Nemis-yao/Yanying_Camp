<!-- FloatingNavCapsule.vue -->
<template>
  <div class="floating-nav">
    <div
      v-for="item in navItems"
      :key="item.label"
      class="nav-btn"
      :title="item.label"
      @click="goTo(item.link)"
    >
      {{ item.icon }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

interface NavItem {
  label: string
  icon: string
  link: string
}

const props = defineProps<{
  navItems: NavItem[]
}>()

const router = useRouter()
const goTo = (url: string) => {
  if (url == '/JianHuXing' || url == '/'){
    router.push(url)
  } else {
    ElMessage.primary('太懒了，没开发')
  }

}
</script>

<style scoped>
.floating-nav {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: row;          /* 横向排列按钮 */
  align-items: center;
  gap: 12px;
  padding: 8px 12px;           /* 胶囊内边距 */
  border-radius: 9999px;        /* 胶囊形 */
  background-color: rgba(113, 108, 108, 0.44); /* 半透明背景 */
  backdrop-filter: blur(10px);                  /* 毛玻璃效果 */
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
  z-index: 1000;
}

.nav-btn {
  width: 40px;
  height: 40px;
  background-color: rgba(255,255,255,0.1);  /* 半透明按钮背景 */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #836FFF;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.2s, transform 0.2s, color 0.2s;
}

.nav-btn:hover {
  background-color: rgba(255,255,255,0.3);
  transform: scale(1.1);
  color: #6a55cc;
}
</style>
