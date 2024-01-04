<template>
  <div class="cat-filters-sidebar" ref="filter">
    <cat-side-bar-search-names />
    <side-bar-fieldset v-if="userStore.adminIsLogin" header="Adopted:">
      <cat-side-bar-check-box
        :sorts="filterByAdopted"
        :action="HANDLE_CHANGE_FILTER_BY_ADOPTED"
      />
    </side-bar-fieldset>
    <side-bar-fieldset header="Sort By:">
      <cat-side-bar-radio-box
        :sorts="sortBy"
        :action="HANDLE_CHANGE_SORTBY"
        name="sortBy"
      />
    </side-bar-fieldset>
    <side-bar-fieldset header="Sort By Order:">
      <cat-side-bar-radio-box
        :sorts="sortByOrder"
        :action="HANDLE_CHANGE_SORTBY_ORDER"
        name="sortByOrder"
      />
    </side-bar-fieldset>
    <side-bar-fieldset header="Filters:">
      <cat-side-bar-check-box :sorts="filterCats" :action="HANDLE_FILTERS" />
    </side-bar-fieldset>
    <button class="filter" @click="mobileFilter">
      <font-awesome-icon
        :icon="['fas', 'filter']"
        flip="horizontal"
        class="filter-icon"
      />
      <span ref="filterText">Filter</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import SideBarFieldset from "@/components/Shared/SideBarFieldset.vue";
import CatSideBarRadioBox from "@/components/CatResults/CatSideBar/CatSideBarRadioBox.vue";
import CatSideBarCheckBox from "@/components/CatResults/CatSideBar/CatSideBarCheckBox.vue";
import CatSideBarSearchNames from "@/components/CatResults/CatSideBar/CatSideBarSearchNames.vue";

import { useCatsStore } from "@/stores/cats";
import { useUserStore } from "@/stores/user";

const filter = ref<HTMLDivElement | null>(null);
const filterText = ref<HTMLDivElement | null>(null);
const visibleFilter = ref(true);

const catsStore = useCatsStore();
const userStore = useUserStore();

const filterByAdopted = computed(() => catsStore.filterByAdopted);
const HANDLE_CHANGE_FILTER_BY_ADOPTED = computed(
  () => catsStore.HANDLE_CHANGE_FILTER_BY_ADOPTED
);

const sortBy = computed(() => catsStore.sortBy);
const HANDLE_CHANGE_SORTBY = computed(() => catsStore.HANDLE_CHANGE_SORTBY);

const sortByOrder = computed(() => catsStore.sortByOrder);
const HANDLE_CHANGE_SORTBY_ORDER = computed(
  () => catsStore.HANDLE_CHANGE_SORTBY_ORDER
);

const filterCats = computed(() => catsStore.filterCats);
const HANDLE_FILTERS = computed(() => catsStore.HANDLE_FILTERS);

const mobileFilter = () => {
  if (filter.value != null && filterText.value != null) {
    filter.value.classList.add("mobile-filter");
    if (visibleFilter.value) {
      filterText.value.textContent = "Apply";
      visibleFilter.value = !visibleFilter.value;
    } else {
      filter.value.classList.remove("mobile-filter");
      filterText.value.textContent = "Filter";
      visibleFilter.value = !visibleFilter.value;
    }
  }
};
</script>

<style lang="scss" scoped>
.cat-filters-sidebar {
  width: 300px;
  min-height: 500px;
  margin-top: 10px;
  padding: 0 16px;
  @include flex(column, start, start);
  gap: 16px;

  @media (max-width: $mobile-max-size) {
    background-color: $white-color;
    position: fixed;
    width: calc(100% - 32px);
    height: 100%;
    margin-top: 0;
    top: 0;
    left: -100%;
    z-index: 1000;
    @include flex(column, center, start);
    transition: 1s;

    &.mobile-filter {
      transition: 1s;
      left: 0;
    }
  }
}

.filter {
  visibility: hidden;
  @include flex(row, center, center);
  gap: 7px;
  position: fixed;
  padding: 18px 25px;
  border-radius: 20px;
  right: 15px;
  bottom: 40px;
  cursor: pointer;
  border: 1px solid $light-gray-color;
  transition: transform 0.3s ease;
  box-shadow:
    rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;

  @media (max-width: $mobile-max-size) {
    visibility: visible;
  }

  &:hover {
    transform: scale(1.05);
  }
  .filter-icon {
    display: block;
    font-size: 28px;
    color: $primary-color;
  }

  span {
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
