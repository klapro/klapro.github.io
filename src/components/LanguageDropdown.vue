<template>
  <div class="language-dropdown" style="height: 32px; max-height: 32px !important; width: 90px">
    <v-select
      id="selector"
      :items="menu"
      solo
      flat
      dark
      background-color="transparent"
      :label="$t('languages')"
      hide-details
      class="h-100"
      :value="$store.state.global.language"
      @change="onChanged"
      append-icon=""
    >
      <!-- Selected value: flag + white bold code -->
      <template v-slot:selection="{ item }">
        <span class="lang-flag" v-html="flagSvg(item.text)"></span>
        <span class="language-code">{{ item.text }}</span>
      </template>

      <!-- Dropdown menu entries: flag + code -->
      <template v-slot:item="{ item }">
        <span class="lang-flag" v-html="flagSvg(item.text)"></span>
        <span class="language-code-item">{{ item.text }}</span>
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import LanguageModel from '@/models/LanguageModel';
import * as flags from 'country-flag-icons/string/3x2';

// Language tag -> country code. Add more languages here as needed.
const LANGUAGE_TO_COUNTRY: { [lang: string]: string } = {
  en: 'GB',   // or 'US' / 'CA'
  fr: 'FR',   // or 'CA' for Québec
};

@Component
export default class LanguageDropdown extends Vue {

  get items(): LanguageModel[] {
    return this.$store.state.global.languages;
  }

  get menu() {
    return this.items.map(lang => ({
      text: lang.tag.toUpperCase(), // EN, FR
      value: lang.id
    }));
  }

  flagSvg(tag: string): string {
    const country = LANGUAGE_TO_COUNTRY[tag.toLowerCase()] || tag.toUpperCase();
    return (flags as unknown as { [code: string]: string })[country] || '';
  }

  onChanged(event: any): void {
    this.$store.commit("global/setLanguage", event);
  }
}
</script>

<style>
/* Transparent background, no shadow/border */
.language-dropdown .v-input__slot {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
}

.language-dropdown .v-input__control,
.language-dropdown .v-input__control > div,
.language-dropdown .v-input__control .v-select__selections {
  min-height: 0 !important;
  height: 100% !important;
}

.language-dropdown .v-input__control .v-select__selection {
  line-height: 0 !important;
  margin: 0 !important;
  height: 100% !important;
  display: flex;
  justify-content: start;
  align-items: center;
}

/* White bold code next to the flag */
.language-dropdown .language-code {
  color: white !important;
  font-weight: bold;
  margin-left: 8px;
  line-height: 1;
}

/* White dropdown arrow */
.language-dropdown .v-icon {
  color: white !important;
}

/* Flag (used in both the selection and the menu) */
.lang-flag {
  display: inline-flex;
  width: 22px;
  height: 15px;
}

.lang-flag svg {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}

/* Menu entries (the menu renders outside .language-dropdown) */
.language-code-item {
  font-weight: bold;
  margin-left: 8px;
}
</style>