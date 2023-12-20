<template>
  <font-awesome-icon
    :icon="['fas', 'circle-exclamation']"
    class="exclamation"
  />

  <h1>Are you sure you want to {{ isAdopt ? "adopt" : "delete" }} this cat?</h1>
  <p>You won't be able to return this cutie!</p>

  <div class="control">
    <button class="yes" @click="action">
      Yes, {{ isAdopt ? "adopt" : "delete" }}!
    </button>
    <button class="cancel" @click="closeModal">Cancel</button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  modalType: {
    type: String,
    required: true
  }
});

const isAdopt = computed(() => {
  if (props.modalType === "adopt") return true;
  else return false;
});

const emit = defineEmits(["closeModal", "action"]);

const closeModal = () => {
  emit("closeModal");
};

const action = () => {
  emit("action");
};
</script>

<style lang="scss" scoped>
.exclamation {
  font-size: 90px;
  color: $primary-color;
}

h1 {
  text-align: center;
  font-size: 30px;
  width: 90%;
}

p {
  text-align: center;
}

.control {
  @include flex(row, center, center);
  gap: 20px;
  margin-top: 30px;

  .cancel {
    @include button-style(red, 0px);

    &:hover {
      background-color: rgb(203, 10, 10);
    }
  }

  .yes {
    @include button-style($secondary-color, 0px);

    &:hover {
      background-color: $secondary-color-hover;
    }
  }
}
</style>
