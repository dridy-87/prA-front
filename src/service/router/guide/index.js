import { meta, routerMapper } from '@service/utils'

const root = '/guide'
const namePrefix = 'guide'

export const guide = [
  {
    ...routerMapper({
      name: `${namePrefix}Board`,
      path: `${root}/board`,
    }),
    component: () => import('@service/pages/guide/board-list.vue'),
  }
]

export default guide