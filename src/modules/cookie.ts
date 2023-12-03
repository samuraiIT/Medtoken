import { VueCookieNext } from 'vue-cookie-next'
import type { UserModule } from '~/types'

// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite

export const install: UserModule = ({ app }) => {
  VueCookieNext.config({ expire: '7d' })
  app.use(VueCookieNext)
}
