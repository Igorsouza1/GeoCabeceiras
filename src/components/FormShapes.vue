<template>
    <div class="flex items-center justify-center ">
      <div class="mx-auto w-full max-w-[750px] bg-gray-800 rounded-xl animate-fade-up animate-duration-300">
        <button @click="closeModal" class="absolute top-2 right-2 text-white">
        X
      </button>
        <form class="py-6 px-9" @submit.prevent="sendFile">
          <div class="mb-5">
            <label for="nome" class="mb-3 block text-base font-medium text-white">
              Nome:
            </label>
            <input
              v-model="nome"
              type="text"
              name="nome"
              id="nome"
              placeholder="Municio_Bodoquena"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
  
          <div class="mb-6 pt-4">
            <label class="mb-5 block text-xl font-semibold text-white">
              Uploud GeoJson
            </label>
            <input type="file" name="file" id="file" class="sr-only" @change="handleFileUpload" />
            <label
              for="file"
              class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
            >
              <div>
                <span class="mb-2 block text-xl font-semibold text-white">
                  Drop files here
                </span>
                <span class="mb-2 block text-base font-medium text-[#6B7280]">
                  Or
                </span>
                <span class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-white">
                  Browse
                </span>
              </div>
            </label>
          </div>
          <div v-if="isFileUploaded" class="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
            <div class="flex items-center justify-between">
              <span class="truncate pr-3 text-base font-medium text-black">
                {{ file.name }}
              </span>
              <button @click="removeFile" class="text-red-700 text-bold">
                X
              </button>
            </div>
        </div>
  
          <div>
            <button
              type="submit"
              class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Enviar arquivo
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useModalStore } from '../store.js';
  import db from '../db.js';

  // Estado do componente
  const nome = ref('');
  const file = ref(null);
  const isFileUploaded = ref(false);

  // Store do modal
  const modalStore = useModalStore();

  // Manipular upload de arquivo
  const handleFileUpload = async (event) => {
  if (event.target.files && event.target.files[0]) {
    file.value = event.target.files[0];
    isFileUploaded.value = true;
  }
};

  // Remover arquivo
  const removeFile = () => {
    file.value = null;
    isFileUploaded.value = false;
  };

  // Fechar modal
  const closeModal = () => {
    modalStore.closeModal();
  };

  // Enviar arquivo
  const sendFile = () => {
    const reader = new FileReader();
    reader.readAsText(file.value);
    reader.onload = async () => {
    const jsonContent = JSON.parse(reader.result);
    await db.files.add({
      nome: nome.value,
      jsonContent
    });
    alert('Arquivo e nome salvos com sucesso!');
    closeModal()
  };
};
</script>

  
  <style scoped>
  /* Seus estilos aqui */
  </style>
  