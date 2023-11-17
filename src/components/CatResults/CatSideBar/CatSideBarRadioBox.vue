<template>
  <ul>
    <li v-for="sort in sorts" :key="sort.name">
      <input
        type="radio"
        name="SortBy"
        :checked="sort.value"
        :id="sort.name"
        @change="action"
      />
      <label :for="sort.name">{{ sort.name }}</label>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { SortBy } from "@/api/types";

defineProps({
  sorts: {
    type: Array<SortBy>,
    required: true
  },
  action: {
    type: Function,
    required: true
  }
});
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin-top: 5px;
  @include flex(column, start, start);
  gap: 3px;

  li {
    @include flex(row, start, center);
    gap: 5px;
  }
}
</style>
