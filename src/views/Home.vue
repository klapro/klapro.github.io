<template>
    <div>
      <Me />
      <Navbar />
      <v-main>
          <v-container fluid class="no-padding" id="app">
            <EmploymentView />
          </v-container>
      </v-main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import Navbar from './Navbar.vue';
import Me from './Me.vue';
import EmploymentView from './EmploymentView.vue';

@Component({
    components: {
        Navbar,
        EmploymentView,
        Me
    }
})
export default class Home extends Vue {
}
</script>