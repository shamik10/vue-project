<template >
  <div class=" border-b-2 pb-4">
    <div class=" flex justify-between ">
      <HomeBlock  />
      <div class="relative ">
        <input @input="onChangeSearchInput" placeholder="поиск по сайту..." type="text" class=" bg-slate-150 border rounded-md py-9 pl-12 pr-48 outline-none placeholder:text-slate-400
        placeholder:text-xl placeholder:self-start  hover:shadow-md hover:border-gray-400" >
        <img class="absolute w-10 top-7 left-[370px] " src="@/assets/images/search.svg" alt="">
      </div>
      <router-link to="/favorites">
        <div class="flex flex-col pt-4 cursor-pointer">
          <img class="flex self-center pt-2  w-10" src="/favorites.svg" alt="">
          <span class="text-center pt-2 text-2xl">Избранное</span>
        </div>
      </router-link>
      <router-link to="/cart">
        <div class="flex flex-col pt-4 cursor-pointer">
          <img class="flex self-center  w-12" src="@/assets/images/basket.svg" alt="">
          <span class="text-center pt-2 text-2xl">Корзина</span>
        </div>
      </router-link>
      <div @click="openModal" class="flex flex-col pt-4 cursor-pointer">
        <img class="flex self-center  w-12" src="@/assets/images/profile.svg" alt="">
        <div class="text-center pt-2 text-2xl">Войти</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import HomeBlock from "@/components/HomeBlock.vue";
  import { onMounted, reactive } from "vue";
  import debounce from 'lodash.debounce';
  import { useStore } from "vuex";

  const store = useStore();
  function searchVal (val) {
    store.commit('changeSearch', val);
  }

  const emit = defineEmits('openModal');
  // const filters = reactive({
  //   sortBy: 'title',
  //   searchQuery: '',
  // })

  function openModal(val = true) {
    emit('openModal', val);
  }

  const onChangeSearchInput = debounce((event) => {
    searchVal(event.target.value);
  }, 1000)

  // const emit = defineEmits(['requestName', 'filters'])

  // function sendEvent(data) {
  //   emit('requestName', data)
  // }


  // function eventHanding(data) {
  //   sendEvent(data)
  //   console.log(data)
  // }

  // onMounted(() => emit('filters', filters))

</script>

<style scoped>

  .text {
    font-weight: bold;
  }

  
</style>