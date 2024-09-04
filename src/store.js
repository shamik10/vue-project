import { sortBy } from 'lodash';
import { createStore } from 'vuex'

export default createStore ({
  state: {
    sortBy: 'title',
    searchQuery: '',
    requestName: '',
  },
  mutations: {
    requestName(state, requestName) {
      state.requestName = requestName;
    },
    changeSearch(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    changeSortBy(state, sortBy) {
      state.sortBy = sortBy;
    }
  },
  actions: {

  }
})