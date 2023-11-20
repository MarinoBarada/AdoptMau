<template>
  <ul>
    <li v-for="sort in sorts" :key="sort.name">
      <input
        type="radio"
        :name="name"
        :checked="sort.value"
        :value="sort.name"
        :id="sort.name"
        @change="triggerEvent"
      />
      <label :for="sort.name">{{ sort.name }}</label>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { SortBy } from "@/api/types";

const props = defineProps({
  sorts: {
    type: Array<SortBy>,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  action: {
    type: Function,
    required: true
  }
});

const triggerEvent = ($event: Event) => {
  const selectedValue = ($event.target as HTMLInputElement).value;
  props.action(selectedValue);
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin-top: 5px;
  @include flex(column, start, start);
  gap: 3px;

  li {
    @include radio-check-box("type='radio'", 100%);
  }
}
</style>
