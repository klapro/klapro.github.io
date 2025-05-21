<template>
    <div class="language-dropdown" style="height: 32px; max-height: 32px !important; width: 156px">
        <v-select
          id="selector"
          color="#000"
          :items="menu"
          light
          filled
          solo
          :label="$t('languages')"
          hide-details
          class="h-100"
          :value="$store.state.global.language"
          @change="onChanged"
        ></v-select>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import LanguageModel from '@/models/LanguageModel';

@Component
export default class LanguageDropdown extends Vue {

  get items(): LanguageModel[] {
      return this.$store.state.global.languages;
  }

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

  onChanged(event: any) : void {
    this.$store.commit("global/setLanguage", event);
  }
}


</script>

<style>

.language-dropdown .v-input__slot {
  background: white !important;
}

.language-dropdown .v-input__control, .language-dropdown .v-input__control > div, .language-dropdown .v-input__control .v-select__selections  {
  min-height: 0 !important;
  height: 100% !important;
}
  
.language-dropdown .v-input__control .v-select__selection {
  line-height: 0 !important;
  margin: 0 !important;
  height: 100% !important;
  text-align: center;
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>