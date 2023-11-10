<template>
  <header>
    <router-link :to="{ name: 'home' }" class="logo">
      <img src="cat.ico" alt="cat" />
      <h1>AdoptMau</h1>
    </router-link>
    <div class="user-info">
      <h2></h2>
      <font-awesome-icon :icon="['fas', 'circle-user']" class="user-icon" />
    </div>
  </header>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
header {
  background-color: $primary-color;
  @include flex(row, space-between, center);
  padding: 5px 32px;
  border-bottom: solid 1px $light-gray-color;

  .logo {
    @include flex(row, start, center);
    gap: 5px;
    text-decoration: none;

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
