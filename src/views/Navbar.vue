<template>
    <div ref="nav" :class="navDirection" class="w-100 text-white" style="background: #1976d2;">
        <div class="d-flex justify-content-between p-1 text-white">
            <div class="extra-bold d-flex align-items-center">

                <div v-if="$store.state.global.section == 1">
                    <h3 class="extra-bold"> {{ $t('employmentTitle') }}</h3>
                </div>

                <div v-if="$store.state.global.section == 2">
                    <h3 class="extra-bold"> {{ $t('contactTitle') }}</h3>
                </div>
            
            </div>
        
          <div class="d-flex align-items-center ps-3" style="gap: 8px;">
              <TooltipButton
                :custom="true"
                text="resumeTitle"
                btnStyle="padding-left: 0; padding-right: 0; padding-top: auto;"
                @click="goToResume"
              >
                <p class="text-center fw-bolder"> CV </p>
              </TooltipButton>
              <TooltipButton
                icon="fa-brands fa-github"
                text="githubTitle"
                @click="goToGithub"
              />
              <TooltipButton
                icon="fa-brands fa-linkedin"
                text="linkedinTitle"
                @click="goToLinkedin"
              />
              <TooltipButton
                icon="fa-solid fa-envelope"
                text="contactTitle"
                @click="goToContact"
              />
              <LanguageDropdown />
          </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import RootView from './RootView';

import LanguageDropdown from '@/components/LanguageDropdown.vue';
import TooltipButton from '@/components/TooltipButton.vue';

@Component({
  components: {
    LanguageDropdown,
    TooltipButton
  }
})
export default class Navbar extends RootView {
  navDirection = "bottom-nav";

  $refs!: {
    nav: HTMLElement,
  }

  created() {
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
  };
}
</script>