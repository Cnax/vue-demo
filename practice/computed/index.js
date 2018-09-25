import Vue from 'vue';

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>Number: {{number}}</p>
      <p>fullName: {{fullName}}</p>
      <p><input type="text" v-model="number" /></p>
      <p>firstName: <input type="text" v-model="firstName" /></p>
      <p>lastName: <input type="text" v-model="lastName" /></p>
      <p>obj.a: <input type="text" v-model="obj.a" /></p>
      <div>
        <input type="checkbox" value="a" v-model="arr" />
        <input type="checkbox" value="b" v-model="arr" />
        <input type="checkbox" value="c" v-model="arr" />
      </div>
      <p>
        <span v-for="item in arr">{{item}}</span>
      </p>
    </div>
  `,
  data () {
    return {
      lastName: 'junjun',
      firstName: 'wang',
      number: 0,
      fullName: '',
      obj: {
        a: '123',
      },
      arr: ['b', 'c'],
    };
  },
  computed: {
    name () {
      console.log('new Name');
      return `${this.firstName} ${this.lastName}`;
    },
  },
  methods: {
    getName () {
      console.log('getName');
      return `${this.firstName} ${this.lastName}`;
    },
  },
  watch: {
    firstName (newName, oldName) {
      this.fullName = newName + ' ' + this.lastName;
    },
    'obj.a': {
      handler () {
        console.log('obj.a');
      },
      immediate: true,
    },
  },
});
