import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import SkillModule from "./modules/SkillModule";
import LangModule from './modules/LangModule';
import ExpModule from './modules/ExpModule';
import ContactModule from './modules/ContactModule';

const store = new Vuex.Store({});
export default store;

const skillModule = new SkillModule({store: store, name: "SkillModule"});
const langModule = new LangModule({store: store, name: "LangModule"});
const expModule = new ExpModule({store: store, name: "ExpModule"});
const contactModule = new ContactModule({store: store, name: "ContactModule"});