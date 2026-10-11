import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { PinModel, ExpModel } from "@/models";

export const CONTENT_FOLDER = `${process.env.BASE_URL}content/`;

@Module
export default class ContentModule extends VuexModule {
    items: ExpModel[] = [];     // experiences (the carousel)
    pins: PinModel[] = [];      // small pins on the map
    loaded = false;
    activeIndex = 0;

    get activeItem(): ExpModel | undefined {
        return this.items[this.activeIndex];
    }

    @Mutation
    setContent(payload: { items: ExpModel[]; pins: PinModel[] }) {
        this.items = payload.items;
        this.pins = payload.pins;
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
        const items: ExpModel[] = (raw.experiences || []).map((i: any) => ({
            ...i,
            icon: CONTENT_FOLDER + i.icon,
        }));

        const pins: PinModel[] = (raw.pins || []).map((p: any) => ({
            ...p,
            icon: CONTENT_FOLDER + p.icon
        }));

        this.setContent({ items, pins });
    }
}