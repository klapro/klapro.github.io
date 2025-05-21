import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import GlobalModule from './modules/GlobalModule';
import ExpModule from './modules/ExpModule';
import ContactModule from './modules/ContactModule';

const store = new Vuex.Store({});
export default store;

const globalModule = new GlobalModule({store: store, name: "global"});
const expModule = new ExpModule({store: store, name: "exp"});
const contactModule = new ContactModule({store: store, name: "contact"});