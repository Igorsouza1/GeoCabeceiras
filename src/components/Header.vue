<template>
  <div class="h-screen flex">
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
      <button v-for="option in sidebarOptions[activeSidebar]" :key="option" class="mb-2 p-2 w-full text-left">
        {{ option }}
      </button>
      <br><br>
      <button class="group relative h-12 w-24 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white">
        <i class="material-icons">add</i>
        <div class="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
      </button>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeSidebar: null,
      sidebarOptions: {
        Shapes: ['Shapes', 'Home Option 2', 'Home Option 3'],
        Pontos: ['Pontos', 'Search Option 2', 'Search Option 3'],
        Links: ['Links', 'Settings Option 2', 'Settings Option 3'],
      },
    };
  },
  methods: {
    openSidebar(name) {
      this.activeSidebar = this.activeSidebar === name ? null : name;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
