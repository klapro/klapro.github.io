<template>
    <div class="lang-chooser" style="height: 32px; max-height: 32px !important; width: 156px">
        <v-select
          id="selector"
          color="#000"
          :items="menu"
          light
          filled
          solo
          label="Languages"
          hide-details
          class="h-100"
          @change="onlangchanged"
        ></v-select>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import LangModel from '@/models/LangModel';

@Component
export default class LangChooser extends Vue {
   @Prop({default: []}) items: LangModel[] | undefined;

   get menu() {
        let results: any[] = [];
    
        for (let i = 0; i < this.items!.length; i++) {
            results.push({
                text: this.items![i].tag,
                value: this.items![i].id
            });
        }
        return results;
   }

   onlangchanged(event: any) : void {
    this.$root.$i18n.locale = event;
   }
}


</script>

<style>
.lang-chooser #selector {
    background: white;
}

.lang-chooser .v-input__control, .lang-chooser .v-input__control > div, .lang-chooser .v-input__control .v-select__selections  {
    min-height: 0 !important;
    height: 100% !important;
  }
  
  .lang-chooser .v-input__control .v-select__selection {
    line-height: 0 !important;
    margin: 0 !important;
    height: 100% !important;
    text-align: center;
    display: flex;
    justify-content: start;
    align-items: center;
  }
</style>