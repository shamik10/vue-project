import { useSlots } from 'vue'
import { createStore, useStore } from 'vuex'

export default createStore ({
  state: {
    dataSearch: {},
    requestName: 'g',
    count: 0
  },
  mutations: {
    requestName(state) {
      state.count
    },
    decrement(state) {
      state.count
    }
  }
})