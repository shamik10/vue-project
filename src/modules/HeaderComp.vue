<template >
  <div class=" border-b-2 pb-4">
    <div class=" flex justify-between ">
      <HomeBlock  />
      <div class="relative ">
        <input @input="onChangeSearchInput" placeholder="поиск по сайту..." type="text" class=" bg-slate-150 border rounded-md py-9 pl-12 pr-48 outline-none placeholder:text-slate-400
        placeholder:text-xl placeholder:self-start  hover:shadow-md hover:border-gray-400" >
        <img class="absolute w-10 top-7 left-[370px] " src="@/assets/images/search.svg" alt="">
      </div>
      <router-link to="/favorites">
        <div class="flex flex-col pt-4 cursor-pointer">
          <img class="flex self-center pt-2  w-10" src="/favorites.svg" alt="">
          <span class="text-center pt-2 text-2xl">Избранное</span>
        </div>
      </router-link>
      <router-link to="/cart">
        <div class="flex flex-col pt-4 cursor-pointer">
          <img class="flex self-center  w-12" src="@/assets/images/basket.svg" alt="">
          <span class="text-center pt-2 text-2xl">Корзина</span>
        </div>
      </router-link>
      <div @click="openModal" class="flex flex-col pt-4 cursor-pointer">
        <img class="flex self-center  w-12" :src= "userLogined ? './src/assets/images/profile.svg' : './src/assets/images/userAdd.svg' " alt="">
        <div class="text-center pt-2 text-2xl">{{`${userLogined  ? login : 'войти'}`  }}</div>
      </div>
      <div v-if="modalFlag" class="flex h-screen fixed inset-0 z-20 items-center justify-center">
      <SignIn
        @closeModal="closeModalVal"
      />
    </div>
    </div>
  </div>
</template>

<script setup>
  import HomeBlock from "@/components/HomeBlock.vue";
  import SignIn from "./SignIn.vue";
  import { computed, onMounted, reactive, ref, watch, watchEffect, watchSyncEffect } from "vue";
  import debounce from 'lodash.debounce';
  import { useStore } from "vuex";
  import axios from "axios";
  import { getAuth } from "firebase/auth";

  const store = useStore();
  const modalFlag = ref(false);
  const login = ref('');
  const users = ref([]);
  const userLogined = computed(() => store.state.logInFlag);

  function searchVal (val) {
    store.commit('changeSearch', val);
  }


  const getUsers = async () => {
    const {data} = await axios.get('https://6d8dc8fcd4ab0089.mokky.dev/users');
    const token = store.state.currentUser.accessToken;
    console.log(data);
    users.value = data;
    for(const elem of users.value) {
      if(token === elem.accessToken) {
        login.value = elem.login;
        console.log(elem);
        assigData(elem);
        // console.log(datat.login)
        
      }
    }
    // console.log(users.value[0]?.email);
  }

  function assigData (val) {
    store.commit('adoptData', val);
  }
  const datat = computed(() => store.state.adoptData);


  const closeModalVal = (flag) => {
    modalFlag.value = flag;
  }

  const emit = defineEmits(['openModal']);

  function openModal(val = true) {
    modalFlag.value = val;
    emit('openModal', val);
  }

  const onChangeSearchInput = debounce((event) => {
    searchVal(event.target.value);
  }, 1000)

  const auth = getAuth();

  watch( userLogined, () => getUsers())


</script>

<style scoped>

  .text {
    font-weight: bold;
  }


</style>