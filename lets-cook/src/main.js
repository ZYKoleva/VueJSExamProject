import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import router from "./routers"


Vue.config.productionTip = false
Vue.use(Vuelidate);
Vue.use(ElementUI, {locale});


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
