<template>
    <section id="section-employments">
        <div class="w-100 h-100 d-flex">
          <div id="map" class="w-100 h-100 overflow-hidden position-relative">
              <l-map
                ref="map"
                class="w-100 h-100"
                :zoom="mapZoom"
                :center="mapCenter"
                :options="mapOptions"
                @click="onMapClick">
                <l-tile-layer :url="mapUrl" :attribution="mapAttribution" :options="{ keepBuffer: 6 }"></l-tile-layer>


                <!-- experiences -->
                <l-marker :lat-lng="item.position" v-for="item in $store.state.content.items" :key="'exp-' + item.id">
                  <l-icon
                    :icon-size="iconSize"
                    :icon-anchor="mapitemAnchor"
                    :icon-url="item.icon"
                    />
                </l-marker>

                <!-- pins: global ones + the ones linked to the active experience -->
                <l-marker :lat-lng="pin.position" v-for="pin in $store.state.content.pins" :key="'pin-' + pin.id">
                  <l-icon
                    :icon-size="pinIconSize"
                    :icon-anchor="pinIconAnchor"
                    :icon-url="pin.icon"
                    />
                </l-marker>
              </l-map>

              <!-- dev helper: live coordinates under the mouse. SPACE = pause / resume -->
              <div v-if="isDev && cursor" class="coords" :class="{ frozen: frozen }" @click="copyCoords(cursor)">
                {{ cursor.lat.toFixed(6) }}, {{ cursor.lng.toFixed(6) }}
                <span class="coords-hint">{{ coordsHint }}</span>
              </div>

              <!-- car driving along the route while the map travels -->
              <div ref="car" class="car" :class="{ visible: traveling }">
                <img class="car-img" :src="carImg" alt="" draggable="false" />
              </div>

              <ExpCarousel
                id="expCarousel"
                class="position-absolute w-100"
                :items="$store.state.content.items"
                :size="150"
                :disabled="inProcess"
                style="bottom: 52px;"
                :months="months"
                :present-label="$t('exp.present')"
                :more-label="$t('exp.viewMore')"
                :value="$store.state.content.activeIndex"
                @input="$store.commit('content/setActive', $event)"
                @select="onExpBtnClicked" />
          </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { ExpModel, PinModel } from "@/models";

import RootView from "./RootView";
import ExpCarousel from "@/components/ExpCarousel.vue";
import {LMap, LTileLayer, LControlZoom, LIcon, LControl, LMarker, LPolyline} from 'vue2-leaflet';

type Pt = { lat: number; lng: number };

@Component({
    components: {
        ExpCarousel,
        LMap,
        LTileLayer,
        LControlZoom,
        LIcon,
        LControl,
        LMarker,
        LPolyline
    }
})
export default class ContentView extends RootView {
    expType = "";
    iconSize = 64;
    inProcess = false;

    // small pins
    pinSize = 48;

    // car shown while travelling
    carImg = require("@/assets/car.png");
    traveling = false;
    carRotates = false;   // false: side-view car that flips left/right. true: top-view car that rotates
    carFacing = 90;       // direction the image points at 0deg: 90 = right (east), 0 = up (north)
    carAngle = 0;
    carDir = 1;

    // route: index of the experience the map is currently showing (-1 = none yet)
    shownIndex = -1;
    showRoute = true;      // draw the dashed journey line
    travelSlowness = 1.5;  // 1 = original speed, 2 = twice as slow, 3 = three times as slow

    // coordinates helper (only active while developing)
    isDev = process.env.NODE_ENV !== "production";
    cursor: { lat: number; lng: number } | null = null;
    frozen = false;     // SPACE toggles: the readout stops following the mouse
    copied = false;

    mapCenter = [46.015027997029925,-73.14909971534128];
    mapZoom = 12;
    mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    mapAttribution = "&copy; <a href='https://openstreetmap.org/copyright'>OpenStreetMap contributors</a>";

    mapOptions = {
        zoomControl: true,
        dragging: true,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        tap: false,          // older mobile Safari handling
        zoomSnap: 0.1        // optional: smoother flyTo end positions
    };

    $refs!: {
        map: any,
        car: HTMLElement
    }

