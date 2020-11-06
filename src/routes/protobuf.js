const { root: { MsgType } } = require('../protos');
const Service = require('../services/base');

const MSG_CONFIGS = {
    [MsgType.GET_BASE_REQ]: {
        service: Service.index,
        req_field: 'get_base_req',
        res_type: MsgType.GET_BASE_RES,
        res_field: 'get_base_res',
    },
    [MsgType.GET_ERROR_REQ]: {
        service: Service.error,
        req_field: 'get_error_req',
        res_type: MsgType.GET_ERROR_RES,
        res_field: 'get_error_res',
    }
};

module.exports = async function (ctx, next) {
    if (ctx.request.path === '/protobuf') {
        const msg_config = MSG_CONFIGS[ctx.request.msg_type];
        const request_frame = ctx.request.request_frame;
    
        if (!msg_config) return ctx.error.msg('不支持的msg_type类型');
        if (!request_frame[msg_config.req_field]) return ctx.error.msg('请求数据格式错误');
    
        const { service, req_field, res_type, res_field } = msg_config;
    
        ctx.res_field = res_field;
        ctx.res_type = res_type;
        ctx.request.body = request_frame[req_field];
    
        return service(ctx);
    } else {
        await next();
    }
};
