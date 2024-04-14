<template>
  <div class="flex gap-4">
    <NameButton
      v-for="item in catalog"
      :key="item.id"
      :name="item.name"
      @click="her"
    />
  </div>
</template>

<script setup>
  import axios from 'axios';
  import NameButton from '@/UI/NameButton.vue';
  import { onMounted, ref } from 'vue';


  const catalog = ref([])

  const her = () => {
    console.log(catalog.value.id)
  }

  const fetchCatalog = async () => {
    try {
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/catalog`)
      catalog.value = data
      console.log(data)
      for (const el of catalog.value) {
        console.log(el.id)

      }
    }
    catch(e) {
      console.log(e)
    }
  }


  onMounted( async () => {
    await fetchCatalog()
  })
</script>

<style>

</style>