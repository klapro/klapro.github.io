<template>
    <div>
      <Me />
      <Navbar />
      <v-main>
          <v-container fluid class="no-padding" id="app">
            <ContentView />
          </v-container>
      </v-main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import Navbar from './Navbar.vue';
import Me from './Me.vue';
import ContentView from './ContentView.vue';

@Component({
    components: {
        Navbar,
        ContentView,
        Me
    }
})
export default class Home extends Vue {
}
</script>