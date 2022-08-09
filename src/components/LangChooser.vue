<template>
    <div>
        <v-select
          id="selector"
          color="#000"
          :items="menu"
          light
          filled
          solo
          label="Languages"
          hide-details
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
    console.log(this.$i18n)
    this.$root.$i18n.locale = event;
   }
}


</script>

<style scoped>
#selector {
    background: white;
}
</style>