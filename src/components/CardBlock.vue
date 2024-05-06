<template>
  <div class=" w-96 mt-8  py-6 px-8 bg-slate-300 rounded-md flex flex-col justify-center">
    <div class="flex relative justify-center w-full">
      <img  src="../assets/images/sneakers-1.jpg">
      <img @click="() => {
        if(!isLikes) isLikes = true;
        else isLikes = false;
      }"  class="absolute right-7 w-10 cursor-pointer h-10" :src="isLikes ? '/favorite_isClicked.svg' : '/favorites.svg'">
    </div>
    <div class="flex flex-col  gap-6 mt-4">
      <div>
        <p class="">
          <b>Модель</b>: {{ props.title }}
        </p>
        <p class="">
          <b>Описание:</b> {{ props.description }}
        </p>
        <p class="mt-8">
          <b>Цена:</b> {{ props.price }} руб.
        </p>
      </div>
      <div class="flex justify-between gap-4">
        <button class="px-6 py-4 bg-orange-300 text-white rounded-md">купить</button>
        <button>в корзину</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue"

  let isLikes = ref(false)

  const props = defineProps({
    id: Number,
    title: String,
    description: String,
    price: Number
  })

</script>

<style>

</style>