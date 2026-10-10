<template>
    <div class="exp-carousel d-flex flex-column align-items-center">
        <div class="stage position-relative" :style="{ height: size + 'px' }">
            <!-- cards are display only: the active one is sharp, the others are dimmed -->
            <div
                v-for="(item, i) in items"
                :key="item.id"
                class="exp-card"
                :class="{ 'is-active': i === active }"
                :style="cardStyle(i)"
                :aria-hidden="i !== active ? 'true' : 'false'">
                <img :src="item.img" :alt="item.code" draggable="false" />

                <!-- overlay on the ACTIVE card: plus sign + text, click = "open" event -->
                <button
                    v-if="i === active"
                    type="button"
                    class="card-open"
                    :disabled="disabled"
                    :aria-label="moreLabel"
                    @click="$emit('open', item)">
                    <span class="card-open-inner">
                        <span class="card-open-icon">
                            <svg viewBox="0 0 24 24" width="22" height="22">
                                <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor"
                                    stroke-width="2.5" stroke-linecap="round" />
                            </svg>
                        </span>
                        <span class="card-open-text">{{ moreLabel }}</span>
                    </span>
                </button>
            </div>

            <!-- date range of the active item, above the centered card -->
            <div v-if="activeItem" class="exp-dates">
                <div class="exp-dates-pill" :style="{ minWidth: size + 24 + 'px' }">
                    <transition name="label-fade">
                        <span :key="activeItem.id">{{ dateRange }}</span>
                    </transition>
                </div>
            </div>

            <!-- name of the active item, under the centered card -->
            <div v-if="activeItem" class="exp-footer">
                <div class="exp-label">
                    <transition name="label-fade">
                        <span :key="activeItem.id">{{ activeItem.name }}</span>
                    </transition>
                </div>
            </div>

            <!-- arrow on the NEXT card, nudging sideways -->
            <button
                v-if="active < items.length - 1"
                type="button"
                class="nav-btn nav-next"
                :style="nextArrowStyle"
                :disabled="disabled"
                aria-label="Next"
                @click="select(active + 1)">
                <svg viewBox="0 0 24 24" width="22" height="22">
                    <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor"
                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>

            <!-- smaller, calm arrow on the PREVIOUS card -->
            <button
                v-if="active > 0"
                type="button"
                class="nav-btn nav-prev"
                :style="prevArrowStyle"
                :disabled="disabled"
                aria-label="Previous"
                @click="select(active - 1)">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor"
                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
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
    @Prop({ default: false }) disabled!: boolean;
    // text on the overlay of the active card + aria label (pass your i18n string)
    @Prop({ default: "View more" }) moreLabel!: string;
    // 12 month names in the current language (January first). Pass them from your i18n files.
    @Prop({
        default: () => [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
        ],
    })
    months!: string[];
    // text shown when an item has no end date
    @Prop({ default: "Present" }) presentLabel!: string;


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
            zIndex: 10 - Math.abs(d),
        };
    }

    // vertical centre of the stage = vertical centre of every card
    get arrowTop(): number {
        return this.size / 2;
    }

    get nextArrowStyle() {
        return {
            left: `calc(50% + ${this.size * this.offsets[1]}px)`,
            top: this.arrowTop + "px",
        };
    }

    get prevArrowStyle() {
        return {
            left: `calc(50% - ${this.size * this.offsets[1]}px)`,
            top: this.arrowTop + "px",
        };
    }

    @Prop({ default: 0 }) value!: number;   // the active index, owned by the store

    get active(): number {
        return this.value;
    }

    get activeItem(): ExpModel | undefined {
        return this.items[this.active];
    }

    // "2019-06-01" -> "June 2019" (read straight from the string: no Date, no timezone issues)
    private formatMonth(d: string): string {
        const [year, month] = d.split("-");
        const name = this.months[parseInt(month, 10) - 1] || "";
        return `${name} ${year}`;
    }

    get dateRange(): string {
        const it: any = this.activeItem;
        if (!it || !it.start) return "";
        const end = it.end ? this.formatMonth(it.end) : this.presentLabel;
        return `${this.formatMonth(it.start)} - ${end}`;
    }

    select(i: number) {
        if (i < 0 || i >= this.items.length || i === this.value) return;
        this.$emit("input", i);
        this.$emit("select", this.items[i]);
    }
}
</script>

