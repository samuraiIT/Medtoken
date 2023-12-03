<template>
  <main>
    <div :class="containerClass" @click="onWrapperClick">
        <Topbar @menu-toggle="onMenuToggle" />
        <div class="layout-sidebar" @click="onSidebarClick">
            <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
        </div>
        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
            <Footer />
        </div>
        <!--AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" @click='showSupportDialog'/-->
        <transition name="layout-mask">
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
        </transition>
		<Dialog header='Запрос в техподдержку' v-model:visible="showSupport" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
		  <!--AddSupport :isShowSupport='supportDialog' /-->
          <Card class="p-fluid" >
          <!--div class="card p-fluid"-->
          <Toast />
		  <!--template #title>Запрос в техподдержку</template-->
		  <template #content>
					<div class="formgrid grid">
						<div class="field col">
							<div class="field">
								<label for="name">Тема обращения</label>
								<InputText id="name" v-model="state.subject" type="text" class="p-input-sm mb-3" placeholder="Тема обращения" style="padding:1rem;" />
							</div>
							<div class="field">
								<label for="name">ФИО</label>
								<InputText id="name" v-model="state.fio" type="text" class="p-input-sm mb-3" placeholder="ФИО" style="padding:1rem;" />
							</div>							
							<div class="field">
								<label for="name">Email</label>
								<InputText id="name" v-model="state.email" type="text" class="p-input-sm mb-3" placeholder="Email - введите рабочий" style="padding:1rem;" />
							</div>
                            <div class="field">
                              <Textarea v-model="state.message" :autoResize="true" placeholder="Напишите нам" rows="5" cols="30" />
							</div>
				</div>	
					</div>
					</template>
                    <template #footer>
					  <div class="formgrid grid text-center">
					  <div class="field col">
					    <Button label="Создать" @click="addSupport" class="p-button-success" />
                      </div>
                      <div class="field col">					  
						<Button label="Отменить" @click="showSupport = false" class="p-button-secondary" />
                      </div>
					  </div>
					</template>
          </Card>		  
        </Dialog>	
    </div>
  </main>
</template>
<script async setup lang="ts">
//import axios from 'axios'
import { ref, reactive, onMounted, onBeforeUpdate, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCookie } from 'vue-cookie-next'
import { useToast } from 'primevue/usetoast'
import { useMenuStore } from '~/stores/menu'

const route = useRoute()
const router = useRouter()
const { getCookie, setCookie, removeCookie } = useCookie()
const toast = useToast()
const page = ref<any>({})
const menustate = useMenuStore()
const urls = {
  send: 'http://localhost'
}
const states = reactive({
  stateuser: getCookie('userState'),
  showSupport: false//props.isShowEdit
})

const isAuth = ref(false)
const stateuser = ref(null) //
const showSupport = ref(false)
//stateuser.value = getCookie('userState')
//console.log('menu-state',stateuser.value)
if(!states.stateuser.token) router.push('/auth/login')

const layoutMode = ref('static')
const staticMenuInactive = ref(false)
const overlayMenuActive = ref(false)
const mobileMenuActive = ref(false)
const menuActive = ref(false)
const menuClick = ref(false)

const menuData = [
                {
                    label: 'Меню',
                    items: [
                        {
                            label: 'Главная страница',
                            icon: 'pi pi-fw pi-home',
                            to: '/',
                        },
						{   label: 'История покупок', 
						    icon: 'pi pi-fw pi-sitemap', 
							to: '/marketplace' 
						},

					
                    ],
                },

                {
                    label: 'Поддержка',
                    items: [
                        {
                            label: 'Мои медтокены',
                            icon: 'pi pi-fw pi-book',
                            to: '/help' 
                        },
                        {
                            label: 'Техническая поддержка',
                            icon: 'pi pi-fw pi-cog',
                            command: () => {
                                //window.location = 'https://github.com/primefaces/sakai-vue';
								  console.log('action cmd')
								showSupport.value = true
								//showSupportDialog()
                            },
                        },
                    ],
                },
]

const menu = ref(menuData)
const state = reactive({
  id: null,
  email: null,
  phone: null,
  message: null,
  fio: null,
  subject: null,
  ticket_id: null,  
})
const supportDialog = ref(false)
const showSupportDialog = () => {
  console.log('action')
  supportDialog.value = true //!supportDialog.value
}
const addSupport = async () => {
  console.log('start send',states.stateuser)
  state.ticket_id = Math.random().toString(36).slice(2)
  const request = {
	headers: {
	  "Content-Type": 'application/json',
	  'Authorization':'Token  '+states.stateuser.token
	},
	method: 'post',
    body: JSON.stringify(state)	
  }
  const update = await fetch(urls.send,request)
    .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json()
  })
  .then(d => {
    console.log('пришло',d)
	showSupport.value = false
    toast.add({severity: 'success', summary: `Ваше обращение №${state.ticket_id} успешно отправлено. В ближайший срок менеджер техподдержки свяжется с Вами. Благодарим за обращение.`, life: 3000})

	//props.isShowEdit = false
	//init()
	//setCookie('userState', d)
	//router.push('/login')
  })
  .catch(err => {
    console.error('ошибка',err)
  })
}

onMounted(() => {
    //fetchPage()
	
if('menustate' in menustate) console.log('Шаблон запуск',menustate)	
	
router.addMenu = (items) => {
  console.log('Добавлялка',items)
  menu.value[1].items = items
} 	
})

onBeforeUpdate(() => {
   if (mobileMenuActive.value) addClass(document.body, 'body-overflow-hidden')
   else removeClass(document.body, 'body-overflow-hidden')
})

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

watch(() => {
  if(router.currentRoute.value.name == 'index'){
    console.log('чиним меню index..')
	//router.addMenu(JSON.parse(getCookie('userMenu')))
	menu.value[1].items = JSON.parse(getCookie('userMenu'))
  }  
  
  router.params = route.params

  menuActive.value = false
  toast.removeAllGroups()  
})

const onWrapperClick = () => {
  if (!menuClick.value) {
    overlayMenuActive.value = false
    mobileMenuActive.value = false
  }
  menuClick.value = false
}
const onMenuToggle = (event) => {
  menuClick.value = true
  if (isDesktop()) {
    if (layoutMode.value === 'overlay') {
      if (this.mobileMenuActive === true) {
        overlayMenuActive.value = true
      }
      overlayMenuActive.value = !overlayMenuActive.value
      mobileMenuActive.value = false
    } else if (layoutMode.value === 'static') {
      staticMenuInactive.value = !staticMenuInactive.value
    }
  } else {
    mobileMenuActive.value = !mobileMenuActive.value
  }
  event.preventDefault()
}
const onSidebarClick = () => {
  menuClick.value = true
}
const onMenuItemClick = (event) => {
  if (event.item && !event.item.items) {
    overlayMenuActive.value = false
    mobileMenuActive.value = false
	//supportDialog.value = true
  }
}
const onLayoutChange = (layoutMode) => {
  layoutMode.value = layoutMode
}
const addClass = (element, className) => {
  if (element.classList) element.classList.add(className)
  else element.className += ' ' + className
}
const removeClass = (element, className) => {
  if (element.classList) element.classList.remove(className)
  else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
}
const isDesktop = () => {
  return true //window.innerWidth >= 992;
}
const isSidebarVisible = () => {
  if (isDesktop()) {
    if (layoutMode.value === 'static') return !staticMenuInactive.value
    else if (layoutMode.value === 'overlay') return overlayMenuActive.value
  }
  return true
}
</script>
<style lang="scss">
/*@import './App.scss';*/
</style>
