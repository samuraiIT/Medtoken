<template>

        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center"></div>
            <!--div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);"-->
                <div class="col-12 xl:col-4 m-0 py-7 px-16" style="border-radius:6px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Медтокен</div>
                        <span class="text-600 font-medium">
						  <router-link to="/login" class="">Вход
						  </router-link>
						</span>
                    </div>
                
                    <!--div class="w-full md:w-10 mx-auto"-->
					<div class="card p-fluid">
					    <label for="last_name" class="block text-900 text-xl font-medium mb-1">Фамилия</label>
                        <InputText id="last_name" v-model="state.last_name" type="text" class="mb-1" placeholder="Фамилия" style="padding:1rem;" />
						<div class="formgrid grid">
							<div class="field col">
								<label for="first_name" class="block text-900 text-xl font-medium mb-1">Имя</label>
								<InputText id="first_name" v-model="state.first_name" type="text" class="mb-1" placeholder="Имя" style="padding:1rem;" />
								<label for="username" class="block text-900 text-xl font-medium mb-1">Логин</label>
								<InputText id="username" v-model="state.username" type="text" class="mb-1" placeholder="Логин" style="padding:1rem;" />	
							</div>
							  <div class="field col">
								<label for="patronymic" class="block text-900 font-medium text-xl mb-1">Отчество</label>
								<InputText id="patronymic" v-model="state.patronymic" type="text" class="mb-1" placeholder="Отчество" style="padding:1rem;" />	
								<label for="password" class="block text-900 font-medium text-xl mb-1">Пароль</label>
								<Password id="password" v-model="state.password" placeholder="Password" :toggleMask="true" class="mb-1" inputClass="w-full" inputStyle="padding:1rem"></Password>
							  </div>							  
						</div>
                        <label for="email" class="block text-900 text-xl font-medium mb-1">Email</label>
                        <InputText id="email" v-model="state.email" type="text" class="mb-3" placeholder="Email" style="padding:1rem;" />
                

                
                        <div class="flex align-items-center justify-content-between mb-5"/>
                        <Button label="Регистрация" class="w-md p-3 text-xl" @click="actionRegister"></button>
                    </div>
                </div>
            </div>


</template>
<route lang="yaml">
meta:
  layout: home
</route>
<script async setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCookie } from 'vue-cookie-next'
import fetch from 'cross-fetch'

const router = useRouter()
const route = useRoute()

const { getCookie, setCookie, removeCookie } = useCookie()
const urls = {
  login: 'http://localhost'
}

const state = reactive({
  username:'',
  email:'',
  password:'',
  first_name:'',
  last_name:'',
  patronymic:'',
  token:null
}) 

const actionRegister = async () => {
  const request = {
	headers: {
	  "Content-Type": 'application/json'
	},
	method: 'post',
    body: JSON.stringify(state)	
  }
  const login = await fetch(urls.login,request)
    .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json()
  })
  .then(d => {
    console.log('пришло',d)
	//setCookie('userState', d)
	router.push('/login')
  })
  .catch(err => {
    console.error(err)
  })
  
}
</script>

<style scoped>
.pi-eye {
    transform:scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform:scale(1.6);
    margin-right: 1rem;
}
</style>