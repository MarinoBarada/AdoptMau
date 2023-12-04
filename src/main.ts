import { createApp } from "vue";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faAngleUp,
  faSearch,
  faCircleUser,
  faXmark,
  faFilter,
  faCircleExclamation,
  faCircleCheck,
  faLock
} from "@fortawesome/free-solid-svg-icons";

import router from "@/router";
import "@/index.scss";
import App from './App.vue'

library.add(faSearch);
library.add(faAngleLeft);
library.add(faAngleRight);
library.add(faAngleDown);
library.add(faAngleUp);
library.add(faCircleUser);
library.add(faXmark);
library.add(faFilter);
library.add(faCircleExclamation);
library.add(faCircleCheck);
library.add(faLock);


const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
