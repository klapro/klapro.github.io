import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import ExpModel from "../../models/ExpModel";

export const EXP_BASE = `${process.env.BASE_URL}content/exp/`;

@Module
export default class ExpModule extends VuexModule {
    items: ExpModel[] = [];
    loaded = false;

    @Mutation
    setItems(items: ExpModel[]) {
        this.items = items;
        this.loaded = true;
    }

    @Action
    async load() {
        if (this.loaded) return;
        const res = await fetch(EXP_BASE + "index.json");
        const raw = await res.json();
        // turn relative image paths into real URLs
        this.setItems(raw.map((i: any) => ({ ...i, img: EXP_BASE + i.img })));
    }
}