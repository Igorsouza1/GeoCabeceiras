import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    showModal: false,
  }),
  actions: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
});


export const useCheckboxStore = defineStore({
  id: 'checkbox',
  state: () => ({
    checkedShapes: {}
  }),
  actions: {
    setCheckboxState(nome, isChecked) {
      this.checkedShapes[nome] = isChecked
    },
    toggleCheckbox(nome) {
      this.checkedShapes[nome] = !this.checkedShapes[nome]
    },
    clearAll() {
      this.checkedShapes = {}
    }
  }
})