<script setup>
  import HeaderComp from './modules/HeaderComp.vue';
  import AssortimentsList from './modules/AssortimentsList.vue';
  import cartItem from './components/cartItem.vue';
  import { computed, onMounted, reactive, ref } from 'vue';
  import FavoritesCard from '@/pages/FavoritesCard.vue';
  import { useStore } from 'vuex';
  import Cart from './pages/Cart.vue';

  // const requestName = ref('')

  // const dataSearch = reactive({})

  // function eventHanding(data) {
  //   requestName.value = data
  //   console.log(data)
  // }

  

  const store = useStore();
  const inCart = computed(() => store.state.inCart);



</script>

<template>

  <div class=" w-5/6  m-auto relative pt-1">
    <!-- <div class="flex h-96 ">

    </div> -->
    <!-- <div v-if="inCart" class="fixed z-20 inset-0 bg-black bg-opacity-80  ">
    </div> -->
    <HeaderComp />
    <!-- <cartItem /> -->
    <!-- <AssortimentsList /> -->
    <router-view>
    </router-view>
  </div>
</template>

