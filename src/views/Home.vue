<template>
    <div>
      <Navbar />
      <v-main>
          <v-container fluid class="no-padding" id="app">
            <SectionHeadView />
            <SectionEmploymentView />
            <SectionContactView />
          </v-container>
      </v-main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import Navbar from './Navbar.vue';
import SectionHeadView from './sections/SectionHeadView.vue';
import SectionEmploymentView from './sections/SectionEmploymentView.vue';
import SectionContactView from './sections/SectionContactView.vue';

require("@/scroll.js");

@Component({
    components: {
        Navbar,
        SectionHeadView,
        SectionEmploymentView,
        SectionContactView
    }
})
export default class Home extends Vue {
    selectedBottom = "recent";

    inMove = false;
    offsets: any[] = [];
    touchStartY = 0;

    get section() {
      return this.$store.state.global.section;
    }

    set section(value: number) {
      this.$store.commit("global/setSection", value);
    }

    async created() {
      ((that: any) => {
        window.onscroll = function () {
          // navbar function
              if (window.pageYOffset > (500 - that.$refs.nav.offsetHeight)) {
                  that.navDirection = "top-nav" ;
              } else {
                  that.navDirection = "bottom-nav";
              }
        }
      })(this);

      window.addEventListener("DOMContentLoaded", (event) => {
        this.calculateSectionOffsets();
      });
    
      window.addEventListener('DOMMouseScroll', this.handleMouseWheelDOM);  // Mozilla Firefox
      window.addEventListener('mousewheel', this.handleMouseWheel, { passive: false }); // Other browsers
    
      window.addEventListener('touchstart', this.touchStart, { passive: false }); // mobile devices
      window.addEventListener('touchmove', this.touchMove, { passive: false }); // mobile devices
    }

    calculateSectionOffsets() {
      let sections = document.getElementsByTagName('section');
      let length = sections.length;

      for(let i = 0; i < length; i++) {
        let sectionOffset = sections[i].offsetTop;
        this.offsets.push(sectionOffset);
      }
    }

    handleMouseWheel(e : any) {
      
      if (e.wheelDelta < 30 && !this.inMove) {
        this.moveUp();
      } else if (e.wheelDelta > 30 && !this.inMove) {
        this.moveDown();
      }
        
      e.preventDefault();
      return false;
    }

    handleMouseWheelDOM (e: any) {
      
      if (e.detail > 0 && !this.inMove) {
        this.moveUp();
      } else if (e.detail < 0 && !this.inMove) {
        this.moveDown();
      }
      
      return false;
    }

    moveDown() {
      this.inMove = true;
      this.section--;
        
      if(this.section < 0) this.section = 0;
        
      this.scrollToSection(this.section, true);
    }

    moveUp() {
      this.inMove = true;
      this.section++;
        
      if(this.section > this.offsets.length - 1) this.section--;
        
      this.scrollToSection(this.section, true);
    }

    scrollToSection(id: any, force = false) {
      if(this.inMove && !force) return false;
      
      this.section = id;
      this.inMove = true;
      
      document.getElementsByTagName('section')[id].scrollIntoView({behavior: 'smooth'});
      
      setTimeout(() => {
        this.inMove = false;
      }, 400);
      
    }

    touchStart(e: any) {
      e.preventDefault();
      
      this.touchStartY = e.touches[0].clientY;
    }

    touchMove(e: any) {
      if(this.inMove) return false;
      e.preventDefault();
      
      const currentY = e.touches[0].clientY;
      
      if(this.touchStartY < currentY) {
        this.moveDown();
      } else {
        this.moveUp();
      }
      
      this.touchStartY = 0;
      return false;
    }
}
</script>