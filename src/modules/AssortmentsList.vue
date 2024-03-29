<template>
  <div class="flex gap-4">
    <NameButton 
      v-for="item in assortments" 
      :key="item.id"
      :name="item.name"
    />
  </div>
</template>

<script setup>
  import axios from 'axios';
  import NameButton from '@/UI/NameButton.vue';
  import { onMounted, ref } from 'vue';
  

  const assortments = ref([])

  const fetchAssortments = async () => {
    try {
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/assortiments`)
      assortments.value = data
      console.log(data)
      for (const el of assortments.value) {
        console.log(el.id)

      }
    }
    catch(e) {
      console.log(e)
    }
  }

  const fetch = async () => {
    try {
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/assortiments`)
      assortments.value = data
      console.log(data)
      for (const el of assortments.value) {
        console.log(el.name)

      }
    }
    catch(e) {
      console.log(e)
    }
  }


  onMounted( async () => {
    await fetchAssortments()
  })
</script>

<style>

</style>