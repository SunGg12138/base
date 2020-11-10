import $http from './$http'

export default {
  install (Vue) {
    Vue.prototype.$http = $http;
  }
}
