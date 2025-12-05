<!-- TypingLoop.vue -->
<template>
  <div class="typing">{{ displayText }}</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

interface Props {
  texts: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pause?: number // 这里用作删除前停留
}

const props = defineProps<Props>()

const displayText = ref<string>('')

let textIndex = 0
let charIndex = 0
let typingForward = true

function startTyping(): void {
  if (!props.texts || props.texts.length === 0) return

  const currentText = props.texts[textIndex]
  const typeSpeed = props.typeSpeed ?? 100
  const deleteSpeed = props.deleteSpeed ?? 50
  const pause = props.pause ?? 3000 // 打完停留三秒

  if (typingForward) {
    displayText.value = currentText.slice(0, charIndex + 1)
    charIndex++
    if (charIndex === currentText.length) {
      typingForward = false
      setTimeout(startTyping, pause) // 完整显示停留
      return
    }
  } else {
    displayText.value = currentText.slice(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      typingForward = true
      textIndex = (textIndex + 1) % props.texts.length
      setTimeout(startTyping, typeSpeed)
      return
    }
  }

  setTimeout(startTyping, typingForward ? typeSpeed : deleteSpeed)
}

onMounted(() => {
  startTyping()
})
</script>

<style scoped>
.typing {
  min-height: 50px;
  margin-left: 10rem;
  margin-top: 20rem;
  font-size: 24px;
  color: white;
  font-weight: bold;
  white-space: pre;
}
</style>
