const { root: { MsgType } } = require('../../protos');
const Service = require('../../services/base');

module.exports = {
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