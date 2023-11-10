<template>
  <header>
    <router-link :to="{ name: 'home' }" class="logo">
      <img src="cat.ico" alt="cat" />
      <h1>AdoptMau</h1>
    </router-link>
    <div class="user-info">
      <h2></h2>
      <font-awesome-icon
        :icon="['fas', 'circle-user']"
        style="color: white"
        class="user-icon"
      />
    </div>
  </header>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
header {
  background-color: burlywood;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 32px;
  border-bottom: solid 1px gray;

  .logo {
    display: flex;
    align-items: center;
    gap: 5px;
    text-decoration: none;

    img {
      margin-bottom: 5px;
      height: 70px;
    }

    h1 {
      font-size: 30px;
      color: black;
      font-weight: 600;
      margin: 0;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 16px;

    h2 {
      padding: 0;
      margin: 0;
      font-weight: 500;
    }

    .user-icon {
      height: 45px;
      cursor: pointer;
    }
  }
}
</style>
