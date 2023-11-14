import { ref } from "vue";
import { defineStore } from "pinia";

import getCats from "@/api/getCats";
import type { Cat } from "@/api/types";

export const useCatsStore = defineStore("cats", () => {
  const cats = ref<Cat[]>([]);

  const FETCH_CATS = async () => {
    const receiveCats = await getCats();
    cats.value = receiveCats.sort((a, b) => a.age - b.age);
  };

  return {
    cats,
    FETCH_CATS
  }
});