<template>
  <div class="wrapper-carousel" ref="wrapper">
    <font-awesome-icon
      :icon="['fas', 'angle-left']"
      class="commands left"
      @click="leftButton"
      @mouseover="pause"
    />
    <font-awesome-icon
      :icon="['fas', 'angle-right']"
      class="commands right"
      @click="rightButton"
      @mouseover="pause"
    />
    <ul class="carousel" ref="carousel">
      <carousel-card
        v-for="(item, index) in displaysCats"
        :key="index"
        :cat="item"
        :blurred="index == firstIndex || index == lastIndex - 1"
        @mouseover="pauseSlider(index)"
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

const scrollCarousel = (direction: string) => {
  if (carousel.value != null && wrapper.value != null) {
    if (wrapper.value.clientWidth < 768) {
      if (direction == "left")
        carousel.value.scrollLeft -= wrapper.value.clientWidth;
      else {
        carousel.value.scrollLeft += wrapper.value.clientWidth;
      }
    } else {
      if (direction == "left")
        carousel.value.scrollLeft -= wrapper.value.clientWidth / 3 + 16;
      else carousel.value.scrollLeft += wrapper.value.clientWidth / 3 + 16;
    }
  }
};

const leftButton = () => {
  scrollCarousel("left");
  if (firstIndex.value === 0) {
    const lastCat = displaysCats.value[lastIndex.value];
    if (lastCat != undefined) displaysCats.value.unshift(lastCat);
    firstIndex.value++;
    lastIndex.value++;
  }
  firstIndex.value--;
  lastIndex.value--;
};

const rightButton = () => {
  scrollCarousel("right");
  const firstCat = displaysCats.value[firstIndex.value];
  if (firstCat != undefined) displaysCats.value.push(firstCat);
  firstIndex.value++;
  lastIndex.value++;
};

const moveSlider = () => {
  clearInterval(interval.value);
  interval.value = setInterval(() => {
    rightButton();
  }, 2000);
};

const mobileScroll = () => {
  if (wrapper.value != null)
    if (wrapper.value.clientWidth < 768) {
      firstIndex.value += 2;
    }
};

onMounted(moveSlider);
onMounted(mobileScroll);

onBeforeUnmount(() => clearInterval(interval.value));

const pauseSlider = (index: number) => {
  if (index == firstIndex.value + 1) pause();
};

const pause = () => {
  clearInterval(interval.value);
};
</script>

<style lang="scss" scoped>
.wrapper-carousel {
  padding-top: 30px;
  max-width: $computer-max-size;
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
      @media (max-width: $mobile-max-size) {
        right: 5px;
      }
    }

    &.left {
      left: calc((100% / 3) - 25px);

      @media (max-width: $mobile-max-size) {
        left: 5px;
      }
    }
  }

  .carousel {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: calc((100% / 3) - 10px);
    gap: 16px;
    overflow: hidden;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: 0;

    @media (max-width: $mobile-max-size) {
      margin-left: 1px;
      grid-auto-columns: 100%;
      gap: 1px;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
