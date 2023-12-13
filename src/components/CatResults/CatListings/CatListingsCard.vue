<template>
  <li class="card">
    <div class="img">
      <img :src="cat.picture" :alt="cat.name" />
    </div>
    <div class="info">
      <h1>{{ cat.name }}</h1>
      <p><span>Age:</span> {{ ageDisplay(cat.age) }}</p>
      <p><span>Color:</span> {{ cat.color }}</p>
    </div>
    <div v-if="adminIsLogin" class="edit-delete">
      <router-link :to="`/edit-cat/${cat.id}`" class="edit">
        <font-awesome-icon :icon="['fas', 'pen-to-square']" />
        EDIT
      </router-link>
      <button class="delete" @click="openDeleteModal">
        <font-awesome-icon :icon="['fas', 'trash']" />
        DELETE
      </button>
    </div>
    <button v-else class="adopt" @click="openAdoptModal">ADOPT</button>
  </li>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { computed } from "vue";
import ageDisplay from "@/utils/ageDisplay";

import { useUserStore } from "@/stores/user";
import type { Cat } from "@/api/types";

const userStore = useUserStore();

const adminIsLogin = computed(() => userStore.adminIsLogin);

defineProps({
  cat: {
    type: Object as PropType<Cat>,
    required: true
  }
});

const emit = defineEmits(["openAdoptModal", "openDeleteModal"]);

const openAdoptModal = () => {
  emit("openAdoptModal");
};

const openDeleteModal = () => {
  emit("openDeleteModal");
};
</script>

<style lang="scss" scoped>
.card {
  background-color: $light-gray-color;
  width: calc(20% - 20px);
  margin: 10px;
  min-height: 300px;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  @include flex(column, start, stretch);

  @media (max-width: $computer-max-size) {
    width: calc(25% - 20px);
  }
  @media (max-width: 1500px) {
    width: calc(33.33% - 20px);
  }
  @media (max-width: $tablet-max-size) {
    width: calc(50% - 20px);
  }
  @media (max-width: $mobile-max-size) {
    width: calc(100% - 20px);
  }

  .edit-delete {
    padding: 10px;
    @include flex(row, start, center);
    gap: 10px;

    .edit {
      @include button-style($secondary-color, 0px);
      padding: 6px 10px;
    }

    .delete {
      @include button-style(red, 0px);
    }
  }

  .img {
    height: 300px;

    img {
      @include image;
    }
  }

  .info {
    padding: 10px;

    h1 {
      font-size: 30px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      max-width: 90%;
    }

    p {
      font-size: 16px;

      span {
        font-weight: 600;
      }
    }
  }

  .adopt {
    @include button-style($primary-color, 8px);
    margin: 10px;

    &:hover {
      background-color: $primary-color-hover;
    }
  }
}
</style>
