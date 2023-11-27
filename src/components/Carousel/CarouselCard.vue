<template>
  <li class="card">
    <div class="glass active" v-if="blurred"></div>
    <div class="img">
      <img :src="cat.picture" :alt="cat.name" draggable="false" />
    </div>
    <div class="name">
      <h1>{{ cat.name }}</h1>
    </div>
  </li>
</template>

<script setup lang="ts">
import { type PropType } from "vue";
import type { Cat } from "@/api/types";

defineProps({
  cat: {
    type: Object as PropType<Cat>,
    required: true
  },
  blurred: {
    type: Boolean,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.card {
  scroll-snap-align: start;
  width: calc(100% / 3 - 10px);
  flex: 0 0 auto;
  height: 400px;
  transition: transform 0.3s 0.4s ease;
  @include flex(row, center, center);
  font-size: 50px;
  position: relative;
  z-index: 100;
  cursor: pointer;

  @media (max-width: $mobile-max-size) {
    width: calc(100%);
  }

  &.activeCat:hover {
    transform: scale(1.05);
  }

  .name {
    width: calc(100% - 10px);
    position: absolute;
    bottom: 0;
    left: 0;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-top: 10px;
    z-index: 10;
    font-size: 30px;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 1)
    );

    @media (max-width: $tablet-max-size) {
      font-size: 25px;
    }
  }

  .img {
    height: 100%;
    width: 100%;
    border-radius: 8px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .glass {
    position: absolute;
    backdrop-filter: blur(4px);
    background-color: rgba(218, 213, 213, 0.3);
    transition: 0.5s;
    cursor: auto;

    &.active {
      width: 100%;
      height: 100%;
      z-index: 90;
    }
  }
}
</style>
