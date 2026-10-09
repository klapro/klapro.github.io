<template>
    <div>
      <Navbar />
      <v-main>
          <v-container fluid class="no-padding" id="app">
            <SectionEmploymentView />
          </v-container>
      </v-main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import Navbar from './Navbar.vue';

import SectionEmploymentView from './sections/SectionEmploymentView.vue';

@Component({
    components: {
        Navbar,
        SectionEmploymentView,
    }
})
export default class Home extends Vue {
}
</script>