<template>
  <div class=" w-96 mt-8  py-6 px-8 bg-slate-300 rounded-md flex flex-col justify-center">
    <div class="flex justify-center w-full">
      <img class="" src="../assets/images/sneakers-1.jpg" alt="">
    </div>
    <div class="flex flex-col  gap-6 mt-4">
      <div>
        <p class="">
          <b>Модель</b>: {{ name }}
        </p>
        <p class="">
          <b>Описание:</b> {{ description }}
        </p>
      </div>
      <div class="flex justify-between mt-2 gap-4">
        <button class="px-6 py-4 bg-orange-300 rounded-md">купить</button>
        <button>в корзину</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    id: Number,
    name: String,
    description: String
  })
</script>

<style>

</style>