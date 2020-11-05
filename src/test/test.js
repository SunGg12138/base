const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app').callback();
const mocha_utils = require('./mocha_utils');
const protobuf = require('../protos');

describe('mocha test', function () {
    it('200 接口测试', async function(){
        let req = request(app).post('/');
        req.type('application/octet-stream');
        req.parse(mocha_utils.parser);
        req.write(protobuf.encodeRequest({
            head_frame: { msg_type: protobuf.root.MsgType.GET_BASE_REQ, timestamp: Date.now() },
            request_frame: { get_base_req: { test: true } }
        }));
        const res = await req;
        expect(res.body.result_frame).have.property('code').and.equal(0);
        expect(res.body.response_frame).have.property('get_base_res');
        expect(res.body.response_frame.get_base_res.test).to.be.ok;
    });

    it('不存在的错误测试', async function(){
        let req = request(app).post('/');
        req.type('application/octet-stream');
        req.parse(mocha_utils.parser);
        req.write(protobuf.encodeRequest({
            head_frame: { msg_type: 0, timestamp: Date.now() },
            request_frame: {}
        }));
        const res = await req;

        expect(res.body.result_frame.msg).equal('msg_type参数不存在');
    });

    it('错误测试', async function(){
        let req = request(app).post('/');
        req.type('application/octet-stream');
        req.parse(mocha_utils.parser);
        req.write(protobuf.encodeRequest({
            head_frame: { msg_type: protobuf.root.MsgType.GET_ERROR_REQ, timestamp: Date.now() },
            request_frame: { get_error_req: { test: true } }
        }));
        const res = await req;

        expect(res.body.result_frame.msg).equal('意外的错误');
    });
});