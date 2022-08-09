<template>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="toggleStat"
        style="z-index: 99999;"
    > 
        <div v-if="toggleStat">
        <v-card>
            <v-toolbar
            color="secondary"
            dark
            >{{skill.name}}</v-toolbar>
            
            <v-card-body class="p-3">
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="4">
                            <v-img
                            max-height="131"
                            max-width="275"
                            :src="skill.img"
                            ></v-img>
                            <v-card-title>{{$t('skillDescription')}}</v-card-title>
                            <p> {{$t("skill"+skill.name+"Description")}} </p>
                            <v-card-title>{{$t('skillOverall')}}</v-card-title>
                            <v-rating
                                length="5"
                                size="24"
                                :value="skill.rating"
                                ></v-rating>
                        </v-col>

                        <v-col cols="8">
                            <v-card-title>{{$t('skillRating')}}</v-card-title>

                            <div class="p-5">
                                <div v-for="subskill in skill.subskills">
                                    <p> {{ subskill.name }} </p>
                                    <v-rating
                                    length="5"
                                    size="12"
                                    :value="subskill.rating"
                                    ></v-rating>
                                    <br />
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-body>
            
            <v-card-actions class="justify-end">
            <v-btn
                text
                @click="onSkillClose"
            >{{$t('closeBtn')}}</v-btn>
            </v-card-actions>
        </v-card>
        </div>
    </v-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from "vue-property-decorator";
import SkillModel from '@/models/SkillModel';

@Component
export default class SkillDialog extends Vue {
    skill: SkillModel;
    toggleStat: Boolean = false;

    onSkillClose() {
      this.toggleStat = false;
    }

    open(skill: SkillModel) {
        this.toggleStat = true;
        this.skill = skill;
    }
}
</script>

<style scoped>
</style>