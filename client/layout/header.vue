<template>
  <header :class="$style.mainHeader">
    <h1>JTodo</h1>
  </header>
</template>

<script>
export default {
  created () {
    console.log(this.$style);
  },
};
</script>

<style lang="stylus" module>
  .mainHeader {
    text-align: center;
    h1 {
      font-size: 100px;
      font-weight: 100px;
      margin: 20px;
      color: rgba(175, 47, 47, .4);
    }
  }
</style>
