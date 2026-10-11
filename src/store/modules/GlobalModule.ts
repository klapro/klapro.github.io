import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { LanguageModel } from "@/models";

@Module
export default class GlobalModule extends VuexModule {

    language = "en";
    languages : LanguageModel[] = [{
        id: "fr",
        tag: "FR"
    }, {
        id: "en",
        tag: "EN"
    }];

    @Mutation
    setLanguage(value: string) {
        this.language = value;
    }
}