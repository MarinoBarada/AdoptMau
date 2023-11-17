<template>
  <cat-side-bar-radio-box
    :sorts="sortBy"
    :action="userStore.HANDLE_CHANGE_SORTBY"
  />
</template>

<script lang="ts" setup>
import CatSideBarRadioBox from "@/components/CatResults/CatSideBar/CatSideBarRadioBox.vue";
import { computed } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const sortBy = computed(() => userStore.sortBy);
</script>
