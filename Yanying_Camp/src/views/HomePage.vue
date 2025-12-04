<template>
  <div v-float class="bg">
    <Navbar @nav-click="navClick" />
    <LeftCard @open-step="openStep" @details="showDetails" />
    <RightCard
      :currentItem="currentItem"
      @prev-image="prevImage"
      @next-image="nextImage"
      @submit="handleSubmit"
    />
    <GufengModal
      v-if="step>0"
      :title="modalTitle"
      :content="modalContent"
      :buttonText="modalButton"
      @next="nextStep"
    />
    <GufengModal
      v-if="isDetails"
      title="详情"
      content="我劝你不要加入这个百业，因为这个百业有一个传说..."
      buttonText="TQDD"
      @next="closeDetails"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { ImageItem, CheckAnswerResult } from '../types'
import Navbar from '../components/Navbar.vue'
import LeftCard from '../components/LeftCard.vue'
import RightCard from '../components/RightCard.vue'
import GufengModal from '../components/GufengModal.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const images: ImageItem[] = [
  { url:'/images/六神无主.png', tips:'四个字--成语' },
  { url:'/images/绝望的笑容.png', tips:'五个字--书名' },
  { url:'/images/跳伞.png', tips:'两个字--运动' }
]

const currentIndex = ref(0)
const currentItem = computed(() => images[currentIndex.value])
const inputValue = ref('')
const questionIndex = ref(0)
const step = ref(0)
const isDetails = ref(false)

function prevImage() { currentIndex.value = (currentIndex.value -1 + images.length) % images.length }
function nextImage() { currentIndex.value = (currentIndex.value +1) % images.length }

function handleSubmit(value: string) {
  if (!value) { ElMessage({ message:'请输入答案', type:'warning' }); return }
  const answer = getImageName(currentItem.value.url!)
  const result = checkAnswer(value, answer)
  if (result.isCorrect) {
    ElMessage({ message:'你一定是一个天才', type:'success' })
    nextImage()
  } else if (result.overlapChars.length > 0) {
    questionIndex.value++
    ElMessage({ message:`正确答案包含：${result.overlapChars}`, type:'success' })
  } else {
    questionIndex.value++
    ElMessage({ message:'一个正确的都没有', type:'error' })
  }
  if (questionIndex.value >= images.length) { questionIndex.value = 0; inputValue.value = '' }
}

function getImageName(url: string) { return url.split('/').pop()?.split('.').shift() ?? '' }

function checkAnswer(input: string, answer: string): CheckAnswerResult {
  const isCorrect = input === answer
  const overlapChars = Array.from(new Set([...input].filter(c => answer.includes(c))))
  return { isCorrect, overlapChars }
}

// 弹窗逻辑
function openStep(s: number) { step.value = s }
function nextStep() { step.value < 3 ? step.value++ : step.value = 0 }
function showDetails() { isDetails.value = true }
function closeDetails() { isDetails.value = false }

const modalTitle = computed(() => step.value===1?'初见宗门': step.value===2?'又遇宗门':'拜入宗门')
const modalContent = computed(() => step.value===1?'俺不中类，你居然真的想加入我们。': step.value===2?'俺不中类，你居然没有退出？':'俺不中类，你居然真的要加入，请在《燕云十六声》中搜索。')
const modalButton = computed(() => step.value<3?'确定':'加入成功（？）')

// 导航点击
function navClick(path: string) {
  if (path === '/fw') {
    ElMessageBox.alert('其实我也没有开发好', '别生气', { confirmButtonText:'OK' })
    return
  }
  // 其他情况提示
}
</script>

<style scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background-image: url("/bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

</style>
