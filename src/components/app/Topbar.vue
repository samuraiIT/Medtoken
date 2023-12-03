<template>
<!-- eslint-disable -->
    <div class="layout-topbar">
	    <Toast/>
	    <!--Button class="p-button-rounded p-button-text" icon="pi pi-user" type="button" label="" @click="$refs.menu.toggle($event)" aria-haspopup="true" aria-controls="overlay_menu"/-->
		<Button class="p-link layout-topbar-button" type="button" label="" @click="toggle" aria-haspopup="true" aria-controls="topbar_menu">
          <i class="pi pi-user"></i>
          <span>Profile</span>
        </Button>
		
    <!--Button class="p-button-rounded p-button-text" icon="pi pi-user" type="button" label="" @click="toggle" aria-haspopup="true" aria-controls="topbar_menu" $emit('add-project', $event.target.value)/-->
    <Menu id="topbar-menu" ref="menuprofile" :model="menuItems" :popup="true" :class="{ topbarmenu_open: topbarmenu_open }"/>
	<!--Menu v-if="topbarmenu_open" id="overlay_menu" ref="menu" :model="menuItems" :popup="true" /-->
        <router-link to="/" class="layout-topbar-logo">
            <!--img alt="Logo" :src="topbarImage()" /-->
            <span style="font-size: 1.2rem; margin-left:1rem">{{ stateuser.first_name }} {{ stateuser.last_name }}</span>
        </router-link>

		<!--Menu ref="menu_1" :model="overlayMenuItems" :popup="true" />
		<Button type="button" label="Options" icon="pi pi-angle-down" @click="toggleMenu" style="width: auto"/-->

         <!--div class="p-menu p-component p-menu-overlay" id="topbar_menu" style="transform-origin: center bottom 0px; min-width: 83px; z-index: 1001;">
		 <ul class="p-menu-list p-reset" role="menu"><li class="p-submenu-header">Options22</li><li class="p-menuitem" role="none"><a class="p-menuitem-link" role="menuitem" tabindex="0"><span class="p-menuitem-icon pi pi-refresh"></span><span class="p-menuitem-text">Update</span><span class="p-ink"></span></a></li><li class="p-menuitem" role="none"><a class="p-menuitem-link" role="menuitem" tabindex="0"><span class="p-menuitem-icon pi pi-times"></span><span class="p-menuitem-text">Delete</span><span class="p-ink"></span></a></li><li class="p-submenu-header">Navigate</li><li class="p-menuitem" role="none"><a href="https://vuejs.org/" class="p-menuitem-link" role="menuitem" tabindex="0"><span class="p-menuitem-icon pi pi-external-link"></span><span class="p-menuitem-text">Vue Website</span><span class="p-ink"></span></a></li><li class="p-menuitem" role="none"><a href="#/fileupload" class="p-menuitem-link" role="menuitem"><span class="p-menuitem-icon pi pi-upload"></span><span class="p-menuitem-text">Router</span><span class="p-ink" style=""></span></a></li>
		 </ul></div-->


		<Button v-if="useRouter().currentRoute.value.name =='projects'" icon="pi pi-plus" label='Добавить проект' class="p-button-raised p-button-text" @click="startAddProject" />

        <!--button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
            <i class="pi pi-bars"></i>
        </button-->
        
        <button
            class="p-link layout-topbar-menu-button layout-topbar-button"
            v-styleclass="{
                selector: '@next',
                enterClass: 'hidden',
                enterActiveClass: 'scalein',
                leaveToClass: 'hidden',
                leaveActiveClass: 'fadeout',
                hideOnOutsideClick: true,
            }"
        >
            <i class="pi pi-ellipsis-v"></i>
        </button>
        <ul class="layout-topbar-menu lg:flex origin-top">
            <li>
               <span style="font-size: 1.2rem; margin-left:1rem">Медтокен</span>
            </li>
        </ul>			
        <ul class="layout-topbar-menu md:hidden lg:flex origin-top" style='display:none !important'>
            <li>
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-calendar"></i>
                    <span>Events</span>
                </button>
            </li>
            <li>
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-cog"></i>
                    <span>Settings</span>
                </button>
            </li>
            <li>
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-user"></i>
                    <span>Profile</span>
                </button>
            </li>
        </ul>
    </div>
</template>
<script async setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useCookie } from 'vue-cookie-next'
import { useToast } from 'primevue/usetoast'
import { useRouter, useRoute } from "vue-router"
import { useMenuStore } from '~/stores/menu'

const menustate = useMenuStore()

const toast = useToast()
let route = useRoute()
const router = useRouter()
const { getCookie, setCookie, removeCookie } = useCookie()
const emit = defineEmits(['menu-toggle','user-menu-toggle','topbar-menu-toggle','addProject'])

onMounted (
  async () => {

  }
)

let stateuser = ref({
  first_name:'',
  last_name:'',
})

const isPageProjects = ref(false)
const user_ = getCookie('userState')
const menu = ref()
const menuprofile = ref()
const topbarmenu_open = ref(false)
if(user_) stateuser = user_


//const stateuser = 
const onMenuToggle = (event: PointerEvent) => {
   emit('menu-toggle', event)
}
const onTopbarMenuToggle = (event: PointerEvent) => {
   emit('topbar-menu-toggle', event)
}
const topbarImage = (event: PointerEvent) => {
   return '' 
}

  
const startAddProject = (event: PointerEvent) => {
  const menuemit = emit('addProject')
  menustate.usedemit.value = true
  menustate.openMenu()
  /* eslint-disable-next-line vue/max-attributes-per-line */
}

const overlayMenuItems = ref([
            {
                label: 'Options',
                items: [{
                    label: 'Update',
                    icon: 'pi pi-refresh',
                    command: () => {
                        toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    command: () => {
                        toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
                    }
                }
            ]},
            {
                label: 'Navigate',
                items: [{
                    label: 'Vue Website',
                    icon: 'pi pi-external-link',
                    url: 'https://vuejs.org/'
                },
                {
                    label: 'Router',
                    icon: 'pi pi-upload',
                    command: () => {
                        window.location.hash = "/fileupload"
                    }
                }
		]}
])

const menuItems = ref([
            {
                label: 'Панель управления',
                items: [{
                    label: 'Профиль',
                    icon: 'pi pi-user',
					url: '/',
                },
                {
                    label: 'Выход',
                    icon: 'pi pi-sign-out',
					url: '/auth/login',
                    command: () => {
					    //stateuser.value = null
                        toast.add({ severity: 'warn', summary: 'Success', detail: 'Успешный выход. До новых встреч!', life: 3000})
						setCookie('userState','')
                    }
                }
    ]},
])

const toggle = (event: PointerEvent) => {
	topbarmenu_open.value = !topbarmenu_open.value
	menuprofile.value.toggle(event)
	menuprofile.value.show()
}
</script>
<style scope>
#topbar-menu{
  transform-origin: center bottom 0px;
  top: 4rem;
  left: 2rem;
  min-width: 83px;
  z-index: 999999999;
  position: fixed;
  background-color: var(--surface-overlay);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
}
</style>
