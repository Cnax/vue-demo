import Vue from 'vue';

const app = new Vue({
  el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 0,
  },
  beforeCreate () {
    console.log(this, 'beforeCreate');
  },
  created () {
    console.log(this, 'created');
  },
  beforeMount () {
    console.log(this, 'beforeMount');
  },
  mounted () {
    console.log(this, 'mounted');
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate');
  },
  updated () {
    console.log(this, 'updated');
  },
  // 和keep-alive相关
  activated () {
    console.log(this, 'activated');
  },
  // 和keep-alive相关
  deactivated () {
    console.log(this, 'deactivated');
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy');
  },
  destroyed () {
    console.log(this, 'destroyed');
  },
  render (h) {
    console.log(this, 'render');
    return h('div', {}, this.text);
  },
  // 捕获本组件的错误
  renderError (h, error) {
    return h('div', {}, error.stack);
  },
  errorCaptured: (err, vm, info) => {
    // 会向上冒泡，并且真是环境可以使用
    console.log(err, vm, info);
  },
});

setInterval(() => {
  app.text += 1;
}, 1000);

setTimeout(() => {
  app.$destroy();
}, 5000);
