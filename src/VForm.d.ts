import Vue from 'vue'

export interface VFormMethods {
  validate(): boolean
  reset(): void
  resetValidation(): void
  readonly valid: boolean
}

export type VForm = Vue & VFormMethods