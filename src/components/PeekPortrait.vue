<template>
    <div class="portrait" :style="{ width: size + 'px', height: size + 'px' }">
        <img class="photo" :src="photo" alt="" draggable="false" />
    </div>
</template>
 
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
 
@Component
export default class PeekPortrait extends Vue {
    // your photo (any image, shown as a square crop)
    @Prop({ required: true }) photo!: string;
    // side of the square, in px
    @Prop({ default: 180 }) size!: number;

    mounted() {}
}
</script>
 
<style scoped>
.portrait {
    border: 6px solid #fff;
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
}
.photo {
    width: 100%;
    height: 100%;
    object-fit: cover; /* crops any photo to the square */
    display: block;
}
</style>