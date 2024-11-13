<template>
  <div class="w-5/6 m-auto relative pt-2 max-[750px]:w-11/12 max-[500px]:w-full">
    
    <HeaderComp @openModal="openModalVal"/>
    <router-view>
    </router-view>
    <!-- v-if="widthFlag" -->
    <!-- <div class="opacity-70 fixed cursor-pointer inset-0 bg-gray-800"></div> -->
    
  </div>
</template>


<script setup>
  import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';
  import HeaderComp from './modules/HeaderComp.vue';
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useStore } from 'vuex';
  
  const store = useStore();
  const modalFlag = ref(false);
  const pxVal = ref(0);
  pxVal.value = window.innerWidth;


  const openModalVal = (flag) => {
    modalFlag.value = flag;
  }
  
  watchEffect(() => pxVal.value, () => console.log(pxVal.value))

  onMounted(() => { 

    if (getAuth().currentUser !== null) {
      store.commit('changeLogInFlag');
    }
  }
  )
</script>



