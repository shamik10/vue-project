<template>
  <div class="flex flex-col ">
    <div class="">
      <NameButton
        v-for="item in catalog"
        :key="item.id"
        :name="item.name"
        :nameOnEng="item.nameOnEng"

        @click="() => {
           assortCategory = item.name;
          getReqName(item.nameOnEng);
           console.log(item.name);
          // sendEvent()
        }"

      />
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import NameButton from '@/UI/NameButton.vue';
  import { computed, onMounted, ref } from 'vue';
  import { useStore } from 'vuex';


  // const emit = defineEmits(['requestName'])

  let assortCategory = ref('');
  const catalog = ref([]);
  const store = useStore();
  const reqName = computed(() => store.state.requestName)
  function getReqName (name) {
    store.commit('requestName', name);
  }

  // function sendEvent() {
  //   emit('requestName', assortCategory.value)
  // }

  const fetchCatalog = async () => {
    try {
      const {data} = await axios.get(`https://6d8dc8fcd4ab0089.mokky.dev/catalog`)
      catalog.value = data;

    }
    catch(e) {
      console.log(e)
    }
  }

  onMounted( async () => {
    await fetchCatalog();
    console.log(reqName.value)
  })
</script>

<style>

</style>