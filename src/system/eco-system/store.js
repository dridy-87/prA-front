import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { router } from '@system/eco-system'
import { markRaw } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

export function setupStore(app) {
  store.use(piniaPluginPersistedstate)
  store.use(({ store }) => {
    store.router = markRaw(router)
  })
  app.use(store)
}

export { store }
