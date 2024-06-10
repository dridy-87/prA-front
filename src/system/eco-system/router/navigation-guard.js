import { useUserStore } from '@service/store'
// import dayjs from 'dayjs'
// import {request} from '@system/utils/request'

export function createPermissionGuard(router) {
  router.beforeEach(async (to, _, next) => {

    if (to.meta.requiresAuth) {
      const userStore = useUserStore()
      if (userStore.hasAuthenticated === false) {
        next({ name: 'login' })
      }
    }
    next()
  })
}

/**
 * 사용자 활동 로그
 * @param router
 */
export function createUserActivityLog(router) {
  const userStore = useUserStore()
  const userId = userStore.getUserId
  const coId = userStore.userInfo.itrdtCoId  // 도입사 ID를 회사 ID로 사용
  const dscsnId = userStore.userInfo.dscsnId // 상담원ID
  const getNowDt = () => dayjs().format('YYYYMMDDHHmmss')

  // Logging Target 설정
  const targetPath = '/service/cp-plus/'
  const excludedPaths = ['main/main', 'prephase/']

  if (userId !== null && userId !== undefined) {
    router.beforeEach(async (to, from, next) => {
      const sendData = {
        coId: coId,
        dscsnId: (dscsnId  == null) ? '' : dscsnId,
        userId: userId,
        accessDt: getNowDt(),
        pagePath: to.path
      }

      if (to.path.startsWith(targetPath) &&
        !excludedPaths.some(excluded => to.path.includes(targetPath + excluded))
      ) {
        await request.post({
          url: '/common/activity-log',
          data: sendData
        }).finally(() => {
          next()
        })
      } else {
        next()
      }

    })
  }
}
