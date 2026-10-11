import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import GlobalModule from './modules/GlobalModule';
import ContentModule from './modules/ContentModule';

const store = new Vuex.Store({});
export default store;

const globalModule = new GlobalModule({store: store, name: "global"});
const expModule = new ContentModule({store: store, name: "content"});