const raw = require('raw-body');
const inflate = require('inflation');
const protobuf = require('../../protos');

// 解析响应的protobuf数据
exports.protobufParser = async function (res, fn) {
    const buf = await raw(inflate(res), { encoding: null });
    fn(null, protobuf.decodeResponse(buf));
};
