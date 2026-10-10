<template>
    <section id="section-employments">
        <div class="w-100 h-100 d-flex">
          <div id="map" class="w-100 h-100 overflow-hidden position-relative">
              <l-map ref="map" class="w-100 h-100" :zoom="mapZoom" :center="mapCenter" :options="mapOptions">
                <l-tile-layer :url="mapUrl" :attribution="mapAttribution"></l-tile-layer>
                <l-marker :lat-lng="item.position" v-for="item in $store.state.exp.items" :key="item.id">
                  <l-icon
                    :icon-size="iconSize"
                    :icon-anchor="mapitemAnchor"
                    :icon-url="item.img"
                    />
                </l-marker>
              </l-map>

              <ExpCarousel
    id="expCarousel"
    class="position-absolute w-100"
    :items="$store.state.exp.items"
    :size="150"
    :disabled="inProcess"
    style="bottom: 52px;"
    :months="months"
    :present-label="$t('exp.present')"
    :more-label="$t('exp.viewMore')"
    :value="$store.state.exp.activeIndex"
    @input="$store.commit('exp/setActive', $event)"
    @select="onExpBtnClicked" />
          </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import ExpModel from "@/models/ExpModel";

import RootView from "./RootView";
import ExpCarousel from "@/components/ExpCarousel.vue";
import {LMap, LTileLayer, LControlZoom, LIcon, LControl} from 'vue2-leaflet';

@Component({
    components: {
        ExpCarousel,
        LMap,
        LTileLayer,
        LControlZoom,
        LIcon,
        LControl
    }
})
export default class EmploymentView extends RootView {
    expType = "";
    iconSize = 64;
    inProcess = false;

    mapCenter = [46.015027997029925,-73.14909971534128];
    mapZoom = 12;
    mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    mapAttribution = "&copy; <a href='https://openstreetmap.org/copyright'>OpenStreetMap contributors</a>";

    mapOptions = {
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        tap: false,          // older mobile Safari handling
        zoomSnap: 0.1        // optional: smoother flyTo end positions
    };

    $refs!: {
        map: any
    }

    async mounted() {
        this.inProcess = false;
        await this.$store.dispatch("exp/load");
        const items = this.$store.state.exp.items;
        if (items.length) this.onExpBtnClicked(items[0]);
    }

    get months(): string[] {
        return this.$t("months") as unknown as string[];
    }

    get mapitemSize(): number[] {
        return [this.iconSize, this.iconSize * 1.15];
    }

    get mapitemAnchor(): number[] {
        return [this.iconSize / 2, this.iconSize * 1.15];
    }

    async onExpBtnClicked(item: ExpModel) {
        if (this.inProcess) return;
        this.inProcess = true;
        let that = this;
        let map: any = this.$refs.map.mapObject;
        this.expType = item.code;
        map.flyTo(item.position, 12);
         map.once('moveend', function() {
            that.inProcess = false;
        });
    }
}
</script>

<style>
#expCarousel {
    bottom: 72px;
    z-index: 1000; /* Leaflet panes and controls go up to 1000, and #expPage covers the map */
}
</style>