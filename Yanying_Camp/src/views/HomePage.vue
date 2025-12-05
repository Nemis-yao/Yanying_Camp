<template>
  <div v-float class="bg">
    <el-row>
      <!--右边-->
      <el-col :span="8">
        <LeftCard @details="showDetails" @open-step="openStep"/>
      </el-col>
      <!--左边-->
      <el-col :span="16">
        <el-row justify="center">
          <p class="typing-text">{{ displayText }}</p>
        </el-row>
        <el-row justify="space-evenly">
          <el-col v-for="item in navBar_Top " :key="item" :span="6">
            <el-card class="frosted" shadow="hover" style="max-width: 480px">
              <img :src="item.img" alt="" class="" style="width: 100%">
              <template #footer>
                <div class="title">{{ item.title }}</div>
                <el-row>
                  <el-col :span="16">
                    <div class="description">{{ item.description }}</div>
                  </el-col>
                  <el-col :offset="6" :span="2" @click="goTo(item.link)">前往</el-col>
                </el-row>
              </template>
            </el-card>
          </el-col>
        </el-row>
        <el-row justify="space-evenly" style="margin-top: 2.5rem">
          <el-col v-for="item in navBar_bottom " :key="item" :span="6">
            <el-card class="frosted" shadow="hover" style="max-width: 480px">
              <img :src="item.img" alt="" class="" style="width: 100%">
              <template #footer>
                <div class="title">{{ item.title }}</div>
                <el-row>
                  <el-col :span="16">
                    <div class="description">{{ item.description }}</div>
                  </el-col>
                  <el-col :offset="6" :span="2" @click="goTo(item.link)">前往</el-col>
                </el-row>
              </template>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!--    <RightCard-->
    <!--      :currentItem="currentItem"-->
    <!--      @prev-image="prevImage"-->
    <!--      @next-image="nextImage"-->
    <!--      @submit="handleSubmit"-->
    <!--    />-->
    <GufengModal v-if="step>0" :buttonText="modalButton" :content="modalContent" :title="modalTitle"
                 @next="nextStep"/>
    <GufengModal v-if="isDetails" buttonText="TQDD"
                 content="我劝你不要加入这个百业，因为这个百业有一个传说..." title="详情"
                 @next="closeDetails"/>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue'
import type {CheckAnswerResult, ImageItem} from '../types'
import {ElMessage} from 'element-plus'
import LeftCard from "@/components/LeftCard.vue";
import GufengModal from "@/components/GufengModal.vue";
import {useRouter} from "vue-router";

const images: ImageItem[] = [
  {url: '/images/六神无主.png', tips: '四个字--成语'},
  {url: '/images/绝望的笑容.png', tips: '五个字--书名'},
  {url: '/images/跳伞.png', tips: '两个字--运动'}
]

const currentIndex = ref(0)
const currentItem = computed(() => images[currentIndex.value])
const inputValue = ref('')
const questionIndex = ref(0)
const step = ref(0)
const isDetails = ref(false)

function prevImage() {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

function handleSubmit(value: string) {
  if (!value) {
    ElMessage({message: '请输入答案', type: 'warning'});
    return
  }
  const answer = getImageName(currentItem.value.url!)
  const result = checkAnswer(value, answer)
  if (result.isCorrect) {
    ElMessage({message: '你一定是一个天才', type: 'success'})
    nextImage()
  } else if (result.overlapChars.length > 0) {
    questionIndex.value++
    ElMessage({message: `正确答案包含：${result.overlapChars}`, type: 'success'})
  } else {
    questionIndex.value++
    ElMessage({message: '一个正确的都没有', type: 'error'})
  }
  if (questionIndex.value >= images.length) {
    questionIndex.value = 0;
    inputValue.value = ''
  }
}

function getImageName(url: string) {
  return url.split('/').pop()?.split('.').shift() ?? ''
}

function checkAnswer(input: string, answer: string): CheckAnswerResult {
  const isCorrect = input === answer
  const overlapChars = Array.from(new Set([...input].filter(c => answer.includes(c))))
  return {isCorrect, overlapChars}
}

// 弹窗逻辑
function openStep(s: number) {
  step.value = s
}

function nextStep() {
  step.value < 3 ? step.value++ : step.value = 0
}

function showDetails() {
  isDetails.value = true
}

function closeDetails() {
  isDetails.value = false
}

const modalTitle = computed(() => step.value === 1 ? '初见宗门' : step.value === 2 ? '又遇宗门' : '拜入宗门')
const modalContent = computed(() => step.value === 1 ? '俺不中类，你居然真的想加入我们。' : step.value === 2 ? '俺不中类，你居然没有退出？' : '俺不中类，你居然真的要加入，请在《燕云十六声》中搜索。')
const modalButton = computed(() => step.value < 3 ? '确定' : '加入成功（？）')

const fullText = '“欢迎加入《俺不中类》，希望你在这里找到志同道合的朋友!”'
const displayText = ref('')

onMounted(() => {
  let index = 0
  const timer = setInterval(() => {
    displayText.value += fullText[index]
    index++
    if (index >= fullText.length) clearInterval(timer)
  }, 100) // 每个字符打字速度，单位 ms
})


// 导航栏-上半
const navBar_Top = ref([
  {
    id: 1,
    title: '江湖行',
    description: '这里全是串子文案，很适合你这个串子',
    img: '/nav/nav_1.png',
    link: '/JianHuXing',          // 点击跳转路径
  },
  {
    id: 2,
    title: '风闻',
    description: '这里目前还没有建设好',
    img: '/nav/nav_2.png',
    link: '/FW',          // 点击跳转路径
  },
  {
    id: 3,
    title: '我的',
    description: '别看了，一样没有建设好',
    img: '/nav/nav_3.png',
    link: '/My',          // 点击跳转路径
  },
])
const navBar_bottom = ref([
  {
    id: 1,
    title: '加入我们',
    description: '你居然还真的想加如我们',
    img: '/nav/nav_4.png',
    link: '/jion',          // 点击跳转路径
  },
  {
    id: 2,
    title: '打本攻略',
    description: '攻略？看什么攻略？跟对团队，坐牢和喝水一样简单',
    img: '/nav/nav_5.png',
    link: '/Strategy',          // 点击跳转路径
  },
  {
    id: 3,
    title: '其他',
    description: '一些乱七八糟的的东西',
    img: '/nav/nav_6.png',
    link: '/other',          // 点击跳转路径
  },
])
const router = useRouter()
const goTo = (url: string) => {
  router.push(url)
}

</script>

<style scoped>
.bg {
  width: 100vw;
  min-height: 100vh;
  background-image: url("/bg_1.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-sizing: border-box;
}

.typing-text {
  margin-top: 150px;
  margin-bottom: 250px;
  color: white; /* 白色字体 */
  font-size: 32px; /* 放大字体 */
  font-weight: bold;
  white-space: pre-wrap; /* 保持换行 */
  overflow: hidden;
}

.frosted {
  background-color: rgb(143, 97, 105, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
}


.title {
  margin: 0;
  font-size: 18px; /* 标题放大 */
  color: white;
  font-weight: bold;

}

.description {
  margin: 0;
  font-size: 14px; /* 简介略小 */
  color: #cccccc; /* 灰色 */
  display: -webkit-box; /* 必须 */
  -webkit-box-orient: vertical; /* 必须 */
  -webkit-line-clamp: 1; /* 显示两行 */
  overflow: hidden; /* 超出隐藏 */
  text-overflow: ellipsis; /* 多余显示省略号 */
}
</style>
