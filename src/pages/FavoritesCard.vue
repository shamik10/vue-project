<template>
  <div>
    <h1 class="text-4xl">Избранное:</h1>
    <!-- <div class="flex flex-wrap justify-between gap-2">
        <CardBlock
          v-for="item in favoriteItems"
          :key="item.id"
          :id="item.id"
          :title="item.title"
          :category="item.category"
          :imageUrl="item.imageUrl"
          :price="item.price"
          :description="item.description"
          :isLiked="item.isLiked"
          @reloadFavorites="reloadFavorite"
        />
      </div> -->
      <div class=" grid grid-cols-4 gap-8 max-[1024px]:grid-cols-3  max-[800px]:grid-cols-2 max-[800px]:gap-3  max-[550px]:grid-cols-1 ">
      <CardBlock
        v-for="item in favoriteItems"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :imageUrl="item.imageUrl"
        :category="item.category"
        :price="item.price"
        :description="item.description"
        :isLiked="item.isLiked"
        @reloadFavorites="reloadFavorite"
      />
    </div>
  </div>
</template>

<script setup>
  import CardBlock from "@/components/CardBlock.vue";
  import axios from "axios";
  import { onMounted, ref, watch } from "vue";


  const reloadFlag = ref(false);

  const getFavoriteItems = async () => {
    try {
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/isFavorites`);
      favoriteItems.value = data;
      reloadFlag.value = false;
    }
    catch(e) {
      console.log(e);
    }
  }

  const favoriteItems = ref([]);
  const reloadFavorite = (dataEmit) => {
    console.log(dataEmit.value)
    reloadFlag.value = dataEmit.value;
  }


  watch(() => reloadFlag.value, getFavoriteItems)

  onMounted( async () => {
    await getFavoriteItems();
    // try {
    //   const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/isFavorites`);
    //   favoriteItems.value = data;
    // }
    // catch(e) {
    //   console.log(e);
    // }
  })
</script>

