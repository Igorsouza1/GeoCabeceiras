<template>
  <AlertComponent v-if="showError" @close="showError = false" :errorMessage="errorMessage"></AlertComponent>
  <div class="flex flex-col md:flex-row bg-gray-300 w-screen min-h-screen">
    <div class="hidden md:flex md:w-1/2 justify-center items-center relative min-h-screen">
      <img src="../assets/loginimg.jpg" alt="Imagem da Serra do Amolar" class="absolute w-full h-full object-cover">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="absolute flex justify-center items-center w-full h-full">
        <img src="../assets/cabeceirasloo.svg" alt="Seu Logo" class="w-60 h-32 xl:w-2/4">
      </div>
    </div>
    <div class="w-full flex justify-center items-center min-h-screen">
      <form @submit.prevent="handleLogin" class="w-64 md:w-96 bg-gray-200 shadow-xl p-6 md:p-10 rounded-lg xl:w-2/4">
        <h1 class="mb-4 text-sm font-semibold md:text-md xl:text-lg">Login</h1>
        <div class="mb-4">
          <label for="email" class="block text-xs text-gray-600 md:text-sm xl:text-base">E-mail</label>
          <input type="email" id="email" v-model="email" class="w-full p-1 border border-gray-300 rounded mt-1 text-sm md:p-2" required>
        </div>
        
        <div class="mb-4">
          <label for="password" class="block text-xs text-gray-600 md:text-sm xl:text-base">Senha</label>
          <input type="password" id="password" v-model="password" class="w-full p-1 border border-gray-300 rounded mt-1 text-sm md:p-2" required>
        </div>
        <button type="submit" class="w-full py-1.5 bg-green-500 text-xs text-white rounded hover:bg-green-600 md:p-2 md:text-sm xl:text-base xl:mt-2" :disabled="loading">
          <span v-if="loading">Loading...</span>
          <span v-else>Login</span>
        </button>
      </form>
    </div>
  </div>
  
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import AlertComponent from './Alert.vue'
import { useRouter } from 'vue-router';

const email = ref('')
const password = ref('')
const loading = ref(false)
const showError = ref(false)
const errorMessage = ref('')
const router = useRouter();

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    router.push('/home');
  } catch (error) {
    errorMessage.value = 'E-mail ou senha inválido'; // ou outra mensagem de erro
    showError.value = true;
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
/* Seu CSS aqui */
</style>
