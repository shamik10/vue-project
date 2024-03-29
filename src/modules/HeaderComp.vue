<template >
  <div class=" border-b-2 pb-4">
    <div class=" h-24 flex justify-between gap-8">
      <HomeBlock />
      <div class="w-50   relative">
        <img class="absolute w-10 top-8  right-8 " src="@/assets/images/search.svg" alt="">
        <input placeholder="поиск по сайту" type="text" class=" bg-slate-150 border rounded-md   py-9 pl-8 pr-96 outline-none placeholder:text-slate-400 placeholder:text-2xl  hover:shadow-md hover:border-gray-400" >
      </div>
      <div class="flex gap-20">
        <div class="flex flex-col pt-4 cursor-pointer">
          <img class="flex self-center  w-12" src="@/assets/images/like-1.svg" alt="">
          <span class="text-center pt-2 text-2xl">Избранное</span>
        </div>
        <div class="flex flex-col pt-4 cursor-pointer">
          <img class="flex self-center  w-12" src="@/assets/images/cart.svg" alt="">
          <span class="text-center pt-2 text-2xl">Корзина</span>
        </div>
        <div class="flex flex-col pt-4 cursor-pointer">
          <img class="flex self-center  w-12" src="@/assets/images/profile.svg" alt="">
          <span class="text-center pt-2 text-2xl">Войти</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import HomeBlock from "@/components/HomeBlock.vue";

</script>

<style scoped>

  .text {
    font-weight: bold;
  }

  .absolute{
   
  }
  
</style>