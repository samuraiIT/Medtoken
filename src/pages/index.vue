<template>
<div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
	<!--EditProfile v-if='showEdit' :isShowEdit='showEdit'/-->
<Dialog header='Профиль пользователя' v-model:visible="showEdit" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
<Card class="p-fluid">
  <!--template #title>Профиль пользователя</template-->
  <template #content>
	<div class="formgrid grid">
	  <div class="col">
		<div class="field">
		  <label for="last_name">Фамилия</label>
		  <InputText id="last_name" v-model="state.last_name" :value='state.last_name' type="text" class="p-input-sm mb-3" placeholder="Фамилия" style="padding:1rem;" />
		</div>	
		<div class="field">
		  <label for="first_name">Имя</label>
		  <InputText id="first_name" v-model="state.first_name" :value='state.first_name' type="text" class="p-input-sm mb-3" placeholder="Имя" style="padding:1rem;" />
		</div>
      </div>
	  <div class="col">		
		<div class="field">
		  <label for="patronymic">Отчество</label>
		  <InputText id="patronymic" v-model="state.patronymic" :value='state.patronymic' type="text" class="p-input-sm mb-3" placeholder="Отчество" style="padding:1rem;" />
		</div>			
		<div class="field">
		  <label for="email">Email</label>
		  <InputText id="email" v-model="state.email" :value='state.email' type="text" class="p-input-sm mb-3" placeholder="Email - введите рабочий" style="padding:1rem;" />
		</div>
	  </div>
    </div>
	<div class="formgrid grid">	
	<div class="col">	
		
		<div class="field">
		  <label for="job_name">Должность</label>
		  <InputText id="job_name" v-model="state.job_name" :value='state.job_name' type="text" class="p-input-sm mb-3" placeholder="Должность" style="padding:1rem;" />
		</div>		
        <div class="field">
          <Textarea v-model="state.about" :value='state.about' :autoResize="true" placeholder="О себе" rows="5" cols="30" />
		</div>
	  </div>	
  </div>
  </template>
<template #footer>
    <div class="formgrid grid text-center">
	  <div class="field col">
	    <Button label="Сохранить" @click="updateProfile" class="p-button-success" />
      </div>
      <div class="field col">					  
		<!--Button label="Отменить" @click="$emit('update:isShowEdit', false)" class="p-button-secondary" /-->
		<Button label="Отменить" @click="showEdit = false" class="p-button-secondary" />
      </div>
	</div>
</template>
</Card>
</Dialog>
    <div class="grid">
        <div class="col-12 md:col-6 lg:col-4">
            <div class="surface-card shadow-2 p-3 border-round">


			<div class="flex justify-content-between align-items-center mb-3">
				<h5>Профиль пользователя</h5>
				<!--div>
					<Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu.toggle($event)"></Button>
					<Menu ref="menu" :popup="true" :model="[]"></Menu>
				</div-->
			</div>
			<ul class="list-none p-0 m-0">
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">ФИО</span>
						<div class="mt-1 text-600">
						{{ state.last_name }}
						{{ state.first_name }}
						</div>
					</div>
					<div class="mt-2 md:mt-0 flex align-items-center"/>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Email</span>
						<div class="mt-1 text-600">
						{{ state.email }}
						</div>
					</div>
					<div class="mt-2 md:mt-0 flex align-items-center"/>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Название клиники</span>
						<div class="mt-1 text-600">
						{{ state.job_name }}
						</div>
					</div>
				</li>
			</ul>
			<div>
			<Button icon="pi pi-user-edit" @click='showEdit = true' class="p-button-rounded p-button-secondary p-button-outlined" />
			</div>
		</div>





                </div>

        <div class="col-12 md:col-6 lg:col-3">
            <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Количество выпущенных токенов</span>
                        <div class="text-900 font-medium text-xl">{{ state.countVideos }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">20  </span>
                <span class="text-500">жалоб по услуге за месяц</span>
            </div>
        </div>
        <div class="col-12 md:col-6 lg:col-3">
            <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Выручка за год</span>
                        <div class="text-900 font-medium text-xl">{{ state.countAnomalies }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-comment text-purple-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">85 </span>
                <span class="text-500">подтверждено</span>
            </div>
        </div>
    </div>
</div>
</template>
<script async setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useCookie } from 'vue-cookie-next'
import { useRoute, useRouter } from 'vue-router'
import fetch from 'cross-fetch'

const router = useRouter()
const toast = useToast()
const { getCookie, setCookie, removeCookie } = useCookie()
//const stateuser = ref(useCookie('stateUser'))
//const stateuser = ref()
//const stateuser = getCookie('userState')// || {last_name: false}

const urls = {
  update: 'http://localhost'
}

const states = reactive({
  stateuser: getCookie('userState') || null,
  showEdit: false//props.isShowEdit
})

const initState = async () => {
//if(!states.stateuser?.token) 
console.log('states',states.stateuser)
return true
}

const init = async () => {
/*
  //state.id = true
  states.stateuser.last_name = state.last_name
*/
   try {
    const res = await fetch(`http://locahost`,{
	  //method: 'post',
	  headers: {
	  "Content-Type": 'application/json',
	  'Authorization':'Token  '+states.stateuser?.token
	  },
	})
    
    if (res.status >= 400) {
      throw new Error("Неавторизован")
	  return
    }
    
    const json = await res.json()
	//countAnomalies.value = 0
	json.map(item => state.count)
  } catch (err) {
    console.error(err)
  }
}
//const state = reactive({})
const state = reactive({
  id: null,
  last_name: states.stateuser?.last_name || null,
  first_name: states.stateuser?.first_name || null,
  patronymic: states.stateuser?.patronymic || null,
  job_name: states.stateuser?.job_name || null,
  about: states.stateuser?.about || null,  
  email: states.stateuser?.email || null,
  phone: states.stateuser?.phone || null,
  token: null,
  count: 0,
})

  onMounted(
    async () => { 
	  if(initState()) init()
	}
  )

const showEdit = ref(false)

const actionShowEdit = () => {
  showEdit.value = true
}

const updateProfile = async () => {
  showEdit.value = false
  const request = {
	headers: {
	  "Content-Type": 'application/json',
	  'Authorization':'Token  '+states.stateuser.token
	},
	method: 'post',
    body: JSON.stringify(state)	
  }
  const update = await fetch(urls.update,request)
    .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json()
  })
  .then(d => {
    console.log('пришло',d)
	//d.token = states.stateuser.token
	setCookie('userState', d)
	showEdit.value = false
  })
  .catch(err => {
    console.error('ошибка',err)
  })
}	  
</script>
<route lang="yaml">
meta:
  layout: default
</route>
