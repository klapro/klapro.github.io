<template>
    <section id="section-head">
        <div class="w-100 h-100 overlay d-flex flex-column">
            <div class="d-flex p-3" style="gap: 8px;">
                <img src="@/assets/logo.png" style="width: 48px; height: 48px;" />
                <div class="text-white">
                    <p class="mb-0 mt-0 fw-bold" style="font-size: 24px;"> Kevin Larocque </p>
                    <p class="fw-bold" style="font-size: 12px; margin-top: -12px;"> {{ $t("workTitle") }} </p>
                </div>
            </div>
            
            <div class="flex-grow-1" style="margin-bottom: 96px;">
                <div class="d-flex justify-content-center flex-column align-items-center h-100 w-100 text-white">
                    <div id="layer" class="p-3 w-100 position-absolute" style="height: 196px;"> </div>
                    <div class="w-100 d-flex justify-content-center align-items-center">
                        <div class="d-flex justify-content-between align-items-center" style="width: 880px; padding-left: 64px; padding-right: 96px;">
                            <v-avatar size="248">
                                <v-img
                                    style="transform: scale(1.2)"
                                    alt="Kevin"
                                    src="@/assets/professional.png"
                                ></v-img>
                            </v-avatar>
                            <div style="height: 196px;">
                                <p style="font-size: 28px; letter-spacing: 1.2px;" class="h-auto f-inter-light mt-5 mb-0"> 
                                    <template v-if="$store.state.global.language == 'en'">
                                        Built through experience, <br /> 
                                        driven by code. <br /> 
                                        <span> I  <span class="f-inter-bold"> will </span> make it happen ! </span>
                                    </template>
                                    <template v-else>
                                        Batit par l'expérience, <br />
                                        inspiré par le code. <br />
                                        <span> Je <span class="f-inter-bold"> vais </span> réaliser votre projet ! </span>
                                    </template>
                                    
                                </p>
                                <p class="f-inter-light" style="font-size: 16px; letter-spacing: 1.2px;"> 
                                    <i>
                                        {{ $t("pitchExpertise") }}
                                    </i>
                                </p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import RootView from '../RootView';

@Component({})
export default class SectionHeadView extends RootView {
    show = false;
    showScrollDown = false;

    async created() {
        await this.sleep(500);
        this.show = true;
        await this.sleep(1500);
        this.showScrollDown = true;
    }
}
</script>

<style>
#section-head {
  background: url('@/assets/backgrounds/head.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

#section-head #layer {
    background: rgba(217, 217, 217, 0.6)
}

.overlay {
    background: rgba(1, 1, 1, 0.5);
    z-index: 10;
}
</style>