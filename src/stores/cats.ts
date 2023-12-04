import { ref, computed } from "vue";
import { defineStore } from "pinia";

import getCats from "@/api/getCats";
import adoptCat from "@/api/adoptCat";
import type { Cat } from "@/api/types";
import { useUserStore } from "@/stores/user";


export const useCatsStore = defineStore("cats", () => {
  const cats = ref<Cat[]>([]);
  const carouselCats = ref<Cat[]>([]);

  const FETCH_CATS = async () => {
    const receiveCats = await getCats();
    cats.value = receiveCats.sort((a, b) => a.age - b.age);
    carouselCats.value = [...cats.value.filter((cat) => cat.adopted == false).slice(0, 4), ...cats.value.filter((cat) => cat.adopted == false).slice(0, 4)];
  };

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
  });

  const INCLUDE_CATS_YOUNGER_THEN_6 = (cat: Cat) => {
    const userStore = useUserStore();

    if (userStore.filterCats[0].value) return cat.age <= 6;
    return true;
  }

  const INCLUDE_CATS_YOUNGER_THEN_12 = (cat: Cat) => {
    const userStore = useUserStore();

    if (userStore.filterCats[1].value) return cat.age <= 12;
    return true;
  }

  const INCLUDE_CATS_COLOR_BLACK = (cat: Cat) => {
    const userStore = useUserStore();

    if (userStore.filterCats[2].value) return cat.color.toLowerCase().includes("black");
    return true;
  }

  const INCLUDE_CATS_BY_NAME = (cat: Cat) => {
    const userStore = useUserStore();
    return cat.name.toLowerCase().includes(userStore.nameSearch.toLowerCase());
  }

  const FILTERED_CATS = computed(() => {
    return SORTED_CATS.value
      .filter((cat) => INCLUDE_CATS_YOUNGER_THEN_12(cat))
      .filter((cat) => INCLUDE_CATS_YOUNGER_THEN_6(cat))
      .filter((cat) => INCLUDE_CATS_COLOR_BLACK(cat))
      .filter((cat) => INCLUDE_CATS_BY_NAME(cat))
      .filter((cat) => cat.adopted == false);
  });

  const ADOPT_CAT = async (id: number) => {
    await adoptCat(id);
    await FETCH_CATS();
  }

  return {
    cats,
    carouselCats,
    FETCH_CATS,
    SORTED_CATS,
    FILTERED_CATS,
    INCLUDE_CATS_YOUNGER_THEN_6,
    INCLUDE_CATS_YOUNGER_THEN_12,
    INCLUDE_CATS_COLOR_BLACK,
    INCLUDE_CATS_BY_NAME,
    ADOPT_CAT
  }
});