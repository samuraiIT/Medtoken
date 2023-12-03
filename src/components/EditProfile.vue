<template>
<Card class="p-fluid">
  <template #title>
    Профиль пользователя
  </template>
  <template #content>
	<div class="formgrid grid">
	  <div class="field col">
		<div class="field">
		  <label for="last_name">Фамилия</label>
		  <InputText id="last_name" v-model="state.last_name" :value='state.last_name' type="text" class="p-input-sm mb-3" placeholder="Фамилия" style="padding:1rem;" />
		</div>	
		<div class="field">
		  <label for="first_name">Имя</label>
		  <InputText id="first_name" v-model="state.first_name" :value='state.first_name' type="text" class="p-input-sm mb-3" placeholder="Имя" style="padding:1rem;" />
		</div>	
		<div class="field">
		  <label for="patronymic">Отчество</label>
		  <InputText id="patronymic" v-model="state.patronymic" :value='state.patronymic' type="text" class="p-input-sm mb-3" placeholder="Отчество" style="padding:1rem;" />
		</div>			
		<div class="field">
		  <label for="email">Email</label>
		  <InputText id="email" v-model="state.email" :value='state.email' type="text" class="p-input-sm mb-3" placeholder="Email - введите рабочий" style="padding:1rem;" />
		</div>
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
		<Button label="Отменить" @click="states.showEdit = !states.showEdit" class="p-button-secondary" />
      </div>
	</div>
</template>
</Card>
</template>
<script async setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCookie } from 'vue-cookie-next'
//import fetch from 'cross-fetch'

const props = defineProps({
  isShowEdit: {
    type: Boolean,
    default: false,
  },  
})

const router = useRouter()
//const toast = useToast()
const { getCookie, setCookie, removeCookie } = useCookie()
//const stateuser = getCookie('userState')// || {last_name: false}
const showEdit = ref(false)
const urls = {
  update: 'http://localhost'
}

const addSupport = () => {

}

  onMounted(
    async () => { 
	  //if(initState()) init()
	  //initState()
	}
  )
const states = reactive({
  stateuser: getCookie('userState'),
  showEdit: props.isShowEdit
})

const initState = async () => {
if(!states.stateuser) return false
  //state.last_name = stateuser.last_name
return true
}

const init = () => {
  states.stateuser.last_name = state.last_name
  states.stateuser.first_name = state.first_name
  states.stateuser.patronymic = state.patronymic
  states.stateuser.job_name = state.job_name
  states.stateuser.about = state.about 
  states.stateuser.email = state.email
  states.stateuser.phone = state.phone
}

const state = reactive({
  id: null,
  last_name: states.stateuser.last_name || null,
  first_name: states.stateuser.first_name || null,
  patronymic: states.stateuser.patronymic || null,
  job_name: states.stateuser.job_name || null,
  about: states.stateuser.about || null,  
  email: states.stateuser.email || null,
  phone: states.stateuser.phone || null,
  token: null,
})

const updateProfile = async () => {
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
	states.showEdit = false
	//init()
	//setCookie('userState', d)
	//router.push('/login')
  })
  .catch(err => {
    console.error('ошибка',err)
  })
}

</script>
<style scoped>
input, textarea{width:100% !important;}

.p-slider-horizontal, .p-inputtext {
    width: 14rem;
}
.p-slider-vertical {
     height: 14rem;
}

.special-day {
    text-decoration: line-through;
}

</style>
