import { createApp } from "vue";
import App from "./App-Web.vue";
import "mdui/mdui.css";
import "~/assets/css/global.css";
import "~/assets/css/fonts.css";
import router from "~/router/index-web";

const app = createApp(App);
app.use(router);
app.mount("#app");
