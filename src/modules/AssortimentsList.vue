<template>
  <div class="">
    <div class="flex mt-4 gap-6">
      <h1 class="underline text-4xl">Весь товар</h1>
      <select @change="onChangeSelect" class="py-2 mt-1  px-3 border rounded-md outline-none ">
        <option value="title">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
    </div>
    <div class="flex flex-wrap justify-between gap-2">
      <CardBlock
        v-for="item in assortItems"
        :key="item.id"
        :title="item.title"
        :price="item.price"
        :description="item.description"
      />
    </div>
  </div>

</template>

<script setup>
  import CardBlock from "@/components/CardBlock.vue";
  import axios from "axios";
  import { onMounted, reactive, ref, watch } from 'vue';


  const props = defineProps({
    requestName: String,
    dataSearch: Object
  })

  const paramVals = reactive({})


  const onChangeSelect = (event) => {
    paramVals.value.sortBy = event.target.value;
  }

  const assortItems = ref([]);

  const fetchAssortiments = async () => {
    try {
     console.log(props.dataSearch.value)
     console.log(paramVals)

     const params = {
        sortBy: paramVals.value.sortBy
      }


      if (props.dataSearch.searchQuery) {
        params.title = `*${props.dataSearch.searchQuery}*`;
      }
      // params.title = 'Стиральная'
      // params.sortBy = 'title'

      console.log(params);

      assortItems.value = []
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/${props.requestName || 'appliances'}`, {
        params
      })
      assortItems.value = data;

    }
    catch(e) {
      console.log(e);
    }
    
  }

  watch(paramVals, fetchAssortiments);

  watch(() => props.requestName, fetchAssortiments);
  

  onMounted( async () => {
    paramVals.value = {...props.dataSearch.value};
    await fetchAssortiments();
  })


</script>

<style>

</style>