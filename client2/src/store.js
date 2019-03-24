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
    }
  },
  // methods called to change the state within the store
  // Better than physically touching the state properties
  mutations: {
    // payload == the aruguments you pass into the mutation
    // <function name> (state, payload)
    changeUserType(state, payload) {
      state.userType = payload.userType;
    },
    changeUserData(state, payload) {

    }
  },
  // actions help deal with async behavior with mutations
  // all mutations to the state have to be committed to the store
  // actions help shorten the code where you dont have commit manually when you call a mutation
  actions: {
    changeUserType(context, payload){
      // commit( <mutation name>, payload)
      context.commit('changeUserType', payload);
    }
  },
});
