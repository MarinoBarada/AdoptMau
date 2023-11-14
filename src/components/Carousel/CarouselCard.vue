<template>
  <li class="card">
    <div class="glass active" v-if="blurred"></div>
    <div class="img">
      <img :src="cat.picture" :alt="cat.name" />
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
  cursor: pointer;
  height: 400px;
  list-style: none;
  background: white;
  border-radius: 8px;
  position: relative;

  .name {
    width: calc(100% - 10px);
    position: absolute;
    bottom: 0;
    left: 0;
    padding-bottom: 20px;
    padding-left: 10px;
    padding-top: 10px;
    z-index: 10;
    font-size: 20px;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 1)
    );
  }

  .glass {
    position: absolute;
    background-color: rgba(218, 213, 213, 0.75);
    transition: 0.5s;

    &.active {
      width: 100%;
      height: 100%;
      z-index: 100;
    }
  }

  .img {
    height: 100%;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      &:hover {
        scale: 1.1;
      }
    }
  }
}
</style>
