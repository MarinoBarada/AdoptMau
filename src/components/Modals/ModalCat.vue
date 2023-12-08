<template>
  <div class="overlay" v-if="showModal" @click.self="closeModal" role="modal">
    <div class="modal">
      <div class="img">
        <img :src="catInfo.picture" :alt="catInfo.name" />
      </div>
      <div class="info">
        <div class="close" @click="closeModal">
          <font-awesome-icon :icon="['fas', 'xmark']" class="x-icon" />
        </div>
        <div class="cat-info">
          <h1>{{ catInfo.name }}</h1>
          <p><span>Age:</span> {{ catInfo.age }} months</p>
          <p><span>Color:</span> {{ catInfo.color }}</p>
        </div>
        <button
          v-if="!userStore.adminIsLogin"
          class="adopt"
          @click="openModalConfirmation"
        >
          ADOPT
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

defineProps({
  catInfo: {
    type: Object,
    required: true
  },
  showModal: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(["closeModal", "openModalConfirmation"]);

const closeModal = () => {
  emit("closeModal");
};

const openModalConfirmation = () => {
  emit("openModalConfirmation");
};
</script>

<style lang="scss">
.overlay {
  @include modal-overlay(rgba(0, 0, 0, 0.6), 1010);

  .modal {
    max-width: $tablet-max-size;
    max-height: $mobile-max-size;
    width: 70%;
    height: 90%;
    background-color: $white-color;
    border-radius: 15px;
    @include flex(row, start, start);
    overflow: hidden;

    @media (max-width: $tablet-max-size) {
      width: 90%;
      position: relative;
    }

    @media (max-width: $mobile-max-size) {
      width: 100%;
      height: 100%;
      @include flex(column, start, stretch);
    }

    .img {
      height: 100%;
      width: 50%;

      @media (max-width: $mobile-max-size) {
        width: 100%;
      }

      img {
        @include image;
      }
    }

    .info {
      height: 100%;
      width: 50%;
      @include flex(column, start, stretch);
      padding: 30px;

      @media (max-width: $mobile-max-size) {
        width: 100%;
        padding: 0;
      }

      .close {
        align-self: end;
        cursor: pointer;
        border-radius: 50%;
        @include flex(row, center, center);

        @media (max-width: $mobile-max-size) {
          position: absolute;
          z-index: 100;
          top: 20px;
          right: 20px;
          background-color: $white-color;

          .x-icon {
            color: $secondary-color;
          }
        }

        &:hover {
          background-color: $secondary-color;

          .x-icon {
            color: $white-color;
          }
        }

        .x-icon {
          width: 40px;
          height: 40px;
          padding: 7px;
          color: $secondary-color;
        }
      }

      .cat-info {
        @include flex(column, center, start);
        height: 50%;

        @media (max-width: $mobile-max-size) {
          padding: 20px;
        }

        h1 {
          font-size: 70px;
        }

        p {
          font-size: 20px;

          span {
            font-weight: 600;
          }
        }
      }

      .adopt {
        @include button-style($primary-color, 0px);

        @media (max-width: $mobile-max-size) {
          margin: 20px;
        }

        &:hover {
          background-color: $primary-color-hover;
        }
      }
    }
  }
}
</style>
