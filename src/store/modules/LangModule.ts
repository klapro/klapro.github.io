import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import LangModel from "../../models/LangModel";

@Module
export default class LangModule extends VuexModule {
    langs : LangModel[] = [{
        id: "fr",
        tag: "Français"
    }, {
        id: "en",
        tag: "English"
    }];
}