<template>
    <vue-draggable-resizable 
    :w="window.width" :h="window.height" 
    :parent="true" 
    :minWidth="200"
    :minHeight="200"
    :x="window.x"
    :y="window.y"
    :z="window.zIndex" drag-handle=".drag" 
    class="bg"
    :handles="['br']"
    :onDragStart="onDragStart"
    @dragstop="onDragEnd">
      <div class="d-flex w-100 h-100 flex-column">
        <div class="header p-1 w-100 drag indd-flex position-relative" style="cursor: grab">
            <div class="d-flex justify-content-between" style="width: 30px;">
                <button id="close" @click="onCloseClicked"> </button>
                <button id="expand" @click="onExpandClicked"> </button>
            </div>

            <p class="m-0 text-center position-absolute w-100 h-100">
                {{window.title}}
            </p>
        </div>
        <div class="bg-white" style="flex-grow: 1">
            <slot>
            </slot>
        </div>
      </div>
    </vue-draggable-resizable>

    
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from "vue-property-decorator";
import WindowModel from "@/models/WindowModel";

@Component
export default class Window extends Vue {
    @Prop() window: WindowModel;
    fullScreen = false;

    onExpandClicked() {
        this.fullScreen = !this.fullScreen;
        let target: string = 'fullscreen';

        if (!this.fullScreen) {
            target = 'unfullscreen' 
        }

        this.$emit(target, this.window);
    }

    onCloseClicked() {
        this.$emit('close', this.window);
    }

    onDragStart() {
        this.$emit('dragStart', this.window );
    }

    onDragEnd() {
        this.$emit('dragEnd', this.window );  
    }
}
</script>

<style scoped>
.bg {
    box-shadow: 0 9px 46px 8px rgb(0 0 0 / 14%), 0 11px 15px -7px rgb(0 0 0 / 12%), 0 24px 38px 3px rgb(0 0 0 / 20%);
    box-shadow: 0px 22px 66px 0px rgb(0 0 0 / 50%), 0px 0px 2px rgb(0 0 0 / 50%);
    border-radius: 6px !important;
    line-height: 1.5;
    overflow: hidden !important;
    border: none !important;
}
.header {
    background: rgb(232,230,232);
    background: -moz-linear-gradient(top, rgb(232,230,232) 0%, rgb(228,226,228) 20%, rgb(213,211,213) 80%, rgb(210,208,210) 100%);
    background: -webkit-linear-gradient(top, rgb(232,230,232) 0%,rgb(228,226,228) 20%,rgb(213,211,213) 80%,rgb(210,208,210) 100%);
    background: linear-gradient(to bottom, rgb(232,230,232) 0%,rgb(228,226,228) 20%,rgb(213,211,213) 80%,rgb(210,208,210) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e8e6e8',endColorstr='#d2d0d2',GradientType=0 );
    border-top: 1px solid rgb(245,244,245);
    border-bottom: 1px solid rgb(179,177,179);
}

.header button {
    width: 12px;
    height: 12px;
    border-radius: 10px;
    cursor: pointer !important;
    transition-duration: 0.5s;
    z-index: 10000;
}

.header p {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    top: 0px;
}

button#close {
    border: 1px solid rgb(229,66,67);
    background: rgb(255,94,92);
}

button#expand {
    border: 1px solid rgb(20,174,21);
    background: rgb(55,201,64);
}

button#close:hover {
    background: rgb(213, 55, 52);
}

button#expand:hover {
    background: rgb(40, 166, 49);
}


</style> 