import Vue from 'nativescript-vue'
import ApiService from "./services/api";

import FontIcon from 'nativescript-vue-fonticon'
import RadListView from 'nativescript-ui-listview/vue'
import App from './components/App'

Vue.use(RadListView);

// Set the following to `true` to hide the logs created by nativescript-vue
Vue.config.silent = false
// Set the following to `false` to not colorize the logs created by nativescript-vue
// disabled in template due to typing issue for Typescript projects....NEEDS TO BE FIXED
// Vue.config.debug = true;

Vue.registerElement(
    'CardView',
    () => require('@nstudio/nativescript-cardview').CardView
);

// enable icon fonts
Vue.use(FontIcon, {
  paths: {
    fa: './assets/css/font-awesome.css',
    // ion: './assets/css/ionicons.css'
  }
})

Vue.filter('wordcase', v => {
  return v.toLowerCase().replace(/\b[a-z]/g, l => l.toUpperCase());
})

const api = new ApiService()
Vue.prototype.$api = api

// boot up the main app
const app = new Vue({
  render: (h) => h('frame', [h(App)]),
});
app.$start();