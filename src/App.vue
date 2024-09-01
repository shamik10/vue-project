<script setup>
  import HeaderComp from './modules/HeaderComp.vue';
  import AssortimentsList from './modules/AssortimentsList.vue';
  import { computed, reactive, ref } from 'vue';
  import FavoritesCard from '@/pages/FavoritesCard.vue'
  import { useStore } from 'vuex'

  const requestName = ref('')

  const dataSearch = reactive({})

  function eventHanding(data) {
    requestName.value = data
    console.log(data)
  }

  const store = useStore();
  // const requestName = computed(() => store.state.requestName)



  const increment = () => {
  store.commit('increment');
};
const decrement = () => {
  store.commit('decrement')
}



</script>

<template>
  <div class=" w-5/6 m-auto mt-10">
    <HeaderComp @filters="(data) => {
      dataSearch.value = data
    }
    " @requestName="eventHanding" />
    <router-view>
    </router-view>
    <!-- <AssortimentsList :dataSearch="dataSearch" :requestName="requestName" /> -->
     <button @click="increment()">увеличить </button>
     <button @click="decrement()">уменьшить </button>
     <h2>
       {{ store.state.requestName }}

     </h2>
  </div>
</template>

