<template>
  <div class="h-screen  flex flex-col box-border">
    <h1 class="text-4xl pt-4">Корзина:</h1>
    <div class="grid grid-rows-1 pt-6 gap-10   max-[650px]:justify-center max-[650px]:gap-6">
      <cartItem 
      @deleteItem="acceptEmit"
      v-for="item in cartItems"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :category="item.category"
      :price="item.price"
      :description="item.description"
      :imageUrl="item.imageUrl"
      />
    </div>
    <div v-if="flagForCart" class="flex h-full justify-center items-center pb-64">
      <h1 class="text-5xl text-slate-400">Ваша корзина пуста :(</h1>
    </div>
  </div>
</template>

<script setup>
  import cartItem from '@/components/cartItem.vue';
  import axios from 'axios';
  import { onMounted, onUnmounted, ref, watch } from 'vue';

  const cartItems = ref([]);
  const flagForReload = ref(false);
  const flagForCart = ref(false);

  const getCartItem = async () => {
    try {
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/cart`);
      if(data.length === 0) {
        flagForCart.value = true;
        document.body.style.overflow = 'hidden';
      }
      cartItems.value = data;
      flagForReload.value = false;
    }
    catch(err) {
      console.log(err);
    }
  }

  const acceptEmit = (data) => {
    flagForReload.value = data.value;
  }

  watch(() => flagForReload.value , getCartItem)

  onMounted( async () => {
    await getCartItem()
  })

  onUnmounted(() => {
    document.body.style.overflow = 'scroll';
  })
</script>

<style>

</style>