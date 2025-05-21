<template>
    <section id="section-contacts" ref="sectionContact" class="d-flex justify-content-center">
        <div class="d-flex align-items-center" style="margin-top: 96px; width: 720px; margin-bottom: 32px;">
            <div class="p-3 d-flex align-items-center justify-content-center bg-light box-shadow" style="height: 480px;"> 
            
              <PersonalCard />
              <div class="p-3">
                <p style="font-weight: 500; letter-spacing: 1.2px; font-size: 18px;">
                  {{ $t('contactSubtitle') }} 
                  <font-awesome-icon icon="fa-solid fa-envelope" />
                </p>
                <hr />

                <v-form
                    ref="form"
                    v-model="$refs.form"
                    lazy-validation
                  >

                    <div class="row">
                        <div class="col-6">
                        <v-text-field
                        v-model="form.name.value"
                        :label="$t('contactName')"
                        required
                        :rules="form.name.rules"
                        ></v-text-field>
                        </div>

                        <div class="col-6">
                        <v-text-field
                        v-model="form.email.value"
                        :label="$t('contactEmail')"
                        :rules="form.email.rules"
                        required
                        ></v-text-field>
                        </div>
                    </div>

                    <v-select
                        :items="form.reason.items"
                        filled
                        v-model="form.reason.value"
                        :label="$t('contactReason')"
                        :rules="form.reason.rules"
                    ></v-select>

                    <v-textarea
                        solo
                        name="input-7-4"
                        noResize
                        v-model="form.message.value"
                        :rules="form.message.rules"
                        :label="$t('contactMessage')"
                    ></v-textarea>

                    <div class="w-100 d-flex justify-content-end">
                        <button 
                        type="button" 
                        @click="confirm"
                        class="btn btn-primary text-white" style="font-weight: 600; letter-spacing: 1.2px;">
                        {{ $t('contactSend')}}
                        <font-awesome-icon icon="fa-solid fa-angles-right" />
                        </button>
                    </div>
                </v-form>
              </div>

            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import RootView from "../RootView";
import { VForm } from "@/VForm";

import PersonalCard from "@/components/PersonalCard.vue";

@Component({
    components: {
        PersonalCard
    }
})
export default class SectionContactView extends RootView {
    messageSentDialog = false;
    formValid = true;

    $refs!: {
        form: VForm
    }

    form = {
        name: {
            value: "",
            rules: [
                (v: any) => !!v || this.$t('contactNameRuleRequired'),
                (v: any) => (v && v.length >= 3) || this.$t('contactNameRuleMin')
            ]
        },
        email: {
            value: "",
            rules:  [
                (v: any) => !!v || this.$t('contactEmailRuleRequired'),
                (v: any) => /.+@.+\..+/.test(v) || this.$t('contactEmailRuleValid'),
            ]
        },
        reason: {
            value: "",
            items: [
                { text: this.$t('contactReasonJob'), value: 'contactReasonJob'},
                { text: this.$t('contactReasonContract'), value: 'contactReasonContract'},
                { text: this.$t('contactReasonMentor'), value: 'contactReasonMentor'},
                { text: this.$t('contactReasonOther'), value: 'contactOther'}
            ],
            rules: [
                (v: any) => !!v || this.$t('contactReasonRuleRequired')
            ]
        },
        message: {
            value: "",
            rules: [
                (v: any) => !!v || this.$t('contactMessageRuleRequired'),
                (v: any) => (v && v.length >= 10) || this.$t('contactMessageRuleMin'),
            ]
        }
    }

    confirm() {
        if (!this.$refs.form.validate()) {
            return;
        }

        let contactObject: any = {
            name: this.form.name.value,
            email: this.form.email.value,
            reason: this.form.reason.value,
            message: this.form.reason.value
        };

        this.form.name.value = "";
        this.form.email.value = "";
        this.form.message.value = "";
        this.form.reason.value = "";

        this.$store.dispatch('contact/send', contactObject).then(() => {
            // show modal for notification
        })
    }
}
</script>

<style>
section#section-contacts {
    background: url('@/assets/backgrounds/intro.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

</style>