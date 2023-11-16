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
    <ul class="carousel" ref="carousel" @scroll="infiniteScroll">
      <carousel-card
        v-for="(item, index) in displaysCats"
        :key="index"
        :cat="item"
        :blurred="index == activeIndex - 1 || index == activeIndex + 1"
        @mouseover="pauseSlider(index)"
        @mouseleave="moveSlider"
        @click="openModal(item, index)"
      />
    </ul>
  </div>

  <modal-cat
    :cat-info="catInfo"
    :show-modal="showModal"
    @close-modal="closeModal"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";

import ModalCat from "@/components/Modal/ModalCat.vue";

import CarouselCard from "@/components/Carousel/CarouselCard.vue";
import { useCatsStore } from "@/stores/cats";
import type { Cat } from "@/api/types";

const catsStore = useCatsStore();
onMounted(catsStore.FETCH_CATS);

const displaysCats = computed(() => [
  ...catsStore.cats.slice(0, 4),
  ...catsStore.cats.slice(0, 4)
]);

// Modal
const showModal = ref(false);
const catInfo = ref({});

const openModal = (cat: Cat, index: number) => {
  if (index == activeIndex.value) {
    catInfo.value = cat;
    showModal.value = true;
  }
};

const closeModal = () => {
  catInfo.value = {};
  showModal.value = false;
};
// End of modal

const activeIndex = ref(1);
const carousel = ref<HTMLDivElement | null>(null);
const wrapperCarousel = ref<HTMLDivElement | null>(null);
const interval = ref<ReturnType<typeof setInterval>>();
const direction = ref<"right" | "left">("right");

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
        carousel.value.scrollLeft -= wrapperCarousel.value.clientWidth / 3 + 6;
      else
        carousel.value.scrollLeft += wrapperCarousel.value.clientWidth / 3 + 6;
    }
  }
};

const rightButton = () => {
  scrollCarousel("right");
  direction.value = "right";
  activeIndex.value++;
};

const leftButton = () => {
  scrollCarousel("left");
  direction.value = "left";
  activeIndex.value--;
};

const moveLeftRight = (direction: string) => {
  scrollCarousel(direction);
  if (direction == "left") {
    activeIndex.value--;
  } else {
    activeIndex.value++;
  }
};

const moveSlider = () => {
  clearInterval(interval.value);
  interval.value = setInterval(() => {
    moveLeftRight(direction.value);
  }, 2000);
};

onBeforeUnmount(() => clearInterval(interval.value));

const pauseSlider = (index: number) => {
  if (index == activeIndex.value) pause();
};

const pause = () => {
  clearInterval(interval.value);
};

onMounted(moveSlider);

const infiniteScroll = () => {
  if (carousel.value != null && wrapperCarousel.value != null) {
    if (wrapperCarousel.value.clientWidth > 768) {
      if (carousel.value.scrollLeft === 0) {
        carousel.value.classList.add("no-transition");
        carousel.value.scrollLeft = carousel.value.scrollWidth / 2;
        carousel.value.classList.remove("no-transition");
        activeIndex.value = 5;
      } else if (
        Math.ceil(carousel.value.scrollLeft) ===
        carousel.value.scrollWidth - carousel.value.offsetWidth
      ) {
        carousel.value.classList.add("no-transition");
        carousel.value.scrollLeft =
          carousel.value.scrollWidth - 2 * carousel.value.offsetWidth - 28;
        carousel.value.classList.remove("no-transition");
        activeIndex.value = 3;
      }
    } else if (activeIndex.value == 0) {
      carousel.value.classList.add("no-transition");
      carousel.value.scrollLeft = carousel.value.scrollWidth / 2;
      activeIndex.value = 4;
      carousel.value.classList.remove("no-transition");
    } else if (activeIndex.value == 8) {
      carousel.value.classList.add("no-transition");
      carousel.value.scrollLeft = 0;
      activeIndex.value = 0;
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
</script>

<style lang="scss" scoped>
.wrapper-carousel {
  padding-top: 10px;
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
      right: 32%;
      @media (max-width: $mobile-max-size) {
        right: 3%;
      }
    }

    &.left {
      left: 32%;
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
