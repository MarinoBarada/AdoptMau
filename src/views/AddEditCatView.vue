<template>
  <div class="add-cat">
    <router-link :to="{ name: 'home' }" class="go-back">
      <font-awesome-icon :icon="['fas', 'angle-left']" class="left" />
      <h3>Go Back</h3>
    </router-link>
    <form @submit.prevent="addCat">
      <h1>{{ submitMessage }}</h1>
      <div class="input-container">
        <label for="input">*Name:</label>
        <input
          type="text"
          class="input"
          placeholder="e.g. Oreo, Fluffy Po IV"
          v-model.trim="cat.name"
        />
        <ul v-if="warnings" class="warnings">
          <li v-if="cat.name == ''">Name must be entered!</li>
          <li v-if="!isValidNameInput(cat.name as string)">
            Each word in the name must be a minimum of two letters and the first
            must be capitalized!
          </li>
        </ul>
      </div>
      <div class="input-container">
        <label for="input">*Age:</label>
        <input
          type="number"
          class="input"
          placeholder="e.g. 3"
          min="1"
          max="360"
          v-model="cat.age"
        />
        <ul v-if="warnings" class="warnings">
          <li v-if="!AgeValidation">
            Age is expressed in months and must be >= 1 and &lt;= 360!
          </li>
        </ul>
      </div>
      <div class="input-container">
        <label for="select">*Color:</label>
        <select name="colors" v-model="cat.color" data-testid="colorSelector">
          <option value="" selected disabled hidden>Select an Option</option>
          <option
            v-for="(color, index) in catColors.sort((a, b) => (a > b ? 1 : -1))"
            :key="index"
            :value="color"
          >
            {{ color }}
          </option>
        </select>
        <ul v-if="warnings" class="warnings">
          <li v-if="cat.color == ''">Color must be selected!</li>
        </ul>
      </div>
      <div class="input-container">
        <label for="input">*URL:</label>
        <input
          type="url"
          class="input"
          placeholder="e.g. https//cat-picture-url"
          v-model.trim="cat.picture"
        />
        <ul v-if="warnings" class="warnings">
          <li v-if="cat.picture == ''">Picture URL must be entered!</li>
          <li v-if="!isValidURLInput(cat.picture as string)">
            URL is not valid!
          </li>
        </ul>
      </div>
      <div class="input-container" v-if="editCat">
        <label for="adopted" class="check-box">
          <input
            type="checkbox"
            name="adopted"
            :checked="cat.adopted"
            id="adopted"
            v-model="cat.adopted"
          />
          Adopted</label
        >
      </div>
      <button type="submit" class="submit">
        {{ submitMessage.toUpperCase() }}
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

import { useCatsStore } from "@/stores/cats";
import { useUserStore } from "@/stores/user";
import type { Cat } from "@/api/types";

const catColors = ["gray", "black", "white", "tabby", "orange", "bi-color"];

const router = useRouter();
const route = useRoute();

const catsStore = useCatsStore();
const userStore = useUserStore();

const currentCatId = computed<number | undefined>(() => +route.params.id);
const editCat = ref(false);
const submitMessage = computed(() => {
  if (editCat.value) return "Edit Cat";
  else return "Add Cat";
});

const currentCat = computed(() =>
  catsStore.GET_SPECIFIC_CAT(currentCatId.value as number)
);

const editOrAdd = () => {
  if (currentCatId.value) {
    editCat.value = true;
    cat.value = currentCat.value;
  }
};

onMounted(editOrAdd);

const cat = ref<Partial<Cat>>({
  name: "",
  age: 1,
  color: "",
  picture: "",
  adopted: false
});

const NameValidation = computed(
  () => cat.value.name != "" && isValidNameInput(cat.value.name as string)
);

const ColorValidation = computed(() => cat.value.color != "");

const AgeValidation = computed(
  () => (cat.value.age as number) >= 1 && (cat.value.age as number) <= 360
);

const URLValidation = computed(
  () => cat.value.picture != "" && isValidURLInput(cat.value.picture as string)
);

const warnings = ref(false);

const addCat = () => {
  warnings.value = true;
  if (
    NameValidation.value &&
    ColorValidation.value &&
    AgeValidation.value &&
    URLValidation.value
  ) {
    if (editCat.value) {
      catsStore.EDIT_CAT(currentCatId.value as number, cat.value);
    } else {
      catsStore.CREATE_NEW_CAT(cat.value);
    }
    cat.value = {
      name: "",
      age: 1,
      color: "",
      picture: "",
      adopted: false
    };
    router.push({ name: "home" });
  }
};

const isValidNameInput = (name: string) => {
  const regexPattern =
    /^(?:[A-Z][a-z]+\s?)+(?:\b(?:I{1,3}|IV|V|IX|X{1,3})(?:\s+|$))?$/;
  return regexPattern.test(name);
};

const isValidURLInput = (url: string) => {
  const regexPattern =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;
  return regexPattern.test(url);
};

onBeforeMount(() => {
  if (!userStore.adminIsLogin) {
    router.push({ name: "login" });
  }
});
</script>

<style lang="scss" scoped>
.add-cat {
  background-color: $primary-color;
  min-height: 100vh;
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

    h3 {
      color: $secondary-color;
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  form {
    background-color: $white-color;
    border-radius: 10px;
    @include flex(column, start, stretch);
    padding: 30px 50px;
    max-width: 500px;
    width: 100%;
    gap: 20px;

    h1 {
      text-align: center;
    }

    .input-container {
      @include flex(column, start, start);
      gap: 5px;

      @include checkbox-style;

      label {
        font-size: 20px;
        font-weight: 700;
      }

      ul {
        list-style: none;
        padding-left: 5px;
        color: red;
      }

      .input {
        width: calc(100% - 25px);
        padding: 5px 10px;
        font-size: 18px;
        margin-left: 1px;
      }

      select {
        margin-top: 2px;
        width: 60%;
        padding: 5px 10px;
        font-size: 18px;
        margin-left: 1px;
      }
    }

    .submit {
      margin: 30px 0;
      @include button-style($secondary-color, 15px);
    }
  }
}
</style>
