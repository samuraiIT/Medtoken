<template>
    <div class="layout-menu-container">
        <Submenu :items="model" class="layout-menu" :root="true" @menuitem-click="onMenuItemClick" />
    </div>
</template>
<script async setup>
import { watch,ref } from 'vue'
const props = defineProps({
  model: Array
})
const emit = defineEmits(['menuitem-click'])
const onMenuItemClick = (event) => {
 emit('menuitem-click', event)
}
const bannerImage = () => {
    return '' //this.$appState.darkTheme ? 'images/banner-primeblocks-dark.png' : 'images/banner-primeblocks.png';
}
//computed: {
 //darkTheme() {return this.$appState.darkTheme;},
//},
</script>
<style scoped></style>