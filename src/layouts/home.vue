<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
        </div>
        <transition name="layout-mask">
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
        </transition>
  </main>
</template>
<script async setup lang="ts">
import { ref } from 'vue'
const mobileMenuActive = ref(false)
</script>
<style lang="scss">
/*@import './App.scss';*/
</style>
