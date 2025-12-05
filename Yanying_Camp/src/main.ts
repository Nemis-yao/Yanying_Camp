import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import float from "./directives/float";
const app = createApp(App)

import VueVirtualScroller from 'vue3-virtual-scroller'
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(VueVirtualScroller)
app.directive("float", float);
app.mount('#app')
