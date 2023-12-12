<template>
  <div class="loader-wrapper">
    <span class="loader" ref="loader" data-testid="loader"></span>
    <div class="message" ref="messages">
      <font-awesome-icon :icon="['fas', 'circle-check']" class="check" />
      <h1>{{ props.message }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const loader = ref<HTMLSpanElement | null>(null);
const messages = ref<HTMLDivElement | null>(null);
const timeout = ref<ReturnType<typeof setTimeout>>();
const timeoutToGo = ref<ReturnType<typeof setTimeout>>();
const router = useRouter();

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  }
});

const loadingView = () => {
  timeout.value = setTimeout(showMessage, 3000);
  toGo();
  restartAll();
};

onMounted(loadingView);

onBeforeUnmount(() => {
  clearTimeout(timeoutToGo.value);
  clearTimeout(timeout.value);
});

const toGo = () => {
  timeoutToGo.value = setTimeout(() => {
    router.push({ name: props.destination });
    clearTimeout(timeoutToGo.value);
  }, 4500);
};

const showMessage = () => {
  if (loader.value != null && messages.value != null) {
    loader.value.classList.add("display-none");
    messages.value.classList.add("display-block");
    clearTimeout(timeout.value);
  }
};

const restartAll = () => {
  if (loader.value != null && messages.value != null) {
    loader.value.classList.remove("display-none");
    messages.value.classList.remove("display-block");
  }
};
</script>

<style lang="scss">
.loader-wrapper {
  position: absolute;
  @include modal-overlay(rgba(0, 0, 0, 0.91), 1000);
  @include flex(row, center, center);

  .message {
    @include flex(column, center, center);
    gap: 10px;
    display: none;
    animation: animatebottom 2s ease-in;

    .check {
      font-size: 100px;
      color: green;

      @media (max-width: $mobile-max-size) {
        font-size: 80px;
      }
    }

    h1 {
      color: white;
      text-align: center;
      font-size: 50px;

      @media (max-width: $mobile-max-size) {
        font-size: 30px;
      }
    }

    &.display-block {
      display: flex;
    }
  }

  @keyframes animatebottom {
    from {
      bottom: -100px;
      opacity: 0;
    }
    to {
      bottom: 0;
      opacity: 1;
    }
  }

  .loader {
    display: block;
    color: #fff;
    font-size: 25px;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
    animation: mulShdSpin 1.3s infinite linear;
    transform: translateZ(0);

    @media (max-width: $mobile-max-size) {
      font-size: 20px;
    }

    &.display-none {
      display: none;
    }
  }

  @keyframes mulShdSpin {
    0%,
    100% {
      box-shadow:
        0 -3em 0 0.2em,
        2em -2em 0 0em,
        3em 0 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 -1em,
        -3em 0 0 -1em,
        -2em -2em 0 0;
    }
    12.5% {
      box-shadow:
        0 -3em 0 0,
        2em -2em 0 0.2em,
        3em 0 0 0,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 -1em,
        -3em 0 0 -1em,
        -2em -2em 0 -1em;
    }
    25% {
      box-shadow:
        0 -3em 0 -0.5em,
        2em -2em 0 0,
        3em 0 0 0.2em,
        2em 2em 0 0,
        0 3em 0 -1em,
        -2em 2em 0 -1em,
        -3em 0 0 -1em,
        -2em -2em 0 -1em;
    }
    37.5% {
      box-shadow:
        0 -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0em 0 0,
        2em 2em 0 0.2em,
        0 3em 0 0em,
        -2em 2em 0 -1em,
        -3em 0em 0 -1em,
        -2em -2em 0 -1em;
    }
    50% {
      box-shadow:
        0 -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0 0 -1em,
        2em 2em 0 0em,
        0 3em 0 0.2em,
        -2em 2em 0 0,
        -3em 0em 0 -1em,
        -2em -2em 0 -1em;
    }
    62.5% {
      box-shadow:
        0 -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 0,
        -2em 2em 0 0.2em,
        -3em 0 0 0,
        -2em -2em 0 -1em;
    }
    75% {
      box-shadow:
        0em -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0em 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 0,
        -3em 0em 0 0.2em,
        -2em -2em 0 0;
    }
    87.5% {
      box-shadow:
        0em -3em 0 0,
        2em -2em 0 -1em,
        3em 0 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 0,
        -3em 0em 0 0,
        -2em -2em 0 0.2em;
    }
  }
}
</style>
