import axios from 'axios';
import protobuf from 'protobufjs';
import protojson from '@/protos/index.json';
const protoRoot = protobuf.Root.fromJSON(protojson);
const RequestPackage = protoRoot.lookupType('test.RequestPackage');
const ResponsePackage = protoRoot.lookupType('test.ResponsePackage');
const MsgType = protoRoot.MsgType;

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

export default function (msg_type, data) {
  const head_frame = { msg_type: MsgType[msg_type], timestamp: Date.now() };
  const request_frame = data;
  // 验证请求信息
  const errmsg = RequestPackage.verify({ head_frame, request_frame });
  if (errmsg) throw errmsg
  // 构建请求buffer
  const protobufData = RequestPackage.encode({ head_frame, request_frame }).finish();
  return protobufAxios('', { data: protobufData });
};
