<template>

        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center"></div>
            <!--div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);"-->
                <div class="col-12 xl:col-4 m-0 py-7 px-16" style="border-radius:6px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Медтокен</div>
                        <span class="text-600 font-medium"> 
						  <router-link to="/register" class="">Регистрация
						  </router-link>
						</span>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="username" class="block text-900 text-xl font-medium mb-2">Логин</label>
                        <InputText id="username" @keyup.enter="submit" v-model="state.username" type="text" class="w-full mb-3" placeholder="Логин" style="padding:1rem;" />					
                        <!--label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email" v-model="state.email" type="text" class="w-full mb-3" placeholder="Email" style="padding:1rem;" /-->
                
                        <label for="password" class="block text-900 font-medium text-xl mb-2">Пароль</label>
                        <Password id="password" @keyup.enter="submit" v-model="state.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                        <div class="flex align-items-center justify-content-between mb-5">
                            <div class="flex align-items-center">
                                <!--Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label-->
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Забыли пароль?</a>
                        </div>
                        <Button label="Войти" class="w-full p-3 text-xl" @click="actionLogin" autofocus />
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
//import { useFetch } from '@vueuse/core'
import fetch from 'cross-fetch'

const router = useRouter()
const route = useRoute()

const { getCookie, setCookie, removeCookie } = useCookie()
const isTest = ref(true)
console.log('login',getCookie('userState'))
//removeCookie('userState') // can't access property "isCookieAvailable", this is undefined
setCookie('userState', {})

if(isTest.value) {
  setCookie('userState',{
  username:'test',
  email:'test@test',
  password:null,
  first_name:'Test',
  last_name:'Test',
  patronymic:'Testo',
  token:'000000'  
})
  console.log('test activated')
  router.push('/marketplace')
} //else removeCookie('userState')

const urls = {
  login: 'http://localhost'
}

const state = reactive({
  username:null,
  email:'',
  password:null,
  first_name:'',
  last_name:'',
  patronymic:'',
  token:null
}) 

const submit = async (event) => {
  console.log('submit',event)
  if(!state.password || state.password.length < 3) return
  if(!state.username || state.username.length < 3) return
  actionLogin()
}

const actionLogin = async () => {
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
	setCookie('userState', d)
	router.push('/marketplace')
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
