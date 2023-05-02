import {createApp} from 'vue'
import App from "./App.vue"
import './styles/reset.css'
import './styles/init.css'
import {createPinia} from "pinia";
import naive from 'naive-ui'

import router from "./router";

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(naive)
app.mount('#app')
