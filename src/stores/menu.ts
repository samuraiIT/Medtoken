import { acceptHMRUpdate, defineStore } from 'pinia'

//export type RootState = {
//  items: null | Items //Array<[]>
//}

export const useMenuStore = defineStore('menu', () => {

  const menustate = ref()
  const menu = ref([])
  const menuemit = ref()
  const menuopen = ref(false)
  
  const usedstate = computed(() => menu.value)
  const usedemit = computed(() => menuemit.value)
  
  const openMenu = () => {
	menuopen.value = !menuopen.value

  }  
  
  const setMenu = (items: any) => {
	menustate.value = items
    menu.value = items

  }
  
   const setMenuEmit = (item: any) => {
	menuemit.value = item
  } 
/*
  const menustate = ref([])
  const menu = ref<RootState | []>()
  //const usedstate = computed(() => Array.from(menu.value))
  const usedstate = computed(() => menu.value)
  const related = null //computed(() => usedstate.value.filter(items => items !== menustate.value))
  const setMenu = (items: Array<RootState>) => {
	menustate.value = items  
    if (menustate.value && menu.value) menu.value.push(menustate.value)
*/
  return {
    setMenu,
	openMenu,
	setMenuEmit,
    //related,
    //menustate,
	usedstate,
	usedemit,
	menuopen,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot))
