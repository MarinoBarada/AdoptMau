<template>
  <div class="overlay-modal" v-if="props.showModal" @click.self="closeModal">
    <div class="modal-alert">
      <font-awesome-icon
        v-if="!confirmation"
        :icon="['fas', 'circle-exclamation']"
        class="exclamation"
      />
      <font-awesome-icon :icon="['fas', 'circle-check']" class="check" v-else />

      <div v-if="props.modalType == 'adopted'" class="change">
        <h1 v-if="!confirmation">Are you sure you want to adopt this cat?</h1>
        <h1 v-else class="adoption">Adoption successful</h1>

        <p v-if="!confirmation">You won't be able to return this cutie!</p>
        <p v-else>{{ catInfo.name }} was adopted.</p>

        <div class="control" v-if="!confirmation">
          <button class="yes" @click="adoptCat(catInfo.id)">Yes, adopt!</button>
          <button class="cancel" @click="closeModal">Cancel</button>
        </div>

        <div v-else>
          <button v-if="allModals" class="yes" @click="closeAllModals">
            OK
          </button>
          <button v-else class="yes" @click="closeModal">OK</button>
        </div>
      </div>

      <div v-if="props.modalType == 'delete'" class="change">
        <h1 v-if="!confirmation">Are you sure you want to delete this cat?</h1>
        <h1 v-else class="adoption">Delete successful</h1>

        <p v-if="!confirmation">You won't be able to return this cutie!</p>
        <p v-else>{{ catInfo.name }} was deleted.</p>

        <div class="control" v-if="!confirmation">
          <button class="yes" @click="deleteCat(catInfo.id)">
            Yes, delete!
          </button>
          <button class="cancel" @click="closeModal">Cancel</button>
        </div>

        <button v-else class="yes" @click="closeModal">OK</button>
      </div>
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
  },
  allModals: {
    type: Boolean,
    required: false
  },
  modalType: {
    type: String,
    required: true
  }
});

const catsStore = useCatsStore();

const confirmation = ref(false);

const adoptCat = (id: number) => {
  confirmation.value = true;
  catsStore.ADOPT_CAT(id);
};

const deleteCat = (id: number) => {
  confirmation.value = true;
  catsStore.DELETE_CAT(id);
};

const emit = defineEmits(["closeModal", "closeAllModals"]);

const closeModal = () => {
  confirmation.value = false;
  emit("closeModal");
};

const closeAllModals = () => {
  confirmation.value = false;
  emit("closeAllModals");
};
</script>

<style lang="scss">
.overlay-modal {
  @include modal-overlay(rgba(0, 0, 0, 0.4), 1200);

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

    .change {
      @include flex(column, center, center);
      gap: 10px;
    }

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
      @include button-style($secondary-color, 0px);

      &:hover {
        background-color: $secondary-color-hover;
      }
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
    }
  }
}
</style>