    async mounted() {
        this.inProcess = false;
        await this.$store.dispatch("content/load");
        const items = this.$store.state.content.items;
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

    get pinIconSize(): number[] {
        return [this.pinSize, this.pinSize];
    }

    // anchor = the tip of the pin (bottom centre)
    get pinIconAnchor(): number[] {
        return [this.pinSize / 2, this.pinSize];
    }

    get coordsHint(): string {
        if (this.copied) return "copied!";
        return this.frozen
            ? "paused · click to copy · space to resume"
            : "space to pause · click map to copy";
    }

    // the whole journey as one line: exp 1 -> (waypoints of exp 2) -> exp 2 -> ...
    get routeLine(): number[][] {
        const items: any[] = this.$store.state.content.items;
        const pts: number[][] = [];
        items.forEach((it, i) => {
            if (i > 0) (it.route || []).forEach((p: Pt) => pts.push([p.lat, p.lng]));
            pts.push([it.position.lat, it.position.lng]);
        });
        return pts;
    }

    onMapClick(e: any) {
        if (!this.isDev) return;
        const c = this.frozen && this.cursor ? this.cursor : { lat: e.latlng.lat, lng: e.latlng.lng };
        this.copyCoords(c);
    }

    async copyCoords(c: { lat: number; lng: number } | null) {
        if (!c) return;
        try {
            await navigator.clipboard.writeText(
                `{ "lat": ${c.lat.toFixed(6)}, "lng": ${c.lng.toFixed(6)} }`
            );
            this.copied = true;
            setTimeout(() => (this.copied = false), 1200);
        } catch (err) {
            console.warn("Could not copy coordinates", err);
        }
    }

    // ---- route travelling ----

    // list of points from experience `from` to experience `to`, through every waypoint.
    // Going forward uses the "route" of each experience we arrive at; going back plays it reversed.
    private pathBetween(from: number, to: number): Pt[] {
        const items: any[] = this.$store.state.content.items;
        const pts: Pt[] = [items[from].position];
        if (to > from) {
            for (let k = from + 1; k <= to; k++) {
                (items[k].route || []).forEach((p: Pt) => pts.push(p));
                pts.push(items[k].position);
            }
        } else {
            for (let k = from; k > to; k--) {
                const wp: Pt[] = (items[k].route || []).slice().reverse();
                wp.forEach((p) => pts.push(p));
                pts.push(items[k - 1].position);
            }
        }
        return pts;
    }

    // distance in km between two points
    private km(a: Pt, b: Pt): number {
        const rad = Math.PI / 180;
        const dLat = (b.lat - a.lat) * rad;
        const dLng = (b.lng - a.lng) * rad;
        const h = Math.pow(Math.sin(dLat / 2), 2) +
            Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.pow(Math.sin(dLng / 2), 2);
        return 2 * 6371 * Math.asin(Math.sqrt(h));
    }

    // point the car in the direction of travel (a -> b)
    private updateCar(a: Pt, b: Pt) {
        const el = this.$refs.car;
        if (!el) return;
        const rad = Math.PI / 180;
        const dx = (b.lng - a.lng) * Math.cos(a.lat * rad);
        const dy = b.lat - a.lat;
        if (dx === 0 && dy === 0) return;

        if (this.carRotates) {
            const bearing = Math.atan2(dx, dy) / rad;                 // 0 = north, 90 = east
            const target = bearing - this.carFacing;
            const diff = ((target - this.carAngle + 540) % 360) - 180; // shortest way round
            this.carAngle += diff * 0.15;                              // smooth turns
            el.style.transform = `translate(-50%, -50%) rotate(${this.carAngle}deg)`;
        } else {
            if (Math.abs(dx) > Math.abs(dy) * 0.2) this.carDir = dx >= 0 ? 1 : -1;
            el.style.transform = `translate(-50%, -50%) scaleX(${this.carDir})`;
        }
    }

    // move the map along `pts` in one continuous animation (it only eases at the very start and end)
    private travel(map: any, pts: Pt[], targetZoom: number): Promise<void> {
        const cum: number[] = [0];
        for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + this.km(pts[i - 1], pts[i]));
        const total = cum[cum.length - 1];
        if (total === 0) return Promise.resolve();

        // longer trip = longer flight; travelSlowness stretches every trip (1 = fast, 2 = twice as slow)
        const duration = Math.min(9000, Math.max(2200, 1500 + total * 14)) * this.travelSlowness;
        const z0 = map.getZoom();
        const dip = Math.min(3, total / 40);                                  // zoom out a bit mid-flight
        const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

        this.carDir = 1;
        this.traveling = true;

        // setView() on every frame rebuilds the whole tile layer when the zoom changes = flicker.
        // Leaflet's own flyTo avoids that with _move(), so we do the same.
        const light = typeof map._move === "function";
        if (light) {
            map._stop();
            map._moveStart(true, false);
        }

        return new Promise<void>((resolve) => {
            const start = performance.now();
            const frame = (now: number) => {
                const t = Math.min(1, Math.max(0, (now - start) / duration));
                const d = ease(t) * total;

                // which segment are we on?
                let i = 1;
                while (i < cum.length - 1 && cum[i] < d) i++;
                const seg = cum[i] - cum[i - 1] || 1;
                const f = Math.min(1, Math.max(0, (d - cum[i - 1]) / seg));
                const a = pts[i - 1];
                const b = pts[i];

                this.updateCar(a, b);
                if (t > 0.92) this.traveling = false;   // car fades out just before arriving

                const zoom = z0 + (targetZoom - z0) * ease(t) - dip * Math.sin(Math.PI * t);
                const lat = a.lat + (b.lat - a.lat) * f;
                const lng = a.lng + (b.lng - a.lng) * f;
                if (light) {
                    // pinch/flyTo flags: make Leaflet redraw markers + lines every frame without rebuilding tiles
                    map._move(map.wrapLatLng({ lat, lng }), zoom, { pinch: true, flyTo: true });
                } else {
                    map.setView([lat, lng], targetZoom, { animate: false });
                }

                if (t < 1) requestAnimationFrame(frame);
                else {
                    const end = pts[pts.length - 1];
                    if (light) {
                        map._move(map.wrapLatLng(end), targetZoom);
                        map._moveEnd(true);
                    } else {
                        map.setView([end.lat, end.lng], targetZoom, { animate: false });
                    }
                    this.traveling = false;
                    resolve();
                }
            };
            requestAnimationFrame(frame);
        });
    }

