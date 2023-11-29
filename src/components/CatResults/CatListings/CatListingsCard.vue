<template>
  <li class="card">
    <div class="img">
      <img :src="cat.picture" :alt="cat.name" />
    </div>
    <div class="info">
      <h1>{{ cat.name }}</h1>
      <p><span>Age:</span> {{ cat.age }} months</p>
      <p><span>Color:</span> {{ cat.color }}</p>
    </div>
    <button class="adopt" @click="openModal">ADOPT</button>
  </li>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { Cat } from "@/api/types";

defineProps({
  cat: {
    type: Object as PropType<Cat>,
    required: true
  }
});

const emit = defineEmits(["openModal"]);

const openModal = () => {
  emit("openModal");
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
    }

    p {
      font-size: 16px;

      span {
        font-weight: 600;
      }
    }
  }

  .adopt {
    background-color: $primary-color;
    @include primary-button;
    cursor: pointer;
    margin: 10px;
    border-radius: 8px;

    &:hover {
      background-color: $primary-color-hover;
    }
  }
}
</style>
