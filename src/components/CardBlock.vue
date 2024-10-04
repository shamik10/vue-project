<template>
  <div class=" w-96 mt-8  py-6 px-8 bg-slate-300 rounded-md flex flex-col justify-between">
    <div class="flex relative justify-center w-full">
      <img class="w-full" :src="imageUrl" >
      
      <img @click="() => {
        addToFavorite();
        if(!isLikes) isLikes = true;
        else isLikes = false;
      }"  class="absolute right-1 w-10 cursor-pointer h-10" :src="isLikes ? '/favorite_isClicked.svg' : '/favorites.svg'">
    </div>
    <div class="flex flex-col  gap-6 mt-4">
      <div class="flex flex-col h-32">
        <p class="">
          <b class="">Модель</b>: {{ props.title }}
        </p>
        <p class="">
          <b>Описание:</b> {{ props.description }}
        </p>
      </div>
        <p class="mt-8">
          <b>Цена:</b> {{ props.price }} руб.
        </p>
      <div class="flex justify-between gap-4">
        <button class="px-6 py-4 bg-orange-300 text-white rounded-md">купить</button>
        <button @click="() => addInCart()">в корзину</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from "axios"
  import { computed, onMounted, ref, watch } from "vue"
  import { useStore } from "vuex";

  const store = useStore();
  const inCart = computed(() => store.state.inCart);

  const isLikes = ref(false);
  const isLikesCard = ref('');
  const catg = ref('');
  const titlesName = ref([]);
  let count = ref(0)


  const props = defineProps({
    id: Number,
    title: String,
    description: String,
    imageUrl: String,
    price: String,
    category: String,
    isLiked: Boolean
  })

  const addInCart = async () => {
    try {
      await getCartTitles()
      const obj = {
        ...props
      };
      console.log(titlesName.value)
      if(!titlesName.value.includes(obj.title)) {
        count.value++
        const { data } = await axios.post(`https://6d8dc8fcd4ab0089.mokky.dev/cart`, obj);
        console.log(data);
      }
      else {
        alert('данный товар был добавлен в карзину');

      }
    }
    catch(e) {

    }
  }

  const getFavorite = async () => {
    try {
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/isFavorites`);
      const favoriteCategory = data.filter(el => el.category === props.category && el.favoriteId === props.id );
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
        imageUrl: props.imageUrl,
        isLiked: true
      }
      const items = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/isFavorites`);
      const arrfavoriteId = items.data.map((el) => el.favoriteId)
      const arrId = items.data.filter((el) => el.favoriteId === obj.favoriteId && el.category === obj.category );
      console.log(arrId)
      if (props.isLiked) {
        await axios.delete(`https://6d8dc8fcd4ab0089.mokky.dev/isFavorites/${props.id}`);
      }
      else if ((!arrfavoriteId.includes(obj.favoriteId) || !arrId[0] && isLikes.value ) || Object.keys(items.data).length === 0) {
        localStorage.setItem(`${obj.favoriteId}`, obj.favoriteId)
        const { data } = await axios.post(`https://6d8dc8fcd4ab0089.mokky.dev/isFavorites`, obj);
        console.log(data);
      }
      else {
        await axios.delete(`https://6d8dc8fcd4ab0089.mokky.dev/isFavorites/${arrId[0].id}`)
        localStorage.removeItem(`${obj.favoriteId}`)
        console.log('del');
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  const getCartTitles = async () => {
    try {
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/cart`);
      const titleN = data.forEach((el) => {titlesName.value.push(el.title)})
    }
    catch(err) {
      console.log(err);
    }
  }

  // watch(() => count.value, getCartTitles)

  onMounted(async () => {
    catg.value = await getFavorite();
    await getCartTitles();
    isLikesCard.value = localStorage.getItem(props.id);
    if(props.isLiked) isLikes.value = true;
    else if (isLikesCard.value === null) isLikes.value = false;
    else if (isLikesCard.value && catg.value[0].category === props.category) {
      isLikes.value = true;
    }
  }
  )
</script>

<style>

</style>