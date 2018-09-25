import Vue from 'vue';

new Vue({
  el: '#root',
  template: `
    <div
      :class="cls"
      @click="handleClick('asd')"
      :style="[styles1, styles2]"
    >
      {{isActive}}
      {{list.join(',')}}
      {{Date.now()}}
      {{htmlStr}}
      <p v-html="htmlStr"></p>
    </div>
  `,
  data () {
    return {
      isActive: false,
      list: [1, 2, 3],
      htmlStr: '<span>123456</span>',
      cls: 'aaa',
      styles1: {
        fontSize: '18px',
        color: 'red',
      },
      styles2: {
        color: 'blue',
      },
    };
  },
  methods: {
    handleClick (p) {
      window.alert('ddd', p);
    },
  },
});
