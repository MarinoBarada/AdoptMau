<template>
  <div v-if="showLoader" class="loader-wrapper">
    <span class="loader"></span>
  </div>
  <div v-else>
    <div v-if="catsStore.fetchSuccessful">
      <the-header />
      <the-carousel />

      <div class="cat-results">
        <cat-side-bar />
        <cat-listings />
      </div>
    </div>

    <div v-else class="fetch-failed">
      <h1>Oops! Something went wrong.</h1>
      <p>Please refresh the page or check your internet connection.</p>
      <p>We're working to fix this issue.</p>
      <p>Apologies for the inconvenience!</p>
      <img src="../../../../public/cat.ico" alt="cat" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TheHeader from "@/components/Header/TheHeader.vue";
import TheCarousel from "@/components/Carousel/TheCarousel.vue";
import CatListings from "@/components/CatResults/CatListings/CatListings.vue";
import CatSideBar from "@/components/CatResults/CatSideBar/CatSideBar.vue";

import { onMounted, ref } from "vue";

import { useCatsStore } from "@/stores/cats";

const catsStore = useCatsStore();
const showLoader = ref(true);
onMounted(async () => {
  await catsStore.FETCH_CATS();
  showLoader.value = false;
});
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

.loader-wrapper {
  position: absolute;
  @include modal-overlay(rgba(0, 0, 0, 0.5), 2000);
  @include flex(row, center, center);

  .loader {
    @include loader;
  }
}

.fetch-failed {
  animation: animatebottom 2s ease-in;
  @include flex(column, center, center);
  margin-top: 10%;
  gap: 10px;
  text-align: center;

  h1 {
    font-size: 50px;
  }

  p {
    font-size: 20px;
  }

  img:hover {
    animation: Shake 0.5s linear infinite;
    cursor: pointer;
  }

  @media (max-width: $mobile-max-size) {
    padding: 15px;

    h1 {
      font-size: 40px;
    }

    p {
      font-size: 16px;
    }
  }
}
</style>
