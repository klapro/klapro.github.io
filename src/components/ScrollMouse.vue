<template>
    <div class="scroll-mouse scroll-mouse-m-0" @click="$emit('click')"></div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class ScrollMouse extends Vue {} 
</script>

<style>
.scroll-mouse {
    width: 2.5em;
    height: 3.75em;
    border-radius: 1.25em;
    background: white;
    border: 0.1875em solid #999;
    position: absolute;
    top: calc(50% - 1.875em);
    left: calc(50% - 1.25em);
}
.scroll-mouse:before,
.scroll-mouse:after {
    content: '';
    display: block;
    position: absolute;
}

/* First */
.scroll-mouse-m-0:before {
    height: 1.875em;         /* 30px / 16 */
    width: 0.25em;           /* 4px / 16 */
    top: 0.625em;            /* 10px / 16 */
    left: calc(50% - 0.125em); /* 2px / 16 */
    background: rgba(153, 153, 153, 0.55);
    border-radius: 0.125em;  /* 2px / 16 */
}

.scroll-mouse-m-0:after {
    width: 0.625em;          /* 10px / 16 */
    height: 0.625em;         /* 10px / 16 */
    border-radius: 50%;
    top: 0.9375em;           /* 15px / 16 */
    left: calc(50% - 0.3125em); /* 5px / 16 */
    background: #999;
    animation: m-0-ball 1.2s ease-in-out infinite;
}

@keyframes m-0-ball {
    40%, 60% {
        transform: translateY(0.625em); /* 10px / 16 */
    }
}
</style>