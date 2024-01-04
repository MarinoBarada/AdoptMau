import { ref } from "vue";
import { defineStore } from "pinia";

import { useCatsStore } from "@/stores/cats";

export const useUserStore = defineStore("user", () => {
  const adminIsLogin = ref(false);

  const ADMIN_LOGIN_LOGOUT = () => {
    const catsStore = useCatsStore();
    adminIsLogin.value = !adminIsLogin.value;
    catsStore.filterByAdopted[0].value = false;
  };

  return {
    adminIsLogin,
    ADMIN_LOGIN_LOGOUT,
  }
});