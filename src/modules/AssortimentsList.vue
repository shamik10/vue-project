<template>
  <div class="flex flex-wrap justify-between gap-2 ">
    <CardBlock
      v-for="item in assortItems"
      :key="item.id"
      :name="item.name"
      :price="item.price"
      :description="item.description"
     
    />
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

  let params = reactive({})

  const assortItems = ref([]);
  
  const fetchAssortiments = async () => {
    try {
      params = {
        ...props.dataSearch,
      } 
        

      console.log(params)

      if (params.searchQuery) {
        params.title = `*${props.dataSearch.searchQuery}*`;
      }

      assortItems.value = []
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/${props.requestName || 'appliances'}`, {
        params
      })
      assortItems.value = data
      
    }
    catch(e) {
      console.log(e)
    }

  }

  watch(() => params, fetchAssortiments, {data: true})

  watch(() => props.requestName, fetchAssortiments)

  onMounted( async () => {
    await fetchAssortiments('appliances')
  })

</script>

<style>

</style>