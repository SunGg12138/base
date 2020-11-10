import jsonClient from './clients/json';
import protobufClient from './clients/protobuf';

export default {
  protobuf: {
    base () {
      // 指定字段
      return protobufClient('GET_BASE_REQ',{ get_base_req: { test: true } })
      .then(function (result) {
        return result.get_base_res;
      });
    },
    error () {
      return protobufClient('GET_ERROR_REQ',{ get_error_req: { test: true } })
      .then(function (result) {
        return result.get_error_res;
      });
    },
  },
  json: {
    base () {
      // 指定字段
      return jsonClient.post('/v1/base', { test: true })
    },
    error () {
      // 指定字段
      return jsonClient.post('/v1/base/error', { test: true })
    },
  }
};
