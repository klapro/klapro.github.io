import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import ExpModel from "../../models/ExpModel";

export const CONTENT_FOLDER = `${process.env.BASE_URL}content/`;
export const EXP_BASE = `${CONTENT_FOLDER}exp/`;

@Module
export default class ExpModule extends VuexModule {
    items: ExpModel[] = [];
    loaded = false;
    activeIndex = 0;

    get activeItem(): ExpModel | undefined {
        return this.items[this.activeIndex];
    }

    @Mutation
    setItems(items: ExpModel[]) {
        this.items = items;
        this.loaded = true;
    }

    @Mutation
    setActive(index: number) {
        if (index >= 0 && index < this.items.length) this.activeIndex = index;
    }

    @Action
    async load() {
        if (this.loaded) return;
        const res = await fetch(CONTENT_FOLDER + "index.json");
        const raw = await res.json();
        // turn relative image paths into real URLs
        this.setItems(raw.experiences.map((i: any) => ({ ...i, img: EXP_BASE +  i.icon })));
    }
    // load() stays as it is
}