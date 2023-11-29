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
        :blurred="index <= activeIndex - 1 || index >= activeIndex + 1"
        @mouseover="pauseSlider(index)"
        @mouseleave="moveSlider"
        @click="openModal(item, index)"
        :class="{ activeCat: index === activeIndex }"
      />
    </ul>
  </div>

  <modal-cat
    :cat-info="catInfo"
    :show-modal="showModal"
    @close-modal="closeModal"
    @open-modal-confirmation="openModalConfirmation"
  />

  <modal-for-confirmation
    :cat-info="catInfo"
    :show-modal="showModalConfirmation"
    @close-modal="closeModalConfirmation"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";

import ModalCat from "@/components/Modals/ModalCat.vue";
import ModalForConfirmation from "@/components/Modals/ModalForConfirmation.vue";

import CarouselCard from "@/components/Carousel/CarouselCard.vue";
import { useCatsStore } from "@/stores/cats";
import type { Cat } from "@/api/types";

const catsStore = useCatsStore();

const displaysCats = computed(() => [...catsStore.carouselCats]);

// Modals
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

const showModalConfirmation = ref(false);

const openModalConfirmation = () => {
  showModalConfirmation.value = true;
};

const closeModalConfirmation = () => {
  showModalConfirmation.value = false;
};

// End of modal

const activeIndex = ref(1);
const carousel = ref<HTMLDivElement | null>(null);
const interval = ref<ReturnType<typeof setInterval>>();
const direction = ref<"right" | "left">("right");

const scrollCarousel = (direction: string) => {
  if (carousel.value != null) {
    if (carousel.value.offsetWidth < 768) {
      if (direction == "left")
        carousel.value.scrollLeft -= carousel.value.offsetWidth;
      else {
        carousel.value.scrollLeft += carousel.value.offsetWidth;
      }
    } else {
      if (direction == "left")
        carousel.value.scrollLeft -= carousel.value.offsetWidth / 3;
      else carousel.value.scrollLeft += carousel.value.offsetWidth / 3;
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
  if (carousel.value != null) {
    if (carousel.value.offsetWidth > 768) {
      clearInterval(interval.value);
    }
  }
};

onMounted(moveSlider);

const infiniteScroll = () => {
  if (carousel.value != null) {
    if (carousel.value.offsetWidth > 768) {
      if (
        carousel.value.scrollLeft >=
        carousel.value.scrollWidth / 2 + carousel.value.offsetWidth / 3
      ) {
        carousel.value.classList.add("no-transition");
        carousel.value.scrollLeft = carousel.value.offsetWidth / 3; // 370.39999
        carousel.value.classList.remove("no-transition");
        activeIndex.value = 2;
      } else if (carousel.value.scrollLeft <= 0) {
        carousel.value.classList.add("no-transition");
        carousel.value.scrollLeft = carousel.value.scrollWidth / 2;
        carousel.value.classList.remove("no-transition");
        activeIndex.value = 5;
      }
    } else {
      if (
        carousel.value.scrollLeft >=
        carousel.value.scrollWidth - carousel.value.offsetWidth * 2.1
      ) {
        carousel.value.classList.add("no-transition");
        carousel.value.scrollLeft = carousel.value.offsetWidth * 2;
        carousel.value.classList.remove("no-transition");
        activeIndex.value = 2;
      } else if (carousel.value.scrollLeft <= 0) {
        carousel.value.classList.add("no-transition");
        carousel.value.scrollLeft = carousel.value.offsetWidth * 4;
        carousel.value.classList.remove("no-transition");
        activeIndex.value = 4;
      }
    }
  }
};

const mobileSlider = () => {
  if (carousel.value != null) {
    if (carousel.value.offsetWidth < 768) {
      activeIndex.value = 0;
    }
  }
};

onMounted(mobileSlider);
</script>

<style lang="scss" scoped>
.wrapper-carousel {
  padding-top: 5px;
  max-width: $computer-max-size;
  margin: 0 auto;
  position: relative;

  .commands {
    color: $secondary-color;
    height: 35px;
    width: 35px;
    background-color: $white-color;
    border-radius: 50%;
    padding: 5px;
    text-align: center;
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
    touch-action: none;

    &.hoverEffect {
      pointer-events: none;
    }

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
