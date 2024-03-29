<template>
  <div class="mt-4">
    <button class="py-2 text-2xl cursor-pointer  bg-orange-300  hover:bg-orange-500 rounded-md px-10">
      {{ props.name }} 
    </button>
  </div>
</template>

<script setup>
  const props = defineProps({
    id: Number,
    name: String
  })
</script>

<style>

</style>