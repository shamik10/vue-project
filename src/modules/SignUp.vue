<template>
  <div @click="UpModal()" class="opacity-0 fixed cursor-pointer inset-0 bg-gray-800"></div>
  <div class="bg-yellow-50 inset-0 z-30  w-2/6 h-4/6 flex flex-col justify-around justify-center items-center rounded-xl gap-4">
    <div class="pt-12">
      <div class="pb-4 flex justify-center">
        <h1 class="text-5xl text-green-500 font-medium">Создать учетную запись</h1>
      </div>
      <div class="flex flex-row justify-start gap-2 pb-6 pt-4">
        <h1 class="text-slate-300 text-2xl pt-1">У вас уже есть учетная запись?</h1>
        <button @click="() => emit('lieVal', false)" class="text-red-500 text-3xl text-center">Войти</button>
      </div>
    </div>
    <div class="w-3/4 pb-16">
      <form action="" class="flex flex-col justify-start items-start gap-12 ">
        <div class="w-full">
          <input 
          v-model="userData.login"
          class="
          w-full text-2xl appearance-none border-b-2 py-2 px-3 placeholder:text-slate-400 placeholder:text-2xl    
          focus:outline-none focus:shadow-outline bg-transparent" 
          placeholder="Никнейм пользователя" type="text"
        >

        </div>
      <div class="w-full">
        <input 
          v-model="userData.email"
          class="
          w-full text-2xl appearance-none border-b-2 py-2 px-3 placeholder:text-slate-400 placeholder:text-2xl    
          focus:outline-none focus:shadow-outline bg-transparent" 
          placeholder="Адрес электронной почты" type="text"
        >
      </div>
      <div class="w-full">
        <input 
        v-model="userData.password"
          class="
          w-full text-2xl appearance-none border-b-2 py-2 px-3 placeholder:text-black    
          placeholder:text-2xl placeholder:text-slate-400 focus:outline-none focus:shadow-outline bg-transparent" 
          placeholder="Пароль" type="text"
        >
      </div>
      <div class="w-full">
        <input 
          class="
          w-full text-2xl appearance-none border-b-2 py-2 px-3 placeholder:text-black    
          placeholder:text-2xl placeholder:text-slate-400 focus:outline-none focus:shadow-outline bg-transparent" 
          value="+7 "
          :placeholder="`+${userData.tel} (_ _ _) _ _ _-_ _-_ _`"  pattern="^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$" type="tel"
        >
      </div>
      </form>
    </div>
    <div class="">
      <button  class=" py-4 px-16 bg-green-500 rounded-md mb-20 text-2xl text-white cursor-pointer">Продолжить</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

  const emit = defineEmits('closeSignUpModal', 'lieVal');
  const lieVal = false;
  const userData = reactive({
    login: '',
    email: '',
    password: '',
    tel: +7

  })

  const emailValidate = (email) => {
    const indexAtMail = email.indexOf('@');
    const mail = email.slice(indexAtMail, email.length - 1);
    console.log(mail);
  }

  const passwordValidate = (password) => {
    if (password.length < 8) {
      console.log('пароль должен содержать 8 символов');
    }
    
  }

  const UpModal = (flag = true) => {
    emit('closeSignUpModal', !flag);
  }

  

  watch(() => userData.email, () =>  emailValidate(userData.email));
  watch(() => userData.password, () => { console.log('bigDick') 
  passwordValidate(userData.password)});


</script>