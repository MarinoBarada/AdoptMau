<template>
  <div class="cat-listings">
    <ul>
      <cat-listings-card
        v-for="cat in displayedCats"
        :key="cat.id"
        :cat="cat"
      />
    </ul>
    <button
      class="see-more"
      v-if="FILTERED_CATS.length > clickSeeMore * maxDisplayedCats"
      @click="seeMore"
    >
      SEE MORE
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import CatListingsCard from "@/components/CatResults/CatListings/CatListingsCard.vue";

import { useCatsStore } from "@/stores/cats";

const catsStore = useCatsStore();
const FILTERED_CATS = computed(() => catsStore.FILTERED_CATS);
const clickSeeMore = ref(1);
const maxDisplayedCats = ref(20);

const displayedCats = computed(() => {
  return FILTERED_CATS.value.slice(
    0,
    clickSeeMore.value * maxDisplayedCats.value
  );
});

const seeMore = () => {
  clickSeeMore.value++;
};
</script>

<style lang="scss" scoped>
.cat-listings {
  width: 100%;
  @include flex(column, start, stretch);

  .see-more {
    background-color: $secondary-color;
    color: $white-color;
    margin: 30px 10px;
    font-size: 25px;
    font-weight: 700;
    padding: 12px;
    cursor: pointer;
    border-radius: 8px;

    &:hover {
      background-color: #00007b;
    }
  }

  ul {
    @include flex(row, flex-start, start);
    flex-wrap: wrap;
    list-style: none;
  }
}
</style>
