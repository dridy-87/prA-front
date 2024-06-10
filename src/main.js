import { createApp } from 'vue'
import {
  router,
  setupStore,
  setupRouter,
  setupRouterGuard,
  setupVuetify,
} from '@system/eco-system'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' 


const __app__ = createApp(App)
setupRouter(__app__)
setupRouterGuard(router)
setupStore(__app__)
setupVuetify(__app__)
__app__.mount('#app')
