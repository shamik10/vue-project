<template>
  <div class="flex bg-slate-300 h-72 rounded-md flex-row justify-between shadow-md pl-8 text-xl">
    <div class="flex w-full gap-8">
      <div class="flex items-center" >
        <img class=" border-2 border-solid border-black box-shadow insert-0 h-52 rouded-md" :src="props.imageUrl" alt="">
      </div>
      <div class="flex flex-col justify-between w-8/12 mt-9 text-2xl">
        <div class=" gap-6 ">
          <p class="">
            <b class="">Модель:</b> {{ props.title }}
          </p>
          <p class="">
            <b>Описание:</b> {{ props.description }}
          </p>
        </div>
        <div class="flex pb-5 justify-center  pl-20">
          <div class="border rounded-full solid border-gray-500 ">
            <button class="bg-orange-400 rounded-s-3xl border-r pl-8 border-slate-500 py-2 pr-6 ">Купить</button>
            <button @click="deleteCartItem()" class="bg-zinc-400 rounded-e-3xl py-2 pr-4 pl-6">Удалить </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-between pt-9 pb-9 ">
      <div class="flex gap-1 ">
        <p><b>Кол-во:</b> </p>
        <div @click="increment()" class="cursor-pointer">
          <img class="h-7" src="../assets/images/plus_btn.svg" alt="">
        </div>
        <p>{{ count }}</p>
        <div @click="decrement()" class="cursor-pointer">
          <img class="h-7" src="../assets/images/minus_btn.svg" alt="">
        </div>
      </div>
      <div class="">
        <p class="w-52">
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
    console.log(isDeleted.value);
    isDeleted.value = false;
    console.log(isDeleted.value);
  }

   const increment = () => {
    if (arrVal.value.length === 0) {
      arrVal.value.push(props.price)
    }
    count.value++
    return arrVal.value.reduce((acc, val) => {
      console.log(arrVal.value)
      console.log(+acc + +val)
      const sum = +acc + +val
      newPrice.value = sum;
      return arrVal.value[0] = sum
    }, props.price)
   }

   const decrement = () => {
    if(count.value > 1) {
      count.value--
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

