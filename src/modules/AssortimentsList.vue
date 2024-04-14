<template>
  <div class="flex flex-wrap justify-between gap-2 ">
    <CardBlock
      v-for="item in assortItems"
      :key="item.id"
      :name="item.name"
      :description="item.description"
    />
  </div>

</template>

<script setup>
  import CardBlock from "@/components/CardBlock.vue";
  import axios from "axios";
  import { onMounted, ref } from 'vue';


  const assortItems = ref([]);

  const fetchAssortiments = async (category = 'appliances') => {
    try {
      assortItems.value = []
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/${category}`)
      assortItems.value = data
      console.log(data)
      for (const el of assortItems.value) {
        console.log(el.name)
      }
    }
    catch(e) {
      console.log(e)
    }

    // assortItems.value = []

  }


  onMounted( async () => {
    await fetchAssortiments()
  })

</script>

<style>

</style>