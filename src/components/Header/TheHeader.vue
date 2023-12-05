<template>
  <header>
    <div class="wrapper">
      <router-link :to="{ name: 'home' }" class="logo">
        <img src="cat.ico" alt="cat" />
        <h1>AdoptMau</h1>
      </router-link>
      <div v-if="!adminIsLogin" class="user-info">
        <router-link :to="{ name: 'login' }">
          <font-awesome-icon :icon="['fas', 'circle-user']" class="user-icon" />
        </router-link>
      </div>
      <div v-else class="dropdown">
        <button class="dropdown-button" @click="open">
          Admin <font-awesome-icon :icon="caretIcon" class="icon" />
        </button>
        <ul v-if="isOpen" class="dropdown-content">
          <li @click="goToAddCat">Add Animal</li>
          <li @click="userStore.ADMIN_LOGIN_LOGOUT">Log Out</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const adminIsLogin = computed(() => userStore.adminIsLogin);

const isOpen = ref(false);

const open = () => {
  isOpen.value = !isOpen.value;
};

const caretIcon = computed(() =>
  isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"]
);

const router = useRouter();

const goToAddCat = () => {
  router.push({ name: "add-cat" });
};
</script>

<style lang="scss" scoped>
header {
  background-color: $primary-color;
  border-bottom: solid 1px $light-gray-color;

  .wrapper {
    @include flex(row, space-between, center);
    max-width: $computer-max-size;
    margin: 0 auto;

    @media (max-width: $computer-max-size) {
      padding: 3px 32px;
    }

    @media (max-width: $tablet-max-size) {
      padding: 3px 16px;
    }

    @media (max-width: $mobile-max-size) {
      padding: 3px 7px;
    }
  }

  .logo {
    @include flex(row, start, center);
    gap: 5px;
    text-decoration: none;

    @media (max-width: $mobile-max-size) {
      gap: 0px;
    }

    img {
      margin-bottom: 5px;
      height: 70px;
      width: 70px;
    }

    h1 {
      font-size: 30px;
      color: $black-color;
      font-weight: 600;
      margin: 0;

      @media (max-width: $mobile-max-size) {
        font-size: 28px;
      }
    }

    img:hover {
      animation: Shake 0.5s linear infinite;
    }
  }

  .dropdown {
    position: relative;

    .dropdown-button {
      outline: none;
      font-size: 25px;
      padding: 10px 15px;
      @include flex(row, center, center);
      gap: 10px;
      background-color: $white-color;
      border-radius: 8px;
      border: solid 1px $light-gray-color;

      &:hover {
        background-color: $white-hover-color;
      }

      .icon {
        margin-top: 3px;
      }
    }
    .dropdown-content {
      position: absolute;
      padding-left: 0;
      left: 0;
      background-color: $white-color;
      list-style: none;
      width: calc(100% - 10px);
      z-index: 1000;
      border: solid 1px black;
      padding: 10px 5px;
      margin-top: 5px;
      border-radius: 8px;
      border: solid 1px $light-gray-color;

      li {
        font-size: 18px;
        text-align: center;
        border-bottom: solid 1px black;
        cursor: pointer;
        padding: 5px 0;

        &:hover {
          background-color: $light-gray-color;
        }

        &:last-child {
          border: none;
        }
      }
    }
  }

  .user-info {
    @include flex(row, start, center);
    gap: 16px;

    h2 {
      padding: 0;
      margin: 0;
      font-weight: 500;
    }

    .user-icon {
      height: 45px;
      cursor: pointer;
      color: $white-color;

      :hover {
        color: $white-hover-color;
      }
    }
  }
}
</style>
