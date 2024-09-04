<template>
  <div class="flex w-3/12 h-24 relative cursor-pointer bg-orange-300 rounded-xl items-center">
    <router-link to="/">
      <h1 class="text-4xl px-16 font-medium text-white">ASM</h1>
    </router-link>
      <div class="py-4 px-4 z-10  rounded-md bg-orange-300 absolute top-0 right-0 ">
        <div @click="() => {
              if (!isVisible) isVisible = true;
              else isVisible = false;
              if (!isRotating) isRotating = true;
              else isRotating  = false;
            }" class="flex items-center gap-2 text-white justify-center py-2 text-xl text-center cursor-pointer w-48 h-16 bg-orange-400 hover:bg-orange-500 rounded-md px-10">Каталог
            <img :class="isRotating ? 'rotate-180' : 'rotate-0' " src="../assets/images/check_mark.svg" alt="">
        </div>
        <CatalogList  v-if="isVisible" />
      </div>
  </div>
</template>

<script setup>
  import CatalogList from '@/modules/CatalogList.vue';
  import { ref } from 'vue';

  let isVisible = ref(false);
  let isRotating = ref(false);

  const emit = defineEmits(['requestName'])

  // function sendEvent(data) {
  //     emit('requestName', data)
  //   }

  // function eventHanding(data) {
  //   sendEvent(data)
  //   console.log(data)
  // }

</script>

<style>

</style>