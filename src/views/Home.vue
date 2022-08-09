<template>
    <div>
        <div ref="nav" :class="navDirection" class="w-100 text-white" style="background: #1976d2;">
            <div class="d-flex justify-content-between p-3 text-white">
            <div class="extra-bold d-flex align-items-center">
                <div v-if="activeSection == 0">
                    <h3 class="extra-bold"> Kevin Larocque  <span style="font-size: 16px;">  {{ $t('workTitle') }} </span> </h3>
                </div>

                <div v-if="activeSection == 1">
                    <h3 class="extra-bold"> {{ $t('skillTitle') }}</h3>
                </div>

                <div v-if="activeSection == 2">
                    <h3 class="extra-bold"> {{ $t('employmentTitle') }}</h3>
                </div>

                <div v-if="activeSection == 3">
                    <h3 class="extra-bold"> {{ $t('contactTitle') }}</h3>
                </div>
                
            </div>
            
            <div>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <button 
                    type="button" 
                    class="btn btn-primary text-white" 
                    @click="goToResume" 
                    v-bind="attrs"
                    v-on="on">
                      <font-awesome-icon icon="fa-solid fa-newspaper" />
                    </button>
                  </template>
                  <span> {{ $t('resumeTitle') }}</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <button type="button"
                    class="btn btn-primary ml-3 text-white" 
                    @click="goToLinkedin"
                    v-bind="attrs"
                    v-on="on">
                        <font-awesome-icon icon="fa-brands fa-linkedin" />
                    </button>
                  </template>
                  <span> {{ $t('linkedinTitle') }}</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                  <button type="button" 
                  class="btn btn-primary ml-3 text-white" 
                  @click="goToContact"
                  v-bind="attrs"
                  v-on="on">
                    <font-awesome-icon icon="fa-solid fa-envelope" />
                  </button>
                  </template>
                  <span> {{ $t('contactTitle') }}</span>
                </v-tooltip>
                <div class="d-inline-block text-white ml-3">
                <LangChooser color="white" :items="$store.state.LangModule.langs" />
                </div>
            </div>
        </div>
    </div>

    <v-main>
        
        <v-container fluid class="no-padding" id="app">
        <section id="section-head">
            <div id="head-overlay" class="w-100 h-100 d-flex align-items-center justify-content-center position-relative"
            style="overflow-y: hidden;">
              
                <div class="position-absolute w-50" style="right: 32px;">
                  <transition name="slideright">
                        <div v-if="showHeadPage" 
                            class="w-100 h-100">

                        
                          <h1 class="text-white extra-bold main-title lt-spacing"> {{ $t('titlePitch') }}</h1>
                          <h3 class="text-white extra-bold mt-5 lt-spacing"> Devops, Backend, Mobile, etc. you name it! <br /> {{ $t('titleDesc') }} </h3>

                          <br />

                          <v-btn
                          rounded
                          color="primary"
                          dark
                          class="float-right mt-3 mr-5 p-4"
                          @click="goToResume"
                          >
                          {{ $t('resumeTitle') }} &nbsp; <v-icon>mdi-account</v-icon>
                          </v-btn>
                        </div>
                  </transition>
                </div>
                <div 
                  class="d-flex justify-content-center align-items-center"
                  style="width: 35%; position: absolute; top: 125px; left: 5px; "
                  >
                    <transition name="bubble">
                      <div class="position-absolute" 
                      style="transform: rotate(10deg); z-index: 1001; right: -125px; width: 256px; height: 64px"
                      v-if="showScrollDownText">
                        <div class="position-relative w-100 h-100">
                          <img src="@/assets/bubble.png" class="w-100 h-100"/>
                          <p class="position-absolute extra-bold lt-spacing text-center" 
                          style="left: 24px; top: 12px;
                          width: 225px;"> {{ $t('scrolldownText')}} </p>
                        </div>
                      </div>
                    </transition>
                    <div
                    style="box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);"
                    class="d-flex rounded-circle w-75 h-auto position-relative overflow-hidden">
                      <div id="face" class="position-absolute w-100 h-100"> </div>
                      <img
                      src="@/assets/me.png" 
                      class="w-100 h-100" />
                    </div>
                </div>
            </div>
        </section>
        <section id="section-experience" class="position-relative">
            <div class="position-relative w-100 h-100">
              <SkillDialog ref="skillDialog" />
                
              <div class="d-flex p-5 justify-content-center align-items-center w-100 h-100">

                  <Dock 
                  :items="$store.state.SkillModule.items"
                  @click="onSkillClicked"
                  />

              </div>
        </div>
        </section>
        <section id="section-employments">
            <div class="w-100 h-100 d-flex">
              <div id="map" class="w-100 h-100 overflow-hidden position-relative">
                  <l-map ref="map" class="w-100 h-100" :zoom="mapZoom" :center="mapCenter" :options="{zoomControl: false}">
                    <l-tile-layer :url="mapUrl" :attribution="mapAttribution"></l-tile-layer>
                    <l-marker :lat-lng="item.position" v-for="item in $store.state.ExpModule.items" :key="item.id">
                      <l-icon
                        :icon-size="iconSize"
                        :icon-anchor="mapitemAnchor()"
                        :icon-url="item.img"
                        />
                    </l-marker>
                  </l-map>


                  <transition name="slideleft">
                    <div id="expPage" 
                    v-if="showExpPage"
                    class="position-absolute w-100 h-100 bg-light d-flex justify-content-center align-items-center">
                          <transition name="slidetop" appear>
                            <div class="w-75 h-100 d-flex align-item-center">
                              <CegepExpPage v-if="expType === 'cegep'" />
                              <NexwebExpPage v-else-if="expType === 'nexweb'" />
                              <TopmenuExpPage v-else />
                            </div>
                          </transition>
                    </div>
                  </transition>

                  <div id="journeyBar" class="w-100 position-absolute d-flex justify-content-center">
                    <div class="w-50 h-100 position-relative d-flex justify-content-between bg-light p-3 rounded nice-shadow">
                      <template v-for="(item, index) in $store.state.ExpModule.items">
                        <JourneyButton 
                        :index="index+1" 
                        :item="item"
                        @click="onExpBtnClicked"/>
                        <template v-if="index != $store.state.ExpModule.items.length -1">
                          <hr class="v-divider theme--light mt-5 ml-3 mr-3"/>
                        </template>
                      </template>
                      
                    </div>
                  </div>
              </div>
            </div>
        </section>
        <section id="section-contacts" ref="sectionContact" class="d-flex justify-content-center">
            <div class="w-50 h-100 d-flex align-items-center">
              <div class="row pt-3 pb-3 pr-3">
                <div class="col-5 p-0 d-flex align-items-center justify-content-center"> 
                  <PersonalCard />
                </div>

                <div class="col-7 p-0 bg-light box-shadow"> 
                  <div class="p-3">
                    <p style="font-weight: 500; letter-spacing: 1.2px; font-size: 18px;">
                      {{ $t('contactSubtitle') }} 
                      <font-awesome-icon icon="fa-solid fa-envelope" />
                    </p>
                    <hr />

                    <div class="row">
                      <div class="col-6">
                        <v-text-field
                        v-model="contactName"
                        :label="$t('contactName')"
                        required
                        ></v-text-field>
                      </div>

                      <div class="col-6">
                        <v-text-field
                        v-model="contactEmail"
                        :label="$t('contactEmail')"
                        required
                      ></v-text-field>
                      </div>
                    </div>

                    <v-select
                      :items="contactReasons"
                      filled
                      :label="$t('contactReason')"
                    ></v-select>

                    <v-textarea
                      solo
                      name="input-7-4"
                      noResize
                      :label="$t('contactMessage')"
                    ></v-textarea>

                    <div class="w-100 d-flex justify-content-end">
                      <button 
                      type="button" 
                      class="btn btn-primary text-white" style="font-weight: 600; letter-spacing: 1.2px;">
                      {{ $t('contactSend')}}
                      <font-awesome-icon icon="fa-solid fa-angles-right" />
                      </button>
                    </div>
                  </div>
                    
                </div>

                </div>
            </div>
        </section>
        </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import PersonalCard from '@/components/PersonalCard.vue';
