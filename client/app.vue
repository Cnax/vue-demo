<template>
  <div :class="$style.app">
    <div :class="$style.cover"></div>
    <Header></Header>
    <!-- <Todo></Todo> -->
    <router-link to="/app">app</router-link>
    <router-link to="/app/123">/app/123</router-link>
    <router-link to="/app/456">/app/456</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
    <p>{{count}}</p>
    <p>{{fullName}}</p>
  </div>
</template>

<script>
import Header from './layout/header.vue';
import Footer from './layout/footer.jsx';
// import Todo from './views/todo/todo.vue';
import {
  mapState,
  mapGetters,
} from 'Vuex';
export default {
  data () {
    return {
      text: 'text',
    };
  },
  components: {
    Header,
    Footer,
    // Todo,
  },
  mounted () {
    console.log('store: ', this.$store);
    this.$store.dispatch('updateCountAsync', {
      num: 5,
      time: 2000,
    });
    // let i = 0;
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++);
    // }, 1000);
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters({
      fullName: 'fullName',
    }),
  },
};
</script>

<style lang="stylus" module>
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

