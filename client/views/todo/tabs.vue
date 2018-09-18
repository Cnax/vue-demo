<template>
  <div :class="$style.helper">
    <span :class="$style.left">{{unCompletedTodosLenth}} items left</span>
    <span :class="$style.tabs">
      <span
        :key="state"
        v-for="state in states"
        :class="[$style.state, filter === state ? $style.actived : '']"
        @click="toggleFilter(state)"
      >
        {{state}}
      </span>
    </span>
    <span :class="$style.clear" @click="clearAllCompleted">
      clear All Completed
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      filter: {
        type: String,
        required: true,
      },
      todos: {
        type: Array,
        required: true,
      },
    },
    methods: {
      toggleFilter (state) {
        this.$emit('toggle', state);
      },
      clearAllCompleted () {
        this.$emit('clearAllCompleted');
      },
    },
    data () {
      return {
        states: ['all', 'active', 'completed'],
      };
    },
    computed: {
      unCompletedTodosLenth () {
        return this.todos.filter(item => item.id !== 'completed').length;
      },
    },
  };
</script>

<style lang="stylus" module>
.helper {
  font-weight: 100;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  line-height: 30px;
  background-color: #fff;
  font-size: 14px;
  font-smoonthing: antialiased;
}
.left, .clear, .tabs {
  padding: 0 10px;
  box-sizing: border-box;  
}
.left {
  width: 150px;
  text-align: left;
}
.clear {
  width: 150px;
  text-align: rigth;
  cursor: pointer;  
}
.tabs {
  width: 200px;
  display: flex;
  justify-content: space-around;
  * {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid rgba(175, 47, 47, 0);
    &.actived {
      border-color: rgba(175, 47, 47, .4);
      border-radius: 5px;
    }
  }  
}
</style>
