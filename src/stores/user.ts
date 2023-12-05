import { ref } from "vue";
import { defineStore } from "pinia";

import type { SortBy } from "@/api/types";


export const useUserStore = defineStore("user", () => {

  const sortBy = ref<SortBy[]>([
    { name: "Age", value: true },
    { name: "Name", value: false },
  ]);

  const sortByType = ref<SortBy[]>([
    { name: "Ascending", value: true },
    { name: "Descending", value: false },
  ]);

  const filterCats = ref<SortBy[]>([
    { name: "Younger than 6 months", value: false },
    { name: "Younger than 12 months", value: false },
    { name: "Black for color", value: false }
  ]);

  const nameSearch = ref("");

  const seeMore = ref(1);

  const adminIsLogin = ref(false);

  const ADMIN_LOGIN_LOGOUT = () => {
    adminIsLogin.value = !adminIsLogin.value;
  };

  const CLICK_SEE_MORE = () => {
    HANDLE_CHANGE_SORTBY("Age");
    HANDLE_CHANGE_SORTBY_TYPE("Ascending");
    seeMore.value++;
  };

  const HANDLE_CHANGE_SORTBY = (selectedValue: string) => {
    sortBy.value.forEach((obj) => {
      if (obj.name === selectedValue) obj.value = true;
      else obj.value = false;
    })
  };

  const HANDLE_CHANGE_SORTBY_TYPE = (selectedValue: string) => {
    sortByType.value.forEach((obj) => {
      if (obj.name === selectedValue) obj.value = true;
      else obj.value = false;
    })

  };
  const HANDLE_FILTERS = (selectedValue: string) => {
    filterCats.value.forEach((obj) => {
      if (obj.name === selectedValue) obj.value = !obj.value;
    })
  };

  const UPDATE_NAME_SEARCH = (name: string) => {
    nameSearch.value = name;
  }

  return {
    sortBy,
    sortByType,
    filterCats,
    nameSearch,
    seeMore,
    adminIsLogin,
    ADMIN_LOGIN_LOGOUT,
    CLICK_SEE_MORE,
    HANDLE_CHANGE_SORTBY,
    HANDLE_CHANGE_SORTBY_TYPE,
    HANDLE_FILTERS,
    UPDATE_NAME_SEARCH
  }
});