import Vuex from 'vuex';
import defaultState from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
const isDev = process.env.NODE_ENV === 'development';
export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
  });
  if (module.hot) {
    module.hot.accept([
      './state',
      './mutations',
      './getters',
      './actions',
    ], () => {
      store.hotUpdate({
        state: require('./state'),
        mutations: require('./mutations'),
        actions: require('./actions'),
        getters: require('./getters'),
      });
    });
    return store;
  }
};
