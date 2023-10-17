<template>
  <div class="h-screen flex absolute z-10">
    <aside class="bg-gray-900 animate-fade-right text-white w-16 flex flex-col items-center justify-start p-4 ">
      <img src="../assets/LogoImg.png" alt="Logo" class="w-12 mb-8"/>
      <button @click="openSidebar('Shapes')" class="mb-4 p-2 w-full flex justify-center items-center">
        <i class="material-icons">dashboard</i>
      </button>
      <button @click="openSidebar('Pontos')" class="mb-4 p-2 w-full flex justify-center items-center">
        <i class="material-icons">radio_button_checked</i>
      </button>
      <button @click="openSidebar('Links')" class="mb-4 p-2 w-full flex justify-center items-center">
        <i class="material-icons">link</i>
      </button>
    </aside>
    <aside  v-if="activeSidebar" 
      :class="[
        'bg-gray-800', 
        'text-white', 
        'w-64', 
        'flex', 
        'flex-col', 
        'items-start', 
        'justify-start', 
        'p-4',
        'animate-duration-[300ms]',
        activeSidebar ? 'animate-fade-right' : 'animate-fade'
        
      ]">
      <p class="text-xl mb-4">{{ activeSidebar }}</p>
      <div v-for="option in sidebarOptions[activeSidebar]" :key="option" class="mb-2 p-2 w-full text-left flex items-center">
        <input type="checkbox" :id="option" class="mr-2" :checked="checkedShapes[option]" @change="toggleCheckbox(option)">
        <label :for="option">{{ option }}</label>
      </div>
      <br><br>
      <button 
          @click="openModal"
          class="bg-green-500 text-white active:bg-green-600 hover:bg-green-800 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
          type="button"
        >
        <i class="material-icons">add</i>
      </button>
    </aside>
  </div>
</template>

<script>
import { useModalStore } from '../store.js';
import { useCheckboxStore } from '../store.js';
import db from '../db.js';

export default {
  data() {
    return {
      activeSidebar: null,
      sidebarOptions: {
        Shapes: [],
        Pontos: [],
        Links: [],
      },
    };
  },
  methods: {
    openSidebar(name) {
      this.activeSidebar = this.activeSidebar === name ? null : name;
    },
    async loadShapesFromDB() {
      const shapes = await db.files.toArray();  // Use Dexie para recuperar todos os shapes
      this.sidebarOptions.Shapes = shapes.map(shape => shape.nome);  // Atualize o estado com os nomes
    },
  },
  mounted() {
    this.loadShapesFromDB();  // Carregue os shapes quando o componente for montado
  },
  setup() {
    const modalStore = useModalStore();

    const openModal = () => {
      modalStore.openModal();
    };

    const checkboxStore = useCheckboxStore()

    // Para definir o estado de um checkbox
    const setCheckboxState = (nome, isChecked) => {
      checkboxStore.setCheckboxState(nome, isChecked)
    }

    // Para alternar o estado de um checkbox
    const toggleCheckbox = (nome) => {
      checkboxStore.toggleCheckbox(nome)
    }

    // Para limpar todos os estados dos checkboxes
    const clearAllCheckboxes = () => {
      checkboxStore.clearAll()
    }

    return { modalStore, openModal, setCheckboxState,
      toggleCheckbox,
      clearAllCheckboxes,
      checkedShapes: checkboxStore.checkedShapes };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
