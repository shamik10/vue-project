<template>
  <div @click="UpModal()" class="opacity-0 fixed cursor-pointer inset-0 bg-gray-800"></div>
  <div class="bg-yellow-50 inset-0 z-30  w-2/6 h-4/6 flex flex-col justify-around  items-center rounded-xl gap-4 max-[950px]:w-3/6 max-[650px]:w-4/6 max-[500px]:w-5/6">
    <div class="pt-8">
      <div class=" flex justify-center">
        <h1 class="text-3xl text-green-500 font-medium max-[950px]:text-xl">Создать учетную запись</h1>
      </div>
      <div class="flex flex-row justify-start gap-2 pb-2 ">
        <h1 class="text-slate-300 text-lg pt-1 max-[950px]:text-base">У вас уже есть учетная запись?</h1>
        <button @click="() => emit('lieVall', lieVal)" class="text-red-500 text-xl text-center max-[950px]:text-base">Войти</button>
      </div>
    </div>
    <div class="w-3/4 pb-6">
      <form action="" >
        <div class="flex flex-col justify-start items-start gap-4 ">
          <div class="w-full">
            <input
            v-model="userData.login"
            class="
            w-full text-xl appearance-none border-b-2 py-2 px-3 placeholder:text-slate-400 placeholder:text-base
            focus:outline-none focus:shadow-outline bg-transparent max-[950px]:placeholder:text-sm"
            placeholder="Никнейм пользователя" type="text"
          >
          </div>
          <div class="w-full">
              <input
                id="inputSignUp"
                v-model="userData.email"
                class="
                w-full text-xl appearance-none border-b-2 py-2 px-3 placeholder:text-slate-400 placeholder:text-base
                focus:outline-none focus:shadow-outline bg-transparent max-[950px]:placeholder:text-sm"
                placeholder="Адрес электронной почты" type="text"
            >
          </div>
          <div class="w-full">
            <input
              id="inputSignUp"
              v-model="userData.password"
                class="
                w-full text-base appearance-none border-b-2 py-2 px-3
                placeholder:text-base placeholder:text-slate-400 focus:outline-none focus:shadow-outline bg-transparent max-[950px]:placeholder:text-sm"
                placeholder="Пароль" type="text"
            >
          </div>
          <div class="w-full">
            <input
              id="inputSignUp"
              v-model="userData.tel"
                class="
                w-full text-base appearance-none border-b-2 py-2 px-3
                placeholder:text-base placeholder:text-slate-400 focus:outline-none focus:shadow-outline bg-transparent max-[950px]:placeholder:text-sm"
                value="+7 "
                :placeholder="`+${userData.tel} (_ _ _) _ _ _-_ _-_ _`"  pattern="^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$" type="tel"
            >
          </div>
        </div>
        <span class="h-4 text-red-400 text-sm" v-if="incorrectFlag" >*неправильный пароль или почтовый адрес</span>
      </form>
    </div>
    <div class="">
      <button @click="register"  class=" py-4 px-10 bg-green-500 rounded-md mb-20 text-xl text-white cursor-pointer max-[950px]:text-sm">Продолжить</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import Swal from 'sweetalert2';

  function showAlert() {
      Swal.fire({
        title: 'Привет!',
        text: 'Это всплывающее окно SweetAlert2.',
        icon: 'success'
      });
    }
    
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });


  // const register = () => {
  //   createUserWithEmailAndPassword(getAuth(), userData.email, userData.password)
  //   .then((data) => {
  const register = async () => {
    await createUserWithEmailAndPassword(getAuth(), userData.email, userData.password)
    .then((data) => {
      console.log(data, 'регистрация прошла успешно');
      UpModal();
      localStorage.setItem('accesToken', data.user.accessToken);
      localStorage.setItem('isLogin', false);
      userData.accessToken = data.user.uid;
      Toast.fire({
        icon: "success",
        title: "Регистрация прошла успешно"
      });
      const usersData = axios.post(`https://6d8dc8fcd4ab0089.mokky.dev/users`, userData);
      // const usersData =  axios.post(`https://6d8dc8fcd4ab0089.mokky.dev/users`, userData);
      userData.email = '';
      userData.password = '';
      userData.login = '';
      userData.tel = '';

    })
    .catch((e) => {
      console.log(e);
      incorrectFlag.value = true;
    })
  }
  const emit = defineEmits(['closeSignUpModal', 'lieVall']);
  const incorrectFlag = ref(false);
  let lieVal = false;
  const userData = reactive({
    login: '',
    email: '',
    password: '',
    tel: '+7'

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


  // watch(() => userData.email, () =>  emailValidate(userData.email));
  // watch(() => userData.password, () => {
  // passwordValidate(userData.password)});

  


</script>