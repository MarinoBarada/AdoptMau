import { ref } from "vue";
import { defineStore } from "pinia";

import type { SortBy } from "@/api/types";


export const useUserStore = defineStore("user", () => {

  const sortBy = ref<SortBy[]>([
    { name: "Age", value: true },
    { name: "Name", value: false },
  ])

  const HANDLE_CHANGE_SORTBY = () => {
    // probaj napraviti tako da učitava na klik name i value od inputa te sve stavi na folse i ako je on se promijenio onda ga minjaj
    sortBy.value[0].value = !sortBy.value[0].value;
    sortBy.value[1].value = !sortBy.value[1].value;
  };

  return {
    sortBy,
    HANDLE_CHANGE_SORTBY
  }
});