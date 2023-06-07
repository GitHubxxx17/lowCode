import { createApp } from 'vue'
import pinia from './stores/index.ts'
import './style.css'
import App from './App.vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
const app = createApp(App)

app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
