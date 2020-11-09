const raw = require('raw-body');
const inflate = require('inflation');
const protobuf = require('../protos');

/**
 * protobuf加密响应的数据，这个中间件，一定要靠前，要捕捉到所有响应的数据
 */
exports.encode = async function (ctx, next) {

    await next();

    if (ctx.request.path === '/protobuf') {
        // 响应前修改body内容
        let result_frame, response_frame;
        if (ctx.status < 300)  {
            result_frame = { code: 0, msg: 'ok' };
            response_frame = {
                [ctx.res_field]: ctx.body
            };
        } else {
            result_frame = ctx.body;
        }
        ctx.body = protobuf.encodeResponse({
            result_frame,
            response_frame
        });
    }
};

/**
 * protobuf解析请求信息
 */
exports.decode = async function (ctx, next) {
    if (ctx.request.path === '/protobuf') {
        // 二进制数据
        const req_buffer = await raw(inflate(ctx.req), { encoding: null });
        const req_data = protobuf.decodeRequest(req_buffer);

        const head_frame = req_data.head_frame || {};
        const { msg_type, timestamp } = head_frame;

        if (!msg_type) return ctx.error.msg('msg_type参数不存在');
        if (!timestamp) return ctx.error.msg('timestamp参数不存在');
        // 超过1分钟的请求提示超时
        if (Date.now - timestamp > 60000) return ctx.error.msg('请求已过期');

        ctx.request.msg_type = head_frame.msg_type;
        ctx.request.head_frame = head_frame;
        ctx.request.request_frame = req_data.request_frame || {};

        await next();
    } else {
        await next();
    }
};
