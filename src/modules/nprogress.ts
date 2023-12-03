import NProgress from 'vue-nprogress'
import type { UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
  const nprogress = new NProgress()	
  if (isClient) {
    router.beforeEach(() => { nprogress.start() })
    router.afterEach(() => { nprogress.done() })
  }
}
