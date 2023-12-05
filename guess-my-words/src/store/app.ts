// Utilities
import { defineStore } from 'pinia'
import {computed, ref} from 'vue'
import IAccount from "@/models/IAccount";

export const useStore = defineStore('app', () => {
  const logged =  ref(false)
  const userAccount = ref<IAccount>({
    username: '',
    id: -1
  })

  const setLogged = (isLog: boolean) => { 
    logged.value = isLog
    if(!isLog) {
      userAccount.value = {
        username: '',
        id: -1
      }
    }
  }
  const setUserAccount = (newUserAccount: IAccount) => { 
    userAccount.value = newUserAccount
    logged.value = true
  }

  const isLogged = computed(() => logged.value)
  const getUserAccount = computed(() => userAccount.value)

  return {
    setLogged,
    setUserAccount,
    isLogged,
    getUserAccount
  }
})
