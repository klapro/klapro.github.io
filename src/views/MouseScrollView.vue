<template>
    <div class="position-fixed w-100" style="z-index: 9999; bottom: 86px;">
        <div class="w-100 d-flex justify-content-center" style="font-size: 12px;">
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <div 
                        v-bind="attrs"
                        v-on="on"
                        id="mouse-scroll-box" 
                        @click="$emit('click')">
                        <ScrollMouse />
                    </div>
                </template>
                <span> {{ $t('scrollText') }}</span>
            </v-tooltip>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import ScrollMouse from "@/components/ScrollMouse.vue";

@Component({
    components: {
        ScrollMouse
    }
})
export default class MouseScrollView extends Vue {

}
</script>

<style>
#mouse-scroll-box {
    cursor: pointer;
    height: 4.8em; 
    width: 4.8em; 
    background: white; 
    border-radius: 50%;
    border: 2px solid gray;
}
</style>