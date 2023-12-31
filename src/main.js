
import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/main.sass'
import store from "@/store"
import i18n from "@/i18n"


createApp(App).use(store).use(i18n).mount('#app')
