<template>
  <div class="">
    <div class="flex justify-between mt-4 gap-6">
      <h1 class="underline text-4xl">Весь товар</h1>
      <div class="flex items-center  gap-4">
        <h1 class="text-xl"> Отсортировать по :</h1>
        <select @change="onChangeSelect" class="py-2 mt-1  px-3 border rounded-md outline-none ">
          <option value="title">названию</option>
          <option value="price">цене (дешевые)</option>
          <option value="-price">цене (дорогие)</option>
        </select>
      </div>
    </div>
    <div class="flex flex-wrap justify-between gap-2">
      <CardBlock
        v-for="item in assortItems"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :category="item.category"
        :price="item.price"
        :description="item.description"

      />
    </div>
  </div>

</template>

<script setup>
  import CardBlock from "@/components/CardBlock.vue";
  import axios from "axios";
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import { useStore } from "vuex";


  // const requestName = ref('');

  const store = useStore();
  const requestName = computed(() => store.state.requestName);
  const sortBy = computed(() => store.state.sortBy);
  const searchQuery = computed(() => store.state.searchQuery);
  function getSortBy (val) {
    store.commit('changeSortBy', val)
  }
  const props = defineProps({
    dataSearch: Object
  })

  const paramVals = reactive({})

  const onChangeSelect = (event) => {
    // paramVals.value.sortBy = event.target.value;
    getSortBy(event.target.value)
  }

  const assortItems = ref([]);

  const fetchAssortiments = async () => {
    try {
     const params = {
       sortBy: sortBy.value
       
      }
      // paramVals.value.searchQuery = props.dataSearch.value.searchQuery
      if (searchQuery.value) {
        params.title = `*${searchQuery.value}*`;
      }
      assortItems.value = [];
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/${requestName.value || 'appliances'}`, {
        params
      })
      assortItems.value = data;
    }
    catch(e) {
      console.log(e);
    }

  }

  watch(() => sortBy.value, fetchAssortiments);

  watch(() => searchQuery.value, fetchAssortiments)

  watch( () => requestName, fetchAssortiments, {deep: true});


  onMounted( async () => {
    // paramVals.value = {...props.dataSearch.value};
    await fetchAssortiments();
  })


</script>

<style>

</style>