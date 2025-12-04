<template>
  <div class="left-card">
    <p><span class="highlight">燕云六级百业</span>招人啦！<br> 百业诚邀几位<span class="highlight">霖霖老师</span>加入！能打本、能打百业战，<span
      class="highlight">不会机制也没关系</span>！<br> 指挥会耐心指导大家，我们绝不会给任何压力，来了就有一席之地！<br>
      每个奶妈都能找到自己玩游戏的乐趣，而不是被迫承担压力！<br> <span
        class="highlight">诚招霖霖老师<span
        style="color: red">(如果你不是，也没有关系！！！！)</span></span>来我们百业，百业强度不大，是休闲百业，也没有活跃度要求。真的很缺<span
        class="highlight">霖霖老师</span>啊！<br> <br> 进百业可以来群里玩耍，大家都很友好！<br>
      每周要求不高，正常上线玩即可，不长时间也可以退游。每周六日来打百业战就好！<br> 还有概率群里搞抽奖、小奇遇哦！
    </p>
    <div class="buttons">
      <button @click="$emit('open-step', 1)">加入群聊</button>
      <button @click="$emit('details')">查看详情</button>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
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
  box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.3);
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

/* 手机端适配 */
@media (max-width: 768px) {
  .left-card {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    transform: none !important;
    width: 90%;
    margin: 1rem auto;
    padding-top: 4rem;
  }

  .left-card .buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
}

</style>