    async onExpBtnClicked(item: ExpModel) {
        if (this.inProcess) return;
        this.inProcess = true;
        const map: any = this.$refs.map.mapObject;
        const items: any[] = this.$store.state.content.items;
        const idx = items.findIndex((i) => i.id === item.id);
        this.expType = item.id;

        try {
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (this.shownIndex < 0 || idx === this.shownIndex || reduceMotion) {
                map.setView(item.position, this.mapZoom, { animate: false });
            } else {
                await this.travel(map, this.pathBetween(this.shownIndex, idx), this.mapZoom);
            }
            this.shownIndex = idx;
        } finally {
            this.inProcess = false;
        }
    }
}
</script>

<style>
#expCarousel {
    z-index: 1000; /* Leaflet panes and controls go up to 1000 */
}

.car {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 64px;
    transform: translate(-50%, -50%);
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.4));
}
.car.visible {
    opacity: 1;
}
.car-img {
    display: block;
    width: 100%;
    animation: wiggle 0.28s ease-in-out infinite alternate;   /* shakes side to side */
}
@keyframes wiggle {
    from { transform: translateX(-3px) rotate(-1.5deg); }
    to   { transform: translateX(3px) rotate(1.5deg); }
}
@media (prefers-reduced-motion: reduce) {
    .car-img {
        animation: none;
    }
}

.coords {
    position: absolute;
    left: 12px;
    bottom: 12px;
    z-index: 1000;
    padding: 6px 10px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    font: 13px/1.2 monospace;
    pointer-events: none;
    border: 2px solid transparent;
}
.coords.frozen {
    pointer-events: auto;      /* clickable (and selectable) while paused */
    cursor: pointer;
    user-select: all;
    border-color: #ffb300;     /* amber outline = paused */
}
.coords-hint {
    margin-left: 8px;
    opacity: 0.6;
}
</style>