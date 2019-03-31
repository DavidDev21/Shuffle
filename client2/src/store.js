import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
    userType: undefined
  },
  // methods to get state elements
  getters: {
    userType(state) {
      return state.userType;
    },
    userData(state) {
      return state.userData;
    }
  },
  // methods called to change the state within the store (synchronous)
  // Better than physically touching the state properties
  mutations: {
    // payload == the aruguments you pass into the mutation
    // <function name> (state, payload)
    changeUserType(state, payload) {
      state.userType = payload
    },
    changeUserData(state, payload) {
      state.userData = {...payload}
    }
  },
  // actions help deal with async behavior, indirectly uses mutations
  // all mutations to the state have to be committed to the store
  // actions help shorten the code where you dont have commit manually when you call a mutation
  actions: {
    changeUserType(context, userType){
      console.log(userType)
      // commit( <mutation name>, payload)
      context.commit('changeUserType', userType);
    },
    changeUserData(context, payload){
      context.commit('changeUserData', payload);
    }
  },
});
