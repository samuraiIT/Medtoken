<template>
  <router-view />
</template>

<script async setup lang='ts'>


const layoutMode = ref('static')
const staticMenuInactive = ref(false)
const overlayMenuActive = ref(false)
const mobileMenuActive = ref(false)
const menuActive = ref(false)
const menuClick = ref(false)

// show state
//const visibleOrder = ref(false)
const visibleSupport = ref(false)
const addAmbassadorOrder = ref(false)
const addSupportTicket = ref(false)

onMounted(() => {

})

const menuData = [
                {
                    label: 'Меню',
                    items: [
                        {
                            label: 'Главная страница',
                            icon: 'pi pi-fw pi-home',
                            to: '/',
                        },
						{   label: 'Сделать заказ', 
						    icon: 'pi pi-fw pi-plus', 
							to: '/ambassador-add',
						},						
						{   label: 'Мои заказы', 
						    icon: 'pi pi-fw pi-book', 
							to: '/tasks'
						},

					
                    ],
                },


                {
                    label: 'Поддержка',
                    items: [
                        {
                            label: 'Справка',
                            icon: 'pi pi-fw pi-question',
                            to: '/help' 
                        },
                        {
                            label: 'Техническая поддержка',
                            icon: 'pi pi-fw pi-cog', //envelope
							to: '/support-add',							
                        },
                    ],
                },
]
const menu = ref(menuData)
const onMenuToggle = () => {

}
const onWrapperClick = () => {

}
const onSidebarClick = () => {

}
const onMenuItemClick = () => {

}
const onLayoutChange = () => {

}
const containerClass = reactive([
    'layout-wrapper',
    {
      'layout-overlay': layoutMode.value === 'overlay',
      'layout-static': layoutMode.value === 'static',
      'layout-static-sidebar-inactive': staticMenuInactive.value && layoutMode.value === 'static',
      'layout-overlay-sidebar-active': overlayMenuActive.value && layoutMode.value === 'overlay',
      'layout-mobile-sidebar-active': mobileMenuActive.value,
      'p-input-filled': 'filled',//this.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': false, //this.$primevue.config.ripple === false,
      'layout-theme-light': true, //this.$appState.theme.startsWith('saga'),
    },  
])
       
</script>
<style scoped lang="scss">
.sm-visible {
    display: none;
}

@media screen and (max-width: 40em) {
    ::v-deep(.sm-invisible) {
        display: none;
    }

    ::v-deep(.sm-visible) {
        display: inline;
        margin-right: .5rem;
    }
}
</style>