<template>
    <div ref="nav" :class="navDirection" class="w-100 text-white" style="background: #1976d2;">
        <div class="d-flex justify-content-between p-1 text-white">
            <div class="d-flex align-items-center">

                <div class="d-flex align-items-center mb-0" style="gap: 8px; margin-left: 42px;">
                    <h3 class="extra-bold mb-0"> Kevin Larocque </h3>  
                    <span style="position: relative; display: inline-block; width: 64px; height: 32px;">
                        <img src="@/assets/briefcase.svg"
                            style="position: absolute; left: 5px; top: 50%; width: 56px; transform: translateY(-38px);" />
                    </span>
                    <h3 class="mb-0">{{ $t('workTitle') }}</h3>
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