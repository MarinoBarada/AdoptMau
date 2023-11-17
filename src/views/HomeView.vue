<template>
  <the-header />
  <the-carousel />

  <div class="cat-results">
    <cat-side-bar />
    <cat-listings />
  </div>
</template>

<script lang="ts" setup>
import TheHeader from "@/components/Header/TheHeader.vue";
import TheCarousel from "@/components/Carousel/TheCarousel.vue";
import CatListings from "@/components/CatResults/CatListings/CatListings.vue";
import CatSideBar from "@/components/CatResults/CatSideBar/CatSideBar.vue";

import { onMounted } from "vue";

import { useCatsStore } from "@/stores/cats";

const catsStore = useCatsStore();
onMounted(catsStore.FETCH_CATS);
</script>

<style lang="scss" scoped>
.cat-results {
  @include flex(row, start, start);
  flex-wrap: nowrap;
  max-width: $computer-max-size;
  margin: 0 auto;
  position: relative;
  min-height: 800px;
  margin-top: 30px;
}
</style>
