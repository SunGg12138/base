const router = require('koa-router')();
const models = require('../../models');

router.get('/', async (ctx) => {
    ctx.body = {
        base_type: 'koa',
        branch: 'koa'
    };
});

router.get('/error', async (ctx) => {
    throw new Error('test error');
});

router.get('/user/list', async (ctx) => {
    let result = await models.users.findAll();
    ctx.body = result;
});

module.exports = router.routes();