import AnimatedComponent from '@/components/AnimatedComponent.vue';
import ScrolldownIcon from '@/components/ScrolldownIcon.vue';
import LangChooser from '@/components/LangChooser.vue';
import Dock from '@/components/Dock.vue';
import SkillDialog from '@/components/SkillDialog.vue';
import JourneyButton from '@/components/JourneyButton.vue';

import SkillModel from '@/models/SkillModel';
import ExpModel from '@/models/ExpModel';

import CegepExpPage from '@/views/ExpPage/CegepExpPage.vue';
import NexwebExpPage from '@/views/ExpPage/NexwebExpPage.vue';
import TopmenuExpPage from '@/views/ExpPage/TopmenuExpPage.vue';

import {v4 as uuid} from 'uuid';
import {LMap, LTileLayer, LControlZoom, LIcon, LControl} from 'vue2-leaflet';

require("@/scroll.js");

const DEFAULT_Z = 999;
const MAIN_Z = 1000;
const DEFAULT_WIN_WIDTH = 500;
const DEFAULT_WIN_HEIGHT = 300;

@Component({
    components: {
        PersonalCard,
        AnimatedComponent,
        ScrolldownIcon,
        LangChooser,
        Dock,
        LMap,
        LTileLayer,
        LControlZoom,
        LIcon,
        LControl,
        JourneyButton,
        CegepExpPage,
        NexwebExpPage,
        TopmenuExpPage,
        SkillDialog
    }
})
export default class Home extends Vue {
    mapCenter = [45.505331312, -73.55249779];
    mapZoom = 8;
    mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    mapAttribution = "&copy; <a href='https://openstreetmap.org/copyright'>OpenStreetMap contributors</a>";
    selectedBottom = "recent";
    navDirection = "bottom-nav";
    iconSize: number = 64;
    inPage = true;
    showHeadPage = false;
    showExpPage = false;
    showScrollDownText = false;
    expType = "";
    skillDialog = false;
    selectedSkill: SkillModel;
    contactName = "";
    contactEmail = "";
    contactReasons = [
      { text: this.$t('contactReasonJob'), value: 'contactReasonJob'},
      { text: this.$t('contactReasonContract'), value: 'contactReasonContract'},
      { text: this.$t('contactReasonMentor'), value: 'contactReasonMentor'},
      { text: this.$t('contactReasonOther'), value: 'contactOther'}
    ]

