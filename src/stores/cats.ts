import { ref, computed } from "vue";
import { defineStore } from "pinia";

import getCats from "@/api/getCats";
import adoptCat from "@/api/adoptCat";
import createNewCat from "@/api/createNewCat";
import editCat from "@/api/editCat";
import deleteCat from "@/api/deleteCat";

import type { Cat } from "@/api/types";
import type { SortBy } from "@/api/types";

export const useCatsStore = defineStore("cats", () => {
  const cats = ref<Cat[]>([]);
  const carouselCats = ref<Cat[]>([]);

  const sortBy = ref<SortBy[]>([
    { name: "Age", value: true },
    { name: "Name", value: false },
  ]);

  const filterByAdopted = ref<SortBy[]>([
    { name: "Adopted", value: false },
  ]);

  const sortByOrder = ref<SortBy[]>([
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

  const fetchSuccessful = ref(true);

  const CLICK_SEE_MORE = () => {
    HANDLE_CHANGE_SORTBY("Age");
    HANDLE_CHANGE_SORTBY_ORDER("Ascending");
    seeMore.value++;
  };

  const HANDLE_CHANGE_SORTBY = (selectedValue: string) => {
    sortBy.value.forEach((obj) => obj.value = (obj.name === selectedValue));
  };

  const HANDLE_CHANGE_FILTER_BY_ADOPTED = (selectedValue: string) => {
    filterByAdopted.value.forEach((obj) => {
      if (obj.name === selectedValue) obj.value = !obj.value;
    })
  };

  const HANDLE_CHANGE_SORTBY_ORDER = (selectedValue: string) => {
    sortByOrder.value.forEach((obj) => obj.value = (obj.name === selectedValue));
  };
  const HANDLE_FILTERS = (selectedValue: string) => {
    filterCats.value.forEach((obj) => {
      if (obj.name === selectedValue) obj.value = !obj.value;
    })
  };

  const UPDATE_NAME_SEARCH = (name: string) => {
    nameSearch.value = name;
  }

  const FETCH_CATS = async () => {
    const receiveCats = await getCats();
    if (receiveCats) {
      cats.value = receiveCats.sort((a, b) => a.age - b.age);
      const nonAdoptedCats = cats.value.filter((cat) => !cat.adopted);
      const nonAdoptedCatsSlice = nonAdoptedCats.slice(0, 4);

      carouselCats.value = [...nonAdoptedCatsSlice, ...nonAdoptedCatsSlice];
    }
    else {
      fetchSuccessful.value = false;
    }
  };

  const SORTED_CATS = computed(() => {
    if (sortBy.value[0].value) {
      if (sortByOrder.value[0].value)
        return cats.value.sort((a, b) => a.age - b.age);
      else
        return cats.value.sort((a, b) => b.age - a.age);
    } else {
      if (sortByOrder.value[0].value)
        return cats.value.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
      else
        return cats.value.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1);
    }
  });

  const INCLUDE_CATS_YOUNGER_THEN_6 = (cat: Cat) => {
    if (filterCats.value[0].value) return cat.age <= 6;
    return true;
  }

  const INCLUDE_CATS_YOUNGER_THEN_12 = (cat: Cat) => {
    if (filterCats.value[1].value) return cat.age <= 12;
    return true;
  }

  const INCLUDE_CATS_COLOR_BLACK = (cat: Cat) => {
    if (filterCats.value[2].value) return cat.color.toLowerCase().includes("black");
    return true;
  }

  const INCLUDE_CATS_BY_NAME = (cat: Cat) => {
    return cat.name.toLowerCase().includes(nameSearch.value.toLowerCase());
  }

  const INCLUDE_CATS_BY_ADOPTED = (cat: Cat) => {
    if (filterByAdopted.value[0].value) return cat.adopted == true;
    return cat.adopted == false;
  }


  const FILTERED_CATS = computed(() => {
    return SORTED_CATS.value
      .filter((cat) => INCLUDE_CATS_YOUNGER_THEN_12(cat))
      .filter((cat) => INCLUDE_CATS_YOUNGER_THEN_6(cat))
      .filter((cat) => INCLUDE_CATS_COLOR_BLACK(cat))
      .filter((cat) => INCLUDE_CATS_BY_NAME(cat))
      .filter((cat) => INCLUDE_CATS_BY_ADOPTED(cat))
  });

  const ADOPT_CAT = async (id: number): Promise<boolean> => {
    const confirmation = await adoptCat(id);
    if (confirmation) {
      await FETCH_CATS();
    }
    return confirmation;
  };

  const CREATE_NEW_CAT = async (cat: Partial<Cat>) => {
    const confirmation = await createNewCat(cat);
    return confirmation;
  };

  const GET_SPECIFIC_CAT = (catID: number) => {
    const result = cats.value.find((cat) => cat.id === catID);
    if (result !== undefined) return result;
    else return <Cat>{};
  };

  const EDIT_CAT = async (id: number, cat: Partial<Cat>) => {
    const confirmation = await editCat(id, cat);
    return confirmation;
  };

  const DELETE_CAT = async (id: number): Promise<boolean> => {
    const confirmation = await deleteCat(id);
    if (confirmation) {
      await FETCH_CATS();
    }
    return confirmation;
  }

  return {
    cats,
    carouselCats,
    sortBy,
    filterByAdopted,
    sortByOrder,
    filterCats,
    nameSearch,
    seeMore,
    fetchSuccessful,
    CLICK_SEE_MORE,
    HANDLE_CHANGE_SORTBY,
    HANDLE_CHANGE_FILTER_BY_ADOPTED,
    HANDLE_CHANGE_SORTBY_ORDER,
    HANDLE_FILTERS,
    UPDATE_NAME_SEARCH,
    FETCH_CATS,
    SORTED_CATS,
    FILTERED_CATS,
    INCLUDE_CATS_YOUNGER_THEN_6,
    INCLUDE_CATS_YOUNGER_THEN_12,
    INCLUDE_CATS_COLOR_BLACK,
    INCLUDE_CATS_BY_NAME,
    INCLUDE_CATS_BY_ADOPTED,
    ADOPT_CAT,
    CREATE_NEW_CAT,
    GET_SPECIFIC_CAT,
    EDIT_CAT,
    DELETE_CAT,
  }
});