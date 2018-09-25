import Vue from 'vue';

const component = {
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa',
      },
    };
  },
  render (createElement) {
    return createElement(
      'div',
      {
        style: this.style,
      },
      this.$slots.default,
    );
  },
};

new Vue({
  el: '#root',
  // template: `
  //   <div>
  //     <comp ref="comp">
  //       <span ref="span">{{value}}</span>
  //     </comp>
  //   </div>
  // `,
  data () {
    return {
      value: 'parentValue',
    };
  },
  components: {
    comp: component,
  },
  mounted () {
    console.log(this.$refs.comp, this.$refs.span);
  },
  render (createElement) {
    return createElement(
      'comp',
      {
        ref: 'comp',
      },
      [
        createElement(
          'span',
          {
            ref: 'span',
          },
          this.value,
        ),
      ],
    );
  },
});
