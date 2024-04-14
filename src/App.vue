<script setup>
  import HeaderComp from './modules/HeaderComp.vue';
  import CatalogList from './modules/CatalogList.vue';
  import AssortimentsList from './modules/AssortimentsList.vue';
  // import CardBlock from './components/CardBlock.vue';

</script>

<template>
  <div class=" w-5/6 m-auto mt-10">
    <HeaderComp />
    <CatalogList />
    <div class=" ">
      <AssortimentsList />
    </div>
  </div>
</template>

