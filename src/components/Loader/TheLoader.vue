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

  .loader {
    @include loader;
  }
}
</style>
