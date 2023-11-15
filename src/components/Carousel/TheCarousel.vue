<template>
  <div class="wrapper-carousel" ref="wrapperCarousel">
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
        :blurred="index == activeIndex - 1 || index == activeIndex + 1"
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

const displaysCats = computed(() => [
  ...catsStore.cats.slice(0, 4),
  ...catsStore.cats.slice(0, 4)
]);

const activeIndex = ref(1);
const carousel = ref<HTMLDivElement | null>(null);
const wrapperCarousel = ref<HTMLDivElement | null>(null);
const interval = ref<ReturnType<typeof setInterval>>();

const scrollCarousel = (direction: string) => {
  if (carousel.value != null && wrapperCarousel.value != null) {
    if (wrapperCarousel.value.clientWidth < 768) {
      if (direction == "left")
        carousel.value.scrollLeft -= wrapperCarousel.value.clientWidth + 7;
      else {
        carousel.value.scrollLeft += wrapperCarousel.value.clientWidth + 7;
      }
    } else {
      if (direction == "left")
        carousel.value.scrollLeft -= wrapperCarousel.value.clientWidth / 3 + 16;
      else
        carousel.value.scrollLeft += wrapperCarousel.value.clientWidth / 3 + 16;
    }
  }
};

const rightButton = () => {
  if (carousel.value != null && wrapperCarousel.value != null) {
    scrollCarousel("right");
    if (wrapperCarousel.value.clientWidth > 768) {
      if (activeIndex.value == 6) {
        carousel.value.classList.add("no-transition");
        carousel.value.scrollLeft =
          carousel.value.scrollWidth - 2 * carousel.value.offsetWidth - 88;
        carousel.value.classList.remove("no-transition");
        activeIndex.value = 2;
      }
    } else if (activeIndex.value == 7) {
      carousel.value.classList.add("no-transition");
      carousel.value.scrollLeft = 0;
      activeIndex.value = -1;
      carousel.value.classList.remove("no-transition");
    }
    activeIndex.value++;
  }
};

const leftButton = () => {
  if (carousel.value != null && wrapperCarousel.value != null) {
    scrollCarousel("left");
    // carousel.value.scrollLeft -= wrapperCarousel.value.clientWidth / 3 + 16;
    activeIndex.value--;
    if (wrapperCarousel.value.clientWidth > 768) {
      if (activeIndex.value == 0) {
        carousel.value.classList.add("no-transition");
        carousel.value.scrollLeft =
          carousel.value.scrollWidth / 2 - carousel.value.offsetWidth / 3 - 12;
        carousel.value.classList.remove("no-transition");
        activeIndex.value = 4;
      }
    } else if (activeIndex.value == -1) {
      carousel.value.classList.add("no-transition");
      carousel.value.scrollLeft =
        carousel.value.scrollWidth - carousel.value.offsetWidth - 10;
      activeIndex.value = 7;
      carousel.value.classList.remove("no-transition");
    }
  }
};

const mobileSlider = () => {
  if (carousel.value != null && wrapperCarousel.value != null) {
    if (wrapperCarousel.value.clientWidth < 768) {
      activeIndex.value = 0;
    }
  }
};

onMounted(mobileSlider);

const moveSlider = () => {
  clearInterval(interval.value);
  interval.value = setInterval(() => {
    rightButton();
  }, 2000);
};
onBeforeUnmount(() => clearInterval(interval.value));

onMounted(moveSlider);

const pauseSlider = (index: number) => {
  if (index == activeIndex.value) pause();
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
    z-index: 1000;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.23);

    &:hover {
      color: $white-color;
      background-color: $secondary-color;
    }

    &.right {
      right: 29.5%;
      @media (max-width: $mobile-max-size) {
        right: 3%;
      }
    }

    &.left {
      left: 31.5%;
      @media (max-width: $mobile-max-size) {
        left: 3%;
      }
    }
  }

  .carousel {
    @include flex(row, start, start);
    transition: transform 0.5s ease;
    gap: 16px;
    overflow-x: auto;
    padding: 20px 0;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: 0;

    @media (max-width: $mobile-max-size) {
      gap: 5px;
    }

    &.no-transition {
      scroll-behavior: auto;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
