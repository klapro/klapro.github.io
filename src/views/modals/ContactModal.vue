<template>
    <Modal ref="modal">
        <v-card>
            <v-toolbar
              color="primary"
              dark
            >{{$t('contactMessageSentTitle')}}</v-toolbar>
            <v-card-text>
              <div class="text-h4 pa-12">
                <div class="d-flex justify-content-center text-center">
                  {{$t('contactMessageSentText')}}
                </div>
                <div class="d-flex justify-content-center mt-3">
                  <font-awesome-icon icon="fa-solid fa-envelope" />
                </div>
                
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="$refs.modal.hide()"
              >{{$t('closeBtn')}}</v-btn>
            </v-card-actions>
          </v-card>
    </Modal>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import RootView from "../RootView";
import Modal from "@/components/Modal.vue";

@Component({
    components: {
        Modal
    }
})
export default class ContactModal extends RootView {
    $refs!: {
        modal: Modal
    }
}
</script>