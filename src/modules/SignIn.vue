<template>
  <div @click="closeModal()" class="opacity-70 fixed cursor-pointer inset-0 bg-gray-800"></div>
  <div class="bg-yellow-50 inset-0 z-30  w-2/6 h-4/6 flex flex-col justify-between  items-center rounded-xl gap-4">
    <div class="pt-8 pb-8">
      <div class="pb-2 flex justify-center">
        <h1 class="text-3xl text-red-600 font-medium">Войти</h1>
      </div>
      <div class="flex flex-row justify-start gap-2 ">
        <h1 class="text-slate-300 text-xl pt-1">Новый пользователь?</h1>
        <button @click="openModal" class="text-green-500 text-xl text-center">Создайте учетную запись</button>
      </div>
    </div>
    <div class="w-3/4 pb-20">
      <form action="" class="flex flex-col justify-start">
        <div class="flex flex-col justify-start gap-10">
          <input
          v-model="dataUser.email"
          class="
            w-full text-base appearance-none border-b-2 py-2 px-3 placeholder:text-slate-400 placeholder:text-base   
            focus:outline-none focus:shadow-outline bg-transparent"
            placeholder="Адрес электронной почты или номер телефона" type="text"
          >
          <input
          v-model="dataUser.password"
          class="
            w-full text-base appearance-none border-b-2 py-2 px-3   
            placeholder:text-base placeholder:text-slate-400 focus:outline-none focus:shadow-outline bg-transparent"
            placeholder="Пароль" type="text"
          >
        </div>
        <span class="h-4  text-red-400 text-sm" v-if="incorrectFlag" >*неправильный пароль или почтовый адрес</span>
      </form>
    </div>
    <div class="mb-20 ">
      <div @click="checkReg" class="py-4 px-10 bg-red-500 rounded-md cursor-pointer">
        <button  class="text-xl text-white ">Продолжить</button>
      </div>
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
  import { onMounted, onUnmounted, ref, reactive } from 'vue';
  import SignUp from './SignUp.vue';
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
  import { useStore } from "vuex";


  const store = useStore();

  const dataUser = reactive({
    email: '',
    password: ''
  });

  
  const incorrectFlag = ref(false);

  const signUpFlag = ref(false);
  const emit = defineEmits(['closeModal', 'openModal']);
  
  function changeFlag() {
    store.commit('changeLogInFlag');
  }

  function closeModal(val = false) {
    emit('closeModal', val);
  }

  function backLog(val) {
    signUpFlag.value = val;
  }

  function openModal(val = true) {
    signUpFlag.value = val;
  }

  function handleEventClose (flag) {
    signUpFlag.value = flag;
    closeModal();
  }

  const auth = getAuth();
  const checkReg = () => {
    signInWithEmailAndPassword(auth, dataUser.email, dataUser.password)
      .then((userCredential) => {
        onUserState();
        changeFlag();
        const user = userCredential.user;
        incorrectFlag.value = false;
        dataUser.email = '';
        dataUser.password = '';
        localStorage.setItem('isLogin', true);
        closeModal();
      })
      .catch((error) => {
        console.log(error, 'неправильно');
        incorrectFlag.value = true;
      });
  }
  
const onUserState = () => {
  onAuthStateChanged(auth, (user) => {
  if (user) {
    const accessToken = user.uid;
    store.commit('setToken', accessToken);
    localStorage.setItem('accesToken', accessToken);
    console.log(accessToken);
    // ...
  } else {
    // User is signed out
    // ...
    console.log('her');
  }
});
}

  onMounted(() => {
    document.body.style.overflow = 'hidden';
    // console.log(getAuth().currentUser)
  })

  onUnmounted(() => {
    document.body.style.overflow = 'scroll';
  })

</script>