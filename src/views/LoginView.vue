<template>
  <div class="login">
    <router-link :to="{ name: 'home' }" class="go-back">
      <font-awesome-icon :icon="['fas', 'angle-left']" class="left" />
      <h3>Go Back</h3>
    </router-link>
    <div class="login-container">
      <div class="image">
        <img src="/cat.ico" alt="logo" />
      </div>
      <form @submit.prevent="loginAction">
        <h1>Admin Login</h1>
        <div class="login-input">
          <font-awesome-icon :icon="['fas', 'circle-user']" class="icon" />
          <input
            type="text"
            class="input"
            placeholder="Username"
            v-model.trim="username"
          />
        </div>
        <div class="login-input">
          <font-awesome-icon :icon="['fas', 'lock']" class="icon" />
          <input
            type="password"
            class="input"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="warning" v-show="warning">
          <font-awesome-icon
            :icon="['fas', 'circle-exclamation']"
            class="exclamation"
          />
          <p>ERROR: {{ errorMessage }}</p>
        </div>
        <button class="login-button" type="submit">LOGIN</button>
      </form>
    </div>
  </div>

  <the-loader v-if="loading" message="Login Successful!" destination="home" />
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

import TheLoader from "@/components/Loader/TheLoader.vue";

const username = ref("");
const password = ref("");
const warning = ref(false);
const errorMessage = ref("");
const router = useRouter();
const loading = ref(false);

const userStore = useUserStore();

const loginAction = () => {
  warning.value = false;
  if (username.value != "" && password.value != "") {
    if (username.value == "admin" && password.value == "12345") {
      userStore.ADMIN_LOGIN_LOGOUT();
      loading.value = true;
    } else {
      errorMessage.value = "Incorrect username or password!";
      warning.value = true;
    }
  } else {
    errorMessage.value = "Password and Username must be entered!";
    warning.value = true;
  }
};

onBeforeMount(() => {
  if (userStore.adminIsLogin) {
    router.push({ name: "home" });
  }
});
</script>

<style lang="scss" scoped>
.login {
  background-color: $primary-color;
  width: 100%;
  height: 100vh;
  @include flex(row, center, center);
  position: relative;

  .go-back {
    position: absolute;
    left: 20px;
    top: 20px;
    background-color: $white-color;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 15px;
    @include flex(row, center, center);
    gap: 10px;
    transition: transform 0.3s ease;
    @include box-shadow;

    h3 {
      color: $secondary-color;
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  .login-container {
    background-color: $white-color;
    max-width: 960px;
    max-height: 650px;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    @include flex(row, start, center);
    @include box-shadow;

    @media (max-width: $mobile-max-size) {
      @include flex(row, center, center);
    }

    .image {
      width: 55%;

      @media (max-width: $mobile-max-size) {
        display: none;
      }

      img {
        width: 340px;
        height: 340px;
      }

      img:hover {
        animation: Shake 0.5s linear infinite;
        cursor: pointer;
      }
    }

    form {
      width: 45%;
      @include flex(column, center, center);
      gap: 20px;
      margin-right: 50px;

      @media (max-width: $mobile-max-size) {
        margin: 0;
        max-width: 500px;
        width: 90%;
      }

      h1 {
        margin-bottom: 15px;
      }

      .login-input {
        width: calc(100% - 30px);
        background-color: $light-gray-color;
        border-radius: 10px;
        padding: 10px 15px;
        @include flex(row, start, center);
        gap: 15px;

        &:focus-within {
          outline: auto;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: black;
        }

        .input {
          background-color: inherit;
          font-size: 18px;
          border: none;
          padding: 5px;
          width: 100%;

          &:focus {
            border: none;
            outline: none;
          }
        }
      }

      .login-button {
        width: 100%;
        @include button-style($secondary-color, 15px);
      }

      .warning {
        color: red;
        @include flex(row, start, start);
        gap: 10px;
        font-size: 20px;

        .exclamation {
          margin-top: 5px;
          font-size: 25px;
        }
      }
    }
  }
}
</style>
