import { createRouter, createWebHistory } from 'vue-router'
import { meta, routerMapper } from '@service/utils'
import { guideRouter } from '@service/router'
// import publishing from '@publishing/router'
import { createPermissionGuard, createUserActivityLog } from './navigation-guard'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    ...routerSetter(),
    // ...publishing
  ],
  scrollBehavior() { return { top: 0 } },
})

export function setupRouter(app) { app.use(router) }

export function setupRouterGuard(router) { createPermissionGuard(router) }

export function setupUserActivityLog(router) { createUserActivityLog(router) }

function rootSetter() {
  return {
    ...routerMapper({
      name: 'Root',
      path: '/',
    }),
    component: () => import('@service/pages/login.vue'),

  }
}

function routerSetter() {
  const result = [...guideRouter];

  result.push(rootSetter())

  return result
}
