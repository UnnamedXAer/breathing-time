import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "./i18n";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

createApp(App).use(createI18n()).use(store).use(router).mount("#root");
