import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import SkillModule from "./modules/SkillModule";
import LangModule from './modules/LangModule';
import LoginModule from './modules/LoginModule';
import ExpModule from './modules/ExpModule';

const store = new Vuex.Store({});
export default store;

const skillModule = new SkillModule({store: store, name: "SkillModule"});
const langModule = new LangModule({store: store, name: "LangModule"});
const loginModule = new LoginModule({store: store, name: "LoginModule"});
const expModule = new ExpModule({store: store, name: "ExpModule"});