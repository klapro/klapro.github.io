<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <button 
            type="button" 
            class="btn btn-primary text-white" 
            :style="basicStyle + btnStyle"
            @click="$emit('click')" 
            v-bind="attrs"
            v-on="on">
                <template v-if="!custom">
                    <font-awesome-icon :icon="icon" />
                </template>
                <template>
                    <slot></slot>
                </template>
            </button>
        </template>
        <span> {{ $t(text) }}</span>
    </v-tooltip>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class TooltipButton extends Vue {
    @Prop({default: ""}) icon!: string;
    @Prop({default: ""}) text!: string;
    @Prop({default: false}) custom!: boolean;
    @Prop({default: ""}) btnStyle!: string;

    basicStyle = ` height: 36px; width: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08); `
}
</script>