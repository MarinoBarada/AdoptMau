import { ref, computed } from "vue";
import { defineStore } from "pinia";

import getCats from "@/api/getCats";
import type { Cat } from "@/api/types";
import { useUserStore } from "@/stores/user";


export const useCatsStore = defineStore("cats", () => {
  const cats = ref<Cat[]>([]);

  const FETCH_CATS = async () => {
    const receiveCats = await getCats();
    cats.value = receiveCats.sort((a, b) => a.age - b.age);
  };

  const FILTERED_CATS = computed(() => SORTED_CATS.value);

  const SORTED_CATS = computed(() => {
    const userStore = useUserStore();
    if (userStore.sortBy[0].value) {
      if (userStore.sortByType[0].value)
        return cats.value.sort((a, b) => a.age - b.age);
      else
        return cats.value.sort((a, b) => b.age - a.age);
    } else {
      if (userStore.sortByType[0].value)
        return cats.value.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
      else
        return cats.value.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1);

    }
  })

  return {
    cats,
    FETCH_CATS,
    SORTED_CATS,
    FILTERED_CATS
  }
});