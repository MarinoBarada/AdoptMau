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


  return {
    sortBy,
    sortByType,
    HANDLE_CHANGE_SORTBY,
    HANDLE_CHANGE_SORTBY_TYPE
  }
});