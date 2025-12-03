<template>
  <div class="bg">
    <nav class="navbar">
      <ul>
        <li  v-for="item in menuItems" :key="item.path" @click="navClick(item.path)">{{ item.name }}</li>
      </ul>
    </nav>
    <!-- 左下角悬浮卡片 -->
    <div class="left-card">
      <p>
        <span class="highlight">燕云六级百业</span>招人啦！<br>
        百业诚邀几位<span class="highlight">霖霖老师</span>加入！能打本、能打百业战，<span class="highlight">不会机制也没关系</span>！<br>
        指挥会耐心指导大家，我们绝不会给任何压力，来了就有一席之地！<br>
        每个奶妈都能找到自己玩游戏的乐趣，而不是被迫承担压力！<br>
        <span class="highlight">诚招霖霖老师<span style="color: red">(如果你不是，也没有关系！！！！)</span></span>来我们百业，百业强度不大，是休闲百业，也没有活跃度要求。真的很缺<span class="highlight">霖霖老师</span>啊！<br>
        <br>
        进百业可以来群里玩耍，大家都很友好！<br>
        每周要求不高，正常上线玩即可，不长时间也可以退游。每周六日来打百业战就好！<br>
        还有概率群里搞抽奖、小奇遇哦！
      </p>
      <div class="buttons">
        <button @click="openStep(1)">加入群聊</button>
        <button @click="Details">查看详情</button>
      </div>
    </div>
    <!-- 右下角悬浮卡片 -->
    <div class="right-card">
      <h1 style="color: aquamarine">听说你是 我画你猜 的高手</h1>
      <!-- 当前图片 -->
      <img :src="currentItem?.url" alt="展示图片" class="card-image" />
      <!-- 提示文字 -->
      <p class="tips">{{ currentItem?.tips }}</p>
      <!-- 切换图片按钮 -->
      <div class="switch-buttons">
        <button @click="prevImage">上一张</button>
        <button @click="nextImage">下一张</button>
      </div>
      <!-- 输入框 -->
      <input type="text" v-model="inputValue" placeholder="请输入答案" class="card-input" />
      <!-- 提交按钮 -->
      <button class="card-button" @click="handleSubmit">提交</button>
    </div>

    <!-- 弹窗 -->
    <div v-if="step > 0" class="modal">
      <div class="gufeng-box">
        <!-- 装饰顶部 -->
        <div class="decor-top"></div>

        <!-- 内容区域 -->
        <h2 class="title">
          {{
            step === 1
              ? "初见宗门"
              : step === 2
                ? "又遇宗门"
                : "拜入宗门"
          }}
        </h2>
        <p class="content">
          {{
            step === 1
              ? "俺不中类，你居然真的想加入我们。"
              : step === 2
                ? "俺不中类，你居然没有退出？"
                : "俺不中类，你居然真的要加入，请在《燕云十六声》中搜索。"
          }}
        </p>

        <!-- 下一步按钮 -->
        <button class="next-btn" @click="nextStep">
          {{ step < 3 ? '确定' : '加入成功（？）' }}
        </button>

        <!-- 装饰底部 -->
        <div class="decor-bottom"></div>
      </div>
    </div>

    <div v-if="isDetails" class="modal">
      <div class="gufeng-box">
        <p>
          我劝你不要加入这个百业，因为这个百业有一个传说，每当中午十二点的时候，就会有一个人在群里艾特别人，她只说一句话,那句话就是......
        </p>
        <div style="height: 30px"></div>
        <!-- 下一步按钮 -->
        <button class="next-btn" @click="closeDetails">TQDD</button>
        <!-- 装饰底部 -->
        <div class="decor-bottom"></div>
      </div>
    </div>


  </div>
</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import { ElNotification,ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
interface ImageItem {
  url: string | undefined
  tips: string | undefined
}
const menuItems = ref([
  {
    name:'首页',
    path:'/',
  },
  {
    name: '江湖行',
    path: '/jhx'
  },
  {
    name: '风闻',
    path: '/fw'
  },
  {
    name: '我的',
    path: '/my'
  },
  {
    name: '加入我们',
    path: '/join'
  }
])
const images : ImageItem[] = [
  {
    url:'/images/六神无主.png',
    tips:'四个字--成语'
  },
  {
    url:'/images/绝望的笑容.png',
    tips:'五个字--书名'
  },
  {
    url:'/images/跳伞.png',
    tips:'两个字--运动'
  }
]
// 当前图片索引
const currentIndex = ref(0)
// 输入框绑定
const inputValue = ref('')
// 当前显示对象
const currentItem = ref(images[currentIndex.value])
//记录答题的次数
const questionIndex = ref(0)
// 切换上一张
const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
  currentItem.value = images[currentIndex.value]
}

