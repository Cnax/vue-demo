import Vue from 'vue';

const myComponent = {
  template: '<div>{{text}}</div>',
  data: () => ({
    text: '123',
  }),
};

// Vue.component('MyComp', myComponent);

new Vue({
  components: {
    MyComp: myComponent,
  },
  el: '#root',
  template: '<my-comp></my-comp>',
});
