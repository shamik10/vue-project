<script setup>
  import HeaderComp from './modules/HeaderComp.vue';
  import AssortimentsList from './modules/AssortimentsList.vue';
  import { computed, onMounted, reactive, ref } from 'vue';
  import FavoritesCard from '@/pages/FavoritesCard.vue'
  import { useStore } from 'vuex'

  // const requestName = ref('')

  // const dataSearch = reactive({})

  // function eventHanding(data) {
  //   requestName.value = data
  //   console.log(data)
  // }

 

</script>

<template>
  <div class=" w-5/6 m-auto mt-10">
    <HeaderComp />
    <!-- @filters="(data) => {
      dataSearch.value = data
    }
    " @requestName="eventHanding" -->
    <router-view>
    </router-view>
  </div>
</template>

