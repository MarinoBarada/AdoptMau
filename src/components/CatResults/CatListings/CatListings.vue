<template>
  <div class="cat-listings">
    <ul>
      <cat-listings-card
        v-for="cat in displayedCats"
        :key="cat.id"
        :cat="cat"
        @open-modal="openModal(cat)"
      />
    </ul>
    <button
      class="see-more"
      v-if="FILTERED_CATS.length > seeMore * maxDisplayedCats"
      @click="CLICK_SEE_MORE"
    >
      SEE MORE
    </button>
  </div>

  <modal-for-confirmation
    :cat-info="catInfo"
    :show-modal="showModal"
    @close-modal="closeModal"
  />
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import CatListingsCard from "@/components/CatResults/CatListings/CatListingsCard.vue";
import ModalForConfirmation from "@/components/Modals/ModalForConfirmation.vue";

import { useCatsStore } from "@/stores/cats";
import { useUserStore } from "@/stores/user";
import type { Cat } from "@/api/types";

const showModal = ref(false);
const catInfo = ref({});

const openModal = (cat: Cat) => {
  catInfo.value = cat;
  showModal.value = true;
};

const closeModal = () => {
  catInfo.value = {};
  showModal.value = false;
};

const catsStore = useCatsStore();
const FILTERED_CATS = computed(() => catsStore.FILTERED_CATS);

const userStore = useUserStore();
const seeMore = computed(() => userStore.seeMore);
const CLICK_SEE_MORE = computed(() => userStore.CLICK_SEE_MORE);
const maxDisplayedCats = ref(20);

const displayedCats = computed(() => {
  return FILTERED_CATS.value.slice(0, seeMore.value * maxDisplayedCats.value);
});
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
      background-color: $secondary-color-hover;
    }
  }

  ul {
    @include flex(row, flex-start, start);
    flex-wrap: wrap;
    list-style: none;
  }
}
</style>
