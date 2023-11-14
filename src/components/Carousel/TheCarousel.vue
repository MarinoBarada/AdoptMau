<template>
  <div class="wrapper" ref="wrapper">
    <font-awesome-icon
      :icon="['fas', 'angle-left']"
      class="commands left"
      @click="leftButton"
    />
    <font-awesome-icon
      :icon="['fas', 'angle-right']"
      class="commands right"
      @click="rightButton"
    />
    <ul class="carousel" ref="carousel">
      <carousel-card
        v-for="(item, index) in displaysCats"
        :key="index"
        :cat="item"
        :blurred="index == firstIndex || index == lastIndex - 1"
        @mouseover="pause(index)"
        @mouseleave="moveSlider"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";

import CarouselCard from "@/components/Carousel/CarouselCard.vue";
import { useCatsStore } from "@/stores/cats";

const catsStore = useCatsStore();
onMounted(catsStore.FETCH_CATS);

const displaysCats = computed(() => catsStore.cats.slice(0, 4));

const firstIndex = ref(0);
const lastIndex = ref(3);
const carousel = ref<HTMLDivElement | null>(null);
const wrapper = ref<HTMLDivElement | null>(null);
const interval = ref<ReturnType<typeof setInterval>>();

const leftButton = () => {
  if (carousel.value != null && wrapper.value != null) {
    carousel.value.scrollLeft -= wrapper.value.clientWidth / 3 + 16;
    if (firstIndex.value === 0) {
      const lastCat = displaysCats.value[lastIndex.value];
      if (lastCat != undefined) displaysCats.value.unshift(lastCat);
      firstIndex.value++;
      lastIndex.value++;
    }
    firstIndex.value--;
    lastIndex.value--;
  }
};

const rightButton = () => {
  if (carousel.value != null && wrapper.value != null) {
    carousel.value.scrollLeft += wrapper.value.clientWidth / 3 + 16;
    const firstCat = displaysCats.value[firstIndex.value];
    if (firstCat != undefined) displaysCats.value.push(firstCat);
    firstIndex.value++;
    lastIndex.value++;
  }
};

const moveSlider = () => {
  clearInterval(interval.value);
  interval.value = setInterval(() => {
    rightButton();
  }, 2000);
};

onMounted(moveSlider);

onBeforeUnmount(() => clearInterval(interval.value));

const pause = (index: number) => {
  if (index == firstIndex.value + 1) clearInterval(interval.value);
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 30px;
  max-width: 1900px;
  margin: 0 auto;
  position: relative;

  .commands {
    color: $secondary-color;
    height: 35px;
    background-color: $white-color;
    width: 35px;
    border-radius: 50%;
    padding: 5px;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: 50%;
    z-index: 10;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.23);

    &:hover {
      color: $white-color;
      background-color: $secondary-color;
    }

    &.right {
      right: calc((100% / 3) - 25px);
    }

    &.left {
      left: calc((100% / 3) - 25px);
    }
  }

  .carousel {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: calc((100% / 3) - 12px);
    gap: 16px;
    overflow: hidden;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: 0;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
