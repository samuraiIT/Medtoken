import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import viteSSR, { ClientOnly } from 'vite-ssr'
import { createHead } from '@vueuse/head'
//import routes from 'virtual:generated-pages'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
//import '@unocss/reset/tailwind.css'
import './assets/css/main.css'
//import 'uno.css'

const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
/*
const app = createApp(App)
app.use(router)
app.mount('#app')

import { installI18n, extractLocaleFromPath, DEFAULT_LOCALE } from './i18n'
    const locale = extractLocaleFromPath(url.pathname)
    return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`
*/

// https://github.com/frandiox/vite-ssr
export default viteSSR(
  App,
  {
    routes,
    base: ({ url }) => {
      const locale = 'ru'
      return locale === 'ru' ? '/' : `/${locale}/`
    },
  },
  async (ctx) => {
    Object.values(import.meta.globEager('./modules/*.ts')).map((i) =>
      i.install?.(ctx)
    )
    const { app, url, router, isClient, initialState, initialRoute } = ctx
    const head = createHead()
    app.use(head)
    app.component(ClientOnly.name, ClientOnly)
    //await installI18n(app, extractLocaleFromPath(initialRoute.href))
    if (import.meta.env.SSR) {
      initialState.test = 'This should appear in page-view-source'
      // This object can be passed to Vuex store
    } else {
      // In browser, initialState will be hydrated with data from SSR
      console.log('Initial state:', initialState)
    }
    router.beforeEach(async (to, from, next) => {
      if (!!to.meta.state && (!import.meta.env.DEV || import.meta.env.SSR)) {
        // This route has state already (from server) so it can be reused.
        return next()
      }
      const baseUrl = isClient ? '' : url.origin
      try {
        // Get our page props from our custom API:
        const res = await fetch(
          `${baseUrl}/api/get-page-props?path=${encodeURIComponent(
            to.path
          )}&name=${to.name}&client=${isClient}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        // During SSR, this is the same as modifying initialState
        to.meta.state = await res.json()
      } catch (error) {
        console.error(error)
        // redirect to error route conditionally
      }
      next()	  
    })	
    return { head }	
  }	  
)