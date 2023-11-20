<template>
  <div class="fieldset">
    <div class="header">
      <h3>{{ header }}</h3>
    </div>
    <slot>
      <p>Whoops, somebody forgot to populate me!</p>
    </slot>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  header: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.fieldset {
  width: 100%;
  .header {
    padding: 5px 0;
    border-bottom: solid 1px gray;
    h3 {
      font-size: 20px;
      line-height: 24px;
      font-weight: 600;
    }
  }
}
</style>
