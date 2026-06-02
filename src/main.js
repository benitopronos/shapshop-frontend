import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/styles.css'

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Global properties
app.config.globalProperties.$apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

app.mount('#app')

