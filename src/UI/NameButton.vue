<template>
  <div  class=" mt-4">
    <router-link to="/">
      <button 
      class=" text-sm text-center text-white cursor-pointer w-28 
      h-16 bg-orange-400  hover:bg-orange-500 rounded-md max-[1180px]:text-xs max-[550px]:h-12 ">
        {{ props.name }}
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex"

  const props = defineProps({
    id: Number,
    name: String,
    nameOnEng: String
  })

    onMounted( async () => {

    })

</script>

<style>

</style>