import { flatMap, sortBy } from 'lodash';
import { createStore } from 'vuex'

export default createStore ({
  state: {
    sortBy: 'title',
    searchQuery: '',
    requestName: '',
    inCart: false,
    countItems: 0,
    logInFlag: false
  },
  getters: {
    getLogInFlag(state) {
      state.logInFlag = true;
      return state.logInFlag;
    }
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
    },
    changeInCart(state, inCart) {
      state.inCart = inCart;
    }
  },
  actions: {

  }
})