<template>
  <div :class="$style.realApp">
    <input
      type="text"
      :class="$style.addInput"
      autofocus="autofocus"
      placeholder="接下去要做什么"
      @keyup.enter="addTodo"
    />
    <Item
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo"
      @del="deleteSingleTodo"
    />
    <tabs
      :filter="filter"
      :todos="filteredTodos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
  </div>
</template>

<script>
import Item from './item.vue';
import Tabs from './tabs.vue';
const defaultFilter = 'all';
let id = 0;
export default {
  beforeRouteEnter (to, from, next) {
    console.log('todo before route enter', this);
    next(vm => {
      console.log('vm berore route enter ', vm);
    });
  },
  beforeRouteUpdate (to, from, next) {
    console.log('todo before route update', this);
    next();
  },
  beforeRouteLeave (to, from, next) {
    console.log('todo before route leave', this);
    next();
  },
  data () {
    return {
      todos: [],
      filter: defaultFilter,
    };
  },
  components: {
    Item,
    Tabs,
  },
  methods: {
    addTodo (e) {
      this.todos = [{
        id: id++,
        content: e.target.value.trim(),
        completed: false,
      }, ...this.todos ];
      e.target.value = '';
    },
    deleteSingleTodo (id) {
      this.todos = this.todos.filter(item => item.id !== id);
    },
    toggleFilter (state) {
      this.filter = state;
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(item => !item.completed);
    },
  },
  computed: {
    filteredTodos () {
      if (this.filter === defaultFilter) {
        return this.todos;
      }
      const isCompleted = this.filter === 'completed';
      return this.todos.filter(item => isCompleted === item.completed);
    },
  },
};
</script>

<style lang="stylus" module>
.realApp {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}
.addInput {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  line-height: 1.4em;
  border: 0;
  outline: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, .4);
  box-sizing: border-box;
  font-smoonthing: antialiased;
  padding: 16px 16px 16px 60px;
}
</style>
