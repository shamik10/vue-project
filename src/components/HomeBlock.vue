<template>
  <div v-if="onMount" @click="() =>{ 
    isVisible = false;
    onMount = false;
    }" class="inset-0 fixed"></div>
  <div class="flex w-64 h-24 relative  bg-orange-300 rounded-xl items-center max-[1200px]:w-36  max-[1200px]:h-12">
    <router-link to="/">
      <div>
        <h1 class="text-2xl px-12 font-medium cursor-pointer text-white max-[1200px]:hidden ">ASM</h1>
      </div>
    </router-link>
      <div class="py-4 px-4 z-10  rounded-md bg-orange-300 absolute top-0 right-0 max-[550px]:py-3">
        <div @click="openClose" 
        class="flex items-center gap-2 text-white justify-center py-2 text-base max-[1200px]:text-xs text-center 
        cursor-pointer w-28 h-16 bg-orange-400 hover:bg-orange-500 rounded-md px-4  max-[1200px]:h-10 max-[550px]:h-8 ">Каталог
            <img :class="isVisible ? 'rotate-180' : 'rotate-0' " src="../assets/images/check_mark.svg" alt="">
        </div>
        <div class="w-10">
          <CatalogList @closeCatalog="closeCatalog"  v-if="isVisible" />
        </div>
      </div>
  </div>
</template>

<script setup>
  import CatalogList from '@/modules/CatalogList.vue';
  import { onMounted, onUnmounted, ref, watch } from 'vue';

  let isVisible = ref(false);
  const onMount = ref(false);

  const closeCatalog = (flag) => { 
    isVisible.value = flag;
  }
  
  function openClose() {
    if (!isVisible.value) isVisible.value = true;
    else isVisible.value = false;
  }
  const emit = defineEmits(['requestName']);


  // function sendEvent(data) {
  //     emit('requestName', data)
  //   }

  // function eventHanding(data) {
  //   sendEvent(data)
  //   console.log(data)
  // }

  watch(() => isVisible.value, () => { 
    if (isVisible.value) {
      onMount.value = true;  
    }
  })
  // onMounted(() => onMount.value = true);

  // onUnmounted( () => onMount.value = false);

</script>

<style>

</style>