    $refs!: {
      nav: HTMLElement,
      sectionContact: HTMLElement,
      map: any,
      skillDialog: SkillDialog
    };

    inMove = false;
    activeSection = 0;
    offsets: any[] = [];
    touchStartY = 0;

    sleep(ms: number): Promise<any> {
      return new Promise(resolve => setTimeout(resolve, ms));
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
    
      await this.sleep(500);
      this.showHeadPage = true;

      await this.sleep(1500);
      this.showScrollDownText = true;
    }

    goToContact() {
      this.inPage = false;
      (this.$refs.sectionContact as any).scrollIntoViewPromise({ behavior: "smooth" }).then(() => {
        this.activeSection = 2;
        this.inPage = true;
      })
    }

    goToLinkedin() {
      window.open('https://www.linkedin.com/in/kevin-larocque-a6658b130/', '_blank');
    }

    goToResume() {
      
    }

    mapitemSize(): number[] {
      return [this.iconSize, this.iconSize * 1.15];
    }

    mapitemAnchor(): number[] {
      return [this.iconSize / 2, this.iconSize * 1.15];
    }

    onSkillClicked(skill: SkillModel) {
      this.selectedSkill = skill;
      (this.$refs.skillDialog as SkillDialog).open(skill);
    }

    async onExpBtnClicked(item: ExpModel) {
      let map: any = this.$refs.map.mapObject;
      let zoom: number = map.getZoom();
      let that = this;
      this.expType = item.code;

      if (this.showExpPage) {
        this.showExpPage = false;
        await this.sleep(1000); 
      } 

      map.flyTo(item.position, 12);

      map.once('moveend', function() {
        that.showExpPage = true;
      });
      
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
      this.activeSection--;
        
      if(this.activeSection < 0) this.activeSection = 0;
        
      this.scrollToSection(this.activeSection, true);
    }

