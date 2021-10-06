import { createApp } from 'vue';
import App from './App.vue';
import routes from './routes';
import './axios';

createApp(App).use(routes).mount('#app');
