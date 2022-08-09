<template>
    <div class="w-100">
        <div class="row w-100 h-100">
            <div class="col-lg-3 col-md-4 bg-light d-flex align-items-center flex-column overflow-hidden position-relative">
                <img src="@/assets/exp/hub.jpg" />
                <img src="@/assets/exp/winner.jpg" style="height: auto;" />
            </div>
            <div class="col-lg-6 col-md-4 h-100 position-relative">
                <div class="position-absolute w-100 d-flex justify-content-center" style="top: 20%">
                    <p class="extra-bold bg-light p-3 rounded nice-shadow text-center" style="font-size: 24px;">
                        {{ $t('expCegepTitle') }} <br/> Web & Mobile
                    </p>
                </div>

                <div class="position-absolute w-100 d-flex justify-content-center" style="bottom: 25%">
                    <p class="extra-bold bg-light p-3 rounded nice-shadow text-center" style="font-size: 24px;">
                        {{ $t('expCegepSubtitle') }} <br /> {{ $t('expCegepDate') }}
                    </p>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 bg-light align-item-center p-0 overflow-hidden position-relative">
                <img src="@/assets/exp/localmac.jpg" class="mt-5" style="width: 100%" />
                <p class="p-3 m-0">
                    <span v-html="$t('expCegepText')">

                    </span>
                    &nbsp;
                    <font-awesome-icon class="cursor-pointer" icon='fa-solid fa-newspaper' @click='goToContestArticle' />
                </p>
                
                <div class="p-3 d-flex justify-content-center"> 
                    <v-avatar
                        size="32"
                        >
                        <img
                        src="@/assets/skills/android.png"
                        alt="John"
                        />
                    </v-avatar>

                    <div class="mr-3"></div>
                    <v-avatar
                        size="32"
                        >
                        <img
                        src="@/assets/skills/apple.png"
                        alt="John"
                        />
                    </v-avatar>
                    <div class="mr-3"></div>
                    <v-avatar
                        size="32"
                        >
                        <img
                        src="@/assets/skills/server.png"
                        alt="John"
                        />
                    </v-avatar>
                    <div class="mr-3"></div>
                    <v-avatar
                        size="32"
                        >
                        <img
                        src="@/assets/skills/docker.png"
                        alt="John"
                        />
                    </v-avatar>
                </div>
                <img src="@/assets/exp/languages.png" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class CegepExpPage extends Vue {
    goToContestArticle() {
        window.open('https://les2rives.com/le-mashup-du-cegep-de-sorel-tracy-met-en-valeur-le-travail-des-etudiants/', '_blank');
    }
}
</script>