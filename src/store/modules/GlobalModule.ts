import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import LanguageModel from "@/models/LanguageModel";

@Module
export default class GlobalModule extends VuexModule {

    section = 0;

    language = "en";
    languages : LanguageModel[] = [{
        id: "fr",
        tag: "FR"
    }, {
        id: "en",
        tag: "EN"
    }];

    @Mutation
    setSection(section: number) {
        this.section = section;
    }

    @Mutation
    setLanguage(value: string) {
        this.language = value;
    }
}