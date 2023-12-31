import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
/* Axios config */
axios.defaults.baseURL = 'http://localhost:7000/api';
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

app.use(VueAxios, axios);
app.use(router);

app.mount('#app')
