<template>
  <div class="cat-filters-sidebar">
    <side-bar-fieldset header="Sort By:">
      <cat-side-bar-radio-box
        :sorts="sortBy"
        :action="HANDLE_CHANGE_SORTBY"
        name="sortBy"
      />
    </side-bar-fieldset>
    <side-bar-fieldset header="Sort By Type:">
      <cat-side-bar-radio-box
        :sorts="sortByType"
        :action="HANDLE_CHANGE_SORTBY_TYPE"
        name="sortByType"
      />
    </side-bar-fieldset>
    <side-bar-fieldset header="Filters:">
      <cat-side-bar-check-box :sorts="filterCats" :action="HANDLE_FILTERS" />
    </side-bar-fieldset>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import SideBarFieldset from "@/components/Shared/SideBarFieldset.vue";
import CatSideBarRadioBox from "@/components/CatResults/CatSideBar/CatSideBarRadioBox.vue";
import CatSideBarCheckBox from "@/components/CatResults/CatSideBar/CatSideBarCheckBox.vue";

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const sortBy = computed(() => userStore.sortBy);
const HANDLE_CHANGE_SORTBY = computed(() => userStore.HANDLE_CHANGE_SORTBY);

const sortByType = computed(() => userStore.sortByType);
const HANDLE_CHANGE_SORTBY_TYPE = computed(
  () => userStore.HANDLE_CHANGE_SORTBY_TYPE
);

const filterCats = computed(() => userStore.filterCats);
const HANDLE_FILTERS = computed(() => userStore.HANDLE_FILTERS);
</script>

<style lang="scss" scoped>
.cat-filters-sidebar {
  width: 300px;
  min-height: 500px;
  margin-top: 10px;
  padding: 16px;

  @media (max-width: $mobile-max-size) {
    position: absolute;
    width: 80%;
    top: 0;
    left: 0;
  }
}
</style>
