import { flatMap, sortBy } from 'lodash';
import { createStore } from 'vuex'

export default createStore ({
  state: {
    sortBy: 'title',
    searchQuery: '',
    requestName: '',
    inCart: false,
    countItems: 0,
    logInFlag: false,
    currentUser: {
      
    },
    
  },
  getters: {
    getLogInFlag(state) {
      return state.logInFlag;
    }
  },
  mutations: {
    changeUser(state, uid) {
      state.currentUser = uid;
    },
    changeLogInFlag(state, val = true) {
      state.logInFlag = val;
    },
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
    },
    adoptData(state, userData) {
      state.currentUser = userData;
    },
    setToken(state, userToken) {
      state.currentUser.accessToken = userToken;
    }
  },
  actions: {

  }
})