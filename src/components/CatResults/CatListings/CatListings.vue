<template>
  <div class="cat-listings">
    <ul>
      <cat-listings-card v-for="cat in cats" :key="cat.id" :cat="cat" />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import CatListingsCard from "@/components/CatResults/CatListings/CatListingsCard.vue";

import { useCatsStore } from "@/stores/cats";

const catsStore = useCatsStore();

const cats = computed(() => catsStore.FILTERED_CATS);
</script>

<style lang="scss" scoped>
.cat-listings {
  width: 100%;

  ul {
    @include flex(row, flex-start, start);
    flex-wrap: wrap;
    list-style: none;
  }
}
</style>