    moveUp() {
      this.inMove = true;
      this.activeSection++;
        
      if(this.activeSection > this.offsets.length - 1) this.activeSection--;
        
      this.scrollToSection(this.activeSection, true);
    }

    scrollToSection(id: any, force = false) {
      if(this.inMove && !force) return false;
      
      this.activeSection = id;
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

<style scoped>
  p, h1, h2, h3, h4, h5 {
    font-family: 'Raleway', sans-serif;
  }

  #face {
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.2);
  }

  #head-overlay {
    background: rgba(0, 0, 0, 0.5);
  }

  .boxshadow {
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  }

  section#section-head {
    background: url('@/assets/head-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  #skill-title {
    left: 3rem;
    top: 3rem;
  }

  section#section-experience {
    background: url('@/assets/experience-bg-old.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  section#section-contacts {
    background: url('@/assets/intro-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .no-padding {
    padding: 0 !important;
  }

  section {
    height: 100vh;
  }

  #expPage {
    z-index: 999 !important;
    top: 0%;
    left: 0;
    width: 10%;
    background: rgba(1, 1, 1, 0.25) !important;
  }

  #journeyBar {
    z-index: 1000 !important;
    top: 80%;
  }

  .v-bottom-navigation {
    padding-bottom: 12px !important;
  }

  #bottom-page {
    position: fixed;
    bottom: 128px;
    width: 100%;
  }

  .box {
    height: 75vh;
    background: 	rgba(0, 0, 0, 0.5);
    border: 1px solid black;
  }
  
  .lt-spacing {
    letter-spacing: 1.15px;
  }
  

.bubble-enter {
  opacity: 0;
  width: 0 !important;
  height: 0 !important;
  transform: rotate(250deg) !important;
  transition: all 1s ease-out;
}

.bubble-enter-to {
  opacity: 1;
  width: 256px !important;
  height: 64px !important;
  transform: rotate(10deg) !important;
  transition: all 1s ease-out;
}

.bubble-leave-to {
  opacity: 0;
  width: 0px;
  height: 0px;
  transform: rotate(250deg) !important;
  transition: all 1s ease-out;
}

.slideleft-enter{
  opacity: 0;
  transform: translatex(-100%);
  transition: all 1s ease-out;
}
.slideleft-enter-to{
  opacity: 1;
  transform: translatex(0);
  transition: all 1s ease-out;
}
.slideleft-leave-to{
    opacity: 0;
    transform: translatex(-100%);
    transition: all 1s ease-out;
}
.slidetop-enter{
  opacity: 0;
  transform: translatey(-100%);
  transition: all 1s ease-out;
}
.slidetop-enter-to{
  opacity: 1;
  transform: translatey(0);
  transition: all 1s ease-out;
}
.slidetop-leave-to{
    opacity: 0;
    transform: translatey(-100%);
    transition: all 1s ease-out;
}



.slideright-enter{
  opacity: 0;
  transform: translatex(100%);
  transition: all 1s ease-out;
}
.slideright-enter-to{
  opacity: 1;
  transform: translatex(0);
  transition: all 1s ease-out;
}
.slideright-leave-to{
    opacity: 0;
    transform: translatex(100%);
    transition: all 1s ease-out;
}

  @import'~bootstrap/dist/css/bootstrap.css'
</style>