<style scoped>
#expCarousel {
    z-index: 2147483647;
}
.exp-carousel {
    pointer-events: none; /* let the map stay draggable around the cards */
}
.stage {
    width: 100%;
    max-width: 720px;
}

/* cards */
.exp-card {
    position: absolute;
    left: 50%;
    top: 50%;
    background: transparent;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
    transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
        width 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
        height 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
        opacity 0.45s,
        filter 0.45s;
}
.exp-card.is-active {
    pointer-events: auto;      /* the active card can be hovered / clicked */
}
.exp-card:not(.is-active) {
    filter: brightness(0.55) saturate(0.7) blur(1px);   /* "obscured" */
}
.exp-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

/* overlay on the active card */
.card-open {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.25s ease;
}
.card-open-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    transform: translateY(6px);
    transition: transform 0.25s ease;
}
.card-open-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #fff;
    color: #222;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}
.card-open-text {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
}
.exp-card.is-active:hover .card-open,
.card-open:focus-visible {
    opacity: 1;
}
.exp-card.is-active:hover .card-open-inner,
.card-open:focus-visible .card-open-inner {
    transform: translateY(0);
}
.card-open:focus-visible {
    outline: 3px solid #fff;
    outline-offset: -6px;      /* inside the card: the card clips anything outside */
}
.card-open:disabled {
    cursor: default;
}
/* touch screens have no hover: keep a light overlay visible */
@media (hover: none) {
    .card-open {
        opacity: 1;
        background: rgba(0, 0, 0, 0.3);
    }
    .card-open-inner {
        transform: none;
    }
}

/* date range above the active card */
.exp-dates {
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    margin-bottom: 12px;
    z-index: 2147483647;
    pointer-events: none;
}
.exp-dates-pill {
    display: grid;             /* old and new text share one cell while fading */
    width: fit-content;
    margin: 0 auto;            /* centered above the card, a bit wider than it */
    padding: 5px 14px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.55);
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.02em;
    white-space: nowrap;
}
.exp-dates-pill > span {
    grid-area: 1 / 1;
    text-align: center;
}

/* name under the active card (max z-index value browsers accept: 2147483647) */
.exp-footer {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 12px;
    z-index: 2147483647;
    pointer-events: none;
}
.exp-label {
    display: grid;             /* old and new name share one cell while fading */
    width: fit-content;
    max-width: 90%;
    margin: 0 auto;
    padding: 4px 16px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.55);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
}
.exp-label > span {
    grid-area: 1 / 1;
    text-align: center;
}
.label-fade-enter-active,
.label-fade-leave-active {
    transition: opacity 0.25s, transform 0.25s;
}
.label-fade-enter,
.label-fade-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

/* arrows on the neighbouring cards */
.nav-btn {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    pointer-events: auto;
    z-index: 20;
    transform: translate(-50%, -50%);   /* centered on top of the card */
}
.nav-btn:disabled {
    opacity: 0.4;
    cursor: default;
}
.nav-next svg {
    animation: nudge 1.6s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}
.nav-prev {
    width: 32px;
    height: 32px;
    opacity: 0.8;
}
@keyframes nudge {
    0%, 100% { transform: translateX(-3px); }
    50%      { transform: translateX(5px); }
}

.nav-btn:focus-visible {
    outline: 3px solid #fff;
    outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
    .exp-card,
    .card-open,
    .card-open-inner,
    .label-fade-enter-active,
    .label-fade-leave-active {
        transition: none;
    }
    .nav-next svg {
        animation: none;
    }
}
</style>