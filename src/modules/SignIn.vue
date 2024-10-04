<template>
  <div @click="closeModal()" class="opacity-70 fixed cursor-pointer inset-0 bg-gray-800"></div>
  <div class="bg-yellow-50 inset-0 z-30  w-2/6 h-4/6 flex flex-col justify-between justify-center items-center rounded-xl gap-4">
    <div class="pt-12">
      <div class="pb-4 flex justify-center">
        <h1 class="text-5xl text-red-600 font-medium">Войти</h1>
      </div>
      <div class="flex flex-row justify-start gap-2 ">
        <h1 class="text-slate-300 text-2xl pt-1">Новый пользователь?</h1>
        <button @click="openModal" class="text-green-500 text-3xl text-center">Создайте учетную запись</button>
      </div>
    </div>
    <div class="w-3/4 pb-16">
      <form action="" class="flex flex-col justify-start items-start  gap-12">
        <input class="
          w-full text-2xl appearance-none border-b-2 py-2 px-3 placeholder:text-slate-400 placeholder:text-2xl    
          focus:outline-none focus:shadow-outline bg-transparent" 
          placeholder="Адрес электронной почты или номер телефона" type="text"
        >
        <input 
          class="
          w-full text-2xl appearance-none border-b-2 py-2 px-3 placeholder:text-black    
          placeholder:text-2xl placeholder:text-slate-400 focus:outline-none focus:shadow-outline bg-transparent" 
          placeholder="Пароль" type="text"
        >
      </form>
    </div>
    <div class="py-4 px-16 bg-red-500 rounded-md mb-20">
      <button  class="text-2xl text-white cursor-pointer">Продолжить</button>
    </div>
    <div v-if="signUpFlag" class="flex h-screen fixed inset-0 z-20 items-center justify-center">
      <SignUp
        @closeSignUpModal="handleEventClose"
        @lieVal="backLog"
      />
    </div>
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import SignUp from './SignUp.vue';
  

  const signUpFlag = ref(false);
  const emit = defineEmits('closeModal', 'openModal');

  function closeModal(val = false) {
    emit('closeModal', val);
  }

  function backLog(val) {
    signUpFlag.value = val
  }

  function openModal(val = true) {
    signUpFlag.value = val;
  }

  function handleEventClose (flag) {
    signUpFlag.value = flag;
    closeModal()
  }

  onMounted(() => {
    document.body.style.overflow = 'hidden';
  })

  onUnmounted(() => {
    document.body.style.overflow = 'scroll';
  })

</script>