<template>
  <div class="">
    <div class="flex justify-between r mt-4 gap-6">
      <h1 class="underline text-4xl max-[750px]:text-xl max-[750px]:pt-1 max-[500px]:text-sm max-[500px]:pt-2">Весь товар</h1>
      <div class="flex items-center  gap-4 max-[500px]:gap-1">
        <h1 class="text-xl max-[750px]:text-xs"> Отсортировать:</h1>
        <select @change="onChangeSelect" class=" mt-1 h-8  border rounded-md outline-none max-[750px]:text-xs ">
          <option value="title">по названию</option>
          <option value="price">по цене (дешевые)</option>
          <option value="-price">по цене (дорогие)</option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-8 max-[1024px]:grid-cols-3  max-[800px]:grid-cols-2 max-[800px]:gap-3  max-[550px]:grid-cols-1">
      <CardBlock
        v-for="item in assortItems"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :imageUrl="item.imageUrl"
        :category="item.category"
        :price="item.price"
        :description="item.description"
      />
    </div>
  </div>

</template>

<script setup>
  import CardBlock from "@/components/CardBlock.vue";
  import axios from "axios";
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import { useStore } from "vuex";



  const store = useStore();
  const requestName = computed(() => store.state.requestName);
  const sortBy = computed(() => store.state.sortBy);
  const searchQuery = computed(() => store.state.searchQuery);
  const names = ref([]);
  

  function getSortBy (val) {
    store.commit('changeSortBy', val)
  }

  const onChangeSelect = (event) => {
    getSortBy(event.target.value)
  }

  const assortItems = ref([]);

  const fetchAssortiments = async () => {
    try {
     const params = {
       sortBy: sortBy.value

      }
      if (searchQuery.value) {
        params.title = `*${searchQuery.value}*`;
      }
      assortItems.value = [];
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/${requestName.value || 'appliances'}`, {
        params
      })
      // console.log(data);
      for (const elem of data) {
        names.value.push(elem.title)
      }
      assortItems.value = data;

    }
    catch(e) {
      console.log(e);
    }

  }

  watch(() => sortBy.value, fetchAssortiments);

  watch(() => searchQuery.value, fetchAssortiments);

  watch(() => requestName, fetchAssortiments, {deep: true});


  onMounted( async () => {
    await fetchAssortiments();
  })


</script>

<style>

</style>