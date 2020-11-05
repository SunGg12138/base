const raw = require('raw-body');
const inflate = require('inflation');
const protobuf = require('../../protos');
exports.parser = async function (res, fn) {
    const buf = await raw(inflate(res), { encoding: null });
    fn(null, protobuf.decodeResponse(buf));
};
