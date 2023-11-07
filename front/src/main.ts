
import './assets/scss/style.scss'
import App from './App.vue'
import { createApp } from 'vue'
import router from './routes/router';
// Font Awesome
import FontAwesomeIcon from './assets/font-awsome'
import { library } from "@fortawesome/fontawesome-svg-core";
import {fa0}  from "@fortawesome/free-solid-svg-icons";
library.add(fa0);

createApp(App)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app');
