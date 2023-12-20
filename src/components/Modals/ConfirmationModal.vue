<template>
  <div class="overlay-modal" @click.self="closeModal" role="modal">
    <div class="modal-alert">
      <adopt-delete-modal
        v-if="!confirmation"
        :modal-type="props.modalType"
        @close-modal="closeModal"
        @action="modalAction"
      />
      <status-modal
        v-else
        :modal-type="props.modalType"
        :status="passCRUD"
        @close-modal="closeAllModals"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCatsStore } from "@/stores/cats";

import AdoptDeleteModal from "@/components/Modals/AdoptDeleteModal.vue";
import StatusModal from "@/components/Modals/StatusModal.vue";

const props = defineProps({
  catInfo: {
    type: Object,
    required: true
  },
  modalType: {
    type: String,
    required: true
  },
  allModals: {
    type: Boolean,
    required: false
  }
});

const confirmation = ref(false);
const passCRUD = ref<unknown>(false);
const catsStore = useCatsStore();

const modalAction = () => {
  if (props.modalType === "adopt") adoptCat();
  else deleteCat();
};

const adoptCat = async () => {
  passCRUD.value = await catsStore.ADOPT_CAT(props.catInfo.id);
  confirmation.value = true;
  console.log(passCRUD.value);
};

const deleteCat = async () => {
  passCRUD.value = await (catsStore.DELETE_CAT(props.catInfo.id) as unknown);
  confirmation.value = true;
  console.log(passCRUD.value);
};

const emit = defineEmits(["closeModal", "closeCatModal"]);

const closeModal = () => {
  confirmation.value = false;
  emit("closeModal");
};

const closeAllModals = () => {
  closeModal();
  if (props.allModals) emit("closeCatModal");
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
  }
}
</style>
