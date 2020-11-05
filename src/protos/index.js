const protobuf = require('protobufjs');
const root = new protobuf.Root();
const protoRoot = root.loadSync(__dirname + '/index.proto', { keepCase: true, enumsAsStrings:true });
const RequestPackage = protoRoot.lookupType("test.RequestPackage");
const ResponsePackage = protoRoot.lookupType("test.ResponsePackage");

// 加密请求信息
exports.encodeRequest = function (data) {
    return RequestPackage.encode(data).finish();
};

// 解码请求信息
exports.decodeRequest = function (data) {
    return RequestPackage.decode(data);
};

// 加密响应信息
exports.encodeResponse = function (data) {
    return ResponsePackage.encode(data).finish();
};

// 解密响应信息
exports.decodeResponse = function (data) {
    return ResponsePackage.decode(data);
};

exports.root = protoRoot;