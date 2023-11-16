import { createApp } from "vue";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faAngleUp,
  faAngleLeft,
  faAngleRight,
  faSearch,
  faCircleUser,
  faXmark
} from "@fortawesome/free-solid-svg-icons";

import router from "@/router";
import "@/index.scss";
import App from './App.vue'

library.add(faSearch);
library.add(faAngleDown);
library.add(faAngleLeft);
library.add(faAngleRight);
library.add(faAngleUp);
library.add(faCircleUser);
library.add(faXmark);

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
