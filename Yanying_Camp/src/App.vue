<template>
  <router-view></router-view>
  <FloatingNav :navItems="navItems" />
</template>
<script lang="ts" setup>
import FloatingNav from "@/components/FloatingNav.vue";
const navItems = [
  { label: '首页', icon: '📰', link: '/' },
  { label: '江湖行', icon: '🗺️', link: '/JianHuXing' },
  { label: '我的', icon: '👤', link: '/my' },
  { label: '加入我们', icon: '🤝', link: '/join' },
  { label: '打本攻略', icon: '⚔️', link: '/guide' },
  { label: '其他', icon: '⚙️', link: '/other' },
]
</script>

<style>
</style>
