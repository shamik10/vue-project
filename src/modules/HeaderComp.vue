<template >
  <div class=" border-b-2 pb-4">
    <div class=" flex justify-between ">
      <HomeBlock  />
      <div class="relative ">
        <input @input="onChangeSearchInput" placeholder="поиск по сайту..." type="text" 
        class=" bg-slate-150 border rounded-md py-9 pl-12 pr-48 outline-none placeholder:text-slate-400
        placeholder:text-xl placeholder:self-start  hover:shadow-md hover:border-gray-400 max-[1100px]:w-64 max-[1100px]:placeholder:text-sm max-[1100px]:pr-0 max-[1200px]:py-6 max-[550px]:py-4 max-[550px]:w-40 max-[550px]:pl-2">
        <img class="absolute w-10 top-7 left-[370px] max-[1100px]:left-48 max-[1200px]:w-6 max-[550px]:top-4 max-[550px]:left-32 " src="@/assets/images/search.svg" alt="">
      </div>
      <img @click="openCloseBurger()" v-if="widthFlag" class="h-20 cursor-pointer max-[550px]:h-16" src="../assets/images/buger-menu.svg" alt="">
      <div v-if="!widthFlag" class="flex gap-4">
        <router-link to="/favorites">
          <div class="flex flex-col pt-4 cursor-pointer">
            <img class="flex self-center pt-2 max-[1180px]:w-6 w-10" src="/favorites.svg" alt="">
            <span class="text-center pt-2 text-2xl max-[1180px]:text-sm">Избранное</span>
          </div>
        </router-link>
        <router-link to="/cart">
          <div class="flex flex-col pt-4 cursor-pointer">
            <img class="flex self-center max-[1180px]:w-8 w-12" src="@/assets/images/basket.svg" alt="">
            <span class="text-center pt-2 text-2xl max-[1180px]:text-sm">Корзина</span>
          </div>
        </router-link>
        <div 
        @mouseover="() => {
            if(userLogined) {
              logOutFlag = true;
            }

          }"
          @mouseleave="logOutFlag = false"
          class="flex flex-col pt-4 cursor-pointer relative">
          <img @click="logOutUser()" v-if="logOutFlag" class="absolute w-8 h-6 left-10 top-1" src="../assets/images/closeProfil.svg" alt="">
          <img @click="openModal()" class="flex self-center max-[1180px]:w-8 w-12" :src= "userLogined ? './profile.svg' : './userAdd.svg'"  alt="">
          <div class="text-center pt-2 text-2xl max-[1180px]:text-sm">
            {{ `${userLogined  ? login : 'Войти'}`  }}
          </div>
        </div>
      </div>
      <div v-if="modalFlag" class="flex h-screen fixed inset-0 z-20 items-center justify-center">
      <SignIn
        @closeModal="closeModalVal"
      />
      </div>
    </div>
  </div>
  <div v-if="burgerFlag">
    <div @click="openCloseBurger" class="opacity-70 z-20 fixed cursor-pointer inset-0 bg-gray-800"></div>
      <div class="bg-orange-300 w-2/6 rounded-md h-screen z-40 flex flex-col justify-self-end justify-center items-center inset-0 gap-4 fixed">
        <div   @click="() => {
          openCloseBurger();
          setTimeout(openCloseBurger, 10);
          }" 
          @mouseover="() => {
            if(userLogined.value) {
              logOutFlag = true;
            }

          }"
          @mouseleave="
          if(userLogined.value) {
              logOutFlag = false;
            }
          " 
          class="flex flex-col pt-4  pr-4 cursor-pointer">
          <img v-if="logOutFlag" class="absolute w-8 h-6 left-[100px] top-[246px]" src="../assets/images/closeProfil.svg" alt="">
          <img @click=" openModal() " class="flex self-center max-[1180px]:w-8 w-12" :src= "userLogined ? './profile.svg' : './userAdd.svg' " alt="">
          <div class="text-center pt-2 text-2xl max-[1180px]:text-sm">
            {{ `${userLogined  ? login : 'Войти'}` }}
          </div>
        </div>
        <router-link @click="openCloseBurger()" to="/favorites">
          <div class="flex flex-col  pr-4 cursor-pointer">
            <img class="flex self-center pt-2 max-[1180px]:w-6 w-10" src="/favorites.svg" alt="">
            <span class="text-center pt-2 text-2xl max-[1180px]:text-sm">Избранное</span>
          </div>
        </router-link>
        <router-link @click="openCloseBurger()" to="/cart">
          <div class="flex flex-col pt-4 cursor-pointer pr-3">
            <img class="flex self-center max-[1180px]:w-8 w-12" src="@/assets/images/basket.svg" alt="">
            <span class="text-center pt-2 text-2xl max-[1180px]:text-sm">Корзина</span>
          </div>
        </router-link>
      </div>
  </div>
</template>

<script setup>
  import HomeBlock from "@/components/HomeBlock.vue";
  import SignIn from "./SignIn.vue";
  import { computed, onMounted, reactive, ref, watch, watchEffect } from "vue";
  import debounce from 'lodash.debounce';
  import { useStore } from "vuex";
  import axios from "axios";
  import { getAuth, signOut } from "firebase/auth";

  const store = useStore();
  const modalFlag = ref(false);
  const widthFlag = ref(false);
  const burgerFlag = ref(false);
  const logOutFlag = ref(false);
  const login = ref('');
  const users = ref([]);
  const userLogined = computed(() => store.state.logInFlag);
  const widthApp = computed(() => window.innerWidth);

  function searchVal (val) {
    store.commit('changeSearch', val);
  }

  const getUsers = async () => {
    const {data} = await axios.get('https://6d8dc8fcd4ab0089.mokky.dev/users');
    const token = store.state.currentUser.accessToken;
    users.value = data;
    for(const elem of users.value) {
      if(token === elem.accessToken) {
        login.value = elem.login;
      }
    }
    // console.log(users.value[0]?.email);
  }
  

  const auth = getAuth();
  function logOutUser () {
    
    signOut(auth).then(() => {
      console.log('asdfa')
      store.commit('changeLogInFlag');
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

  }

  const closeModalVal = (flag) => {
    modalFlag.value = flag;
  }

  const emit = defineEmits(['openModal']);

  function openModal(val = true) {
    if(userLogined.value === true) {
    }
    else {
      modalFlag.value = val;
      emit('openModal', val);

    }
  }

  const onChangeSearchInput = debounce((event) => {
    searchVal(event.target.value);
  }, 1000)


  const openCloseBurger = () => {
    if(burgerFlag.value === false) {
      burgerFlag.value = true;
    }
    else {
      burgerFlag.value = false;
    }
  }

  const showBurger = () => {
    if(widthApp.value <= 750) {
      return widthFlag.value = true;
    }
  }

  watchEffect(() => widthApp.value, showBurger())

  watch(userLogined, () => getUsers());

</script>

<style scoped>

  .text {
    font-weight: bold;
  }


</style>