<template>
  <div id="app">
  </div>
</template>

<script>
export default {
  name: 'App',

  created () {
    this.init();
  },

  methods: {
    async init () {
      const res_base = await this.$http.base();
      console.log('收到数据', res_base);

      const res_error = await this.$http.error();
      console.log('收到数据', res_error);
    }
  }
}
</script>

<style>
</style>
