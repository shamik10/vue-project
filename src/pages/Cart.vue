<template>
  <div>
    <h1 class="text-4xl pt-4">Корзина:</h1>
    <div class="flex flex-col pt-6 gap-10">
      <cartItem v-for="item in cartItems"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :category="item.category"
      :price="item.price"
      :description="item.description"
      @deleteItem="acceptEmit"
      />
    </div>
  </div>
</template>

<script setup>
  import cartItem from '@/components/cartItem.vue';
  import axios from 'axios';
  import { onMounted, ref, watch } from 'vue';

  const cartItems = ref([]);
  const flagForReload = ref(false);

  const getCartItem = async () => {
    try {
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/cart`);
      cartItems.value = data;
      console.log(data);

    }
    catch(err) {
      console.log(err);
    }
  }

  const acceptEmit = (data) => {
    console.log(data.value);
    flagForReload.value = data.value;
  }

  watch(() => flagForReload.value , getCartItem)

  onMounted( async () => {
    await getCartItem()
  })
</script>

<style>

</style>