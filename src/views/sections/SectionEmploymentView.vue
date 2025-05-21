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

              <transition name="slideleft">
                <div id="expPage" 
                v-if="show"
                class="position-absolute w-100 h-100 bg-light d-flex justify-content-center align-items-center">
                      <transition name="slidetop" appear>
                        <div class="w-75 h-100 d-flex align-item-center">
                          <CegepExpPage v-if="expType === 'cegep'" />
                          <NexwebExpPage v-else-if="expType === 'nexweb'" />
                          <TopmenuExpPage v-else />
                        </div>
                      </transition>
                </div>
              </transition>

              <div id="journeyBar" class="w-100 position-absolute d-flex justify-content-center">
                <div class="w-50 h-100 position-relative d-flex justify-content-between bg-light p-3 rounded nice-shadow">
                  <template v-for="(item, index) in $store.state.exp.items">
                    <JourneyButton 
                    :index="index+1" 
                    :item="item"
                    @click="onExpBtnClicked"/>
                    <template v-if="index != $store.state.exp.items.length -1">
                      <hr class="v-divider theme--light mt-5 ml-3 mr-3"/>
                    </template>
                  </template>
                  
                </div>
              </div>
          </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import ExpModel from "@/models/ExpModel";

import RootView from "../RootView";
import JourneyButton from "@/components/JourneyButton.vue";
import CegepExpPage from "./experiences/CegepExpPage.vue";
import NexwebExpPage from "./experiences/NexwebExpPage.vue";
import TopmenuExpPage from "./experiences/TopmenuExpPage.vue";
import {LMap, LTileLayer, LControlZoom, LIcon, LControl} from 'vue2-leaflet';

@Component({
    components: {
        JourneyButton,
        CegepExpPage,
        NexwebExpPage,
        TopmenuExpPage,
        LMap,
        LTileLayer,
        LControlZoom,
        LIcon,
        LControl
    }
})
export default class SectionEmploymentView extends RootView {
    show = false;
    expType = "";
    iconSize = 64;

    mapCenter = [45.505331312, -73.55249779];
    mapZoom = 8;
    mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    mapAttribution = "&copy; <a href='https://openstreetmap.org/copyright'>OpenStreetMap contributors</a>";

    $refs!: {
        map: any
    }

    mounted() {
        this.onExpBtnClicked(this.$store.state.exp.items[0]);
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

        if (this.show) {
            this.show = false;
            await this.sleep(1000); 
        } 

        map.flyTo(item.position, 12);

        map.once('moveend', function() {
            that.show = true;
        });
    }
}
</script>