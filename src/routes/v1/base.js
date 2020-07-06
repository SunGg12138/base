const router = require('koa-router')();

router.get('/', async (ctx) => {
    ctx.body = {
        base_type: 'koa',
        branch: 'koa'
    };
});

router.get('/error', async (ctx) => {
    throw new Error('test error');
});

module.exports = router.routes();