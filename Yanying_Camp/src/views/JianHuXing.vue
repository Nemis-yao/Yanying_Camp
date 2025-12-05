<template>
  <div class="bg">
    <el-row class="card-wrapper">
      <el-col span="12" offset="6" class="frosted">
        <el-scrollbar>
          <el-card style="width: 100%;margin-top: 20px" shadow="hover" v-for="item in ARR" :key="item.id" >
            <el-row class="Copywriting">
              <el-col :span="18">{{item.Content}}</el-col>
              <el-col :span="2" :offset="4" class="copy-btn" @click="copy(item.Content)">复制</el-col>
            </el-row>
          </el-card>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import  Copywriting  from '@/data/Copywriting.json'
import { ref } from 'vue'
import {ElMessage} from "element-plus";
const ARR= ref(Copywriting.Copywriting)



const copy = async (text: string) => {
  // 优先现代 API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      ElMessage.success("复制成功");
      return;
    } catch {}
  }

  // 兜底方案：移动端、微信、旧浏览器
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.opacity = "0";
    textarea.setAttribute("readonly", "true");

    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length); // 关键：移动端需要

    const res = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (res) ElMessage.success("复制成功");
    else ElMessage.error("复制失败");
  } catch {
    ElMessage.error("复制失败");
  }
};

</script>

<style scoped>
.bg {
  width: 100vw;
  min-height: 100vh;
  background-image: url("/WA/WA-2.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-sizing: border-box;
}
.card-wrapper{
  display: flex;
  justify-content: center;
}
.frosted {
  box-shadow: 20px 20px 50px rgba(0,0,0,0.5);
  border-radius: 15px;
  background: rgba(255,255,255,0.1);
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.5);
  border-left: 1px solid rgba(255,255,255,0.5);
  backdrop-filter: blur(5px);
  box-sizing: border-box;

  width: 900px; /* PC 正常宽度 */
  max-width: 95vw; /* ---- 关键：移动端适配 ---- */
  height: 90vh;    /* 移动端手感更好 */
  padding: 1rem;
}

.Copywriting {

  padding: .4rem 0;
}

.copy-btn {
  cursor: pointer;
  user-select: none;
  color: #409eff;
}

/* ---- 移动端优化 ---- */
@media (max-width: 768px) {
  .frosted {
    width: 100%;
    height: 85vh;
    padding: 0.5rem;
  }
  .copy-btn {
    padding: .3rem .6rem;
    border-radius: 6px;
    background: rgba(255,255,255,0.2);
  }

  .el-card {
    margin-bottom: .6rem;
  }
}

</style>
