import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from '@/plugins/i18n';

import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import VueSmoothScroll from 'vue2-smooth-scroll'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

import { faServer, faEnvelope, faHandPointer, faNewspaper, faCircleLeft, faMobile, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { faAndroid, faApple, faLinkedin } from '@fortawesome/free-brands-svg-icons'

library.add(faServer, faAndroid, faApple, faLinkedin, faEnvelope, faHandPointer, faNewspaper, faCircleLeft, faMobile, faAnglesRight);


Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('vue-draggable-resizable', VueDraggableResizable);
Vue.use(VueSmoothScroll);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
