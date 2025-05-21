<template>
    <ExpPageLayout>
        <template #side-left>
            <img src="@/assets/exp/hub.jpg" />
            <img src="@/assets/exp/winner.jpg" style="height: auto;" />
        </template>
        <template #title>{{ $t('expCegepTitle') }} <br/> Web & Mobile </template>
        <template #subtitle> {{ $t('expCegepSubtitle') }} <br /> {{ $t('expCegepDate') }} </template>
        <template #side-right>
            <img src="@/assets/exp/localmac.jpg" class="mt-5" style="width: 100%" />
            <img src="@/assets/exp/languages.png" />
        </template>
    </ExpPageLayout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ExpPageLayout from '@/components/ExpPageLayout.vue';

@Component({
    components: {
        ExpPageLayout
    }
})
export default class CegepExpPage extends Vue {
    goToContestArticle() {
        window.open('https://les2rives.com/le-mashup-du-cegep-de-sorel-tracy-met-en-valeur-le-travail-des-etudiants/', '_blank');
    }
}
</script>