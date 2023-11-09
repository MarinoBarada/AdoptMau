<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>
