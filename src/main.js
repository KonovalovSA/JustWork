import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faStop, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { BootstrapVueNext } from "bootstrap-vue-next";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

library.add(faStop, faPause, faPlay);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(BootstrapVueNext);

app.mount("#app");
