<template>
  <div class="loader-wrapper">
    <span v-if="showLoader" class="loader" data-testid="loader"></span>
    <div v-if="!showLoader && showSuccessMessage" class="message">
      <font-awesome-icon
        :icon="typeOfIcon"
        :class="!props.status ? 't-exclamation' : 'check'"
      />
      <h1>{{ props.message }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";

const timeoutShowMessage = ref<ReturnType<typeof setTimeout>>();
const timeoutToGo = ref<ReturnType<typeof setTimeout>>();
const router = useRouter();

const showLoader = ref(true);
const showSuccessMessage = ref(false);

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  status: {
    type: null,
    required: true
  }
});

const showMessage = () => {
  showLoader.value = false;
  showSuccessMessage.value = true;
};

const navigateToDestination = () => {
  router.push({ name: props.destination });
};

const loadingView = () => {
  timeoutShowMessage.value = setTimeout(() => {
    showMessage();
    timeoutToGo.value = setTimeout(navigateToDestination, 1500);
  }, 2000);
};

onMounted(loadingView);

onBeforeUnmount(() => {
  clearTimeout(timeoutToGo.value);
  clearTimeout(timeoutShowMessage.value);
});

const typeOfIcon = computed(() =>
  !props.status ? ["fas", "triangle-exclamation"] : ["fas", "circle-check"]
);
</script>

<style lang="scss">
.loader-wrapper {
  position: absolute;
  @include modal-overlay(rgba(0, 0, 0, 0.91), 1000);
  @include flex(row, center, center);

  .message {
    @include flex(column, center, center);
    gap: 10px;
    animation: animatebottom 2s ease-in;

    .check {
      font-size: 100px;
      color: green;

      @media (max-width: $mobile-max-size) {
        font-size: 80px;
      }
    }

    .t-exclamation {
      font-size: 100px;
      color: red;

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
