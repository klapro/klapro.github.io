<template>
    <div class="exp-carousel d-flex flex-column align-items-center">
        <div class="stage position-relative" :style="{ height: size + 'px' }">
            <button
                v-for="(item, i) in items"
                :key="item.id"
                type="button"
                class="exp-card p-0 border-0"
                :class="{ 'is-active': i === active }"
                :style="cardStyle(i)"
                :aria-label="item.code"
                :tabindex="isVisible(i) ? 0 : -1"
                @click="select(i)">
                <img :src="item.img" :alt="item.code" draggable="false" />
            </button>
        </div>
 
        <div class="controls d-flex mt-3">
            <button type="button" class="arrow-btn rounded-circle bg-light nice-shadow mr-3"
                :disabled="active === 0" aria-label="Previous" @click="select(active - 1)">
                &#8592;
            </button>
            <button type="button" class="arrow-btn rounded-circle bg-light nice-shadow"
                :disabled="active === items.length - 1" aria-label="Next" @click="select(active + 1)">
                &#8594;
            </button>
        </div>
    </div>
</template>
 
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import ExpModel from "@/models/ExpModel";
 
@Component
export default class ExpCarousel extends Vue {
    @Prop({ required: true }) items!: ExpModel[];
    // size of the centered (biggest) card, in px
    @Prop({ default: 150 }) size!: number;
 
    active = 0;
 
    // how big / how far from center a card is at distance 0, 1, 2
    private scales = [1, 0.65, 0.42];
    private offsets = [0, 0.95, 1.5]; // multiples of `size`
 
    isVisible(i: number): boolean {
        return Math.abs(i - this.active) <= 2;
    }
 
    cardStyle(i: number) {
        const d = i - this.active;
        const abs = Math.min(Math.abs(d), 2);
        const px = this.size * this.scales[abs];
        const x = Math.sign(d) * this.size * this.offsets[abs];
        return {
            width: px + "px",
            height: px + "px",
            transform: `translate(calc(-50% + ${x}px), -50%)`,
            opacity: this.isVisible(i) ? 1 : 0,
            pointerEvents: this.isVisible(i) ? "auto" : "none",
            zIndex: 10 - Math.abs(d),
        };
    }
 
    select(i: number) {
        if (i < 0 || i >= this.items.length || i === this.active) return;
        this.active = i;
        this.$emit("select", this.items[i]);
    }
}
</script>
 
<style scoped>
.exp-carousel {
    pointer-events: none; /* let the map stay draggable around the cards */
}
.stage {
    width: 100%;
    max-width: 720px;
}
.exp-card {
    position: absolute;
    left: 50%;
    top: 50%;
    background: transparent;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
    transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
        width 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
        height 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
        opacity 0.45s;
}
.exp-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
.exp-card:focus-visible,
.arrow-btn:focus-visible {
    outline: 3px solid #fff;
    outline-offset: 3px;
}
.controls,
.exp-card,
.arrow-btn {
    pointer-events: auto;
}
.arrow-btn {
    width: 48px;
    height: 48px;
    border: 0;
    font-size: 20px;
    cursor: pointer;
}
.arrow-btn:disabled {
    opacity: 0.4;
    cursor: default;
}
@media (prefers-reduced-motion: reduce) {
    .exp-card {
        transition: none;
    }
}
</style>