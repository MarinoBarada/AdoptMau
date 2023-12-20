<template>
  <font-awesome-icon
    :icon="typeOfIcon"
    :class="!props.status ? 't-exclamation' : 'check'"
  />

  <h1 class="adoption">
    {{ isAdopt ? "Adoption" : "Delete" }}
    {{ props.status ? "successful" : "unsuccessful" }}
  </h1>
  <p v-if="props.status">You won't be able to return this cutie!</p>
  <p v-else>Error happened try later!</p>

  <button class="yes" @click="closeModal">OK</button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  modalType: {
    type: String,
    required: true
  },
  status: {
    type: null,
    required: true
  }
});

const isAdopt = computed(() => {
  if (props.modalType === "adopt") return true;
  else return false;
});

const typeOfIcon = computed(() =>
  !props.status ? ["fas", "triangle-exclamation"] : ["fas", "circle-check"]
);

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};
</script>

<style lang="scss" scoped>
.check {
  font-size: 90px;
  color: green;
}
.t-exclamation {
  font-size: 90px;
  color: red;
}

h1 {
  text-align: center;
  font-size: 30px;
  width: 90%;
}

p {
  text-align: center;
}

.adoption {
  width: 100%;
}

.yes {
  @include button-style($secondary-color, 0px);

  &:hover {
    background-color: $secondary-color-hover;
  }
}
</style>
