<template>
  <div id="app">
  </div>
</template>

<script>
export default {
  name: 'App',

  created () {
    this.protobufReq();
    this.jsonReq();
  },

  methods: {
    async protobufReq () {
      const res_base = await this.$http.protobuf.base();
      console.log('收到数据', res_base);

      const res_error = await this.$http.protobuf.error();
      console.log('收到数据', res_error);
    },
    async jsonReq () {
      const res_json_base = await this.$http.json.base();
      console.log('收到数据', res_json_base);

      const res_json_error = await this.$http.json.error();
      console.log('收到数据', res_json_error);
    }
  }
}
</script>

<style>
</style>
