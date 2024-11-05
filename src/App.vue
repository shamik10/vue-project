<template>
  <div class="w-5/6 m-auto relative pt-2">
    
    <HeaderComp @openModal="openModalVal"/>
    <router-view>
    </router-view>
  </div>
</template>


<script setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue';
  import HeaderComp from './modules/HeaderComp.vue';
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useStore } from 'vuex';
  
  const store = useStore();
  const modalFlag = ref(false);

  const openModalVal = (flag) => {
    modalFlag.value = flag;
  }

  onMounted(() => { 
    if (getAuth().currentUser !== null) {
      store.commit('changeLogInFlag');
    }
  }
  )
</script>



