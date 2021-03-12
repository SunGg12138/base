import Vue from 'vue';
import App from './App.vue';
import pageages from '../pageages';

Vue.use(pageages);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
