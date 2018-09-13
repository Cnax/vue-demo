<template>
  <div class="app">
    <div class="cover"></div>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './todo/header.vue';
  import Footer from './todo/footer.jsx';
  import Todo from './todo/todo.vue';
  export default {
    data() {
      return {
        text: 'text',
      };
    },
    components: {
      Header,
      Footer,
      Todo,
    },
  }
</script>

<style lang="stylus" scoped>
.app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.cover {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #999;
  opacity: .9;
  z-index: -1;
}
</style>

