import Vue from 'vue';

const component = {
  template: `
    <div :style="style">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="body">
        <slot name="body"></slot>
      </div>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa',
      },
    };
  },
};

const childComp = {
  template: `
    <div>child component: {{data.value}}</div>
  `,
  inject: ['grandParent', 'data'],
  mounted () {
    console.log('child comp : ', this.grandParent.value, this.data.value);
  },
};

const compTwo = {
  template: `
    <div :style="style">
      <slot value="value" text="text"></slot>
      <child-comp></child-comp>
    </div>
  `,
  components: {
    childComp,
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa',
      },
    };
  },
};

new Vue({
  el: '#root',
  template: `
    <div>
      <comp ref="comp">
        <span slot="header" ref="span">this is a header component</span>
        <span slot="body">this is a body slot</span>
      </comp>
      <hr/>
      <comp-two>
        <div slot-scope="props">
          {{props.value}}
          {{props.text}}
          {{value}}
        </div>
      </comp-two>
      <input type="text" v-model="value" />
    </div>
  `,
  provide () {
    const data = {};
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true,
    });
    return {
      grandParent: this,
      data,
    };
  },
  data () {
    return {
      value: 'parentValue',
    };
  },
  components: {
    comp: component,
    compTwo,
  },
  mounted () {
    console.log(this.$refs.comp, this.$refs.span);
  },
});
