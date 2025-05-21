import Vue from 'vue'

type ModalInstance = Vue & {
  show: () => void
  hide: () => void
}

class ModalService {
  private modals: Record<string, ModalInstance> = {}

  register(id: string, modal: ModalInstance) {
    if (this.modals[id]) {
      console.warn(`[ModalService] Modal with id "${id}" already registered.`)
    }
    this.modals[id] = modal
  }

  unregister(id: string) {
    delete this.modals[id]
  }

  show(id: string) {
    const modal = this.modals[id]
    if (modal) {
      modal.show()
    } else {
      console.warn(`[ModalService] No modal registered with id "${id}"`)
    }
  }

  hide(id: string) {
    const modal = this.modals[id]
    if (modal) {
      modal.hide()
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $modals: ModalService
  }
}

const plugin = {
  install(vue: typeof Vue) {
    const service = new ModalService()
    vue.prototype.$modals = service
  }
}

export default plugin