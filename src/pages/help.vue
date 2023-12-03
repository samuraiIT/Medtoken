<template>
  <div class="grid">
    <div class="col-13 md:col-7">
	<div class="card">	
			<h5>Медтокены</h5>
			<h5>Список купленных-выпущенных токенов</h5>	
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

const stateuser = getCookie('userState')

const state = reactive({
  countVideos: 0,
  countAnomalies: 0,
})

  onMounted(
    async () => { 

	}
  )

const init = async () => {
   try {
    const res = await fetch(`http://localhost`,{
	  //method: 'post',
	  headers: {
	  "Content-Type": 'application/json',
	  'Authorization':'Token  '+stateuser.token
	  },
	})
    
    if (res.status >= 400) {
      throw new Error("Bad response from server")
    }
    
    const json = await res.json()
	json.map(item => state.count)
  } catch (err) {
    console.error(err)
  }
}
	  init()  
</script>
<route lang="yaml">
meta:
  layout: false
</route>
