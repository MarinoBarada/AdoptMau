<template>
  <div class="overlay-modal" v-if="props.showModal" @click.self="closeModal">
    <div class="modal-alert">
      <font-awesome-icon
        v-if="!confirmation"
        :icon="['fas', 'circle-exclamation']"
        class="exclamation"
      />
      <font-awesome-icon :icon="['fas', 'circle-check']" class="check" v-else />

      <h1 v-if="!confirmation">Are you sure you want to adopt this cat?</h1>
      <h1 v-else class="adoption">Adoption successful</h1>

      <p v-if="!confirmation">You won't be able to return this cutie!</p>
      <p v-else>{{ catInfo.name }} was adopted.</p>

      <div class="control" v-if="!confirmation">
        <button class="yes" @click="adoptCat(catInfo.id)">Yes, adopt!</button>
        <button class="cancel" @click="closeModal">Cancel</button>
      </div>

      <button v-else class="yes" @click="closeModal">OK</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCatsStore } from "@/stores/cats";

const props = defineProps({
  catInfo: {
    type: Object,
    required: true
  },
  showModal: {
    type: Boolean,
    required: true
  }
});

const catsStore = useCatsStore();

const confirmation = ref(false);

const adoptCat = (id: number) => {
  confirmation.value = true;
  catsStore.ADOPT_CAT(id);
};

const emit = defineEmits(["closeModal", "closeBothModals"]);

const closeModal = () => {
  confirmation.value = false;
  emit("closeModal");
};
</script>

<style lang="scss">
.overlay-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  @include flex(row, center, center);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1200;

  .modal-alert {
    max-width: 450px;
    max-height: 400px;
    width: 100%;
    height: 100%;
    background-color: $white-color;
    border-radius: 15px;
    @include flex(column, center, center);
    overflow: hidden;
    gap: 10px;

    .exclamation {
      font-size: 90px;
      color: $primary-color;
    }

    .check {
      font-size: 90px;
      color: green;
    }

    h1 {
      text-align: center;
      font-size: 30px;
      width: 80%;
    }

    .adoption {
      width: 100%;
    }

    .yes {
      background-color: $secondary-color;
      @include primary-button;

      &:hover {
        background-color: $secondary-color-hover;
      }
    }

    .control {
      @include flex(row, center, center);
      gap: 20px;
      margin-top: 30px;

      .cancel {
        background-color: red;
        @include primary-button;

        &:hover {
          background-color: rgb(203, 10, 10);
        }
      }
    }
  }
}
</style>
