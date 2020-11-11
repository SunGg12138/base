const requireDir = require('require-dir')();
const MSG_CONFIGS = Object.assign.apply({}, Object.values(requireDir));

module.exports = async function (ctx, next) {
    if (ctx.request.path === '/protobuf') {
        const msg_config = MSG_CONFIGS[ctx.request.msg_type];
        const request_frame = ctx.request.request_frame;
    
        if (!msg_config) return ctx.error.msg('不支持的msg_type类型');
        if (!request_frame[msg_config.req_field]) return ctx.error.msg('请求数据格式错误');
    
        const { service, req_field, res_type, res_field } = msg_config;
    
        ctx.res_field = res_field;
        ctx.res_type = res_type;
        // 支持http的GET和POST
        ctx.request.query = ctx.request.body = request_frame[req_field];
    
        await service(ctx);
    } else {
        await next();
    }
};
