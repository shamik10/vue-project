<template>
  <div class="flex bg-slate-300 h-72 rounded-md flex-row justify-around shadow-md pl-8 text-xl max-[650px]:h-[500px] max-[650px]:flex-col max-[650px]:w-80 max-[650px]:pl-0 max-[650px]:justify-center">
    <div class="flex w-full gap-8 max-[650px]:flex-col max-[650px]:items-center max-[650px]:gap-4">
      <div class="flex items-center max-[650px]:pt-6 ">
        <img class=" border-2 border-solid border-black box-shadow insert-0 h-52 rouded-md max-[650px]:w-full" :src="props.imageUrl" alt="">
      </div>
      <div class="flex flex-col justify-between w-8/12 mt-9 text-2xl max-[980px]:text-sm max-[650px]:mt-0 max-[650px]:w-11/12">
        <div class=" gap-6 max-[650px]:w-full">
          <p class="">
            <b class="">Модель:</b> {{ props.title }}
          </p>
          <p class="">
            <b>Описание:</b> {{ props.description }}
          </p>
        </div>
        <div class="flex pb-5 justify-center  pl-20 max-[950px]:pl-0 max-[650px]:pt-4 ">
          <div class="border rounded-full solid border-gray-500 max-[650px]:w-full">
            <button class="bg-orange-400 rounded-s-3xl border-r  pl-8 border-slate-500 py-2 pr-6 max-[650px]:pr-2 max-[650px]:pl-[99px]">Купить</button>
            <button @click="deleteCartItem()" class="bg-zinc-400 rounded-e-3xl  py-2 pr-4 pl-6 max-[650px]:pr-20 max-[650px]:pl-2">Удалить </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-52 flex flex-col justify-between pt-9 pb-9 items-end max-[650px]:flex-row  max-[650px]:justify-center  max-[650px]:w-auto max-[650px]:pt-0 max-[650px]:gap-4">
      <div class="flex gap-1  max-[980px]:text-sm  max-[650px]:items-center">
        <p><b>Кол-во:</b> </p>
        <div @click="increment()" class="cursor-pointer">
          <img class="h-7" src="../assets/images/plus_btn.svg" alt="">
        </div>
        <p>{{ count }}</p>
        <div @click="decrement()" class="cursor-pointer">
          <img class="h-7" src="../assets/images/minus_btn.svg" alt="">
        </div>
      </div>
      <div class="flex max-[980px]:text-sm ">
        <p class="pb-1">
          <b >Цена:</b> {{ newPrice }} руб.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios';
import { ref, watch } from 'vue';

  const props = defineProps({
    id: Number,
    title: String,
    description: String,
    price: String,
    category: String,
    imageUrl: String,
    isLiked: Boolean
  })

  let count = ref(1);
  let arrVal = ref([]);
  let isDeleted = ref(false);
  const newPrice = ref(`${props.price}`);

  const deleteCartItem = async () => {
    try {
      isDeleted.value = true;
      await axios.delete(`https://6d8dc8fcd4ab0089.mokky.dev/cart/${props.id}`);
      console.log(props)
      sendDeleteItem()
      // location.reload()
    }
    catch (e) {
      console.log(e)
    }
  }

  const emit = defineEmits(['deleteItem'])

  const sendDeleteItem = () => {
    emit('deleteItem', isDeleted);
    isDeleted.value = false;
  }

   const increment = () => {
    if (arrVal.value.length === 0) {
      arrVal.value.push(props.price)
    }
    count.value++;
    return arrVal.value.reduce((acc, val) => {
      const sum = +acc + +val
      newPrice.value = sum;
      return arrVal.value[0] = sum
    }, props.price)
   }

   const decrement = () => {
    if(count.value > 1) {
      count.value--;
      return arrVal.value.reduce((acc, val) => {
        const minus = +val -  +acc
        newPrice.value = minus
        return arrVal.value[0] = minus
      }, props.price)
    }
    else {
      deleteCartItem()
    }
   }

  //  watch(() => isDeleted.value, () =>  isDeleted.value = false)


</script>

