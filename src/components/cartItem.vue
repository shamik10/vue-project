<template>
  <div class="flex w-full mt-10 bg-slate-300 h-72 rounded-md flex-row justify-between px-8 shadow-md pr-24 text-xl">
    <div class="flex  flex-row gap-8">
      <div class="flex items-center" >
        <img class=" border-2 border-solid border-black box-shadow insert-0 h-52 rouded-md" src="../assets/images/sneakers-1.jpg" alt="">
      </div>
      <div class="flex w-11/12 mt-9 text-2xl">
        <div class=" gap-4 flex-col ">
          <p class="">
            <b class="">Модель:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam debitis placeat impedit, quisquam distinctio eum iste reiciendis maxime libero nihil quas? Pariatur aliquam, incidunt doloribus ullam saepe vel explicabo culpa!
          </p>
          <p class="">
            <b>Описание:</b>
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col pb-10 justify-end">
      <p class="">
        <b>Цена:</b>  руб.
      </p>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios';

</script>

