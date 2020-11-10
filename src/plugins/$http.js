import axios from 'axios'
import protobuf from 'protobufjs';
import protojson from '@/protos/index.json';

const root = protobuf.Root.fromJSON(protojson);

const RequestPackage = root.lookupType('test.RequestPackage');
const ResponsePackage = root.lookupType('test.ResponsePackage');
const MsgType = root.MsgType;

const protobufAxios = axios.create({
  baseURL: 'http://127.0.0.1:8080/protobuf',
  method: 'POST',
  headers: {
    'content-type': 'application/octet-stream'
  },
  responseType: 'arraybuffer'
});
protobufAxios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});
protobufAxios.interceptors.response.use(function (response) {
  const data = ResponsePackage.decode(new Uint8Array(response.data));
  return data.response_frame;
}, function (error) {
  const data = ResponsePackage.decode(new Uint8Array(error.response.data));
  window.alert(data.result_frame.msg);
  return Promise.reject(data.result_frame);
});

function protobufHandler (msg_type, data) {
  const head_frame = { msg_type, timestamp: Date.now() };
  const request_frame = data;
  const errmsg = RequestPackage.verify({ head_frame, request_frame });
  if (errmsg) throw errmsg

  const protobufData = RequestPackage.encode({ head_frame, request_frame }).finish();
  return protobufAxios('', { data: protobufData });
}

export default {
  base () {
    return protobufHandler(MsgType.GET_BASE_REQ,{ get_base_req: { test: true } })
    .then(function (result) {
      return result.get_base_res;
    });
  },
  error () {
    return protobufHandler(MsgType.GET_ERROR_REQ,{ get_error_req: { test: true } })
    .then(function (result) {
      return result.get_error_res;
    });
  }
}
