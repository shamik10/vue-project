<script setup>
  import HeaderComp from './modules/HeaderComp.vue';
  import AssortimentsList from './modules/AssortimentsList.vue';
  import AllProduct from './components/AllProduct.vue';
  import { reactive, ref } from 'vue';
  
  
  const requestName = ref('')

  const dataSearch = reactive({})

  function eventHanding(data) {
    requestName.value = data
    console.log(data)
  }



</script>

<template>
  <div class=" w-5/6 m-auto mt-10">
    <HeaderComp @filters="(data) => dataSearch = data" @requestName="eventHanding" />
    <AllProduct />
    <AssortimentsList :dataSearch="dataSearch" :requestName="requestName" />
  </div>
</template>

