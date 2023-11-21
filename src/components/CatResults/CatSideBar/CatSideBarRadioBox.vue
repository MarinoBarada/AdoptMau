<template>
  <ul>
    <li v-for="sort in sorts" :key="sort.name">
      <label :for="sort.name" class="radio-box">
        <input
          type="radio"
          :name="name"
          :checked="sort.value"
          :value="sort.name"
          :id="sort.name"
          @change="triggerEvent"
        />
        {{ sort.name }}</label
      >
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
    .radio-box {
      font-size: 16px;
      @include flex(row, center, center);
      gap: 0.5em;
    }

    .radio-box + .radio-box {
      margin-top: 1em;
    }

    input[type="radio"] {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;

      font: inherit;
      color: currentColor;
      width: 1.2em;
      height: 1.2em;
      border: 0.1em solid $light-gray-color;
      border-radius: 50%;
      transform: translateY(-0.075em);
      cursor: pointer;

      display: grid;
      place-content: center;

      &:hover {
        background-color: $light-gray-color;
      }
    }

    input[type="radio"]::before {
      content: "";
      width: 0.4em;
      height: 0.4em;
      transform: scale(0);
      transform-origin: bottom left;
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em var(--form-control-color);
      background-color: $white-color;
      border-radius: 50%;
    }

    input[type="radio"]:checked::before {
      transform: scale(1);
    }

    input[type="radio"]:checked {
      background-color: $secondary-color;
    }
  }
}
</style>
