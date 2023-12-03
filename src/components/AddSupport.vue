<template>
<Card class="p-fluid">
<!--div class="card p-fluid"-->
        <Toast />
		<template #title>
		  Запрос в техподдержку
		</template>
		<template #subtitle>
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
						<Button label="Отменить" @click="states.showSupport = !states.showSupport" class="p-button-secondary" />
                      </div>
					  </div>
					</template>



</Card>
</template>
<script async setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCookie } from 'vue-cookie-next'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from "primevue/useconfirm"
//import fetch from 'cross-fetch'

const { getCookie, setCookie, removeCookie } = useCookie()
const stateuser = getCookie('userState')// || {last_name: false}
const router = useRouter()
const urls = {
  send: 'http://localhost'
}
const toast = useToast()
const confirm = useConfirm()
const showSupport = ref(true)
const addSupport = async () => {
  state.ticket_id = Math.random().toString(36).slice(2)
  const request = {
	headers: {
	  "Content-Type": 'application/json',
	  'Authorization':'Token  '+stateuser.token
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
	states.showSupport = false
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

const props = defineProps({
  isShowSupport: {
    type: Boolean,
    default: false,
  },  
})

const state = reactive({
  id: null,
  fio: null,
  subject: null,
  message:null,
  email: null,
  phone: null,
  ticket_id: null,
})

const states = reactive({
  showSupport: props.isShowSupport
})


  onMounted(
    async () => { 
	  console.log('support-one')
	  states.showSupport = props.isShowSupport
	  //if(initState()) init()
	  //initState()
	}
  )

</script>
<style scoped>
input, textarea{width:100% !important;}
.p-dialog .p-dialog-content{
  border-top: 0 none;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
}

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