// 切换下一张
const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
  currentItem.value = images[currentIndex.value]
}

// 提交按钮事件
const handleSubmit = () => {
  if (inputValue.value == '') {
    ElMessage({
      message: `请输入你的答案`,
      type: 'warning',
    })
    return
  }
  const answer = getImageName(currentItem.value.url)
  const isRight =  checkAnswer(inputValue.value, answer)
  if (isRight.isCorrect){
    ElMessage({
      message: `你一定是一个天才`,
      type: 'success',
    })
    nextImage()
  } else if (isRight.overlapChars && isRight.overlapChars.length > 0 ) {
    questionIndex.value++
    ElMessage({
      message: `恭喜你，正确答案包含：${isRight.overlapChars}`,
      type: 'success',
    })
  } else {
    questionIndex.value++
    ElMessage({
      message: `恭喜你，一个正确的都没有`,
      type: 'error',
    })
  }
  if (questionIndex.value>=3){
    ElMessage({
      message: `别挣扎了，下一题吧`,
      type: 'success',
    });
    questionIndex.value = 0
    inputValue.value = ''
  }
  inputValue.value = ''
}
const navClick = (path: string) => {
  if (path == '/fw'){
    ElMessageBox.alert('其实我也没有开发好', '别生气', {
      // if you want to disable its autofocus
      // autofocus: false,
      confirmButtonText: 'OK',
      callback: (action: Action) => {
      },
    })
    return
  }
  ElNotification({
    message: '点风闻，其他都没有开发好',
    type: 'primary',
  })
}

function getImageName(url: string) {
  return url.split('/').pop()?.split('.').shift() ?? ''
}

/**
 * 判断答案是否完全正确，并返回重合字数组
 * @param input 用户输入
 * @param url 图片路径
 * @returns { isCorrect: boolean, overlapChars: string[] }
 */
function checkAnswer(input: string, url: string) {
  const answer = getImageName(url)

  // 完全一致
  const isCorrect = input === answer

  // 获取重合字（去重）
  const inputChars = Array.from(input)
  const answerChars = Array.from(answer)
  const overlapChars = Array.from(new Set(inputChars.filter(c => answerChars.includes(c))))

  return {
    isCorrect,
    overlapChars
  }
}


const step = ref(0)

function openStep(s: number) {
  step.value = s
}

function nextStep() {
  if (step.value < 3) {
    step.value++
  } else {
    step.value = 0
  }
}
const isDetails = ref(false)

function Details(){
  isDetails.value = true
}

function closeDetails(){
  isDetails.value = false
}
onMounted(() => {

})
</script>

<style scoped>
/* 根容器铺满屏幕 */
.bg {
  width: 100vw;
  height: 100vh;
  background-image: url("/bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

/* 导航栏 */
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

/* 左下角卡片 */
.left-card {
  position: fixed;
  left: 10rem;
  top: calc(50% + 1.75rem);
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1rem;
  max-width: 30rem;
  color: white;
  box-shadow: 0 0.4rem 2rem rgba(0,0,0,0.3);
  font-size: 0.95rem;
  line-height: 1.6;
}

.left-card .highlight {
  color: #836fff;
  font-weight: bold;
}

.left-card .buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.left-card button {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.5rem;
  background: #836fff;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

.left-card button:hover {
  background: #a18fff;
}

/* 右下角卡片 */
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

/* 输入框 */
.card-input {
  width: 95%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
}

/* 提交按钮 */
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

/* 切换图片按钮 */
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

/* 弹窗 */
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

/* =================== 手机端适配 =================== */
@media (max-width: 768px) {
  .left-card, .right-card {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    transform: none !important;
    width: 90%;
    margin: 1rem auto;
    padding-top: 4rem;
  }

  .switch-buttons, .left-card .buttons {
    flex-direction: column;
    gap: 0.5rem;
  }

  .navbar { font-size: 1rem; height: 3rem; }
  .card-image { max-height: 12rem; }
  .gufeng-box { max-width: 95%; width: 95%; }
}

</style>
