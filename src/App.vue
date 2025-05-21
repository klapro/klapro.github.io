<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

@Component
export default class App extends Vue {

  @Watch("$store.state.global.language")
  onLanguageChanged(value: string) {
    this.$root.$i18n.locale = value;
  }
}

</script>