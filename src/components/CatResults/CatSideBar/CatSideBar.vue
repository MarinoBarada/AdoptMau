<template>
  <div class="cat-filters-sidebar">
    <side-bar-fieldset header="Sort By:">
      <cat-side-bar-sort-by />
    </side-bar-fieldset>
  </div>
</template>

<script lang="ts" setup>
import SideBarFieldset from "@/components/Shared/SideBarFieldset.vue";
import CatSideBarSortBy from "@/components/CatResults/CatSideBar/CatSideBarSortBy.vue";
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
