import Vue from 'vue';

const component = {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: ['value'],
  template: `
    <div>
      <input type="text" @input="handleInputChange" :value="value" />
    </div>
  `,
  methods: {
    handleInputChange (e) {
      this.$emit('change', e.target.value);
    },
  },
};

new Vue({
  el: '#root',
  data () {
    return {
      text: '123',
    };
  },
  template: `
    <div>
      <span>text: {{text}}</span>
      <comp v-model="text"></comp>
    </div>
  `,
  components: {
    comp: component,
  },
});
