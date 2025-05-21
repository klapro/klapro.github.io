<template>
    <div
      class="modal fade"
      :class="{ show: visible }"
      tabindex="-1"
      role="dialog"
      :style="{ display: visible ? 'block' : 'none' }"
      @click.self="onCancel"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="title">
              <h5 class="modal-title">Default Title</h5>
            </slot>
            <button type="button" class="close" @click="onCancel">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot>
              Default Content
            </slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="onCancel">Cancel</button>
            <button type="button" class="btn btn-primary" @click="onConfirm">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
  
@Component
export default class Modal extends Vue {
    @Prop({default: ""}) id!: string;

    visible: boolean = false

    show() {
        this.visible = true
    }

    mounted() {
        if (this.id) {
            this.$modals.register(this.id, this)
        }
    }

    destroyed() {
        if (this.id) {
            this.$modals.unregister(this.id)
        }
    }

    hide() {
        this.visible = false
    }

    onConfirm() {
        this.$emit('confirm')
        this.hide()
    }

    onCancel() {
        this.$emit('cancel')
        this.hide()
    }

}
</script>
  
<style scoped>
    .modal {
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>