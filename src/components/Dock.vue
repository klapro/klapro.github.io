<template>

    <div class="dock d-flex justify-content-between flex-wrap p-3 rounded"
    :key="key">
            <div v-for="(item, index) in items" 
            :key="item.id" class="ml-5" 
            style="width: 6rem; height: 6rem; cursor: pointer;" 
            :class="{'selected': isSelected(index), 'wasSelected': wasSelected(index)}"
            @mouseover="hoverCard(index)"
            @mouseleave="unselect(index)"
            @click="onClick(item)">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                      <v-img :src="item.img" v-bind="attrs"  v-on="on" heigth="100%" width="100%" :style="item.iconBottom ? 'bottom: 20px;': ''">
                      </v-img>
                  </template>
                  <span>{{item.name}}</span>
                </v-tooltip>
            </div>

    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from "vue-property-decorator";
import SkillModel from '@/models/SkillModel';

@Component
export default class Dock extends Vue {
    @Prop({default: []}) items: SkillModel[] | undefined;

    key: number = 0;
    selected: number = -1;
    previousBatch: Set<number> = new Set();

    onClick(element: any) {
        this.$emit('click', element);
    }

    hoverCard(index: number) {
        this.selected = index;
    }

    unselect(index: number) {
        if (index == this.selected) {
            this.selected = - 1;
        }
        this.previousBatch.add(index);
    }

    isSelected(cardIndex: number): Boolean {
      return this.selected === cardIndex
    }

    wasSelected(cardIndex: number) {
        let result: Boolean = this.previousBatch.has(cardIndex);

        if (result) {
            this.previousBatch.delete(cardIndex);
        }
        
        return result;
    }

}

</script>

<style scoped>

.dock {
    background: rgba(108, 108, 108, 0.3);
}
div.selected {
    transform: scale(1.4, 1.4) translateY(-10px) !important;
    transition-duration: 0.5s;
}

div.wasSelected {
    transform: scale(1, 1) !important;
    transition-duration: 0.5s;
}

div.selected > div {
        transition-duration: 1s;
}

.expand-enter{
  opacity: 0;
  transform: translatex(-100%);
  transition: all 1s ease-out;
}
.expand-enter-to{
  opacity: 1;
  transform: translatex(0);
  transition: all 1s ease-out;
}
.expand-leave-to{
    opacity: 0;
    transform: translatex(-100%);
    transition: all 1s ease-out;
}

.skill:hover {
    cursor: pointer;
    animation: float 0.5s ease-in-out 1;
}

.hidden-text {
    background: rgba(0, 0, 0, 0.5);
    font-size: 2rem;
}

</style>