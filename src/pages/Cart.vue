<template>
  <div>
    <button @click=" getCartItem()">tap me</button>
  </div>
</template>

<script setup>
  import cartItem from '@/components/cartItem.vue';
  import axios from 'axios';

  const getCartItem = async () => {
    try {
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/cart`);
      console.log(data)

    }
    catch(err) {
      console.log(err)
    }
  }
</script>

<style>

</style>