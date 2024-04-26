<template>
  <div class="flex flex-col ">
    <div class="">
      <NameButton
        v-for="item in catalog"
        :key="item.id"
        :name="item.name"
        
        @click="() => {
           assortCategory = item.nameOnEng
          sendEvent()
        }"

      />
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import NameButton from '@/UI/NameButton.vue';
  import { onMounted, ref } from 'vue';

  const emit = defineEmits(['requestName'])

  let assortCategory = ref('')

  const catalog = ref([])

  function sendEvent() { 
    emit('requestName', assortCategory.value)
  }

  const fetchCatalog = async () => {
    try {
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/catalog`)
      catalog.value = data
     

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