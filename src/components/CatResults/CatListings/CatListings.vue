<template>
  <div class="cat-listings">
    <ul>
      <cat-listings-card
        v-for="cat in displayedCats"
        :key="cat.id"
        :cat="cat"
        @open-adopt-modal="openAdoptModal(cat)"
        @open-delete-modal="openDeleteModal(cat)"
      />
    </ul>
    <button
      class="see-more"
      v-if="FILTERED_CATS.length > seeMore * maxDisplayedCats"
      @click="CLICK_SEE_MORE"
    >
      SEE MORE
    </button>
    <div v-if="FILTERED_CATS.length == 0" class="empty-filter">
      <p>Unfortunately the cat you were looking for does not exist!</p>
      <p>Try changing the filters!</p>
      <img src="cat.ico" alt="cat" />
    </div>
  </div>

  <modal-for-confirmation
    :cat-info="catInfo"
    :show-modal="showAdoptModal"
    modal-type="adopted"
    @close-modal="closeAdoptModal"
  />

  <modal-for-confirmation
    :cat-info="catInfo"
    :show-modal="showDeleteModal"
    modal-type="delete"
    @close-modal="closeDeleteModal"
  />
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import CatListingsCard from "@/components/CatResults/CatListings/CatListingsCard.vue";
import ModalForConfirmation from "@/components/Modals/ModalForConfirmation.vue";

import { useCatsStore } from "@/stores/cats";
import { useUserStore } from "@/stores/user";
import type { Cat } from "@/api/types";

const showAdoptModal = ref(false);
const showDeleteModal = ref(false);
const catInfo = ref({});

const openAdoptModal = (cat: Cat) => {
  catInfo.value = cat;
  showAdoptModal.value = true;
};

const closeAdoptModal = () => {
  catInfo.value = {};
  showAdoptModal.value = false;
};
const openDeleteModal = (cat: Cat) => {
  catInfo.value = cat;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  catInfo.value = {};
  showDeleteModal.value = false;
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

  .empty-filter {
    @include flex(column, center, center);
    margin-top: 30px;
    gap: 15px;

    p {
      font-size: 20px;
      text-align: center;
      font-weight: 700;
    }

    img:hover {
      animation: Shake 0.5s linear infinite;
      cursor: pointer;
    }
  }

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
