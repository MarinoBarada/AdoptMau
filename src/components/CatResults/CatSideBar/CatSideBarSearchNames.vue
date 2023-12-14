<template lang="">
  <div class="name-filter">
    <h3>Search By Name:</h3>
    <input
      v-model.lazy.trim="nameSearchTerm"
      type="text"
      class="name-filter-input"
      placeholder="Felix, Oreo, Spartapuss"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const nameSearchTerm = computed({
  get() {
    return userStore.nameSearch;
  },
  set(value: string) {
    userStore.UPDATE_NAME_SEARCH(value);
  }
});
</script>

<style lang="scss">
.name-filter {
  h3 {
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    padding-bottom: 5px;
  }

  .name-filter-input {
    width: 100%;
    padding: 10px;
    border: solid 1 px gray;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 2px;
    margin-top: 2px;
  }
}
</style>
