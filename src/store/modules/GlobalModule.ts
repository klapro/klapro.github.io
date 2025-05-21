import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import LangModel from "../../models/LangModel";

@Module
export default class GlobalModule extends VuexModule {

    section = 0;

    langs : LangModel[] = [{
        id: "fr",
        tag: "Français"
    }, {
        id: "en",
        tag: "English"
    }];

    @Mutation
    setSection(section: number) {
        this.section = section;
    }
}