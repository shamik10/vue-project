<template>
  <div class="w-5/6 m-auto relative pt-2">
    <div v-if="modalFlag" class="flex h-screen fixed inset-0 z-20 items-center justify-center">
      <SignIn
        @closeModal="closeModalVal"
      />
    </div>
    <HeaderComp @openModal="openModalVal"/>
    <router-view>
    </router-view>
  </div>
</template>


<script setup>
  import { ref } from 'vue';
  import HeaderComp from './modules/HeaderComp.vue';
  import SignIn from './modules/SignIn.vue';
  

  const modalFlag = ref(false);

  const openModalVal = (flag) => {
    modalFlag.value = flag
  }
  
  const closeModalVal = (flag) => {
    modalFlag.value = flag
  }


</script>



