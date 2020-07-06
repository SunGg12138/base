const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app').callback();

describe('mocha test', function () {
    it('200 接口测试', async function(){
        let res = await request(app).get('/api/v1/base').expect(200);
        expect(res.body).have.property('base_type');
        expect(typeof res.body.base_type).equal('string');
        expect(res.body).have.property('branch');
        expect(typeof res.body.branch).equal('string');
    });

    it('500 错误测试', async function(){
        let res = await request(app).get('/api/v1/base/error').expect(500);
        expect(res.body).have.property('msg');
        expect(typeof res.body.msg).equal('string');
    });

    it('koa-sequelize 接口测试', async function(){
        let res = await request(app).get('/api/v1/base/user/list').expect(200);
        expect(res.body).to.be.an('array')
    });
});