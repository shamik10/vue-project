<template>
  <div class=" w-96 mt-8  py-6 px-8 bg-slate-300 rounded-md flex flex-col justify-center">
    <div class="flex relative justify-center w-full">
      <img  src="../assets/images/sneakers-1.jpg">
      <img @click="() => {
        addToFavorite();
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
  import axios from "axios"
  import { onMounted, ref } from "vue"

  let isLikes = ref(false);
  const isLikesCard = ref('');
  const catg = ref('');


  const props = defineProps({
    id: Number,
    title: String,
    description: String,
    price: Number,
    category: String,
    isLiked: Boolean
  })

  const getFavorite = async () => {
    try {
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/isFavorites`);
      // console.log(data);
      const favoriteCategory = data.filter(el => el.category === props.category && el.favoriteId === props.id );
      // console.log(favoriteCategory)
      return favoriteCategory;
    }
    catch(err) {
      console.log(err);
    }
  }

  const addToFavorite = async () => {
    try {
      const obj = {
        id: 0,
        favoriteId: props.id,
        title: props.title,
        description: props.description,
        price: props.price,
        category: props.category,
        isLiked: true
      }
      const items = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/isFavorites`)
      const arrfavoriteId = items.data.map((el) => el.favoriteId)
      const arrfavoriteCatg = items.data.map((el) => el.category)
      console.log(arrfavoriteId)
      const arrId = items.data.filter((el) => el.favoriteId === obj.favoriteId && el.category === obj.category );
      console.log(arrId)
      if (props.isLiked) {
        await axios.delete(`https://6d8dc8fcd4ab0089.mokky.dev/isFavorites/${props.id}`)
      }
      else if ((!arrfavoriteId.includes(obj.favoriteId) || !arrId[0] && isLikes.value ) || Object.keys(items.data).length === 0) {
        localStorage.setItem(`${obj.favoriteId}`, obj.favoriteId)
        const { data } = await axios.post(`https://6d8dc8fcd4ab0089.mokky.dev/isFavorites`, obj)
        console.log(data);
      }
      else {
        console.log(arrId[0].id)
        await axios.delete(`https://6d8dc8fcd4ab0089.mokky.dev/isFavorites/${arrId[0].id}`)
        localStorage.removeItem(`${obj.favoriteId}`)
        console.log('del');
      }
    }
    catch(err) {
      console.log(err);
    }
  }



  onMounted(async () => {
    catg.value = await getFavorite();
    isLikesCard.value = localStorage.getItem(props.id);
    if(props.isLiked) isLikes.value = true;
    else if (isLikesCard.value === null) isLikes.value = false;
    else if (isLikesCard.value && catg.value[0].category === props.category) {
      isLikes.value = true;
      console.log('e');
    }
  }
  )
</script>

<style>

</style>