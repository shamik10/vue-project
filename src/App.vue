<script setup>
  import HeaderComp from './modules/HeaderComp.vue';
  import AssortimentsList from './modules/AssortimentsList.vue';
  import cartItem from './components/cartItem.vue';
  import { computed, onMounted, reactive, ref } from 'vue';
  import FavoritesCard from '@/pages/FavoritesCard.vue';
  import { useStore } from 'vuex';


  // const requestName = ref('')

  // const dataSearch = reactive({})

  // function eventHanding(data) {
  //   requestName.value = data
  //   console.log(data)
  // }



</script>

<template>
  <div class=" w-5/6  m-auto relative pt-1">
    <!-- <div class="flex h-96 ">

    </div> -->
    <div class=" absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <cartItem />

    </div>
    <HeaderComp />
    <AssortimentsList />
    <!-- <router-view>
    </router-view> -->
  </div>
</template>

