<template>
    <section id="section-employments">
        <div class="w-100 h-100 d-flex">
          <div id="map" class="w-100 h-100 overflow-hidden position-relative">
              <l-map ref="map" class="w-100 h-100" :zoom="mapZoom" :center="mapCenter" :options="{zoomControl: false}">
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

    mapCenter = [45.505331312, -73.55249779];
    mapZoom = 8;
    mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    mapAttribution = "&copy; <a href='https://openstreetmap.org/copyright'>OpenStreetMap contributors</a>";

    $refs!: {
        map: any
    }

    async mounted() {
      await this.$store.dispatch("exp/load");
      const items = this.$store.state.exp.items;
      if (items.length) this.onExpBtnClicked(items[0]);
    }

    get mapitemSize(): number[] {
        return [this.iconSize, this.iconSize * 1.15];
    }

    get mapitemAnchor(): number[] {
        return [this.iconSize / 2, this.iconSize * 1.15];
    }

    async onExpBtnClicked(item: ExpModel) {
        let map: any = this.$refs.map.mapObject;
        let that = this;
        this.expType = item.code;
        map.flyTo(item.position, 12);
    }
}
</script>

<style>
#expCarousel {
    bottom: 72px;
    z-index: 1000; /* Leaflet panes and controls go up to 1000, and #expPage covers the map */
}
</style>