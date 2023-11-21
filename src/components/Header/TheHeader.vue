<template>
  <header>
    <div class="wrapper">
      <router-link :to="{ name: 'home' }" class="logo">
        <img src="cat.ico" alt="cat" />
        <h1>AdoptMau</h1>
      </router-link>
      <div class="user-info">
        <h2></h2>
        <font-awesome-icon :icon="['fas', 'circle-user']" class="user-icon" />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup></script>

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

    @keyframes Shake {
      0% {
        transform: rotate(5deg);
      }

      25% {
        transform: rotate(-6deg);
      }

      50% {
        transform: rotate(5deg);
      }

      75% {
        transform: rotate(-6deg);
      }

      100% {
        transform: rotate(5deg);
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
